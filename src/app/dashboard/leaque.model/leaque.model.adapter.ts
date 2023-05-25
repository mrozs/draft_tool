import { LeaqueModel } from './leaque.model';
import { LeaqueModelCategoryRank } from './leaque.model.category.rank'
import { Categories } from './../categories';

export class LeaqueModelAdapter {

    static adapt(leaqueModelJsonRepresentation: any[]): LeaqueModel {
        const leaqueModel = new LeaqueModel();       
        for (let team of leaqueModelJsonRepresentation) {
            leaqueModel.addTotalPoints(team.Total);
            for (let ranking of team.Cats) {
                const categoryId = ranking.CatId;
                const category = Categories.filter(categoryId);
                const value = ranking.Value;

                if (!leaqueModel.hasCategory(category)) {
                    leaqueModel.addCategory(category);
                }

                leaqueModel.addRank(category, new LeaqueModelCategoryRank(value));
            }

        }

        return leaqueModel;
    }
}