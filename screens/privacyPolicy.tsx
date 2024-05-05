import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext, Theme } from "@/themes/ThemeContext";
export default function PrivacyPolicyScreen({
  navigation,
}: {
  navigation: any;
}) {
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
        Privacy and Policy
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
          **Privacy and Policy Statement for Fit Quest**{"\n\n"} At Fit Quest,
          we prioritize the privacy and security of our users' personal
          information. This Privacy and Policy Statement outlines how we
          collect, use, and protect your data when you use our health and
          fitness application.{"\n\n"} 1. **Information We Collect:**
          {"\n\t\t\t"}- Personal Information: When you sign up for Fit Quest, we
          collect basic personal information such as your name, email address,
          age, gender, and fitness goals. {"\n\t\t\t"}- Health Data: To provide
          personalized fitness recommendations, we may collect information about
          your health, including height, weight, exercise habits, and any health
          conditions you choose to disclose. {"\n\t\t\t"}- Usage Data: We gather
          data about your interactions with the app, including the exercises you
          perform, the duration o f your workouts, and the features you use.{" "}
          {"\n\n"}2. **How We Use Your Information:** {"\n\t\t\t"}-
          Personalization: We use the data we collect to personalize your
          fitness experience, providing tailored workout plans, nutrition
          advice, and goal tracking. {"\n\t\t\t"}- Communication: We may use
          your contact information to send you updates about Fit Quest,
          including new features, promotions, and fitness tips.
          {"\n\t\t\t"}- Research and Development: Aggregated and anonymized data
          may be used for research and development purposes to improve the
          effectiveness of our app. {"\n\n"}3. **Data Security:** {"\n\t\t\t"}-
          We employ industry-standard security measures to safeguard your
          personal information from unauthorized access, alteration, disclosure,
          or destruction. {"\n\t\t\t"}- Your data is stored securely on servers
          with restricted access, and all communications with our servers are
          encrypted to protect your privacy. {"\n\n"}4. **Data Sharing:**{" "}
          {"\n\t\t\t"}- We do not sell, rent, or share your personal information
          with third parties for marketing purposes. {"\n\t\t\t"}- However, we
          may share anonymized and aggregated data for research, analysis, or
          marketing purposes. {"\n\n"}5. **Your Choices:** {"\n\t\t\t"}- You
          have the right to review and update your personal information at any
          time through the Fit Quest app. {"\n\t\t\t"}- You can opt-out of
          receiving promotional communications from us by adjusting your
          notification preferences in the app settings. {"\n\n"}6. **Children's
          Privacy:** {"\n\t\t\t"}- Fit Quest is not intended for use by
          individuals under the age of 18. We do not knowingly collect personal
          information from children. {"\n\n"}7. **Changes to Privacy Policy:**{" "}
          {"\n\t\t\t"}- We reserve the right to update this Privacy and Policy
          Statement periodically. Any changes will be communicated to you
          through the app or via email. By using Fit Quest, you consent to the
          collection and use of your information as described in this Privacy
          and Policy Statement. If you have any questions or concerns about our
          privacy practices, please contact us at [contact email]. {"\n\n"}Last
          Updated: 03/02/2024 {"\n\n"}[Niña Rose Belandres / Thesis] {"\n"}[Fit
          Quest]
        </Text>
      </ScrollView>
    </View>
  );
}
