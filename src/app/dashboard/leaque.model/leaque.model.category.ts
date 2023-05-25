import { LeaqueModelCategoryRank } from './leaque.model.category.rank'
import { Category } from './../category';

export class LeaqueModelCategory {
    private category: Category;
    private ranks = new Array<LeaqueModelCategoryRank>();

    constructor(category: Category) {
        this.category = category;
    }

    is(category: number) {
        return this.category.id == category;
    }

    addRank(rank: LeaqueModelCategoryRank) {
        this.ranks.push(rank);
    }

    place(rank: number): number {
        let ranks = this.ranks.map(x => x.value);
        ranks.push(rank)
        if (this.category.negative) {
            ranks.sort((x1, x2) => x2 - x1);
        }

        if (!this.category.negative) {
            ranks.sort((x1, x2) => x1 - x2);
        }
        
        let place = ranks.indexOf(rank) + 1;
        if (place > ranks.length - 1) {
            place = ranks.length - 1;
        }
        if (place == 1 || place == 2) place = 1;

        return place;
    }
}