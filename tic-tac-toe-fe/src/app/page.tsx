"use client";
import styles from './page.module.css'
import Navbar from '../components/navbar'
import FindMatch from '../components/home/find-match';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { initializeProgram, isPublicKey, setupGame } from '@/program-functions';
import { Keypair, Signer } from '@solana/web3.js';
import { GameContext } from '@/providers/game-provider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {

  const [opponentAddress, setOpponentAddress] = useState('');
  const router = useRouter();
  const anchorWallet = useAnchorWallet();
  const {setGameKeypair, setPlayer2, setProgram} = useContext(GameContext);
  // const wallet = useWallet();

  async function playGame() {
    let gameStarted = await startGame();
    if(gameStarted) {
      router.push('/game', {}); 
    } else {
      alert('Game failed to start');
    }
  }

  async function startGame() {
    const program = await initializeProgram(anchorWallet as Wallet);
    if(anchorWallet) {
        try {
          let player2 = Keypair.generate();
          /**
           * Feature 1: Provide correct value of Wager to the Solana program
           */
          const gameKeypair = await setupGame(program, player2.publicKey, {wager100: {}});
          setProgram(program);
          setGameKeypair(gameKeypair);
          setPlayer2(player2);
          if(gameKeypair) {
            return true;
          }
        } catch (err) {
           console.log("Transaction error:", err);
           return false;
        }
    } else {
        alert('Wallet not connected');
    }
  }
  async function startMatch() {
    if(isPublicKey(opponentAddress)) {
        playGame();
    } else {
        alert('Opponent address is not a public key');
    }   
  } 


  return (
    <main className = {styles.main}>
      <div className={styles.innerContainer}>
        <h1 style={{margin: '20px 0'}}>Welcome to Solana Tic Tac Toe</h1>
        <div style={{
          display:'flex',
          flexDirection: 'row',
          width:'100%',
          gap: 20,
          padding: '20px 0'
        }}>
          <input className={styles.input} 
              name="opponent-address" 
              value={undefined} 
              placeholder="Input Opponent Address"
              onChange={(e) => {
                  setOpponentAddress(e.target.value);
              }}
          />
          <button className={styles.button} onClick={startMatch}>Start Match</button>
        </div>
        <FindMatch startMatch={startMatch} />
      </div>
    </main>
  )
}
