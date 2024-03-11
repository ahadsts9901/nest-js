import PusherClient from "pusher-js";

export const pusherClient = new PusherClient("cfcd8da5c056406770bf",
    {
        cluster: "us2",
    }
);

export const toPusherKey = (key: string) => {
    return key.replace(/:/g, '__')
}