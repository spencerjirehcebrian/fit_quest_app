import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Svg, { Circle, Text, G, Path } from "react-native-svg";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function CircularBarComponent({
  percentage,
}: {
  percentage: number;
}) {
  const { theme } = useContext(ThemeContext);
  const radius = 120;
  const length = radius * 2 + 100;
  const circumference = 2 * Math.PI * radius; // assuming the radius of the circle is 50
  const dashOffset = circumference - (circumference * percentage) / 1000;

  return (
    <View style={styles(theme).container}>
      <Svg height={length} width={length} transform="rotate(135)">
        <Circle
          stroke={theme.colors.dark_purple}
          cx={length / 2}
          cy={length / 2}
          r={radius}
          strokeWidth="50"
          fill="none"
        />
        {/* <Circle
          stroke={theme.colors.purple}
          cx={length / 2}
          cy={length / 2}
          r={radius}
          strokeWidth="50"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset / 2}
          strokeLinecap="butt"
        />
        <Circle
          stroke={theme.colors.dark_purple}
          cx={length / 2}
          cy={length / 2}
          r={radius}
          strokeWidth="50"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="butt"
        /> */}
        <Circle
          stroke={theme.colors.purple}
          cx={length / 2}
          cy={length / 2}
          r={radius}
          strokeWidth="50"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="butt"
        />
        <Circle
          stroke={theme.colors.light_purple}
          cx={length / 2}
          cy={length / 2}
          r={radius}
          strokeWidth="50"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.5}
          strokeLinecap="butt"
        />
      </Svg>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.5,
    },
  });
