import { LeaqueModelCategory } from './leaque.model.category'
import { LeaqueModelCategoryRank } from './leaque.model.category.rank'
import { Category } from '../category.model';

export class LeaqueModel {
    private leaqueModelCategories = new Array<LeaqueModelCategory>();
    private totalPoints = new Array<number>();

    addCategory(category: Category) {
        this.leaqueModelCategories.push(new LeaqueModelCategory(category));
    }

    addRank(category: Category, rank: LeaqueModelCategoryRank) {
        const leagueCategory = this.getLeagueCategory(category.id);
        leagueCategory.addRank(rank);
    }

    addTotalPoints(rank: number) {
        this.totalPoints.push(rank);
        this.totalPoints = this.totalPoints.sort((x1, x2) => x2 - x1);
    }

    hasCategory(category: Category) {
        return this.leaqueModelCategories.some(x => x.is(category.id));
    }

    getLeagueCategory(categoryId: number) {
        const categoriesWithId = this.leaqueModelCategories.filter(x => x.is(categoryId));
        if (categoriesWithId.length != 1) {
            throw new Error(`Category ${categoryId} doensn't exist in model`);
        }

        return categoriesWithId[0];
    }

    place(points: number) {
        let place;
        for(let index = 0; index < this.totalPoints.length; index++) {
            place = index + 1;
            if (points >= this.totalPoints[index]) {
                return place;
            }
        }

        return place;
    }
}