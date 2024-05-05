import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

interface HalfScreenModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const HalfScreenModal = ({
  visible,
  onClose,
  children,
}: HalfScreenModalProps) => {
  const screenHeight = Dimensions.get("window").height;

  const { theme } = useContext(ThemeContext);
  const handleModalClose = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles(theme).container}>
          <View style={[styles(theme).modal, { height: screenHeight / 2 }]}>
            <View style={styles(theme).line}></View>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      justifyContent: "flex-end",
      padding: 10,
    },
    modal: {
      backgroundColor: theme.colors.purple,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    line: {
      alignSelf: "center",
      height: 10,
      borderRadius: 5, // half of the height to make it rounded
      backgroundColor: "white",
      width: "50%", // or specify a specific width
      borderWidth: 2, // thickness of the line
      borderColor: "white", // color of the border (same as background to make it appear as a line)
    },
  } as { [key: string]: ViewStyle });

export default HalfScreenModal;
