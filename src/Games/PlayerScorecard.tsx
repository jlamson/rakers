import React from "react";
import {
    Grid,
    Paper,
    Stack,
    Button,
    Typography,
    Slider,
    TextField,
} from "@mui/material";
import { UpdateData } from "firebase/firestore";
import BigTitleInput from "../Components/BigTitleInput";
import { RepSlider } from "../Components/RepSlider";
import SkillsBox from "../Components/SkillsBox";
import { Player } from "../Data/Player";
import Skills from "../Data/Skills";
import DeleteIcon from "@mui/icons-material/Delete";
import { replaceAtIndex } from "../Utils/array";
import CheckableSubList from "../Components/CheckableSubList";
import CargoList from "../Components/CargoList";

interface PlayerScorecardProps {
    playerId: string;
    player: Player;
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
    deletePlayer: (id: string) => void;
}

export default function PlayerScorecard(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;

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

    const columnGridItemProps = { sm: 12, md: 6, lg: 4 };
    const columnStackProps = { spacing: 1 };
    const paperSx = { p: 2 };

    return (
        <Grid container sx={{ mt: 1, mb: 2 }} spacing={2}>
            <Grid item xs={12}>
                <PlayerHeader {...props} />
            </Grid>
            <Grid item {...columnGridItemProps}>
                <Stack {...columnStackProps}>
                    <Paper sx={paperSx}>
                        <CrebitsBlock {...props} />
                    </Paper>
                    <Paper sx={paperSx}>
                        <PilotSection {...props} />
                    </Paper>
                    <Paper sx={paperSx}>
                        <Grid container>
                            <SkillsBox
                                title="Skills"
                                skills={player.skills}
                                toggleSkill={toggleSkill}
                            />
                        </Grid>
                    </Paper>
                    <Paper sx={paperSx}>
                        <CrewSection {...props} />
                    </Paper>
                </Stack>
            </Grid>
            <Grid item {...columnGridItemProps}>
                <Stack {...columnStackProps}>
                    <Paper sx={paperSx}>
                        <ShipSection {...props} />
                    </Paper>
                    <Paper sx={paperSx}>
                        <EquipmentSection {...props} />
                    </Paper>
                    <Paper sx={paperSx}>
                        <HoldSection {...props} />
                    </Paper>
                </Stack>
            </Grid>
            <Grid item xs={12} lg={4}>
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
    return (
        <CheckableSubList
            label="Crew"
            list={player.crew}
            max={player.pilotShip.ship.crewSlots}
            onDeleteIndex={(index) => {
                onUpdatePlayer(playerId, {
                    crew: player.crew.filter((it, i, all) => i !== index),
                });
            }}
            onCheckChanged={(index, checked) => {
                onUpdatePlayer(playerId, {
                    crew: replaceAtIndex(player.crew, index, (old) => ({
                        ...old,
                        isEquipped: checked,
                    })),
                });
            }}
            onAddNew={(item) => {
                onUpdatePlayer(playerId, {
                    crew: [...player.crew, item],
                });
            }}
        />
    );
}

function EquipmentSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;
    return (
        <CheckableSubList
            label="Equipment"
            list={player.equipment}
            max={player.pilotShip.ship.equipmentSlots}
            onDeleteIndex={(index) => {
                onUpdatePlayer(playerId, {
                    equipment: player.equipment.filter(
                        (it, i, all) => i !== index
                    ),
                });
            }}
            onCheckChanged={(index, checked) => {
                onUpdatePlayer(playerId, {
                    equipment: replaceAtIndex(
                        player.equipment,
                        index,
                        (old) => ({
                            ...old,
                            isEquipped: checked,
                        })
                    ),
                });
            }}
            onAddNew={(item) => {
                onUpdatePlayer(playerId, {
                    equipment: [...player.equipment, item],
                });
            }}
        />
    );
}

function HoldSection(props: PlayerScorecardProps) {
    const { playerId, player, onUpdatePlayer } = props;

    return (
        <CargoList
            list={player.cargo}
            max={player.pilotShip.ship.holdSlots}
            onDeleteIndex={(index) => {
                onUpdatePlayer(playerId, {
                    cargo: player.cargo.filter((it, i, all) => i !== index),
                });
            }}
            onAddNew={(item) => {
                onUpdatePlayer(playerId, { cargo: [...player.cargo, item] });
            }}
        />
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
