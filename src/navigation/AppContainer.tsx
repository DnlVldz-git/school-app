import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector } from "hooks/useRedux";

import PublicTabs from "routes/PublicTabs";
import VerifiedTabs from "routes/VerifiedTabs";
import NoVerifiedTabs from "routes/NoVerifiedTabs";

export const AuthContext = React.createContext<any | null>({});

const AppContainer = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {}, [currentUser]);

  const isLoggedIn = () => {
    return currentUser.id && currentUser.id !== "";
  };

  const isVerified = () => {
    return currentUser.id && currentUser.verified;
  };

  return (
    <NavigationContainer>
      {isLoggedIn() ? (
        isVerified() ? (
          <VerifiedTabs />
        ) : (
          <NoVerifiedTabs />
        )
      ) : (
        <PublicTabs />
      )}
    </NavigationContainer>
  );
};

export default AppContainer;
