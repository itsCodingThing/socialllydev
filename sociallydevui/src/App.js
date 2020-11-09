import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";

import { CssBaseline, CircularProgress } from "@material-ui/core";
import { styled, withStyles } from "@material-ui/core/styles";

import MainPage from "./pages/MainPage";

let AccountPage = lazy(() => import("./pages/AccountPage"));
let RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
let ProfilePage = lazy(() => import("./pages/ProfilePage"));
let ErrorPage = lazy(() => import("./pages/ErrorPage"));
let LoginPage = lazy(() => import("./pages/LoginPage"));
let FindProfilePage = lazy(() => import("./pages/FindProfilePage"));

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./utils/authContext";
import { ProfileProvider } from "./utils/profileContext";

let FullPageLoader = withStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})(({ classes }) => (
  <div className={classes.container}>
    <CircularProgress />
  </div>
));

let AppContainer = styled("div")({
  height: "100vh",
  backgroundColor: "#f8f3eb",
});

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AppContainer>
          <CssBaseline />
          <Suspense fallback={<FullPageLoader />}>
            <Router>
              <MainPage path="/" />
              <FindProfilePage path="user/:username" />
              <PrivateRoute component={ProfilePage} path="profile" />
              <PrivateRoute component={AccountPage} path="account" />
              <RegistrationPage path="register" />
              <LoginPage path="login" />
              <ErrorPage default />
            </Router>
          </Suspense>
        </AppContainer>
      </ProfileProvider>
    </AuthProvider>
  );
}
