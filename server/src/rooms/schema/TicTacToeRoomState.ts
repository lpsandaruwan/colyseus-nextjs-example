import { Schema, Context, type } from "@colyseus/schema";

export class TicTacToeRoomState extends Schema {

  @type("number") index?: number = 0;
  @type("string") action: string = "nothing";
  @type("string") playerId: string = "undefined";
  @type("string") turn: string = "X";
  @type("string") board?: string;
}
