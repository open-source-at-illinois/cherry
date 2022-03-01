import React from "react";
import Preferences from "../components/Preferences";
import { Grid } from "@mui/material";
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
    };
    const itemStyle = {
        padding: 1,
    };
    return (
        <>
            <Grid container sx={containerStyle}>
                <Grid item sx={itemStyle}>
                    <Preferences preferences={preferences} setPreferences={setPreferences}/>
                </Grid>
                <Grid item sx={itemStyle}>
                    <CourseTable preferences={preferences}/>
                </Grid>
            </Grid>
        </>
    )
}
export default HomePage;
