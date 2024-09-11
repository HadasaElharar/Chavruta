import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { setLoggedUser, setUnLoggedUser } from '../redux/userSlice';
import logo from '../logo.png';


const pages = [
  { name: "דף הבית", url: '/' },
  { name: "צור קשר", url: "createContact" },
  { name: "שיעורים", url: 'lessons' }
];
const signUpPage = { name: 'הרשמה', url: 'signUp' };

const settingsConnected = [
  { name: "עדכון פרטים", url: 'setting' },
  { name: 'התנתקות', url: 'logOut' }
];
const settingsUnConnected = [{ name: 'התחברות', url: 'signIn' }];

const Nav = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState(loggedUser ? settingsConnected : settingsUnConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser == null) {
      setSettings(settingsUnConnected);
    }
  }, [loggedUser]);

  const navigate = useNavigate();

  const handleNavigate = (setting) => {
    let permission = ["lessons", "createContact", "homePage", "signUp", "signIn"];
    if (loggedUser == null && !permission.includes(setting.url)) {
      navigate('notFound');
    } else {
      if (setting.url === "logOut") {
        const confirmed = window.confirm("האם את/ה בטוח/ה שברצונך להתנתק?");
        if (confirmed) {
          dispatch(setUnLoggedUser(null));
          
          navigate('/');
        }
      } else {
        navigate(setting.url);
      }
    }
  }

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

  const userPages = loggedUser ? [
    ...pages,
    { name: 'אזור אישי', url: 'privateArea' },
    { name: 'קהילת חברותא', url: 'privateArea/myChavrutaStatus' },
    { name: 'יומן', url: 'myCalendar' },
    ...(loggedUser.levelId === 2 ? [{ name: 'ניהול', url: 'management' }] : [])
  ] : [...pages, signUpPage];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'gold', width: '100%', top: 0, left: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <img src={logo} alt="logo" style={{ height: '50px' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/homePage"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              
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
                {userPages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link to={page.url}>{page.name}</Link></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {userPages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(page.url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle style={{ color: 'white', fontSize: 40 }} />
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
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={() => handleNavigate(setting)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 9, textAlign: 'left' }}>
        {loggedUser && (
          <Typography variant="subtitle1" component="h1" gutterBottom>
            שלום {loggedUser.name} 😊
          </Typography>
        )}
        <Outlet />
      </Container>
    </>
  );
}

export default Nav;
