export class Player {
    id: number;
    averageGain: number;
    averagaGainCalculated: boolean = false;

    value: number;
    valuePunt: number;
    puntGain: number;

    name: string;
    games: number;
    mpg: string;
    team: string;

    position: string;
    projection: boolean;
    price: number;
    draftPrice: number;
    adp: number;

    picked: boolean = false;

    showCombinations: boolean = false;

    statistics: {
        M: number;
        FG_: number;
        C3PA_FGA: number;
        FGM: number;
        FGA: number;
        FGMS: number;
        C3PM: number;
        C3PM48: number;
        C3PA: number;
        C3PMS: number;
        C3P_: number;
        C2P_: number;
        AFG_: number;
        FT_: number;
        FTM: number;
        FTA: number;
        FTMS: number;
        NETFT: number;
        C2PM: number;
        C2PA: number;
        OREB: number;
        DREB: number;
        REB: number;
        AST: number;
        STL: number;
        BLK:number;
        SB: number;
        PTS48: number;
        DPG: number;
        ATO: number;
        A_TO: number;
        S_TO: number;
        TO: number;
        TRN48: number;
        PF: number;
        PTS: number;
        PPG: number;
        T: number;
        DD: number;
        TD: number;
        EJ: number;
        FL: number;
        GS: number
    }

    valueStatistics: {
        vPts: number;
        vC3PM: number;
        vReb: number;
        vAst: number;
        vStl: number;
        vBlk: number;
        vFg: number;
        vFt: number;
        vTo: number;
        vAto: number;
    }

    exclude: boolean;
    target: boolean;

    isEqual(player: Player) {
        if (this.id != player.id) {
            return false;
        }

        if (this.valuePunt != player.valuePunt) {
            return false;
        }
        
        for(let property in player.statistics) {
            if (this.statistics[property] != player.statistics[property]) {
                return false;
            }
        }

        return true;
    }

}
