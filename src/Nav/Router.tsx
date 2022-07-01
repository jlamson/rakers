import React from "react";
import ScreenGameList from "../Games/ScreenGameList";
import { useDest } from "./NavContext";
import NavDests, { Route, RouteMatcher } from "./NavDests";
import { Container } from "@mui/material";
import ScreenPilotShipList from "../PilotShips/ScreenPilotShipList";
import ScreenEditPilotShip from "../PilotShips/ScreenEditPilotShip";
import ScreenGameScoreboard from "../Games/ScreenGameScoreboard";

/**
 * A list of tuples containing a RouteMatcher and a function that accepts the
 * (non-null) result of the mapper and builds a screen.
 *
 * These are checked in order, so ensure that broader checks are earlier (ex.
 * a Route of "games" could/should match the list route, but could also match
 * the detail route "games/:id" with a blank id)
 */
const destViewMap: [RouteMatcher, (args: any) => React.ReactElement][] = [
    [NavDests.games.matchList, (_) => <ScreenGameList />],
    [
        NavDests.games.matchDetail,
        (args) => <ScreenGameScoreboard id={args.id} />,
    ],
    [NavDests.pilotShips.matchList, (_) => <ScreenPilotShipList />],
    [
        NavDests.pilotShips.matchDetail,
        (args) => <ScreenEditPilotShip id={args.id} />,
    ],
];

function getScreen(currentDest: Route): React.ReactElement {
    const [matchRoute, buildScreen] = destViewMap.find(
        ([doMatch, _]) => doMatch(currentDest) !== null
    ) ?? [null, null];
    if (buildScreen === null) {
        return <p>Oops, unhandled route {currentDest}</p>;
    } else {
        return buildScreen(matchRoute(currentDest));
    }
}

const Router = () => {
    const currentDest = useDest();
    return (
        <Container maxWidth="lg">
            <React.Fragment>{getScreen(currentDest)}</React.Fragment>
        </Container>
    );
};

export default Router;
