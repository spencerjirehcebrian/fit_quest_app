import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import kettle from "@/assets/AchievementAssets/Kettle/kettle.png";
import splat from "@/assets/AchievementAssets/Kettle/splat.png";
import splatl from "@/assets/AchievementAssets/Kettle/light_purple_splat.png";
import splatp from "@/assets/AchievementAssets/Kettle/purple_splat.png";
import splatd from "@/assets/AchievementAssets/Kettle/dark_purple_splat.png";
import star from "@/assets/AchievementAssets/Kettle/star.png";
import starl from "@/assets/AchievementAssets/Kettle/light_purple_star.png";
import starp from "@/assets/AchievementAssets/Kettle/purple_star.png";
import stard from "@/assets/AchievementAssets/Kettle/dark_purple_star.png";
import weights from "@/assets/AchievementAssets/Kettle/weights.png";
import weightsl from "@/assets/AchievementAssets/Kettle/light_purple_weights.png";
import weightsp from "@/assets/AchievementAssets/Kettle/purple_weights.png";
import weightsd from "@/assets/AchievementAssets/Kettle/dark_purple_weights.png";
import { getUsers } from "@/helpers/userDataHelpers";
import InnerKettleComponents from "@/components/AchievementComponents/InnerKettleComponents";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import NButton from "@/assets/HomeAssets/n_arrow.png";

const { width, height } = Dimensions.get("window");
interface IKettleData {
  light_purple_count?: number;
  purple_count?: number;
  kettle_points?: number;
  dark_purple_count?: number;
  points?: number;
}

const splatIcons = [splatl, splatp, splatd];
const starIcons = [starl, starp, stard];
const weightsIcons = [weightsl, weightsp, weightsd];

export default function KettleComponent({
  tabSelect,
}: {
  tabSelect: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const [iconType, setIconType] = useState(splat);
  const [kettleData, setKettleData] = useState<IKettleData>({
    dark_purple_count: 0,
    light_purple_count: 0,
    purple_count: 0,
    points: 0,
    kettle_points: 0,
  });
  const [selectedIconType, setSelectedIconType] = useState(splat);
  const handleIconPress = (icon: any) => {
    setIconType(icon);
    setSelectedIconType(selectedIconType === icon ? null : icon);
  };
  useEffect(() => {
    const retrieve = async () => {
      const {
        points,
        kettle_points,
        dark_purple_count,
        light_purple_count,
        purple_count,
      } = await getUsers();
      setKettleData((prevData) => ({
        ...prevData,
        points,
        kettle_points,
        dark_purple_count,
        light_purple_count,
        purple_count,
      }));
    };
    retrieve();
  }, []);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).topRow}>
        <Text style={styles(theme).topText}>Current points:</Text>
        <Text style={styles(theme).topText1}>{kettleData.points} points</Text>
      </View>
      <View style={styles(theme).kettle}>
        <Image source={kettle} style={styles(theme).largeImage} />

        <Text style={styles(theme).topText2}>{kettleData.kettle_points}%</Text>
        <View style={styles(theme).splats}>
          {iconType == star &&
            starIcons.map((icon, index) => (
              <InnerKettleComponents
                key={index}
                count={
                  index == 0
                    ? kettleData.light_purple_count!
                    : index == 1
                    ? kettleData.purple_count!
                    : index == 2
                    ? kettleData.dark_purple_count!
                    : 0
                }
                component={<Image source={icon} />}
                radius={width / 6}
              />
            ))}
          {iconType == splat &&
            splatIcons.map((icon, index) => (
              <InnerKettleComponents
                key={index}
                count={
                  index == 0
                    ? kettleData.light_purple_count!
                    : index == 1
                    ? kettleData.purple_count!
                    : index == 2
                    ? kettleData.dark_purple_count!
                    : 0
                }
                component={<Image source={icon} />}
                radius={width / 6}
              />
            ))}
          {iconType == weights &&
            weightsIcons.map((icon, index) => (
              <InnerKettleComponents
                key={index}
                count={
                  index == 0
                    ? kettleData.light_purple_count!
                    : index == 1
                    ? kettleData.purple_count!
                    : index == 2
                    ? kettleData.dark_purple_count!
                    : 0
                }
                component={<Image source={icon} />}
                radius={width / 6}
              />
            ))}
        </View>
      </View>
      <View style={styles(theme).buttonRow}>
        <TouchableOpacity
          onPress={() => handleIconPress(splat)}
          style={[
            styles(theme).button,
            selectedIconType === splat ? null : { opacity: 0.5 },
          ]}
        >
          <Image source={splat} style={styles(theme).buttonIconLittle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(weights)}
          style={[
            styles(theme).button,
            selectedIconType === weights ? null : { opacity: 0.5 },
          ]}
        >
          <Image source={weights} style={styles(theme).buttonIconLittle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(star)}
          style={[
            styles(theme).button,
            selectedIconType === star ? null : { opacity: 0.5 },
          ]}
        >
          <Image source={star} style={styles(theme).buttonIconLittle} />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).buttonRow}>
        <TouchableOpacity
          style={[
            styles(theme).button2,
            { backgroundColor: theme.colors.light_purple },
          ]}
        >
          <Image source={iconType} style={styles(theme).buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).button2,
            { backgroundColor: theme.colors.dark_purple },
          ]}
        >
          <Image source={iconType} style={styles(theme).buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).button2,
            { backgroundColor: theme.colors.purple },
          ]}
        >
          <Image source={iconType} style={styles(theme).buttonIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles(theme).navButton} onPress={tabSelect}>
        <Ionicons
          name="chevron-forward"
          size={37}
          color={theme.colors.text}
          style={styles(theme).BButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      width: "100%",
      height: "100%",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 20,
    },
    topText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      fontSize: 14,
      justifyContent: "center",
      alignContent: "center",
      marginHorizontal: 10,
      paddingTop: 5,
    },
    topText1: {
      fontFamily: theme.fonts.bold,
      justifyContent: "center",
      color: theme.colors.dark_purple,
      backgroundColor: "#D9D9D9",
      borderRadius: 5,
      padding: 5,
      paddingHorizontal: 15,
      fontSize: 16,
    },
    topText2: {
      zIndex: 5,
      position: "absolute",
      top: "60%",
      left: "37%",
      fontFamily: theme.fonts.regular,
      justifyContent: "center",
      alignContent: "center",
      color: theme.colors.dark_purple,
      borderRadius: 5,
      padding: 5,
      fontSize: 36,
    },
    largeImage: {
      resizeMode: "contain",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    button: {
      marginHorizontal: 3,
      padding: 10,
      backgroundColor: theme.colors.purple,
      borderRadius: 100,
      resizeMode: "contain",
      width: 30,
      height: 30,
      justifyContent: "center",
    },
    button2: {
      marginHorizontal: 5,
      padding: 10,
      borderRadius: 8,
      resizeMode: "contain",
      width: 80,
      height: 30,
      alignContent: "center",
      justifyContent: "center",
    },
    buttonIcon: {
      width: 20,
      height: 20,
      alignSelf: "center",
      justifyContent: "center",
      resizeMode: "contain",
    },
    buttonIconLittle: {
      width: 15,
      height: 15,
      alignSelf: "center",
      justifyContent: "center",
      resizeMode: "contain",
    },
    navButton: {
      position: "absolute",
      right: 0,
      bottom: "50%",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
    BButtonImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    kettle: {
      marginTop: 10,
      width: "70%",
      height: "55%",
      resizeMode: "contain",
    },
    splats: {
      position: "absolute",
      top: "42%",
      left: "20%",
    },
  });
