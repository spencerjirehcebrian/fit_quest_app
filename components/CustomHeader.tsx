import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ButtonHeader from "@/components/Buttons/ButtonHeader";
import { useNavigation } from "@react-navigation/native";
import { getUsers } from "@/helpers/userDataHelpers";
const CustomHeader = ({
  isMin,
  navigation,
}: {
  isMin: boolean;
  navigation: any;
}) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [points, setPoints] = useState<number | undefined>(undefined);

  const handlePress = () => {
    navigation.navigate("Achievements");
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  useEffect(() => {
    const retrieve = async () => {
      const { username, points } = await getUsers();
      setUsername(username);
      setPoints(points);
    };
    retrieve();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.userImage}
        />
        <View>
          <Text style={styles.dateLabel}>{formattedDate}</Text>
          <Text style={styles.welcomeLabel}>Welcome back {username}!</Text>
        </View>
      </View>
      {!isMin && (
        <View style={styles.rightContainer}>
          {/* <Text style={styles.pointsLabel}>{points} points</Text> */}
          <ButtonHeader onPress={handlePress} title="Achievements" />
          <ButtonHeader onPress={handlePress} title={points + " points"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
  },
  welcomeLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  achievementsLabel: {
    fontSize: 14,
    color: "#666",
  },
});

export default CustomHeader;
