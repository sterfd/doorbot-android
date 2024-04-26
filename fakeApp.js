import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [bannerText, setBannerText] = useState('');
//   const [token, setToken] = useState('');
  const token = '';
  

  const onPressDoorbotBuzz = () => {
    setBannerText('Buzz button pressed');
  }
    
  const onPressDoorbotElevator = () => {
    setBannerText('Elevator button pressed'); 
    sendPostRequest('buzz_mobile')
  }
  
  const onPressDoorbotStatus = () => {
    setBannerText('Status button pressed');
    sendPostRequest('unlock_mobile')
  }
  
  const onPressOpenSettings = () => {
    setBannerText('Changing settings');
    console.log('changing settings')
  }

  const sendPostRequest = async (action) => {
    try {
      let method = 'POST';
      if (action == 'status_mobile') {
        method = 'GET';
      }
      const response = await fetch('https://doorbot.recurse.com/' + action, {
        method: method,
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.status);
      }
      const responseData = await response.text(); 
      console.log('Response:', responseData); 
    } catch (error) {
      console.error('Error:', error);
    }}

  return (
    <View style={styles.container}>
      <View style={styles.banner} >
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.buttonContainer}>
        <Button title="BUZZ" color='#ff6262' onPress={() => onPressDoorbotBuzz()}/>
        <Button title="ELEVATOR" color='#08acd5' onPress={() => onPressDoorbotElevator()}/>
        <Button title="CHECK STATUS" color='#eeac9c' onPress={() => onPressDoorbotStatus()}/>
      </View>
      <View style={styles.settingsButtonContainer}>
        <Button title="Settings" color='#7b2941' onPress={() => onPressOpenSettings()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: StatusBar.currentHeight,
  },
  banner: {
    backgroundColor: '#8bd5ee',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    marginTop: 20,
  },
  settingsButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

