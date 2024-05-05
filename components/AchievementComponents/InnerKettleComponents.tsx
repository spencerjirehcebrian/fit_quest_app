import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import kettle from "@/assets/AchievementAssets/Kettle/kettle.png";
import splat from "@/assets/AchievementAssets/Kettle/splat.png";
import star from "@/assets/AchievementAssets/Kettle/star.png";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

interface MyComponentProps {
  count: number;
  component: React.ReactNode;
  radius: number;
}

const MyComponent: React.FC<MyComponentProps> = ({
  count,
  component,
  radius,
}) => {
  const { theme } = useContext(ThemeContext);
  const elements = Array.from({ length: count }, (_, i) => i);
  const randomPositions = elements.map(() => {
    const angle = Math.random() * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  });

  return (
    <View style={styles(theme).container}>
      {randomPositions.map(({ x, y }, index) => (
        <View
          key={index}
          style={[styles(theme).element, { left: x + radius, top: y + radius }]}
        >
          {component}
        </View>
      ))}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    element: {
      position: "absolute",
    },
  });

export default MyComponent;
