import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const NavBar = (props) => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0E0063',
        color: 'white',
        paddingTop: 1,
        paddingBottom: 1
    };

    const navLinkStyle = {
        paddingLeft: 10,
        display: 'flex',
        paddingRight: 10
    }

    const navVariant = "h6";

    return (
        <Box sx={navStyle}>
            <Typography variant="h4" sx={navLinkStyle}>Cherry</Typography>
            <Link href="/home" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>Home</Link>
            <Link href="/analytics" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>Analytics</Link>
            <Link href="/about" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>About</Link>
            <Link href="/login" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>Login</Link>
        </Box>
    )
}

export default NavBar;
