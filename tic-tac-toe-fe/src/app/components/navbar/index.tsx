import Link from "next/link";

export default function Navbar() {
    return (
        <div style={{width:'100vw', height: '12vh', backgroundColor:'#0B3A44', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: '0 4vw'}}>
            <Link href={'/'} style={{color:'#FFFFFF'}}><p>TicTacToe</p></Link>
            <div style={{display:'flex', flexDirection:'row', minWidth:'60%', justifyContent:'flex-end', gap: 12}}>
                <Link href={'/'} style={{color:'#FFFFFF'}}><p>Home</p></Link>
                <Link href={'/leaderboard'} style={{color:'#FFFFFF'}}><p>Leaderboard</p></Link>
                <Link href={'/settings'} style={{color:'#FFFFFF'}}><p>Settings</p></Link>
            </div>
        </div>
    )
}