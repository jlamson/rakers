import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CasinoIcon from '@mui/icons-material/Casino';
import NavDests from './NavDests';

const DrawerNavItems = ({handleNav}) => {
    return (
        <React.Fragment>
            <ListItemButton 
                onClick={() => {
                    handleNav(NavDests.games.list)
                }}>
                <ListItemIcon>
                    <CasinoIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    handleNav(NavDests.pilotShips)
                }}>
                <ListItemIcon>
                    <RocketLaunchIcon />
                </ListItemIcon>
                <ListItemText primary="Pilots/Ships" />
            </ListItemButton>
        </React.Fragment>
    )
}

export default DrawerNavItems;