import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  ViewStyle,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Track from "@/assets/HomeAssets/track.png";
import Update from "@/assets/HomeAssets/update.png";

interface HalfScreenModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onPressUpdateData: () => void;
  onPressTrackTab: () => void;
  title: string;
}

const TodayTobModal = ({
  visible,
  onClose,
  children,
  onPressUpdateData,
  onPressTrackTab,
  title,
}: HalfScreenModalProps) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const { theme } = useContext(ThemeContext);
  const handleModalClose = (event: GestureResponderEvent) => {
    // Check if the user clicked outside the modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles(theme).container}>
          <View style={styles(theme).modal}>
            <Text style={styles(theme).text}>{title}</Text>
            <View style={styles(theme).buttonContainer}>
              <Pressable
                onPress={onPressUpdateData}
                style={styles(theme).button}
              >
                <Image source={Update} style={styles(theme).buttonImage} />
                <Text style={styles(theme).buttonText}>Update Progress</Text>
              </Pressable>
              <Pressable onPress={onPressTrackTab} style={styles(theme).button}>
                <Image source={Track} style={styles(theme).buttonImage} />
                <Text style={styles(theme).buttonText}>Track Tab</Text>
              </Pressable>
            </View>
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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      backgroundColor: theme.colors.purple,
      borderRadius: 10,
      padding: 15,
      width: "80%",
      maxHeight: "80%",
    },
    text: {
      fontSize: 14,
      marginBottom: 4,
      fontFamily: theme.fonts.bold,
      color: theme.colors.white,
      alignSelf: "center",
    },
    buttonContainer: {
      flexDirection: "column",
    },
    button: {
      backgroundColor: theme.colors.transparent,
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 8,
      marginBottom: 2,
      flexDirection: "row",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontFamily: theme.fonts.bold,
    },
    buttonImage: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
  });

export default TodayTobModal;
