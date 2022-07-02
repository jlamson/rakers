import Resource from "./Resource";

export type Ship = {
    name: string;
    type: string;
    speed: number;
    crewSlots: number;
    equipmentSlots: number;
    holdSlots: number;
    resourceProficiencies: Resource[];
};
