import { Program } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { createContext } from "react";
import { TicTacToeProgram } from "../../../tic-tac-toe-program/target/types/tic_tac_toe_program";
import { WagerOption } from "@/types/game-types";

export const GameContext = createContext<{
    gameKeypair: Keypair | null;
    player1: any;
    player2: any;
    has_started: boolean;
    wager: WagerOption | null;
    program: Program<TicTacToeProgram> | null;
    setGameKeypair: (gameKeypair: any) => void;
    setPlayer1: (player1: any) => void;
    setPlayer2: (player2: any) => void;
    setProgram: (program: any) => void;
    setWager: (wager: WagerOption) => void;
}>({
    gameKeypair: null,
    player1: null,
    player2: null,
    wager: null,
    program: null,
    has_started: false,
    setGameKeypair: (gameKeypair: any) => {},
    setPlayer1: (player1: any) => {},
    setPlayer2: (player2: any) => {},
    setProgram: (program: any) => {},
    setWager: (wager: WagerOption) => {},
});