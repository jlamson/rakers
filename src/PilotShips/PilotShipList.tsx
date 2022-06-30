import React, { useState } from "react";
import {
    getFirestore,
    collection,
    addDoc,
    DocumentReference,
} from "firebase/firestore";
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
import {
    buildNewPilot,
    PilotShip,
    pilotShipConverter,
} from "../Data/PilotShip";
import AddIcon from "@mui/icons-material/Add";

function PilotShipList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const collectionRef = collection(
        getFirestore(),
        "pilotShips"
    ).withConverter(pilotShipConverter);

    const [data, loading, error] = useCollectionData(collectionRef);
    const [isAddLoading, setIsAddLoading] = useState(false);

    function addNewPilot() {
        setIsAddLoading(true);
        addDoc(collectionRef, buildNewPilot("New Pilot"))
            .then(
                (value: DocumentReference<PilotShip>) => {
                    navigateTo(NavDests.pilotShips.forId(value.id));
                },
                (reason: any) => {
                    console.error(reason);
                    alert(
                        `Failed to create new pilot (rejected, reason=${reason})`
                    );
                }
            )
            .catch((error: Error) => {
                console.error(error);
                alert("Failed to create new pilot");
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
                            sx={{ px: 4 }}
                            onClick={() => {
                                addNewPilot();
                            }}
                        >
                            <ListItemIcon sx={{ "min-width": "36px" }}>
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
                const id: string = (pilotShip.id as string) ?? null;
                if (id !== null) {
                    navigateTo(NavDests.pilotShips.forId(id));
                }
            }}
        >
            <ListItemText
                primary={pilotShip.name}
                secondary={pilotShip.startingSkills}
            />
        </ListItemButton>
    );
};

export default PilotShipList;
