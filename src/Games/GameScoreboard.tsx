import {
    Box,
    Stack,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    getFirestore,
    UpdateData,
    updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import { Game, gameConverter } from "../Data/Game";
import { NavContext } from "../Nav/NavContext";
import NavDests from "../Nav/NavDests";
import DeleteIcon from "@mui/icons-material/Delete";
import FirebaseDataProps from "../Data/FirebaseDataProps";
import { PilotShip, pilotShipConverter } from "../Data/PilotShip";
import { buildNewPlayer, Player, playerConverter } from "../Data/Player";
import { TurnCounter } from "./TurnCounter";
import { PlayerList } from "./PlayerList";
import { AddNewPlayerForm } from "./AddNewPlayerForm";

export default function GameScoreboard() {
    const [currentDest, navigateTo] = useContext(NavContext);
    const id = currentDest.split("/")[1];

    const gameRef = doc(getFirestore(), "games", id);
    const [game, gameLoading, gameError] = useDocumentData(
        gameRef.withConverter(gameConverter)
    );

    const pilotShipsRef = collection(
        getFirestore(),
        "pilotShips"
    ).withConverter(pilotShipConverter);
    const [pilotShips, pilotShipsLoading, pilotShipsError] =
        useCollectionData(pilotShipsRef);

    const playersRef = collection(
        getFirestore(),
        "games",
        id,
        "players"
    ).withConverter(playerConverter);
    const [players, playersLoading, playersError] =
        useCollectionData(playersRef);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function updateGame(updateData: UpdateData<Game>) {
        updateDoc(gameRef, updateData)
            .then((value) => console.log(`updateDoc -> ${value}`))
            .catch((e) => console.log(e));
    }

    function deleteGame() {
        deleteDoc(gameRef)
            .then(() => {
                navigateTo(NavDests.games.list);
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    function addPlayer(name: string, pilotShip: PilotShip) {
        addDoc(playersRef, buildNewPlayer(name, pilotShip))
            .then(
                (value: DocumentReference<Player>) => {},
                (reason: any) => {
                    console.error(reason);
                    alert(
                        `Failed to create new player (rejected, reason=${reason})`
                    );
                }
            )
            .catch((error: Error) => {
                console.error(error);
                alert("Failed to create new player");
            });
    }

    function updatePlayer(id: string, updateData: UpdateData<Player>) {}

    return (
        <Box sx={{ m: 3, py: 2 }}>
            <Stack spacing={1}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item xs justifyContent="start">
                        <Typography sx={{ ml: 2 }} variant="h4">
                            {gameError &&
                                `Game Error! ${JSON.stringify(gameError)}`}
                            {gameLoading && "Loading..."}
                            {deleteLoading && "Deleting..."}
                            {game && `Game: ${game.name}`}
                        </Typography>
                    </Grid>
                    {game && (
                        <Grid item xs="auto">
                            <Button
                                sx={{ mr: 3 }}
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => {
                                    setShowConfirmDelete(true);
                                }}
                            >
                                Delete
                            </Button>
                        </Grid>
                    )}
                </Grid>
                {game && <GameContent data={game} onUpdate={updateGame} />}
                {players && (
                    <PlayerList
                        players={players}
                        onUpdatePlayer={updatePlayer}
                    />
                )}
                {pilotShips && (
                    <React.Fragment>
                        <Typography variant="h4" sx={{ mt: 1, pl: 1 }}>
                            Add New Player
                        </Typography>
                        <AddNewPlayerForm
                            pilotShips={pilotShips}
                            addNewPlayer={addPlayer}
                        />
                    </React.Fragment>
                )}
            </Stack>
            <ConfirmDeleteDialog
                open={showConfirmDelete}
                onCancel={() => {
                    setShowConfirmDelete(false);
                }}
                onConfirmDelete={() => {
                    deleteGame();
                }}
            />
        </Box>
    );
}

export interface GameContentProps extends FirebaseDataProps<Game> {}

function GameContent(props: GameContentProps) {
    const { data: gameData, onUpdate } = props;
    const paperSx = { p: 2, display: "flex", flexDirection: "column" };

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid container spacing={3} alignItems="stretch" direction="row">
                <Grid item xs="auto">
                    <Paper sx={paperSx}>
                        <TextField
                            variant="filled"
                            label="Game Label"
                            value={gameData.name}
                            onChange={(event) => {
                                onUpdate({ name: event.target.value });
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs="auto">
                    <Paper sx={paperSx}>
                        <TurnCounter data={gameData} onUpdate={onUpdate} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
