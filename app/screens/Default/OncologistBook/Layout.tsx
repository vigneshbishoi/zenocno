/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect, useRef } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text, Image,
  FlatList, ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import AppLoader from '../../../components/Plugins/AppLoader';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ribbon from '../../../assets/images/ribbon.svg'
import Hospital from '../../../assets/images/hospital.svg'
import Hospital1 from '../../../assets/images/hospital1.svg'
import moment from 'moment';
import Check from '../../../assets/images/noun_check.svg'
import Msg from '../../../assets/images/message.svg'
import actionTypes from '../../../store/actions/types';
import RenderHtml from 'react-native-render-html';
import request from '../../../services/client';
import Alert from '../../../components/AlertScreen/Index';
import { scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data);
  const userData = useSelector((state) => state.loginReducer?.userDetails?.data);
  const Data = useSelector((state) => state.oncologistReducer?.oncologistDr);
  const [loader, setLoader] = useState(false)
  const [videoView, setVideoView] = useState(false)
  const calender = useRef()
  const [bookDate, setBookDate] = useState(null)
  const [bookDateIndex, setBookDateIndex] = useState(0)
  const [bookTime, setBookTime] = useState(null)
  const ID = props?.route?.params?.ID
  const [doctor, setDoctor] = useState({})
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [dateArr, setDateArr] = useState([])

  useEffect(() => {
    setDoctor({})
    setLoader(true)
    apiCall()
    DateArrUpdate()
  }, []);

  const DateArrUpdate = () => {
    let updateArr = []
    const incremantDate = (data) => {
      return new Date().setDate(new Date().getDate() + data);
    }
    updateArr.push(new Date())
    for (let index = 1; index < 7; index++) {
      updateArr.push(incremantDate(index))
    }
    setDateArr(updateArr)
  }

  useEffect(() => {
    if (Data?.length >= 1) {
      setDoctor(Data[0].ID == ID ? Data[0] : {})
      setTimeout(() => {
        setLoader(false)
      }, 800);
    }
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  }, [Data]);

  //api call
  const apiCall = () => {
    props.actions.getOncologistDr(actionTypes.GET_ONCOLOGIST_DR, {
      module: 'website_rest_api',
      action: `get_onco_profile?onco_id=${ID}`,
      formData: {},
    });
  }


  const ProfileView = () => {
    return (
      <View style={[styles.renderShadow, {}]}>
        <FastImage
          style={styles.renderImage}
          source={{
            uri: `https://zenonco-web-image.s3.ap-south-1.amazonaws.com/dr_oncologist/${doctor?.profile_picture}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.renderData}>
          <Text numberOfLines={1} style={styles.drName}>{doctor?.name}</Text>
          <Text numberOfLines={1} style={styles.specialText}>
            {doctor?.specialization}</Text>
          <View style={styles.rowView}>
            <View style={styles.iconWidth}>
              <Feather name='calendar' size={16} color={theme.MEDIUM_GRAY} />
            </View>
            <Text numberOfLines={1} style={styles.experienceText}>
              {doctor?.exp_year} {translate("DOCTORSLIST")["YRS_EXPERIENCE"]}</Text>
          </View>
          <View style={styles.rowView}>
            <View style={styles.iconWidth}>
              <EvilIcons name='location' size={22} color={theme.MEDIUM_GRAY} style={{
                marginLeft: -2
              }} />
            </View>
            <Text numberOfLines={1} style={styles.experienceText}>
              {doctor?.city}</Text>
          </View>
        </View>
      </View >
    )
  }

  useEffect(() => {
    try {
      setTimeout(() => {
        calender?.current?.scrollToIndex({ animated: true, index: parseInt(bookDateIndex) })
      }, 200);
    } catch (error) { }
  }, [bookDateIndex])

  const InfoView = (title: any, decs: any, decs1: any) => {
    return (<>
      <View style={styles.divider} />
      <Text style={[styles.aboutText, { marginTop: 0 }]}>{title}</Text>
      <View style={styles.rowView}>
        <View style={styles.tickView}>
          <Check />
        </View>
        <Text style={[styles.specialText, { fontSize: 12, flex: 1, }]}>
          {decs}</Text>
      </View>
      <View style={[styles.rowView, styles.tickTop]}>
        <View style={styles.tickView}>
          <Check />
        </View>
        <Text style={[styles.specialText, { fontSize: 12, flex: 1, }]}>
          {decs1}</Text>
      </View>
    </>)
  }

  const BookingAppointmnet = async () => {
    if (bookDate != null && bookTime != null) {
      try {
        setLoader(true)
        const formdata = {
          // "phone": userId?.phone,
          "phone": 9579897934,
          "name": userData?.name,
          "hospital_id": 1,
          "hospital_name": doctor?.hospital_name,
          "dr_id": doctor?.ID,
          "product_name": doctor?.name,
          "appointment_date": moment().format(),
          "consultation_fee": doctor?.consultation_fee
        }
        const apiCall = await request({
          method: 'post', data: {
            module: 'website_rest_api',
            action: 'onco_booking',
            formData: formdata,
          }
        });
        if (apiCall?.status == 200) {
          // setShowAlert(true)
          // setShowErrorMsg('Success')
          props.navigation.navigate('Zen.OncologistBooked', {
            item: doctor
          })
          setBookDate(null)
          setBookTime(null)
        }
        setLoader(false)
      } catch (error) {
        console.log(error, 'Error');
        setLoader(false)
      }
    }
  }

  const tagsStyles = {
    body: {
      color: theme.BLACK
    },
    li: {
      color: theme.BLACK,
      fontSize: scale(12),
      fontFamily: "Roboto",
      fontWeight: '500'
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <AppHeader
          theme={theme}
          onBackPress={() => props.navigation.goBack()}
          headerTitle={translate("DOCTORSLIST")["BOOK_APPOINTMENT"]}
          isRightComponent={true} />
         <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            {/* Profile View */}
            <ProfileView />
            <View style={styles.commonPadding}>
              {/* Hospital description */}
              <View style={styles.rowView}>
                <View style={styles.hospitalIcon}>
                  <Ribbon />
                </View>
                <Text numberOfLines={2} style={[styles.specialText, { fontSize: 12, flex: 1, }]}>
                  {doctor?.specialization_display}</Text>
              </View>
              <View style={[styles.rowView, styles.hospitalView]}>
                <View style={styles.hospitalIcon}>
                  <Hospital />
                </View>
                <Text numberOfLines={1} style={[styles.specialText, { fontSize: 12, flex: 1, }]}>
                  {doctor?.hospital_name}</Text>
              </View>
              <View style={[styles.rowView, styles.hospitalView]}>
                <View style={styles.hospitalIcon}>
                  <Hospital1 />
                </View>
                <Text style={[styles.specialText, { fontSize: 12, flex: 1, }]}>
                  {doctor?.edu_summary}</Text>
              </View>
              {/* Consultation view */}
              <View style={[styles.rowView, styles.consultanView]}>
                <View style={[styles.rowView, styles.videoView]}>
                  <Pressable style={[styles.videoPress, {
                    backgroundColor: videoView ? 'transparent' : theme.PRIMARY
                  }]}
                    onPress={() => { setVideoView(false) }}>
                    <Text style={[styles.videoText, {
                      color: videoView ? theme.PRIMARY : theme.ICON_TINT
                    }]}>{translate("DOCTORSLIST")["PHYSICAL"]}</Text>
                  </Pressable>
                  <Pressable style={[styles.videoPress, {
                    backgroundColor: videoView ? theme.PRIMARY : 'transparent'
                  }]}
                    onPress={() => { setVideoView(true) }}>
                    <Text style={[styles.videoText, {
                      color: !videoView ? theme.PRIMARY : theme.ICON_TINT
                    }]}>{translate("DOCTORSLIST")["VIDEO"]}</Text>
                  </Pressable>
                </View>
                <Text >
                  <Text style={styles.consultanRupeeNumber}>{'\u20B9'} </Text>
                  <Text style={styles.consultanNumber}>{doctor?.consultation_fee}</Text>
                </Text>
                <Text style={styles.consultanText}>{translate("DOCTORSLIST")["CONSULTATION"]}</Text>
              </View>
              <Text style={styles.appointText}>{translate("DOCTORSLIST")["CHOOSE_APPOINTMENT_DATE"]}</Text>
              {/* Calendar view */}

              <View style={styles.calendarView}>
                <View style={styles.calendarData}>
                  <Pressable style={styles.leftArrow}
                    onPress={() => {
                      bookDateIndex > 0 ? setBookDateIndex(bookDateIndex - 1) : null
                    }}>
                    <AntDesign name={"left"} color={theme.LIGHT_GRAY} size={18} />
                  </Pressable>
                  <FlatList
                    data={dateArr}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={calender}
                    renderItem={({ item, index }) => {
                      let itemDate = moment(new Date(item)).format("DD")
                      let itemMonth = moment(new Date(item)).format("MMM")
                      let itemDay = moment(new Date(item)).format("ddd")
                      let colorUpdate = {
                        color: itemDate == bookDate ? theme.PAGINATION_SELECCT : theme.PRIMARY,
                      }

                      return <Pressable style={[styles.renderView, {
                        backgroundColor: itemDate == bookDate ? theme.PRIMARY
                          : 'rgba(255,255,255,0.2)'
                      }]}
                        onPress={() => {
                          setBookDate(itemDate)
                          setBookDateIndex(index)
                        }}>
                        <Text style={[styles.renderDay, colorUpdate, {
                          backgroundColor:
                            itemDate == bookDate ? 'rgba(16,143,299,0.2)'
                              : 'rgba(255,255,255,0.2)'
                        }]}>{itemDay}</Text>
                        <Text style={[styles.renderTitle, colorUpdate]}>{itemDate}</Text>
                        <Text style={[styles.renderMonth, colorUpdate]}>{itemMonth}</Text>
                      </Pressable>
                    }}
                    keyExtractor={(item, index) => index.toString()} />
                  <Pressable style={styles.rightArrow}
                    onPress={() => {
                      bookDateIndex < 6 ? setBookDateIndex(bookDateIndex + 1) : null
                    }}>
                    <AntDesign name={"right"} color={theme.LIGHT_GRAY} size={18} />
                  </Pressable>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Pressable style={[styles.renderTimeView, {
                    backgroundColor: bookTime == 1 ?
                      theme.PRIMARY : 'rgba(255,255,255,0.2)'
                  }]} onPress={() => { setBookTime(1) }}>
                    <Text style={[styles.renderTimeText, {
                      color: bookTime == 1 ?
                        theme.PAGINATION_SELECCT : theme.PRIMARY
                    }]}>10AM - 12PM</Text>
                    {bookTime == 1 && <AntDesign name={"check"} color={theme.PAGINATION_SELECCT}
                      size={12} style={{ marginLeft: -5, marginRight: 5 }} />}
                  </Pressable>
                  <Pressable style={[styles.renderTimeView, {
                    backgroundColor: bookTime == 2 ?
                      theme.PRIMARY : 'rgba(255,255,255,0.2)'
                  }]} onPress={() => {
                    setBookTime(2)
                  }}>
                    <Text style={[styles.renderTimeText, {
                      color: bookTime == 2 ?
                        theme.PAGINATION_SELECCT : theme.PRIMARY
                    }]}>12AM - 03PM</Text>
                    {bookTime == 2 && <AntDesign name={"check"} color={theme.PAGINATION_SELECCT}
                      size={12} style={{ marginLeft: -5, marginRight: 5 }} />}
                  </Pressable>
                  <Pressable style={[styles.renderTimeView, {
                    backgroundColor: bookTime == 3 ?
                      theme.PRIMARY : 'rgba(255,255,255,0.2)'
                  }]} onPress={() => {
                    setBookTime(3)
                  }}>
                    <Text style={[styles.renderTimeText, {
                      color: bookTime == 3 ?
                        theme.PAGINATION_SELECCT : theme.PRIMARY
                    }]}>03AM - 06PM</Text>
                    {bookTime == 4 && <AntDesign name={"check"} color={theme.PAGINATION_SELECCT}
                      size={12} style={{ marginLeft: -5, marginRight: 5 }} />}
                  </Pressable>
                </View>
              </View>

              <Pressable onPress={() => { BookingAppointmnet() }}
                style={[styles.saveButton, { marginLeft: 5 }]}>
                <Text style={[styles.headerText, { color: theme.PRIMARY, flex: 0 }]}>{translate("DOCTORSLIST")["BOOK_APPOINTMENT"]}</Text>
              </Pressable>
              {/* About view */}
              <Text style={styles.aboutText}>{translate("COMMONTEXT")["ABOUT"]}</Text>
              <View style={{ opacity: 0.75 }}>
                <RenderHtml
                  source={{ html: doctor?.biography }}
                  tagsStyles={tagsStyles}
                />
              </View>
              {/* {InfoView('Information', `VS Hospitals, Chetpet, Chennai ,Chennai #13, East Spurtank Road, Chetpet, Chennai,Рincode- 600031.`,
                 'VS Hospitals, Chetpet, Chennai ,Chennai')} */}
              {doctor?.edu_detailed != '' ? <>
                <View style={styles.divider} />
                <Text style={[styles.aboutText, { marginTop: 0 }]}>{translate("DOCTORSLIST")["EDUCATION"]}</Text>
                <View style={{ opacity: 0.75 }}>
                  <RenderHtml
                    source={{ html: doctor?.edu_detailed }}
                    tagsStyles={tagsStyles}
                  />
                </View>
              </> : null}
              {doctor?.memberships != '' ? <>
                <View style={styles.divider} />
                <Text style={[styles.aboutText, { marginTop: 0 }]}>{translate("DOCTORSLIST")["MEMBERHIPS"]}</Text>
                <View style={{ opacity: 0.75 }}>
                  <RenderHtml
                    source={{ html: doctor?.memberships }}
                    tagsStyles={tagsStyles}
                  />
                </View>
              </> : null}
              {doctor?.awards != '' ? <>
                <View style={styles.divider} />
                <Text style={[styles.aboutText, { marginTop: 0 }]}>{translate("DOCTORSLIST")["AWARDS_RECOGNITIONS"]}</Text>
                <View style={{ opacity: 0.75 }}>
                  <RenderHtml
                    source={{ html: doctor?.awards }}
                    tagsStyles={tagsStyles}
                  />
                </View>
              </> : null}
              {doctor?.special_interest != '' ? <>
                <View style={styles.divider} />
                <Text style={[styles.aboutText, { marginTop: 0 }]}>{translate("DOCTORSLIST")["AREAS_INTEREST"]}</Text>
                <View style={{ opacity: 0.75 }}>
                  <RenderHtml
                    source={{ html: doctor?.special_interest }}
                    tagsStyles={tagsStyles}
                  />
                </View>
              </> : null}
              {doctor?.faq != '' ? <>
                <View style={styles.divider} />
                <View style={[styles.rowView, styles.faqView]}>
                  <View style={styles.faqIcon}>
                    <Msg />
                  </View>
                  <Text style={[styles.aboutText, { marginTop: 0 }]}>{translate("DOCTORSLIST")["FAQ"]}</Text>
                </View>
                <View style={{ opacity: 0.75 }}>
                  <RenderHtml
                    source={{ html: doctor?.faq }}
                    tagsStyles={tagsStyles}
                  />
                </View>
              </> : null}
            </View>
          </ScrollView>
          <Alert
            show={showAlert}
            title={showErrorMsg == 'Success' ? "Success" : "Sorry !"}
            message={showErrorMsg == 'Success' ? 'Your appointment has been added successfully' : showErrorMsg}
            closeOnTouchOutside={{ val: true, setShowAlert: () => setShowAlert(false) }}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText={"OK"}
            onConfirmPressed={() => {
              setShowAlert(false)
              setTimeout(() => {
                setShowErrorMsg('')
              }, 500);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default withTheme(Layout);