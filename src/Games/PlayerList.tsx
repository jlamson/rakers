import React, { useMemo, useState } from "react";
import { UpdateData } from "firebase/firestore";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Grid,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Player } from "../Data/Player";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import BigTitleInput from "../Components/BigTitleInput";
import { RepSlider } from "../Components/RepSlider";
import Skills from "../Data/Skills";
import SkillsBox from "../Components/SkillsBox";

interface PlayerListProps {
    players: Player[];
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
    deletePlayer: (id: string) => void;
}

export function PlayerList(props: PlayerListProps) {
    const { players, onUpdatePlayer, deletePlayer } = props;

    const [pendingDeleteId, setPendingDeleteId] = useState("");

    return (
        <Box>
            {players.map((player, i, arr) => {
                const safeId = player.id;
                if (safeId === undefined) return null;
                return (
                    <PlayerSection
                        playerId={safeId}
                        player={player}
                        onUpdatePlayer={onUpdatePlayer}
                        deletePlayer={(id) => setPendingDeleteId(id)}
                    />
                );
            })}
            <ConfirmDeleteDialog
                open={pendingDeleteId !== ""}
                onCancel={() => {
                    setPendingDeleteId("");
                }}
                onConfirmDelete={() => {
                    deletePlayer(pendingDeleteId);
                    setPendingDeleteId("");
                }}
            />
        </Box>
    );
}

interface PlayerSectionProps {
    playerId: string;
    player: Player;
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
    deletePlayer: (id: string) => void;
}

function PlayerSection(props: PlayerSectionProps) {
    const { playerId, player, onUpdatePlayer, deletePlayer } = props;
    const paperSx = {
        p: 2,
        display: "flex",
        flexDirection: "column",
    };

    const [pendingCrew, setPendingCrew] = useState("");
    const [pendingEquipment, setPendingEquipment] = useState("");
    const [pendingHold, setPendingHold] = useState("");
    const [pendingHoldAmount, setPendingHoldAmount] = useState(0);

    const canAddHold = pendingHold !== "" && pendingHoldAmount > 0;
    const holdAmount = player.cargo.reduce<number>(
        (acc, cur, i, all) => acc + cur.holdSize,
        0
    );

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
        <React.Fragment>
            <Grid container sx={{ mt: 1, mb: 2 }} spacing={2}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item {...smallCardProps}>
                    <Paper sx={paperSx}>
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
                                    leadership:
                                        typeof value === "number" ? value : 0,
                                });
                            }}
                            marks
                            min={0}
                            max={10}
                        />
                    </Paper>
                </Grid>
                <Grid item {...smallCardProps}>
                    <Paper sx={paperSx}>
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
                                    maintenance:
                                        typeof value === "number" ? value : 0,
                                });
                            }}
                            marks
                            min={0}
                            max={10}
                        />
                    </Paper>
                </Grid>
                <Grid item {...smallCardProps}>
                    <Paper sx={paperSx}>
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
                        <Typography sx={{ mb: 1 }} variant="h5">
                            Crew: {player.crew.length} /{" "}
                            {player.pilotShip.ship.crewSlots}
                        </Typography>
                        <List dense disablePadding>
                            {player.crew.map((c) => (
                                <ListItem disableGutters>
                                    <ListItemText primary={c.text} />
                                </ListItem>
                            ))}
                        </List>
                        <Stack
                            sx={{ mt: 2 }}
                            spacing={1}
                            direction="row"
                            alignItems="top"
                        >
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
                    </Paper>
                </Grid>
                <Grid item {...bigCardProps}>
                    <Paper sx={paperSx}>
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
                        <Stack
                            sx={{ mt: 2 }}
                            spacing={1}
                            direction="row"
                            alignItems="top"
                        >
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
                    </Paper>
                </Grid>
                <Grid item {...bigCardProps}>
                    <Paper sx={paperSx}>
                        <Typography sx={{ mb: 1 }} variant="h5">
                            The Hold: {holdAmount} /{" "}
                            {player.pilotShip.ship.holdSlots}
                        </Typography>
                        <List dense disablePadding>
                            {player.cargo.map((c) => (
                                <ListItem disableGutters>
                                    <ListItemText
                                        primary={`[${c.holdSize}] ${c.text}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Stack
                            sx={{ mt: 2 }}
                            spacing={1}
                            direction="row"
                            alignItems="top"
                        >
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
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setPendingHoldAmount(
                                        parseInt(e.target.value)
                                    );
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
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={paperSx}>
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
                    </Paper>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 4 }} />
        </React.Fragment>
    );
}
