/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image, Text, ScrollView, SafeAreaView, Pressable, Platform, Linking, Alert } from 'react-native';
import Modal from 'react-native-modal'
import actionTypes from '../../../store/actions/types';
import CircularProgress from 'react-native-circular-progress-indicator'
import { FONTFAMILY } from '../../../config/font-config';
import translate from "../../../utils/Text"
import {shortNameFunc} from "../../../utils/commonFunction"
import EditProfile from '../../../assets/images/EditProfile.svg'
import AccountSetting from '../../../assets/images/AccountSetting.svg'
import AppVersion from '../../../assets/images/AppVersion.svg'
import LocationAccesss from '../../../assets/images/LocationAccesss.svg'
import Logout from '../../../assets/images/Logout.svg'
import Notifications from '../../../assets/images/Notifications.svg'
import PrivacyPolicy from '../../../assets/images/PrivacyPolicy.svg'
import Terms from '../../../assets/images/Terms.svg'
import Zencoins from '../../../assets/images/zencoins.svg';
import ReferEarn from '../../../assets/images/referearn.svg';
import MyBookmark from '../../../assets/images/mybookmarks.svg';
import MyOrder from '../../../assets/images/myorder.svg';
import Messages from '../../../assets/images/Messages.svg'
import Events from '../../../assets/images/events.svg'
import ImagePicker from 'react-native-image-crop-picker';
import style from './Style';
import Back from '../../../assets/images/Back.svg'
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import TermsAndPrivacy from "../../../components/TermsAndPrivacy"
import { getVersion, getBuildNumber } from 'react-native-device-info';
import AppHeader from '../../../components/CommonInput/appHeader';
import Call_Ic from '../../../assets/images/consultExperts.svg';
import ChatUs from '../../../assets/images/chat_us.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  
  const styles = style(props.theme);
  const theme = props.theme
  let data = useSelector((state) => state.onboardingReducer.userDetails);
  const imageData = useSelector((state) => state.onboardingReducer.profileImage);
  const [image, setImage] = useState(data?.data?.image)
  const [isPictureModal, setPictureModal] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const newName = data?.cancer_category?.name;

  useEffect(() => {
    if (data != null && Object.keys(data).length !== 0 &&  imageData != undefined && imageData?.data?.length > 0 && imageData?.data[0].image != data?.data?.image) {
      data.data.image = imageData?.data[0]?.image
      props.actions.callUserDetailsData("userDetails", data, actionTypes.ADD_USER_DETAILS_DATA)
      setImage(imageData?.data[0]?.image)
    }
   
  }, [imageData])

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      apiCallForEditImage(image)
    });
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      apiCallForEditImage(image)
    });
  }

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to Logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            props.actions.getCalendarData("calendarData", {}, actionTypes.GET_CALENDAR_DATA)
            props.actions.callUserDetailsData("userDetails", {}, actionTypes.ADD_USER_DETAILS_DATA)
            props.actions.editImageData("profileImage", {}, actionTypes.EDIT_IMAGE_DATA)
            props.actions.otpData('userData', {}, actionTypes.USER_DATA);
            props.actions.loggedIn('loginStatus', false, actionTypes.LOGIN_STATUS);
            AsyncStorage.setItem('loggedIn', 'false')
          }
        }
      ]
    );
  }

  const apiCallForEditImage = (image: any) => {
    setPictureModal(false)
    const formData = new FormData();
    if (image != undefined) {
      formData.append('image', { uri: image?.path, name: 'image.jpg', type: 'image/jpeg' });
    }
    formData.append('id', data?.data?.id);
    var inputRequest = {
      module: "userDetail",
      action: "update",
      formData: formData
    }
    props.actions.editImage(actionTypes.EDIT_IMAGE, inputRequest)
  }

  return (
    <>{
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
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
          <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={''}
                isRightComponent={false}  />
          <View style={styles.headerVw}>
            <Pressable onPress={() => setPictureModal(!isPictureModal)}>
              <Image style={styles.imgProfile} source={image == null || image == undefined ? require('../../../assets/images/profileImage.png') : { uri: image }} />
            </Pressable>
            <View style={styles.userNameDesVw} >
              <Text style={styles.userNameText} numberOfLines={1} >{data?.data?.name || 'User'}</Text>
              <Text style={styles.disText} numberOfLines={1}>
                  {shortNameFunc(data)}
                </Text>
              {/* <Text style={styles.subText} numberOfLines={1} >{newName ? newName?.trim() : '' + " - " + data?.cancer_stage?.cancer_stage ? data?.cancer_stage?.cancer_stage : ''}</Text>
              <Text style={[styles.subText, { marginTop: Platform.OS === 'ios' ? -5 : -5 }]} numberOfLines={1} >{data?.data?.chj_health_status?.name}</Text> */}
            </View>
            {/* <Pressable style={[styles.closeVw, , { right: 10, position: 'absolute' }]} onPress={() => {
          props.navigation.goBack()
        }} >
          <Image style={{
            resizeMode: 'contain',
            width: 15,
            height: 15,
            tintColor: theme.BLACK
          }} source={require('../../../assets/images/close.png')} />
        </Pressable> */}
          </View>

          <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
            <View style={styles.optionVw} >
              <Pressable style={styles.typesMainVw} onPress={() => {
                props.navigation.navigate("Zen.UserOnBoarding",{
                  isFromEdit: true
                })
              }}>
                <EditProfile width={23} height={23} />
                <Text style={styles.listText}>Edit Medical Profile</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              <Pressable style={styles.typesMainVw} onPress={() => { props.navigation.navigate('Zen.AccountSetting') }}>
                <AccountSetting width={23} height={23} />
                <Text style={styles.listText}>Account Settings</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              {/* <Pressable style={styles.typesMainVw} onPress={() =>{ props.navigation.navigate('Zen.Notification')} }>
              <Notifications width={23} height={23} />
              <Text style={[styles.listText, { width: '85%' }]}>{translate("DRAWER")["NOTIFICATION"]}</Text> 
           <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
              </View> 
            </Pressable>  */}

              <Pressable style={styles.typesMainVw} onPress={() => Linking.openSettings()}>
                <LocationAccesss width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["LOCATION_ACCESS"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              {/* <Pressable style={styles.typesMainVw} onPress={() => {props.navigation.navigate('Zen.ZenPoints')}}>
                <Zencoins width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["ZEN_COINS"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              <Pressable style={styles.typesMainVw} onPress={() => {props.navigation.navigate('Zen.ReferEarn')}}>
                <ReferEarn width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["REFER_EARN"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              <Pressable style={styles.typesMainVw} onPress={() => {props.navigation.navigate('Zen.MyBookmark')}}>
                <MyBookmark width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["MY_BOOKMARKS"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>

              <Pressable style={[styles.typesMainVw]} onPress={() => {props.navigation.navigate('Zen.MyOrders')}}>
                <MyOrder width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["MY_ORDERS"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable> */}

              {/* <Pressable style={[styles.typesMainVw, { borderBottomWidth: 0 }]} onPress={() => {props.navigation.navigate('Zen.MyAppointment')}}>
                <Events width={23} height={23} />
                <Text style={styles.listText}>My Appointment</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable> */}
            </View>

            <View style={styles.optionVw} >
            <Pressable style={styles.typesMainVw} onPress={() => {
              // let user = {
              //   name: "ZenOnco.io",
              //   image: "https://zenapp.s3.ap-south-1.amazonaws.com/zen/AppIcon.png",
              //   userId: 1,
              //   cancerName: "",
              //   cancerStage: ""
              // }
              // props.navigation.navigate('Zen.Chat', { user: user });
              Linking.openURL(`whatsapp://send?phone=${919880378899}`);
            }}>
                 <ChatUs width={22} height={22}/>
                <Text style={styles.listText}>Chat with Us</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>
            <Pressable style={styles.typesMainVw} onPress={() => {Linking.openURL(`tel:${'+919930709000'}`)}}>
                 <Call_Ic width={22} height={22}/>
                <Text style={styles.listText}>Call Us</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>
              <Pressable style={styles.typesMainVw} onPress={() => { Linking.openURL('mailto:care@zenonco.io') }}>
                <Messages width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["GIVE_FEEDBACK"]}</Text>
              </Pressable>
              <Pressable style={styles.typesMainVw} onPress={() => {
                setShowTerms(true)
                setShowPrivacy(false)
              }}>
                <Terms width={23} height={23} />
                <Text style={styles.listText}>{translate("LOGIN")["POLICY_TWO"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>
              <Pressable style={styles.typesMainVw} onPress={() => {
                setShowTerms(true)
                setShowPrivacy(true)
              }}>
                <PrivacyPolicy width={23} height={23} />
                <Text style={styles.listText}>{translate("LOGIN")["PRIVACY"]}</Text>
                <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                  <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
                </View>
              </Pressable>
              <Pressable style={styles.typesMainVw} onPress={() => { }}>
                <AppVersion width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["APP_VERSION"] + ': ' + getVersion()}</Text>
                {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
              <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
            </View> */}
              </Pressable>
              {/* <Pressable style={styles.typesMainVw} onPress={() => props.navigation.navigate('Zen.Summary')}>
            <Logout width={23} height={23} />
            <Text style={styles.listText}>{translate("DRAWER")["SUMMARY"]}</Text>
            <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
              <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
            </View>
          </Pressable> */}
              <Pressable style={[styles.typesMainVw, { borderBottomWidth: 0 }]} onPress={() => {
                logout()
              }}>
                <Logout width={23} height={23} />
                <Text style={styles.listText}>{translate("DRAWER")["LOGOUT"]}</Text>
                {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
              <Image style={styles.rightIcon} source={require('../../../assets/images/right.png')} />
            </View> */}
              </Pressable>
            </View>


            {/* <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["YOUR_UPGRADE"]}</Text>
          </Pressable>

          <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["SUBSCRIPTIONS"]}</Text>
          </Pressable>


          <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["My_Orders"]}</Text>
          </Pressable>

          <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["ACTIVITY_LOG"]}</Text>
          </Pressable>

          <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["REMINDERS"]}</Text>
          </Pressable>

          <Pressable style={styles.typesMainVw}>
            <Text style={styles.listText}>{translate("DRAWER")["Language"]}</Text>
          </Pressable> */}




            {/* <View style={styles.seprator} /> */}

            {/* <View style={styles.bottomItemView}> */}

            {/* <Pressable>
            <Text style={styles.listText}>{translate("DRAWER")["IO_ASSESMENT"]}</Text>
          </Pressable>

          <Pressable style={styles.pressStyle}>
            <Text style={styles.listText}>{translate("DRAWER")["DOWNLOAD_FREE"]}</Text>
          </Pressable>

          <Pressable style={styles.pressStyle}>
            <Text style={styles.listText}>{translate("DRAWER")["REPORT"]}</Text>
          </Pressable> */}

            {/* <Pressable style={styles.typesMainVw} onPress={() => {
            props.navigation.navigate("Zen.Faq")
            setSettingModalVisible(false)
            setModalDisplay(false)
          }}>
            <Text style={styles.listText}>{translate("DRAWER")["FAQs"]}</Text>
          </Pressable> */}

            {/* <Pressable style={styles.pressStyle}>
            <Text style={styles.listText}>{translate("DRAWER")["FINANCIAL_RESOURCES"]}</Text>
          </Pressable>

       
        {/* </View> */}
          </ScrollView>


          {/* <ScrollView style={styles.sideMenuContainer}> */}
          {/* <Pressable onPress={() => Linking.openURL(url)}>
            <IconText theme={theme} subTitle={"Chat with us"} Icon={<IonIcon name="md-chatbubble-outline" size={24} color={theme.DARK_GRAY} />} />
          </Pressable> */}
          {/* <Pressable onPress={() => {
            props.navigation.navigate("Zen.CreatePost")
            setSettingModalVisible(false)   
            setModalDisplay(false)   
          }}>
            <IconText theme={theme} subTitle={"Create Post"} Icon={<IonIcon name="md-chatbubble-outline" size={24} color={theme.DARK_GRAY} />} />
          </Pressable> */}
          {/* </ScrollView> */}
          {isPictureModal &&
            <Modal
              onBackdropPress={() => setPictureModal(false)}
              onBackButtonPress={() => setPictureModal(false)}
              isVisible={isPictureModal}
              style={styles.pictureModalContainer}>
              <Pressable style={styles.itemView} onPress={() => openCamera()} >
                <Image style={styles.cameraGalleryImage} source={require('../../../assets/images/camera.png')} />
                <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["CAMERA"]}</Text>
              </Pressable>
              <Pressable style={styles.itemView} onPress={() => openGallery()} >
                <Image style={styles.cameraGalleryImage} source={require('../../../assets/images/picture.png')} />
                <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["GALLERY"]}</Text>
              </Pressable>
            </Modal>
          }
        </SafeAreaView>
    }</>
  );
};
export default withTheme(Layout);
