import React from "react";
import NavContainer from "./Nav/NavContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreenGameList from "./Games/ScreenGameList";
import ScreenGameScoreboard from "./Games/ScreenGameScoreboard";
import NavDests from "./Nav/NavDests";
import ScreenEditPilotShip from "./PilotShips/ScreenEditPilotShip";
import ScreenPilotShipList from "./PilotShips/ScreenPilotShipList";
import RouteNotFound from "./Nav/RouteNotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* NavContainer has an <Outlet /> that will load the sub-path
                    in the right content space
                */}
                <Route path="/" element={<NavContainer />}>
                    <Route index element={<ScreenGameList />} />
                    <Route
                        path={NavDests.games.list}
                        element={<ScreenGameList />}
                    />
                    <Route
                        path={NavDests.games.detail}
                        element={<ScreenGameScoreboard />}
                    />
                    <Route
                        path={NavDests.pilotShips.list}
                        element={<ScreenPilotShipList />}
                    />
                    <Route
                        path={NavDests.pilotShips.detail}
                        element={<ScreenEditPilotShip />}
                    />
                    <Route path="*" element={<RouteNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
