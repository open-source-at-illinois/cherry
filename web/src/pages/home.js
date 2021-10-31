import React from "react";
import Preferences from "../components/Preferences";
import CourseList from '../components/CourseList';
import { Grid } from "@mui/material";

const HomePage = () => {
    const containerStyle = {
        padding: 0,
    };
    const itemStyle = {
        padding: 1,
    };
    return (
        <>
            <Grid container sx={containerStyle}>
                <Grid item sx={itemStyle}><Preferences /></Grid>
                <Grid item sx={itemStyle}><CourseList /></Grid>
            </Grid>
        </>
    )
}
export default HomePage;
