import { Component, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Player } from './dashboard/player/player'
import { Draft } from './dashboard/draft'
import { Category } from './dashboard/category';
import { PuntCategories } from './dashboard/punt.categories';
import { RateValue } from './dashboard/rate.value'
import { PlayerService } from './dashboard/player/player.service';
import { DraftService } from './dashboard/draft.service';
import { DraftResultService } from './dashboard/draft.result/draft.result.service';
import { DraftResults } from './dashboard/draft.result/draft.results'
import { DraftResult } from './dashboard/draft.result/draft.result'
import { LeaqueModelService } from './dashboard/leaque.model/leaque.model.service';
import { PlayerCombinationsFinder } from './dashboard/combination/player.combinations.finder';
import { PlayerCombinations } from './dashboard/combination/player.combinations';
import { TeamRanking } from './dashboard/team.ranking';
import { TeamPlayers } from './dashboard/team.players';
import { Team } from './dashboard/team';
import { TeamDefinition } from './dashboard/team.definition'
import { PlayerCombinationsAdapter } from './dashboard/combination/player.combinations.adapter';
import * as RankingCombinationCalculator from 'worker-loader!./../web-workers/web-worker.bundle.js';
import { Cookie } from 'ng2-cookies';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
})

export class DashboardComponent {
  targetPlayersChecked;
  excludePlayersChecked;
  includeMyProjectionsChecked;
  puntCategoriesChecked = new PuntCategories();

  targetPlayers;
  includeMyProjections;
  excludePlayers;
  puntCategories = new PuntCategories();

  teams: Array<Team>;
  playersToPick: Player[];
  internalRankings: Array<Team>;
  noLeagueData: boolean = false;

  teamsDefinitionToSelect = new Array<TeamDefinition>();
  selectedTeamDefinition: TeamDefinition = new TeamDefinition(null, null);
  selectedTeam: Team = new Team(new Array<Player>(), new TeamRanking());
  selectedInternalRanking: Team = new Team(new Array<Player>(), new TeamRanking());

  myTeamDefinition: TeamDefinition = new TeamDefinition(null, null);
  myTeam: Team = new Team(new Array<Player>(), new TeamRanking());
  myInternalRanking: Team = new Team(new Array<Player>(), new TeamRanking());


  draft: Draft = new Draft();
  playerCombinations = new PlayerCombinations();
  rateValue = new RateValue();
  teamPlayers: TeamPlayers;
  draftResults = new DraftResults();
  draftResult = new Array<DraftResult>();
  rankingCombinationCalculator;

  currentSortProperty: string = "averageGain"
  currentSortOrder: string = "-";
  searchPhrase: string;

  loading: boolean = true;
  showWelcome: boolean = false;

  constructor(private playerService: PlayerService, private draftService: DraftService,
    private leaqueModelService: LeaqueModelService, private draftResultService: DraftResultService, private ngZone: NgZone) {

    this.targetPlayers = this.targetPlayersChecked = false;
    this.excludePlayers = this.excludePlayersChecked = false;
    this.includeMyProjections = this.includeMyProjectionsChecked = false;

    this.rankingCombinationCalculator = new RankingCombinationCalculator();
    this.rankingCombinationCalculator.onmessage = (event) => {
      this.ngZone.run(() => {
        this.playerCombinations = PlayerCombinationsAdapter.adapt(event.data.combinations);
        this.playersToPick.forEach(player => {
          player.averagaGainCalculated = this.playerCombinations.hasCalculatedAverageGain(player.id);
          player.averageGain = this.playerCombinations.averageGainFor(player.id);
        });
        this.teams = event.data.teams as Array<Team>;
        this.internalRankings = event.data.interalTeamRankings as Array<Team>;

        this.refreshTeam();
        this.loading = false;
      });
    };

    this.initialize();
  }


  initialize() {
    this.draftService.getDraft().then(draft => {
      if(!draft){
        this.noLeagueData = true;
        return;
      }
      this.draft = draft;
      this.showWelcome = !this.userClosedWelcomeScreen();
      this.includeMyProjections = this.includeMyProjectionsChecked = this.draft.includeProjections;

      const playersPromise = this.playerService.getPlayes(this.draft, this.puntCategories);
      const leaqueModelPromise = this.leaqueModelService.getLeagueModel(this.draft);

      Promise.all([playersPromise, leaqueModelPromise]).then(result => {
        this.draftResults.initialize(this.draft.teamSize, this.draft.leagueSize);

        const leagueModel = result[1];
        this.rankingCombinationCalculator.postMessage({
          command: 'initialize',
          leagueModel: leagueModel,
          draft: this.draft
        });
        this.playersToPick = result[0];
        if (draft.custom) {
          this.playersToPick.forEach(x => x.price = null);
        }

        this.teamPlayers = new TeamPlayers(this.playersToPick);
        this.myTeamDefinition = this.selectedTeamDefinition = this.draft.teamDefinitions.filter(x => x.id == this.draft.teamId)[0];
        
        this.recalculate();

        if (!this.draft.custom) {
          Observable.timer(0, 60000).subscribe(x => {
            this.refreshDraftResult();
          });
        }
        else if((this.draft.leagueKey != "custom" && this.draft.leagueKey.startsWith("custom")) 
          || this.draft.type == "self" || this.draft.type.indexOf("custom")>-1) {
            this.getCustomDraftResult();
            this.draft.reset = false;
        }
      });
    });
  }

