import React, { useState } from "react";
import { Link as RouterLink } from "@reach/router";

import {
  Avatar,
  Button,
  TextField,
  Container,
  Grid,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { saveToken, saveProfile } from "../utils/localStorage";
import { useAuth } from "../utils/authContext";
import { registerNewUser, fetchUserProfile } from "../utils/api";
import { useProfile } from "../utils/profileContext";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  formContainer: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressBtn: {
    position: "relative",
  },
  circularProgress: {
    position: "absolute",
    top: "42%",
    left: "50%",
  },
}));

export default function RegistrationPage({ navigate }) {
  let classes = useStyles();
  let { setProfile } = useProfile();
  let [formField, setFormField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let [disable, setDisable] = useState(false);
  let { setAuth } = useAuth();

  let onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormField({ ...formField, [name]: value });
  };

  let onSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    let payload = {
      name: `${formField.firstName} ${formField.lastName}`,
      email: formField.email,
      password: formField.password,
    };

    if (payload.name && payload.password.length >= 8) {
      // creating a new user
      registerNewUser(payload)
        .then(({ token }) => {
          saveToken(token);
          return fetchUserProfile();
        })
        .then((profile) => {
          saveProfile(profile);
          setProfile(profile);
          setDisable(false);
          setAuth({ authorized: true });
          navigate("/");
        })
        .catch(() => {
          setDisable(false);
        });
    } else {
      alert("Please check fields and fill them correctly");
      setDisable(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.formContainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formField.firstName}
                onChange={onChange}
                disabled={disable}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formField.lastName}
                onChange={onChange}
                disabled={disable}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formField.email}
                onChange={onChange}
                disabled={disable}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                placeholder="minimum length 8 charactor"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formField.password}
                onChange={onChange}
                disabled={disable}
              />
            </Grid>
          </Grid>
          <div className={classes.progressBtn}>
            {disable ? (
              <CircularProgress
                className={classes.circularProgress}
                size={20}
              />
            ) : (
              ""
            )}
            <Button
              onClick={onSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disable}
            >
              Sign Up
            </Button>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://itsCodingThing.now.sh/">
            itsCondingThing
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
