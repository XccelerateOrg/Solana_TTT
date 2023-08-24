import { useState } from "react"
import styles from '../../page.module.css'

export default function FindMatch() {

    const [selectedWager, setSelectedWager] = useState<null | number>(null);

    function findMatch() {
        // Find a new match based on which tab is selected
        alert('Wager' + selectedWager);
    }

    return (
        <div className={styles.findMatchContainer}>
            {/* Tab1 */}{/* Tab2 */}{/* Tab3 */}
            <div className={styles.findMatchTileContainer}>
                <div onClick={()=>{
                    setSelectedWager(1);
                }} className={`${styles.findMatchTile} ${selectedWager == 1 && styles.active}`}>
                    <p>Wager 20SOL</p>
                </div>
                <div onClick={()=>{
                    setSelectedWager(2);
                }} className={`${styles.findMatchTile} ${selectedWager == 2 && styles.active}`}>
                    <p>Wager 50SOL</p>
                </div>
                <div onClick={()=>{
                    setSelectedWager(3);
                }} className={`${styles.findMatchTile} ${selectedWager == 3 && styles.active}`}>
                    <p>Wager 100SOL</p>
                </div>
            </div>
            {/* Button - Find Match */}
            <button className={styles.button} onClick={findMatch}>Find Match</button>
        </div>
    )
}