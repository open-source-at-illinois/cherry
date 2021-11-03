import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SliderComponent from "./SliderComponent";
import { Checkbox, Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";

const SliderBox = (props) => {
    return (
        <>
            <Card sx={{ minWidth: 275, backgroundColor: "#f5f5f5" }} variant="outlined">
                <Typography variant="h5" sx={{padding:1}}>
                    Preferences
                </Typography>
                <CardContent>
                    <SliderComponent label='Rate My Professor' defaultValue={30} min={0} max={99} step={10} />
                    <SliderComponent label='Average GPA' defaultValue={30} min={0} max={99} step={10} />
                </CardContent>
                <GenEdSelector/>
            </Card>
        </>
    )
}

export default SliderBox;
