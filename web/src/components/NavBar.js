import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const NavBar = (props) => {
    return (
    <Box sx={{ display: 'flex', alignItems: 'center'}} styl>
        <Typography variant="h4" sx = {{ marginLeft: "3%" }}>Cherry</Typography>
        <Typography variant="h6" component="div" sx={{ marginLeft: "4%" }}>
            <a href="/home">Home</a>
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginLeft: "4%" }}>
            <a href="/analytics">Analytics</a>
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginLeft: "4%" }}>
            <a href="/about">About</a>
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginLeft: "35%" }}>
            <a href="/login">Login</a>
            </Typography>
    </Box>
    )
}

export default NavBar;