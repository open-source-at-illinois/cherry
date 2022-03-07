import React from "react";
import Card from '@mui/material/Card';
import { Checkbox, Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";
import GenEdSelectorMobile from "./GenEdSelectorMobile";

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

    const updateSearchTerm = (newSearchTerm) => {
        setPreferences({...preferences, searchTerm: newSearchTerm});
    }
    
    return (
        <>
            <Card sx={{ backgroundColor: "#f5f5f5" }} variant="outlined">
                <Typography variant="h5" sx={{padding:1}}>
                    Preferences
                </Typography>
                <GenEdSelector geneds={preferences.geneds} setGenEds={updateGenEds}/>
                {/* <GenEdSelectorMobile geneds={preferences.geneds} setGenEds={updateGenEds} searchTerm={preferences.searchTerm} setSearchTerm={updateSearchTerm} /> */}
            </Card>
        </>
    )
}

export default Preferences;
