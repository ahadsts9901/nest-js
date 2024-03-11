"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPusherKey = exports.pusherServer = void 0;
const Pusher = require("pusher");
require("dotenv/config");
exports.pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});
const toPusherKey = (key) => {
    return key.replace(/:/g, '__');
};
exports.toPusherKey = toPusherKey;
//# sourceMappingURL=pusher.js.map