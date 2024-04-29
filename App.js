import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [bannerText, setBannerText] = useState('');
  const [token, setToken] = useState(null);

  const onPressDoorbotBuzz = () => {
    setBannerText('Buzz button pressed');
    console.log('buzz pressed');
  }
  
  const onPressDoorbotElevator = () => {
    setBannerText('Elevator button pressed'); 
    console.log('elevator pressed');
  }
  
  const onPressDoorbotStatus = () => {
    setBannerText('Status button pressed');
    console.log('status pressed');
  }

  const onPressSettings = () => {
    setBannerText('Settings button pressed');
    console.log('settings pressed');
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner} >
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#529ce6'}]} onPress={() => onPressDoorbotBuzz()}><Text style={styles.buttonText}>BUZZ</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#ff6a73'}]}  onPress={() => onPressDoorbotElevator()}><Text style={styles.buttonText}>ELEVATOR</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#d55ad5'}]}  onPress={() => onPressDoorbotStatus()}><Text style={styles.buttonText}>CHECK STATUS</Text></TouchableOpacity>
      <View style={styles.settings}>
        <Button title="SETTINGS" onPress={() => onPressSettings()}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    position: 'absolute',
    top: 50,
    height: 60,
    backgroundColor: '#73bdff',
    width: '110%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    height: 120,
    width: 250,
    backgroundColor: 'lavender',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settings: {
    position: 'absolute',
    right: 25,
    bottom: 25,
  }
});

