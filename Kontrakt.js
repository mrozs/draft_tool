/*
* DEFINICJE KATEGORII 
    wygląda jak poniżej i jest zaharcodowana w aplikacji 

    UWAGA ! Nazwyy kategorii nie odpowiadaja tym z rankingu
*/
[{ id: 1, name: "PTS", description: "Points", property: "PTS" },
{ id: 2, name: "3P", description: "3 pointers made", property: "C3PM" },
{ id: 3, name: "REB", description: "Rebounds", property: "REB" },
{ id: 4, name: "AST", description: "Assists", property: "AST" },
{ id: 5, name: "STL", description: "Steals", property: "STL" },
{ id: 6, name: "BLK", description: "Blocks", property: "BLK" },
{ id: 7, name: "FG%", description: "Field Goal %", property: "FG_" },
{ id: 8, name: "FT%", description: "Free Throw %", property: "FT_" },
{ id: 9, name: "TO", description: "Turnovers", property: "TRN" },
{ id: 10, name: "3P%", description: "Threes %", property: "C3P_" },
{ id: 11, name: "2P%", description: "Twos %", property: "C2P_" },
{ id: 12, name: "AFG%", description: "Adjusted FG%", property: "AFG_" },
{ id: 13, name: "DREB", description: "Defensive Rebounds", property: "DREB" },
{ id: 14, name: "OREB", description: "Offensive Rebounds", property: "OREB" },
{ id: 15, name: "DD", description: "Double Doubles", property: "DD" },
{ id: 16, name: "TD", description: "Triple Doubles", property: "TD" },
{ id: 17, name: "FG", description: "Field goals made", property: "FGM" },
{ id: 18, name: "FGA", description: "Field goals attempted", property: "FGA" },
{ id: 19, name: "FGM", description: "Field goals missed", property: "FGMS" },
{ id: 20, name: "PF", description: "Fouls", property: "PF" },
{ id: 21, name: "FT", description: "Free throws made", property: "FTM" },
{ id: 22, name: "FTA", description: "Free throws attempted", property: "FTA" },
{ id: 23, name: "FTM", description: "Free throws missed", property: "FTMS" },
{ id: 24, name: "MIN", description: "Minutes", property: "M" },
{ id: 25, name: "3PA", description: "3 pointers attempted", property: "FG3A" },
{ id: 26, name: "3PM", description: "3 pointers missed", property: "FG3MS" },
{ id: 27, name: "2P", description: "2 pointers made", property: "FG2M" },
{ id: 28, name: "2PA", description: "2 pointers attempted", property: "FG2A" },
{ id: 29, name: "A/TO", description: "Assist to Turnovers", property: "ATO" },
{ id: 30, name: "NFT", description: "Net Free Throws", property: "NETFT" },
{ id: 31, name: "TO/48", description: "Turnovers/48", property: "TRN48" },
{ id: 32, name: "PT3/48", description: "Threes/48", property: "C3PM48" },
{ id: 33, name: "DPG", description: "DPG (blk+stl+dr)", property: "DPG" },
{ id: 34, name: "PPG", description: "PPG", property: "PTS" },
{ id: 35, name: "S+B", description: "Steals+Blocks", property: "S_B" },
{ id: 36, name: "PTS/48", description: "Points/48", property: "PTS48" },
{ id: 37, name: "S/T", description: "Steals to Turnvers", property: "S_TO" },
{ id: 38, name: "A-TO", description: "Assists - Turnovers", property: "A_TO" },
{ id: 39, name: "TECH", description: "Technicals", property: "T" },
{ id: 40, name: "PT3A/FGA", description: "3a/fga", property: "C3PA_FGA" },
{ id: 41, name: "GS", description: "Games started", property: "GS" },
{ id: 42, name: "FO", description: "Fouled out", property: "FO" },
{ id: 43, name: "EJECT", description: "Ejections", property: "EJ" },
{ id: 44, name: "FL", description: "Flagrants", property: "FL" },
{ id: 45, name: "MPG", description: "Minutes per game", property: "MINS_strng" }];

/*
    PARAMETRY POCZĄTKOWE. 
    Parametry który będę odczytywał z cookiesów bądz z URL poniższy opisuje JSON. 
    Dokumentacja w pliku "Draft tool - parametry startowe.docx", assana - 12.Specyfikacja techniczna
*/
var parameters = {
    DataPeriod: 0, //mozliwe wartości 0,2,3,4,99
    WithMyProjections: true, //jest to domyslna wartosc w settingsach i może zostać nadpisana przez nie ?
    leaqueKey: "", //Wartosc custom dla customowych
    mockDraftUrl, //póki co nie wiem na co jest mi potrzebny
    //ustawienia opcjonalne dla custom leaque
    leaqueSize,
    teamSize, //# of teams to teamSize,
    teamBudget,
    categories: "0,1", //jest to wartość true/false dla listy kategorii powyżej ? pierwsze 0 oznacza ze nie ma PTS, druga 1 oznacza ze ma 3P,
    teams: ["team1", "team2"],
    positions: [{ name: "PH", count: 3 }],
    customLeaqueName
};

