import React, { createContext, useState, useContext } from "react";
import { getUserPayload } from "./localStorage";

let AuthStateContext = createContext();
let AuthDispatchContext = createContext();

let { auth: authState } = getUserPayload();

function AuthProvider({ children }) {
  let [auth, setAuth] = useState({
    authorized: authState,
  });

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={setAuth}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuth() {
  let auth = useContext(AuthStateContext);
  let setAuth = useContext(AuthDispatchContext);

  if (auth == undefined && setAuth == undefined) {
    throw new Error("useAuth must used within the AuthStateProvider");
  } else {
    return { auth, setAuth };
  }
}

export { AuthProvider, useAuth };

export default AuthProvider;
