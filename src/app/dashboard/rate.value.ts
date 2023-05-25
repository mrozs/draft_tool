export class RateValue {
    valueRate(value) {
        const count = 2.5641025641025643;
        let retValue = "";
        if (value > 3 / count) {
            retValue = "over100";
        }
        else if (value > 2.4 / count) {
            retValue = "over80";
        }
        else if (value > 1.8 / count) {
            retValue = "over60";
        }
        else if (value > 1.2 / count) {
            retValue = "over40";
        }
        else if (value > 0.6 / count) {
            retValue = "over20";
        }

        else if (value > 0.3 / count) {
            retValue = "over10";
        }
        else if (value < -3 / count) {
            retValue = "under100";
        }
        else if (value < -2.4 / count) {
            retValue = "under80";
        }
        else if (value < -1.8 / count) {
            retValue = "under60";
        }
        else if (value < -1.2 / count) {
            retValue = "under40";
        }
        else if (value < -0.6 / count) {
            retValue = "under20";
        }
        else if (value < -0.3 / count) {
            retValue = "under10";
        }
        else retValue = "about0";

        return retValue;
    }
}
