import * as Pusher from "pusher";
import "dotenv/config";

export const pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
});

export const toPusherKey = (key: string) => {
    return key.replace(/:/g, '__')
}