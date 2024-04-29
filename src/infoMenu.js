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

export function InfoMenu({ toggleInfo }) {
  return (
    <View style={styles.menu}>
      <View style={styles.container}>
        <Text> HELLO?</Text>
        <Button
          style={styles.button}
          title="CLOSE INFO"
          onPress={toggleInfo}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
  },
  container: { position: "absolute", bottom: 100, right: 100 },
  button: { position: "absolute", bottom: 25, right: 25 },
});
