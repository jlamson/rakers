import {
    Box,
    Stack,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    Icon,
    IconButton,
    TextField,
} from "@mui/material";
import {
    deleteDoc,
    doc,
    getFirestore,
    UpdateData,
    updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import { Game, gameConverter } from "../Data/Game";
import { pilotShipConverter, PilotShip } from "../Data/PilotShip";
import { NavContext } from "../Nav/NavContext";
import NavDests from "../Nav/NavDests";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import FirebaseDataProps from "../Data/FirebaseDataProps";

export default function GameScoreboard() {
    const [currentDest, navigateTo] = useContext(NavContext);
    const id = currentDest.split("/")[1];
    const gameRef = doc(getFirestore(), "games", id);
    const [game, loading, error] = useDocumentData(
        gameRef.withConverter(gameConverter)
    );

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

    return (
        <Box sx={{ m: 3, py: 2 }}>
            <Stack spacing={1}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item xs justifyContent="start">
                        <Typography sx={{ ml: 2 }} variant="h4">
                            {error && `Error! ${JSON.stringify(error)}`}
                            {loading && "Loading..."}
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

interface GameContentProps extends FirebaseDataProps<Game> {}

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

function TurnCounter(props: GameContentProps) {
    const { data: gameData, onUpdate } = props;

    return (
        <Stack direction="row" justifyContent="space-evenly">
            <IconButton
                disabled={gameData.turn <= 0}
                onClick={() => {
                    onUpdate({ turn: gameData.turn - 1 });
                }}
            >
                <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <Typography variant="h4">Turn {gameData.turn}</Typography>
            <IconButton
                onClick={() => {
                    onUpdate({ turn: gameData.turn + 1 });
                }}
            >
                <AddCircleOutlineRoundedIcon />
            </IconButton>
        </Stack>
    );
}
