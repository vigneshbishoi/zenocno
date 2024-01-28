/**
 * @Author: Anand R
 * @Date: 2021-11-08
 * @Desc: ZenOnco - Root Entrypoint
 */

import App from './app/Entry';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);