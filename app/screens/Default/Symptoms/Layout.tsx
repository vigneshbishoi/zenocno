/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  Text,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import request from '../../../services/client';
import Alert from "../../../components/AlertScreen/Index"
import AppLoader from '../../../components/Plugins/AppLoader';
// import Slider from '@react-native-community/slider';
import IMG from '../../../assets/images/about.png'
import { scale, verticalScale } from 'react-native-size-matters';
import { Slider } from "@rneui/themed";
import Track from '../../../assets/images/track.svg'
import Tips from '../../../assets/images/Tips.svg'
import actionTypes from '../../../store/actions/types';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import moment from 'moment';
import AddActivity from '../../../assets/images/AddActivity.svg';
import translate from "../../../utils/Text";
import Modal from 'react-native-modal'
import { Image } from 'react-native-animatable';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('Date')
  const [isTipsModal, setTipsModal] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [loader, setLoader] = useState(false)
  const [slider, setSlider] = useState(0)
  const [symptomsList, setSymptomsList] = useState([])
  const journalList = useSelector((state) => state.journalReducer);
  const SelectDate = props?.route?.params?.SelectDate
  const [updateState, setUpdateState] = useState(0)
  const [tipsText, setTipsText] = useState('')
  const [enableBtn, setEnableBtn] = useState(true)
  const FromMenu = props?.route?.params?.fromMenu
  let newCurDate = moment(new Date()).format('YYYY-MM-DD')
  
  const [currentDate, setCurrentDate] = useState(newCurDate)
  const [selectedMonth, setSelectedMonth] = useState(moment(new Date()).format('MMM'));

  useEffect(() => {
    // apiCall()
    APICall()
  }, [])

  // useEffect(() => {
  //   if (journalList?.symptoms?.length > 0) {
  //     setSymptomsList(journalList?.symptoms)
  //   }
  // }, [journalList?.symptoms])

  // //Symptoms API call
  // const apiCall = () => {
  //   props.actions.getSymptomsList(actionTypes.GET_SYMPTOMS_LIST, {
  //     module: 'journal_user_symptom',
  //     action: `search_by_date?userId=${userId}&date=${SelectDate}`,
  //     formData: {}
  //   });
  // }

  //Symptoms API call
  const APICall = async (data) => {
    setLoader(true)
    try {
      const apiCall = await request({
        method: 'get', data: {
          module: 'journal_user_symptom',
          action: `search_by_date?userId=${userId}&date=${data != undefined ? data :
            FromMenu ? currentDate : moment(SelectDate).format('YYYY-MM-DD')}`,
          formData: {}
        }
      });
      let response = apiCall
      if (response?.status == 200) {
        setLoader(false)
        if (response?.data?.data?.length > 0) {
          setSymptomsList(response?.data?.data)
          setUpdateState(updateState + 1)
        }
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
    setLoader(false)
  }

  const submitData = async () => {
    setLoader(true)
    try {
      if ((symptomsList?.length > 0 && SelectDate != undefined) ||
        (currentDate != undefined && symptomsList?.length > 0 && currentDate != null)) {
        let symptomsData: { userId: any; id?: any; journalSymptomsDefineId: any; score: any; date: any; }[] = []
        symptomsList?.map((data) => {
          if (data?.journal_user_symptoms?.length > 0) {
            symptomsData.push({
              "userId": userId,
              "id": data?.journal_user_symptoms[0]?.id,
              "journalSymptomsDefineId": data?.journal_user_symptoms[0]?.journalSymptomsDefineId,
              "score": data?.score != undefined ? data?.score : parseInt(data?.journal_user_symptoms[0]?.score),
              "date": FromMenu != undefined ? currentDate : SelectDate
            })
          } else {
            symptomsData.push({
              "userId": userId,
              "journalSymptomsDefineId": data.id,
              "score": data?.score != undefined ? data?.score : 50,
              "date": FromMenu != undefined ? currentDate : SelectDate
            })
          }
        })
        // console.log('LLLLL', symptomsList, symptomsData);
        const apiCall = await request({
          method: 'post', data: {
            module: 'journal_user_symptom',
            action: 'manual_update',
            formData: JSON.stringify(symptomsData)
          },
          isFormData: true
        });

        if (apiCall?.status == 200) {
          setLoader(false)
          if (!showAlert) {
            setShowAlert(true)
            setShowErrorMsg('Success')
          }
        }
        setLoader(false)

      }
    } catch (error) {
      setLoader(false)
    }
    setLoader(false)
  }

  const alertFun = (msg) => {
    setShowAlert(true)
    setShowErrorMsg(msg)
  }

  const renderItem = (renderItem: any, mainIndex: any) => {
    const checkScore = renderItem?.journal_user_symptoms
    return (<View style={styles.questionView}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headerText}>{mainIndex + 1}. </Text>
        <Text style={[styles.headerText, { width: '80%' }]}>{renderItem?.symptoms}</Text>
        <Pressable style={styles.tipsIconVw} onPress={() => {
          setTipsText(renderItem.solution)
          setTipsModal(true)}
         } >
          <Tips width={21} height={21} />
        </Pressable>
      </View>
      <Slider
        value={renderItem?.score != undefined ?
          renderItem?.score : (checkScore?.length > 0 && checkScore[0]?.score != undefined &&
            checkScore[0]?.score != "undefined") ? checkScore[0]?.score : 50}
        onValueChange={(value) => {
          try {
            symptomsList[mainIndex].score = value
            setSlider(slider + 1)
          } catch (error) {

          }
        }}
        maximumValue={100}
        minimumValue={0}
        minimumTrackTintColor={theme.PAGINATION_SELECCT}
        maximumTrackTintColor={theme.LIGHT_GRAY}
        step={10}
        allowTouchTrack
        trackStyle={styles.sliderTracker}
        thumbStyle={styles.sliderThum}
        thumbProps={{
          children: (
            <View style={styles.sliderMainView}>
              <Track width={scale(20)} height={scale(20)} />
            </View>
          ),
        }}
      />
      <View style={styles.lowView}>
        <Text style={styles.lowText}>{translate("COMMONTEXT")["LOW"]}</Text>
        <Text style={[styles.sliderText]}>
          {renderItem?.score != undefined ?
            renderItem?.score : checkScore?.length > 0 ? checkScore[0].score : 50}
        </Text>
        <Text style={styles.lowText}>{translate("COMMONTEXT")["HIGH"]}</Text>
      </View>
    </View>)
  }

  const renderCalendarHeader = (date) => {
    return (
      <View style={styles.headerVw}>
        <Pressable style={[styles.backVw, {}]} onPress={() => props.navigation.goBack()}>
          <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
        </Pressable>
        <View style={styles.calendar}>
          <Text style={styles.headerText}>{translate("DRAWER")["SYMPTOMS"]}</Text>
          <Text style={styles.monthName}>{selectedMonth}</Text>
          {/* <Pressable style={styles.addButtonVw} onPress={() => {
            // props.navigation.navigate('Zen.AddActivity')
          }} >
            <AddActivity width={28} height={28} />
          </Pressable> */}
        </View>
      </View>
    );
  }

  const monthChange = (monthh) => {
    let mon = monthh.dateString
    let newMonth = moment(mon).format('MMMM')
    setSelectedMonth(newMonth);
  }

  const SymptomsList = () => {
    return <View style={styles.container}>
      <FlatList
        data={symptomsList}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: any) => renderItem(item, index)}
        keyExtractor={(item, index) => item.toString()}
        ListEmptyComponent={() => {
          return <View style={[{ opacity: 1, }, styles.emptyList, styles.alingCenter]}>
            <Text style={styles.emptyListMsg}>{translate("COMMONTEXT")["NO_DATA_FOUND1"]}</Text>
          </View>
        }}
      />
    </View>
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        {FromMenu == undefined && <View style={styles.header}>
          <Pressable style={styles.arrowButton} onPress={() => { props.navigation.goBack() }}>
            <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
          </Pressable>
          <Text style={styles.headerText}>{translate("DRAWER")["SYMPTOMS"]}</Text>
        </View>}
        {FromMenu ? <CalendarProvider
          date={currentDate}
          onDateChanged={date => {
            setCurrentDate(date)
            APICall(date)
          }}
          onMonthChange={(mon) => monthChange(mon)} >
          <ExpandableCalendar
            initialPosition={ExpandableCalendar.positions.CLOSED}
            disablePan={true}
            maxDate={newCurDate}
            onDayPress={(date) => { 
              date.dateString <= newCurDate ?
                setEnableBtn(true)
              : setEnableBtn(false)              
            }}
            renderHeader={date => renderCalendarHeader(date)}
            allowShadow={false}
            theme={{
              selectedDayBackgroundColor: theme.SECONDARY,
              calendarBackground: theme.SELECTED,
              'stylesheet.calendar.header': {
                week: {
                  height: Platform.OS === 'android' ? 80 : 25,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }
              }
            }}
            hideArrows={true} />
          {SymptomsList()}
        </CalendarProvider> : SymptomsList()}
        <View style={styles.buttonView}>
          <Pressable onPress={() => {
              submitData()
            }}
            disabled={enableBtn ? false : true}
            style={[styles.saveButton, { marginLeft: 5, backgroundColor: enableBtn ? theme.PAGINATION_SELECCT : theme.OTP_BORDER  }]}>
            <Text style={styles.saveBtn}>
              Save</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      {showAlert && 
        <Alert
          show={showAlert}
          title={showErrorMsg == 'Success' ? "Success" : "Sorry !"}
          message={showErrorMsg == 'Success' && FromMenu != undefined ?
            'Symptom saved successfully' : showErrorMsg == 'Success' ?
              `Your symptoms has been added successfully`
              : showErrorMsg == 'InvalidFile' ? 'Your invalid files has been remove' : showErrorMsg}
          closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText={"OK"}
          onConfirmPressed={() => {
            setShowAlert(false)
            showErrorMsg == 'Success' && FromMenu == undefined ? props.navigation.goBack() : null
            setTimeout(() => {
              setShowErrorMsg('')
            }, 500);
          }}
        />
      }
      {isTipsModal &&
        <Modal
          isVisible={isTipsModal}
          animationIn={'slideInUp'}
          animationOut={'slideInDown'}
          backdropOpacity={0.3}
          onBackdropPress={() => setTipsModal(false)}
          onBackButtonPress={() => setTipsModal(false)}>
          <View style={styles.modalContainer} >
            <View style={styles.tipsModalVw} >
            <Pressable style={styles.closeImageVw} onPress={() => setTipsModal(false)} >
                <Image source={require('../../../assets/images/close.png')} style={styles.closeImg} />
              </Pressable>
             
              <Text style={[styles.modalDesText, {marginTop: Platform.OS === 'ios' ? 25 : 15, marginBottom: 10}]}>{tipsText}</Text>
            </View>
          </View>
        </Modal>
      }
    </>
  );
};
export default withTheme(Layout);