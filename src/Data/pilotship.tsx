import {
    DocumentData,
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import Rep from "./rep";
import Skills from "./skills";

export interface Ship {
    name: string;
    type: string;
    speed: number;
    crewSlots: number;
    equipmentSlots: number;
    holdSlots: number;
}

export interface PilotShip {
    id: string;
    ref: DocumentReference;
    name: string;
    ship: Ship;
    specialAbility: string;
    startingCrebits: number;
    startingRep: Rep;
    startingSkills: Skills[];
}

export const pilotShipConverter: FirestoreDataConverter<PilotShip> = {
    toFirestore(model: WithFieldValue<PilotShip>): DocumentData {
        return {
            name: model.name,
            ship: model.ship,
            specialAbility: model.specialAbility,
            startingCrebits: model.startingCrebits,
            startingRep: model.startingRep,
            startingSkills: model.startingCrebits,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): PilotShip {
        const data = snapshot.data()
        return {
            id: snapshot.id,
            ref: snapshot.ref,
            name: data.name,
            ship: data.ship,
            specialAbility: data.specialAbility,
            startingCrebits: data.startingCrebits,
            startingRep: data.startingRep,
            startingSkills: data.startingSkills
        }
    },
};
