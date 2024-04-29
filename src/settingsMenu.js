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
import SelectDropdown from "react-native-select-dropdown";
import { openBrowserAsync } from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SettingsMenu({ toggleSettings }) {
  const [token, setToken] = useState(null);
  const [text, setText] = useState("");
  const [extraVisible, setExtraVisible] = useState(false);

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

  const onPressGetToken = () => {
    openBrowserAsync("https://www.recurse.com/settings/apps");
  };

  const handleAdd = () => {
    console.log("add pressed");
  };

  const handleInfo = () => {
    console.log("info pressed");
  };

  const handleExtra = (option) => {
    console.log("Option selected: ", option);
    setExtraVisible(false);
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
                <View style={styles.leftView}>
                  {/* replace this with stars */}
                  <Text style={styles.tokenText}>{token} ******</Text>
                </View>
                <View style={styles.rightView}>
                  <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => setExtraVisible(true)}
                  >
                    <Image
                      source={require("./ellipsis.png")}
                      style={styles.icon}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <SelectDropdown
              data={["Reveal Token", "Delete Token"]}
              onSelect={(selectedItem) => {
                console.log(selectedItem);
              }}
              renderButton={() => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Image
                      source={require("./ellipsis.png")}
                      style={styles.icon}
                    ></Image>
                  </View>
                );
              }}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        ) : (
          // no token - have the + Add token and the i for more info and screenshots/text explanation
          // open a text input with paste and save buttons
          <TouchableOpacity
            style={{ ...styles.addButton, backgroundColor: "#ff7394" }}
            onPress={handleAdd}
          >
            <View style={styles.buttonContent}>
              <View style={styles.leftView}>
                <Image
                  source={require("./add.png")}
                  style={styles.icon}
                ></Image>
                <Text style={styles.tokenText}>Add Token</Text>
              </View>

              <View style={styles.rightView}>
                <TouchableOpacity
                  style={styles.rightButton}
                  onPress={handleInfo}
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

        <Button title="DELETE" onPress={deleteToken}></Button>
        <Button title="GET ASYNC STORAGE" onPress={loadToken}></Button>
        <Button
          title="SAVE ASYNC STORAGE"
          onPress={onPressSaveStorage}
        ></Button>
      </View>
      <Button title="GET A TOKEN" onPress={onPressGetToken}></Button>
      <View style={styles.closeButton}>
        <Button title="CLOSE SETTINGS" onPress={toggleSettings}></Button>
      </View>
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
  },
  rightButton: {
    height: 30,
    width: 30,
    // backgroundColor: "pink",
    marginHorizontal: 20,
  },
  extraModal: {
    marginTop: "auto",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  extraOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },

  closeButton: {
    position: "absolute",
    right: 25,
    bottom: 25,
  },

  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
