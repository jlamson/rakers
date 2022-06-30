import {
    Typography,
    List,
    ListItem,
    IconButton,
    Checkbox,
    ListItemText,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Equippable } from "../Data/Player";
import { count } from "../Utils/array";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";

interface CheckableSubListProps {
    label: string;
    list: Equippable[];
    max: number;
    onDeleteIndex: (i: number) => void;
    onCheckChanged: (i: number, checked: boolean) => void;
    onAddNew: (item: Equippable) => void;
}

export default function CheckableSubList(props: CheckableSubListProps) {
    const { list, label, max, onDeleteIndex, onCheckChanged, onAddNew } = props;

    const [pendingNew, setPendingNew] = useState("");
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState(-1);

    const equippedCount = useMemo(
        () => count(list, (it) => it.isEquipped),
        [list]
    );
    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                {label}: {equippedCount} / {max}
            </Typography>
            <List dense disablePadding>
                {list.map((it, index) => (
                    <ListItem
                        key={`${index}-${it.text}`}
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
                        <Checkbox
                            edge="start"
                            checked={it.isEquipped}
                            onChange={(event, checked) => {
                                onCheckChanged(index, checked);
                            }}
                        />
                        <ListItemText primary={it.text} />
                    </ListItem>
                ))}
            </List>
            <Stack sx={{ mt: 2 }} spacing={1} direction="row" alignItems="top">
                <TextField
                    fullWidth
                    margin="dense"
                    size="small"
                    variant="filled"
                    label="New Crew"
                    multiline
                    value={pendingNew}
                    onChange={(event) => {
                        setPendingNew(event.target.value);
                    }}
                />
                <Button
                    disabled={pendingNew === ""}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onAddNew({ text: pendingNew, isEquipped: false });
                        setPendingNew("");
                    }}
                >
                    Add
                </Button>
                <ConfirmDeleteDialog
                    open={pendingDeleteIndex >= 0}
                    entityName={label}
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
