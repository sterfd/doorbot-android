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
  // const [token, setToken] = useState(null);
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
        // console.log(value);
        setToken(value);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const deleteToken = async (value) => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      // console.log("delted token");
    } catch (e) {
      // console.log(e);
    }
  };

  const onPressSaveStorage = async (value) => {
    try {
      await AsyncStorage.setItem("token", pastedToken);
      setToken(pastedToken);
      toggleSettings();
    } catch (e) {
      // console.log(e);
    }
  };

  // clipboard handling
  const onPressPasteToken = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedToken(text);
  };

  // copy to clipboard
  const copyTokenToClipboard = () => {
    Clipboard.setString(token);
    // console.log("Token copied to clipboard");
    setIsBannerOpen(true);
    setBannerText("Token copied to clipboard");
  };

  // if no token, add = open browser for rc settings and expand menu to paste token in
  const handleAdd = () => {
    // console.log("add pressed");
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
      // console.log("delete token");
      deleteToken();
    } else {
      // console.log("reavel token");
      setTokenRevealed(!tokenRevealed);
    }
  };

  // if reveal/delete token option menu open, press anywhere else to close menu
  const handleOutsidePress = () => {
    setIsExtraOpen(false);
  };

  // const onPressInfo = () => {
  //   console.log("info pressed");
  //   toggleInfo();
  // };

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
              {/* <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.visibleTokenContainer}> */}
              <Text
                style={styles.tokenText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tokenRevealed ? token : "*".repeat(token.length)}
              </Text>
              {/* <View style={styles.rightView}> */}
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
            {/* </View> */}
            {/* // </TouchableOpacity> */}
          </View>
        ) : (
          // no token found - + Add Token with (i) on the right
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#ff7394" }}
              onPress={handleAdd}
            >
              {/* <View style={styles.buttonContent}> */}
              {/* <View style={styles.rightView}> */}
              <Image
                source={require("./images/add.png")}
                style={styles.icon}
              ></Image>
              <Text style={styles.tokenText}>Add Token</Text>
              {/* </View> */}

              {/* <View style={styles.rightView}> */}
              <TouchableOpacity style={styles.rightButton} onPress={toggleInfo}>
                <Image
                  source={require("./images/info.png")}
                  style={{
                    ...styles.icon,
                    marginRight: windowWidth * 0.05,
                  }}
                ></Image>
              </TouchableOpacity>
              {/* </View> */}
              {/* </View> */}
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
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    // position: "absolute",
    // top: 50,
    // height: 60,
    // width: "110%",
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
    // top: 150,
  },

  pat: {
    // fontSize: 24,
    fontSize: baseUnit * 6,
    // textAlign: "left",
    fontWeight: "bold",
  },

  // for both Add Token and **** Token, Paste Token, Save Token
  button: {
    // height: 50,
    // width: 350,
    // backgroundColor: "yellow",
    height: windowHeight * 0.055,
    width: windowWidth * 0.85,
    borderRadius: 10,
    backgroundColor: "#b4ffbd",
    // alignContent: "center",
    // justifyContent: "space-between",
    flexDirection: "row",
    // justifyContent: "center",
    marginVertical: windowHeight * 0.015,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "green",
  },
  // leftView: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // rightView: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  tokenText: {
    // fontSize: 20,
    // marginLeft: 15,
    // width: 250,
    fontSize: baseUnit * 5,
    marginLeft: windowWidth * 0.05,
    width: windowWidth * 0.6,
    // height: windowHeight * 0.05,
    // textAlignVertical: "center",
    marginTop: windowHeight * 0.013,
    // backgroundColor: "yellow",
  },
  // pastedTokenText: {
  //   fontSize: 20,
  //   marginLeft: 15,
  //   width: 300,
  // },
  icon: {
    height: windowHeight * 0.0275,
    width: windowHeight * 0.0275,
    // height: 25,
    // width: 25,
    // marginHorizontal: 10,
    marginLeft: windowWidth * 0.03,
    alignSelf: "center",
  },
  rightButton: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    // backgroundColor: "pink",
    // margin: 10,
    // marginRight: windowWidth * 0.05,
    marginTop: windowHeight * 0.0025,
    justifyContent: "center",
  },

  // dropdown menu styling
  dropdown: {
    position: "absolute",
    top: windowHeight * 0.3025,
    right: windowWidth * 0.075,
    // top: 230,
    // right: 42,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  optionText: {
    // fontSize: 20,
    fontSize: baseUnit * 5,
    textAlign: "center",
  },
  optionButton: {
    padding: windowHeight * 0.01,
  },

  // visibleTokenContainer: {
  //   backgroundColor: "yellow",
  // },

  closeButton: {
    position: "absolute",
    // right: 25,
    // bottom: 25,
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
});
