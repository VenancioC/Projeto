import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "next/link";
import Image from "next/image";
import CreateIcon from "@material-ui/icons/Create";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import jwt from "jsonwebtoken";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  ClearLink: {
    "&:a": {
      textdecoration: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  buttonsAuth: {
    marginLeft: "15px", 
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorCreate, setanchorCreate] = React.useState(null);

  const token = Cookies.get("token");

  let data = jwt.decode(token);

  const isMenuOpen = Boolean(anchorEl);
  const isCreateOpen = Boolean(anchorCreate);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCreateMenuOpen = (event) => {
    setanchorCreate(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setanchorCreate(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className={classes.ClearLink}>
        <Link href="./profile">Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.ClearLink}>
        Signout
      </MenuItem>
    </Menu>
  );

  const CreateId = "primary-search-Create-menu";
  const CreateMenu = (
    <Menu
      anchorEl={anchorCreate}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={CreateId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCreateOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className={classes.ClearLink}>
        <Link href="./PagesForm">Create Page</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.ClearLink}>
        <Link href="./PublicationForm">Create Post</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <Image
              src="/icon.png"
              alt="Picture of the author"
              width={67}
              height={48}
            />
          </a>
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
          {data && (
            <IconButton
              aria-label="create"
              aria-controls={CreateId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleCreateMenuOpen}
            >
              <CreateIcon />
            </IconButton>
          )}
          <div className={classes.grow} />
          {data ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography>{data.Username}</Typography>
              <ArrowDropDownIcon />
            </IconButton>
          ) : (
            <div>
              <Button variant="contained" color="default" href="/auth/signin" className={ classes.buttonsAuth }>
                Sign in
              </Button>
              <Button variant="contained" color="default" href="/auth/signup" className={ classes.buttonsAuth }>
                Sign up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {CreateMenu}
    </div>
  );
};

export default Navbar;
