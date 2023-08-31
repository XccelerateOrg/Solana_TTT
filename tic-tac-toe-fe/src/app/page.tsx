"use client";
import Image from 'next/image';
import styles from './page.module.css'
import Navbar from '../components/navbar'
import ConnectWallet from '../components/home/connect-wallet';
import SendMatchToAddress from '../components/home/send-match-to-address';
import FindMatch from '../components/home/find-match';
import { useContext, useEffect, useState } from 'react';
import SearchingModal from '../components/searching-modal';
import { useRouter } from 'next/navigation';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { solana_TTTProgramInterface, solana_TTTProgramId, commitmentLevel, connection } from '@/constants/constants';
import {TicTacToeProgram} from '../../../tic-tac-toe-program/target/types/tic_tac_toe_program';
import { initializeProgram, setupGame } from '@/program-functions';
import { Keypair, Signer } from '@solana/web3.js';
import { GameContext } from '@/providers/game-provider';
import { set } from '@project-serum/anchor/dist/cjs/utils/features';

export default function Home() {

  const [isSearching, setIsSearching] = useState(true);
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
          // Setup a new game
          const gameKeypair = await setupGame(program, player2.publicKey, {wager100: {}});
         
          // Store keys for game and player 2
          setProgram(program);
          setGameKeypair(gameKeypair);
          setPlayer2(player2);

          // if the transaction fails then return null
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

  return (
    <main className = {styles.main}>
      {/* {isSearching && <SearchingModal/>} */}
      {/* Create Navbar */}
      <Navbar />
      <div style={{
        padding: '0px 20px',
        width:'100%', 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center'
      }}>
        <ConnectWallet />
        <SendMatchToAddress playGame={playGame} />
        <h1 style={{margin: '20px 0'}}>OR</h1>
        <FindMatch />
      </div>
    </main>
  )
}
