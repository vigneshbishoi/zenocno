import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, Pressable, Platform, LayoutAnimation, Alert,Linking } from 'react-native';
import Modal from 'react-native-modal'
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import Community from '../../assets/images/Community.svg'
import AntiCancerDiet from '../../assets/images/AntiCancerDiet.svg'
import Wellness from '../../assets/images/Wellness.svg'
import AIMatched from '../../assets/images/AIMatched.svg'
import ClinicTrials from '../../assets/images/ClinicTrials.svg'
import ConsultCoach from '../../assets/images/ConsultCoach.svg'
import GetMedicine from '../../assets/images/GetMedicine.svg'
import Journal from '../../assets/images/Journal.svg'
import MedicalRecords from '../../assets/images/MedicalRecords.svg'
import Calendar from '../../assets/images/Calendar.svg'
import ConsultOncologist from '../../assets/images/consult_oncologist.svg'
import LeaderBoard from '../../assets/images/leaderboard.svg'
import HelpSupport from '../../assets/images/help.svg'
import Review from '../../assets/images/review.svg'
import Messages from '../../assets/images/Messages.svg'
import Symptoms from '../../assets/images/Symptoms.svg'
import Events from '../../assets/images/events.svg'
import News from '../../assets/images/news.svg'
import Pateint from '../../assets/images/Patient.svg'
import VitalMonitoring from '../../assets/images/vital_monitoring.svg'
import FinancialResources from '../../assets/images/financialResources.svg'
import Blog from '../../assets/images/Blog.svg'
import MeetCancerWarrior from '../../assets/images/meetCancerWarrior.svg'
import BoostImmunity from '../../assets/images/boostImmunity.svg'
import ConsultExperts from '../../assets/images/consultExperts.svg'
import MonitorTreatment from '../../assets/images/monitorTreatment.svg'
import StayUpdated from '../../assets/images/StayUpdated.svg'
import Question from '../../assets/images/Question.svg'
import Zencoins from '../../assets/images/zencoins.svg';
import MyBookmark from '../../assets/images/mybookmarks.svg';
import MyOrder from '../../assets/images/myorder.svg';
import ReferEarn from '../../assets/images/referearn.svg';
import AboutUs from '../../assets/images/AboutUs.svg';
import HopeStory from '../../assets/images/hopeStory.svg';
import SuccessStory from '../../assets/images/succesStories.svg';
import AskExpert from '../../assets/images/askExpertHome.svg';
import { useSelector } from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const IconText = ({ theme, subTitle, Icon }) => {
  const styles = modalStyles(theme);

  return (
    <View style={styles.iconTextContainer}>
      {Icon}
      <Text style={styles.iconText}>{subTitle}</Text>
    </View>
  );
}

