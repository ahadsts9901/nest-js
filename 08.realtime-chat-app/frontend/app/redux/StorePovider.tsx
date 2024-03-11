"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import UserWrapper from "./UserWrapper"

export function Providers({ children }: any) {

    return <Provider store={store}><UserWrapper>{children}</UserWrapper></Provider>;

}