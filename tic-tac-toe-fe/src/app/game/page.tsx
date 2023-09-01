"use client";
import { useContext, useEffect, useState } from 'react';
import Gameboard from '../../components/game/gameboard';
import PlayerInfo from "../../components/game/player-info"
import Navbar from "../../components/navbar"
import styles from '../game.module.css';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { initializeProgram, setupGame } from '@/program-functions';
import { Wallet } from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import { GameContext } from '@/providers/game-provider';

export default function GameScreen() {

    const router = useRouter();
    const anchorWallet = useAnchorWallet();
    const {gameKeypair, player2} = useContext(GameContext);

    function forfeitMatch() {
        alert('Forfeit Match')
    }
    
    useEffect(() => {
        if(!anchorWallet?.publicKey) {
            router.push('/');
        } else {
            // it is a valid game
        }
    }, [gameKeypair, player2]);

    function goBack() {
        router.push('/');
    }

    return (
        <main className={styles.main}>
            <Navbar/>
            <div className={styles.wagerContainer}>
                <p>Total Wager: 40SOL</p>
            </div>
            <div className={styles.gameContainer}>
                <PlayerInfo playerId={1} />
                <Gameboard goBack={goBack} gameKeypair={gameKeypair} player1={anchorWallet} player2={player2}/>
                <PlayerInfo playerId={2} />
            </div>
            <button className={styles.button} onClick={forfeitMatch}>Forfeit</button>
        </main>
    )
}