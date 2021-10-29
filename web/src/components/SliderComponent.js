import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const SliderComponent = (props) => {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                        {props.label}
                    </Typography>
                    <Slider
                        defaultValue={props.defaultValue}
                        valueLabelDisplay="auto"
                        step={props.step}
                        marks
                        min={props.min}
                        max={props.max}
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default SliderComponent;
