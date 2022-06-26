import React from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useContext } from 'react';
import { NavContext } from '../Nav/NavContext';
import NavDests from '../Nav/NavDests'

function PilotShipList(props) {
    const db = getFirestore()
    const [value, loading, error] = useCollection(
        collection(db, "pilotShips")
    );

    return ( 
        <Paper sx={{m:4, px:4, py:2}}>
            <h1>All Pilots/Ships</h1>
            {error && <p>Error! {JSON.stringify(error)}</p>}
            {loading && <p>Loading...</p>}
            {value && (
                <List>
                    {value.docs.map(pilotShipDoc => <PilotShipListItem key={pilotShipDoc.id} pilotShipDoc={pilotShipDoc} />)}
                </List>
            )}
        </Paper>
    );
}

const PilotShipListItem = (props) => {
    const [_, navigateTo] = useContext(NavContext)
    const pilotShipDoc = props.pilotShipDoc
    const pilotShip = pilotShipDoc.data()
    const startingSkills = `Starting Skills: ${pilotShip.startingSkills.reduce((acc, cur) => `${acc}, ${cur}`)}`
    return (
        <ListItemButton onClick={() => {navigateTo(NavDests.pilotShips.forId(pilotShipDoc.id))}}>
            <ListItemText primary={pilotShip.name} />
            <ListItemText primary={pilotShip.specialAbility} />
            <ListItemText primary={startingSkills} />
        </ListItemButton>
    )
}

export default PilotShipList;