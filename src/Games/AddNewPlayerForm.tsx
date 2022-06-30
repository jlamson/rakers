import {
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PilotShip } from "../Data/PilotShip";
import AddIcon from "@mui/icons-material/Add";

interface AddNewPlayerFormProps {
    pilotShips: PilotShip[];
    addNewPlayer: (name: string, pilotShip: PilotShip) => void;
}

export function AddNewPlayerForm(props: AddNewPlayerFormProps) {
    const { pilotShips, addNewPlayer } = props;
    const [playerName, setPlayerName] = useState("");
    const [selectedPilotId, setSelectedPilotId] = useState<string>("");

    const buttonDisabled = playerName.length > 0 && selectedPilotId !== "";

    return (
        <React.Fragment>
            <Typography variant="h5" sx={{ mt: 2, mb: 0.5 }}>
                Add New Player
            </Typography>
            <Grid
                container
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
            >
                <Grid item xs={12} sm>
                    <TextField
                        required
                        fullWidth
                        label="Player Name"
                        variant="filled"
                        value={playerName}
                        onChange={(event) => {
                            setPlayerName(event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm>
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
                                <MenuItem
                                    key={pilotShip.id}
                                    value={pilotShip.id}
                                >
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
                        Add Player
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
