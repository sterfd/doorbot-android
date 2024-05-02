import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { openBrowserAsync } from "expo-web-browser";
import { InfoMenu } from "./infoMenu";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUnit = Math.round(windowWidth / 100);

export function SettingsMenu({ toggleSettings, token, setToken }) {
  const [pastedToken, setPastedToken] = useState(null);
  const [bannerText, setBannerText] = useState("");
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [tokenRevealed, setTokenRevealed] = useState(false);
  const [isAddTokenExpanded, setIsAddTokenExpanded] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);

  // check for token on startup
  useEffect(() => {
    loadToken();
  }, []);

  // timer to close banner
  useEffect(() => {
    if (isBannerOpen) {
      const timer = setTimeout(() => {
        setIsBannerOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBannerOpen]);

  // async storage handling
  const loadToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {}
  };

  const deleteToken = async (value) => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
    } catch (e) {}
  };

  const onPressSaveStorage = async (value) => {
    try {
      await AsyncStorage.setItem("token", pastedToken);
      setToken(pastedToken);
      toggleSettings();
    } catch (e) {}
  };

  // clipboard handling
  const onPressPasteToken = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedToken(text);
  };

  // copy to clipboard
  const copyTokenToClipboard = () => {
    Clipboard.setString(token);
    setIsBannerOpen(true);
    setBannerText("Token copied to clipboard");
  };

  // if no token, add = open browser for rc settings and expand menu to paste token in
  const handleAdd = () => {
    openBrowserAsync("https://www.recurse.com/settings/apps");
    setIsAddTokenExpanded(true);
  };

  // expand or close info menu for adding token instructions
  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  // if token, click `...` for reveal/delete token option menu
  const handleExtraSelected = (option) => {
    setIsExtraOpen(false);
    if (option === "Delete") {
      deleteToken();
    } else {
      setTokenRevealed(!tokenRevealed);
    }
  };

  // if reveal/delete token option menu open, press anywhere else to close menu
  const handleOutsidePress = () => {
    setIsExtraOpen(false);
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
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onLongPress={tokenRevealed ? copyTokenToClipboard : null}
            >
              <Text
                style={styles.tokenText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tokenRevealed ? token : "*".repeat(token.length)}
              </Text>
              <TouchableOpacity
                style={{
                  ...styles.rightButton,
                  marginLeft: windowWidth * 0.07,
                }}
                onPress={() => {
                  setIsExtraOpen(true);
                }}
              >
                <Image
                  source={require("./images/ellipsis.png")}
                  style={styles.icon}
                ></Image>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ) : (
          // no token found - + Add Token with (i) on the right
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#ff7394" }}
              onPress={handleAdd}
            >
              <Image
                source={require("./images/add.png")}
                style={styles.icon}
              ></Image>
              <Text style={styles.tokenText}>Add Token</Text>
              <TouchableOpacity style={styles.rightButton} onPress={toggleInfo}>
                <Image
                  source={require("./images/info.png")}
                  style={{
                    ...styles.icon,
                    marginRight: windowWidth * 0.05,
                  }}
                ></Image>
              </TouchableOpacity>
            </TouchableOpacity>

            {isAddTokenExpanded && (
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressPasteToken}
                >
                  <Text style={styles.tokenText}>Paste Token</Text>
                </TouchableOpacity>
                {pastedToken !== null && (
                  <View>
                    <Text style={styles.tokenText}>Token:</Text>
                    <Text
                      style={{ ...styles.tokenText, width: windowWidth * 0.75 }}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      {pastedToken}
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={onPressSaveStorage}
                    >
                      <Text style={styles.tokenText}>Save Token</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
      {/* hello worldI love red switches!!! */}
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

      {/* info page for instructions on how to add tokens */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isInfoOpen}
        onRequestClose={toggleInfo}
      >
        <InfoMenu toggleInfo={toggleInfo} />
      </Modal>
      <View style={styles.closeButton}>
        <Button title="CLOSE SETTINGS" onPress={toggleSettings}></Button>
      </View>
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
    marginTop: windowHeight * 0.05,
    height: windowHeight * 0.08,
    width: "100%",
    backgroundColor: "#73bdff",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "white",
    fontSize: baseUnit * 6,
  },

  tokenContainer: {
    position: "absolute",
    top: windowHeight * 0.2,
  },

  pat: {
    fontSize: baseUnit * 6,
    fontWeight: "bold",
  },

  // for both Add Token and **** Token, Paste Token, Save Token
  button: {
    height: windowHeight * 0.055,
    width: windowWidth * 0.85,
    borderRadius: 10,
    backgroundColor: "#b4ffbd",
    flexDirection: "row",
    marginVertical: windowHeight * 0.015,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tokenText: {
    fontSize: baseUnit * 5,
    marginLeft: windowWidth * 0.05,
    width: windowWidth * 0.6,
    marginTop: windowHeight * 0.013,
  },
  icon: {
    height: windowHeight * 0.0275,
    width: windowHeight * 0.0275,
    marginLeft: windowWidth * 0.03,
    alignSelf: "center",
  },
  rightButton: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    marginTop: windowHeight * 0.0025,
    justifyContent: "center",
  },

  // dropdown menu styling
  dropdown: {
    position: "absolute",
    top: windowHeight * 0.3025,
    right: windowWidth * 0.075,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  optionText: {
    fontSize: baseUnit * 5,
    textAlign: "center",
  },
  optionButton: {
    padding: windowHeight * 0.01,
  },

  closeButton: {
    position: "absolute",
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
});
