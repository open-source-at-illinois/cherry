import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SliderComponent from "./SliderComponent";
import { Checkbox, Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";
import SearchBar from "./SearchBar";

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
                <SearchBar searchTerm={preferences.searchTerm} setSearchTerm={updateSearchTerm} />
                <GenEdSelector geneds={preferences.geneds} setGenEds={updateGenEds}/>
            </Card>
        </>
    )
}

export default Preferences;
