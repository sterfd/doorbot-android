import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [bannerText, setBannerText] = useState('');
  const [token, setToken] = useState('');
  // const token = '';
  
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('token');
  //       if (storedToken !== null) {
  //         setToken(storedToken);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching token:', error);
  //     }
  //   };

  //   fetchToken();
  // }, []);

  // const storeToken = async (newToken) => {
  //   try {
  //     await AsyncStorage.setItem('token', newToken);
  //     setToken(newToken);
  //   } catch (error) {
  //     console.error('Error storing token:', error);
  //   }
  // };

  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     setToken(null);
  //   } catch (error) {
  //     console.error('Error removing token:', error);
  //   }
  // };

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
  
  const onPressOpenSettings = async () => {
    setBannerText('Changing settings');
    try {
      console.log('pressed settings')
   } catch (error) {
      console.error('Error sending post request:', error);
   }
  }
  const onPressBleh = () => {
    console.log('pressed bleh');
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
        {/* <TouchableOpacity style={styles.button}  onPress={() => onPressDoorbotBuzz()}>
          <Text style={styles.buttonText}>BUZZ</Text>
        </TouchableOpacity> */}
        <Button title="BUZZ" color='#ff6262' onPress={() => onPressDoorbotBuzz()}/>
        {/* <Button title="ELEVATOR" color='#08acd5' onPress={() => onPressDoorbotElevator()}/> */}
        <Button title="CHECK STATUS" color='#eeac9c'/>
      </View>
      <View style={styles.settingsButtonContainer}>
        <Button title="Settings" color='#7b2941' onPress={() => onPressOpenSettings()}/>
        <Button title="Bleh" color='#7b2941' onPress={() => onPressBleh()}/>
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
    paddingTop: StatusBar.currentHeight,
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
  button: {
    borderRadius: 10,
    width: 200,
    height: 100,
    paddingTop: 20,
    backgroundColor:'#ff6262',
    margin: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  // settingsButtonContainer: {
  //   position: 'absolute',
  //   right: 20,
  //   bottom: 20,
  // },
});

