import { Player } from './player/player'
import { DraftResult } from './draft.result/draft.result';

export class TeamPlayers {
    draftResult: Array<DraftResult> = new Array<DraftResult>();
    pickedPlayerIds = new Array<number>();

    constructor(public players: Array<Player>) { }

    refreshPicks(draftResult: Array<DraftResult>) {
        this.draftResult = draftResult;
        this.pickedPlayerIds = draftResult.map(x => x.player.id);
    }

    playersOf(teamId: string): Array<Player> {
        const teamPicks = this.draftResult
            .filter(x => x.teamDefinition.id == teamId)
            .map(x => x.player.id);
        return this.players.filter(x => teamPicks.includes(x.id));
    }
}
