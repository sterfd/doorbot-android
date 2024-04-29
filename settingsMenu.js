import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { openBrowserAsync } from "expo-web-browser";

export function SettingsMenu({ toggleSettings }) {
  const [token, setToken] = useState("");
  const [text, onChangeText] = useState("");

  const onPressSave = () => {
    setToken(text);
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
          onChangeText={onChangeText}
          placeholder="None"
        />
        {/* <Button title="DELETE TOKEN" onPress={onPressSave}></Button>    if token != '' */}
        <Button title="PASTE TOKEN" onPress={onPressSave}></Button>
        <Button title="SAVE TOKEN" onPress={onPressSave}></Button>
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
