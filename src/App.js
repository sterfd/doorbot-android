import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { SettingsMenu } from "./settingsMenu";

export default function App() {
  const [bannerText, setBannerText] = useState("");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [token, setToken] = useState(null);

  const toggleBanner = () => {
    setIsBannerOpen(!isBannerOpen);
  };

  useEffect(() => {
    if (isBannerOpen) {
      const timer = setTimeout(() => {
        toggleBanner();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isBannerOpen]);

  const onPressDoorbotBuzz = () => {
    setIsBannerOpen(true);
    setBannerText("Buzz button pressed");
    console.log("buzz pressed");
  };

  const onPressDoorbotElevator = () => {
    setIsBannerOpen(true);
    setBannerText("Elevator button pressed");
    console.log("elevator pressed");
  };

  const onPressCheckIn = () => {
    setIsBannerOpen(true);
    setBannerText("Checkin button pressed");
    console.log("checkin pressed");
  };

  const onPressDoorbotStatus = () => {
    setIsBannerOpen(true);
    setBannerText("Status button pressed");
    console.log("status pressed");
  };

  const onPressMenu = () => {
    console.log("menu pressed");
    toggleSettings();
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
        style={[styles.button, { backgroundColor: "#529ce6" }]}
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
        <SettingsMenu toggleSettings={toggleSettings} />
      </Modal>

      <View style={styles.settings}>
        <Button title="OPEN MENU" onPress={onPressMenu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    position: "absolute",
    top: 50,
    height: 60,
    backgroundColor: "#73bdff",
    width: "110%",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 20,
  },
  button: {
    height: 120,
    width: 250,
    backgroundColor: "lavender",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  settings: {
    position: "absolute",
    right: 25,
    bottom: 25,
  },
});
