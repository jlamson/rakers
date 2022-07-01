import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "@firebase/firestore";

export type Game = {
    id: string;
    name: string;
    turn: number;
};

export function buildNewGame(): Game {
    return {
        id: "",
        name: "New Game",
        turn: 0,
    };
}

export const gameConverter: FirestoreDataConverter<Game> = {
    toFirestore(model: WithFieldValue<Game>): DocumentData {
        return {
            name: model.name,
            turn: model.turn,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<Game>,
        options: SnapshotOptions
    ): Game {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            turn: data.turn,
        };
    },
};
