import React from 'react';
import NavContainer from './Nav/NavContainer';

import { initializeApp } from 'firebase/app'
import NavProvider from './Nav/NavContext';

initializeApp({
    apiKey: "AIzaSyAebFwzjWYwQfedMyYscggbHF9xdAHyDp0",
    authDomain: "rakers-scorecard.firebaseapp.com",
    projectId: "rakers-scorecard",
    storageBucket: "rakers-scorecard.appspot.com",
    messagingSenderId: "355873443241",
    appId: "1:355873443241:web:58ecc1c664b730bb3548b8",
    measurementId: "G-XVTJJPNZCF"
})

function App() {
    return <NavProvider><NavContainer /></NavProvider>;
}

export default App;