/*
    W przypadku ligii customowej w obszarze settings
    Leaque to customLeaqueName,
    teamSize to # of teams 
    Type to custom ?
    Categories to ??
    Period to ?? (tam jest string, konkrenta data)

    
    translacja parametru "period" na parametr rankingowy "periodFilter" (Parametr startowy -> parametr serwisu rankingowego -> opis):
    1 - 0 - cały poprzedni sezon
    2 - 2 - ostatnie 3 miesiące sezonu
    3 - 3 - ostatnie 2 miesiące sezonu    
    Jak ma sie do tej labelki ? Skad mam wiedziec co to poprzedni sezon i co wyswietlic

*/

/*
    W przypadku ligii espn/yahoo bedzie serwis.Json nie znany.
*/


/*
 MODEL LIGII
 Pobrany z url teammate/League/LeagueModel?LeagueKey=364.l.3683
 Wejscie to LeaqueKey. Json wygląda jak poniżej

 Pytanie 1 - gdzie pobrać model dla customowej ligii ? (w asanie jest napisane, że formularz startowy jest zródłem)
 Odpowiedz 1 - w serwiswie powyzej ma byc.
 Pytanie 2- espn/yahoo model bedzię mieć ten sam układ (tylko inne wartosci ?)

 Czyli ten model zostaje czy jak bedziesz uniwersalny to zmieni swoje ?
*/

