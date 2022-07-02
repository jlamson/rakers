import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import Resource from "./Resource";
import { PilotShip } from "./PilotShip";
import { Rep } from "./Rep";
import Skills from "./Skills";

export type Player = {
    id: string;
    name: string;
    pilotShip: PilotShip;
    maintenance: number;
    leadership: number;
    crebits: number;
    rep: Rep;
    skills: Skills[];
    resourceProficiencies: Resource[];
    crew: Crew[];
    equipment: Equipment[];
    cargo: Cargo[];
};

export interface Equippable {
    text: string;
    isEquipped: boolean;
}

export type Crew = {
    text: string;
    isEquipped: boolean;
};

export type Equipment = {
    text: string;
    isEquipped: boolean;
};

export type Cargo = {
    resource: Resource;
    amount: number;
};

export function buildNewPlayer(
    name: string,
    pilotShip: PilotShip
): WithFieldValue<Player> {
    return {
        id: "",
        name: name,
        pilotShip: pilotShip,
        maintenance: 10,
        leadership: 10,
        crebits: pilotShip.startingCrebits,
        rep: pilotShip.startingRep,
        skills: pilotShip.startingSkills,
        resourceProficiencies: pilotShip.ship.resourceProficiencies,
        crew: [],
        equipment: [],
        cargo: [],
    };
}

export const playerConverter: FirestoreDataConverter<Player> = {
    toFirestore: function (model: WithFieldValue<Player>): DocumentData {
        return {
            name: model.name,
            pilotShip: model.pilotShip,
            maintenance: model.maintenance,
            leadership: model.leadership,
            crebits: model.crebits,
            rep: model.rep,
            skills: model.skills,
            resourceProficiencies: model.resourceProficiencies,
            crew: model.crew,
            equipment: model.equipment,
            cargo: model.cargo,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): Player {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            pilotShip: data.pilotShip,
            maintenance: data.maintenance,
            leadership: data.leadership,
            crebits: data.crebits,
            rep: data.rep,
            skills: data.skills,
            resourceProficiencies: data.resourceProficiencies,
            crew: data.crew,
            equipment: data.equipment,
            cargo: data.cargo,
        };
    },
};
