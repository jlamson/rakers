import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import NavDests, { Route } from "./NavDests";

type INavContext = [Route, Dispatch<SetStateAction<Route>>]

const NULL_NAV_CONTEXT: INavContext = [
    "nullRoute", 
    (value: SetStateAction<Route>) => {}
]

export const NavContext = createContext<INavContext>(NULL_NAV_CONTEXT);

export default function NavProvider(props: React.PropsWithChildren) {
    const [currentDest, navigateTo] = useState(NavDests.games.list);
    return <NavContext.Provider value={[currentDest, navigateTo]}>{props.children}</NavContext.Provider>;
}
