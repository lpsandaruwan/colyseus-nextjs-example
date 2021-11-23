"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeRoom = void 0;
const build_1 = require("/home/lahirup/Desktop/Colyseus/colyseus/packages/core/build");
const TicTacToeRoomState_1 = require("./schema/TicTacToeRoomState");
class TicTacToeRoom extends build_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 2;
    }
    onCreate(options) {
        this.setState(new TicTacToeRoomState_1.TicTacToeRoomState());
        this.onMessage("message-type", (client, message) => {
            const newState = new TicTacToeRoomState_1.TicTacToeRoomState();
            this.broadcast("message-type", newState);
        });
    }
    onJoin(client, options) {
        const newState = new TicTacToeRoomState_1.TicTacToeRoomState();
        newState.action = "joined";
        newState.playerId = client.sessionId;
        newState.turn = this.clients.length === 1 ? 'X' : 'O';
        newState.index = 0;
        this.broadcast("message-type", newState);
        console.log(client.sessionId, "joined!");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.TicTacToeRoom = TicTacToeRoom;
//# sourceMappingURL=TicTacToeRoom.js.map