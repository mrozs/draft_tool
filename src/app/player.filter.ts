import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './dashboard/player/player';

@Pipe({
    name: 'playerFilter',
    pure: false
})
export class PlayerFilter implements PipeTransform {
    transform(items: Player[], filter: string): any {
        if (!items) {
            return items;
        }
        items = items.filter(x => !x.picked);

        if (filter) {
            filter = filter.toLowerCase();
            return items.filter(item => item.name.toLowerCase().includes(filter) ||
                item.position.toLowerCase().includes(filter) ||
                item.team.toLowerCase().includes(filter));
        }

        return items;
    }
}