import React from "react";
import { Box, Grid, Input, Slider, Typography } from "@mui/material";

export interface RepSliderProps {
    rep: number;
    agencyName: string;
    onRepChange: (rep: number) => void;
}

export function RepSlider(props: RepSliderProps) {
    const { rep, agencyName, onRepChange } = props;

    return (
        <Box>
            <Typography variant="overline">{agencyName}</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs sx={{ mx: 2 }}>
                    <Slider
                        value={rep >= 20 ? 20 : rep}
                        onChange={(e: Event, value: number | number[]) => {
                            onRepChange(typeof value === "number" ? value : 0);
                        }}
                        marks
                        min={0}
                        max={20}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={rep}
                        size="small"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onRepChange(parseInt(e.target.value));
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 50,
                            type: "number",
                            "aria-labelledby": "input-slider",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
