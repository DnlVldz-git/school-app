import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, StyleSheet } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as darkTheme } from "constants/theme/dark.json";
import { default as lightTheme } from "constants/theme/light.json";
import { default as customTheme } from "constants/theme/appTheme.json";
import { default as customMapping } from "constants/theme/mapping.json";
import { useCachedResources } from "hooks";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "navigation/AppContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AssetsIconsPack from "assets/AssetsIconsPack";
import { Provider } from "react-redux";
import { store } from "store";
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);
export default function App() {
  const isLoadingComplete = useCachedResources();

  const AppContent = () => {
    if (!isLoadingComplete) {
      return null;
    }

    return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <IconRegistry icons={[EvaIconsPack, AssetsIconsPack]} />
            <ApplicationProvider
              {...eva}
              theme={{ ...eva.dark, ...customTheme, ...darkTheme }}
              /* @ts-ignore */
              customMapping={customMapping}
            >
              <SafeAreaProvider>
                <StatusBar
                  style="dark"
                  translucent={true}
                  backgroundColor={"#00000000"}
                />
                <AppContainer />
              </SafeAreaProvider>
            </ApplicationProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    );
  };

  return <AppContent></AppContent>;
}
