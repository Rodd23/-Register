import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Box from '@mui/material/Box';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from "react-router-dom";
import React from "react";
import { logout } from "../../services/auth";
import { useSession } from "../../providers/userSession";

const drawerWidth = 240;

function DrawerTemplate (props) {
  const { user } = useSession();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <NavLink
              to="/dashboard"
              style={{
                fontSize: "1.3rem",
                textDecoration: "none",
                color: "#333",
              }}
          >
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </ListItem>
          </NavLink>
          
          {user.admin === 1 ? (
            <NavLink
              to="/users"
              style={{
                fontSize: "1.3rem",
                textDecoration: "none",
                color: "#333",
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários"/>
              </ListItem>
            </NavLink>
          ) : (
            ""
          )}
        </List>
        <Divider />
        <List>
          <NavLink
            to="/"
            onClick={logout}
            style={{
              fontSize: "1.3rem",
              textDecoration: "none",
              color: "#333",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair"/>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar/>
        {props.children}
      </Box>
    </Box>
  );
}

export default DrawerTemplate;
