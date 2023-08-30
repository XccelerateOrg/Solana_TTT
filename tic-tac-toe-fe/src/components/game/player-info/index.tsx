import styles from '../../../app/game.module.css';

export default function PlayerInfo({playerId}: any) {
    const playerInfoValues = {
        g_played: 90,
        g_won: 23,
        g_drawn: 60,
        g_lost: 7,
        global_rank: 89,
        head_2_head: 1
    }
    const playerInfoFields = ['Games Played', 'Games Won', 'Games Drawn', 'Games Lost', 'Global Rank', 'Head-to-Head']
    return (
        <div className={styles.playerInfoContainer}>
            <h2>Player {playerId}</h2>
            {Object.values(playerInfoValues).map((info: any, index: number) => <p key={index}>{playerInfoFields[index]}: {info}</p>)}
        </div>
    )
}