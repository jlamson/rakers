import React, { useContext } from "react";
import { NavContext } from "../Nav/NavContext";
import { getFirestore, doc, updateDoc, UpdateData } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PilotShip, pilotShipConverter } from "../Data/pilotship";
import {
    Box,
    Container,
    Grid,
    Input,
    Paper,
    Slider,
    Stack,
    TextField,
    ToggleButton,
    Typography,
} from "@mui/material";
import Skills from "../Data/skills";

export default function AddEditPilotShip() {
    const [currentDest, _] = useContext(NavContext);
    const id = currentDest.split("/")[1];
    const pilotShipRef = doc(getFirestore(), "pilotShips", id);
    const [pilotShip, loading, error] = useDocumentData(
        pilotShipRef.withConverter(pilotShipConverter)
    );
    function updatePilotShip(updateData: UpdateData<PilotShip>) {
        updateDoc(pilotShipRef, updateData)
            .then((value) => console.log(`updateDoc -> ${value}`))
            .catch((e) => console.log(e));
    }

    return (
        <Box sx={{ m: 3, py: 2 }}>
            <Stack spacing={1}>
                <Typography sx={{ ml: 2 }} variant="h4">
                    {error && `Error! ${JSON.stringify(error)}`}
                    {loading && "Loading..."}
                    {pilotShip &&
                        `Edit ${pilotShip.name} & ${pilotShip.ship.name}`}
                </Typography>
                {pilotShip && (
                    <PilotShipForm
                        pilotShip={pilotShip}
                        onUpdate={updatePilotShip}
                    />
                )}
            </Stack>
        </Box>
    );
}

interface PilotShipFormProps {
    pilotShip: PilotShip;
    onUpdate: (updateData: UpdateData<PilotShip>) => void;
}

