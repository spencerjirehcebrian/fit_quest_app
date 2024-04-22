import React, { useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import TodayScreen from "@/screens/today";
import MealScreen from "@/screens/meal";
import ExerciseScreen from "@/screens/exercise";
import AchievementsScreen from "@/screens/achievements";
import LandingScreen from "@/screens/landing";
import SequenceScreen from "@/screens/sequence";
import ExerciseOverviewScreen from "@/screens/exerciseOverview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ColorSchemeName, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getGlobalsLogged } from "@/helpers/globalsDataHelpers";
// import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      //  theme={colorScheme === "light" ? DefaultTheme : DarkTheme}
      theme={DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="ExerciseOverview"
        component={ExerciseOverviewScreen}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Sequence"
        component={SequenceScreen}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      {/* <Stack.Screen
         name="WorkoutDetail"
         component={WorkoutDetailScreen}
         // options={{ headerShown: false }}
         options={{ title: "Workout Information", animation: "simple_push" }}
       /> */}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Today"
      screenOptions={{
        tabBarStyle: { padding: 10, height: 85, paddingBottom: 25 },
      }}
    >
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-o" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="trophy" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
