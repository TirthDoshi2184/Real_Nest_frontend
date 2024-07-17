import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const UserSideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  var routerArray = [
    {
        id:1,
        name:"Dashboard",
        linkUrl:"dashboard",
        // logoImage:DashboardIcon
    },
    {
      id:2,
      name:"Login",
      linkUrl:"login",
      // logoImage:ProfileIcon
  },
    {
        id:3,
        name:"Profile",
        linkUrl:"profile",
        // logoImage:ProfileIcon
    },
    {
        id:4,
        name:"Settings",
        linkUrl:"settings",
        // logoImage:SettingsIcon
    },
    {
      id:5,
      name:"AddProperty",
      linkUrl:"addproperty",
    }
  ]
  var constant = {
    backgroundColor: "rgb(0, 82, 204)",
  }
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgb(238,242,246)",
        width: "100%",
        fontFamily: "Lato",
      }}
    >
      <Drawer
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        PaperProps={{
          sx: {
            position: "inherit",
            borderRight: 0,
            width: isExpanded ? drawerWidth : 0,
            height: "100%",
            minHeight: "635px",
            flexShrink: 0,
            overflowX: "hidden",
            border: "5px solid #F0F0F0",
            borderRadius: "10px",
            backgroundColor: "white",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        anchor="left"
      >
        <List>
          {routerArray.map((res, index) => (
            <ListItem
              key={res.name}
              disablePadding
              component={Link}
              to={res.linkUrl !== "null" ? res.linkUrl : "#"}
              onClick={() => isMobile && setIsExpanded(false)}
              sx={{
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "pink"
                },
                "&:hover .MuiListItemText-root": {
                  color: "white",
                },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: constant.backgroundColor }}>
                    {res?.logoImage && <res.logoImage />}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  sx={{ color: constant.backgroundColor, fontWeight: "bold" }}
                  primary={res.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ marginTop: "auto" }}>
          <Button
            variant="contained"
            sx={{
              color: "#whitesmoke",
              bgcolor: constant.backgroundColor,
              fontFamily: "Lato",
              "&:hover": {
                backgroundColor: constant.backgroundColor,
                color: "white",
              },
            }}
            // startIcon={<ExitToAppIcon />}
            onClick={handleOpenLogoutDialog}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ width: "100%", height: "100%", mt: 3, mr: 2 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
