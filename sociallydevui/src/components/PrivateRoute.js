import React from "react";
import { useAuth } from "../utils/authContext";
import { Redirect } from "@reach/router";

export default function PrivateRoute({ component: Component }) {
  let { auth } = useAuth();

  if (!auth.authorized) {
    return <Redirect to="/error" noThrow />;
  }
  return <Component />;
}
