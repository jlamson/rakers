import React, { useContext } from "react";
import GameList from "../Games/GameList";
import { NavContext } from "./NavContext";
import NavDests from "./NavDests";
import { Box } from "@mui/material";
import PilotShipList from "../PilotShips/PilotShipList";

function getScreen(currentDest) {
    if (currentDest.startsWith(NavDests.games.route)) {
        if (currentDest === NavDests.games.list) {
            return <GameList />
        } else {
            return <h1>Game/id: {currentDest}</h1>
        }
    } else if (currentDest.startsWith(NavDests.pilotShips.route)) {
        if (currentDest === NavDests.pilotShips.list) {
            return <PilotShipList />
        } else {
            return <h1>Pilot/id: {currentDest}</h1>
        }
    } else {
        return <p>Oops, unhandled dest</p>
    }
}

const Navigator = () => {
    const [currentDest, _] = useContext(NavContext)
    return (
        <Box>
            <React.Fragment>{getScreen(currentDest)}</React.Fragment>
        </Box>
    )
}

export default Navigator