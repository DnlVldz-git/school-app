import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector } from "hooks/useRedux";

import VerifiedTabs from "routes/VerifiedTabs";
import NoVerifiedTabs from "routes/NoVerifiedTabs";
import PublicTabs from "routes/PublicTabs";

export const AuthContext = React.createContext<any | null>({});

const AppContainer = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {}, [currentUser]);

  return (
    <NavigationContainer>
      {currentUser ? (
        currentUser.verified ? (
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
