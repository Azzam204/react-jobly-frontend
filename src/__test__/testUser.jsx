import React from "react";
import UserContext from "../userContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

const UserProvider =
  ({ children, currUser = demoUser, isApplied = () => false }) => (
    <UserContext.Provider value={{ currUser, isApplied }}>
      {children}
    </UserContext.Provider>
  );

export { UserProvider }