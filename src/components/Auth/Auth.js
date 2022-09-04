import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { createOrGetUser } from "./utils";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const classes = useStyles();
  const state = null;
  const dispatch = useDispatch();
  const [isSignup, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword();
  };
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <GoogleOAuthProvider clientId="524862405201-8iv6oishrlgfmecjvj2snhoejn0o5qe8.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    autoFocus
                    handleChange={handleChange}
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <GoogleLogin
              className={classes.googleButton}
              onSuccess={(respnse) => {
                console.log(respnse);
                const decoded = createOrGetUser(respnse);
                dispatch({ type: "AUTH", data: decoded });
                navigate({ pathname: "/" });
              }}
              onError={() => {
                console.log("error");
              }}
              cooki
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an accound? Sign In"
                    : "Create An Account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};
export default Auth;
