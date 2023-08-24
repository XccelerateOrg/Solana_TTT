import { GameType } from "./enums";

class GameFinderService {
    // Queue of users waiting for a game
    option1queue: string[];
    option2queue: string[];
    option3queue: string[];

    constructor() {
        this.option1queue = [];
        this.option2queue = [];
        this.option3queue = [];
    }

    // Find a random game for the user
    
     // OR

    // Send game request to the provided user address

    findGame(userAddress: string, opponentAddress: string | null, gameType: GameType) {
        if (gameType == GameType.SOL20) {
            this._findGameInQueue(userAddress, this.option1queue);
        } else if (gameType == GameType.SOL50) {
            this._findGameInQueue(userAddress, this.option2queue);
        } else if (gameType == GameType.SOL100) {
            this._findGameInQueue(userAddress, this.option3queue);
        } else if (gameType == GameType.OnevOne) {
            // Send game request to the provided user address
            this._sendGameRequest(userAddress, opponentAddress);
        } else {
            throw new Error("Invalid game type");
        }
    }

    private _findGameInQueue(userAddress, queue: string[]) {
        if(queue.length > 0) {
            // Send game request to the user at the front of the queue
            // Remove user from the queue
        } else {
            // Add user to the queue
            queue.push(userAddress);
        }
    }

    private _sendGameRequest(userAddress: string, opponentAddress: string | null) {
        // Send game request to the provided user address if user is active

        // Throw error if user is not active
    }
}