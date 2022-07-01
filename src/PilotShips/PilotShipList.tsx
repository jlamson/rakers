import React, { useState } from "react";
import db from "../Data/Db";
import { addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { useContext } from "react";
import { NavContext } from "../Nav/NavContext";
import NavDests from "../Nav/NavDests";
import { buildNewPilot, PilotShip } from "../Data/PilotShip";
import AddIcon from "@mui/icons-material/Add";
import { joinAsString } from "../Utils/array";
import { capitalCase } from "change-case";
import { doSafe } from "../Utils/scope";

function PilotShipList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const [data, loading, error] = useCollectionData(db.pilotShips);
    const [isAddLoading, setIsAddLoading] = useState(false);

    function addNewPilot() {
        setIsAddLoading(true);
        addDoc(db.pilotShips, buildNewPilot("New Pilot"))
            .then((value) => {
                navigateTo(NavDests.pilotShips.forId(value.id));
            })
            .finally(() => {
                setIsAddLoading(false);
            });
    }

    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Typography sx={{ mx: 1 }} variant="h4">
                {error && `Error! ${JSON.stringify(error)}`}
                {(loading || isAddLoading) && "Loading..."}
                {data && "All Pilots/Ships"}
            </Typography>
            <Paper sx={{ m: 1, mt: 3 }}>
                {data && (
                    <List>
                        {data.map((pilotShip) => (
                            <PilotShipListItem
                                key={pilotShip.id}
                                pilotShip={pilotShip}
                            />
                        ))}
                        <ListItemButton
                            key="addNewPilot"
                            sx={{ px: 4 }}
                            onClick={() => {
                                addNewPilot();
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add New Pilot" />
                        </ListItemButton>
                    </List>
                )}
            </Paper>
        </Box>
    );
}

interface PilotShipProps {
    pilotShip: PilotShip;
}

const PilotShipListItem = (props: PilotShipProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const pilotShip = props.pilotShip;
    return (
        <ListItemButton
            sx={{ px: 4 }}
            onClick={() => {
                doSafe(pilotShip.id, (id) => {
                    navigateTo(NavDests.pilotShips.forId(id));
                });
            }}
        >
            <ListItemText
                primary={`${pilotShip.name} [${joinAsString(
                    pilotShip.startingSkills.map((it, i, arr) =>
                        capitalCase(it)
                    )
                )}]`}
                secondary={pilotShip.specialAbility}
            />
        </ListItemButton>
    );
};

export default PilotShipList;
