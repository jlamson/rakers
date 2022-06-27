enum Skills {
    QUICK_THINK = "QUICK_THINK",
    DIPLOMACY = "DIPLOMACY",
    INFORMED = "INFORMED",
    ACE_PILOT = "ACE_PILOT",
    COMBAT = "COMBAT",
    GRIND = "GRIND",
};

export type SkillStrings = keyof typeof Skills

export default Skills
