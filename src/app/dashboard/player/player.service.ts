import { Injectable } from '@angular/core';
import { Player } from './player';
import { Draft } from '../draft';
import { HttpClient} from '@angular/common/http'
import { PuntCategories } from '../punt.categories';
import { PlayerAdapter } from './player.adapter';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) { }

  getPlayes(draft: Draft, puntCategories: PuntCategories): Promise<Player[]> {
    let url = (document.location.href.indexOf("ninja") == -1 ? `http://localhost/Teammate`: ``) +  `/Ranking/GetRankForLeagueParams` +
      `?leagueSize=${draft.leagueSize}&teamSize=${draft.teamSize}&cats=${draft.categoriesFlags}&budget=${draft.budget}&` +
      `seasonFilter=${draft.seasonFilter}&periodFilter=${draft.periodFilter}&withNinjaProjections=1&` +
      `withMyProjections=${draft.includeProjections}&puntCats=${puntCategories.puntCategoriesFlags()}`;

    return this.http
      .get(url)
      .map((res: Response) => {
        
        let players = new Array<Player>();
        // let rawPlayers = JSON.parse(res.json());
       /*  for (let rankResult of rawPlayers) {
          let rawPlayer = rankResult.RankResult;  
          var player = PlayerAdapter.adapt(rawPlayer, rankResult.IncludingUserProjections, rankResult.PuntValue);
          players.push(player);
        } */

        return players;
      })
      .toPromise();
  }
}