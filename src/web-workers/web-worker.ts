import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es7/array';

import { PlayerCombinationsFinder } from '../app/dashboard/combination/player.combinations.finder';
import { TeamRankingCalculator } from '../app/dashboard/team.ranking.calculator';
import { LeaqueModel } from '../app/dashboard/leaque.model/leaque.model';
import { LeaqueModelAdapter } from '../app/dashboard/leaque.model/leaque.model.adapter';
import { Team } from '../app/dashboard/team';
import { TeamPlayers } from '../app/dashboard/team.players';
import { TeamPlayersAdapter } from '../app/dashboard/team.players.adapter';

const customPostMessage: any = postMessage;

let combinationFinder: PlayerCombinationsFinder;
let teamRankingCalculator: TeamRankingCalculator;

onmessage = function (event: any) {
    if (event.data.command == "initialize") {
        let leagueModel = LeaqueModelAdapter.adapt(event.data.leagueModel);
        teamRankingCalculator = new TeamRankingCalculator(leagueModel, event.data.draft);
        combinationFinder = new PlayerCombinationsFinder(teamRankingCalculator);
    }

    if (event.data.command == "recalculate") {
        console.time("combination calculations");
        const teamPlayers = TeamPlayersAdapter.adapt(event.data.teamPlayers);
        const selectedTeamPlayers = teamPlayers.playersOf(event.data.selectedTeamDefinitionId);

        const playersToPick = event.data.playersToPick;
        const puntCategories = event.data.puntCategories;
        const calculateFor = event.data.calculateFor;
        let combinations = combinationFinder.combine(playersToPick, selectedTeamPlayers, puntCategories, calculateFor);

        const teams = Array<Team>();
        event.data.teamDefinitions.forEach(teamDefinition => {
            const players = teamPlayers.playersOf(teamDefinition.id);
            const teamRanking = teamRankingCalculator.calculate(players, puntCategories);
            const team = new Team(players, teamRanking)
            team.id = teamDefinition.id;
            team.name = teamDefinition.name;
            teams.push(team);
        });

        let interalTeamRankings = teamRankingCalculator.calculateInternal(teams, puntCategories);
        interalTeamRankings = interalTeamRankings.sort((t1, t2) => t2.ranking.totalPoints - t1.ranking.totalPoints);
        
        teams.sort((t1, t2) => t1.ranking.place - t2.ranking.place).forEach((team, index) => {
            if (!index) return;

            if (teams[index].ranking.place <= teams[index - 1].ranking.place) {
                // teams[index].ranking.place = teams[index - 1].ranking.place + 1;
            }
        });

        console.timeEnd("combination calculations");
        customPostMessage({
            combinations: combinations,
            teams: teams,
            interalTeamRankings: interalTeamRankings
        });
    }
};