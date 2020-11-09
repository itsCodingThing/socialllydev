import React, { useState, Suspense, lazy } from "react";
import clsx from "clsx";

import {
  Grid,
  Container,
  CircularProgress,
  Button,
  Hidden,
} from "@material-ui/core";
import { styled, withStyles, makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "@reach/router";

import NavBar from "../components/NavBar";
import ComponsePost from "../components/ComposePost";
import PlaceholderCard from "../components/PlaceholderCard";
import Posts from "../components/Posts";

import { useAuth } from "../utils/authContext";
import { createNewPost } from "../utils/api";

let PostCard = lazy(() => import("../components/PostCard"));
let TrendingList = lazy(() => import("../components/TrendingList"));

let HomeView = styled("div")({
  height: "100%",
});

let Progress = withStyles({
  loader: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})(({ classes }) => {
  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
});

let useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    paddingTop: "1rem",
  },
  gridItem: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  componse: {
    width: "100%",
    marginBottom: "1rem",
  },
  authBtn: {
    marginBottom: "0.5rem",
  },
  postSection: {
    height: "90vh",
    overflowY: "scroll",
  },
});

function MainPage() {
  let classes = useStyles();
  let { auth } = useAuth();
  let [refreash, setRefreash] = useState(false);

  let onSubmit = (text, src) => {
    setRefreash(true);
    createNewPost({ description: text, image: src })
      .then(() => {
        setRefreash(false);
      })
      .catch(() => {
        setRefreash(false);
      });
  };

  return (
    <HomeView>
      <NavBar />
      <Container maxWidth="xl">
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridItem} xs={12} sm={3}>
            <div className={classes.componse}>
              {auth.authorized ? (
                <ComponsePost onSubmit={onSubmit} />
              ) : (
                <div className={classes.container}>
                  <Button
                    className={classes.authBtn}
                    color="primary"
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    className={classes.authBtn}
                    color="primary"
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/register"
                  >
                    Signup
                  </Button>
                </div>
              )}
            </div>
          </Grid>
          <Grid
            item
            className={clsx(classes.gridItem, classes.postSection)}
            xs={12}
            sm={6}
          >
            {!refreash && (
              <Posts>
                {({ data, isLoading, error }) => {
                  if (isLoading) {
                    return <Progress />;
                  }

                  if (!isLoading && error) {
                    return <h3>Oops !!</h3>;
                  }

                  return data.map((post) => (
                    <Suspense key={post._id} fallback={<PlaceholderCard />}>
                      <PostCard key={post._id} post={post} showComments />
                    </Suspense>
                  ));
                }}
              </Posts>
            )}
          </Grid>

          <Hidden xsDown>
            <Grid item className={classes.gridItem} xs={12} sm={3}>
              <Suspense fallback={<Progress />}>
                <TrendingList />
              </Suspense>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </HomeView>
  );
}
export default MainPage;
