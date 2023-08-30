'use client';
import React, {FC, ReactNode, useEffect, useMemo} from "react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

export const LocalWalletProvider: FC<{children: ReactNode}> = ({children}) => {
    
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter(), new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        setIsReady(true);
    }, [])
    
    if(isReady === false) {
        return null;
    }
    
    return (
        <ConnectionProvider endpoint="http://127.0.0.1:8899">
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
