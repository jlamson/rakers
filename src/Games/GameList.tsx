import React from "react";
import { getFirestore, collection, UpdateData } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useContext } from "react";
import { NavContext } from "../Nav/NavContext";
import NavDests from "../Nav/NavDests";
import FirebaseDataProps from "../Data/FirebaseDataProps";
import { Game, gameConverter } from "../Data/Game";

function GameList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [values, loading, error, _snapshot] = useCollectionData<Game>(
        collection(getFirestore(), "games").withConverter(gameConverter)
    );
    const doNothing = (_: UpdateData<Game>) => {};

    return (
        <Paper sx={{ m: 4, px: 4, py: 2 }}>
            <h1>All Games</h1>
            {error && <p>Error! {JSON.stringify(error)}</p>}
            {loading && <p>Loading...</p>}
            {values && (
                <List>
                    {values.map((game) => (
                        <GameListItem
                            key={game.id}
                            data={game}
                            onUpdate={doNothing}
                        />
                    ))}
                </List>
            )}
        </Paper>
    );
}

const GameListItem = (props: FirebaseDataProps<Game>) => {
    const game = props.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const label = `${game.name}, turn ${game.turn}`;

    return (
        <ListItemButton
            onClick={() => {
                navigateTo(NavDests.games.forId(game.id));
            }}
        >
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export default GameList;
