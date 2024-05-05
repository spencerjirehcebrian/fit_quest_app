import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

const ProgressBar = ({ progress }: { progress: number }) => {
  const numFilledBoxes = Math.round(progress);

  const { theme } = useContext(ThemeContext);
  const renderBoxes = () => {
    return Array.from({ length: 7 }, (_, i) => (
      <View
        key={i}
        style={[
          styles(theme).box,
          i < numFilledBoxes ? styles(theme).filledBox : styles(theme).emptyBox,
        ]}
      />
    ));
  };

  return <View style={styles(theme).container}>{renderBoxes()}</View>;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    },
    box: {
      width: 50,
      height: 4,
      borderRadius: 5,
      marginHorizontal: 1,
    },
    filledBox: {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.white,
    },
    emptyBox: {
      backgroundColor: theme.colors.transparent,
      borderWidth: 1,
      borderColor: theme.colors.white,
    },
  });

export default ProgressBar;
