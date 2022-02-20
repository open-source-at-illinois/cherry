import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const NavBar = (props) => {
    const navStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#0E0063',
        paddingTop: 1,
        paddingBottom: 3,
        justifyContent: 'flex-end',
    };

    const navLinkStyle = {
        paddingLeft: 10,
        display: 'flex',
        paddingRight: 10,
    }

    const logoStyle = {
        ...navLinkStyle,
        justifyContent: 'flex-start',
        flexGrow: 2,
    }

    const navVariant = "h6";

    return (
        <>
        <Box sx={navStyle}>
            <Typography variant="h4" sx={logoStyle}>
                <Link href="/home" underline="none" color='inherit' variant="h4">Cherry</Link>
            </Typography>
            <Link href="/analytics" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>Analytics</Link>
            <Link href="/about" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>About</Link>
            <Link href="/login" underline="none" color='inherit' sx={navLinkStyle} variant={navVariant}>Login</Link>
        </Box>
        </>
    )
}

export default NavBar;
