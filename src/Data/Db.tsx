import { FirebaseApp, initializeApp } from "firebase/app";
import {
    collection,
    CollectionReference,
    Firestore,
    FirestoreDataConverter,
    getFirestore,
} from "firebase/firestore";

import { Game, gameConverter } from "./Game";
import { PilotShip, pilotShipConverter } from "./PilotShip";
import { Player, playerConverter } from "./Player";

const firebaseConfig = {
    apiKey: "AIzaSyAebFwzjWYwQfedMyYscggbHF9xdAHyDp0",
    authDomain: "rakers-scorecard.firebaseapp.com",
    projectId: "rakers-scorecard",
    storageBucket: "rakers-scorecard.appspot.com",
    messagingSenderId: "355873443241",
    appId: "1:355873443241:web:58ecc1c664b730bb3548b8",
    measurementId: "G-XVTJJPNZCF",
};
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(firebaseApp);

function collectionRef<T>(
    collectionName: string,
    converter: FirestoreDataConverter<T>
) {
    return collection(firestore, collectionName).withConverter(converter);
}

type Db = {
    games: CollectionReference<Game>;
    pilotShips: CollectionReference<PilotShip>;
    players: (id: string) => CollectionReference<Player>;
};

const db: Db = {
    games: collectionRef("games", gameConverter),
    pilotShips: collectionRef("pilotShips", pilotShipConverter),
    players: (gameId: string) =>
        collectionRef(`games/${gameId}/players`, playerConverter),
};

export default db;
