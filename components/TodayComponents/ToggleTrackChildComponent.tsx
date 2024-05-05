import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

export default function ToggleTrackChildComponent({
  index,
  toggleState,
  onToggle,
  image,
  title,
}: {
  index: number;
  toggleState: any;
  onToggle: any;
  image?: any;
  title?: any;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => onToggle(index)}>
      <View
        style={[
          styles(theme).childContainer,
          { opacity: toggleState ? 1 : 0.3 },
        ]}
      >
        <View style={styles(theme).imageContainer}>
          <Image source={image} style={styles(theme).image} />
        </View>
        <View style={styles(theme).textContainer}>
          <Text numberOfLines={2} style={styles(theme).text}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    childContainer: {
      padding: 5,
      alignItems: "center",
      width: 80,
      height: 100,
    },
    imageContainer: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    textContainer: {
      marginTop: 5,
      width: "100%",
    },
    text: {
      fontFamily: theme.fonts.regular,
      textAlign: "center",
      color: theme.colors.white,
      fontSize: 10,
    },
  });
