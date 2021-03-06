"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitor = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = require("./api");
require("./ext/Room");
const frontendDirectory = path_1.default.resolve(__dirname, "..", "build", "static");
/**
 * TODO: expose the `router` instead on next major version.
 */
function monitor(opts = {}) {
    const router = express_1.default.Router();
    router.use(express_1.default.static(frontendDirectory));
    router.use('/api', api_1.getAPI(opts));
    return router;
}
exports.monitor = monitor;
//# sourceMappingURL=index.js.map