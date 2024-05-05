import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUnit = Math.round(windowWidth / 100);
const imageWidth = windowWidth * 0.9;
const aspectRatio = windowHeight / windowWidth;

export function InfoMenu({ toggleInfo }) {
  const [expandedStep, setExpandedStep] = useState(null);

  const DATA = [
    {
      step: "Step 1. Log into RC",
      imageLink: require("./images/login.png"),
      id: 1,
    },
    {
      step: "Step 2. Scroll to bottom of page",
      imageLink: require("./images/settings.png"),
      id: 2,
    },
    {
      step: "Step 3. Click Create Token",
      imageLink: require("./images/createtoken.png"),
      id: 3,
    },
    {
      step: "Step 4. Name your token",
      imageLink: require("./images/nametoken.png"),
      id: 4,
    },
    {
      step: "Step 5. Highlight and copy token",
      imageLink: require("./images/copytoken.png"),
      id: 5,
    },
  ];

  const toggleExpand = (id) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const Item = ({ item }) => {
    const isExpanded = expandedStep === item.id;
    const imageHeight = imageWidth * aspectRatio;
    return (
      <View>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.item}
        >
          <Text style={styles.stepsText}>{item.step}</Text>
          <Image
            source={require("./images/down.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
        {isExpanded && (
          <Image
            source={item.imageLink}
            style={{
              ...styles.stepsImage,
              width: imageWidth,
              height: imageHeight,
            }}
          ></Image>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.SAV}>
      <View style={styles.flatlist}>
        <FlatList
          data={DATA}
          renderItem={Item}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.close}>
        <Button
          style={styles.button}
          title="CLOSE INFO"
          onPress={toggleInfo}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAV: { flex: 1, backgroundColor: "#ffffff" },
  flatlist: { marginBottom: windowHeight * 0.04 },
  item: {
    padding: windowHeight * 0.011,
    marginVertical: windowHeight * 0.011,
    // padding: 10,
    // marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  stepsText: {
    fontSize: baseUnit * 5,
    fontWeight: "bold",
    // marginLeft: 10,
    marginLeft: windowWidth * 0.02,
  },
  stepsImage: {
    // resizeMode: "contain",
    // marginTop: 10,
    // marginLeft: 20,
    marginTop: windowHeight * 0.01,
    marginLeft: windowWidth * 0.05,
  },
  icon: {
    position: "absolute",
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    // width: 25,
    // height: 25,
    right: windowWidth * 0.02,
  },
  close: {
    position: "absolute",
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
});
