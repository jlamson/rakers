import React, { useContext, useState } from "react";
import { NavContext } from "../Nav/NavContext";
import {
    getFirestore,
    doc,
    updateDoc,
    UpdateData,
    deleteDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PilotShip, pilotShipConverter } from "../Data/PilotShip";
import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Skills from "../Data/Skills";
import { RepSlider } from "../Components/RepSlider";
import SkillsBox from "../Components/SkillsBox";
import FirebaseDataProps from "../Data/FirebaseDataProps";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import NavDests from "../Nav/NavDests";

export default function AddEditPilotShip() {
    const [currentDest, navigateTo] = useContext(NavContext);
    const id = currentDest.split("/")[1];
    const pilotShipRef = doc(getFirestore(), "pilotShips", id);
    const [pilotShip, loading, error] = useDocumentData(
        pilotShipRef.withConverter(pilotShipConverter)
    );
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function updatePilotShip(updateData: UpdateData<PilotShip>) {
        updateDoc(pilotShipRef, updateData)
            .then((value) => console.log(`updateDoc -> ${value}`))
            .catch((e) => console.log(e));
    }

    function deletePilotShip() {
        deleteDoc(pilotShipRef)
            .then(() => {
                navigateTo(NavDests.pilotShips.list);
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography sx={{ mx: 1 }} variant="h4">
                    {error && `Error! ${JSON.stringify(error)}`}
                    {loading && "Loading..."}
                    {deleteLoading && "Deleting..."}
                    {pilotShip &&
                        `Edit ${pilotShip.name} & ${pilotShip.ship.name}`}
                </Typography>
                {pilotShip && (
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => {
                            setShowConfirmDelete(true);
                        }}
                    >
                        Delete
                    </Button>
                )}
            </Stack>
            {pilotShip && (
                <PilotShipForm data={pilotShip} onUpdate={updatePilotShip} />
            )}
            <ConfirmDeleteDialog
                open={showConfirmDelete}
                onCancel={() => {
                    setShowConfirmDelete(false);
                }}
                onConfirmDelete={() => {
                    deletePilotShip();
                }}
            />
        </Box>
    );
}

interface PilotShipFormProps extends FirebaseDataProps<PilotShip> {}

function PilotShipForm(props: PilotShipFormProps) {
    const { data: pilotShip, onUpdate } = props;
    const paperSx = {
        p: 2,
        display: "flex",
        flexDirection: "column",
    };

    return (
        <Grid container spacing={3} sx={{ mt: 1, pb: 3 }}>
            <Grid item xs={12} md={7}>
                <Paper sx={paperSx}>
                    <PilotForm data={pilotShip} onUpdate={onUpdate} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
                <Paper sx={paperSx}>
                    <ShipForm data={pilotShip} onUpdate={onUpdate} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={paperSx}>
                    <StartingRepSliders data={pilotShip} onUpdate={onUpdate} />
                </Paper>
            </Grid>
        </Grid>
    );
}

function PilotForm(props: PilotShipFormProps) {
    const { data: pilotShip, onUpdate } = props;

    function toggleSkill(skill: Skills) {
        const oldSkills = pilotShip.startingSkills;
        if (oldSkills.includes(skill)) {
            onUpdate({ startingSkills: oldSkills.filter((s) => s !== skill) });
        } else {
            onUpdate({ startingSkills: [...oldSkills, skill] });
        }
    }

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
                <SkillsBox
                    title="Starting Skills"
                    skills={pilotShip.startingSkills}
                    toggleSkill={toggleSkill}
                />
            </Grid>
        </Grid>
    );
}

function ShipForm(props: PilotShipFormProps) {
    const { data: pilotShip, onUpdate } = props;

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
    const { data: pilotShip, onUpdate } = props;

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
