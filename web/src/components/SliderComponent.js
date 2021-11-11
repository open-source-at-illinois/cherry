import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const SliderComponent = ({onChangeCommitted, label, step, min, max, defaultValue, value}) => {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                        {label}
                    </Typography>
                    <Slider
                        value={value()}
                        valueLabelDisplay="auto"
                        step={step}
                        marks={true}
                        min={min}
                        max={max}
                        onChange={onChangeCommitted}
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default SliderComponent;
