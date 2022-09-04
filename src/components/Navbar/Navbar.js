import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import memoryLogo from "../../images/memorylogo.png";
import memoryText from "../../images/memeorytext.png";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("profile")));
      if (localStorage.getItem("fromGoogle") === "false") {
        const token = user?.token;
        console.log("user toekn is ");
        console.log(token);
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          console.log("token expires");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [location]);
  const logout = () => {
    console.log("loggin out");
    dispatch({ type: "LOGOUT" });
    navigate({ pathname: "/" });
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoryText} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
