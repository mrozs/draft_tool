import { Category } from './category.model';
import { TeamRanking, CategoryValue } from './team.ranking';
import { LeaqueModel } from './leaque.model/leaque.model';
import { LeaqueModelCategoryRank } from './leaque.model/leaque.model.category.rank';
import { Player } from './player/player';
import { Draft } from './draft';
import { PuntCategories } from './punt.categories';
import { Team } from './team';

export class TeamRankingCalculator {

    constructor(private leagueModel: LeaqueModel, private draft: Draft) { }


    calculateInternal(teams: Array<Team>, puntCategories: PuntCategories = new PuntCategories()) {
        const leaqueModel = new LeaqueModel();
        for (let category of this.draft.categories) {
            if (!leaqueModel.hasCategory(category)) {
                leaqueModel.addCategory(category);
            }

            teams.forEach(team => {
                let categoryAverageValue = this.calculateAverageValueFor(team.players, category);
                leaqueModel.addRank(category, new LeaqueModelCategoryRank(categoryAverageValue.value));
            })
        }

        const teamWithInternalRankings = new Array<Team>();
        const teamRankings = new Array<TeamRanking>();
        teams.forEach(team => {
            const teamRanking = new TeamRanking();
            for (let category of this.draft.categories) {
                let categoryAverageValue = team.ranking.average.filter(x => x.category.id == category.id)[0];
                let leagueModelCategory = leaqueModel.getLeagueCategory(categoryAverageValue.category.id);
                let points = new CategoryValue(categoryAverageValue.category, leagueModelCategory.place(categoryAverageValue.value));

                teamRanking.average.push(categoryAverageValue);
                teamRanking.projectedFantasyPoints.push(points);
            }
            teamRanking.projectedFantasyPoints.forEach(x => {
                if (!puntCategories.categories.some(pc => pc.id == x.category.id)) {
                    teamRanking.totalPoints += x.value
                }
            });
            teamRanking.money = 0;
            team.players.forEach(x => {
                teamRanking.money += x.price * 1;
            });
            if(this.draft.budget){
                teamRanking.money = this.draft.budget - teamRanking.money;
            }

            teamRankings.push(teamRanking);

            let internalRankingTeam = new Team(team.players, teamRanking);
            internalRankingTeam.name = team.name;
            internalRankingTeam.id = team.id;

            teamWithInternalRankings.push(internalRankingTeam);
        });

        teamRankings.forEach(x => leaqueModel.addTotalPoints(x.totalPoints));
        teamRankings.forEach(x => x.place = leaqueModel.place(x.totalPoints));


        return teamWithInternalRankings;

    }

    calculate(team: Array<Player>, puntCategories: PuntCategories = new PuntCategories()): TeamRanking {
        const teamRanking = new TeamRanking();

        for (let category of this.draft.categories) {
            let averageCategoryValue = this.calculateAverageValueFor(team, category);
            let points = this.calculatePoints(averageCategoryValue);

            teamRanking.average.push(averageCategoryValue);
            teamRanking.projectedFantasyPoints.push(points);
        }

        teamRanking.projectedFantasyPoints.forEach(x => {
            if (!puntCategories.categories.some(pc => pc.id == x.category.id)) {
                teamRanking.totalPoints += x.value
            }
        });
        teamRanking.place = this.leagueModel.place(teamRanking.totalPoints);

        return teamRanking;
    }

    calculateAverageValueFor(team: Array<Player>, category: Category): CategoryValue {
        let averageCategoryValue = 0;
        team.forEach(x => averageCategoryValue += x.statistics[category.property]);
        if (team.length) {
            averageCategoryValue /= team.length;
        }


        return new CategoryValue(category, averageCategoryValue);
    }

    calculatePoints(average: CategoryValue): CategoryValue {
        let leagueModelCategory = this.leagueModel.getLeagueCategory(average.category.id);

        return new CategoryValue(average.category, leagueModelCategory.place(average.value));
    }
}