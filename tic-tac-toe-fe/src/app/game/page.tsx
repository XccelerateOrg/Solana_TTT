"use client";
import { useContext, useEffect, useMemo, useState } from 'react';
import Gameboard from '../../components/game/gameboard';
import PlayerInfo from "../../components/game/player-info"
import styles from '../game.module.css';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { GameContext } from '@/providers/game-provider';

export default function GameScreen() {

    const router = useRouter();
    const anchorWallet = useAnchorWallet();
    const {gameKeypair, player2, wager} = useContext(GameContext);

    function forfeitMatch() {
        /* 
            Feature 5: Forfeit Match
        */
        alert('Forfeit Match')
    }

    function goBack() {
        router.push('/');
    }
    
    useEffect(() => {
        if(!anchorWallet?.publicKey) {
            goBack();
        }
    }, [gameKeypair, player2]);
    
    const totalWager = useMemo(() => {
        /**
         * Feature 2: Total Wager
         */
        return 20 * 2;
    }, [wager])

    return (
        <main className={styles.main}>
            <div className={styles.wagerContainer}>
                <p>
                    Total Wager: {totalWager}SOL
                </p>
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