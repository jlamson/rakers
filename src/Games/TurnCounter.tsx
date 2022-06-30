import { Stack, Typography, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { GameContentProps } from "./GameScoreboard";

export function TurnCounter(props: GameContentProps) {
    const { data: gameData, onUpdate } = props;

    return (
        <Stack direction="row" justifyContent="space-evenly">
            <IconButton
                disabled={gameData.turn <= 0}
                onClick={() => {
                    onUpdate({ turn: gameData.turn - 1 });
                }}
            >
                <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <Typography variant="h4">Turn {gameData.turn}</Typography>
            <IconButton
                onClick={() => {
                    onUpdate({ turn: gameData.turn + 1 });
                }}
            >
                <AddCircleOutlineRoundedIcon />
            </IconButton>
        </Stack>
    );
}
