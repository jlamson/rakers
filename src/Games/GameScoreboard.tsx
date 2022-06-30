import {
    Box,
    Stack,
    Typography,
    Button,
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
import BigTitleInput from "../Components/BigTitleInput";

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
            .then(
                (value) => console.log(`updateGame fulfilled -> ${value}`),
                (value) => console.log(`updateGame rejected -> ${value}`)
            )
            .catch((e) => console.log(e));
    }

    function deleteGame() {
        setDeleteLoading(true);
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

    function deletePlayer(id: string) {
        setDeleteLoading(true);
        deleteDoc(doc(playersRef, id)).finally(() => {
            setDeleteLoading(false);
        });
    }

    function updatePlayer(id: string, updateData: UpdateData<Player>) {
        updateDoc(doc(playersRef, id), updateData)
            .then(
                (value) => console.log(`updatePlayer fulfilled -> ${value}`),
                (value) => console.log(`updatePlayer rejected -> ${value}`)
            )
            .catch((e) => console.log(e));
    }

    const inFlux = gameError !== undefined || gameLoading || deleteLoading;

    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
            >
                {inFlux && (
                    <Typography sx={{ mx: 1 }} variant="h4">
                        {gameError &&
                            `Game Error! ${JSON.stringify(gameError)}`}
                        {gameLoading && "Loading..."}
                        {deleteLoading && "Deleting..."}
                    </Typography>
                )}
                {game && (
                    <React.Fragment>
                        <BigTitleInput
                            disabled={inFlux}
                            defaultValue={game.name}
                            bigness="h3"
                            onChange={(event) => {
                                updateGame({ name: event.target.value });
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => {
                                setShowConfirmDelete(true);
                            }}
                        >
                            Delete Game
                        </Button>
                    </React.Fragment>
                )}
            </Stack>
            {game && <GameContent data={game} onUpdate={updateGame} />}
            {players && (
                <PlayerList
                    players={players}
                    onUpdatePlayer={updatePlayer}
                    deletePlayer={deletePlayer}
                />
            )}
            {pilotShips && (
                <React.Fragment>
                    <AddNewPlayerForm
                        pilotShips={pilotShips}
                        addNewPlayer={addPlayer}
                    />
                </React.Fragment>
            )}
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
        <Grid
            container
            sx={{ mt: 2 }}
            alignItems="stretch"
            direction="row"
            justifyContent="center"
        >
            <Grid item xs="auto">
                <Paper sx={paperSx}>
                    <TurnCounter data={gameData} onUpdate={onUpdate} />
                </Paper>
            </Grid>
        </Grid>
    );
}
