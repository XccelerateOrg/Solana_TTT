import { Program } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { createContext } from "react";
import { TicTacToeProgram } from "../../../tic-tac-toe-program/target/types/tic_tac_toe_program";

export const GameContext = createContext<{
    gameKeypair: Keypair | null;
    player1: any;
    player2: any;
    has_started: boolean;
    program: Program<TicTacToeProgram> | null;
    setGameKeypair: (gameKeypair: any) => void;
    setPlayer1: (player1: any) => void;
    setPlayer2: (player2: any) => void;
    setProgram: (program: any) => void;
}>({
    gameKeypair: null,
    player1: null,
    player2: null,
    program: null,
    has_started: false,
    setGameKeypair: (gameKeypair: any) => {},
    setPlayer1: (player1: any) => {},
    setPlayer2: (player2: any) => {},
    setProgram: (program: any) => {},
});