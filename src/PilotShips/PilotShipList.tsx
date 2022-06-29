import React, { useState } from "react";
import {
    getFirestore,
    collection,
    addDoc,
    DocumentReference,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
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
    const [isAddRemoveLoading, setIsAddRemoveLoading] = useState(false);

    function addNewPilot() {
        setIsAddRemoveLoading(true);
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
                setIsAddRemoveLoading(false);
            });
    }

    return (
        <Paper sx={{ m: 4, px: 4, py: 2 }}>
            <h1>All Pilots/Ships</h1>
            {error && <p>Error! {JSON.stringify(error)}</p>}
            {(loading || isAddRemoveLoading) && <p>Loading...</p>}
            {data && (
                <List>
                    {data.map((pilotShip) => (
                        <PilotShipListItem
                            key={pilotShip.id}
                            pilotShip={pilotShip}
                        />
                    ))}
                    <ListItemButton
                        onClick={() => {
                            addNewPilot();
                        }}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add New Pilot" />
                    </ListItemButton>
                </List>
            )}
        </Paper>
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
