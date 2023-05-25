import { Categories } from './../categories';
import { Player } from './player';

export class PlayerAdapter {

    static adapt(rawPlayer: any, includingProjection, puntValue): Player {
          var player = new Player();
          player.id = rawPlayer.PLAYER_ID;
          player.value = rawPlayer.total_value;
          player.valuePunt = puntValue;
          player.puntGain = player.valuePunt - player.value;
          player.projection = includingProjection;
          player.averageGain = 0;
          player.name = rawPlayer.player_NAME;
          player.games = rawPlayer.GAMES;
          player.mpg = rawPlayer.MINS_string;
          player.position = rawPlayer.position;
          player.team = rawPlayer.teamShort;
          player.price = rawPlayer.dollars;
          player.picked = rawPlayer.picked;
          player.adp = rawPlayer.adp;
          player.draftPrice = rawPlayer.draftPrice;
          player.statistics = {
            M: rawPlayer.M,
            FG_: rawPlayer.FG_,
            C3PA_FGA: rawPlayer.C3PA_FGA,
            FGM: rawPlayer.FGM,
            FGA: rawPlayer.FGA,
            FGMS: rawPlayer.FGMS,
            C3PM: rawPlayer.C3PM,
            C3PM48: rawPlayer.C3PM48,
            C3PA: rawPlayer.C3PA,
            C3PMS: rawPlayer.C3PMS,
            C3P_: rawPlayer.C3P_,
            C2P_: rawPlayer.C2P_,
            AFG_: rawPlayer.AFG_,
            FT_: rawPlayer.FT_,
            FTM: rawPlayer.FTM,
            FTA: rawPlayer.FTA,
            FTMS: rawPlayer.FTMS,
            NETFT: rawPlayer.NETFT,
            C2PM: rawPlayer.C2PM,
            C2PA: rawPlayer.C2PA,
            OREB: rawPlayer.OREB,
            DREB: rawPlayer.DREB,
            REB: rawPlayer.REB,
            AST: rawPlayer.AST,
            STL: rawPlayer.STL,
            BLK: rawPlayer.BLK,
            SB: rawPlayer.SB,
            PTS48: rawPlayer.PTS48,
            DPG: rawPlayer.DPG,
            ATO: rawPlayer.ATO,
            A_TO: rawPlayer.A_TO,
            S_TO: rawPlayer.S_TO,
            TO: rawPlayer.TO,
            TRN48: rawPlayer.TRN48,
            PF: rawPlayer.PF,
            PTS: rawPlayer.PTS,
            PPG: rawPlayer.PPG,
            T: rawPlayer.T,
            DD: rawPlayer.DD,
            TD: rawPlayer.TD,
            EJ: rawPlayer.EJ,
            FL: rawPlayer.FL,
            GS: rawPlayer.GS,
          }
          player.valueStatistics = {
            vC3PM: rawPlayer.C3PMv, vAto: rawPlayer.ATOv,
            vPts: rawPlayer.PTSv, vReb: rawPlayer.REBv, vAst: rawPlayer.ASTv, vStl: rawPlayer.STLv,
            vBlk: rawPlayer.BLKv, vFg: rawPlayer.FG_v, vFt: rawPlayer.FT_v, vTo: rawPlayer.TOv
          };

        return player;
    }
}