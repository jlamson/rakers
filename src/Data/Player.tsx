import {
    DocumentData,
    DocumentReference,
    Firestore,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";
import { PilotShip } from "./PilotShip";
import { Rep } from "./Rep";
import Skills from "./Skills";

export type Player = {
    id: string | undefined;
    ref: DocumentReference | undefined;
    name: string;
    pilotShip: PilotShip;
    maintenance: number;
    leadership: number;
    crebits: number;
    rep: Rep;
    skills: Skills[];
    crew: Crew[];
    equipment: Equipment[];
    cargo: Cargo[];
};

export type Crew = {
    text: string;
    isEqipped: boolean;
};

export type Equipment = {
    text: string;
    isEqipped: boolean;
};

export type Cargo = {
    text: string;
    holdSize: number;
};

export function buildNewPlayer(
    name: string,
    pilotShip: PilotShip
): WithFieldValue<Player> {
    return {
        id: undefined,
        ref: undefined,
        name: name,
        pilotShip: pilotShip,
        maintenance: 10,
        leadership: 10,
        crebits: pilotShip.startingCrebits,
        rep: pilotShip.startingRep,
        skills: pilotShip.startingSkills,
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
            ref: snapshot.ref,
            name: data.name,
            pilotShip: data.pilotShip,
            maintenance: data.maintenance,
            leadership: data.leadership,
            crebits: data.crebits,
            rep: data.rep,
            skills: data.skills,
            crew: data.crew,
            equipment: data.equipment,
            cargo: data.cargo,
        };
    },
};
