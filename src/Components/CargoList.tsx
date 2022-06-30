import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Button,
    IconButton,
    FilledInput,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Cargo } from "../Data/Player";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface CargoListProps {
    list: Cargo[];
    max: number;
    onDeleteIndex: (i: number) => void;
    onAddNew: (item: Cargo) => void;
}

export default function CargoList(props: CargoListProps) {
    const { list, max, onDeleteIndex, onAddNew } = props;

    const [pendingHold, setPendingHold] = useState("");
    const [pendingHoldAmount, setPendingHoldAmount] = useState(0);
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState(-1);

    const canAddHold = useMemo(
        () => pendingHold !== "" && pendingHoldAmount > 0,
        [pendingHold, pendingHoldAmount]
    );
    const holdAmount = useMemo(
        () => list.reduce<number>((acc, cur, i, all) => acc + cur.holdSize, 0),
        [list]
    );

    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Cargo: {holdAmount} / {max}
            </Typography>
            <List dense disablePadding>
                {list.map((cargo, index) => (
                    <ListItem
                        key={`${index}-${cargo.text}`}
                        disableGutters
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => {
                                    setPendingDeleteIndex(index);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={`[${cargo.holdSize}] ${cargo.text}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Stack
                sx={{ mt: 2 }}
                spacing={1}
                direction="row"
                alignItems="stretch"
            >
                <TextField
                    fullWidth
                    variant="filled"
                    label="New Cargo"
                    value={pendingHold}
                    onChange={(event) => {
                        setPendingHold(event.target.value);
                    }}
                />
                <FilledInput
                    size="small"
                    inputProps={{
                        width: "50px",
                        step: 10,
                        min: 0,
                        type: "number",
                    }}
                    value={pendingHoldAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPendingHoldAmount(parseInt(e.target.value));
                    }}
                />
                <Button
                    disabled={!canAddHold}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onAddNew({
                            text: pendingHold,
                            holdSize: pendingHoldAmount,
                        });
                        setPendingHold("");
                        setPendingHoldAmount(0);
                    }}
                >
                    Add
                </Button>
                <ConfirmDeleteDialog
                    open={pendingDeleteIndex >= 0}
                    entityName="Cargo"
                    onCancel={() => {
                        setPendingDeleteIndex(-1);
                    }}
                    onConfirmDelete={() => {
                        onDeleteIndex(pendingDeleteIndex);
                        setPendingDeleteIndex(-1);
                    }}
                />
            </Stack>
        </React.Fragment>
    );
}
