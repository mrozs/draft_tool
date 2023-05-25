import { Category } from './category'
import { Team } from './team';
import { TeamDefinition } from './team.definition';

export class Draft {   
    teamDefinitions = new Array<TeamDefinition>();
    leagueName: string;
    type: string;
    activeTeamSize: number;
    categoriesName: string;
    categories = new Array<Category>();
    valueCategories = new Array<any>();
    categoriesFlags: string;
    period: number;
    custom: boolean;
    budget: number;
    seasonFilter: number;
    periodFilter: number;
    leaqueId: number;
    teamId: string;
    gameId: string;

    leagueKey: string;

    leagueSize: number;
    teamSize: number;
    teamBudget: number;

    includeProjections: boolean;

    showRankingPrice: boolean = false;
    showDraftResultPrice: boolean = false;

    reset: boolean = false;
    hijack: boolean = false;
}
