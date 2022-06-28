import React from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useContext } from "react";
import { NavContext } from "../Nav/NavContext";
import NavDests from "../Nav/NavDests";
import { PilotShip, pilotShipConverter } from "../Data/PilotShip";

function PilotShipList() {
    const [data, loading, error] = useCollectionData(
        collection(getFirestore(), "pilotShips").withConverter(
            pilotShipConverter
        )
    );

    return (
        <Paper sx={{ m: 4, px: 4, py: 2 }}>
            <h1>All Pilots/Ships</h1>
            {error && <p>Error! {JSON.stringify(error)}</p>}
            {loading && <p>Loading...</p>}
            {data && (
                <List>
                    {data.map((pilotShip) => (
                        <PilotShipListItem
                            key={pilotShip.id}
                            pilotShip={pilotShip}
                        />
                    ))}
                </List>
            )}
        </Paper>
    );
}

interface PilotShipProps {
    pilotShip: PilotShip;
}

const PilotShipListItem = (props: PilotShipProps) => {
    const [_, navigateTo] = useContext(NavContext);
    const pilotShip = props.pilotShip;
    return (
        <ListItemButton
            onClick={() => {
                navigateTo(NavDests.pilotShips.forId(pilotShip.id));
            }}
        >
            <ListItemText
                primary={`${pilotShip.name} (${pilotShip.startingSkills})`}
            />
        </ListItemButton>
    );
};

export default PilotShipList;
