"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAPI = void 0;
const colyseus_1 = require("colyseus");
const express_1 = __importDefault(require("express"));
const node_os_utils_1 = __importDefault(require("node-os-utils"));
const UNAVAILABLE_ROOM_ERROR = "@colyseus/monitor: room $roomId is not available anymore.";
const DEFAULT_COLUMNS = [
    'roomId',
    'name',
    'clients',
    'maxClients',
    'locked',
    'elapsedTime',
];
function getAPI(opts) {
    const api = express_1.default.Router();
    api.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const rooms = yield colyseus_1.matchMaker.query({});
            let connections = 0;
            res.json({
                columns: opts.columns || DEFAULT_COLUMNS,
                rooms: rooms.map(room => {
                    const data = room.toJSON();
                    connections += room.clients;
                    // additional data
                    data.locked = room.locked || false;
                    data.private = room.private;
                    data.maxClients = `${room.maxClients}`;
                    data.elapsedTime = Date.now() - new Date(room.createdAt).getTime();
                    return data;
                }),
                connections,
                cpu: yield node_os_utils_1.default.cpu.usage(),
                memory: yield node_os_utils_1.default.mem.used()
            });
        }
        catch (e) {
            const message = e.message;
            console.error(message);
            res.status(500);
            res.json({ message });
        }
    }));
    api.get("/room", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const roomId = req.query.roomId;
        try {
            const inspectData = yield colyseus_1.matchMaker.remoteRoomCall(roomId, "getInspectData");
            res.json(inspectData);
        }
        catch (e) {
            const message = UNAVAILABLE_ROOM_ERROR.replace("$roomId", roomId);
            console.error(message);
            res.status(500);
            res.json({ message });
        }
    }));
    api.get("/room/call", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const roomId = req.query.roomId;
        const method = req.query.method;
        const args = JSON.parse(req.query.args);
        try {
            const data = yield colyseus_1.matchMaker.remoteRoomCall(roomId, method, args);
            res.json(data);
        }
        catch (e) {
            const message = UNAVAILABLE_ROOM_ERROR.replace("$roomId", roomId);
            console.error(message);
            res.status(500);
            res.json({ message });
        }
    }));
    return api;
}
exports.getAPI = getAPI;
//# sourceMappingURL=api.js.map