/**
 * @Author: Anand 
 * @Date: 2021-11-08
 * @Desc: ZenOnco - Applicaiton's Entrypoint
 */

import * as actions from './store/actions/loginActions'
import { ActivityIndicator,Alert,Linking,Platform, AppState } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import Text from './components/CustomText';
import { LogBox } from 'react-native';
import { ThemeContextProvider } from './utils/ThemeProvider';
import configureStore from './store';
import setI18nConfig from './utils/LanguageProvider';
import Navigator from './navigation/NavigationStack';
import SplashScreen from "react-native-splash-screen";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {SocketContext, socket} from './utils/socket';
import messaging from "@react-native-firebase/messaging"
import {navigationNotfiRef} from './navigation/NavigationService';
import appConfig from './config/app-config'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getVersion
} from './services/loginUser';
import translate from "./utils/Text"
import Smartlook from 'smartlook-react-native-wrapper';


LogBox.ignoreAllLogs();
console.reportErrorsAsExceptions = false;

const { persistor, store } = configureStore();

const EntryPoint = (props:any) => {
  const [loader, setLoader] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState('false')
  const appState = useRef(AppState.currentState)
  
  useEffect(() => {
    const subscribe = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
         checkVersion()
      }
      appState.current = nextAppState
    })
    messaging().setAutoInitEnabled(true)
    messaging().getToken().then(token =>{
      console.log("token------",token,navigationNotfiRef?.current )
    })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        navigationNotfiRef.current
      );
      moveToCaller(remoteMessage)
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );          
        }       
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("messaging------",JSON.stringify(remoteMessage) )     
      moveToCaller(remoteMessage)     
    });

    setTimeout(() => {
      SplashScreen.hide();
      // store.dispatch(actions.loader("loader", false, 'LOADER'));
    }, 500)
    const smartlookKey = "d83e0308edbdd2a8e29e310ea675c65786431964";
    Smartlook.setupAndStartRecording(smartlookKey);
    return () => {
      subscribe?.remove()
      unsubscribe()
    };
  }, [])


  const moveToCaller = (remoteMessage: any) => {
    let notification = remoteMessage?.notification;
    let data = remoteMessage?.data
    let agoraData ={
      app_id:data?.app_id,
      channel_name:data?.channel_name,
      token:data?.token
    }
    let receivedUser ={
      name:data?.caller_name,
      image:data?.caller_image
    }
    if (data?.type && (data?.type == "audio_call"|| data?.type == "video_call")){
      Alert.alert(
        notification?.title,
        notification?.body,
        [
          {
            text: "Decline",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Accept", onPress: () => {
              if (data?.type == "audio_call") {
                  navigationNotfiRef?.current?.navigate('Zen.ChatAudio',{receivedUser: receivedUser, agoraData: agoraData })
              } else if (data?.type == "video_call"){
                  navigationNotfiRef?.current?.navigate('Zen.ChatVideo',{receivedUser: receivedUser, agoraData: agoraData })
              }
            }
          }
        ]
      )
    }
  }

  setI18nConfig();

  const forceUpdateAlert = () => {
    Alert.alert(
      'New Version Available',
     'Update your App to explore latest features.',
      [
        {
          text: "Update", onPress: () => {
            let link = Platform.OS == 'ios' ? appConfig.APP_STORE : appConfig.PLAY_STORE
            Linking.openURL(link)
          }
        }
      ]
    )
  }
  const checkVersion = async() => {
    const isLoggedIn = await AsyncStorage.getItem('loggedIn');
    if(isLoggedIn != null){
      setIsLoggedIn(isLoggedIn)
    }
    let payload = {
      module: 'payment',
      action: 'get_version',
    };
    const response = await getVersion({}, payload, 'GET');   
    let apiVersion = Platform.OS == 'android' ? response?.app_version[0]?.android : response?.app_version[0]?.ios
    let forceEnable = Platform.OS == 'android' ? response?.app_version[0]?.androidEnable : response?.app_version[0]?.iosEnable
    if(apiVersion != DeviceInfo.getVersion() && forceEnable == 1){
      setLoader(false)
      forceUpdateAlert()
    } else{
      setLoader(false)
    }
  }

  //to handle the intenet changes in the applicaiton
  NetInfo.addEventListener((state) => {
    let connection: any = state.isConnected //false
    store.dispatch(actions.noInternet('internetConnected', connection, 'INTERNET'));
  });
  return loader ? (
    <></>
  )
  :(
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ThemeContextProvider>
          <Navigator isLoggedIn={isLoggedIn}/>
          <Toast />
        </ThemeContextProvider>
        </PersistGate>
        </SocketContext.Provider>
    </Provider>
  );
};

export default EntryPoint;
