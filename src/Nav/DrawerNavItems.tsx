import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CasinoIcon from "@mui/icons-material/Casino";
import NavDests from "./NavDests";
import { NavContext } from "./NavContext";

const DrawerNavItems = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = React.useContext(NavContext);
    const iconSx = { "min-width": "36px" };
    return (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    navigateTo(NavDests.games.list);
                }}
            >
                <ListItemIcon sx={iconSx}>
                    <CasinoIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigateTo(NavDests.pilotShips.list);
                }}
            >
                <ListItemIcon sx={iconSx}>
                    <RocketLaunchIcon />
                </ListItemIcon>
                <ListItemText primary="Pilots/Ships" />
            </ListItemButton>
        </React.Fragment>
    );
};

export default DrawerNavItems;
