import { useState } from 'react';
import styles from '../../page.module.css';
import { sendForfeitRequest, sendMatchRequest } from '@/server-requests/rest';

export default function SendMatchToAddress() {

    const [opponentAddress, setOpponentAddress] = useState('');

    function sendChallenge() {
        alert(opponentAddress);
        // sendMatchRequest('dummy-address', opponentAddress);
        sendForfeitRequest('dummy-address', opponentAddress);
        // Send Challenge to specified address
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