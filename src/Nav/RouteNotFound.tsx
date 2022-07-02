import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import NavDests from "./NavDests";

const lostVegaGIF =
    "https://i.gifer.com/origin/26/264162db570a4614c8fd7dc15c757b8e_w200.webp";

export default function RouteNotFound() {
    const location = useLocation();

    return (
        <Stack alignContent="center" justifyContent="center">
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                <Typography variant="h3">
                    <strong>{location.pathname}</strong> not found
                </Typography>
                <Link to={NavDests.games.list}>Games</Link>
                <Link to={NavDests.pilotShips.list}>Pilots/Ships</Link>
            </Stack>
            <img src={lostVegaGIF} alt="lost vega gif" />
        </Stack>
    );
}
