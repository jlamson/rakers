import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
    open: boolean;
    entityName?: string;
    onConfirmDelete: () => void;
    onCancel: () => void;
}

export default function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
    const { open, entityName = "", onConfirmDelete, onCancel } = props;
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>You sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{" "}
                    {entityName !== "" ? `that ${entityName}?` : "that?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirmDelete} color="warning">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
