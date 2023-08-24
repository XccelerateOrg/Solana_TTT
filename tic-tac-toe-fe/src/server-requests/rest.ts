export async function sendMatchRequest(address: string, opponentAddress: string) {
    const result = await fetch('http://localhost:8080/search-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: address,
            opponentAddress: opponentAddress
        })
    }).then((res) => { 
            return res.json();
    }).then((res) => {
        console.log(res);
    })
}

export async function sendForfeitRequest(address: string, game_id: string) {
    const result = await fetch('http://localhost:8080/forfeit-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: address,
            game_id: game_id
        })
    }).then((res) => {
            return res.json();
    }).then((res) => {
        console.log(res);
    });
}

export async function move() {
    const result = await fetch('http://localhost:8080/move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: '0x0',
            game_id: '0x0',
            move: '0x0'
        })
    }).then((res) => {
            return res.json();
    }).then((res) => {
        console.log(res);
    });
}