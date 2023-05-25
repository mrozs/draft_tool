import { DraftResult } from './draft.result';
import { Player } from '../player/player';
import { TeamDefinition } from '../team.definition';

export class DraftResults {
    teamSize: number;
    teamsNumber: number;
    results : Array<DraftResult> = new Array<DraftResult>();
    rounds: Array<Array<DraftResult>> = new Array<Array<DraftResult>>();

    initialize(teamSize: number, teamsNumber: number) {
        this.teamsNumber = teamsNumber;
        this.teamSize = teamSize;

        for (let i = 0; i < teamSize; i++) {
            let round = new Array();
            for (let ii = 0; ii < teamsNumber; ii++) {
                const draftResult = new DraftResult(i * teamsNumber + ii + 1, new Player(), new TeamDefinition(null, ""));
                round.push(draftResult);
            }
            this.rounds.push(round);
        }
    }

    reinitialize() {
        this.rounds.forEach((round, roundIndex) => {
            round.forEach((pick, pickIndex) => {
                this.rounds[roundIndex][pickIndex] = 
                    new DraftResult(roundIndex * this.teamsNumber + pickIndex + 1, new Player(), new TeamDefinition(null, ""));
            });
        })
    }

    round(index: number) {
        return this.rounds[index];
    }

    refresh(results: Array<DraftResult>) {
        this.reinitialize();
        this.results = results;
        this.results.forEach((result, index) => {
            const roundIndex = Math.floor(index / this.teamsNumber);
            const teamIndex = index - (roundIndex * this.teamsNumber);

            this.rounds[roundIndex][teamIndex] = result;
        });
    }

    pickedBy(player: Player) {
        if (!player) {
            return false;
        }
        for(let result of this.results) {
            if (result.player.id == player.id) {
                return result.teamDefinition;
            }
        }
    }

    isPicked(player: Player) {
        return this.pickedBy(player) != null;
    }
}