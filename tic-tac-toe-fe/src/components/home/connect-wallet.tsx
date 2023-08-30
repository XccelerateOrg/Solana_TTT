import { useState } from "react";
import styles from '../../app/page.module.css';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ConnectWallet() { 

    // walletConnected: true/false
    const wallet = useWallet();
    // console.log(wallet.connected);
    return (
        <div className={styles.connectWalletContainer}>
            <WalletMultiButton />
        </div>
    )
}
