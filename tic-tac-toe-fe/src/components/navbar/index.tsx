import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export default function Navbar() {
    return (
        <div style={{width:'100vw', height: '12vh', backgroundColor:'#0B3A44', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: '0 40px'}}>
            <Link href={'/'} style={{color:'#FFFFFF'}}><p>TicTacToe</p></Link>
            <div style={{display:'flex', flexDirection:'row', minWidth:'60%', justifyContent:'flex-end', gap: 12}}>
                <WalletMultiButton />
            </div>
        </div>
    )
}