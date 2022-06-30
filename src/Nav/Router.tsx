import React, { useContext } from "react";
import GameList from "../Games/GameList";
import { NavContext } from "./NavContext";
import NavDests, { Route } from "./NavDests";
import { Box, Container } from "@mui/material";
import PilotShipList from "../PilotShips/PilotShipList";
import AddEditPilotShip from "../PilotShips/AddEditPilotShip";
import GameScoreboard from "../Games/GameScoreboard";

function getScreen(currentDest: Route) {
    if (currentDest.startsWith(NavDests.games.route)) {
        if (currentDest === NavDests.games.list) {
            return <GameList />;
        } else {
            return <GameScoreboard />;
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
        <Container maxWidth="lg">
            <React.Fragment>{getScreen(currentDest)}</React.Fragment>
        </Container>
    );
};

export default Router;
