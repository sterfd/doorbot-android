import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [bannerText, setBannerText] = useState('');
  const onPressDoorbotBuzz = () => {
    setBannerText('Buzz button pressed');
  }
    
  const onPressDoorbotElevator = () => {
    setBannerText('Elevator button pressed'); 
  }
  
  const onPressDoorbotStatus = () => {
    setBannerText('Status button pressed');
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner} >
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Does this update real time?</Text>
      <Button title="BUZZ" onPress={() => onPressDoorbotBuzz()}/>
      <Button title="ELEVATOR" onPress={() => onPressDoorbotElevator()}/>
      <Button title="CHECK STATUS" onPress={() => onPressDoorbotStatus()}/>
      {/* <StatusBar style="auto" /> */}
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
    backgroundColor: 'red',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
