import PlayerInfo from "../game/player-info";
import WagerInfo from "./wager-info";
import styles from '../../game.module.css';

export default function SearchingModal({acceptGame, rejectGame}: any){
    return (
        <div style={{position:'absolute', height:'100vh', width:'100vw', backgroundColor: 'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{backgroundColor:'#7D2FCB', width:'60%', height:'60%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:"#FFF", gap:20}}>
                <h2>Searching for match...</h2>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap: 20}}>
                    {/* Player 1 Info */}
                    <PlayerInfo playerId={1} />
                    {/* Wager Info */}
                    <WagerInfo />
                    {/* Player 2 Info */}
                    <PlayerInfo playerId={2} />
                </div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 20}}>
                    {/* Accept Button */}
                    <button className={styles.button} onClick={acceptGame}>Accept</button>
                    {/* Decline Button */}
                    <button className={styles.button} onClick={rejectGame}>Decline</button>
                </div>
            </div>
            <h1>Modal</h1>
        </div>
    )
}