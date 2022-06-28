import {
    DocumentData,
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "@firebase/firestore";

export type Game = {
    id: string;
    ref: DocumentReference;
    name: string;
    turn: number;
};

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
            ref: snapshot.ref,
            name: data.name,
            turn: data.turn,
        };
    },
};
