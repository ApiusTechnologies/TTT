import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginDialog from './LoginDialog';
import PresetDialog from './PresetDialog';
import CustomPresets from './CustomPresets';

const Navbar = (props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${props.drawerWidth}px)` },
                ml: { sm: `${props.drawerWidth}px` },
            }}>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' }, marginLeft: '16px' }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{ mr: 2, display: { xs: 'none', sm: 'flex' }, marginLeft: '16px' }} />
                <Box sx={{ display: 'flex' }}>
                    <Box
                        component="img"
                        sx={{ display: 'flex', mr: 1, height: '48px' }}
                        alt="Apius Logo"
                        src="/logo.png"
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 2,
                            fontFamily: 'Bebas Neue',
                            fontSize: '2rem',
                            fontWeight: 400,
                            textDecoration: 'none',
                            color: 'primary.contrastText',
                            alignSelf: 'center',
                        }}
                    >
                        Threat Trends Tracker
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            mr: 2,
                            fontFamily: 'Bebas Neue',
                            fontSize: '2rem',
                            fontWeight: 400,
                            textDecoration: 'none',
                            color: 'primary.contrastText',
                            alignSelf: 'center',
                        }}
                    >
                        TTT
                    </Typography></Box>
                <Box sx={{ display: 'flex', marginRight: '16px', gap: '16px' }}>
                    <CustomPresets isLoggedIn={props.isLoggedIn} customPresets={props.customPresets} setCustomPresets={props.setCustomPresets}/>
                    <PresetDialog setSelectedPresets={props.setSelectedPresets} />
                    <LoginDialog
                        isLoggedIn={props.isLoggedIn}
                        setIsLoggedIn={props.setIsLoggedIn}
                        patchProfileReadNews={props.patchProfileReadNews} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
