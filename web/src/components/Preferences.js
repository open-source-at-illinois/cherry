import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SliderComponent from "./SliderComponent";
import { Checkbox, Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";

const Preferences = ({preferences, setPreferences}) => {

    const handleSliderChange = (parameter) => {
        console.log(preferences)
        return (event) => {
            setPreferences({...preferences, [parameter]: event.target.value});
        }
    }
    const getSliderValue = (parameter) => {
        return () => preferences[parameter] || 20;
    }

    const updateGenEds = (geneds) => {
        setPreferences({...preferences, geneds: geneds});
    }

    return (
        <>
            <Card sx={{ minWidth: 275, backgroundColor: "#f5f5f5" }} variant="outlined">
                <Typography variant="h5" sx={{padding:1}}>
                    Preferences
                </Typography>
                <GenEdSelector geneds={preferences.geneds} setGenEds={updateGenEds}/>
                {/* <CardContent>
                    <SliderComponent label='Rate My Professor' 
                        value={getSliderValue(prefs.rateMyProfessor)}
                        onChangeCommitted={handleSliderChange(prefs.rateMyProfessor)} 
                        defaultValue={30} 
                        min={0} 
                        max={99} 
                        step={10}/>
                </CardContent> */}
            </Card>
        </>
    )
}

export default Preferences;
