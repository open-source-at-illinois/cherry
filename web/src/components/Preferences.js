import React from "react";
import Card from '@mui/material/Card';
// import { Typography } from "@mui/material";
import GenEdSelector from "./GenEdSelector";
import SearchBar from "./SearchBar";
import Drop from "./Dropdown";

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
                    <Drop prefs={preferences} setPrefs={setPreferences}/>
                </div>
            </Card>
        </>
    )
}

export default Preferences;
