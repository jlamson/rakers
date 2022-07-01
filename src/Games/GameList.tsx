import React, { useState } from "react";
import { UpdateData, addDoc } from "firebase/firestore";
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
import { buildNewGame, Game } from "../Data/Game";
import AddIcon from "@mui/icons-material/Add";
import db from "../Data/Db";

function GameList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_currentDest, navigateTo] = useContext(NavContext);
    const [values, loading, error] = useCollectionData(db.games);
    const doNothing = (_: UpdateData<Game>) => {};

    const [isAddLoading, setIsAddLoading] = useState(false);

    function startNewGame() {
        setIsAddLoading(true);
        addDoc(db.games, buildNewGame())
            .then((value) => {
                navigateTo(NavDests.games.forId(value.id));
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
                navigateTo(NavDests.games.forId(game.id));
            }}
        >
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export default GameList;
