import React, { useState } from 'react';
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
  List as ListIcon, 
  AddCircle as AddCircleIcon, 
  AccountCircle as ProfileIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  House as HouseIcon,
  Business as BusinessIcon,
  LandscapeOutlined as LandscapeIcon
} from '@mui/icons-material';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Property Type Dropdown
  const handlePropertiesMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePropertiesMenuClose = () => {
    setAnchorEl(null);
  };

  // Mobile Drawer Toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Authentication Handlers
  const handleLogin = () => {
    window.location.href = '/login'; // Redirect to login page
  };

  const handleLogout = () => {
    // Clear authentication data (you can also add localStorage or sessionStorage logic)
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirect to home page
  };

  // Property Type Menu Items
  const propertyTypes = [
    { 
      icon: <HouseIcon />, 
      label: 'Flats', 
      href: '/listproperty' 
    },
    { 
      icon: <BusinessIcon />, 
      label: 'Shops', 
      href: '/shopproperty' 
    },
    { 
      icon: <LandscapeIcon />, 
      label: 'Plots', 
    href: '/plotproperty' 
    }
  ];

  // Navigation Links
  const navLinks = [
    { 
      label: 'Home', 
      icon: <HomeIcon />, 
      href: '/' 
    },
    { 
      label: 'Properties', 
      icon: <ListIcon />, 
      action: handlePropertiesMenuOpen 
    },
    { 
      label: 'Sell Property', 
      icon: <AddCircleIcon />, 
      href: '/addproperty' 
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
        <Typography variant="h6">PropEase</Typography>
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
            onClick={link.href ? () => window.location.href = link.href : link.action}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        
        {/* Property Types in Mobile Menu */}
        <ListItem>
          <ListItemText primary="Property Types" />
        </ListItem>
        {propertyTypes.map((property) => (
          <ListItem 
            key={property.label} 
            button 
            onClick={() => window.location.href = property.href}
          >
            <ListItemIcon>{property.icon}</ListItemIcon>
            <ListItemText primary={property.label} />
          </ListItem>
        ))}

        {/* Authentication */}
        {isAuthenticated ? (
          <>
            <ListItem button onClick={() => window.location.href = '/profile'}>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={handleLogin}>
            <ListItemIcon><ProfileIcon /></ListItemIcon>
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
          {/* Mobile Menu Toggle */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
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

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            gap: 2
          }}>
            {navLinks.map((link) => (
              link.href ? (
                <Button 
                  key={link.label} 
                  startIcon={link.icon}
                  onClick={() => window.location.href = link.href}
                  color="inherit"
                >
                  {link.label}
                </Button>
              ) : (
                <Button 
                  key={link.label} 
                  startIcon={link.icon}
                  onClick={link.action}
                  color="inherit"
                >
                  {link.label}
                </Button>
              )
            ))}
          </Box>

          {/* Authentication & Profile */}
          <Box>
            {isAuthenticated ? (
              <Button 
                startIcon={<ProfileIcon />}
                onClick={handleLogout}
                color="primary"
                variant="contained"
              >
                Logout
              </Button>
            ) : (
              <Button 
                startIcon={<ProfileIcon />}
                onClick={handleLogin}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Properties Type Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePropertiesMenuClose}
      >
        {propertyTypes.map((property) => (
          <MenuItem 
            key={property.label}
            onClick={() => {
              window.location.href = property.href;
              handlePropertiesMenuClose();
            }}
          >
            {property.icon}
            <Typography sx={{ ml: 2 }}>{property.label}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Drawer */}
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
