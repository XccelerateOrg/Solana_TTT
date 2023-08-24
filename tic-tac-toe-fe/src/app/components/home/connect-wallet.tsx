import { useState } from "react";
import styles from '../../page.module.css';

export default function ConnectWallet() { 

    // walletConnected: true/false
    const [walletConnected, setWalletConnected] = useState(false);

    return (
        <div className={styles.connectWalletContainer}>
            {
                walletConnected === true ? 
                <p>HpHyjDqEtU8hvutBJyuqUu1MsgfXRvgyY4hPM8PbodN2</p> 
                :
                <button className={styles.button} onClick={()=>{setWalletConnected(true);}}>Connect Wallet</button>
            }
        </div>
    )
}
