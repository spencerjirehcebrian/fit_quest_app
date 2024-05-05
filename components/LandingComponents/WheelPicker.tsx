import React, { useState } from "react";
import { View, Text, Animated, PanResponder, StyleSheet } from "react-native";

interface WheelPickerProps {
  options: string[];
  onValueChange?: (value: string) => void;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  options,
  onValueChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animation = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      animation.setValue(gestureState.dy);
    },
    onPanResponderRelease: (_, gestureState) => {
      const offset = gestureState.dy % (48 * options.length);
      const newIndex = Math.round(-offset / 48) % options.length;
      Animated.timing(animation, {
        toValue: -newIndex * 48,
        useNativeDriver: true,
      }).start();
      setSelectedIndex(newIndex);
      onValueChange?.(options[newIndex]);
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.optionsContainer,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [-48 * (options.length - 1), 0],
                  outputRange: [-48 * (options.length - 1), 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        {options.map((option, index) => (
          <Text key={index} style={styles.option}>
            {option}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
  },
  optionsContainer: {
    height: 48 * options.length,
    alignItems: "center",
  },
  option: {
    height: 48,
    fontSize: 16,
  },
});

export default WheelPicker;
