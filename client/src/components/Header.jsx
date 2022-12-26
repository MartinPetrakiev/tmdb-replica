import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.scss';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Movies', 'TV Shows', 'People'];
const links_left = ['/movies', '/tv', '/people'];
const settings = ['Profile', 'Logout']
// const links_right = ['/profile', '/logout']

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#032541' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            marginRight: '16px',
                            display: { xs: 'none', md: 'block' },
                            width: '154px',
                            height: '25px',
                            textDecoration: 'none',
                        }}
                    >
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                            alt="The Movie Database (TMDB)" width="154" height="20"
                        />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {pages.map((page, idx) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{
                                    '&:hover': {
                                        backgroundColor: 'gray'
                                    }
                                }}>
                                    <Link to={links_left[idx]} className={styles.link}>{page}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, idx) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={links_left[idx]} className={styles.link}>{page}</Link>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // <header class={styles.header_wrapper}>
        //     <div class="content">
        //         <div class="nav_left">
        //             <Link class="logo" to="/">
        //                 <img
        //                     src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        //                     alt="The Movie Database (TMDB)" width="154" height="20"
        //                 />
        //             </Link>

        //             <ul class="nav_menu">
        //                 <li class="nav_item k-first">
        //                     <Link to="/movie">Movies</Link>
        //                 </li>
        //                 <li class="nav_item">
        //                     <Link to="/tv">TV Shows</Link>
        //                 </li>
        //                 <li class="nav_item">
        //                     <Link class="no_click k-link k-menu-link" href="/people">People</Link>
        //                 </li>
        //             </ul>
        //         </div>

        //         <div class="nav_right">
        //             <ul class="primary">
        //                 <li class="user">
        //                     <Link class="user_link" title="Profile and Settings" to="/user/:id">M</Link>
        //                 </li>

        //                 <li class="search_button">
        //                     <Link class="search" to="/search"></Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </header>
    )
}

export default Header