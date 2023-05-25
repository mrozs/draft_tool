import { Categories } from './../categories';
import { PlayerCombinations } from './player.combinations';
import { PlayerCombination } from './player.combination';
import { Player } from './../player/player';

export class PlayerCombinationsAdapter {

    static adapt(playerCombinationsJsonRepresentation: any): PlayerCombinations {
        const playerCombinations = new PlayerCombinations();
        playerCombinations.averageGain = playerCombinationsJsonRepresentation.averageGain;
        playerCombinationsJsonRepresentation.combinations.forEach(combination => {
            let playerCombination = new PlayerCombination();
            playerCombination.averageValue = combination.averageValue;
            playerCombination.for = combination.for;
            playerCombination.gain = combination.gain;
            combination.players.forEach(playerJsonRepresentation => {
                playerCombination.players.push(playerJsonRepresentation as Player);
            });
            
            playerCombinations.add(playerCombination);
        });

        return playerCombinations;
    }
}