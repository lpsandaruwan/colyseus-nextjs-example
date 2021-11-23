import Arena from "/home/lahirup/Desktop/Colyseus/colyseus/packages/arena/build";
import { monitor } from "/home/lahirup/Desktop/Colyseus/colyseus/packages/monitor/src";

import { TicTacToeRoom } from "./rooms/TicTacToeRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        gameServer.define('game_room', TicTacToeRoom);

    },

    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("Server ready!");
        });

        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
    }
});
