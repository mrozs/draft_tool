import { Player } from './player/player'
import { TeamPlayers } from './team.players';
import { DraftResult } from './draft.result/draft.result';
import { PlayerAdapter } from './player/player.adapter';
import { TeamDefinition } from './team.definition';

export class TeamPlayersAdapter {
    static adapt(teamsPlayerJsonRepresentation: any): TeamPlayers {
        let players = new Array<Player>();
        teamsPlayerJsonRepresentation.players.forEach(player => {
            players.push(player as Player);
        });

        let draftResults = new Array<DraftResult>();
        teamsPlayerJsonRepresentation.draftResult.forEach(draftResult => {
            draftResults.push(new DraftResult(draftResult.pickNumber,
                draftResult.player as Player,
                new TeamDefinition(draftResult.teamDefinition.id, draftResult.teamDefinition.name)))
        })
            
        const teamPlayers = new TeamPlayers(players);
        teamPlayers.refreshPicks(draftResults);

        return teamPlayers;
    }
}