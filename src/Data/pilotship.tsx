import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { Rep } from "./Rep";
import { Ship } from "./Ship";
import Skills from "./Skills";

export type PilotShip = {
    id: string;
    name: string;
    ship: Ship;
    specialAbility: string;
    startingCrebits: number;
    startingRep: Rep;
    startingSkills: Skills[];
};

/**
 * Used for uploading new pilots w/o an id/ref that we can then edit
 * @param name The pilot's name
 * @returns a pilot with a name and either empty strings or 0 for all other
 * fields
 */
export function buildNewPilot(name: string): WithFieldValue<PilotShip> {
    return {
        id: "",
        name: name,
        ship: {
            name: "",
            type: "",
            speed: 0,
            crewSlots: 0,
            equipmentSlots: 0,
            holdSlots: 0,
        },
        specialAbility: "",
        startingCrebits: 0,
        startingRep: {
            coalition: 0,
            independents: 0,
            starfolk: 0,
        },
        startingSkills: [],
    };
}

export const pilotShipConverter: FirestoreDataConverter<PilotShip> = {
    toFirestore: function (model: WithFieldValue<PilotShip>): DocumentData {
        return {
            name: model.name,
            ship: model.ship,
            specialAbility: model.specialAbility,
            startingCrebits: model.startingCrebits,
            startingRep: model.startingRep,
            startingSkills: model.startingSkills,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): PilotShip {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            name: data.name,
            ship: data.ship,
            specialAbility: data.specialAbility,
            startingCrebits: data.startingCrebits,
            startingRep: data.startingRep,
            startingSkills: data.startingSkills,
        };
    },
};
