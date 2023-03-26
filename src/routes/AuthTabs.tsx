import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import getIcon from "utils/constants";
import { Icon, useTheme } from "@ui-kitten/components";

import Finance00 from "screens/Finance/Finance00";

const Tab = createBottomTabNavigator();

const AuthTabs = () => {
  const themes = useTheme();

  return (
    <View
      style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}
    >
      <Tab.Navigator
        initialRouteName={"Finance01"}
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
        <Tab.Screen
          name="Calendario"
          children={() => <Finance00 screen={"Videosesión"} />}
        />
        <Tab.Screen
          name="Mis clases"
          children={() => <Finance00 screen={"Material de clase"} />}
        />
        <Tab.Screen
          name="Mi Perfil"
          children={() => <Finance00 screen={"Planes"} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AuthTabs;
