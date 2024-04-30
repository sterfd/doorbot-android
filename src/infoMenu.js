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

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth - 50;
const aspectRatio = 19.5 / 9;

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
      <View style={styles.itemContainer}>
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
      <FlatList
        data={DATA}
        renderItem={Item}
        keyExtractor={(item) => item.id.toString()}
      />
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
  itemContainer: {},
  item: {
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  close: { position: "absolute", bottom: 25, right: 25 },
  stepsText: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  stepsImage: { resizeMode: "contain", marginTop: 10, marginLeft: 20 },
  icon: { width: 25, height: 25, position: "absolute", right: 15 },
});