  refreshDraftResult() {
    this.draftResultService.getDraftResult(this.draft, this.playersToPick, this.draft.teamDefinitions)
      .then(draftResult => {
        this.loading = true;
        this.draftResult = draftResult;
        this.recalculate();
      })
      .catch(e => {
        this.loading = false;
        console.log("error during fetching draft results");
      });
  }

  getCustomDraftResult() {
    this.draftResultService.getCustomDraftResult(
      this.draft, this.playersToPick, this.draft.teamDefinitions)
      .then(draftResult => {
        this.loading = true;
        this.draftResult = draftResult;
        this.recalculate();
      })
      .catch(e => {
        this.loading = false;
        console.log("error during fetching draft results");
      });
  }

  search(phrase) {
    this.ngZone.run(() => {
      this.searchPhrase = phrase;
    });
  }

  userClosedWelcomeScreen() {
    return false;//Cookie.check("dtfs");
  }

  closeWelcomeScreen() {
    let expires = new Date();
    expires.setFullYear(expires.getFullYear() + 5);
    Cookie.set("dtfs", "1", expires);
  }

  selectTeam(teamDefinition) {
    this.selectedTeamDefinition = teamDefinition;
    this.refreshTeam();
  }

  refreshTeam() {
    this.myInternalRanking =  this.internalRankings.filter(x => x.id == this.draft.teamId)[0];
    this.myTeam = this.teams.filter(x => x.id == this.draft.teamId)[0];

    this.teamsDefinitionToSelect = this.draft.teamDefinitions.filter(x => x.id != this.selectedTeamDefinition.id);
    this.selectedTeam = this.teams.filter(x => x.id == this.selectedTeamDefinition.id)[0];
    this.selectedInternalRanking = this.internalRankings.filter(x => x.id == this.selectedTeamDefinition.id)[0];
  }

  selectPlayer(player: Player, teamDefinition: TeamDefinition) {
    this.loading = true;

    if (!this.draftResult.some(x => x.player.id == player.id)) {
      this.draftResult.push(new DraftResult(this.draftResult.length + 1, player, teamDefinition, player.price));
    } else {
      this.draftResult.find(x => x.player.id == player.id).teamDefinition = teamDefinition;
    }
    this.draftResults.refresh(this.draftResult);

    // save draft results
    this.draftResultService.saveCustomDraftPick(this.draftResult.length, teamDefinition, player, this.draft);

    this.recalculate();
  }

  removePlayer(player: Player) {
    this.loading = true;

    player.picked = false;
    this.draftResult.splice(this.draftResult.findIndex(x => x.player.id == player.id), 1);
    this.draftResults.refresh(this.draftResult);

    // save draft results
    this.draftResultService.saveCustomDraftPick(this.draftResult.length, null, player, this.draft);

    this.recalculate();
  }

  recalculate() {
    this.teamPlayers.refreshPicks(this.draftResult);
    this.draftResults.refresh(this.draftResult);
    this.playersToPick.
      filter(x => this.teamPlayers.pickedPlayerIds.includes(x.id)).
      forEach(x => x.picked = true);

    this.rankingCombinationCalculator.postMessage({
      command: 'recalculate',
      selectedTeamDefinitionId: this.selectedTeamDefinition.id,
      puntCategories: this.puntCategories,
      playersToPick: this.playersToPick,
      teamPlayers: this.teamPlayers,
      teamDefinitions: this.draft.teamDefinitions,
      calculateFor: this.draft.teamSize * this.draft.leagueSize
    });
  }

  sortBy(property: string, defaultOrder = "-") {
    if (this.currentSortProperty == property) {
      this.currentSortOrder = this.currentSortOrder == "" ? "-" : "";
    } else {
      this.currentSortOrder = defaultOrder;
    }

    this.currentSortProperty = property;
  }

  valueRate(value) {
    return this.rateValue.valueRate(value);
  }

  applySettings() {
    this.loading = true;
    this.targetPlayers = this.targetPlayersChecked;
    this.excludePlayers = this.excludePlayersChecked;
    this.includeMyProjections = this.includeMyProjectionsChecked;
    this.puntCategories.categories = this.puntCategoriesChecked.copyCategories();

    this.draft.includeProjections = this.includeMyProjections;
    const playersPromise = this.playerService.getPlayes(this.draft, this.puntCategories);
    playersPromise.then(players => {
      this.teamPlayers.players.forEach((player, index) => {
        let refreshedPlayer = players.filter(x => x.id == player.id)[0];
        refreshedPlayer.exclude = player.exclude;
        refreshedPlayer.showCombinations = player.showCombinations;
        refreshedPlayer.target = player.target;
        refreshedPlayer.price = player.price;
        refreshedPlayer.picked = player.picked;
        if (!player.isEqual(refreshedPlayer)) {
          this.teamPlayers.players[index] = refreshedPlayer;
        }
      })

      this.recalculate();
    });
  }

  cancelSettings() {
    this.targetPlayersChecked = this.targetPlayers;
    this.excludePlayersChecked = this.excludePlayers;
    this.includeMyProjectionsChecked = this.includeMyProjections;
    this.puntCategoriesChecked.categories = this.puntCategories.copyCategories();;
  }
}