const SideBar = ({ modalDisplay, setModalDisplay, theme, props, data, onSuccessPress, redirectToCoach }) => {
  const styles = modalStyles(theme);
  const userName = "Sonali Bendre";
  const userPhone = "+91 9876543210";
  const planName = "Free";
  const planDuration = 1;
  const sideBarData = [
    { name: "Acitivate Plan" },
    { name: "Anti cancer Diet Plan" },
    { name: "All" },
    { name: "Blog" },
    { name: "Q&A" },
    { name: "Tips" },
    { name: "Quotes" },
    { name: "Read Stories" },
    { name: "Recipes" },
    { name: "Learn More" },
  ]
  const url = "https://api.whatsapp.com/send/?phone=919930709000"


  const onPressItem = (str) => {
    props.navigation.navigate(str)
    setModalDisplay(false)
  }
  const [cancerWarriorExpanded, setCancerWarriorExpanded] = useState(false)
  const [boostImmunityExpanded, setBoostImmunityExpanded] = useState(false)
  const [consultExpertsExpanded, setConsultExpertsExpanded] = useState(false)
  const [treatMentExpanded, setTreatMentExpanded] = useState(false)
  const [updateExpanded, setUpdateExpanded] = useState(false)
  const userData = useSelector((state) => state.onboardingReducer.userDetails);

  const [cancerWarriorArr, setCancerWarriorArr] = useState([
    { key: '0', title: translate("DRAWER")["ABOUT_US"], icon: <AboutUs width={23} height={23} />, onPress: () => onPressItem('Zen.WebScreen') },
    { key: '0', title: translate("DRAWER")["ZEN_STORIES"], icon: <SuccessStory width={23} height={23} />, onPress: () => {setModalDisplay(false), onSuccessPress() }},
    { key: '1', title: "Consult with Cancer Coach", icon: <ConsultCoach width={23} height={23} />, onPress: () => {setModalDisplay(false), redirectToCoach() }},
    // { key: '2', title: translate("COMMONTEXT")["DOCTORS"], icon: <ConsultOncologist width={23} height={23} />, onPress: () => onPressItem('Zen.DoctorsList') }, 
    // { key: '3', title: translate("DRAWER")["GET_MEDICINE"], icon: <GetMedicine width={23} height={23} />, onPress: () => onPressItem('Zen.Ecommerce') },    
    { key: '4', title: "Daily Guide", icon: <Calendar width={23} height={23} />, onPress: () => onPressItem('Zen.ActivityShow') },
    { key: '5', title: translate("DRAWER")["COMMUNITY"], icon: <Community width={23} height={23} />, onPress: () => onPressItem('Zen.Community') },
    { key: '6', title: 'Walking in Oneness', icon: <Wellness width={23} height={23} />, onPress: () => onPressItem('Zen.ViewallGroup') },
    { key: '7', title: translate("DRAWER")["ASK_EXPERT"], icon: <AskExpert width={23} height={23} />, onPress: () => {setModalDisplay(false), props.navigation.navigate('Zen.Community', { isfromHome: true }) }},
    // { key: '8', title: translate("DRAWER")["MESSAGES"], icon: <Messages width={23} height={23} />, onPress: () => onPressItem('Zen.ChatConversations') },
    { key: '9', title: translate("DRAWER")["LIVE_EXPERIENCES"], icon: <Events width={23} height={23} />, onPress: () => onPressItem('Zen.Events') },  
    { key: '5', title: translate("DRAWER")["HOPE_STORIES"], icon: <HopeStory width={23} height={23} />, onPress: () => {setModalDisplay(false); props.navigation.navigate('Zen.Community', { isFromStories: true })} },
    { key: '10', title: translate("DRAWER")["WELLNESS"], icon: <Wellness width={23} height={23} />, onPress: () => onPressItem('Zen.WellnessCategory') },
    { key: '11', title: translate("DRAWER")["BLOGS"], icon: <Blog width={23} height={23} />, onPress:() => {setModalDisplay(false); props.navigation.navigate('Zen.Community', { isFromStayUpdated: true })} },
    { key: '12', title: translate("DRAWER")["CLINICAL_TRIALS"], icon: <ClinicTrials width={23} height={23} />, onPress: () => onPressItem('Zen.ClinicalTrials') },
  ])

  const [commonOptionArr, setCommonOptionArr] = useState([])

  const [yourDataArr, setyourDataArr] = useState([])

  const [feedbackArr, setFeedbackArr] = useState([
    { key: '1', title: translate("DRAWER")["JOURNAL"], icon: <Journal width={23} height={23} />, onPress: () => onPressItem('Zen.Journal') },
    { key: '2', title: translate("DRAWER")["MEDICAL_RECORDS"], icon: <MedicalRecords width={23} height={23} />, onPress: () => onPressItem('Zen.Report') },
    { key: '3', title: translate("DRAWER")["SYMPTOMS"], icon: <Symptoms width={23} height={23} />, onPress: () => {
          props.navigation.navigate('Zen.Symptoms', { 'fromMenu': 'true' })
          setModalDisplay(false)
        }
    },
    { key: '4', title: translate("DRAWER")["ZEN_COINS"], icon: <Zencoins width={23} height={23} />, onPress: () => onPressItem('Zen.ZenPoints') },
    { key: '5', title: translate("DRAWER")["MY_BOOKMARKS"], icon: <MyBookmark width={23} height={23} />, onPress: () => onPressItem('Zen.MyBookmark') },
    // { key: '6', title: translate("DRAWER")["MY_ORDERS"], icon: <MyOrder width={23} height={23} />, onPress: () => onPressItem('Zen.MyOrders') },
    // { key: '7', title: translate("DRAWER")["MY_APPOINTMENT"], icon: <Events width={23} height={23} />, onPress: () => onPressItem('Zen.MyAppointment') }
  ])
  
  const [updatedArr, setUpdatedArr] = useState([
    { key: '1', title: translate("DRAWER")["REFER_EARN"], icon: <ReferEarn width={23} height={23} />, onPress: () => onPressItem('Zen.ReferEarn') },
    { key: '2', title: translate("DRAWER")["LEADERBOARD"], icon: <LeaderBoard width={23} height={23} />, onPress: () => onPressItem('Zen.LeaderBoard') },
    { key: '3', title: translate("DRAWER")["NEWS"], icon: <News width={23} height={23} />, onPress: () => onPressItem('Zen.News') },
    { key: '4', title: translate("DRAWER")["FINANCIAL_RESOURCES"], icon: <FinancialResources width={23} height={23} />, onPress: () => onPressItem('Zen.FinancialResources') },
    { key: '5', title: translate("DRAWER")["FAQs"], icon: <Question width={23} height={23} />, onPress:() => {setModalDisplay(false); props.navigation.navigate('Zen.Faq')} }
  ])

  const showAlert = () => {
    Alert.alert(
      "",
      translate("HOME")["ALERT_MESSAGE"],
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: translate("COMMONTEXT")["CONTINUE"], onPress: () => {
            setModalDisplay(false)
            props.navigation.navigate('Zen.EditProfile', { isfromHome: true })
          }
        }
      ]
    )
  }


  const changeWarriorLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCancerWarriorExpanded(!cancerWarriorExpanded);
    if(cancerWarriorExpanded != true){
      setBoostImmunityExpanded(false)
      setConsultExpertsExpanded(false)
      setTreatMentExpanded(false)
      setUpdateExpanded(false)
    }
  }

  const changeBoostImmunityLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBoostImmunityExpanded(!boostImmunityExpanded);
    if(boostImmunityExpanded != true){
      setCancerWarriorExpanded(false)
      setConsultExpertsExpanded(false)
      setTreatMentExpanded(false)
      setUpdateExpanded(false)
    }
  }

  const changeConsultExpertsLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setConsultExpertsExpanded(!consultExpertsExpanded);
    if(consultExpertsExpanded != true){
      setCancerWarriorExpanded(false)
      setBoostImmunityExpanded(false)
      setTreatMentExpanded(false)
      setUpdateExpanded(false)
    }
  }

  const changeTreatmentLayout = () => {
    let arr = feedbackArr
    let filterData = feedbackArr.filter(item => item.title == 'Patients')
    if(userData?.user_profile?.id >= 5 && filterData.length == 0){
      arr.push({
         key: '0', title: 'Patients', icon: <Community width={23} height={23} />, onPress: () => onPressItem('Zen.Patients')
      })
      setFeedbackArr(arr)
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTreatMentExpanded(!treatMentExpanded);
    if(treatMentExpanded != true){
      setCancerWarriorExpanded(false)
      setConsultExpertsExpanded(false)
      setBoostImmunityExpanded(false)
      setUpdateExpanded(false)
    }
  }

  const changeUpdateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUpdateExpanded(!updateExpanded);
    if(updateExpanded != true){
      setCancerWarriorExpanded(false)
      setConsultExpertsExpanded(false)
      setBoostImmunityExpanded(false)
      setTreatMentExpanded(false)
    }
  }

  return (
    <Modal
      style={styles.modalContainer}
      isVisible={modalDisplay}
      animationIn="slideInLeft"
      animationInTiming={250}
      animationOut="slideOutLeft"
      animationOutTiming={250}
      // coverScreen={modal}
      coverScreen={true}
      onBackButtonPress={() => { setModalDisplay(false) }}
      onBackdropPress={() => { setModalDisplay(false) }}
    >
      {/* Header */}
      <View style={styles.container}>

        <Pressable style={styles.userInfoView} onPress={() => {
          props.navigation.navigate("Zen.SidebarSetting", {
            data: data
          })
          setModalDisplay(false)
        }}>
          <Image style={styles.imgProfile} source={data?.data?.image == null || data?.data?.image == undefined ? require('../../assets/images/profileImage.png') : { uri: data?.data?.image }} />
          <View style={styles.userNameDesVw} >
            <Text style={styles.userNameText} numberOfLines={2} >{data?.data?.name || 'User'}</Text>
            <Text style={styles.subText} numberOfLines={2} >{'Settings'}</Text>
          </View>
          <View style={[styles.closeVw, { right: 0, position: 'absolute', resizeMode: 'contain' }]} >
            <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
          </View>
        </Pressable>

        <ScrollView bounces={false} showsVerticalScrollIndicator={false} >

          <View style={[styles.optionVw, { marginTop: 30 }]} >
            {/* <Pressable style={[styles.codeContainer, cancerWarriorExpanded && { backgroundColor: theme.SECONDARY }]} onPress={changeWarriorLayout}>
              <MeetCancerWarrior />
              <Text style={[styles.headerText, cancerWarriorExpanded && { color: theme.PRIMARY }]} >{translate("DRAWER")["MEET_CANCER_WARRIORS"]}</Text>
              <Text style={{ right: 15, position: 'absolute' }} >{cancerWarriorExpanded ? '-' : '+'}</Text>
            </Pressable> */}
            <View style={{ height: null, overflow: 'hidden' }} >
              {cancerWarriorArr.map((item, index) => {
                return (
                  <Pressable style={[styles.typesMainVw, index === cancerWarriorArr.length - 1 && { borderBottomWidth: 0 }]} onPress={(str) => item.onPress(str)}>
                    {item.icon}
                    <Text style={styles.listText}>{item.title}</Text>
                    {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                    <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
                  </View> */}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.optionVw} >
            {/* <Pressable style={[styles.codeContainer, boostImmunityExpanded && { backgroundColor: theme.SECONDARY }]} onPress={changeBoostImmunityLayout}>
              <BoostImmunity />
              <Text style={[styles.headerText, boostImmunityExpanded && { color: theme.PRIMARY }]} >{translate("DRAWER")["BOOST_IMMUNITY"]}</Text>
              <Text style={{ right: 15, position: 'absolute' }} >{boostImmunityExpanded ? '-' : '+'}</Text>
            </Pressable> */}
            <View style={{ height: null, overflow: 'hidden' }} >
              {commonOptionArr.map((item, index) => {
                return (
                  <Pressable style={[styles.typesMainVw, index === commonOptionArr.length - 1 && { borderBottomWidth: 0 }]} onPress={(str) => item.onPress(str)}>
                    {item.icon}
                    <Text style={styles.listText}>{item.title}</Text>
                    {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                    <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
                  </View> */}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.optionVw} >
            {/* <Pressable style={[styles.codeContainer, consultExpertsExpanded && { backgroundColor: theme.SECONDARY }]} onPress={changeConsultExpertsLayout}>
              <ConsultExperts />
              <Text style={[styles.headerText, consultExpertsExpanded && { color: theme.PRIMARY }]} >{translate("DRAWER")["CONSULT_EXPERTS"]}</Text>
              <Text style={{ right: 15, position: 'absolute' }} >{consultExpertsExpanded ? '-' : '+'}</Text>
            </Pressable> */}
            <View style={{ height: null, overflow: 'hidden' }} >
              {yourDataArr.map((item, index) => {
                return (
                  <Pressable style={[styles.typesMainVw, index === yourDataArr.length - 1 && { borderBottomWidth: 0 }]} onPress={(str) => item.onPress(str)}>
                    {item.icon}
                    <Text style={styles.listText}>{item.title}</Text>
                    {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                    <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
                  </View> */}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.optionVw} >
          {/* <Pressable style={[styles.codeContainer, treatMentExpanded && { backgroundColor: theme.SECONDARY }]} onPress={changeTreatmentLayout}>
              <MonitorTreatment />
              <Text style={[styles.headerText, treatMentExpanded && { color: theme.PRIMARY }]} >{translate("DRAWER")["MONITOR_TREATMENT"]}</Text>
              <Text style={{ right: 15, position: 'absolute' }} >{treatMentExpanded ? '-' : '+'}</Text>
            </Pressable> */}
            <View style={{ height: null, overflow: 'hidden' }} >
            {feedbackArr?.map((item, index) => {
              return (
                <Pressable style={[styles.typesMainVw, index === feedbackArr.length - 1 && { borderBottomWidth: 0 }]} onPress={(str) => item.onPress(str)}>
                  {item.icon}
                  <Text style={styles.listText}>{item.title}</Text>
                  {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                    <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
                  </View> */}
                </Pressable>
              );
            })}
            </View>
          </View>

          <View style={[styles.optionVw, { marginBottom: 40 }]} >
            <View style={{ height: null , overflow: 'hidden' }} >
            {updatedArr.map((item, index) => {
              return (
                <Pressable style={[styles.typesMainVw, index === updatedArr.length - 1 && { borderBottomWidth: 0 }]} onPress={(str) => item.onPress(str)}>
                  {item.icon}
                  <Text style={styles.listText}>{item.title}</Text>
                  {/* <View style={[styles.closeVw, { right: 0, position: 'absolute' }]} >
                    <Image style={styles.rightIcon} source={require('../../assets/images/right.png')} />
                  </View> */}
                </Pressable>
              );
            })}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const modalStyles = (theme) => StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    width: width * 0.85,
    height: height,
    alignSelf: 'flex-start',
    margin: 0,
    backgroundColor: theme.SELECTED
  },
  container: {
    flex: 1
  },
  userNameDesVw: {
    marginLeft: 8,
    // justifyContent: 'space-between',
    width: '80%'
  },
  userNameText: {
    color: '#000',
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    fontSize: 18,
    width: '90%'
  },
  subText: {
    color: theme.GRAY_BLACK,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    fontSize: 12,
    marginTop: Platform.OS === 'ios' ? -3 : -5
  },
  editProfileText: {
    color: theme.PAGINATION_SELECCT,
    fontSize: 16,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM
  },
  listText: {
    color: theme.GRAY_BLACK,
    fontSize: 14,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    marginLeft: 17
  },
  headerText: {
    color: theme.GRAY_BLACK,
    fontSize: 16,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    marginLeft: 10,
    marginTop:Platform.OS === 'ios' ? 0 : 3
  },
  pressStyle: {
    marginTop: 20
  },
  notiCountView: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#f88e3e',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bottomItemView: {
    marginHorizontal: 40,
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20
  },
  seprator: {
    height: 1,
    backgroundColor: theme.VERY_LIGHT_GRAY,
    marginHorizontal: 30,
    marginVertical: 30
  },
  typesMainVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    borderBottomColor: theme.VERY_LIGHT_GRAY,
    borderBottomWidth: 1,
    paddingVertical: 13
  },
  line: {
    backgroundColor: theme.SUB_TITLE,
    height: 1
  },
  imgBg: {
    backgroundColor: theme.ICON_SIDEBAR,
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    resizeMode: 'contain',
    width: 23,
    height: 23,
    tintColor: theme.ICON_SIDEBAR
  },
  editVw: {
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.INPUT_BG,
    marginVertical: 20,
    marginHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgProfile: {
    width: 60,
    height: 55,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover'
  },
  userInfoView: {
    flexDirection: 'row',
    backgroundColor: theme.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 13,
    width: '94%',
    marginTop: Platform.OS === 'ios' ? 70 : 15,
    marginHorizontal: 10
  },
  closeVw: {
    width: 21,
    height: 21,
  },
  rightIcon: {
    resizeMode: 'contain',
    width: 8,
    height: 17,
    tintColor: theme.BLACK
  },
  optionVw: {
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: theme.PRIMARY,
    marginTop: 7
  },
  codeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
})

export default SideBar;