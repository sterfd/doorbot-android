import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { openBrowserAsync } from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SettingsMenu({ toggleSettings }) {
  const [token, setToken] = useState(null);
  const [text, setText] = useState("");

  const onPressGetStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        setText(value);
      }
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

  const onPressSave = () => {
    setToken(text);
  };

  const onPressPasteToken = async () => {
    const text = await Clipboard.getStringAsync();
    setText(text);
  };

  const onPressGetToken = () => {
    openBrowserAsync("https://www.recurse.com/settings/apps");
  };

  return (
    <View style={styles.menu}>
      <View style={styles.token}>
        <Text style={styles.pat}>Your personal access token:</Text>
        <TextInput
          style={styles.pat}
          value={text}
          multiline
          numberOfLines={3}
          onChangeText={setText}
          placeholder="None"
        />
        <Button title="GET ASYNC STORAGE" onPress={onPressGetStorage}></Button>
        <Button
          title="SAVE ASYNC STORAGE"
          onPress={onPressSaveStorage}
        ></Button>
        {/* <>
          {token ? (
            <Button title="DELETE TOKEN" onPress={onPressSave}></Button>
          ) : (
            <>
              <Button title="PASTE TOKEN" onPress={onPressPasteToken}></Button>
              <Button title="SAVE TOKEN" onPress={onPressSave}></Button>
            </>
          )}
          ;
        </> */}
      </View>
      <Text style={styles.pat}>
        To get a token, navigate to the bottom of the RC settings page and `+
        Create Token`. Copy to clipboard.
      </Text>
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
  token: {
    position: "absolute",
    top: 150,
  },
  pat: {
    fontSize: 24,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
