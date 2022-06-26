import React from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useContext } from 'react';
import { NavContext } from '../Nav/NavContext';
import NavDests from '../Nav/NavDests'
import DocDataProps from '../Data/docDataProp';

function PilotShipList() {
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
                    {value.docs.map(doc => <PilotShipListItem key={doc.id} docData={doc} />)}
                </List>
            )}
        </Paper>
    );
}



const PilotShipListItem = (props: DocDataProps) => {
    const [_, navigateTo] = useContext(NavContext)
    const docData = props.docData
    const pilotShip = docData.data()
    const startingSkills = `Starting Skills: ${
        pilotShip.startingSkills
            .reduce((acc: string, cur: string) => `${acc}, ${cur}`)
            .slice(0, -1)
    }`
    return (
        <ListItemButton onClick={() => {navigateTo(NavDests.pilotShips.forId(docData.id))}}>
            <ListItemText primary={pilotShip.name} />
            <ListItemText primary={pilotShip.specialAbility} />
            <ListItemText primary={startingSkills} />
        </ListItemButton>
    )
}

export default PilotShipList;