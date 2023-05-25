import { Player } from './player/player'
import { Category } from './category'

export class CategoryValue {
    constructor(public category: Category, public value: number) { }
}

export class TeamRanking {
    totalPoints: number = 0;
    place: number = 0;
    money: number = 0;
    average: CategoryValue[] = new Array<CategoryValue>();
    projectedFantasyPoints: CategoryValue[] = new Array<CategoryValue>();
}
