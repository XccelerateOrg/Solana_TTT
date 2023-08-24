import express from 'express';
const webserver = express();
const PORT = 8080 || process.env.PORT;
const {WebSocketServer} = require('ws');
const sockserver = new WebSocketServer({port: 443});
const {UsersService} = require('./users-service');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use(bodyParser.json());
webserver.use(cors(corsOptions));

class AppEngine {
    connected_users: string[];
    constructor() {
        this.connected_users = [];
    }

    // Be responsible for creating new users

}

webserver.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Hello World');
    // Send search for game to opponent through websocket
})

webserver.post('/search-game', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({
        message: 'Searching for game',
        status: 200
    });

    // Send search for game to opponent through websocket
})

webserver.post('/forfeit-game', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({
        message: 'Forfeiting game',
        status: 200
    });
    // Send forfeit to opponent through websocket
})

webserver.post('/move', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Move made');
    // Send move to opponent through websocket
})

webserver.listen(PORT, ()=>console.log(`Listening on ${PORT}`));