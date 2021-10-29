import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const NavBar = (props) => {
    return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#0E0063', color: 'white', paddingTop: "1%", paddingBottom: "1%"}}>
        <Typography variant="h4" sx = {{ marginLeft: "3%" }}>Cherry</Typography>
        <Link href="/home" underline="none" color='inherit' sx={{ marginLeft: "4%" }} variant="h6">Home</Link>
        <Link href="/analytics" underline="none" color='inherit' sx={{ marginLeft: "4%" }} variant="h6">Analytics</Link>
        <Link href="/about" underline="none" color='inherit' sx={{ marginLeft: "4%" }} variant="h6">About</Link>
        <Link href="/login" underline="none" color='inherit' sx={{ marginLeft: "50%" }} variant="h6">Login</Link>
    </Box>
    )
}

export default NavBar;
