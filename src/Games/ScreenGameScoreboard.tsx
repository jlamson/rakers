import { Box, Stack, Typography, Button, Grid, Paper } from "@mui/material";
import {
    addDoc,
    deleteDoc,
    doc,
    UpdateData,
    updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import { Game, gameConverter } from "../Data/Game";
import NavDests from "../Nav/NavDests";
import DeleteIcon from "@mui/icons-material/Delete";
import FirebaseDataProps from "../Data/FirebaseDataProps";
import { PilotShip } from "../Data/PilotShip";
import { buildNewPlayer, Player } from "../Data/Player";
import { TurnCounter } from "./TurnCounter";
import { PlayerList } from "./PlayerList";
import { AddNewPlayerForm } from "./AddNewPlayerForm";
import BigTitleInput from "../Components/BigTitleInput";
import db from "../Data/Db";
import { useParams, useNavigate } from "react-router-dom";

export default function ScreenGameScoreboard() {
    const navigateTo = useNavigate();

    const navParams = useParams();
    const id = navParams.id as string;

    const gameRef = doc(db.games, id);
    const playersRef = db.players(id);

    const [game, gameLoading, gameError] = useDocumentData(
        gameRef.withConverter(gameConverter)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pilotShips, ..._unused0] = useCollectionData(db.pilotShips);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [players, ..._usused1] = useCollectionData(playersRef);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function updateGame(updateData: UpdateData<Game>) {
        updateDoc(gameRef, updateData);
    }

    function deleteGame() {
        if (players === undefined) return;
        setDeleteLoading(true);
        const deletePlayersPromoses = players.map((p, i, arr) =>
            deleteDoc(doc(playersRef, p.id))
        );
        Promise.all(deletePlayersPromoses).then((values) => {
            deleteDoc(gameRef)
                .then(() => {
                    navigateTo(NavDests.games.list);
                })
                .finally(() => {
                    setDeleteLoading(false);
                });
        });
    }

    function addPlayer(name: string, pilotShip: PilotShip) {
        addDoc(playersRef, buildNewPlayer(name, pilotShip));
    }

    function deletePlayer(id: string) {
        setDeleteLoading(true);
        deleteDoc(doc(playersRef, id)).finally(() => {
            setDeleteLoading(false);
        });
    }

    function updatePlayer(id: string, updateData: UpdateData<Player>) {
        updateDoc(doc(playersRef, id), updateData);
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
                <AddNewPlayerForm
                    pilotShips={pilotShips}
                    addNewPlayer={addPlayer}
                />
            )}
            <ConfirmDeleteDialog
                open={showConfirmDelete}
                entityName="Game"
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
