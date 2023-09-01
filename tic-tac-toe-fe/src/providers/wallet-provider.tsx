'use client';
import React, {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { Keypair, clusterApiUrl } from '@solana/web3.js';
import { GameContext } from "./game-provider";
import { Program, Wallet } from "@project-serum/anchor";
import { TicTacToeProgram } from "@/program/types/tic_tac_toe_program";
import { WagerOption } from "@/types/game-types";
import Navbar from "@/components/navbar";

require('@solana/wallet-adapter-react-ui/styles.css');

export const LocalWalletProvider: FC<{children: ReactNode}> = ({children}) => {
    
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter(), new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
    const [isReady, setIsReady] = useState(false);
    const [gameKeypair, setGameKeypair] = useState<Keypair | null>(null);
    const [player1, setPlayer1] = useState<Wallet | null>(null);
    const [player2, setPlayer2] = useState<Keypair | null>(null);
    const [program, setProgram] = useState<Program<TicTacToeProgram> | null>(null);
    const [wager, setWager] = useState<WagerOption | null>(null);

    useEffect(() => {
        setIsReady(true);
    }, [])
    
    if(isReady === false) {
        return null;
    }
    
    return (
        <ConnectionProvider endpoint="http://127.0.0.1:8899">
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <GameContext.Provider value={{
                        gameKeypair: gameKeypair,
                        player1: player1,
                        player2: player2,
                        wager: wager,
                        program: program,
                        has_started: false,
                        setGameKeypair: setGameKeypair,
                        setPlayer1: setPlayer1,
                        setPlayer2: setPlayer2,
                        setProgram: setProgram,
                        setWager: setWager,
                    }}>
                        <Navbar/>
                        {children}
                    </GameContext.Provider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
