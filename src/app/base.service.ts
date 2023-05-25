export class BaseService {
    constructor() { }

    public GetBaseUrl(){
        return (document.location.href.indexOf("ninja") != -1 ? ``: 
              //  (document.location.href.indexOf("4200") != -1 ? `http://localhost:4200`: 
                `http://localhost/TeamMate`
            //) 
            );
    }
}