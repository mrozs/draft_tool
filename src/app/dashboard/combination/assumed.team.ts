import { Player } from './../player/player'
import { Team } from './../team'

export class AssumedTeam {
    constructor(public team: Team, public player: Player) { }
}