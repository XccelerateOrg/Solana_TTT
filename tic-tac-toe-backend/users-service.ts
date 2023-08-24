export class UsersService {
    ws: any;
    address: string;
    connected_users: string[];
    
    constructor(address: string, ws: any) {
        this.ws = ws;
        this.address = address;
        this.connected_users = [];
    }

    async addUser() {
        this.connected_users.push(this.address);
        this.ws.send(JSON.stringify({
            address: this.address,
            type: 'addUser'
        }));
    }

    async getUser() {
        return true;
    }
}