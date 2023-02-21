import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "AlbertSans-Regular": require("../assets/fonts/AlbertSans-Regular.ttf"),
          "AlbertSans-Medium": require("../assets/fonts/AlbertSans-Medium.ttf"),
          "AlbertSans-Bold": require("../assets/fonts/AlbertSans-Bold.ttf"),
          "AlbertSans-SemiBold": require("../assets/fonts/AlbertSans-SemiBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
