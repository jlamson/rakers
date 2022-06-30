import React from "react";
import { Grid, ToggleButton, Typography } from "@mui/material";
import Skills from "../Data/Skills";

interface SkillsBoxProps {
    title: string;
    skills: Skills[];
    toggleSkill: (skill: Skills) => void;
}

export default function SkillsBox(props: SkillsBoxProps) {
    const { title, skills, toggleSkill } = props;

    return (
        <React.Fragment>
            <Typography sx={{ ml: 1 }} variant="overline">
                {title}
            </Typography>
            <Grid container spacing={1}>
                <SkillToggleButton
                    selectedSkills={skills}
                    skill={Skills.QUICK_THINK}
                    displaySkill={"QuickThink"}
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
