import React from "react";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useCachedResources } from "hooks";

import { store } from "store";

import { StatusBar } from "expo-status-bar";

import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as darkTheme } from "constants/theme/dark.json";
import { default as customTheme } from "constants/theme/appTheme.json";
import { default as customMapping } from "constants/theme/mapping.json";

import AppContainer from "navigation/AppContainer";

import AssetsIconsPack from "assets/AssetsIconsPack";

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
                <FlashMessage position="top" />
              </SafeAreaProvider>
            </ApplicationProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    );
  };

  return <AppContent></AppContent>;
}
