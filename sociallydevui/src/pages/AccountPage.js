import React, { useState } from "react";
import { Link as RouterLink } from "@reach/router";

import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoaderButton from "../components/LoaderButton";
import { updateUserCredentials } from "../utils/api";
import { useProfile } from "../utils/profileContext";

let useStyles = makeStyles({
  form: {
    paddingTop: "1rem",
    height: "100%",
  },
  para: {
    marginTop: "20px",
    marginBotton: "10px",
  },
  btn: {
    marginLeft: "5px",
  },
  container: {
    height: "100vh",
  },
});

function AccountPage() {
  let classes = useStyles();
  let { profile } = useProfile();

  let [form, setForm] = useState({ email: profile.user.email, password: "" });
  let [password, setPassword] = useState({ password: "", checkPassword: "" });
  let [load, setLoad] = useState(false);

  let isValidPassword = (password) => {
    let temp = "".concat(...password.trim().split(" "));

    if (temp.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  let onChangePassword = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPassword({ ...password, [name]: value });
  };

  let onClickLoad = () => {
    setLoad(true);

    if (password.password === "") {
      updateUserCredentials({
        email: form.email,
      })
        .then(() => {
          setLoad(false);
        })
        .catch(() => {
          setLoad(false);
        });
    } else {
      if (password.password === password.checkPassword) {
        if (isValidPassword(form.password)) {
          updateUserCredentials({
            email: form.email,
            password: password.password,
          })
            .then(() => {
              setLoad(false);
            })
            .catch(() => {
              setLoad(false);
            });
        } else {
          setLoad(false);
          alert("password is not same");
        }
      } else {
        setLoad(false);
        alert("Please check the password");
      }
    }
  };

  let onClickDeleteAccount = () => {};

  let onChangeText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Account Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={form.email}
              onChange={onChangeText}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.para}>
              Change Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Password"
              name="password"
              value={password.password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm New Password"
              name="checkPassword"
              value={password.checkPassword}
              onChange={onChangePassword}
            />
          </Grid>

          <Grid item xs={12}>
            <LoaderButton
              load={load}
              onClick={onClickLoad}
              color="primary"
              variant="contained"
              label="Save"
            />

            <Button
              className={classes.btn}
              color="primary"
              variant="contained"
              component={RouterLink}
              to="/"
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" className={classes.para}>
              Delete your account permanently with all your posts and activity
            </Typography>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={onClickDeleteAccount}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AccountPage;
