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
  const [text, setText] = useState("");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState("");

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        setText(value);
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
      setText("");
      console.log("delted token");
    } catch (e) {
      console.log(e);
    }
  };

  const onPressSaveStorage = async (value) => {
    try {
      await AsyncStorage.setItem("token", "asdfzxcvqwer");
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
    setSelectedExtra(option);
    setIsExtraOpen(false);
    if (option === "Delete Token") {
      deleteToken();
    } else {
      // reveal token logic
      console.log("reavel token");
    }
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
      <View style={styles.tokenContainer}>
        <Text style={styles.pat}>Personal Access Token:</Text>
        {token ? (
          // we have a token - have the ... for Reveal Token, and Delete Token
          <View>
            <View style={styles.addButton}>
              <View style={styles.buttonContent}>
                <View style={styles.rightView}>
                  {/* replace this with stars */}
                  <Text style={styles.tokenText}>{token} ******</Text>
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
                  <Text style={styles.optionText}>Reveal Token</Text>
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

        <Button title="GET ASYNC STORAGE" onPress={loadToken}></Button>
        <Button
          title="SAVE ASYNC STORAGE"
          onPress={onPressSaveStorage}
        ></Button>
      </View>
      <View style={styles.closeButton}>
        <Button title="CLOSE SETTINGS" onPress={toggleSettings}></Button>
      </View>
      {isExtraOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={handleOutsidePress}
        ></TouchableOpacity>
      )}

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenContainer: {
    position: "absolute",
    top: 150,
  },
  pat: {
    fontSize: 24,
    textAlign: "left",
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
    fontWeight: "bold",
    marginLeft: 10,
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
    marginHorizontal: 20,
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
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
  optionText: {
    fontSize: 20,
  },
  optionButton: {
    backgroundColor: "#fff",
    marginVertical: 2,
    marginHorizontal: 5,
  },
});
