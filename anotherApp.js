import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

export default function App() {
  const [bannerText, setBannerText] = useState('');

  const onPressDoorbotBuzz = () => {
    setBannerText('Buzz button pressed');
    sendPostRequest('buzz_mobile');
  };

  const onPressDoorbotElevator = () => {
    setBannerText('Elevator button pressed');
    sendPostRequest('elevator_mobile');
  };

  const onPressDoorbotStatus = () => {
    setBannerText('Check Status button pressed');
    sendPostRequest('status_mobile');
  };

  const sendPostRequest = async (action) => {
    try {
        let method = 'POST';
        if (action == 'status_mobile') {
            method = 'GET';
        }
      const response = await fetch('https://doorbot.recurse.com/' + action, {
        method: method,
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      console.log(data); // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
      <View style={styles.content}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Does this update real time?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="BUZZ" onPress={() => onPressDoorbotBuzz()} />
        <Button title="ELEVATOR" onPress={() => onPressDoorbotElevator()} />
        <Button title="CHECK STATUS" onPress={() => onPressDoorbotStatus()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items at the top
    paddingTop: StatusBar.currentHeight, // To accommodate status bar
  },
  banner: {
    backgroundColor: 'red',
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
    justifyContent: 'space-evenly', // Adjusted to space-evenly
    width: '80%', // Take full width
    marginBottom: 20, // Adjust spacing between content and buttons
  },
});
