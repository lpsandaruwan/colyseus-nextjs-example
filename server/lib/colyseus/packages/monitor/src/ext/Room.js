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
Object.defineProperty(exports, "__esModule", { value: true });
//
// Monkey-patch Colyseus' default behaviour
//
const colyseus_1 = require("colyseus");
function getStateSize(room) {
    // TODO: `Serializer<T>` should provide a method for this (e.g. `serializer.hasState()`)
    const hasState = (room._serializer.state || room._serializer.previousState);
    const fullState = hasState && room._serializer.getFullState();
    return fullState && (fullState.byteLength || fullState.length) || 0;
}
colyseus_1.Room.prototype.getAvailableData = function () {
    return {
        clients: this.clients.length,
        maxClients: this.maxClients,
        metadata: this.metadata,
        roomId: this.roomId,
    };
};
colyseus_1.Room.prototype.getRoomListData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const stateSize = getStateSize(this);
        const elapsedTime = this.clock.elapsedTime;
        const locked = this.locked;
        const data = this.getAvailableData();
        return Object.assign(Object.assign({}, data), { locked, elapsedTime, stateSize });
    });
};
colyseus_1.Room.prototype.getInspectData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const state = this.state;
        const stateSize = getStateSize(this);
        const data = this.getAvailableData();
        const clients = this.clients.map((client) => ({ sessionId: client.sessionId }));
        const locked = this.locked;
        return Object.assign(Object.assign({}, data), { locked, clients, state, stateSize });
    });
};
// Actions
colyseus_1.Room.prototype._forceClientDisconnect = function (sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].sessionId === sessionId) {
                this.clients[i].terminate();
                break;
            }
        }
    });
};
colyseus_1.Room.prototype._sendMessageToClient = function (sessionId, type, data) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].sessionId === sessionId) {
                this.clients[i].send(type, data);
                break;
            }
        }
    });
};
//# sourceMappingURL=Room.js.map