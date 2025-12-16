import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Home as HomeIcon, 
  AccountCircle as ProfileIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  House as HouseIcon,
  Business as BusinessIcon,
  Villa as VillaIcon,
  Person as PersonIcon,
  QuestionAnswer as InquiryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    setIsAuthenticated(!!userId);
  }, []);

  // Mobile Drawer Toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Profile Menu Handlers
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  // Authentication Handlers
  const handleLogin = () => {
    handleProfileMenuClose();
    window.location.href = '/login';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('id');
    setIsAuthenticated(false);
    handleProfileMenuClose();
    window.location.href = '/';
  };

  const handleProfile = () => {
    handleProfileMenuClose();
    window.location.href = '/profile';
  };

  const handleInquiry = () => {
    handleProfileMenuClose();
    window.location.href = '/inquiry';
  };

  // Navigation Links
  const navLinks = [
    { 
      label: 'Home', 
      icon: <HomeIcon />, 
      href: '/home' 
    },
    { 
      label: 'Flats', 
      icon: <HouseIcon />, 
      href: '/listproperty' 
    },
    { 
      label: 'Shops', 
      icon: <BusinessIcon />, 
      href: '/shopproperty' 
    },
    { 
      label: 'Bunglows', 
      icon: <VillaIcon />, 
      href: '/bunglowproperty' 
    }
  ];

  // Mobile Drawer Content
  const drawerContent = (
    <Box 
      sx={{ 
        width: 250, 
        height: '100%', 
        bgcolor: 'background.paper' 
      }}
      role="presentation"
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Typography variant="h6">RealNest</Typography>
        <IconButton 
          color="inherit" 
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem 
            key={link.label} 
            button 
            onClick={() => {
              window.location.href = link.href;
              handleDrawerToggle();
            }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}

        {/* Profile Section in Mobile */}
        {isAuthenticated && (
          <>
            <ListItem button onClick={handleProfile}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleInquiry}>
              <ListItemIcon><InquiryIcon /></ListItemIcon>
              <ListItemText primary="My Inquiry" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
        
        {!isAuthenticated && (
          <ListItem button onClick={handleLogin}>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: { xs: 1, md: 0 }, 
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            RealNest
          </Typography>

          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            gap: 2
          }}>
            {navLinks.map((link) => (
              <Button 
                key={link.label} 
                startIcon={link.icon}
                onClick={() => window.location.href = link.href}
                color="inherit"
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Box>
            <Button 
              startIcon={<ProfileIcon />}
              onClick={handleProfileMenuOpen}
              color="primary"
              variant="contained"
            >
              {isAuthenticated ? 'Account' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {isAuthenticated ? (
          [
            <MenuItem key="profile" onClick={handleProfile}>
              <PersonIcon sx={{ mr: 2 }} />
              <Typography>My Profile</Typography>
            </MenuItem>,
            <MenuItem key="inquiry" onClick={handleInquiry}>
              <InquiryIcon sx={{ mr: 2 }} />
              <Typography>My Inquiry</Typography>
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 2 }} />
              <Typography>Logout</Typography>
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleLogin}>
            <LoginIcon sx={{ mr: 2 }} />
            <Typography>Login</Typography>
          </MenuItem>
        )}
      </Menu>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250 
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;