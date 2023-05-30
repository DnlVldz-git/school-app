import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import getIcon from "utils/constants";
import { Icon, useTheme } from "@ui-kitten/components";

import Register from "screens/public/register";
import Login from "screens/public/login";

const Tab = createBottomTabNavigator();

const PublicTabs = () => {
  const themes = useTheme();

  return (
    <View
      style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}
    >
      <Tab.Navigator
        initialRouteName={"Login"}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                pack="assets"
                name={getIcon(route.name.toLocaleLowerCase())}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: !focused
                    ? themes["text-platinum-color"]
                    : themes["text-secondary-color"],
                }}
              />
            );
          },
          tabBarActiveTintColor: "",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Registro" component={Register} />
      </Tab.Navigator>
    </View>
  );
};

export default PublicTabs;
