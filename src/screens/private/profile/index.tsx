import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "./Profile";
import Suscription from "./Subscription";
import Policy from "./Policy";
import NoSuscription from "./NoSubscription";

const Stack = createStackNavigator();

const Perfil = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Suscription"
        component={Suscription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoSuscription"
        component={NoSuscription}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default Perfil;
