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
    onConfirmDelete: () => void;
    onCancel: () => void;
}

export default function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
    const { open, onConfirmDelete, onCancel } = props;
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>You sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete that?
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
