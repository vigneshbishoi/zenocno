/**
 * Login layout page
 * @Author: Anand R
 * @Date: Fri Nov 12 2021 13:46:28 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useRef, useState, useEffect, ReactElement } from 'react';
import style from './Style';
import { View, SafeAreaView, Pressable, Keyboard, StatusBar, Platform, Linking, Image } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import { FONTFAMILY } from "../../../config/font-config";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from "react-native-phone-number-input";
import Toast from 'react-native-toast-message';
import actionTypes from '../../../store/actions/types'
import { useSelector } from "react-redux";
import Alert from "../../../components/AlertScreen/Index"
import AppLoader from '../../../components/Plugins/AppLoader';
import { useIsFocused } from "@react-navigation/native";
import SmsRetriever from 'react-native-sms-retriever';
import TermsAndPrivacy from "../../../components/TermsAndPrivacy"
import Back from '../../../assets/images/Back.svg'
import Phone from '../../../assets/images/Phone.svg'
import Email from '../../../assets/images/Email.svg'
import Logo from '../../../assets/images/Logo_new.svg'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigateButton from '../../../components/CommonInput/navigateButton';
import CommonTextInput from '../../../components/CommonInput/commonTextInput';
import AppHeader from '../../../components/CommonInput/appHeader';
import { IMGElement } from 'react-native-render-html';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('91')
  const [terms, updateTerms] = useState(true)
  const [whatsApp, updateWhatsApp] = useState(true)
  const phoneInput = useRef<PhoneInput>(null);
  const whatsapp_update = 1
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [disableBtn, setDissableBtn] = useState(false)
  const loader = useSelector((state: any) => state.loginReducer.loader);
  const referralResponse = useSelector((state: any) => state.loginReducer.referralCode);

  const isFocused = useIsFocused();
  const [showTerms, setShowTerms] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showReferral, setReferral] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false);
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


  useEffect(() => {
    props.actions.userData('userData', {}, actionTypes.BENIFIT_OBJECT);
    if (isFocused) {
      setTimeout(() => {
        _onPhoneNumberPressed()
      }, 500)
    }
    // if (!terms || mobile.length !== 10 || showError) {
    //   setDissableBtn(true);
    // } else {
    //   setDissableBtn(false)
    // }
  }, [terms, mobile, isFocused])
  const setData = () => {
    otpData.data.email = email
    props.navigation.navigate('Zen.Otp', { userData: otpData.data, newUser: otpData.newUser, otpData: otpData, countryCode: code })
  }
  const _onPhoneNumberPressed = async () => {
    if (mobile == '') {
      try {
        const phoneNumber = await SmsRetriever.requestPhoneNumber();
        let number = phoneNumber.replace('+91', '')
        console.log(phoneNumber, number);
        setMobile(number)
        phoneInput.current.setState({ number: number })

      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
  };
  let otpData = useSelector((state: any) => state?.loginReducer?.otpData);

  const apicallForReferralCode = () => {
    let obj = {
      phone: code + mobile,
      referral_code: referralCode,
    }
    props.actions.referralCode(actionTypes.REFERRAL_CODE, {
      module: 'referral_apply',
      action: 'create_referal_apply',
      formData: obj
    });
  }

  if (otpData?.status === 1) {
    setData()
  } else if (otpData?.status === 0 && otpData?.message) {

  }

  useEffect(() => {
    if (referralResponse) {
      if (referralResponse.status == 1) {
        navigate();
        props.actions.referralCodeData(
          'referralCode',
          [],
          actionTypes.REFERRAL_CODE_DATA
        )
      } else if (referralResponse.status == 0) {
        Toast.show({
          text1: 'Sorry !',
          text2: referralResponse.message,
        })

        props.actions.referralCodeData(
          'referralCode',
          [],
          actionTypes.REFERRAL_CODE_DATA
        )
        // setShowAlert(true)
        // setShowErrorMsg('Invalid referral code')
        // setShowErrorMsg(referralResponse.message)
      }

      // setShowAlert(true)
      // setShowErrorMsg(referralResponse.message)
      // navigate();
      // props.actions.referralCodeData(
      //   'referralCode',
      //    [],
      //    actionTypes.REFERRAL_CODE_DATA
      // )
    }
  }, [referralResponse])
  const validate = () => {
    Keyboard.dismiss();
    debugger;
    if (mobile.trim().length == 0) {
      Toast.show({
        text1: 'Error',
        text2: 'Please enter valid number',
      })
    } else if(code != '91'){
       if (email == '' || reg.test(email) == false) {
      setErrorEmail(true);
      Toast.show({
        text1: 'Incorrect Email',
        text2: 'Please enter correct email id',
      })
     } else if (reg.test(email) == true && terms) {
      setErrorEmail(false);
      if (referralCode.length > 0) {
        apicallForReferralCode();
      } else {
        navigate();
        props.actions.referralCodeData(
          'referralCode',
          [],
          actionTypes.REFERRAL_CODE_DATA
        )
      }
    }
    } else if (email.length > 0 && !reg.test(email) == true) {
      setErrorEmail(true);
      Toast.show({
        text1: 'Incorrect Email',
        text2: 'Please enter correct email id',
      })
    } else {
      if (referralCode.length > 0) {
        apicallForReferralCode();
      } else {
        navigate();
        props.actions.referralCodeData(
          'referralCode',
          [],
          actionTypes.REFERRAL_CODE_DATA
        )
      }
    }
     

    // if (code != 91) {
    //   if(mobile.trim().length == 0){
    //     Toast.show({
    //       text1: 'Error',
    //       text2: 'Please enter valid number',
    //     })
    //   } else if (email == '' || reg.test(email) == false) {
    //     setErrorEmail(true);
    //     Toast.show({
    //       text1: 'Incorrect Email',
    //       text2: 'Please enter correct email id',
    //     })
    //   } else if (reg.test(email) == true && terms ) {
    //       setErrorEmail(false);
    //       if (referralCode.length > 0) {
    //         apicallForReferralCode();
    //       } else {
    //         navigate();
    //         props.actions.referralCodeData(
    //           'referralCode',
    //           [],
    //           actionTypes.REFERRAL_CODE_DATA
    //         )
    //       }

    //   } else if (reg.test(email) == true && terms) {
    //     setErrorEmail(false);
    //     if (referralCode.length > 0) {
    //       apicallForReferralCode();
    //     } else {
    //       navigate();
    //       props.actions.referralCodeData(
    //         'referralCode',
    //         [],
    //         actionTypes.REFERRAL_CODE_DATA
    //       )
    //     }
    //   }
    // }
    //  else {
    //   if (email != '') {
    //     if(mobile.trim().length == 0){
    //       Toast.show({
    //         text1: 'Error',
    //         text2: 'Please enter valid number',
    //       })
    //     } else if(reg.test(email) == false) {
    //       setErrorEmail(true);
    //       Toast.show({
    //         text1: 'Incorrect Email',
    //         text2: 'Please enter correct email id',
    //       })
    //     } else if (terms && reg.test(email) == true) {
    //       setErrorEmail(false);
    //       if (referralCode.length > 0) {
    //         apicallForReferralCode();
    //       } else {
    //         navigate();
    //         props.actions.referralCodeData(
    //           'referralCode',
    //           [],
    //           actionTypes.REFERRAL_CODE_DATA
    //         )
    //       }
    //     }
    //   } else if (terms) {
    //     setErrorEmail(false);
    //     if(mobile.trim().length == 0){
    //       Toast.show({
    //         text1: 'Error',
    //         text2: 'Please enter valid number',
    //       })
    //     } else if (referralCode.length > 0) {
    //       apicallForReferralCode();
    //     } else {
    //       navigate();
    //       props.actions.referralCodeData(
    //         'referralCode',
    //         [],
    //         actionTypes.REFERRAL_CODE_DATA
    //       )
    //     }

    //     // } else {        
    //     //   Toast.show({
    //     //     text1: 'Sorry !',
    //     //     text2: translate("OTP").INVALID_MOBILE,
    //     //   })
    //     //   // setShowAlert(true)
    //     //   // setShowErrorMsg(translate("OTP").INVALID_MOBILE)
    //     // }

    //   } else{
    //     setErrorEmail(true);
    //         Toast.show({
    //           text1: 'Incorrect Email',
    //           text2: 'Please enter correct email id',
    //         })
    //   }
    // }

    // if (mobile.length != 10) {
    //   setShowAlert(true)
    //   setShowErrorMsg(translate("OTP").INVALID_MOBILE)
    // } else if (mobile.length == 10 && terms && !disableBtn) {
    //   setErrorEmail(false);
    //   if (referralCode.length > 0) {
    //     apicallForReferralCode();
    //   } else {
    //     navigate();
    //     props.actions.referralCodeData(
    //       'referralCode',
    //       [],
    //       actionTypes.REFERRAL_CODE_DATA
    //     )
    //   }
    // }
  }
  const navigate = () => {
    props.actions.loader('loader', true, actionTypes.NEW_LOADER);
    setDissableBtn(true)
    let inputRequest = {
      module: 'user',
      action: 'registration',
      formData: {
        phone: code + mobile,
        whatsapp_update: whatsapp_update,
        email: email
      }
    }
    props.actions.callOtp(actionTypes.CALL_OTP, inputRequest);

  }
  const onchaneInput = (number: any) => {
    setMobile(number)
  }

  return (
    <>
      {
        showTerms ?
          <TermsAndPrivacy
            logo={""}
            text={"read our privacy policy"}
            title={"welcome to zenonco"}
            theme={theme}
            navigation={props.navigation}
            setShowTerms={setShowTerms}
            showPrivacy={showPrivacy}
            setShowPrivacy={setShowPrivacy} />
          :
          <SafeAreaView
            style={styles.container} >
            <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} >
              <View style={styles.content_container}>
                <Logo />
                <Text style={styles.headerText} numberOfLines={1} >{translate('LOGIN').LOGIN}</Text>
                <Text numberOfLines={1} style={styles.loginPlaceText} >{translate('LOGIN').WELCOME_TEXT}</Text>
                <View style={{ marginTop: Platform.OS === 'ios' ? 35 : 25 }} >
                  {mobile.length > 0 && <Text numberOfLines={1} style={[styles.commonText, { fontSize: 12 }]} >{translate('CHECKOUT').PHONE}</Text>}
                  <PhoneInput
                    ref={phoneInput}
                    containerStyle={styles.inputBox}
                    textInputStyle={[styles.commonText, { marginTop: Platform.OS === 'android' ? 5 : 0, height: 48, color: theme.SECONDARY, marginLeft: -30 }]}
                    codeTextStyle={[styles.commonText, { marginTop: Platform.OS === 'android' ? 6 : 6, alignSelf: "flex-start", marginLeft: -20 }]}
                    textContainerStyle={{ paddingVertical: 0, backgroundColor: theme.PRIMARY }}
                    defaultCode="IN"
                    defaultValue={mobile}
                    layout="second"
                    placeholder={translate("LOGIN")["NUMBER_ENTRY"]}
                    textInputProps={{ value: mobile, placeholderTextColor: theme.SUB_TITLE }}
                    onChangeCountry={(country) => {
                      setCode(country.callingCode[0] != undefined ? country.callingCode[0] : '')
                      phoneInput.current.setState({ number: "" })
                      onchaneInput('');
                    }}
                    onChangeText={(number) => {
                      onchaneInput(number);
                      let num = number
                      var check = num.match(/^[0-9]+$/) != null;
                      if (num.length == 10)
                        Keyboard.dismiss()

                      if (check) {
                        setShowError(false)
                      }
                      else {
                        if (code == 91) {
                          if (number == "") {
                            setShowError(false)
                          }
                          else {
                            setShowError(true)
                          }
                        }
                      }
                    }}
                    countryPickerProps={{
                      withAlphaFilter: true
                    }}
                    // withDarkTheme
                    // withShadow
                    autoFocus
                    textInputProps={{ maxLength: 10 }}
                  />
                  {
                    showError ? (
                      <Text style={styles.invalidText}>{translate("OTP").INVALID_MOBILE}</Text>
                    ) : (
                      <Text></Text>
                    )
                  }
                </View>
                {/* {code != 91 && */}
                <CommonTextInput
                  theme={theme}
                  placeHolder={translate("LOGIN")["ENTER_MAIL"]}
                  value={email}
                  keyboardType={'email-address'}
                  isErrowShow={errorEmail}
                  onChangeText={email => { setEmail(email); }} />
                {/* } */}
                {showReferral ?
                  <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 22 : 12 }}>
                    <CommonTextInput
                      theme={theme}
                      placeHolder={translate("LOGIN")["ENTER_CODE"]}
                      value={referralCode}
                      onChangeText={value => setReferralCode(value)} />
                    {referralCode.length > 0 &&
                      <Pressable style={styles.closeImageVw} onPress={() => { setReferralCode('') }}>
                        <Image
                          style={{ width: 12, height: 12 }}
                          source={require("../../../assets/images/close.png")}
                        />
                      </Pressable>}
                  </View> :
                  <Pressable onPress={() => setReferral(true)} style={{ marginTop: code != 91 ? 22 : 12 }} >
                    <Text style={styles.referralCodeText} numberOfLines={1} >{translate("LOGIN")["ADD_CODE"]}</Text>
                  </Pressable>}
                <View style={[styles.footerContainer]} >

                  {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <MaterialCommunityIcons onPress={() => { updateWhatsApp(!whatsApp) }} name={whatsApp ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={30} color={theme.SECONDARY} />

                <Text style={[styles.termStyle, { marginTop: 7 }]}>
                  {translate("LOGIN").POLICY_THREE}
                  <Text style={styles.termStyle}> {translate("LOGIN")["WHATSAPP"]}</Text></Text>
              </View> */}
                  <View style={{ marginTop: Platform.OS === 'ios' ? 30 : 25, marginBottom: Platform.OS === 'ios' ? 10 : 7 }} >
                    <NavigateButton height={41} width={'95%'} theme={theme} buttonText={translate("COMMONTEXT").CONTINUE} backgroundColor={theme.SECONDARY} onPress={() => {
                      validate()
                    }} />
                  </View>
                </View>

                <View style={styles.helpContainer} >
                  <Text style={[styles.helpLineText]} numberOfLines={1}>{translate("LOGIN")["HELPLINE"]}</Text>
                  <View style={{ alignItems: "center" }}>
                    <Pressable style={[styles.helpLineView]} onPress={() => Linking.openURL(`tel:${'+919930709000'}`)}>
                      <Phone height={20} width={20} />
                      <Text style={[styles.helpLineText, { color: theme.SECONDARY, marginLeft: 5 }]} numberOfLines={1}>{translate("LOGIN")["HELPLINE_NUMBER"]}</Text>
                    </Pressable>
                    <Pressable style={[styles.helpLineView, { marginTop: 5, marginLeft: 10 }]} onPress={() => Linking.openURL('mailto:care@zenonco.io')}>
                      <Email height={20} width={20} />
                      <Text style={[styles.helpLineText, { color: theme.SECONDARY, marginLeft: 8 }]} numberOfLines={1}>{translate("LOGIN")["HELPLINE_EMAIL"]}</Text>
                    </Pressable>
                  </View>

                  {/* <View style={styles.helpVw} >
                    <Text style={styles.helpLineText} numberOfLines={1} >{translate("LOGIN")["HELPLINE"]}</Text>
                  </View>
                  <View style={{width:'100%', backgroundColor:"red"}}>
                  <Pressable style={styles.helpVw} onPress={() => Linking.openURL(`tel:${'+919930709000'}`)}  >
                      <Image source={require('../../../assets/images/pin.png')} style={styles.iconStyle} />                      
                      <Text style={[styles.helpLineText, { color: theme.SECONDARY }]} numberOfLines={1} >{translate("LOGIN")["HELPLINE_NUMBER"]}</Text>
                  </Pressable>
                  <Pressable style={[styles.helpVw,{marginLeft:30}]} onPress={() => Linking.openURL('mailto:care@zenonco.io')} >
                    <Image source={require('../../../assets/images/pin.png')} style={styles.iconStyle} />                      
                    <Text style={[styles.helpLineText, { color: theme.SECONDARY, marginTop: 5 }]} numberOfLines={1} >{translate("LOGIN")["HELPLINE_EMAIL"]}</Text>
                  </Pressable> 
                  </View> */}
                  <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    {/* <MaterialCommunityIcons onPress={() => { updateTerms(!terms) }} name={terms ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={20} color={theme.SECONDARY} style={{marginTop: 5}}/> */}
                    <Text style={[styles.termStyle, { marginTop: 7 }]}>
                      {translate('LOGIN').POLICY_ONE}
                    </Text>
                    <Text style={{ marginTop: Platform.OS === 'ios' ? 3 : 0 }} >
                      <Text style={[styles.termStyle, { color: theme.SECONDARY }]} onPress={() => {
                        setShowTerms(true)
                        setShowPrivacy(false)
                      }}>{translate('LOGIN').POLICY_TWO} </Text>
                      <Text style={[styles.termStyle]}>& </Text>
                      <Text style={[styles.termStyle, { color: theme.SECONDARY }]} onPress={() => {
                        setShowTerms(true)
                        setShowPrivacy(true)
                      }}>{translate('LOGIN').PRIVACY} </Text>
                    </Text>
                  </View>
                </View>

              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
      }

      {/* <Alert
        show={showAlert}
        title={"Sorry !"}
        message={showErrorMsg}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"OK"}
        onConfirmPressed={() => {
          if (!terms)
            updateTerms(true)
          setShowAlert(false)
        }}
      /> */}
    </>
  );
};
export default withTheme(Layout);