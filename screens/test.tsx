import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const ModalButton = ({ modalContent }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalContent}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const TestScreen = () => {
  const modalContents = [
    <Text>What is your current weight?</Text>,
    <Text>What is your target weight?</Text>,
    // Add more modal contents here
  ];

  return (
    <View style={styles.container}>
      {modalContents.map((content, index) => (
        <ModalButton key={index} modalContent={content} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default TestScreen;
