import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "@/navigation/navigation";

export default function App() {
  const isLoaded = useCachedResources();
  const theme = useColorScheme();

  if (isLoaded) {
    return (
      <SafeAreaProvider>
        {/* <HomeScreen /> */}
        {/* <PlannerScreen /> */}
        <Navigation colorScheme={theme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
      // <View>
      //   <HomeScreen />
      //   <PlannerScreen /
      //   <StatusBar style="auto" />
      // </Vi>
    );
  } else {
    return null;
  }
}
