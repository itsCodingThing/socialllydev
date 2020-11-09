import React, { useState } from "react";

import { Link as RouterLink } from "@reach/router";
import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { saveToken, saveProfile } from "../utils/localStorage";
import { useAuth } from "../utils/authContext";
import { loginUser, fetchUserProfile } from "../utils/api";

import backImg from "../../public/assets/images/background.jpeg";
import { useProfile } from "../utils/profileContext";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${backImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

export default function LoginPage({ navigate }) {
  let classes = useStyles();
  let [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  let [disable, setDisable] = useState(false);
  let { setAuth } = useAuth();

  let { setProfile } = useProfile();

  let onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormField({ ...formField, [name]: value });
  };

  let onSubmit = (e) => {
    e.preventDefault();

    if (formField.email && formField.password) {
      setDisable(true);
      loginUser({ email: formField.email, password: formField.password })
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
        .catch((err) => {
          console.error(err);
          setDisable(false);
          alert(
            "There must be some kind of error please refreash the page and try again or check your credentials"
          );
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="off"
              label="Email Address"
              name="email"
              value={formField.email}
              onChange={onChange}
              disabled={disable}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="off"
              name="password"
              label="Password"
              type="password"
              value={formField.password}
              onChange={onChange}
              disabled={disable}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className={classes.progressBtn}>
              {disable && (
                <CircularProgress
                  className={classes.circularProgress}
                  size={20}
                />
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
                Sign In
              </Button>
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
