/**
 * Chat Video Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Chat Video Screen
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  Pressable,
  Platform,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import translate from '../../../utils/Text'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoader from '../../../components/Plugins/AppLoader';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import Alert from "../../../components/AlertScreen/Index"

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
  route: object

}
const Layout = (props: IProps) => {

  const agoraData = props.route.params?.agoraData ? props.route.params?.agoraData : null
  const appId = props.route.params?.agoraData?.app_id
  const channelName = props.route.params?.agoraData?.channel_name
  const token = props.route.params?.agoraData?.token

  // const appId = "c059cb115a3a415d95490a884bf2e7e4"
  // const channelName = "channel_zenonce"
  // const token = "006c059cb115a3a415d95490a884bf2e7e4IAAS11IEoPI6FPJ8tThRuPaMwTop8+bLtTXLPAhgNvUOm8rT0moh39v0IgBGaecqBwPYYgQAAQATvNZiAgATvNZiAwATvNZiBAATvNZi"

  const styles = style(props.theme);
  const theme = props.theme
  const receivedUser = props.route.params.receivedUser;
  const [engine, setEngine] = useState(undefined);
  const [peerIds, setPeerIds] = useState([])
  const [joinSucceed, setJoinSucceed] = useState(true)
  const [isLoader, setIsLoader] = useState(false)
  const [switchCamera, setSwitchCamera] = useState(true)
  const [openMicroPhone, setOpenMicrophone] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // variable used by cleanup function
    let isSubscribed = true;

    // create the function
    const createEngine = async () => {
      console.log("inside engine");
      try {
        if (Platform.OS === 'android') {
          // Request required permissions from Android
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA
          ])
        }

        console.log("inside try");
        const rtcEngine = await RtcEngine.create(appId);
        await rtcEngine.enableVideo();
        await rtcEngine.startPreview();
        // need to prevent calls to setEngine after the component has unmounted
        if (isSubscribed) {
          setEngine(rtcEngine);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // call the function
    if (!engine) createEngine();

    engine?.addListener('Warning', (warn) => {
      console.log('Warning', warn)
    })

    engine?.addListener('Error', (err) => {
      console.log('Error', err)
      if (err == 109) { setShowAlert(true) }
    })

    engine?.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed)
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        // Add peer ID to state array
        setPeerIds([...peerIds, uid])
      }
    })

    engine?.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason)
      // Remove peer ID from state array
      setPeerIds(peerIds.filter(id => id !== uid))
    })

    // If Local user joins RTC channel
    engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed)
      if (isSubscribed) {
        // Set state variable to true
        setJoinSucceed(true)
        setIsLoader(false)
      }
    })

    startCall();

    // return a cleanup
    return () => {
      console.log('unmount')
      isSubscribed = false;
      console.log(engine)
      engine?.removeAllListeners();
      engine?.destroy();
    }

  },
    // will run once on component mount or if engine changes
    [engine]
  );
  /**
  * @name startCall
  * @description Function to start the call
  */
  const startCall = async () => {
    // Join Channel using null token and channel name
    await engine?.joinChannel(token, channelName, null, 0)
    console.log('startCall')
  }

  const _switchCamera = async () => {
    engine?.switchCamera()
      .then(() => {
        setSwitchCamera(!switchCamera);
      })
      .catch((err) => {
        console.log('switchCamera', err);
      });
  };

  const _switchMicrophone = async () => {
    engine?.enableLocalAudio(!openMicroPhone)
      .then(() => {
        setOpenMicrophone(!openMicroPhone);
      })
      .catch((err) => {
        console.log('_switchMicrophone', err);
      });
  };

  /**
  * @name endCall
  * @description Function to end the call
  */
  const endCall = async () => {
    setPeerIds([])
    setJoinSucceed(false)
    setIsLoader(false)
    await engine?.leaveChannel()
    props.navigation.goBack()
  }

  const renderRemoteVideos = () => {
    return (
      <ScrollView horizontal={true} style={styles.remoteContainer}>
        {peerIds.map((value, index) => (
          <Pressable
            key={index}
            style={styles.remote}>
            <RtcRemoteView.SurfaceView
              style={styles.container}
              uid={value}
              zOrderMediaOverlay={true}
            />
          </Pressable>
        ))}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {engine // check if we have an engine and not undefined
          ?
          <View style={{ height: '100%', width: '100%' }}>
            {joinSucceed ? <View style={{ flex: 1, flexDirection: "column" }}>
              <RtcLocalView.SurfaceView
                style={{ flex: 1 }}
                channelId={channelName}
              />
              <View style={styles.bottonLayoutView}>
                <Pressable style={styles.buttonView} onPress={() => _switchCamera()} >
                  <MaterialIcon name="rotate-left" color={'white'} size={25} />
                </Pressable>
                <Pressable style={styles.buttonCloseView} onPress={() => endCall()} >
                  <MaterialIcon name="phone-hangup" color={'white'} size={22} />
                </Pressable>
                <Pressable style={styles.buttonView} onPress={() => _switchMicrophone()} >
                  {openMicroPhone ?
                    <Icon name="microphone" color={'white'} size={18} />
                    :
                    <Icon name="microphone-slash" color={'white'} size={18} />
                  }
                </Pressable>
              </View>
            </View> : null}
            {renderRemoteVideos()}
          </View> // if we know that we have an engine, we can do something with it
          :
          <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} /> // show a loading component while waiting for createEngine to finish 
        }
      </View>
      <Alert
        show={showAlert}
        title={"Sorry !"}
        message={"Error while connecting please try again later."}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"OK"}
        onConfirmPressed={() => {
          props.navigation.goBack()
        }}
      />
    </View>
  )
};
export default withTheme(Layout);