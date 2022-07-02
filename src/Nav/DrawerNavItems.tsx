import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CasinoIcon from "@mui/icons-material/Casino";
import NavDests from "./NavDests";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DrawerNavItems = () => {
    const navigateTo = useNavigate();
    const iconSx = { minWidth: "36px" };
    return (
        <List component="nav">
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
        </List>
    );
};

export default DrawerNavItems;
