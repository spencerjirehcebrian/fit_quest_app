import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";

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

  const handleModalClose = (event: GestureResponderEvent) => {
    // Check if the user clicked outside the modal
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
        <View style={styles.container}>
          <View style={[styles.modal, { height: screenHeight / 2 }]}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
} as { [key: string]: ViewStyle });

export default HalfScreenModal;
