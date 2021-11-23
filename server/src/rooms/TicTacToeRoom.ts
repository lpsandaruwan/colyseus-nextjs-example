import { Room, Client } from "/home/lahirup/Desktop/Colyseus/colyseus/packages/core/build";
import { TicTacToeRoomState } from "./schema/TicTacToeRoomState";

export class TicTacToeRoom extends Room<TicTacToeRoomState> {

  maxClients = 2;

  onCreate (options: any) {
    this.resetAutoDisposeTimeout(1);
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
