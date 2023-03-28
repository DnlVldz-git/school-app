import * as React from "react";
import {
  StyleService,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "./Profile";
import Suscription from "./Suscription";

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
    </Stack.Navigator>
  );
});

export default Perfil;
