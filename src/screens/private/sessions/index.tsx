import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SessionsList from "./SessionList";
import SessionDetail from "./detail";

const Stack = createStackNavigator();

const Sessions = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={SessionsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalle"
        component={SessionDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default Sessions;