[{
    "$id": "1",
    "model_league": {
        "$id": "2",
        "model_league_datails": [{
            "$ref": "1"
        }, {
            "$id": "3",
            "model_league": {
                "$ref": "2"
            },
            "id": 207,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 5,
            "ranking": 2,
            "catValue": 0.445
        }, {
            "$id": "4",
            "model_league": {
                "$ref": "2"
            },
            "id": 208,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 5,
            "ranking": 3,
            "catValue": 0.447
        }, {
            "$id": "5",
            "model_league": {
                "$ref": "2"
            },
            "id": 209,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 5,
            "ranking": 3,
            "catValue": 0.447
        }, {
            "$id": "6",
            "model_league": {
                "$ref": "2"
            },
            "id": 210,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 5,
            "ranking": 5,
            "catValue": 0.453
        }, {
            "$id": "7",
            "model_league": {
                "$ref": "2"
            },
            "id": 211,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 5,
            "ranking": 5,
            "catValue": 0.453
        }, {
            "$id": "8",
            "model_league": {
                "$ref": "2"
            },
            "id": 212,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 5,
            "ranking": 7,
            "catValue": 0.46
        }, {
            "$id": "9",
            "model_league": {
                "$ref": "2"
            },
            "id": 213,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 5,
            "ranking": 8,
            "catValue": 0.461
        }, {
            "$id": "10",
            "model_league": {
                "$ref": "2"
            },
            "id": 214,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 5,
            "ranking": 9,
            "catValue": 0.463
        }, {
            "$id": "11",
            "model_league": {
                "$ref": "2"
            },
            "id": 215,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 5,
            "ranking": 10,
            "catValue": 0.466
        }, {
            "$id": "12",
            "model_league": {
                "$ref": "2"
            },
            "id": 216,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 5,
            "ranking": 11,
            "catValue": 0.469
        }, {
            "$id": "13",
            "model_league": {
                "$ref": "2"
            },
            "id": 217,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 5,
            "ranking": 12,
            "catValue": 0.471
        }, {
            "$id": "14",
            "model_league": {
                "$ref": "2"
            },
            "id": 218,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 5,
            "ranking": 13,
            "catValue": 0.472
        }, {
            "$id": "15",
            "model_league": {
                "$ref": "2"
            },
            "id": 219,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 5,
            "ranking": 14,
            "catValue": 0.477
        }, {
            "$id": "16",
            "model_league": {
                "$ref": "2"
            },
            "id": 220,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 5,
            "ranking": 15,
            "catValue": 0.49
        }, {
            "$id": "17",
            "model_league": {
                "$ref": "2"
            },
            "id": 221,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 8,
            "ranking": 1,
            "catValue": 0.697
        }, {
            "$id": "18",
            "model_league": {
                "$ref": "2"
            },
            "id": 222,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 8,
            "ranking": 2,
            "catValue": 0.735
        }, {
            "$id": "19",
            "model_league": {
                "$ref": "2"
            },
            "id": 223,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 8,
            "ranking": 3,
            "catValue": 0.744
        }, {
            "$id": "20",
            "model_league": {
                "$ref": "2"
            },
            "id": 224,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 8,
            "ranking": 4,
            "catValue": 0.757
        }, {
            "$id": "21",
            "model_league": {
                "$ref": "2"
            },
            "id": 225,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 8,
            "ranking": 5,
            "catValue": 0.778
        }, {
            "$id": "22",
            "model_league": {
                "$ref": "2"
            },
            "id": 226,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 8,
            "ranking": 6,
            "catValue": 0.779
        }, {
            "$id": "23",
            "model_league": {
                "$ref": "2"
            },
            "id": 227,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 8,
            "ranking": 7,
            "catValue": 0.783
        }, {
            "$id": "24",
            "model_league": {
                "$ref": "2"
            },
            "id": 228,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 8,
            "ranking": 7,
            "catValue": 0.783
        }, {
            "$id": "25",
            "model_league": {
                "$ref": "2"
            },
            "id": 229,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 8,
            "ranking": 9,
            "catValue": 0.788
        }, {
            "$id": "26",
            "model_league": {
                "$ref": "2"
            },
            "id": 230,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 8,
            "ranking": 10,
            "catValue": 0.795
        }, {
            "$id": "27",
            "model_league": {
                "$ref": "2"
            },
            "id": 231,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 8,
            "ranking": 11,
            "catValue": 0.796
        }, {
            "$id": "28",
            "model_league": {
                "$ref": "2"
            },
            "id": 232,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 8,
            "ranking": 12,
            "catValue": 0.8
        }, {
            "$id": "29",
            "model_league": {
                "$ref": "2"
            },
            "id": 233,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 8,
            "ranking": 13,
            "catValue": 0.809
        }, {
            "$id": "30",
            "model_league": {
                "$ref": "2"
            },
            "id": 234,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 8,
            "ranking": 14,
            "catValue": 0.822
        }, {
            "$id": "31",
            "model_league": {
                "$ref": "2"
            },
            "id": 235,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 8,
            "ranking": 15,
            "catValue": 0.828
        }, {
            "$id": "32",
            "model_league": {
                "$ref": "2"
            },
            "id": 236,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 10,
            "ranking": 1,
            "catValue": 0.91124260355029585
        }, {
            "$id": "33",
            "model_league": {
                "$ref": "2"
            },
            "id": 237,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 10,
            "ranking": 2,
            "catValue": 1.0
        }, {
            "$id": "34",
            "model_league": {
                "$ref": "2"
            },
            "id": 238,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 10,
            "ranking": 3,
            "catValue": 1.0067720090293453
        }, {
            "$id": "35",
            "model_league": {
                "$ref": "2"
            },
            "id": 239,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 10,
            "ranking": 4,
            "catValue": 1.0080482897384306
        }, {
            "$id": "36",
            "model_league": {
                "$ref": "2"
            },
            "id": 240,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 10,
            "ranking": 5,
            "catValue": 1.1274509803921569
        }, {
            "$id": "37",
            "model_league": {
                "$ref": "2"
            },
            "id": 241,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 10,
            "ranking": 6,
            "catValue": 1.1496598639455782
        }, {
            "$id": "38",
            "model_league": {
                "$ref": "2"
            },
            "id": 242,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 10,
            "ranking": 7,
            "catValue": 1.1528925619834711
        }, {
            "$id": "39",
            "model_league": {
                "$ref": "2"
            },
            "id": 243,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 10,
            "ranking": 8,
            "catValue": 1.1598272138228942
        }, {
            "$id": "40",
            "model_league": {
                "$ref": "2"
            },
            "id": 244,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 10,
            "ranking": 9,
            "catValue": 1.1894736842105262
        }, {
            "$id": "41",
            "model_league": {
                "$ref": "2"
            },
            "id": 245,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 10,
            "ranking": 10,
            "catValue": 1.2382978723404254
        }, {
            "$id": "42",
            "model_league": {
                "$ref": "2"
            },
            "id": 246,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 10,
            "ranking": 11,
            "catValue": 1.2690677966101696
        }, {
            "$id": "43",
            "model_league": {
                "$ref": "2"
            },
            "id": 247,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 10,
            "ranking": 12,
            "catValue": 1.2759336099585061
        }, {
            "$id": "44",
            "model_league": {
                "$ref": "2"
            },
            "id": 248,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 10,
            "ranking": 13,
            "catValue": 1.3449074074074074
        }, {
            "$id": "45",
            "model_league": {
                "$ref": "2"
            },
            "id": 249,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 10,
            "ranking": 14,
            "catValue": 1.4193548387096775
        }, {
            "$id": "46",
            "model_league": {
                "$ref": "2"
            },
            "id": 250,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 10,
            "ranking": 15,
            "catValue": 1.4256198347107438
        }, {
            "$id": "47",
            "model_league": {
                "$ref": "2"
            },
            "id": 251,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 12,
            "ranking": 1,
            "catValue": 10.254437869822485
        }, {
            "$id": "48",
            "model_league": {
                "$ref": "2"
            },
            "id": 252,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 12,
            "ranking": 2,
            "catValue": 12.327659574468084
        }, {
            "$id": "49",
            "model_league": {
                "$ref": "2"
            },
            "id": 253,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 12,
            "ranking": 3,
            "catValue": 12.33421052631579
        }, {
            "$id": "50",
            "model_league": {
                "$ref": "2"
            },
            "id": 254,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 12,
            "ranking": 4,
            "catValue": 12.335600907029479
        }, {
            "$id": "51",
            "model_league": {
                "$ref": "2"
            },
            "id": 255,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 12,
            "ranking": 5,
            "catValue": 12.399470899470899
        }, {
            "$id": "52",
            "model_league": {
                "$ref": "2"
            },
            "id": 256,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 12,
            "ranking": 6,
            "catValue": 12.498871331828443
        }, {
            "$id": "53",
            "model_league": {
                "$ref": "2"
            },
            "id": 257,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 12,
            "ranking": 7,
            "catValue": 12.849094567404427
        }, {
            "$id": "54",
            "model_league": {
                "$ref": "2"
            },
            "id": 258,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 12,
            "ranking": 8,
            "catValue": 13.187904967602591
        }, {
            "$id": "55",
            "model_league": {
                "$ref": "2"
            },
            "id": 259,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 12,
            "ranking": 9,
            "catValue": 14.529045643153527
        }, {
            "$id": "56",
            "model_league": {
                "$ref": "2"
            },
            "id": 260,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 12,
            "ranking": 10,
            "catValue": 15.230107526881721
        }, {
            "$id": "57",
            "model_league": {
                "$ref": "2"
            },
            "id": 261,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 12,
            "ranking": 11,
            "catValue": 15.903921568627451
        }, {
            "$id": "58",
            "model_league": {
                "$ref": "2"
            },
            "id": 262,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 12,
            "ranking": 12,
            "catValue": 15.913223140495868
        }, {
            "$id": "59",
            "model_league": {
                "$ref": "2"
            },
            "id": 263,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 12,
            "ranking": 13,
            "catValue": 16.059322033898304
        }, {
            "$id": "60",
            "model_league": {
                "$ref": "2"
            },
            "id": 264,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 12,
            "ranking": 14,
            "catValue": 16.111111111111111
        }, {
            "$id": "61",
            "model_league": {
                "$ref": "2"
            },
            "id": 265,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 12,
            "ranking": 15,
            "catValue": 17.055785123966942
        }, {
            "$id": "62",
            "model_league": {
                "$ref": "2"
            },
            "id": 266,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 15,
            "ranking": 1,
            "catValue": 4.3944773175542409
        }, {
            "$id": "63",
            "model_league": {
                "$ref": "2"
            },
            "id": 267,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 15,
            "ranking": 2,
            "catValue": 4.69215291750503
        }, {
            "$id": "64",
            "model_league": {
                "$ref": "2"
            },
            "id": 268,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 15,
            "ranking": 3,
            "catValue": 4.73015873015873
        }, {
            "$id": "65",
            "model_league": {
                "$ref": "2"
            },
            "id": 269,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 15,
            "ranking": 4,
            "catValue": 4.8435374149659864
        }, {
            "$id": "66",
            "model_league": {
                "$ref": "2"
            },
            "id": 270,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 15,
            "ranking": 5,
            "catValue": 5.0212765957446805
        }, {
            "$id": "67",
            "model_league": {
                "$ref": "2"
            },
            "id": 271,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 15,
            "ranking": 6,
            "catValue": 5.189473684210526
        }, {
            "$id": "68",
            "model_league": {
                "$ref": "2"
            },
            "id": 272,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 15,
            "ranking": 7,
            "catValue": 5.1986455981941306
        }, {
            "$id": "69",
            "model_league": {
                "$ref": "2"
            },
            "id": 273,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 15,
            "ranking": 8,
            "catValue": 5.2078431372549021
        }, {
            "$id": "70",
            "model_league": {
                "$ref": "2"
            },
            "id": 274,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 15,
            "ranking": 9,
            "catValue": 5.2987288135593218
        }, {
            "$id": "71",
            "model_league": {
                "$ref": "2"
            },
            "id": 275,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 15,
            "ranking": 10,
            "catValue": 5.740820734341253
        }, {
            "$id": "72",
            "model_league": {
                "$ref": "2"
            },
            "id": 276,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 15,
            "ranking": 11,
            "catValue": 5.8009259259259256
        }, {
            "$id": "73",
            "model_league": {
                "$ref": "2"
            },
            "id": 277,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 15,
            "ranking": 12,
            "catValue": 5.9442148760330582
        }, {
            "$id": "74",
            "model_league": {
                "$ref": "2"
            },
            "id": 278,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 15,
            "ranking": 13,
            "catValue": 6.3223140495867769
        }, {
            "$id": "75",
            "model_league": {
                "$ref": "2"
            },
            "id": 279,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 15,
            "ranking": 14,
            "catValue": 6.623655913978495
        }, {
            "$id": "76",
            "model_league": {
                "$ref": "2"
            },
            "id": 280,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 15,
            "ranking": 15,
            "catValue": 7.1369294605809133
        }, {
            "$id": "77",
            "model_league": {
                "$ref": "2"
            },
            "id": 281,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 16,
            "ranking": 1,
            "catValue": 2.1262327416173572
        }, {
            "$id": "78",
            "model_league": {
                "$ref": "2"
            },
            "id": 282,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 16,
            "ranking": 2,
            "catValue": 2.2570194384449245
        }, {
            "$id": "79",
            "model_league": {
                "$ref": "2"
            },
            "id": 283,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 16,
            "ranking": 3,
            "catValue": 2.4172335600907031
        }, {
            "$id": "80",
            "model_league": {
                "$ref": "2"
            },
            "id": 284,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 16,
            "ranking": 4,
            "catValue": 2.5105820105820107
        }, {
            "$id": "81",
            "model_league": {
                "$ref": "2"
            },
            "id": 285,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 16,
            "ranking": 5,
            "catValue": 2.6957446808510639
        }, {
            "$id": "82",
            "model_league": {
                "$ref": "2"
            },
            "id": 286,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 16,
            "ranking": 6,
            "catValue": 2.7210526315789472
        }, {
            "$id": "83",
            "model_league": {
                "$ref": "2"
            },
            "id": 287,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 16,
            "ranking": 7,
            "catValue": 2.875
        }, {
            "$id": "84",
            "model_league": {
                "$ref": "2"
            },
            "id": 288,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 16,
            "ranking": 8,
            "catValue": 2.979683972911964
        }, {
            "$id": "85",
            "model_league": {
                "$ref": "2"
            },
            "id": 289,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 16,
            "ranking": 9,
            "catValue": 3.0160965794768613
        }, {
            "$id": "86",
            "model_league": {
                "$ref": "2"
            },
            "id": 290,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 16,
            "ranking": 10,
            "catValue": 3.2066115702479339
        }, {
            "$id": "87",
            "model_league": {
                "$ref": "2"
            },
            "id": 291,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 16,
            "ranking": 11,
            "catValue": 3.2136929460580914
        }, {
            "$id": "88",
            "model_league": {
                "$ref": "2"
            },
            "id": 292,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 16,
            "ranking": 12,
            "catValue": 3.4043010752688172
        }, {
            "$id": "89",
            "model_league": {
                "$ref": "2"
            },
            "id": 293,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 16,
            "ranking": 13,
            "catValue": 3.5078431372549019
        }, {
            "$id": "90",
            "model_league": {
                "$ref": "2"
            },
            "id": 294,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 16,
            "ranking": 14,
            "catValue": 3.5702479338842976
        }, {
            "$id": "91",
            "model_league": {
                "$ref": "2"
            },
            "id": 295,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 16,
            "ranking": 15,
            "catValue": 3.5810185185185186
        }, {
            "$id": "92",
            "model_league": {
                "$ref": "2"
            },
            "id": 296,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 17,
            "ranking": 1,
            "catValue": 0.77330508474576276
        }, {
            "$id": "93",
            "model_league": {
                "$ref": "2"
            },
            "id": 297,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 17,
            "ranking": 2,
            "catValue": 0.78303747534516766
        }, {
            "$id": "94",
            "model_league": {
                "$ref": "2"
            },
            "id": 298,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 17,
            "ranking": 3,
            "catValue": 0.80851063829787229
        }, {
            "$id": "95",
            "model_league": {
                "$ref": "2"
            },
            "id": 299,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 17,
            "ranking": 4,
            "catValue": 0.83702213279678073
        }, {
            "$id": "96",
            "model_league": {
                "$ref": "2"
            },
            "id": 300,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 17,
            "ranking": 5,
            "catValue": 0.84126984126984128
        }, {
            "$id": "97",
            "model_league": {
                "$ref": "2"
            },
            "id": 301,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 17,
            "ranking": 6,
            "catValue": 0.84233261339092869
        }, {
            "$id": "98",
            "model_league": {
                "$ref": "2"
            },
            "id": 302,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 17,
            "ranking": 7,
            "catValue": 0.86004514672686228
        }, {
            "$id": "99",
            "model_league": {
                "$ref": "2"
            },
            "id": 303,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 17,
            "ranking": 8,
            "catValue": 0.89417989417989419
        }, {
            "$id": "100",
            "model_league": {
                "$ref": "2"
            },
            "id": 304,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 17,
            "ranking": 9,
            "catValue": 0.98235294117647054
        }, {
            "$id": "101",
            "model_league": {
                "$ref": "2"
            },
            "id": 305,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 17,
            "ranking": 10,
            "catValue": 0.987603305785124
        }, {
            "$id": "102",
            "model_league": {
                "$ref": "2"
            },
            "id": 306,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 17,
            "ranking": 11,
            "catValue": 0.99139784946236564
        }, {
            "$id": "103",
            "model_league": {
                "$ref": "2"
            },
            "id": 307,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 17,
            "ranking": 12,
            "catValue": 1.0210526315789474
        }, {
            "$id": "104",
            "model_league": {
                "$ref": "2"
            },
            "id": 308,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 17,
            "ranking": 13,
            "catValue": 1.0740740740740742
        }, {
            "$id": "105",
            "model_league": {
                "$ref": "2"
            },
            "id": 309,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 17,
            "ranking": 14,
            "catValue": 1.1348547717842323
        }, {
            "$id": "106",
            "model_league": {
                "$ref": "2"
            },
            "id": 310,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 17,
            "ranking": 15,
            "catValue": 1.1673553719008265
        }, {
            "$id": "107",
            "model_league": {
                "$ref": "2"
            },
            "id": 311,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 18,
            "ranking": 1,
            "catValue": 0.47484909456740443
        }, {
            "$id": "108",
            "model_league": {
                "$ref": "2"
            },
            "id": 312,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 18,
            "ranking": 2,
            "catValue": 0.4832347140039448
        }, {
            "$id": "109",
            "model_league": {
                "$ref": "2"
            },
            "id": 313,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 18,
            "ranking": 3,
            "catValue": 0.48979591836734693
        }, {
            "$id": "110",
            "model_league": {
                "$ref": "2"
            },
            "id": 314,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 18,
            "ranking": 4,
            "catValue": 0.51052631578947372
        }, {
            "$id": "111",
            "model_league": {
                "$ref": "2"
            },
            "id": 315,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 18,
            "ranking": 5,
            "catValue": 0.57671957671957674
        }, {
            "$id": "112",
            "model_league": {
                "$ref": "2"
            },
            "id": 316,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 18,
            "ranking": 6,
            "catValue": 0.5862745098039216
        }, {
            "$id": "113",
            "model_league": {
                "$ref": "2"
            },
            "id": 317,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 18,
            "ranking": 7,
            "catValue": 0.59297520661157022
        }, {
            "$id": "114",
            "model_league": {
                "$ref": "2"
            },
            "id": 318,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 18,
            "ranking": 8,
            "catValue": 0.597457627118644
        }, {
            "$id": "115",
            "model_league": {
                "$ref": "2"
            },
            "id": 319,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 18,
            "ranking": 9,
            "catValue": 0.66322314049586772
        }, {
            "$id": "116",
            "model_league": {
                "$ref": "2"
            },
            "id": 320,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 18,
            "ranking": 10,
            "catValue": 0.67234042553191486
        }, {
            "$id": "117",
            "model_league": {
                "$ref": "2"
            },
            "id": 321,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 18,
            "ranking": 11,
            "catValue": 0.69546436285097191
        }, {
            "$id": "118",
            "model_league": {
                "$ref": "2"
            },
            "id": 322,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 18,
            "ranking": 12,
            "catValue": 0.7020316027088036
        }, {
            "$id": "119",
            "model_league": {
                "$ref": "2"
            },
            "id": 323,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 18,
            "ranking": 13,
            "catValue": 0.73842592592592593
        }, {
            "$id": "120",
            "model_league": {
                "$ref": "2"
            },
            "id": 324,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 18,
            "ranking": 14,
            "catValue": 0.74273858921161828
        }, {
            "$id": "121",
            "model_league": {
                "$ref": "2"
            },
            "id": 325,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 18,
            "ranking": 15,
            "catValue": 0.76989247311827957
        }, {
            "$id": "122",
            "model_league": {
                "$ref": "2"
            },
            "id": 326,
            "model_league_id": 3,
            "team_id": 8,
            "catId": 19,
            "ranking": 15,
            "catValue": 1.3648915187376727
        }, {
            "$id": "123",
            "model_league": {
                "$ref": "2"
            },
            "id": 327,
            "model_league_id": 3,
            "team_id": 7,
            "catId": 19,
            "ranking": 14,
            "catValue": 1.4671201814058956
        }, {
            "$id": "124",
            "model_league": {
                "$ref": "2"
            },
            "id": 328,
            "model_league_id": 3,
            "team_id": 4,
            "catId": 19,
            "ranking": 13,
            "catValue": 1.4881209503239741
        }, {
            "$id": "125",
            "model_league": {
                "$ref": "2"
            },
            "id": 329,
            "model_league_id": 3,
            "team_id": 6,
            "catId": 19,
            "ranking": 12,
            "catValue": 1.5079365079365079
        }, {
            "$id": "126",
            "model_league": {
                "$ref": "2"
            },
            "id": 330,
            "model_league_id": 3,
            "team_id": 11,
            "catId": 19,
            "ranking": 11,
            "catValue": 1.5835010060362174
        }, {
            "$id": "127",
            "model_league": {
                "$ref": "2"
            },
            "id": 331,
            "model_league_id": 3,
            "team_id": 2,
            "catId": 19,
            "ranking": 10,
            "catValue": 1.5957446808510638
        }, {
            "$id": "128",
            "model_league": {
                "$ref": "2"
            },
            "id": 332,
            "model_league_id": 3,
            "team_id": 14,
            "catId": 19,
            "ranking": 9,
            "catValue": 1.668421052631579
        }, {
            "$id": "129",
            "model_league": {
                "$ref": "2"
            },
            "id": 333,
            "model_league_id": 3,
            "team_id": 9,
            "catId": 19,
            "ranking": 8,
            "catValue": 1.7539503386004516
        }, {
            "$id": "130",
            "model_league": {
                "$ref": "2"
            },
            "id": 334,
            "model_league_id": 3,
            "team_id": 12,
            "catId": 19,
            "ranking": 7,
            "catValue": 1.8795698924731183
        }, {
            "$id": "131",
            "model_league": {
                "$ref": "2"
            },
            "id": 335,
            "model_league_id": 3,
            "team_id": 3,
            "catId": 19,
            "ranking": 6,
            "catValue": 1.8877118644067796
        }, {
            "$id": "132",
            "model_league": {
                "$ref": "2"
            },
            "id": 336,
            "model_league_id": 3,
            "team_id": 1,
            "catId": 19,
            "ranking": 5,
            "catValue": 1.9107883817427387
        }, {
            "$id": "133",
            "model_league": {
                "$ref": "2"
            },
            "id": 337,
            "model_league_id": 3,
            "team_id": 5,
            "catId": 19,
            "ranking": 4,
            "catValue": 1.9537037037037037
        }, {
            "$id": "134",
            "model_league": {
                "$ref": "2"
            },
            "id": 338,
            "model_league_id": 3,
            "team_id": 15,
            "catId": 19,
            "ranking": 3,
            "catValue": 2.0215686274509803
        }, {
            "$id": "135",
            "model_league": {
                "$ref": "2"
            },
            "id": 339,
            "model_league_id": 3,
            "team_id": 10,
            "catId": 19,
            "ranking": 2,
            "catValue": 2.0826446280991737
        }, {
            "$id": "136",
            "model_league": {
                "$ref": "2"
            },
            "id": 340,
            "model_league_id": 3,
            "team_id": 13,
            "catId": 19,
            "ranking": 1,
            "catValue": 2.21900826446281
        }],
        "id": 3,
        "size": 150,
        "cats": "11111111100000000000000000000000000000000000000000",
        "season": 2017
    },
    "id": 206,
    "model_league_id": 3,
    "team_id": 14,
    "catId": 5,
    "ranking": 1,
    "catValue": 0.442
}, {
    "$ref": "3"
}, {
    "$ref": "4"
}, {
    "$ref": "5"
}, {
    "$ref": "6"
}, {
    "$ref": "7"
}, {
    "$ref": "8"
}, {
    "$ref": "9"
}, {
    "$ref": "10"
}, {
    "$ref": "11"
}, {
    "$ref": "12"
}, {
    "$ref": "13"
}, {
    "$ref": "14"
}, {
    "$ref": "15"
}, {
    "$ref": "16"
}, {
    "$ref": "17"
}, {
    "$ref": "18"
}, {
    "$ref": "19"
}, {
    "$ref": "20"
}, {
    "$ref": "21"
}, {
    "$ref": "22"
}, {
    "$ref": "23"
}, {
    "$ref": "24"
}, {
    "$ref": "25"
}, {
    "$ref": "26"
}, {
    "$ref": "27"
}, {
    "$ref": "28"
}, {
    "$ref": "29"
}, {
    "$ref": "30"
}, {
    "$ref": "31"
}, {
    "$ref": "32"
}, {
    "$ref": "33"
}, {
    "$ref": "34"
}, {
    "$ref": "35"
}, {
    "$ref": "36"
}, {
    "$ref": "37"
}, {
    "$ref": "38"
}, {
    "$ref": "39"
}, {
    "$ref": "40"
}, {
    "$ref": "41"
}, {
    "$ref": "42"
}, {
    "$ref": "43"
}, {
    "$ref": "44"
}, {
    "$ref": "45"
}, {
    "$ref": "46"
}, {
    "$ref": "47"
}, {
    "$ref": "48"
}, {
    "$ref": "49"
}, {
    "$ref": "50"
}, {
    "$ref": "51"
}, {
    "$ref": "52"
}, {
    "$ref": "53"
}, {
    "$ref": "54"
}, {
    "$ref": "55"
}, {
    "$ref": "56"
}, {
    "$ref": "57"
}, {
    "$ref": "58"
}, {
    "$ref": "59"
}, {
    "$ref": "60"
}, {
    "$ref": "61"
}, {
    "$ref": "62"
}, {
    "$ref": "63"
}, {
    "$ref": "64"
}, {
    "$ref": "65"
}, {
    "$ref": "66"
}, {
    "$ref": "67"
}, {
    "$ref": "68"
}, {
    "$ref": "69"
}, {
    "$ref": "70"
}, {
    "$ref": "71"
}, {
    "$ref": "72"
}, {
    "$ref": "73"
}, {
    "$ref": "74"
}, {
    "$ref": "75"
}, {
    "$ref": "76"
}, {
    "$ref": "77"
}, {
    "$ref": "78"
}, {
    "$ref": "79"
}, {
    "$ref": "80"
}, {
    "$ref": "81"
}, {
    "$ref": "82"
}, {
    "$ref": "83"
}, {
    "$ref": "84"
}, {
    "$ref": "85"
}, {
    "$ref": "86"
}, {
    "$ref": "87"
}, {
    "$ref": "88"
}, {
    "$ref": "89"
}, {
    "$ref": "90"
}, {
    "$ref": "91"
}, {
    "$ref": "92"
}, {
    "$ref": "93"
}, {
    "$ref": "94"
}, {
    "$ref": "95"
}, {
    "$ref": "96"
}, {
    "$ref": "97"
}, {
    "$ref": "98"
}, {
    "$ref": "99"
}, {
    "$ref": "100"
}, {
    "$ref": "101"
}, {
    "$ref": "102"
}, {
    "$ref": "103"
}, {
    "$ref": "104"
}, {
    "$ref": "105"
}, {
    "$ref": "106"
}, {
    "$ref": "107"
}, {
    "$ref": "108"
}, {
    "$ref": "109"
}, {
    "$ref": "110"
}, {
    "$ref": "111"
}, {
    "$ref": "112"
}, {
    "$ref": "113"
}, {
    "$ref": "114"
}, {
    "$ref": "115"
}, {
    "$ref": "116"
}, {
    "$ref": "117"
}, {
    "$ref": "118"
}, {
    "$ref": "119"
}, {
    "$ref": "120"
}, {
    "$ref": "121"
}, {
    "$ref": "122"
}, {
    "$ref": "123"
}, {
    "$ref": "124"
}, {
    "$ref": "125"
}, {
    "$ref": "126"
}, {
    "$ref": "127"
}, {
    "$ref": "128"
}, {
    "$ref": "129"
}, {
    "$ref": "130"
}, {
    "$ref": "131"
}, {
    "$ref": "132"
}, {
    "$ref": "133"
}, {
    "$ref": "134"
}, {
    "$ref": "135"
}, {
    "$ref": "136"
}]


