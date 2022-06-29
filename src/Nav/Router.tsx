import React, { useContext } from "react";
import GameList from "../Games/GameList";
import { NavContext } from "./NavContext";
import NavDests, { Route } from "./NavDests";
import { Box } from "@mui/material";
import PilotShipList from "../PilotShips/PilotShipList";
import AddEditPilotShip from "../PilotShips/AddEditPilotShip";

function getScreen(currentDest: Route) {
    if (currentDest.startsWith(NavDests.games.route)) {
        if (currentDest === NavDests.games.list) {
            return <GameList />;
        } else {
            return <h1>Game/id: {currentDest}</h1>;
        }
    } else if (currentDest.startsWith(NavDests.pilotShips.route)) {
        if (currentDest === NavDests.pilotShips.list) {
            return <PilotShipList />;
        } else {
            return <AddEditPilotShip />;
        }
    } else {
        return <p>Oops, unhandled dest</p>;
    }
}

const Router = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentDest, _navigateTo] = useContext(NavContext);
    return (
        <Box>
            <React.Fragment>{getScreen(currentDest)}</React.Fragment>
        </Box>
    );
};

export default Router;
