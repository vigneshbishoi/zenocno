/**
 * Otp layout page
 * @Author: Anand R
 * @Date: Thu Nov 18 2021 22:03:40 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import { Text, Platform, Pressable, SafeAreaView, Linking, View, Image, Keyboard } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import CustomText from '../../../components/CustomText';
import { FONTFAMILY } from "../../../config/font-config";
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import actionTypes from '../../../store/actions/types'
import Edit from '../../../assets/images/edit_New.svg'
import SignUp from '../../../assets/images/SignedUp.svg'
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import translate from '../../../utils/Text'
import AppHeader from '../../../components/CommonInput/appHeader';
import Alert from "../../../components/AlertScreen/Index"
import AppLoader from '../../../components/Plugins/AppLoader';
import SmsRetriever from 'react-native-sms-retriever';
import RNOtpVerify from 'react-native-otp-verify';
import { sendChatPostPutRequest } from '../../../services/chat';
import messaging from "@react-native-firebase/messaging"
import NavigateButton from '../../../components/CommonInput/navigateButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Phone from '../../../assets/images/Phone.svg'
import Email from '../../../assets/images/Email.svg'
import Logo from '../../../assets/images/Logo_new.svg'

interface IProps {
  theme: any;
  navigation: any;
  code: number;
  timer: number;
  params: object;
  route: object;
  actions: object
}

const Layout = (props: IProps) => {    

  const styles = style(props.theme);
  const theme = props.theme
  const [mobile, updateMobile] = useState('')
  const [autoVerify, setAutoVerify] = useState(false)

  const [code, updateCode] = useState('')
  const [timer, updateTimer] = useState(30)
  const [success, setSucess] = useState(false)
  const [userId, setUserId] = useState()
  const [timerId, setTimerId] = useState()
  const [hit, setHit] = useState(false)
  const [showOtpError, setShowOtpError] = useState(false)
  const [otpEmptyError, setOtpEmtyError] = useState(false)
  const [showResendError, setResendError] = useState(false)
  const [token, setToken] = useState("")
  const [disableBtn, setButtonDisable] = useState(false)

  var timerTemp;

  var timeLeft = 30;
  // var timerId: any
  let user = useSelector((state: any) => state.loginReducer.userData);
  let userError = useSelector((state: any) => state.loginReducer.otpDataError)
  const loader = useSelector((state: any) => state.loginReducer.newLoader);

  if (user?.status == 1 && success == false) {
    if (timerId != null) {
      BackgroundTimer.clearInterval(timerId);
    }
    setData(user)
  }
  if (userError?.status == 0 && hit) {
    Toast.show({
      text1: 'Incorrect OTP !',
      text2: 'Please enter the correct OTP',
    })
    props.actions.userData('otpDataError', {}, actionTypes.BENIFIT_OBJECT);
    setHit(false)
  }
  const details = useSelector(state => state.loginReducer.userDetails)

  async function setData(user: any) {
    await AsyncStorage.setItem('token', user.data.token)

    // let payload = {
    //   module: 'user_notification',
    //   action: 'add-device-token',
    // };
    // let data = {
    //   device_token: token
    // };
    // const response = await sendChatPostPutRequest(data, payload, "put");
    // if (response) {
    //   // let data = response?     
    //   console.log("push notification ", response)
    // }
    if (props.route.params.newUser == 1) {
      await AsyncStorage.setItem('mobile', mobile)
      // props.navigation.navigate('Zen.SuccessMessage', { isSignup: true })
      props.navigation.navigate('Zen.UserOnBoarding',{
        isFromEdit: false
      })
      //props.actions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS)
      //props.navigation.navigate('Zen.Home')

      // setSucess(true)
    } else {
      let inputRequest = {
        module: 'userDetail',
        action: 'getById',
        formData: {
          "userId": props.route.params.userData.id,
        }
      }

      props.actions.callFetchDetails(actionTypes.FETCH_USER_DETAILS, inputRequest).then((res) => {
        props.actions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS);
      });
    }

  }

  const navigate = () => {
    let inputRequest = {
      module: 'user',
      action: 'verifyOtp',
      formData: {
        "userId": props.route.params.userData.id,
        "otp": code,
        "deviceToken": token
      }
    }
    if (code.length == 0) {
      Toast.show({
        text1: 'Incorrect OTP !',
        text2: 'Please enter the correct OTP',
      })
    }

    else {
      props.actions.newLoader('newLoader', true, actionTypes.NEW_LOADER);
      props.actions.verifyUser(actionTypes.V_USER, inputRequest);
      setHit(true)
    }
  }

  const reSendOtp = (() => {
    
    let inputRequest = {
      module: 'user',
      action: 'registration',
      formData: {
        phone: mobile,
        whatsapp_update: 1
      }
    }
    props.actions.callOtp(actionTypes.CALL_OTP, inputRequest);
    BackgroundTimer.clearTimeout(timerId);
    timeLeft = 30;
    // timerId = null
    updateTimer(30)
    timerTemp = BackgroundTimer.setInterval(() => {
      if (timeLeft == -1) {
        BackgroundTimer.clearTimeout(timerId);
      } else {
        updateTimer(timeLeft)
        timeLeft--;
      }

    }, 1000);
    setTimerId(timerTemp)
  })

  const getHash = () =>
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);

  useEffect(() => {
    if (Platform.OS == 'android') {
      getHash()
      startListeningForOtp()
    }

    messaging().getToken().then(token => {
      console.log("token------", token)
      setToken(token)
    })

    updateMobile(props.route.params.userData.phone)
    // updateMobile(props.route.params.userData.id)
    props.actions.otpData('otpData', { status: 0 }, actionTypes.OTP_DATA);
    props.actions.userData('otpDataError', {}, actionTypes.BENIFIT_OBJECT);


    // if (Platform.OS == "ios") {
    //   BackgroundTimer.start();
    // }
    timerTemp = BackgroundTimer.setInterval(() => {
      if (timeLeft == -1) {
        BackgroundTimer.clearInterval(timerId);
      } else {
        updateTimer(timeLeft)
        timeLeft--;
      }
    }, 1000);
    setTimerId(timerTemp)
    return () => {
      RNOtpVerify.removeListener();
    }
  }, [])

  useEffect(() => {
    if (code.length != 4) {
      setButtonDisable(true)
    } else {
      setButtonDisable(false)
      navigate()
    }
  }, [code])

  useEffect(() => {
    if (code.length > 0)
      navigate()
  }, [autoVerify])

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

  const otpHandler = (message: string) => {
    console.log("!23----", message)
    if (message.search('ZenOnco.io') != -1) {
      let a = (message.trim()).substr(0, 4);
      updateCode(a)
      setAutoVerify(true)
    }
    // RNOtpVerify.removeListener();
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} /> */}
      {!success ?
      <>
      <AppHeader
            theme={theme}
            onBackPress={() => props.navigation.pop()}
            headerTitle={''}
            isRightComponent={false} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          
          <View style={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <Logo />
              <Text style={styles.verifiCodeText} >{translate("LOGIN").LOGIN} </Text>
              <Text numberOfLines={2} style={styles.otpSent} >{translate("OTP").SENT_OTP}</Text>
              {/* <Text numberOfLines={2} style={styles.otpSent} >{translate("OTP").OTP_SENT}</Text> */}
              <View style={styles.typeContainer}>

                {props.route.params.countryCode == 91 ?
                  <CustomText style={styles.number} >+{props.route.params.userData?.phone}</CustomText>
                : <CustomText style={styles.number} >{props.route.params.userData.email}</CustomText>
                }
                <Pressable onPress={() => { props.navigation.pop() }}>
                  <Edit style={styles.input} />
                </Pressable>
              </View>

              <View style={styles.otpInputContainer}>

                <SmoothPinCodeInput
                  value={code}
                  codeLength={4}
                  cellSize={57}
                  cellSpacing={5}
                  textStyle={styles.textStyle}
                  textStyleFocused={{
                    color: theme.SECONDARY
                  }}
                  cellStyle={styles.cellStyle}

                  cellStyleFocused={{
                    borderColor: theme.SECONDARY,
                  }}
                  placeholder={''}
                  // value={code}
                  // filledData={component.state.code}
                  onTextChange={(value: string) => {
                    updateCode(value)
                    if (value.length == 4)
                      Keyboard.dismiss()
                  }}
                  // onFulfill={(code: string) => console.log(code)}
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{ marginTop: Platform.OS === 'ios' ? 15 : 10, marginBottom: Platform.OS === 'ios' ? 10 : 7, width: '95%' }} >
                <NavigateButton disabled={disableBtn} height={41} theme={theme} buttonText={translate("COMMONTEXT").VERIFY} backgroundColor={disableBtn ? theme.OTP_BORDER : theme.SECONDARY} onPress={navigate} />
              </View>
              <View style={styles.helpContainer} >
              <Text style={[styles.helpLineText]} numberOfLines={1}>{translate("LOGIN")["HELPLINE"]}</Text>
                    <View style={{alignItems:"center"}}>
                      <Pressable style={[styles.helpLineView]} onPress={() => Linking.openURL(`tel:${'+919930709000'}`)}>
                        <Phone height={20} width={20} />
                        <Text style={[styles.helpLineText, { color: theme.SECONDARY, marginLeft: 5 }]} numberOfLines={1}>{translate("LOGIN")["HELPLINE_NUMBER"]}</Text>
                      </Pressable>
                      <Pressable style={[styles.helpLineView,{marginTop:5, marginLeft: 10}]} onPress={() => Linking.openURL('mailto:care@zenonco.io')}>
                        <Email height={20} width={20} />
                        <Text style={[styles.helpLineText, { color: theme.SECONDARY, marginLeft: 8  }]} numberOfLines={1}>{translate("LOGIN")["HELPLINE_EMAIL"]}</Text>
                      </Pressable>
                    </View>

                {timer <= 0 ?
                  <View style={[styles.otpIns, { marginTop: 30 }]}>
                    <CustomText style={[styles.termStyle]}>{translate("OTP").NOT_RECEIVE_OTP}</CustomText>
                    <Pressable onPress={() => { timer != 1 && (reSendOtp()) }}>
                      <CustomText style={styles.resendOtp}>{translate("OTP").RESEND}</CustomText>
                    </Pressable>
                  </View>
                  :
                  <CustomText style={[styles.termStyle, { marginTop: 30, }]}>{translate("OTP").WAITING_FOR_OTP}...
                    <CustomText style={{ color: theme.SUB_TITLE }}>{timer}s</CustomText>
                  </CustomText>
                }

                {/* <CustomText style={[styles.termStyle, { marginTop: 30, }]}>{translate("OTP").WAITING_FOR_OTP}...
                  <CustomText style={{ color: theme.SUB_TITLE }}>{timer}s</CustomText>
                </CustomText>
                {timer <= 0 &&
                  <View style={styles.otpIns}>
                    <CustomText style={[styles.termStyle]}>{translate("OTP").NOT_RECEIVE_OTP}</CustomText>
                    <Pressable onPress={() => { timer != 0 ? (setResendError(true)) : (reSendOtp()) }}>
                      <CustomText style={styles.resendOtp}>{translate("OTP").RESEND}</CustomText>
                    </Pressable>
                  </View>
                } */}
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* {error == '' &&
                <CustomText style={{ color: 'red' }}>{error}----</CustomText>
              } */}
              </View>
              {/* <Pressable onPress={() => navigate()} style={[styles.btn, { marginTop: timer <= 0 ? 50 : 70 }]}> */}

            </View>
          </View>
        </KeyboardAwareScrollView>
        </>
        :
        <View style={styles.sucMsgContainer} >
          {/* <Pressable onPress={() => { props.navigation.pop() }} style={{ flex: .1, width: '10%' }}>
            <Back width={15} height={20} style={{ margin: 15, }} />
          </Pressable>
          <View style={styles.msgContainer} >
            <Logo width={250} height={80} />
          </View>
          <View style={styles.msg} >
            <SignUp width={100} height={100} />
            <CustomText style={styles.msgText} >{translate("OTP").SIGNED_UP}</CustomText>
          </View>

          <CustomText style={styles.welcomText} >{translate("OTP").WELCOME}</CustomText> */}
        </View>
      }
      {/* <Alert
        show={showResendError}
        // showProgress={false}
        title={"Resend OTP"}
        message={`wait for the ${timer}S to resend OTP`}
        closeOnTouchOutside={{ setShowAlert: setResendError }}
        closeOnHardwareBackPress={true}
        // showCancelButton={ }
        showConfirmButton={true}
        // cancelText={ }
        confirmText={"ok"}
        // customView={ }
        onConfirmPressed={() => {
          setResendError(false)
        }}
      // onCancelPressed={() => {
      //   component.decideConfirmationFunction(component.state.cancelAcion);
      //   component.setState({showAlert: false })
      // }}
      /> */}
    </SafeAreaView >
  );
};
export default withTheme(Layout);