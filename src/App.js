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
    // check to see if we have a token on start up
    const loadToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          setToken(value);
        } else {
          // redirect and open settings since no token was found
          toggleSettings();
        }
      } catch (e) {}
    };
    loadToken();
  }, []);

  // timer to fade banner away
  useEffect(() => {
    if (isBannerOpen) {
      const timer = setTimeout(() => {
        setIsBannerOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBannerOpen]);

  // 4 different doorbot functions, calling requests
  const onPressDoorbotBuzz = async () => {
    const { message } = await sendRequest("buzz_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
  };

  const onPressDoorbotElevator = async () => {
    const { message } = await sendRequest("unlock_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
  };

  const onPressCheckIn = async () => {
    const { message } = await sendRequest("checkIn", token);
    setIsBannerOpen(true);
    setBannerText(message);
  };

  const onPressDoorbotStatus = async () => {
    const { message } = await sendRequest("status_mobile", token);
    setIsBannerOpen(true);
    setBannerText(message);
  };

  // change visibility of settings menu - passed into settings menu
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
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
  },
});
