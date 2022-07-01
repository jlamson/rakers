import React from "react";
import NavContainer from "./Nav/NavContainer";
import NavProvider from "./Nav/NavContext";

export default function App() {
    return (
        <NavProvider>
            <NavContainer />
        </NavProvider>
    );
}