/*
  wYNIK DRAFTU
  Format taki sam dla Yahoo/Espn
  Team to id tutaj a w punkcie 1 to nazwy, nie sparuje tego 
*/

[{
	"PickNumber": 1,
	"PlayerId": 101108,
	"Cost": 172,
	"Team": "364.l.1611.t.11"
}, {
	"PickNumber": 2,
	"PlayerId": 202738,
	"Cost": 55,
	"Team": "364.l.1611.t.6"
}, {
	"PickNumber": 3,
	"PlayerId": 200768,
	"Cost": 80,
	"Team": "364.l.1611.t.2"
}, {
	"PickNumber": 4,
	"PlayerId": 201144,
	"Cost": 69,
	"Team": "364.l.1611.t.7"
}, {
	"PickNumber": 5,
	"PlayerId": 203468,
	"Cost": 52,
	"Team": "364.l.1611.t.10"
}, {
	"PickNumber": 6,
	"PlayerId": 201566,
	"Cost": 91,
	"Team": "364.l.1611.t.12"
}, {
	"PickNumber": 7,
	"PlayerId": 203081,
	"Cost": 95,
	"Team": "364.l.1611.t.5"
}, {
	"PickNumber": 8,
	"PlayerId": 201935,
	"Cost": 93,
	"Team": "364.l.1611.t.4"
}, {
	"PickNumber": 9,
	"PlayerId": 202689,
	"Cost": 66,
	"Team": "364.l.1611.t.9"
}, {
	"PickNumber": 10,
	"PlayerId": 201939,
	"Cost": 146,
	"Team": "364.l.1611.t.3"
}, {
	"PickNumber": 11,
	"PlayerId": 201937,
	"Cost": 55,
	"Team": "364.l.1611.t.8"
}, {
	"PickNumber": 12,
	"PlayerId": 202339,
	"Cost": 68,
	"Team": "364.l.1611.t.1"
}, {
	"PickNumber": 13,
	"PlayerId": 201609,
	"Cost": 61,
	"Team": "364.l.1611.t.11"
}, {
	"PickNumber": 14,
	"PlayerId": 201950,
	"Cost": 49,
	"Team": "364.l.1611.t.6"
}, {
	"PickNumber": 15,
	"PlayerId": 201587,
	"Cost": 69,
	"Team": "364.l.1611.t.2"
}, {
	"PickNumber": 16,
	"PlayerId": 203506,
	"Cost": 43,
	"Team": "364.l.1611.t.7"
}, {
	"PickNumber": 17,
	"PlayerId": 1626164,
	"Cost": 52,
	"Team": "364.l.1611.t.10"
}, {
	"PickNumber": 18,
	"PlayerId": 203078,
	"Cost": 28,
	"Team": "364.l.1611.t.12"
}, {
	"PickNumber": 19,
	"PlayerId": 202734,
	"Cost": 7,
	"Team": "364.l.1611.t.5"
}, {
	"PickNumber": 20,
	"PlayerId": 202083,
	"Cost": 35,
	"Team": "364.l.1611.t.4"
}]

