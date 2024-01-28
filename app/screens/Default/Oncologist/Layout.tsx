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
  Dimensions,
  FlatList, Animated, RefreshControl, ScrollView
} from 'react-native';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import Filter from '../../../assets/images/filter_.svg'
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import OncologistFilter from '../../../components/OncologistFilter';
import actionTypes from '../../../store/actions/types';
import AppLoader from '../../../components/Plugins/AppLoader';
import moment from 'moment';
import Alert from '../../../components/AlertScreen/Index';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import request from '../../../services/client';
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
  const [date, setDate] = useState('Date')
  const [filter, setFilter] = useState(false)
  const [isClearFilter, setClearFilter] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data);
  const userData = useSelector((state) => state.loginReducer?.userDetails?.data);
  const Datafilter = useSelector(state => state.oncologistReducer?.oncologistfilter)
  const Data = useSelector((state) => state.oncologistReducer?.oncologist);
  const SpecializationData = useSelector((state) => state?.oncologistReducer?.specialization);
  var defaultData = new Date('1980-01-01')
  const [cancer, setCancer] = useState('')
  const [cancerId, setCancerId] = useState('')
  const [cancerStage, setCancerStage] = useState('')
  const [cancerStageId, setCancerStageId] = useState('')
  const [specialization, setspecialization] = useState('')
  const [specializationId, setSpecializationId] = useState('')
  const [oncologistList, setOncologist] = useState([])
  const [city, setCity] = useState('')
  const [cityId, setCityId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [loader, setLoader] = useState(false)
  const [page, setPage] = useState(1)
  const [selectItem, setSelectItem] = useState(null)
  const Rotate = useRef(new Animated.Value(0)).current
  const calender = useRef()
  const [bookDate, setBookDate] = useState(null)
  const [bookTime, setBookTime] = useState(null)
  const [applyFilter, setApplyFilter] = useState(false)
  const [filterOncologist, setFilterOncologist] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [bookDateIndex, setBookDateIndex] = useState(0)
  const [dateArr, setDateArr] = useState([])

  useEffect(() => {
    setLoader(true)
    apiCall()
    DateArrUpdate()
  }, [page]);

  useEffect(() => {
    apiSpecialization()
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

  // useEffect(() => {
  const fun = async () => {
    if (bookDate != null && bookTime != null) {
      let doctorDetails = applyFilter ? filterOncologist[selectItem] : oncologistList[selectItem]
      try {
        setLoader(true)
        const formdata = {
          "phone": userId?.phone,
          "name": userData?.name,
          "hospital_id": 1,
          "hospital_name": doctorDetails?.hospital_name,
          "dr_id": doctorDetails?.ID,
          "product_name": doctorDetails?.name,
          "appointment_date": moment().format(),
          "consultation_fee": doctorDetails?.consultation_fee
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
            item: doctorDetails
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
  //   fun()
  // }, [bookDate, bookTime]);

  const apiSpecialization = () => {
    props.actions.getSpecialization(actionTypes.GET_SPECIALIZATION_LIST, {
      module: 'website_rest_api',
      action: `getall_specializations`,
      formData: {},
    });
  }

  useEffect(() => {
    if (Data?.length >= 1) {
      setOncologist(Data)
    }
    setLoader(false)
    setRefresh(false)
  }, [Data]);

  useEffect(() => {
    if (Datafilter?.length >= 1) {
      setFilterOncologist(Datafilter)
    }
    setLoader(false)
    setRefresh(false)
  }, [Datafilter]);

  //api call
  const apiCall = () => {
    props.actions.getOncologistList(actionTypes.GET_ONCOLOGIST_LIST, {
      module: 'website_rest_api',
      action: `get_onco_list?page=${page}`,
      formData: {},
    });
  }

  //filterApi call
  const filterApi = () => {
    let obj = {
      "cancer_type": cancerId,
      "city_id": cityId,
      "stage": cancerStageId,
      "search_by_name": searchName,
      "specilization": specializationId
    }
    props.actions.getOncologistList(actionTypes.GET_ONCOLOGIST_FILTER_LIST, {
      module: 'website_rest_api',
      action: 'custom_filter',
      formData: obj,
    });
  }

  const AnimationStart = (value, duration) => {
    Animated.timing(Rotate, {
      toValue: value,
      duration: duration
    }).start()
  }

  const clearFilter = () => {
    setClearFilter(true)
    setCancerId('')
    setCancer('')
    setCityId('')
    setCity('')
    setCancerStageId('')
    setCancerStage('')
    setspecialization('')
    setSpecializationId('')
    setSearchName('')
  }

  const onApply = () => {
    if (!isClearFilter) {
      setFilter(false)
      setLoader(true)
      filterApi()
      setApplyFilter(true)
    } else {
      setFilter(false)
      setLoader(false)
      apiCall()
      setClearFilter(false)
      setApplyFilter(false)
    }
  }

  const renderItem = (item: any, index: any) => {
    return (
      <Pressable onPress={() => {
        selectItem == null ?
          props.navigation.navigate('Zen.OncologistBook', { ID: item?.ID }) : null
        if (selectItem != index) {
          setSelectItem(null)
        }
      }}>
        <Animated.View style={[styles.commonShadow, styles.renderShadow, {
          flexDirection: 'column',
          transform: [{
            rotateY: selectItem == index ? Rotate.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg']
            }) : '0deg'
          }]
        }]}>
          <View style={{
            flex: 1,
            backgroundColor: theme.PRIMARY,
            flexDirection: 'row'
          }}>
            <>
              <Image style={styles.renderImage} resizeMode={'cover'}
                source={{ uri: `https://zenonco-web-image.s3.ap-south-1.amazonaws.com/dr_oncologist/${item?.profile_picture}` }} />
              <View style={styles.renderData}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.renderItemTitle}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.renderItemDesc}>
                    {item?.specialization_display}</Text>
                </View>
                <View style={styles.renderExperience}>
                  <View style={styles.experienceMainView}>
                    <View style={styles.experienceView}>
                      <View style={styles.iconWidth}>
                        <Feather name='calendar' size={12} color={theme.MEDIUM_GRAY} />
                      </View>
                      <Text numberOfLines={1} style={styles.renderLocation}>
                        {item?.exp_year} {translate("DOCTORSLIST")["YRS_EXPERIENCE"]}</Text>
                    </View>
                    <View style={styles.experienceView}>
                      <View style={styles.iconWidth}>
                        <EvilIcons name='location' size={16} color={theme.MEDIUM_GRAY} style={{
                          marginLeft: -2
                        }} />
                      </View>
                      <Text numberOfLines={1} style={styles.renderLocation}>{item?.city}</Text>
                    </View>
                  </View>
                  <Pressable onPress={() => {
                    setBookDate(null)
                    setBookTime(null)
                    // if (selectItem != null) {
                    //   AnimationStart(0, 500)
                    //   setTimeout(() => {
                    //     setSelectItem(null)
                    //     setSelectItem(index)
                    //     AnimationStart(1, 500)
                    //   }, 510);
                    // } else {
                    if (selectItem == index) {
                      setSelectItem(null)
                    } else {
                      setSelectItem(index)
                    }
                    // AnimationStart(1, 500)
                    // }
                  }} style={styles.bookButton}>
                    <Text style={[styles.renderLocation, styles.bookText]}>{translate("COMMONTEXT")["BOOK"]}</Text>
                  </Pressable>
                </View>
              </View>
            </>
          </View>

          {/* Calendar view */}
          {selectItem == index &&
            <View style={styles.calendarView}>
              <Pressable style={styles.calendarClose}
                onPress={() => {
                  AnimationStart(0, 500)
                  setTimeout(() => {
                    setSelectItem(null)
                  }, 510);
                  setBookDate(null)
                  setBookTime(null)
                }}>
                <AntDesign name={"close"} color={theme.PRIMARY} size={scale(16)} />
              </Pressable>
              <View style={styles.calendarData}>
                <Pressable style={styles.leftArrow}
                  onPress={() => {
                    bookDateIndex > 0 ? setBookDateIndex(bookDateIndex - 1) : null
                  }}>
                  <AntDesign name={"left"} color={theme.LIGHT_GRAY} size={scale(16)} />
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
              <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: scale(15) }}>
                <View
                  style={{ flexDirection: "row" }}>
                  <Pressable style={[styles.renderTimeView, {
                    backgroundColor: bookTime == 1 ?
                      theme.PRIMARY : 'rgba(255,255,255,0.2)'
                  }]}
                    onPress={() => { setBookTime(1) }}>
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
                    {bookTime == 3 && <AntDesign name={"check"} color={theme.PAGINATION_SELECCT}
                      size={12} style={{ marginLeft: -5, marginRight: 5 }} />}
                  </Pressable>
                </View>
              </View>
              <Pressable style={styles.saveButton}
                onPress={() => { fun() }}>
                <Text style={[styles.renderTimeText, {
                  paddingHorizontal: scale(20),
                  color: theme.PRIMARY,
                  fontSize: scale(12)
                }]}>{translate("COMMONTEXT")["BOOK"]}</Text>
                {/* {check(1)} */}
              </Pressable>
            </View>}
        </Animated.View>
      </Pressable>
    );
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        calender?.current?.scrollToIndex({ animated: true, index: parseInt(bookDateIndex) })
      }, 200);
    } catch (error) { }
  }, [bookDateIndex])

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <AppHeader
          theme={theme}
          onBackPress={() => { filter ? setFilter(false) : props.navigation.goBack() }}
          headerTitle={filter ? 'Filter' : translate("DRAWER")["CONSULT_ONCOLOGIST"]}
          isRightComponent={true}
          isText={(filter && applyFilter) ? true : false}
          rightText={translate("COMMONTEXT")["CLEAR"]}
          onRightPress={() => clearFilter() }
          fontColor={"blue"}
          isSecondIcon={!filter ? true : false}
          rightSecondIcon={<Filter />}
          rightSecondPress={() => setFilter(true)}
        />

        {/* <View style={styles.header}>
          {!filter &&
            <Pressable style={styles.arrowButton} onPress={() => { setFilter(true) }}>
              <Filter />
            </Pressable>
          }
          {(filter && applyFilter) && 
          <Pressable style={styles.arrowRightButton}
            onPress={() => { clearFilter() }}>
            <Text style={{ color: "blue" }}>{translate("COMMONTEXT")["CLEAR"]}</Text>
          </Pressable>}
        </View> */}

        {filter ?
          <View style={styles.container}>
            <OncologistFilter
              props={props}
              theme={theme}
              type={cancer}
              setType={(data: any) => setCancer(data)}
              stage={cancerStage}
              setStage={(check: any) => setCancerStage(check)}
              special={specialization}
              setSpecial={(special: any) => { setspecialization(special) }}
              specialId={specializationId}
              setSpecialId={(special: any) => { setSpecializationId(special) }}
              city={city}
              setCity={(city: any) => setCity(city)}
              cityId={cityId}
              setCityId={(cityId: any) => setCityId(cityId)}
              cancerId={cancerId}
              setCancerId={(cancerId: any) => { setCancerId(cancerId) }}
              cancerStageId={cancerStageId}
              setCancerStageId={(cancerStageId: any) => setCancerStageId(cancerStageId)}
              searchName={searchName}
              setSearchName={(name: any) => setSearchName(name)}
              Apply={() => onApply()}
            />
          </View> :
          <View style={styles.container}>
            <FlatList
              data={applyFilter ? filterOncologist : oncologistList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: any) => renderItem(item, index)}
              keyExtractor={(item, index) => index?.toString()}
              style={{ marginTop: verticalScale(10) }}
              ListEmptyComponent={() => {
                return <View style={styles.emptyList}>
                  <Text style={styles.emptyListMsg}>{translate("COMMONTEXT")["NO_DATA_FOUND1"]}</Text>
                </View>
              }}
              refreshControl={<RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={refresh}
                onRefresh={() => {
                  setRefresh(true), setPage(1),
                    apiCall(), setApplyFilter(false)
                }} />}
              onEndReached={() => {
                setPage(page + 1)
              }}
              onEndReachedThreshold={0.1}
            />
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
          </View>}
      </SafeAreaView>
    </>
  );
};
export default withTheme(Layout);