import React, { useState, createRef } from "react";
import { Link as RouterLink, useNavigate } from "@reach/router";

import { makeStyles, styled, withStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Avatar,
  InputBase,
  Hidden,
} from "@material-ui/core";
import {
  AccountCircle,
  Notifications as NotificationIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";

import { useAuth } from "../utils/authContext";
import { useProfile } from "../utils/profileContext";
import { clearAllToken } from "../utils/localStorage";

let useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

let NavSearch = withStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))(({ classes }) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ "aria-label": "search" }}
    />
  </div>
));

let CustomLink = styled(RouterLink)({
  textDecoration: "none",
  color: "inherit",
  "&:active": {
    color: "inherit",
  },
});

function AuthAccount() {
  let { profile } = useProfile();
  let navigate = useNavigate();
  let classes = useStyles();

  let onClickAccountBtn = () => {
    navigate("/profile");
  };

  return (
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={onClickAccountBtn}
      color="inherit"
    >
      {profile ? (
        <Avatar className={classes.avatar} src={profile.avatar}>
          {profile.name[0]}
        </Avatar>
      ) : (
        <AccountCircle />
      )}
    </IconButton>
  );
}

function DashBoard() {
  let [showMenu, setShowMenu] = useState(false);
  let [anchorEl, setAnchorEl] = useState(null);
  let dashboard = createRef();
  let { setAuth } = useAuth();
  let { setProfile } = useProfile();

  let onClickDashboard = () => {
    setShowMenu(true);
    setAnchorEl(dashboard.current);
  };

  let toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let onClickLogout = () => {
    toggleMenu();
    clearAllToken();
    setAuth({ authorized: false });
    setProfile(null);
  };

  return (
    <>
      <IconButton
        ref={dashboard}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onClickDashboard}
        color="inherit"
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showMenu}
        onClose={toggleMenu}
      >
        <MenuItem onClick={toggleMenu}>
          <CustomLink to="/account">Settings and Privacy</CustomLink>
        </MenuItem>
        <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        <MenuItem onClick={toggleMenu}>
          <CustomLink to="/about">About Us</CustomLink>
        </MenuItem>
      </Menu>
    </>
  );
}

function Notification() {
  return (
    <IconButton color="inherit">
      <NotificationIcon />
    </IconButton>
  );
}

export default function NavBar() {
  let classes = useStyles();
  let {
    auth: { authorized },
  } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Sociallly</Typography>
        <Hidden smDown>
          <div className={classes.search}>
            <NavSearch />
          </div>
        </Hidden>
        {authorized ? (
          <div className={classes.icons}>
            <AuthAccount />
            <Notification />
            <DashBoard />
          </div>
        ) : (
          <Button
            component={RouterLink}
            to="/register"
            color="inherit"
            startIcon={<AddCircleIcon />}
          >
            Create Account
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