/*
 RANKING
 format jak ponizej. 
 PlayerId zmienia swój format i mozna sparować z wynikiem draftu
 
 Pytanie 1 Skad mam wiedziec czy dla danego gracza została uzyta projekcja
 Pytanie 2 Ten Json zostaje ?
*/

[{
    "PLAYER_ID": 201142,
    "player_NAME": "KevinDurant",
    "GAMES": 61,
    "MINS_string": "33:54",
    "M": null,
    "FG_": 0.53756,
    "C3PA_FGA": null,
    "FGM": null,
    "FGA": 16.803278,
    "FGMS": null,
    "C3PM": 1.91803,
    "C3PM48": null,
    "C3PA": null,
    "C3PMS": null,
    "C3P_": null,
    "C2P_": null,
    "AFG_": null,
    "FT_": 0.875,
    "FTM": null,
    "FTA": 6.29508,
    "FTMS": null,
    "NETFT": null,
    "C2PM": null,
    "C2PA": null,
    "OREB": null,
    "DREB": null,
    "REB": 8.40984,
    "AST": null,
    "STL": 1.09836,
    "BLK": 1.62295,
    "SB": null,
    "PTS48": null,
    "DPG": null,
    "ATO": 2.1970835745135582,
    "A_TO": null,
    "S_TO": null,
    "TO": 2.2459,
    "TRN48": null,
    "PF": null,
    "PTS": 25.4918,
    "PPG": null,
    "T": null,
    "DD": null,
    "TD": null,
    "EJ": null,
    "FL": null,
    "GS": null,
    "FO": null,
    "PTSv": 1.825322126336,
    "C3PMv": 0.601813285022,
    "REBv": 1.204155265892,
    "ASTv": null,
    "STLv": 0.219364875517,
    "BLKv": 1.9150272598673,
    "FG_v": 1.9156660886178547,
    "FT_v": 1.2693484555352899,
    "TOv": null,
    "C3PM_v": null,
    "C2PM_v": null,
    "AFG_v": null,
    "DRBv": null,
    "ORBv": null,
    "DDv": null,
    "TDv": null,
    "FGMv": null,
    "FGAv": null,
    "FGMSv": null,
    "Fv": null,
    "FTMv": null,
    "FTAv": null,
    "FTMSv": null,
    "Mv": null,
    "FG3Av": null,
    "FG3MSv": null,
    "FG2Mv": null,
    "FG2Av": null,
    "ATOv": 0.57489507558923358,
    "NFTv": null,
    "TO48v": null,
    "FG3M48v": null,
    "DPGv": null,
    "PPGv": null,
    "S_Bv": null,
    "PTS48v": null,
    "S_TOv": null,
    "A_TOv": null,
    "Tv": null,
    "C3A_FGAv": null,
    "GSv": null,
    "FOv": null,
    "Ev": null,
    "FLv": null,
    "M_Gv": null,
    "total_value": 1.1906990540470848,
    "dollars": 0.0,
    "playerStatus": "GTD",
    "position": "SF,PF",
    "teamShort": "GSW",
    "own": "sama-sama",
    "ranking": 1,
    "team_key": "364.l.1611.t.8"
}]