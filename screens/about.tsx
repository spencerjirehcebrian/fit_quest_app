import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext, Theme } from "@/themes/ThemeContext";
export default function AboutScreen({ navigation }: { navigation: any }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: 30,
          left: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="purple" />

          <Text
            style={{
              fontSize: 16,
              fontFamily: theme.fonts.medium,
              color: theme.colors.text,
              marginLeft: 10,
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 50,
          fontSize: 16,
          fontFamily: theme.fonts.bold,
          color: theme.colors.dark_purple,
          marginLeft: 10,
          textAlign: "center",
          backgroundColor: theme.colors.pink,
          borderRadius: 10,
          padding: 10,
        }}
      >
        About Fit Quest
      </Text>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          marginVertical: 10,
          width: "100%",
        }}
      />

      <ScrollView>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 14,
            marginVertical: 20,
          }}
        >
          **About Fit Quest** {"\n\n"}Fit Quest is your ultimate companion on
          your journey to a healthier and fitter lifestyle. We believe that
          everyone deserves access to personalized fitness guidance and support,
          and that's why we've developed an innovative health and fitness
          application designed to empower you to reach your wellness goals.
          {"\n\n"}1. **Mission Statement:** {"\n\t\t\t"}- Our mission at Fit
          Quest is to inspire and empower individuals to lead healthier lives by
          providing them with the tools, knowledge, and motivation they need to
          achieve their fitness goals. {"\n\n"}2. **What We Offer:**{" "}
          {"\n\t\t\t"}- Personalized Workouts: Fit Quest offers a wide range of
          customized workout plans tailored to your fitness level, preferences,
          and goals. {"\n\t\t\t"}- Nutrition Guidance: We provide personalized
          nutrition advice and meal plans to help you fuel your body for optimal
          performance and results. {"\n\t\t\t"}- Goal Tracking: Set and track
          your fitness goals with ease using our intuitive goal tracking
          features, helping you stay motivated and accountable. {"\n\t\t\t"}-
          Community Support: Join a supportive community of like-minded
          individuals who are on a similar fitness journey, where you can share
          experiences, tips, and encouragement. {"\n\t\t\t"}- Expert Advice:
          Access expert guidance from certified fitness trainers, nutritionists,
          and health professionals to help you make informed decisions about
          your health and wellness. {"\n\n"}3. **Our Values:** - Empowerment: We
          believe in empowering individuals to take control of their health and
          fitness journey. {"\n\t\t\t"}- Inclusivity: Fit Quest is for everyone,
          regardless of age, gender, fitness level, or background. {"\n\t\t\t"}-
          Integrity: We are committed to maintaining the highest standards of
          integrity, transparency, and privacy in everything we do. {"\n\t\t\t"}
          - Innovation: We continuously strive to innovate and improve our app
          to better serve our users and meet their evolving needs. {"\n\n"}4.
          **Join the Fit Quest Community:** {"\n\t\t\t"}- Download Fit Quest
          today and embark on a transformative journey towards a healthier,
          happier you. Whether you're a fitness enthusiast or just getting
          started on your wellness journey, Fit Quest is here to support you
          every step of the way.
          {"\n\n"}At Fit Quest, we're more than just a fitness app—we're your
          partner in health and wellness.
          {"\n\n"}[Niña Rose Belandres / Thesis] {"\n"}[Fit Quest]
        </Text>
      </ScrollView>
    </View>
  );
}
