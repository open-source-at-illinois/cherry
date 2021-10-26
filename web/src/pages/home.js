import React from "react";
import SliderBox from "../components/Slider";
import CourseList from '../components/CourseList';
import { Grid } from "@mui/material";

const HomePage = () => {
    return (
        <>
            <Grid container>
                <Grid item><SliderBox /></Grid>
                <Grid item><CourseList /></Grid>
            </Grid>

        </>
    )
}
export default HomePage;