import React from "react";
import Preferences from "../components/Preferences";
import { Box } from "@mui/material";
import CourseTable from '../components/CourseTable';
import { useState } from "react";

const HomePage = () => {

    const [preferences, setPreferences] = React.useState({
        geneds: {
            AC: false, 
            WCC: false,
            NWC: false,
            USMC: false,
            HA: false,
            NST: false,
            QRA: false,
            QRB: false,
            SBS: false
        },
        searchTerm: "",
    }
    );

    const containerStyle = {
        padding: 0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"Center",
        maxHeight:"80vh",
    };
    const preferencesStyle = {
        padding: 1,
        display: "flex"
    };
    const tableStyle = {
        padding: 1,
        display: "flex",
        // width: "100%"

    };
    return (
        <>
            <Box container sx={containerStyle}>
                <Box item sx={preferencesStyle}>
                    <Preferences preferences={preferences} setPreferences={setPreferences}/>
                </Box>
                <Box item sx={tableStyle}>
                    <CourseTable preferences={preferences}/>
                </Box>
            </Box>
        </>
    )
}
export default HomePage;
