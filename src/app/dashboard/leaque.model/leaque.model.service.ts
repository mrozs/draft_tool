import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Draft } from '../draft';

@Injectable()
export class LeaqueModelService {
  constructor(private http: HttpClient) { }

  getLeagueModel(draft: Draft): Promise<any> {
    let url = (document.location.href.indexOf("ninja") == -1 ? `http://localhost/TeamMate`: ``) +  `/league/leagueModel?` +
      `ActiveTeamSize=${draft.activeTeamSize}&` +
      `LeagueSize=${draft.leagueSize}&` +
      `Cats=${draft.categoriesFlags}&` +
      `AddPoints=true`;

    return this.http
      .get(url)
      /* .map((res: Response) => {
        return res.json();
      }) */
      .toPromise();
  }
}