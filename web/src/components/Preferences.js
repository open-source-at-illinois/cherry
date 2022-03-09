import React from "react";
import Card from '@mui/material/Card';
// import { Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";
import SearchBar from "./SearchBar";

const Preferences = ({preferences, setPreferences}) => {

    // const handleSliderChange = (parameter) => {
    //     console.log(preferences)
    //     return (event) => {
    //         setPreferences({...preferences, [parameter]: event.target.value});
    //     }
    // }
    // const getSliderValue = (parameter) => {
    //     return () => preferences[parameter] || 20;
    // }

    const updateGenEds = (geneds) => {
        setPreferences({...preferences, geneds: geneds});
    }

    const updateSearchTerm = (newSearchTerm) => {
        setPreferences({...preferences, searchTerm: newSearchTerm});
    }
    

    const preferencesStyle = {
        margin: 10
    }

    return (
        <>
            <Card sx={{ backgroundColor: "#f5f5f5", margin:3 }} variant="outlined">
                <div style={preferencesStyle}>
                    <SearchBar searchTerm={preferences.searchTerm} setSearchTerm={updateSearchTerm} />
                </div>
                <div style={preferencesStyle}>
                    <GenEdSelector geneds={preferences.geneds} setGenEds={updateGenEds}/>
                </div>
            </Card>
        </>
    )
}

export default Preferences;
