import * as React from "react";
import { InputBaseProps, styled } from "@mui/material";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import { Variant } from "@mui/material/styles/createTypography";

type Bigness = Variant & ("h3" | "h4" | "h5");

interface BigTitleInputProps extends InputBaseProps {
    bigness?: Bigness;
}

const StyledBigTitleInput = styled(MuiOutlinedInput, {
    shouldForwardProp: (prop) => prop !== "bigness",
})<BigTitleInputProps>(({ theme, bigness }) => {
    let typographyType;
    if (bigness === "h3") {
        typographyType = theme.typography.h3;
    } else if (bigness === "h5") {
        typographyType = theme.typography.h5;
    } else {
        typographyType = theme.typography.h4;
    }
    return {
        fontSize: typographyType.fontSize,
    };
});

export default function BigTitleInput(props: BigTitleInputProps) {
    const {
        fullWidth = true,
        margin = "dense",
        size = "small",
        bigness = "h4",
        ...rest
    } = props;
    return (
        <StyledBigTitleInput
            fullWidth={fullWidth}
            margin={margin}
            size={size}
            bigness={bigness}
            {...rest}
        />
    );
}
