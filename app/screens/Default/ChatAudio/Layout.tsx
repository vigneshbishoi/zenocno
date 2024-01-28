/**
 * Chat Audio Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Chat Audio Screen
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  Pressable,
  Platform,
  PermissionsAndroid,
  Image,
  Text
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoader from '../../../components/Plugins/AppLoader';
import RtcEngine from 'react-native-agora';
import Alert from "../../../components/AlertScreen/Index"
import translate from '../../../utils/Text'

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
  // const token = "006c059cb115a3a415d95490a884bf2e7e4IAAQA3+unzV9nd/8CVqwlAW03B9MVhr0j5TBUipGj+6INxOUCE4AAAAAEACkKU4C0PXXYgEAAQDP9ddi"

  const styles = style(props.theme);
  const theme = props.theme
  const receivedUser = props.route.params?.receivedUser;
  const otherUser = props.route.params?.otherUser;
  const [engine, setEngine] = useState(undefined);
  const [peerIds, setPeerIds] = useState([])
  const [joinSucceed, setJoinSucceed] = useState(true)
  const [isLoader, setIsLoader] = useState(false)
  const [enableSpeakerphone, setEnableSpeakerPhone] = useState(true)
  const [openMicroPhone, setOpenMicrophone] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  console.log("appId------------", appId, channelName, token, agoraData);

  useEffect(() => {
    // variable used by cleanup function
    let isSubscribed = true;

    if (agoraData != null) {

      // create the function
      const createEngine = async () => {
        console.log("inside engine");
        try {
          if (Platform.OS === 'android') {
            // Request required permissions from Android
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            )
          }

          console.log("inside try");
          const rtcEngine = await RtcEngine.create(appId);
          await rtcEngine.enableAudio();
          // need to prevent calls to setEngine after the component has unmounted
          if (isSubscribed) {
            setEngine(rtcEngine);
          }
        } catch (e) {
          console.log("e", e);
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
    }
    // return a cleanup
    return () => {
      if (agoraData != null) {
        console.log('unmount')
        isSubscribed = false;
        console.log(engine)
        engine?.removeAllListeners();
        engine?.destroy();
      }
    }

  },
    // will run once on component mount or if engine changes
    [engine && agoraData != null]
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

  const _switchSpeakerPhone = async () => {
    engine?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        setEnableSpeakerPhone(!enableSpeakerphone);
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

  return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {engine // check if we have an engine and not undefined
            ?
            <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <View style={{ justifyContent: "center", height: "90%" }}>
                {receivedUser &&
                  <View style={styles.userProfileVw}>
                    {receivedUser?.image != null ? (
                      <Image style={styles.userImg} source={{ uri: receivedUser?.image }} />
                    ) : (
                      <Image
                        style={styles.userImg}
                        source={require('../../../assets/images/profileImage.png')}
                      />
                    )}
                    <Text style={styles.userName}>
                      {receivedUser?.name
                        ? receivedUser?.name
                        : ""}
                    </Text>
                  </View>
                }
                {otherUser &&
                  <View style={styles.userProfileVw}>
                    {otherUser?.image != null ? (
                      <Image style={styles.userImg} source={{ uri: otherUser?.image }} />
                    ) : (
                      <Image
                        style={styles.userImg}
                        source={require('../../../assets/images/profileImage.png')}
                      />
                    )}
                    <Text style={styles.userName}>
                      {otherUser?.name
                        ? otherUser?.name
                        : ""}
                    </Text>
                  </View>
                }
              </View>
              {joinSucceed ? <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={styles.bottonLayoutView}>
                  <Pressable style={styles.buttonView} onPress={() => _switchSpeakerPhone()} >
                    {enableSpeakerphone ?
                      <MaterialIcon name="volume-high" color={theme.PRIMARY} size={25} />
                      :
                      <MaterialIcon name="volume-off" color={theme.PRIMARY} size={25} />
                    }
                  </Pressable>
                  <Pressable style={styles.buttonCloseView} onPress={() => endCall()} >
                    <MaterialIcon name="phone-hangup" color={theme.PRIMARY} size={22} />
                  </Pressable>
                  <Pressable style={styles.buttonView} onPress={() => _switchMicrophone()} >
                    {openMicroPhone ?
                      <Icon name="microphone" color={theme.PRIMARY} size={18} />
                      :
                      <Icon name="microphone-slash" color={theme.PRIMARY} size={18} />
                    }
                  </Pressable>
                </View>
              </View> : null}
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