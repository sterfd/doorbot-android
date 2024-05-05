export function AppInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Made with love by Stephanie Mio Nakamata Huynh W2'24
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  text: { fontSize: 24 },
});