function PilotShipForm(props: PilotShipFormProps) {
    const { pilotShip, onUpdate } = props;

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <PilotForm pilotShip={pilotShip} onUpdate={onUpdate} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ShipForm pilotShip={pilotShip} onUpdate={onUpdate} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <StartingRepSliders
                            pilotShip={pilotShip}
                            onUpdate={onUpdate}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

function PilotForm(props: PilotShipFormProps) {
    const { pilotShip, onUpdate } = props;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography sx={{ ml: 0.5 }} variant="h5">
                    Pilot Stats
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    fullWidth
                    label="Pilot Name"
                    variant="filled"
                    defaultValue={pilotShip.name}
                    onChange={(event) => {
                        onUpdate({ name: event.target.value });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Starting Crebits"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    variant="filled"
                    defaultValue={pilotShip.startingCrebits}
                    onChange={(event) => {
                        onUpdate({
                            startingCrebits: parseInt(event.target.value),
                        });
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    fullWidth
                    minRows="4"
                    label="Special Ability"
                    variant="filled"
                    defaultValue={pilotShip.specialAbility}
                    onChange={(event) => {
                        onUpdate({ specialAbility: event.target.value });
                    }}
                />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
                <SkillsBox pilotShip={pilotShip} onUpdate={onUpdate} />
            </Grid>
        </Grid>
    );
}

function SkillsBox(props: PilotShipFormProps) {
    const { pilotShip, onUpdate } = props;
    function toggleSkill(skill: Skills) {
        const oldSkills = pilotShip.startingSkills;
        if (oldSkills.includes(skill)) {
            onUpdate({ startingSkills: oldSkills.filter((s) => s !== skill) });
        } else {
            onUpdate({ startingSkills: [...oldSkills, skill] });
        }
    }

    return (
        <React.Fragment>
            <Typography sx={{ ml: 1, mt: 2 }} variant="overline">
                Starting Skills
            </Typography>
            <Grid container spacing={2}>
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.QUICK_THINK}
                    displaySkill={"Quick Think"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.DIPLOMACY}
                    displaySkill={"Diplomacy"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.INFORMED}
                    displaySkill={"Informed"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.ACE_PILOT}
                    displaySkill={"Ace Pilot"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.COMBAT}
                    displaySkill={"Combat"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    pilotSkills={pilotShip.startingSkills}
                    skill={Skills.GRIND}
                    displaySkill={"Grind"}
                    toggleSkill={toggleSkill}
                />
            </Grid>
        </React.Fragment>
    );
}

interface SkillToggleButtonProps {
    pilotSkills: Skills[];
    skill: Skills;
    displaySkill: string;
    toggleSkill: (skill: Skills) => void;
}

function SkillToggleButton(props: SkillToggleButtonProps) {
    const { pilotSkills, skill, displaySkill, toggleSkill } = props;
    const selected = pilotSkills.includes(skill);
    return (
        <Grid item xs={6} sm={4} lg={3} xl={2}>
            <ToggleButton
                fullWidth
                color="secondary"
                value={skill}
                selected={selected}
                onChange={() => {
                    toggleSkill(skill);
                }}
            >
                {displaySkill}
            </ToggleButton>
        </Grid>
    );
}

function ShipForm(props: PilotShipFormProps) {
    const { pilotShip, onUpdate } = props;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography sx={{ ml: 0.5 }} variant="h5">
                    Ship Stats
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Ship Name"
                    variant="filled"
                    defaultValue={pilotShip.ship.name}
                    onChange={(event) => {
                        onUpdate({ "ship.name": `${event.target.value}` });
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Ship Type"
                    variant="filled"
                    defaultValue={pilotShip.ship.type}
                    onChange={(event) => {
                        onUpdate({ "ship.type": `${event.target.value}` });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Speed"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    variant="filled"
                    defaultValue={pilotShip.ship.speed}
                    onChange={(event) => {
                        onUpdate({
                            "ship.speed": parseInt(event.target.value),
                        });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Hold Slots"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    variant="filled"
                    defaultValue={pilotShip.ship.holdSlots}
                    onChange={(event) => {
                        onUpdate({
                            "ship.holdSlots": parseInt(event.target.value),
                        });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Crew Slots"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    variant="filled"
                    defaultValue={pilotShip.ship.crewSlots}
                    onChange={(event) => {
                        onUpdate({
                            "ship.crewSlots": parseInt(event.target.value),
                        });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Equipment Slots"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    variant="filled"
                    defaultValue={pilotShip.ship.equipmentSlots}
                    onChange={(event) => {
                        onUpdate({
                            "ship.equipmentSlots": parseInt(event.target.value),
                        });
                    }}
                />
            </Grid>
        </Grid>
    );
}

function StartingRepSliders(props: PilotShipFormProps) {
    const { pilotShip, onUpdate } = props;

    return (
        <Stack spacing={1}>
            <Typography sx={{ ml: 0.5, mb: 1 }} variant="h5">
                Starting Reputation
            </Typography>
            <RepSlider
                agencyName="The Independants"
                rep={pilotShip.startingRep.independents}
                onRepChange={(rep: number) => {
                    onUpdate({ "startingRep.independents": rep });
                }}
            />
            <RepSlider
                agencyName="The Coalition"
                rep={pilotShip.startingRep.coalition}
                onRepChange={(rep: number) => {
                    onUpdate({ "startingRep.coalition": rep });
                }}
            />
            <RepSlider
                agencyName="The Starfolk"
                rep={pilotShip.startingRep.starfolk}
                onRepChange={(rep: number) => {
                    onUpdate({ "startingRep.starfolk": rep });
                }}
            />
        </Stack>
    );
}

interface RepSliderProps {
    rep: number;
    agencyName: string;
    onRepChange: (rep: number) => void;
}

function RepSlider(props: RepSliderProps) {
    const { rep, agencyName, onRepChange } = props;

    return (
        <Box>
            <Typography variant="overline">{agencyName}</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs sx={{ mx: 2 }}>
                    <Slider
                        value={rep >= 20 ? 20 : rep}
                        onChange={(e: Event, value: number | number[]) => {
                            onRepChange(typeof value === "number" ? value : 0);
                        }}
                        marks
                        min={0}
                        max={20}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={rep}
                        size="small"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onRepChange(parseInt(e.target.value));
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 50,
                            type: "number",
                            "aria-labelledby": "input-slider",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
