import React, { useContext, useEffect } from "react";
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
import TodayTrackTab from "@/screens/todayTrackTabs";
import TestScreen from "@/screens/test";
import AboutScreen from "@/screens/about";
import PrivacyPolicy from "@/screens/privacyPolicy";
import SettingsScreen from "@/screens/settings";
import ProfileScreen from "@/screens/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ColorSchemeName, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import AchievementIcon from "@/assets/HeaderAssets/achievement.png";
import ExerciseIcon from "@/assets/HeaderAssets/exercise.png";
import MealIcon from "@/assets/HeaderAssets/meal.png";
import TodayIcon from "@/assets/HeaderAssets/today.png";

export default function Navigation({}: {}) {
  return (
    <NavigationContainer>
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
        name="TodayTrackTab"
        component={TodayTrackTab}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
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
  const { theme } = useContext(ThemeContext);
  return (
    <BottomTab.Navigator
      initialRouteName="Today"
      screenOptions={{
        tabBarStyle: {
          padding: 10,
          height: "10%",
          paddingBottom: 10,
          backgroundColor: theme.colors.secondary,
        },
      }}
    >
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={TodayIcon}
              style={{
                tintColor: focused ? theme.colors.white : "black",
                width: size,
                height: size,
              }}
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "bold", // Make the text bold
            fontFamily: theme.fonts.regular,
          },
          tabBarActiveTintColor: theme.colors.white, // Change the color of the focused tab text
          tabBarInactiveTintColor: theme.colors.white, // Change the color of the inactive tab text
        }}
      />
      <BottomTab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={MealIcon}
              style={{
                tintColor: focused ? theme.colors.white : "black",
                width: size,
                height: size + 3,
                resizeMode: "contain",
              }}
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "bold", // Make the text bold
            fontFamily: theme.fonts.regular,
          },
          tabBarActiveTintColor: theme.colors.white, // Change the color of the focused tab text
          tabBarInactiveTintColor: theme.colors.white, // Change the color of the inactive tab text
        }}
      />
      <BottomTab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={ExerciseIcon}
              style={{
                tintColor: focused ? theme.colors.white : "black",
                width: size + 13,
                height: size,
              }}
            />
          ),

          tabBarLabelStyle: {
            fontWeight: "bold", // Make the text bold
            fontFamily: theme.fonts.regular,
          },
          tabBarActiveTintColor: theme.colors.white, // Change the color of the focused tab text
          tabBarInactiveTintColor: theme.colors.white, // Change the color of the inactive tab text
        }}
      />
      <BottomTab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={AchievementIcon}
              style={{
                tintColor: focused ? theme.colors.white : "black",
                width: size + 3,
                height: size + 3,
              }}
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "bold", // Make the text bold
            fontFamily: theme.fonts.regular,
          },
          tabBarActiveTintColor: theme.colors.white, // Change the color of the focused tab text
          tabBarInactiveTintColor: theme.colors.white, // Change the color of the inactive tab text
        }}
      />
      {/* <BottomTab.Screen
        name="Test"
        component={TestScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="trophy" size={size} color={color} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}
