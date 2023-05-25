import { TeamRanking } from './team.ranking'
import { Player } from './player/player';

export class Team {
    id: string;
    name: string;
    
    constructor(public players: Array<Player>, public ranking: TeamRanking) {}
}