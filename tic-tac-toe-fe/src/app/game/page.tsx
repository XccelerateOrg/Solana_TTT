"use client";
import Gameboard from "../components/game/gameboard"
import PlayerInfo from "../components/game/player-info"
import Navbar from "../components/navbar"
import styles from '../game.module.css';

export default function GameScreen() {

    function forfeitMatch() {
        alert('Forfeit Match')
    }

    return (
        <main className={styles.main}>
            {/* Navbar */}
            <Navbar/>
            {/* Total Wager */}
            <div className={styles.wagerContainer}>
                <p>Total Wager: 40SOL</p>
            </div>
            <div className={styles.gameContainer}>
                {/* Player 1 Info */}
                <PlayerInfo playerId={1} />
                {/* Game Board */}
                <Gameboard />
                {/* Player 2 Info */}
                <PlayerInfo playerId={2} />
            </div>
            {/* Forfeit Button */}
            <button className={styles.button} onClick={forfeitMatch}>Forfeit</button>
        </main>
    )
}