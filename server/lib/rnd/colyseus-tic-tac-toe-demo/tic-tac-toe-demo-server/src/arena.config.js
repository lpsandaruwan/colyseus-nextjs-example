"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = __importDefault(require("/home/lahirup/Desktop/Colyseus/colyseus/packages/arena/build"));
const src_1 = require("/home/lahirup/Desktop/Colyseus/colyseus/packages/monitor/src");
const tslog_1 = require("tslog");
const TicTacToeRoom_1 = require("./rooms/TicTacToeRoom");
exports.default = build_1.default({
    getId: () => "Your Colyseus App",
    options: {
        logger: new tslog_1.Logger()
    },
    initializeGameServer: (gameServer) => {
        gameServer.define('tic_tac_toe_game_room', TicTacToeRoom_1.TicTacToeRoom);
    },
    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("Server ready!");
        });
        app.use("/colyseus", src_1.monitor());
    },
    beforeListen: () => {
    }
});
//# sourceMappingURL=arena.config.js.map