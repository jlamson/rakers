import React from "react";
import { UpdateData } from "firebase/firestore";
import { List, ListItem, ListItemText } from "@mui/material";
import { Player } from "../Data/Player";

interface PlayerListProps {
    players: Player[];
    onUpdatePlayer: (id: string, updateData: UpdateData<Player>) => void;
}

export function PlayerList(props: PlayerListProps) {
    const { players, onUpdatePlayer } = props;

    function cleanPlayer(model: Player) {
        return {
            name: model.name,
            pilotShip: {
                name: model.pilotShip.name,
                ship: model.pilotShip.ship,
                specialAbility: model.pilotShip.specialAbility,
                startingCrebits: model.pilotShip.startingCrebits,
                startingRep: model.pilotShip.startingRep,
                startingSkills: model.pilotShip.startingSkills,
            },
            maintenance: model.maintenance,
            leadership: model.leadership,
            crebits: model.crebits,
            rep: model.rep,
            skills: model.skills,
            crew: model.crew,
            equipment: model.equipment,
            cargo: model.cargo,
        };
    }

    return (
        <List>
            {players.map((player) => (
                <ListItem>
                    <ListItemText
                        primary={JSON.stringify(cleanPlayer(player))}
                    />
                </ListItem>
            ))}
        </List>
    );
}
