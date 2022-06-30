import React, { useState } from "react";
import {
    getFirestore,
    collection,
    UpdateData,
    DocumentReference,
    addDoc,
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
import FirebaseDataProps from "../Data/FirebaseDataProps";
import { buildNewGame, Game, gameConverter } from "../Data/Game";
import AddIcon from "@mui/icons-material/Add";

function GameList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const gamesRef = collection(getFirestore(), "games").withConverter(
        gameConverter
    );
    const [values, loading, error] = useCollectionData(gamesRef);
    const doNothing = (_: UpdateData<Game>) => {};

    const [isAddLoading, setIsAddLoading] = useState(false);

    function startNewGame() {
        setIsAddLoading(true);
        addDoc(gamesRef, buildNewGame())
            .then(
                (value: DocumentReference<Game>) => {
                    navigateTo(NavDests.games.forId(value.id));
                },
                (reason: any) => {
                    console.error(reason);
                    alert(
                        `Failed to start new game (rejected, reason=${reason})`
                    );
                }
            )
            .catch((error: Error) => {
                console.error(error);
                alert("Failed to start new game");
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
                {values && "All Games"}
            </Typography>
            <Paper sx={{ m: 1, mt: 3 }}>
                {values && (
                    <List>
                        {values.map((game) => (
                            <GameListItem
                                key={game.id}
                                data={game}
                                onUpdate={doNothing}
                            />
                        ))}
                        <ListItemButton
                            onClick={() => {
                                startNewGame();
                            }}
                        >
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Start New Game" />
                        </ListItemButton>
                    </List>
                )}
            </Paper>
        </Box>
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
                const gameId = game.id;
                if (gameId != undefined) {
                    navigateTo(NavDests.games.forId(gameId));
                }
            }}
        >
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export default GameList;
