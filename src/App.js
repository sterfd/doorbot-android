import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { SettingsMenu } from "./settingsMenu";
import { sendRequest } from "./requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUnit = Math.round(windowWidth / 100);

export default function App() {
  const [bannerText, setBannerText] = useState("");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // console.log("running useEffect in app.js");
    const loadToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        // console.log("inside useeffect try, after await asyncstorage: ", value);
        if (value !== null) {
          // console.log("got token on startup");
          setToken(value);
        } else {
          toggleSettings();
        }
      } catch (e) {
        // console.log(e);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (isBannerOpen) {
      const timer = setTimeout(() => {
        setIsBannerOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBannerOpen]);

  const onPressDoorbotBuzz = async () => {
    const { message } = await sendRequest("buzz_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
    // console.log("buzz pressed");
  };

  const onPressDoorbotElevator = async () => {
    const { message } = await sendRequest("unlock_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
    // console.log("elevator pressed");
  };

  const onPressCheckIn = async () => {
    const { message } = await sendRequest("checkIn", token);
    setIsBannerOpen(true);
    setBannerText(message);
    // console.log("checkin pressed");
  };

  const onPressDoorbotStatus = async () => {
    const { message } = await sendRequest("status_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
    console.log("status pressed");
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isBannerOpen}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{bannerText}</Text>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: "#529ce6",
          marginTop: windowHeight * 0.05,
        }}
        onPress={onPressDoorbotBuzz}
      >
        <Text style={styles.buttonText}>BUZZ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ff6a73" }]}
        onPress={onPressDoorbotElevator}
      >
        <Text style={styles.buttonText}>ELEVATOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3194a4" }]}
        onPress={onPressCheckIn}
      >
        <Text style={styles.buttonText}>HUB CHECK IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#d55ad5" }]}
        onPress={onPressDoorbotStatus}
      >
        <Text style={styles.buttonText}>CHECK STATUS</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsOpen}
        onRequestClose={toggleSettings}
      >
        <SettingsMenu
          toggleSettings={toggleSettings}
          token={token}
          setToken={setToken}
        />
      </Modal>

      <View style={styles.settings}>
        <Button title="OPEN SETTINGS" onPress={toggleSettings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: "#fff",
    // backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
  },
  banner: {
    // position: "absolute",
    // top: 50,
    // height: 60,
    backgroundColor: "#73bdff",
    marginTop: windowHeight * 0.05,
    height: windowHeight * 0.08,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: baseUnit * 6,
  },
  button: {
    backgroundColor: "lavender",
    height: windowHeight * 0.13,
    width: windowWidth * 0.65,
    marginVertical: windowHeight * 0.025,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: baseUnit * 7,
    fontWeight: "bold",
    textAlign: "center",
  },
  settings: {
    position: "absolute",
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.05,
    // right: 25,
    // bottom: 25,
  },
});
