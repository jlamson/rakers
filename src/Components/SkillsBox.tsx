import React from "react";
import { Grid, ToggleButton, Typography } from "@mui/material";
import Skills from "../Data/Skills";

interface SkillsBoxProps {
    skills: Skills[];
    toggleSkill: (skill: Skills) => void;
}

export default function SkillsBox(props: SkillsBoxProps) {
    const { skills, toggleSkill } = props;

    return (
        <React.Fragment>
            <Typography sx={{ ml: 1, mt: 2 }} variant="overline">
                Starting Skills
            </Typography>
            <Grid container spacing={2}>
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.QUICK_THINK}
                    displaySkill={"Quick Think"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.DIPLOMACY}
                    displaySkill={"Diplomacy"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.INFORMED}
                    displaySkill={"Informed"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.ACE_PILOT}
                    displaySkill={"Ace Pilot"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.COMBAT}
                    displaySkill={"Combat"}
                    toggleSkill={toggleSkill}
                />
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.GRIND}
                    displaySkill={"Grind"}
                    toggleSkill={toggleSkill}
                />
            </Grid>
        </React.Fragment>
    );
}

interface SkillToggleButtonProps {
    selectedSkills: Skills[];
    skill: Skills;
    displaySkill: string;
    toggleSkill: (skill: Skills) => void;
}

function SkillToggleButton(props: SkillToggleButtonProps) {
    const {
        selectedSkills: pilotSkills,
        skill,
        displaySkill,
        toggleSkill,
    } = props;
    const selected = pilotSkills.includes(skill);
    return (
        <Grid item xs={6} sm={4}>
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
