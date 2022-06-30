import React, { useState, useMemo } from "react";
import {
    Grid,
    Paper,
    Stack,
    Button,
    Typography,
    Slider,
    TextField,
    List,
    ListItem,
    ListItemText,
    Input,
} from "@mui/material";
import { UpdateData } from "firebase/firestore";
import BigTitleInput from "../Components/BigTitleInput";
import { RepSlider } from "../Components/RepSlider";
import SkillsBox from "../Components/SkillsBox";
import { Player } from "../Data/Player";
import Skills from "../Data/Skills";
import DeleteIcon from "@mui/icons-material/Delete";

interface PlayerScorecardProps {
    playerId: string;
    player: Player;
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
    deletePlayer: (id: string) => void;
}

export default function PlayerScorecard(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    const paperSx = {
        p: 2,
        display: "flex",
        flexDirection: "column",
    };

    function toggleSkill(skill: Skills) {
        const oldSkills = player.skills;
        if (oldSkills.includes(skill)) {
            onUpdatePlayer(playerId, {
                skills: oldSkills.filter((s) => s !== skill),
            });
        } else {
            onUpdatePlayer(playerId, { skills: [...oldSkills, skill] });
        }
    }

    const smallCardProps = {
        xs: 12,
        sm: 6,
        lg: 3,
    };
    const bigCardProps = {
        xs: 12,
        sm: 6,
    };

    return (
        <Grid container sx={{ mt: 1, mb: 2 }} spacing={2}>
            <Grid item xs={12}>
                <PlayerHeader {...props} />
            </Grid>
            <Grid item {...smallCardProps}>
                <Paper sx={paperSx}>
                    <PilotSection {...props} />
                </Paper>
            </Grid>
            <Grid item {...smallCardProps}>
                <Paper sx={paperSx}>
                    <ShipSection {...props} />
                </Paper>
            </Grid>
            <Grid item {...smallCardProps}>
                <Paper sx={paperSx}>
                    <CrebitsBlock {...props} />
                </Paper>
            </Grid>
            <Grid item {...smallCardProps}>
                <Paper sx={paperSx}>
                    <Grid container>
                        <SkillsBox
                            skills={player.skills}
                            toggleSkill={toggleSkill}
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item {...bigCardProps}>
                <Paper sx={paperSx}>
                    <CrewSection {...props} />
                </Paper>
            </Grid>
            <Grid item {...bigCardProps}>
                <Paper sx={paperSx}>
                    <EquipmentSection {...props} />
                </Paper>
            </Grid>
            <Grid item {...bigCardProps}>
                <Paper sx={paperSx}>
                    <HoldSection {...props} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={paperSx}>
                    <ReputationSection {...props} />
                </Paper>
            </Grid>
        </Grid>
    );
}

function PlayerHeader(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer, deletePlayer } = props;
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
        >
            <BigTitleInput
                fullWidth
                margin="dense"
                size="small"
                bigness="h4"
                defaultValue={player.name}
                onChange={(event) => {
                    console.log({
                        location: "onChange",
                        name: event.target.value,
                    });
                    onUpdatePlayer(playerId, {
                        name: event.target.value,
                    });
                }}
            />
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                size="small"
                onClick={() => {
                    deletePlayer(playerId);
                }}
            >
                Delete {player.name}
            </Button>
        </Stack>
    );
}

function PilotSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Pilot: {player.pilotShip.name}
            </Typography>
            <Typography variant="body1">
                <strong>Special Ability: </strong>
                {player.pilotShip.specialAbility}
            </Typography>
            <Typography sx={{ mt: 4 }} variant="overline">
                Leadership: {player.leadership} / 10
            </Typography>
            <Slider
                value={player.leadership}
                onChange={(e: Event, value: number | number[]) => {
                    onUpdatePlayer(playerId, {
                        leadership: typeof value === "number" ? value : 0,
                    });
                }}
                marks
                min={0}
                max={10}
            />
        </React.Fragment>
    );
}

function ShipSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Ship: {player.pilotShip.ship.name}
            </Typography>
            <Typography variant="body1">
                <strong>Ship Type: </strong>
                {player.pilotShip.ship.type}
            </Typography>
            <Typography variant="body1">
                <strong>Speed: </strong>
                {player.pilotShip.ship.type}
            </Typography>
            <Typography sx={{ mt: 4 }} variant="overline">
                Maintenance: {player.maintenance} / 10
            </Typography>
            <Slider
                value={player.maintenance}
                onChange={(e: Event, value: number | number[]) => {
                    onUpdatePlayer(playerId, {
                        maintenance: typeof value === "number" ? value : 0,
                    });
                }}
                marks
                min={0}
                max={10}
            />
        </React.Fragment>
    );
}

function CrebitsBlock(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    return (
        <TextField
            fullWidth
            label="Crebits"
            inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
            }}
            variant="filled"
            defaultValue={player.crebits}
            onChange={(event) => {
                onUpdatePlayer(playerId, {
                    crebits: parseInt(event.target.value),
                });
            }}
        />
    );
}

function CrewSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    const [pendingCrew, setPendingCrew] = useState("");
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Crew: {player.crew.length} / {player.pilotShip.ship.crewSlots}
            </Typography>
            <List dense disablePadding>
                {player.crew.map((c) => (
                    <ListItem disableGutters>
                        <ListItemText primary={c.text} />
                    </ListItem>
                ))}
            </List>
            <Stack sx={{ mt: 2 }} spacing={1} direction="row" alignItems="top">
                <TextField
                    fullWidth
                    margin="dense"
                    size="small"
                    variant="filled"
                    label="New Crew"
                    multiline
                    value={pendingCrew}
                    onChange={(event) => {
                        setPendingCrew(event.target.value);
                    }}
                />
                <Button
                    disabled={pendingCrew === ""}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onUpdatePlayer(playerId, {
                            crew: [
                                ...player.crew,
                                {
                                    text: pendingCrew,
                                    isEqipped: false,
                                },
                            ],
                        });
                        setPendingCrew("");
                    }}
                >
                    Add
                </Button>
            </Stack>
        </React.Fragment>
    );
}

function EquipmentSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    const [pendingEquipment, setPendingEquipment] = useState("");
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Equipment: {player.equipment.length} /{" "}
                {player.pilotShip.ship.equipmentSlots}
            </Typography>
            <List dense disablePadding>
                {player.equipment.map((eq) => (
                    <ListItem disableGutters>
                        <ListItemText primary={eq.text} />
                    </ListItem>
                ))}
            </List>
            <Stack sx={{ mt: 2 }} spacing={1} direction="row" alignItems="top">
                <TextField
                    fullWidth
                    margin="dense"
                    size="small"
                    variant="filled"
                    label="New Equipment"
                    multiline
                    value={pendingEquipment}
                    onChange={(event) => {
                        setPendingEquipment(event.target.value);
                    }}
                />
                <Button
                    disabled={pendingEquipment === ""}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onUpdatePlayer(playerId, {
                            equipment: [
                                ...player.equipment,
                                {
                                    text: pendingEquipment,
                                    isEqipped: false,
                                },
                            ],
                        });
                        setPendingEquipment("");
                    }}
                >
                    Add
                </Button>
            </Stack>
        </React.Fragment>
    );
}

function HoldSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;

    const [pendingHold, setPendingHold] = useState("");
    const [pendingHoldAmount, setPendingHoldAmount] = useState(0);

    const canAddHold = useMemo(
        () => pendingHold !== "" && pendingHoldAmount > 0,
        [pendingHold, pendingHoldAmount]
    );
    const holdAmount = useMemo(
        () =>
            player.cargo.reduce<number>(
                (acc, cur, i, all) => acc + cur.holdSize,
                0
            ),
        [player.cargo]
    );
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                The Hold: {holdAmount} / {player.pilotShip.ship.holdSlots}
            </Typography>
            <List dense disablePadding>
                {player.cargo.map((c) => (
                    <ListItem disableGutters>
                        <ListItemText primary={`[${c.holdSize}] ${c.text}`} />
                    </ListItem>
                ))}
            </List>
            <Stack sx={{ mt: 2 }} spacing={1} direction="row" alignItems="top">
                <TextField
                    fullWidth
                    margin="dense"
                    size="small"
                    variant="filled"
                    label="New Cargo"
                    multiline
                    value={pendingHold}
                    onChange={(event) => {
                        setPendingHold(event.target.value);
                    }}
                />
                <Input
                    value={pendingHoldAmount}
                    size="small"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPendingHoldAmount(parseInt(e.target.value));
                    }}
                    inputProps={{
                        step: 10,
                        min: 0,
                        type: "number",
                    }}
                />
                <Button
                    disabled={!canAddHold}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onUpdatePlayer(playerId, {
                            cargo: [
                                ...player.cargo,
                                {
                                    text: pendingHold,
                                    holdSize: pendingHoldAmount,
                                },
                            ],
                        });
                        setPendingHold("");
                        setPendingHoldAmount(0);
                    }}
                >
                    Add
                </Button>
            </Stack>
        </React.Fragment>
    );
}

function ReputationSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    return (
        <Stack spacing={1}>
            <Typography variant="h5">Reputation</Typography>
            <RepSlider
                agencyName="The Independants"
                rep={player.rep.independents}
                onRepChange={(rep: number) => {
                    onUpdatePlayer(playerId, {
                        "rep.independents": rep,
                    });
                }}
            />
            <RepSlider
                agencyName="The Coalition"
                rep={player.rep.coalition}
                onRepChange={(rep: number) => {
                    onUpdatePlayer(playerId, {
                        "rep.coalition": rep,
                    });
                }}
            />
            <RepSlider
                agencyName="The Starfolk"
                rep={player.rep.starfolk}
                onRepChange={(rep: number) => {
                    onUpdatePlayer(playerId, {
                        "rep.starfolk": rep,
                    });
                }}
            />
        </Stack>
    );
}
