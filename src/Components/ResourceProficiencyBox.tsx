import React, { useMemo } from "react";
import { Grid, ToggleButton, Typography } from "@mui/material";
import Resource from "../Data/Resource";

interface ResourceProficiencyBoxProps {
    title: string;
    proficiencies: Resource[];
    toggleProficiency: (resource: Resource) => void;
}

export default function ResourceProficiencyBox(
    props: ResourceProficiencyBoxProps
) {
    console.log("Resource Proficiency Box Props: ", props);
    const { title, proficiencies, toggleProficiency } = props;

    return (
        <React.Fragment>
            <Typography sx={{ ml: 1 }} variant="overline">
                {title}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.SCRAP_METAL}
                    displayResource={"Scrap Metal"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.PRECIOUS_METAL}
                    displayResource={"Precious Metal"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.SALVAGE}
                    displayResource={"Salvage"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.ORGANICS}
                    displayResource={"Organics"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.H2O}
                    displayResource={"H2O"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.ENERGY}
                    displayResource={"Energy"}
                    toggleProficiency={toggleProficiency}
                />
                <ProficiencyToggleButton
                    selectedProficiencies={proficiencies}
                    resource={Resource.CAUSTIC_ALIEN_SUBSTANCES}
                    displayResource={"CAbs"}
                    toggleProficiency={toggleProficiency}
                />
            </Grid>
        </React.Fragment>
    );
}

interface ProficiencyToggleButtonProps {
    selectedProficiencies: Resource[];
    resource: Resource;
    displayResource: string;
    toggleProficiency: (resource: Resource) => void;
}

function ProficiencyToggleButton(props: ProficiencyToggleButtonProps) {
    console.log("Proficiency Toggle Button Props: ", props);
    const {
        selectedProficiencies,
        resource,
        displayResource,
        toggleProficiency,
    } = props;
    const selected = useMemo(
        () => selectedProficiencies.includes(resource),
        [selectedProficiencies, resource]
    );
    return (
        <Grid item xs="auto">
            <ToggleButton
                color="secondary"
                value={resource}
                selected={selected}
                onChange={() => {
                    toggleProficiency(resource);
                }}
            >
                {displayResource}
            </ToggleButton>
        </Grid>
    );
}
