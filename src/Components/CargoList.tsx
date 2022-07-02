import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Cargo } from "../Data/Player";
import Resource, { displayText, ResourceKeys } from "../Data/Resource";
import { parseIntStrict } from "../Utils/number";

interface CargoListProps {
    cargo: Cargo[];
    max: number;
    onAppendCargo: (resource: Resource, amount: number) => void;
}

export default function CargoList(props: CargoListProps) {
    const { cargo, max, onAppendCargo } = props;

    function amountOf(resource: Resource): number {
        return cargo.find((c) => c.resource === resource)?.amount ?? 0;
    }

    const [selectedResource, setSelectedResource] = useState(
        Resource.SCRAP_METAL
    );
    const [pendingAmountStr, setPendingAmountStr] = useState("");

    const canAddHold = useMemo(() => {
        const amountNumber = parseIntStrict(pendingAmountStr);
        return (
            selectedResource != null &&
            !isNaN(amountNumber) &&
            amountNumber !== 0
        );
    }, [selectedResource, pendingAmountStr]);

    const holdAmount = useMemo(() => {
        console.log("holdAmount: ", cargo);
        return cargo.reduce((acc, cur) => {
            const result = acc + cur.amount;
            console.log(
                `reduce ${result} = acc(${acc}) + cur.amount(${cur.amount})`
            );
            return result;
        }, 0);
    }, [cargo]);

    return (
        <React.Fragment>
            <Typography sx={{ mb: 1 }} variant="h5">
                Cargo: {holdAmount} / {max}
            </Typography>
            <List dense disablePadding>
                {ResourceKeys.map((key) => {
                    const resource = Resource[key];
                    return (
                        <ListItem key={`${resource}`} disableGutters>
                            <ListItemText
                                primary={`[${amountOf(resource)}] ${displayText(
                                    resource
                                )}`}
                            />
                        </ListItem>
                    );
                })}
            </List>
            <Typography variant="h5" sx={{ mt: 2, mb: 0.5 }}>
                Add/Remove Resources
            </Typography>
            <Stack
                sx={{ mt: 2 }}
                spacing={1}
                direction="row"
                alignItems="stretch"
            >
                <FormControl fullWidth>
                    <InputLabel>Resource</InputLabel>
                    <Select
                        value={selectedResource}
                        label="Resource"
                        onChange={(event) => {
                            setSelectedResource(event.target.value as Resource);
                        }}
                    >
                        {ResourceKeys.map((key) => {
                            const resource = Resource[key];
                            return (
                                <MenuItem key={resource} value={resource}>
                                    {displayText(resource)}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <TextField
                    variant="filled"
                    label="Amount"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "-?[0-9]*",
                    }}
                    value={pendingAmountStr}
                    onChange={(event) => {
                        setPendingAmountStr(event.target.value);
                    }}
                />
                <Button
                    disabled={!canAddHold}
                    variant="text"
                    size="small"
                    onClick={() => {
                        onAppendCargo(
                            selectedResource as Resource,
                            parseIntStrict(pendingAmountStr)
                        );
                        setPendingAmountStr("");
                    }}
                >
                    Add
                </Button>
            </Stack>
        </React.Fragment>
    );
}
