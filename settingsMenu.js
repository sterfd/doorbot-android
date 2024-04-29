import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { openBrowserAsync } from "expo-web-browser";

export function SettingsMenu({ toggleSettings }) {
  const [token, setToken] = useState("");
  const [text, onChangeText] = useState("");

  const onPressSave = () => {
    setToken(text);
  };

  return (
    <View style={styles.menu}>
      <Text style={styles.pat}>Your personal access token:</Text>
      <TextInput
        style={styles.pat}
        value={text}
        multiline
        numberOfLines={3}
        onChangeText={onChangeText}
        placeholder="None"
      />
      <Button title="SAVE TOKEN" onPress={onPressSave}></Button>
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
  pat: {
    fontSize: 24,
  },
  closeButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
