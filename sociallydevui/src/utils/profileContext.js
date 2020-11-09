import React, { createContext, useState, useContext } from "react";
import { getUserPayload } from "./localStorage";

let ProfileContext = createContext();
let ProfileDispatchContext = createContext();

let { profile: profileState } = getUserPayload();

function ProfileProvider({ children }) {
  let [profile, setProfile] = useState(profileState);
  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={setProfile}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

function useProfile() {
  let profile = useContext(ProfileContext);
  let setProfile = useContext(ProfileDispatchContext);

  if (profile === undefined && setProfile === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return { profile, setProfile };
}

export { ProfileProvider, useProfile };
