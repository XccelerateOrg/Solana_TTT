import { PublicKey, Signer } from "@solana/web3.js";

function setupGame(player_one: Signer, player_two: PublicKey, wager: number) {
    // send a transaction to setup a new game
}

function playMove(tile: {row: number, column: number}, player: PublicKey) {
    // send a transaction to make a move in the game
}