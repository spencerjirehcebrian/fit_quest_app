import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "@/navigation/navigation";

import * as Notifications from "expo-notifications";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Pedometer } from "expo-sensors";
import useStepCounter from "@/helpers/stepCounter";

Notifications.requestPermissionsAsync().then((statusObj) => {
  if (statusObj.status !== "granted") {
    return;
  }
});
Pedometer.requestPermissionsAsync().then((statusObj) => {
  if (statusObj.status !== "granted") {
    return;
  }
});
export default function App() {
  const isLoaded = useCachedResources();

  if (isLoaded) {
    return (
      <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  } else {
    return null;
  }
}
