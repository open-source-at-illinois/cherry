import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import useWindowDimensions from '../useWindowDimensions';


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { height, width } = useWindowDimensions();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navStyle = {
        color: '#0E0063',
        background: 'white',
    }

    const navVariant = "h6";

    return (
        <AppBar position="static" elevation={0}>
            <Container maxWidth="xl" sx={navStyle}>
                <Toolbar disableGutters>
                    <Container sx={{ display: width > 900 ? 'flex' : 'none', flexGrow: 1 }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link href="/home" underline="none" color='#0E0063' variant="h4">Cherry</Link>
                        </Typography>
                    </Container>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key='Analytics' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link href='/analytics' underline="none" color='#0E0063' variant={navVariant}>Analytics</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem key='About' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link href='/about' underline="none" color='#0E0063' variant={navVariant}>About</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem key='Login' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link href='/login' underline="none" color='#0E0063' variant={navVariant}>Login</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant={navVariant}
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Link href="/home" underline="none" color='#0E0063' variant="h4">Cherry</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key='Analytics'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', paddingLeft: 10, paddingRight: 10 }}
                        >
                            <Typography textAlign="center">
                                <Link href='/analytics' underline="none" color='#0E0063' variant={navVariant}>Analytics</Link>
                            </Typography>
                        </Button>
                        <Button
                            key='About'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', paddingLeft: 10, paddingRight: 10 }}
                        >
                            <Typography textAlign="center">
                                <Link href='/about' underline="none" color='#0E0063' variant={navVariant}>About</Link>
                            </Typography>
                        </Button>
                        <Button
                            key='Login'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', paddingLeft: 10, paddingRight: 10 }}
                        >
                            <Typography textAlign="center">
                                <Link href='/login' underline="none" color='#0E0063' variant={navVariant}>Login</Link>
                            </Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;