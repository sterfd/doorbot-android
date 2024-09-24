# RC Doorbot Mobile App
![Main Page](/src/images/main-page.jpg?raw=True)

The Doorbot Mobile App aims to simplify the experience of getting into the RC hub without a keyfob. The original [RC Doorbot](https://doorbot.recurse.com) is a web page that allows Recursers to access the physical RC space using their RC credentials. The doorbot can buzz the user into the lobby and call the elevators up to the 4th floor. Once in the space, checking into the hub requires the visitor to go to the tablet at the entryway, search for their name in the RC directory, and check in their profile. With the mobile app, unlocking the front door, calling the elevator, and checking into the hub are just a tap away. 

## Built With
#### App: 
* [![React Native][ReactNative]][ReactNative-url]
* [![Expo][Expo]][Expo-url]

#### Doorbot Server:
* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask-url]


## Features
### Personal Access Tokens
Since the mobile app uses personal access tokens for authentication instead of OAuth, you only have to set up the app once. Personal access tokens never expire, so you won't have to log into RC again. 

## Getting Started
### Installation
Download and install the .apk file from the latest [release](https://github.com/sterfd/doorbot-android/releases/download/v1.0.0/doorbot-android-install.apk).

### Usage
1. **Set Up** - Upon first loading the app, you'll be presented with a set up page where you can add your personal access token. Press the info button to the right of `Add Token` to see the step by step instructions. Pressing `Add Token` will bring your to your RC settings page, where after logging in, you can create a new personal access token. Copy it to your clipboard and close the browser. Paste and save the token. 
1. **Home Screen** - After the token is stored, you can now activate Doorbot buzz, elevator, check status, or check into the hub with a tap. A banner at the top of the screen will tell you if the action has succeeded or the status of the doorbot. If there's an authorization error, you might have saved an incorrect token. 


# Doorbot Widget for iOS

The Doorbot Widget is a series of iOS shortcuts that allows you to call the [Doorbot](https://doorbot.recurse.com/) commands from your home screen instead of the browser. This uses personal access tokens instead of OAuth, so once the shortcuts are set up, you won't have to re-authenticate. 

![Widget gif](https://raw.githubusercontent.com/sterfd/doorbot-android/main/assets/widget-homepage.gif)

### How to use it
You can activate Doorbot Buzz or Doorbot Elevator by pressing on the shortcut in the Shortcuts app. If you've put the shortcut widgets on your home screen, you can activate those calls by pressing on the widget. Doorbot Buzz answers the building intercom so you have access to the lobby of 397 Bridge St. Doorbot Elevator activates the robot that presses the elevator down button on the 4th floor. Doorbot Status will tell you if Doorbot is down or active. Hub Check In will check you into the hub - Doorbot Elevator will prompt you if you would like to check in, and this shortcut must be installed for that to go through.

Instructions on how to use the doorbot commands properly are documented [here](https://doorbot.recurse.com/hello). 


### How to set it up
*Setting up the shortcuts*
1. Download the [RC access token setup shortcut](https://www.icloud.com/shortcuts/c087d68cb3244c7ba1ded72f38936f5b) and run it.
1. It will open up the RC settings page in your browser, and ask you to create a new personal access token at the bottom of the page and copy it to your clipboard.
1. Navigate back to the shortcuts app. The shortcut will now ask for permission to open up 4 more browser tabs so you can download: [Doorbot Buzz](https://www.icloud.com/shortcuts/d4b2e0cf800045879a7201b7635e77fe), [Doorbot Elevator](https://www.icloud.com/shortcuts/3f83111892624c449fe48cb625b83ccd), [Doorbot Status](https://www.icloud.com/shortcuts/ccd6cc969d524f3eae099bd5b27b10c7), and [Hub Check In](https://www.icloud.com/shortcuts/616bfe49f52e482ea1e09afbb27098ec). Hit `Always Allow` since you'll be deleting this shortcut after setup. Navigate back and forth between Shortcuts and your browser to install these 4 shortcuts.
1. When you install each of these, they will prompt you to paste in your personal access token that you just copied from RC settings. 
1. When you first activate each of these shortcuts, they will ask you for permission to connect to doorbot.recurse.com, hit `Allow`.
1. After setup of the other Doorbot shortcuts, you can delete the RC access token shortcut.

*Setting up the widgets*
> This part can be a bit finicky so try to read through these instructions before diving in. You should also decide if you want to add the widget for Doorbot Status and Hub Check In onto your homepage since you wont be running these as often. It's up to you 😅 
1. Go to a homepage screen with space and press and hold on any app to activate the customization state. You'll want to be in this customization state where everything is dancing for the rest of these steps.
1. Tap the `+` in the corner of your screen, search for `Shortcuts`, and add the smallest of the three options. Repeat twice more - you'll see the same shortcut in all 3 widgets, but will fix that in the next step. 
1. Tap on a shortcut widget to select which shortcut you want to be in that widget. You'll have three widgets: Buzz, Elevator, and Status.
1. Drag the shortcut widgets on top of each other to create a `Smart Stack`. You can now scroll through the Smart Stack to see each shortcut. You *should* turn Widget Suggestions `Off` so random photos and apps don't populate this stack.


<!-- MARKDOWN LINKS & IMAGES -->
[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org