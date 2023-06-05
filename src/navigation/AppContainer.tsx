import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector } from "hooks/useRedux";

import PublicTabs from "routes/PublicTabs";
import NoVerifiedTabs from "routes/NoVerifiedTabs";
import NoSubscribedTabs from "routes/NoSubscribedTabs";
import SubscribedTabs from "routes/SubscribedTabs";

const AppContainer = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {}, [currentUser]);

  const UserTabs = () => {
    if (!currentUser) return <PublicTabs />;

    if (!currentUser.verified) return <NoVerifiedTabs />;

    if (
      !currentUser.subscriptions ||
      currentUser.subscriptions.length === 0 ||
      (currentUser.subscriptions.length > 0 &&
        currentUser.subscriptions.find((item) => !item.status))
    ) {
      return <NoSubscribedTabs />;
    }

    return <SubscribedTabs />;
  };

  return (
    <NavigationContainer>
      <UserTabs />
    </NavigationContainer>
  );
};

export default AppContainer;
