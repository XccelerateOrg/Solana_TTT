'use client';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.css';
import { sendForfeitRequest, sendMatchRequest } from '@/server-requests/rest';
import { initializeProgram, isPublicKey, playMove, setupGame } from '@/program-functions';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@project-serum/anchor';
import { useRouter } from 'next/router';

export default function SendMatchToAddress({playGame}: {playGame: () => void}) {

    const [opponentAddress, setOpponentAddress] = useState('');
    const [isReady, setIsReady] = useState(false);
    const anchorWallet = useAnchorWallet();
    const wallet = useWallet();

    async function sendChallenge() {
        /* Interact with the program via rpc */
        if(isPublicKey(opponentAddress)) {
            /* 
                Initalize a new game
                Send a match request to the opponent
            */
            playGame();
        } else {
            alert('Opponent address is not a public key');
        }   
    }

    return (
        <div className={styles.sendMatchContainer}>
            <input className={styles.input} 
                name="opponent-address" 
                value={undefined} 
                placeholder="Input Opponent Address"
                onChange={(e) => {
                    setOpponentAddress(e.target.value);
                }}
            />
            <button className={styles.button} onClick={sendChallenge}>Send Challenge</button>
        </div>
    )
}