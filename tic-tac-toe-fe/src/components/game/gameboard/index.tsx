import { useContext, useEffect, useMemo, useState } from 'react';
import styles from '../../../app/game.module.css';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@project-serum/anchor';
import { getGameState, playMove } from '@/program-functions';
import { GameContext } from '@/providers/game-provider';
import { Grid, defaultGrid } from './types';
import { checkWin, isGameOver } from './game-methods';

type GameboardProps = {
    goBack: () => void;
    gameKeypair: Keypair | null;
    player1: AnchorWallet | undefined;
    player2: AnchorWallet | undefined;
}

export default function Gameboard({goBack, gameKeypair, player1, player2}: GameboardProps) {
    const {program} = useContext(GameContext);
    const [grid, setGrid] = useState<Grid>(defaultGrid);
    const [playerTurn, setPlayerTurn] = useState(1);
    const [_, setLoading] = useState(true);

    useEffect(() => {
        if(!player1?.publicKey || !player2?.publicKey || !gameKeypair?.publicKey) {
            goBack();
        } else {
            setLoading(true);
            checkGameState();
        }
    }, [grid])

    /*
        * Play a move
        * If the player is player 1, play an X
        * If the player is player 2, play an O
        * Check if the location is already filled
    */
    async function play (cell: number) {
        if(player1 && player2) {
            const player = playerTurn === 1 ? player1 : player2;
            const row = cell <= 3 ? 0 : cell <= 6 ? 1 : 2;
            const column = cell % 3 === 0 ? 2 : cell % 3 - 1;
            if (program && gameKeypair && player) {
                const tx = await playMove(program, gameKeypair, playerTurn, player as Wallet, {row , column});
                if(tx) {
                    setPlayerTurn(playerTurn === 1 ? 2 : 1);
                    setGrid({
                        ...grid,
                        [cell]: playerTurn === 1 ? "X" : "O"
                    })
                }
            }
        }
    };

    /*
        * Check if the game is over
        * If it is, check if the player won
        * If they did, alert them
        * If they didn't, alert them 
    */
    async function checkGameState(): Promise<void>{
        if(gameKeypair) {
            const gameState = await getGameState(program, gameKeypair);
            const gameOver = isGameOver(gameState);
            if(gameOver) {
                const winner = checkWin(grid, gameState);
                if(winner) {
                    alert("Player " + (playerTurn == 1 ? 2 : 1) + " wins!");
                } else {
                    alert ("Game Tied");
                }
            }
        }
        setLoading(false);
    }

    return (
        <div className={styles.gameboard}>
            <div className={styles.grid}>
                <div className={styles.row}>
                    {[1,2,3].map((cell: number, index: number) => {
                        return (
                            <input key={index} className={styles.cell} id={"cell-" + cell} value={grid[cell]} onClick={()=>{play(cell)}}/>
                        )
                    })}
                </div>
                <div className={styles.row}>
                    {[4,5,6].map((cell: number, index: number) => {
                        return (
                            <input key={index} className={styles.cell} id={"cell-" + cell} value={grid[cell]} onClick={()=>{play(cell)}}/>
                        )
                    })}
                </div>
                <div className={styles.row}>
                    {[7,8,9].map((cell: number, index: number) => {
                        return (
                            <input key={index} className={styles.cell} id={"cell-" + cell} value={grid[cell]} onClick={()=>{play(cell)}}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}