import { createContext, useState } from "react";
import NavDests from "./NavDests";

export const NavContext = createContext();
const { Provider } = NavContext;

export default function NavProvider(props) {
    const [currentDest, navigateTo] = useState(NavDests.games.list);
    return <Provider value={[currentDest, navigateTo]}>{props.children}</Provider>;
}