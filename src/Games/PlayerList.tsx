import React, { useState } from "react";
import { UpdateData } from "firebase/firestore";
import { Box, Divider } from "@mui/material";
import { Player } from "../Data/Player";
import ConfirmDeleteDialog from "../Components/ConfirmDeleteDialog";
import PlayerScorecard from "./PlayerScorecard";

interface PlayerListProps {
    players: Player[];
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
    deletePlayer: (id: string) => void;
}

export function PlayerList(props: PlayerListProps) {
    const { players, onUpdatePlayer, deletePlayer } = props;

    const [pendingDeleteId, setPendingDeleteId] = useState("");

    return (
        <Box>
            {players.map((player, i, arr) => {
                const safeId = player.id;
                if (safeId === undefined) return null;
                return (
                    <React.Fragment>
                        <PlayerScorecard
                            playerId={safeId}
                            player={player}
                            onUpdatePlayer={onUpdatePlayer}
                            deletePlayer={(id) => setPendingDeleteId(id)}
                        />
                        <Divider sx={{ mt: 1, mb: 4 }} />
                    </React.Fragment>
                );
            })}
            <ConfirmDeleteDialog
                open={pendingDeleteId !== ""}
                onCancel={() => {
                    setPendingDeleteId("");
                }}
                onConfirmDelete={() => {
                    deletePlayer(pendingDeleteId);
                    setPendingDeleteId("");
                }}
            />
        </Box>
    );
}
