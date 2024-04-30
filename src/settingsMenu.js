import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { openBrowserAsync } from "expo-web-browser";
import { InfoMenu } from "./infoMenu";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SettingsMenu({ toggleSettings }) {
  const [token, setToken] = useState(null);
  const [bannerText, setBannerText] = useState("");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [tokenRevealed, setTokenRevealed] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  const toggleBanner = () => {
    setIsBannerOpen(!isBannerOpen);
  };

  useEffect(() => {
    if (isBannerOpen) {
      const timer = setTimeout(() => {
        toggleBanner();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isBannerOpen]);

  const loadToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteToken = async (value) => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      console.log("delted token");
    } catch (e) {
      console.log(e);
    }
  };

  const onPressSaveStorage = async (value) => {
    try {
      await AsyncStorage.setItem(
        "token",
        "asdfzxcvqwerasdflk;ajsdflk;asjdfasdlkf;jw34e"
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onPressPasteToken = async () => {
    const text = await Clipboard.getStringAsync();
    setText(text);
  };

  const handleAdd = () => {
    console.log("add pressed");
    openBrowserAsync("https://www.recurse.com/settings/apps");
    // have paste token button -> should display wahts pasted
    // save token button
  };

  const toggleExtra = () => {
    setIsExtraOpen(!isExtraOpen);
  };

  const handleOutsidePress = () => {
    setIsExtraOpen(false);
  };

  const handleExtraSelected = (option) => {
    setIsExtraOpen(false);
    if (option === "Delete") {
      console.log("delete token");
      deleteToken();
    } else {
      // reveal token logic
      console.log("reavel token");
      setTokenRevealed(!tokenRevealed);
    }
  };

  const copyTokenToClipboard = async () => {
    await Clipboard.setAsyncString(token);
    console.log("Token copied to clipboard");
    setIsBannerOpen(true);
    setBannerText("Token copied to clipboard");
  };

  const onPressInfo = () => {
    console.log("info pressed");
    toggleInfo();
  };

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <View style={styles.menu}>
      <Modal animationType="fade" transparent={true} visible={isBannerOpen}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{bannerText}</Text>
        </View>
      </Modal>
      <View style={styles.tokenContainer}>
        <Text style={styles.pat}>Personal Access Token:</Text>
        {token ? (
          // we have a token - have the ... for Reveal Token, and Delete Token
          <View>
            <View style={styles.addButton}>
              <View style={styles.buttonContent}>
                <View style={styles.rightView}>
                  <TouchableOpacity
                    onLongPress={copyTokenToClipboard}
                    style={styles.visibleTokenContainer}
                  >
                    <Text
                      style={styles.tokenText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {tokenRevealed ? token : "*".repeat(token.length)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightView}>
                  <TouchableOpacity
                    style={styles.rightButton}
                    onPress={toggleExtra}
                  >
                    <Image
                      source={require("./ellipsis.png")}
                      style={styles.icon}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {isExtraOpen && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleExtraSelected("Reveal")}
                >
                  <Text style={styles.optionText}>
                    {tokenRevealed ? "Hide Token" : "Reveal Token"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.optionButton,
                    borderTopWidth: 1,
                    borderColor: "lightgray",
                  }}
                  onPress={() => handleExtraSelected("Delete")}
                >
                  <Text style={styles.optionText}>Delete Token</Text>
                </TouchableOpacity>
              </View>
            )}
            {isExtraOpen && (
              <TouchableOpacity
                style={styles.overlay}
                onPress={handleOutsidePress}
              ></TouchableOpacity>
            )}
          </View>
        ) : (
          // no token - have the + Add token and the i for more info and screenshots/text explanation
          // open a text input with paste and save buttons
          <TouchableOpacity
            style={{ ...styles.addButton, backgroundColor: "#ff7394" }}
            onPress={handleAdd}
          >
            <View style={styles.buttonContent}>
              <View style={styles.rightView}>
                <Image
                  source={require("./add.png")}
                  style={styles.icon}
                ></Image>
                <Text style={styles.tokenText}>Add Token</Text>
              </View>

              <View style={styles.rightView}>
                <TouchableOpacity
                  style={styles.rightButton}
                  onPress={onPressInfo}
                >
                  <Image
                    source={require("./info.png")}
                    style={styles.icon}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Button title="GET ASYNC STORAGE" onPress={loadToken}></Button>
        <Button
          title="SAVE ASYNC STORAGE"
          onPress={onPressSaveStorage}
        ></Button>
      </View>
      <View style={styles.closeButton}>
        <Button title="CLOSE SETTINGS" onPress={toggleSettings}></Button>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isInfoOpen}
        onRequestClose={toggleInfo}
      >
        <InfoMenu toggleInfo={toggleInfo} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: "#fafafa",
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

  tokenContainer: {
    position: "absolute",
    top: 150,
  },
  pat: {
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
  },
  addButton: {
    height: 50,
    width: 350,
    backgroundColor: "#b4ffbd",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenText: {
    fontSize: 20,
    marginLeft: 15,
    width: 250,
  },
  icon: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  rightButton: {
    height: 35,
    width: 35,
    backgroundColor: "pink",
    marginRight: 10,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: 25,
    bottom: 25,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  optionText: {
    fontSize: 20,
    textAlign: "center",
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  visibleTokenContainer: {},
});
