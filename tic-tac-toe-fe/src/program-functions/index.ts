import { Keypair, PublicKey, Signer } from "@solana/web3.js";
import { TicTacToeProgram } from "../../../tic-tac-toe-program/target/types/tic_tac_toe_program";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { commitmentLevel, connection, solana_TTTProgramId, solana_TTTProgramInterface } from "@/constants/constants";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

async function initializeProgram(anchorWallet: Wallet) {
    const provider = new AnchorProvider(connection, anchorWallet, {
        preflightCommitment: commitmentLevel
    });
    const program = new Program(
        solana_TTTProgramInterface,
        solana_TTTProgramId,
        provider
    ) as Program<TicTacToeProgram>;

    return program;
}

async function setupGame(program: Program<TicTacToeProgram>, player_two: PublicKey, wager: any): Promise<Keypair | null> {
    // send a transaction to setup a new game
    const gameKeypair = Keypair.generate();
    let player_one = (program.provider as AnchorProvider).wallet;
    player_two = player_two;
    
    const txn = await program.rpc.setupGame(player_two, {
      accounts: {
        game: gameKeypair.publicKey,
        playerOne: player_one.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [gameKeypair],
    })
    if (txn) {
        console.log("Your transaction signature", txn);
        return gameKeypair;
    }
    return null;
}

async function playMove(
    program: Program<TicTacToeProgram>,
    gameKeypair: Keypair, 
    player: any, 
    tile: {row: number, column: number}, 
) {
    console.log(player);
    // send a transaction to make a move in the game
    const tx = await program.rpc.play({...tile}, {
      accounts: {
        player: player.publicKey,
        game: gameKeypair.publicKey,
      },
      signers: [player],
    });
    console.log(tx);
}

function isPublicKey(key: String): boolean {
    try {
      let publicKey = new PublicKey(key);
      return true;
    } catch (err) {
      return false;
    }
}

async function getGameState(program: any, gameKeypair: Keypair) {
  const gameState = await program.account.game.fetch(gameKeypair.publicKey);
  return gameState;
}

export {initializeProgram, setupGame, playMove, isPublicKey, getGameState};