import * as React from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, useTheme } from "@ui-kitten/components";

import { RootStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "screens/SplashScreen";
import { AsyncStorage } from "react-native";
import { navigationRef } from "./RootNavigation";
import Finance06 from "screens/Finance/Finance06";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Finance05 from "screens/Finance/Finance05";
import Finance07 from "screens/Finance/Finance07";
import getIcon from "utils/constants";
import Authenticate from "screens/public/login/Authenticate";
import * as SecureStore from "expo-secure-store";
import Finance08 from "screens/Finance/Finance08";
import Finance00 from "screens/Finance/Finance00";
import SignUp01 from "screens/public/signup/SignUp01";

enableScreens();
const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext<any | null>({});

const AppContainer = () => {
  const themes = useTheme();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  async function save(key: any, value: any) {
    await SecureStore.setItemAsync(key, value);
  }

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: any; token: any; userFound: any }) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          //console.log(action.userFound)
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            usuario: action.userFound,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            usuario: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      usuario: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (tokenFound: any, userFound: any) => {
        save("auth-token", tokenFound);
        //console.log(JSON.stringify(tokenFound))
        save("user", JSON.stringify(userFound));
        console.log(tokenFound);
        //console.log(JSON.stringify(userFound))
        dispatch({ type: "SIGN_IN", token: tokenFound, userFound: userFound });
      },
      signOut: () =>
        dispatch({
          type: "SIGN_OUT",
          token: undefined,
          userFound: undefined,
        }),
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({
          type: "SIGN_IN",
          token: "dummy-auth-token",
          userFound: undefined,
        });
      },
      usu: state.userFound,
    }),
    []
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}>
        <AuthContext.Provider value={authContext}>
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
            {state.userToken === null ? (
              <>
                <Tab.Screen name="Login" component={Authenticate} />
                <Tab.Screen name="Registro" component={SignUp01} />
              </>
            ) : (
              <>
                <Tab.Screen
                  name="Calendario"
                  children={() => <Finance00 screen={"Videosesión"} />}
                />
                <Tab.Screen
                  name="Mis clases"
                  children={() => <Finance08 screen={"Lista de clases"} />}
                />
                <Tab.Screen name="Mi Perfil" 
                  children={() => <Finance07 screen={"Perfil"} />} />
              </>
            )}

          </Tab.Navigator>
          
        </AuthContext.Provider>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
