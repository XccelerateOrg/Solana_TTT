"use client";
import Image from 'next/image';
import styles from './page.module.css'
import Navbar from './components/navbar'
import ConnectWallet from './components/home/connect-wallet';
import SendMatchToAddress from './components/home/send-match-to-address';
import FindMatch from './components/home/find-match';
import { useEffect, useState } from 'react';
import SearchingModal from './components/searching-modal';
import { useRouter } from 'next/navigation';

export default function Home() {

  const [isSearching, setIsSearching] = useState(true);
  const router = useRouter();

  function acceptGame() {
    router.push('/game');
  }

  function rejectGame() {
    setIsSearching(false);
  } 

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:443');
    websocket.onmessage = (event) => {
      alert(event);
    }
  }, [router])

  return (
    <main className = {styles.main}>
      {isSearching && <SearchingModal acceptGame={acceptGame} rejectGame={rejectGame}/>}
      {/* Create Navbar */}
      <Navbar />
      <div style={{
        padding: '0px 20px',
        width:'100%', 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center'
      }}>
        {/* Connect Wallet Button */}
        <ConnectWallet />
        {/* Send match Input Bar and Button */}
        <SendMatchToAddress />
        {/* OR */}
        <h1 style={{margin: '20px 0'}}>OR</h1>
        {/* Find match options and Button */}
        <FindMatch />
      </div>
    </main>
  )
}
