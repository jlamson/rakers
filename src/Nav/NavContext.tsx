import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import NavDests, { Route } from "./NavDests";

type INavContext = [Route, Dispatch<SetStateAction<Route>>];

const NULL_NAV_CONTEXT: INavContext = [
    "",
    (value: SetStateAction<Route>) => {},
];

const NavContext = createContext<INavContext>(NULL_NAV_CONTEXT);

export function useNav(): Dispatch<SetStateAction<Route>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, navigateTo] = useContext(NavContext);
    return navigateTo;
}

export function useDest(): Route {
    const [currentDest] = useContext(NavContext);
    return currentDest;
}

export default function NavProvider(props: React.PropsWithChildren) {
    const [currentDest, navigateTo] = useState(NavDests.games.list);
    useEffect(() => {
        window.history.replaceState(NavDests.games.list, "", "");
        window.onpopstate = (event: PopStateEvent) => {
            console.log("onpopstate: ", event.state);
            navigateTo(event.state as Route);
        };
    });
    useEffect(() => {
        console.log("useEffect old -> new", window.history.state, currentDest);
        if (
            window.history.state !== null &&
            window.history.state === currentDest
        ) {
            console.log("----> no push");
            return;
        }
        console.log("----> push new");
        window.history.pushState(currentDest, "", "");
    }, [currentDest]);
    return (
        <NavContext.Provider value={[currentDest, navigateTo]}>
            {props.children}
        </NavContext.Provider>
    );
}
