import { TeamDefinition } from '../team.definition';
import { Player } from '../player/player'

export class DraftResult {
    pick: number;
    price: number;

    constructor(public pickNumber: number, public player: Player, public teamDefinition: TeamDefinition, price = 0) {
        this.price = price;
    }
}