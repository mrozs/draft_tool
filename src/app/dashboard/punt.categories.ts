import { Category } from './category'
import { Categories } from './categories';

export class PuntCategories {
    categories = new Array<Category>();

    hasAny() {
        return this.categories.length;
    }

    list() {
        return this.categories.map(x => x.name).join(', ');
    }

    punt(category: Category) {
        this.categories.push(category);
    }

    removeCategories(category: Category) {
        this.categories = this.categories.filter(x => x.id != category.id);
    }

    isPunt(category: Category) {
        return this.categories.includes(category);
    }

    toggle(category: Category) {
        if (this.isPunt(category)) {
            this.removeCategories(category);
        } else {
            this.punt(category);
        }
    }

    copyCategories() {
        return [].concat(this.categories);
    }

    puntCategoriesFlags(): string {
        let flags = "";
        Categories.list.forEach((x, index) => {
            flags += this.categories.some(c => c.id == x.id) ? "1" : "0";
        });

        return flags;
    }
}