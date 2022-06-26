import React from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useContext } from 'react';
import { NavContext } from '../Nav/NavContext';
import NavDests from '../Nav/NavDests'

function GameList(props) {
    const db = getFirestore()
    const [value, loading, error] = useCollection(
        collection(db, "games"),
        {idField: 'id'}
    );
    
    return ( 
        <Paper sx={{m:4, px:4, py:2}}>
            <h1>All Games</h1>
            {error && <p>Error! {JSON.stringify(error)}</p>}
            {loading && <p>Loading...</p>}
            {value && (
                <List>
                    {value.docs.map(gameDoc => <GameListItem key={gameDoc.id} gameDoc={gameDoc} />)}
                </List>
            )}
        </Paper>
    );
}

const GameListItem = (props) => {
    const [_, navigateTo] = useContext(NavContext)
    const gameDoc = props.gameDoc
    const game = gameDoc.data()
    const label = `${game.name}, turn ${game.turn}`;
    
    return (
        <ListItemButton onClick={() => {navigateTo(NavDests.games.forId(gameDoc.id))}}>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

export default GameList;