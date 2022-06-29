import {
    Box,
    Stack,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemText,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import FirebaseDataProps from "../Data/FirebaseDataProps";
import { PilotShip, pilotShipConverter } from "../Data/PilotShip";
import { buildNewPlayer, Player, playerConverter } from "../Data/Player";
import AddIcon from "@mui/icons-material/Add";

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
                    <AddNewPlayerForm
                        pilotShips={pilotShips}
                        addNewPlayer={addPlayer}
                    />
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

interface PlayerListProps {
    players: Player[];
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
}

function PlayerList(props: PlayerListProps) {
    const { players, onUpdatePlayer } = props;

    function cleanPlayer(model: Player) {
        return {
            name: model.name,
            pilotShip: {
                name: model.pilotShip.name,
                ship: model.pilotShip.ship,
                specialAbility: model.pilotShip.specialAbility,
                startingCrebits: model.pilotShip.startingCrebits,
                startingRep: model.pilotShip.startingRep,
                startingSkills: model.pilotShip.startingSkills,
            },
            maintenance: model.maintenance,
            leadership: model.leadership,
            crebits: model.crebits,
            rep: model.rep,
            skills: model.skills,
            crew: model.crew,
            equipment: model.equipment,
            cargo: model.cargo,
        };
    }

    return (
        <List>
            {players.map((player) => (
                <ListItem>
                    <ListItemText
                        primary={JSON.stringify(cleanPlayer(player))}
                    />
                </ListItem>
            ))}
        </List>
    );
}

interface AddNewPlayerFormProps {
    pilotShips: PilotShip[];
    addNewPlayer: (name: string, pilotShip: PilotShip) => void;
}

function AddNewPlayerForm(props: AddNewPlayerFormProps) {
    const { pilotShips, addNewPlayer } = props;
    const [playerName, setPlayerName] = useState("");
    const [selectedPilotId, setSelectedPilotId] = useState<string>("");

    const buttonDisabled = playerName.length > 0 && selectedPilotId !== "";

    return (
        <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item xs>
                <TextField
                    required
                    fullWidth
                    label="Player Name"
                    variant="filled"
                    defaultValue={playerName}
                    onChange={(event) => {
                        setPlayerName(event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel>Pilot/Ship</InputLabel>
                    <Select
                        value={selectedPilotId}
                        label="Pilot/Ship"
                        onChange={(event) => {
                            setSelectedPilotId(event.target.value);
                        }}
                    >
                        {pilotShips.map((pilotShip) => (
                            <MenuItem value={pilotShip.id}>
                                {`${pilotShip.name} / ${pilotShip.ship.name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs="auto">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={!buttonDisabled}
                    onClick={() => {
                        const pilotShip = pilotShips.find(
                            (it, i, all) => it.id === selectedPilotId
                        );
                        if (pilotShip !== undefined) {
                            addNewPlayer(playerName, pilotShip);
                            setPlayerName("");
                            setSelectedPilotId("");
                        }
                    }}
                >
                    Add New Player
                </Button>
            </Grid>
        </Grid>
    );
}
