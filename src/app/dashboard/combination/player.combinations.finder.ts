import { Player } from './../player/player'
import { PlayerCombinations } from './player.combinations'
import { PlayerCombination } from './player.combination'
import { TeamRankingCalculator } from './../team.ranking.calculator';
import { PuntCategories } from './../punt.categories';
import { TeamRanking } from './../team.ranking';
import { Team } from './../team';
import { AssumedTeam } from './assumed.team'

export class PlayerCombinationsFinder {
    private allPlayers: Array<Player>;
    private puntCategories: PuntCategories;

    constructor(private calculator: TeamRankingCalculator) { }

    public combine(playersToPick: Array<Player>, teamPlayers: Array<Player>, puntCategories: PuntCategories, calculateFor: number): PlayerCombinations {
        this.puntCategories = puntCategories;
        this.allPlayers = playersToPick.filter(x => !x.exclude && !x.picked).sort((p1, p2) => p2.value - p1.value).slice(0, calculateFor);

        const playerCombinations = new PlayerCombinations();
        const currentTeamRanking = this.calculator.calculate(teamPlayers, this.puntCategories);
        const currentTeam = new Team(teamPlayers, currentTeamRanking);

        let firstLevelTeamCombinations = this.createTeamsFrom(currentTeam, this.allPlayers);
        for (let teamCombination of firstLevelTeamCombinations) {
            const secondLevelTopPlayers = this.playersToPick(teamCombination.team.players);
            const secondLevelTeamCombinations = this.createTeamsFrom(teamCombination.team,
                secondLevelTopPlayers).slice(0, 5);

            for (let secondLevelCombination of secondLevelTeamCombinations) {
                const thirdLevelTopPlayers = this.playersToPick(secondLevelCombination.team.players);

                const thirdLevelCombinations = this.createTeamsFrom(secondLevelCombination.team,
                    thirdLevelTopPlayers);

                let playerCombination: PlayerCombination;
                let index = 0;
                do {
                    let bestPlayerCombination = thirdLevelCombinations[index]; //.slice(index, 1)[0];

                    playerCombination = new PlayerCombination();
                    playerCombination.gain = bestPlayerCombination.team.ranking.totalPoints - currentTeam.ranking.totalPoints;
                    playerCombination.averageValue = teamCombination.player.value +
                        secondLevelCombination.player.value + bestPlayerCombination.player.value;
                    playerCombination.averageValue /= 3;
                    playerCombination.for = teamCombination.player.id;
                    playerCombination.players.push(teamCombination.player);
                    playerCombination.players.push(secondLevelCombination.player)
                    playerCombination.players.push(bestPlayerCombination.player);

                    index++;
                }
                while (index < thirdLevelCombinations.length && playerCombinations.existFor(teamCombination.player, playerCombination))

                playerCombinations.add(playerCombination);
            }

            const combinations = playerCombinations.combinationsFor(teamCombination.player);
            let avergaGain = 0;
            combinations.forEach(x => avergaGain += x.gain);
            avergaGain /= combinations.length;
            playerCombinations.averageGain[teamCombination.player.id] = avergaGain;

        }

        return playerCombinations;
    }

    playersToPick(teamPlayers: Array<Player>) {
        const playerIdsWithTeam = teamPlayers.map(x => x.id);
        const playersWithoutTeam = this.allPlayers.filter(x => !playerIdsWithTeam.includes(x.id));

        const playersNotExcludedAndNotTarget = playersWithoutTeam.filter(x => !x.exclude && !x.target);
        const targetPlayers = playersWithoutTeam.filter(x => x.target);
        const numberOfMissingPlayers = 70 - targetPlayers.length;

        return targetPlayers.concat(playersNotExcludedAndNotTarget.slice(0, numberOfMissingPlayers));
    }

    createTeamsFrom(team: Team, players: Array<Player>): Array<AssumedTeam> {
        const teams = new Array<AssumedTeam>();

        for (let player of players) {
            let assumedTeam = this.createTeamWithPlayer(team, player);
            teams.push(new AssumedTeam(assumedTeam, player));
        }

        return teams.sort((t1, t2) => t2.team.ranking.totalPoints - t1.team.ranking.totalPoints);
    }

    createTeamWithPlayer(team: Team, player: Player): Team {
        let assumedTeamPlayers = [];
        team.players.forEach(x => assumedTeamPlayers.push(x));
        assumedTeamPlayers.push(player);

        let assumedTeamRanking = this.calculator.calculate(assumedTeamPlayers, this.puntCategories);

        return new Team(assumedTeamPlayers, assumedTeamRanking);
    }
}