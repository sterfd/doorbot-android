# RC Doorbot Mobile App
![Main Page](/src/images/main-page.jpg?raw=True)

The Doorbot Mobile App aims to simplify the experience of getting into the RC hub without a keyfob. The original [RC Doorbot](https://doorbot.recurse.com) is a web page that allows Recursers to access the physical RC space using their RC credentials. The doorbot can buzz the user into the lobby and call the elevators up to the 4th floor. Once in the space, checking into the hub requires the visitor to go to the tablet at the entryway, search for their name in the RC directory, and check in their profile. With the mobile app, unlocking the front door, calling the elevator, and checking into the hub are just a tap away. 

## Built With
* [![React Native][ReactNative]][ReactNative-url]
* [![Expo][Expo]][Expo-url]

## Features
### Personal Access Tokens
Since the mobile app uses personal access tokens for authentication instead of OAuth, you only have to set up the app once. Personal access tokens never expire, so you won't have to log into RC again. 

## Getting Started
### Installation
Download and install the .apk file from the latest [release]((https://github.com/sterfd/doorbot-android/releases/download/v1.0.0/doorbot-android-install.apk)).

### Usage
1. **Set Up** - Upon first loading the app, you'll be presented with a set up page where you can add your personal access token. Press the info button to the right of `Add Token` to see the step by step instructions. Pressing `Add Token` will bring your to your RC settings page, where after logging in, you can create a new personal access token. Copy it to your clipboard and close the browser. Paste and save the token. 
1. **Home Screen** - After the token is stored, you can now activate Doorbot buzz, elevator, check status, or check into the hub with a tap. A banner at the top of the screen will tell you if the action has succeeded or the status of the doorbot. If there's an authorization error, you might have saved an incorrect token. 



<!-- MARKDOWN LINKS & IMAGES -->
[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev
