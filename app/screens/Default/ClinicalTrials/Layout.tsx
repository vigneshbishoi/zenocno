/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect, useCallback } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  BackHandler,
  FlatList,
  Keyboard
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import actionTypes from '../../../store/actions/types';
import { Dropdown,MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import AppLoader from '../../../components/Plugins/AppLoader';
import {useFocusEffect} from '@react-navigation/native';
import { searchRequest,saveClinicalRequest } from '../../../services/clinicalTrials'
import { copyFileAssets } from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import translate from '../../../utils/Text'
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import { FONTFAMILY } from '../../../config/font-config';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
  route: object

}
const Layout = (props: IProps) => {

  const styles = style(props.theme);
  const theme = props.theme
  const [cancerType, setCancerType] = useState('');
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [recuitment, setRecuitment] = useState('');
  const [phase, setPhase] = useState([]);
  const [isSelect, setIsSelect] = useState(0);
  const [condition,setCondition] = useState([])
  const [conditionName, setConditionName] = useState('')
  const [loadUrl,setLoadUrl] = useState('')
  const [isLoader, setIsLoader] = useState(false);
  const [strCountry,setStrCountry] = useState('')
  const [strDistance,setStrDistance] = useState('')
  const [strRecruitment,setStrRecruitment] = useState('')
  const [isSaveData, setIsSaveData] = useState(false);
  const [searchCountryList,setSearchCountryList] = useState([])
  const [countryDisplay,setCountryDisplay] = useState(false)
  const [cancerDisplay,setCancerDisplay] = useState(false)
  const [phaseDisplay,setPhaseDisplay] = useState(false)
  const [searchCancerList,setSearchCancerList] = useState([])
  const [strCancer, setStrCancer] = useState('')
  const [phaseList, setPhaseList] = useState([]);
  const [isLoad,setIsLoad] = useState(true)
  const [countryIso, setCountryIso] = useState('');
  const [mileDisplay, setMileDisplay] = useState(false)
  const [recStatusDisplay, setRecStatusDisplay] = useState(false)
  const dData = [
    { label: '50 miles', value: '50' },
    { label: '100 miles', value: '100' },
    { label: '150 miles', value: '150' },
    { label: '200 miles', value: '200' },
  ];

  const rData = [
    { label: 'Recruiting and not yet recruiting status', value: 'ab' },
    { label: 'All studies', value: 'all' },
  ];

  const pData = [
    { label: 'Not Applicable', value: '5' },
    { label: 'Phase 4', value: '3' },
    { label: 'Phase 3', value: '2' },
    { label: 'Phase 2', value: '1' },
    { label: 'Phase 1', value: '0' },
    { label: 'Early Phase 1', value: '4' },
  ];

  const getConditionsData =
      useSelector((state) => state.clinicalTrialsReducer?.conditionData?.length > 0 ?
        state.clinicalTrialsReducer.conditionData[0] : []) || [];
  
  const countryAll = useSelector(state => state.onboardingReducer?.countryData?.length > 0 ?
    state.onboardingReducer.countryData[0].data : []) || []
  
  //console.log("get condition data", countryAll.length)

  useEffect(() => {
    getConditionsDetails('a')
    getCountryDetails()
    // setTimeout(() => {
    //   setCondition(updateArray(getConditionsData))
    // },2000) 
    const backAction = () => {
      if (loadUrl) {
        setLoadUrl("")
        return false
      } else {
        props.navigation.goBack()
        return true
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();       
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (loadUrl.length > 0) {
          setLoadUrl("");
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [loadUrl])
  );

  useEffect(() => {
    if (countryAll.length > 0 && isLoad) {
      setIsLoad(false)
      setSearchCountryList(countryAll)
    }
  },[countryAll])

  useEffect(() => {
    if (cancerType.length > 0 || search.length > 0 || country.length > 0 || city.length > 0 || distance.length > 0 || recuitment.length > 0 || phase.length > 0) {
       setIsSaveData(true)
    }
  }, [cancerType.length,search.length,country.length, city.length, distance.length, recuitment.length, phase.length])

  const checkIfBack = () => {
    if (loadUrl) {
      setLoadUrl("")
    } else {
      props.navigation.goBack()
    }
  }

  const getConditionsDetails = async(value) => {
    // props.actions.getCondition(actionTypes.GET_CONDITION, {
    //   module: 'extend',
    //   action: "cond",
    //   formData: {
    //     cond: value
    //   }
    // });
    //setIsLoader(true)
    const response = await searchRequest(value);
    if (response?.data) {
      let trucks = condition
      let filteredName = trucks.filter((item) => {
        return item.label.toLowerCase().match(strCancer)
      })
      if (!strCancer || strCancer === '') {
        setSearchCancerList(condition)
      } else if (!Array.isArray(filteredName) && !filteredName.length) {
        // set no data flag to true so as to render flatlist conditionally
        setSearchCancerList([])
      } else if (Array.isArray(filteredName)) {
        setSearchCancerList(filteredName)
      }
      setCondition(updateArray(response.data))
      setSearchCancerList(updateArray(response.data))
      console.log("asios response", response.data)
    }
    //setIsLoader(false)
  }

  const getCountryDetails = () => {
    props.actions.getCondition(actionTypes.GET_COUNTRY, {
      module: 'clinical_trail',
      action: "country",
    });
  }

  const saveConditionsData = async() => {
    let newStr = []
    phase.forEach(element => {
      let data = pData.filter(e => e.value === element)
      console.log("data------------", data)
      newStr.push(data[0]?.label)
    });
    let phaseStr = newStr.join(",")
    // const obj = {
    //   condition: cancerType,
    //   searchTerms: search,
    //   country: strCountry,
    //   city: city,
    //   distance: strDistance,
    //   recruitment_status: strRecruitment,
    //   phase: phaseStr
    // }
    const params = new URLSearchParams();
    params.append('condition', cancerType);
    params.append('searchTerms', search);
    params.append('country', country);
    params.append('city', city);
    params.append('distance', strDistance);
    params.append('recruitment_status', strRecruitment);
    params.append('phase', phaseStr);
    //console.log("search data", obj)
    const response = await saveClinicalRequest(params)
    console.log("search data", response)
    setIsSaveData(false)
    // props.actions.saveCondition(actionTypes.SAVE_CONDITION, {
    //   module: 'clinical_trail',
    //   action: "create",
    //   formData: obj
    // });
  }

  const updateArray = (array) => {
    let conditionsList = []
    for (let i = 0, n = array.length; i < n; i++) {
      let data = {
        label: array[i],
        value: i
      }
      //console.log(data)
      conditionsList.push(data)
    }
    return conditionsList
  }

  const checkValidateData = () => {
    if (isSaveData) {
      saveConditionsData()
    }
    // if (cancerType.length > 0 && search.length > 0 && country.length > 0 && city.length > 0
    //   && distance.length > 0 && recuitment.length > 0 && phase.length > 0) {
      let phaseStr = phase.join('&phase=');
      let url = "https://clinicaltrials.gov/ct2/results?cond=" + cancerType.replace(" ", "%20") + "&term=" + search.replace(" ", "%20") + "&cntry=" + countryIso + "&city="
        + city.replace(" ", "%20") + "&dist=" + distance + "&recrs=" + recuitment.replace("all", "") + "&phase=" + phaseStr;
      console.log("url", url)
      setIsLoader(true)
      setLoadUrl(url)
    // } else {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'ZenOnce',
    //     text2: 'Please fill up all data'
    //   });
    // }
  }

  const renderDistanceItem = (item: any) => {
    return (
      <Pressable onPress={() => { setDistance(item.label), setMileDisplay(false), setIsSelect(0), Keyboard.dismiss() }}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === distance && (
            <AntDesign
              style={styles.icon}
              color="#108FE5"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      </Pressable>
    );
  };
  const renderRecruitmentItem = (item: any) => {
    return (
      <Pressable onPress={() => { setRecuitment(item.label), setRecStatusDisplay(false), setIsSelect(0), Keyboard.dismiss() }}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === recuitment && (
            <AntDesign
              style={styles.icon}
              color="#108FE5"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      </Pressable>
    );
  };
  const renderPhaseItem = (item: any) => {
    return (
      <Pressable onPress={() => {
        let data = []
        data = phase
        if (data != undefined && data?.includes(item.value)) {
         let index = data.findIndex(e => e == item.value);
          data.splice(index,1)
        } else {          
          data.push(item.value)
        }
        console.log("push---------", data, phase)
        let newStr = []
        data.forEach(element => {
          let data = pData.filter(e => e.value === element)
          console.log("data------------", data)
          newStr.push(data[0]?.label)
        });
        setPhaseList(newStr)
        setPhase(data)
      }}>
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {phase && phase.length > 0 && phase.some(e => e == item.value) && (
              <AntDesign
                style={styles.icon}
                color="#108FE5"
                name="checksquare"
                size={20}
              />
            )}
          </View>
        </Pressable >
    );
  };

  const renderCountryItem = (item, index ) => {
    return (
      <Pressable onPress={() => { setCountryIso(item.isoCode), setCountry(item.name),setCountryDisplay(false),setIsSelect(0),Keyboard.dismiss() }}>
        <View style={[styles.item,{backgroundColor: item.name === country ? "#F1F4FF" :'white'}]}>
          <Text style={styles.textItem}>{item.name}</Text>
          {item.name === country && (
            <AntDesign
              style={styles.icon}
              color="#108FE5"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      </Pressable>
    );
  };

  const renderCancerItem = (item, index) => {
    return (
      <Pressable onPress={() => { setCancerType(item.label),setCancerDisplay(false),setIsSelect(0),Keyboard.dismiss() }}>
        <View style={[styles.item,{backgroundColor: item.label === cancerType ? "#F1F4FF" :theme.PRIMARY}]}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.label === cancerType && (
            <AntDesign
              style={styles.icon}
              color="#108FE5"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      </Pressable>
    );
  };

  const searchTextList = (e) => {
    let text = e.toLowerCase()
    let trucks = countryAll
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      setSearchCountryList(countryAll)
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setSearchCountryList([])
    } else if (Array.isArray(filteredName)) {
      setSearchCountryList(filteredName)
    }
  }

  const phaseRenderList = () => {
    return pData.map((element,index) => {
      return (
        renderPhaseItem(element,index)
      );
    });
  };

  const cancerRenderList = () => {
    return searchCancerList?.map((element,index) => {
      return (
        renderCancerItem(element,index)
      );
    });
  };

  const countryRenderList = () => {
    return searchCountryList?.map((element,index) => {
      return (
        renderCountryItem(element,index)
      );
    });
  };

  const mileRenderList = () => {
    return dData.map((element, index) => {
      return (
        renderDistanceItem(element, index)
      );
    });
  };

  const recStatusRenderList = () => {
    return rData.map((element, index) => {
      return (
        renderRecruitmentItem(element, index)
      );
    });
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: theme.PRIMARY }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
          <Pressable style={{ paddingLeft: 25, paddingRight: 10 }} onPress={() => checkIfBack()} >  
            <Back width={8} height={15} />
            {/* <Back width={15} height={20} /> */}
          </Pressable>
          <View style={{ flexDirection: 'column',paddingLeft: 10, flex: 1 }}>
            <Text style={styles.userName}>{translate("DRAWER")["CLINICAL_TRIALS"]}</Text>
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 25 }} />
        </View>
        {loadUrl.length > 0 ?
          <WebView source={{ uri: loadUrl }} style={{ backgroundColor: '#E4E4E4' }}
            onLoadEnd={() => { setIsLoader(false)}}
            onLoadStart={() => { }} /> :
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
              <View style={{}}>
                <CommonDropDown
                  theme={theme}
                  value={cancerType}
                  placeHolder={translate("FILTER")["CANCER_TYPE"]}
                  multiLine={false}
                  editable={false}
                  placeholderTextColor={theme.SUB_TITLE}
                  onChangeText={(text: string) => {
                    { text.length > 0 ? setIsSelect(1) : setIsSelect(0) }
                  }}
                  extraInputStyle={styles.extraInputStyle}
                  onComponentPress={() => { setCountryDisplay(false), setCancerDisplay(!cancerDisplay), setStrCancer(''), setIsSelect(1) }}
                  onBlur={() => setIsSelect(0)}
                />
              </View>
              {cancerDisplay && <View style={{ maxHeight: 250,marginTop: 10, width: "90%", backgroundColor: theme.PRIMARY }}>
                <View style={styles.searchVw}>
                  <Icon name="search" color={'#A2A2A2'} size={18} />
                  <TextInput placeholder={translate("COMMONTEXT")["SEARCH"]} autoFocus={true} placeholderTextColor={'#A2A2A2'} style={styles.searchInput} value={strCancer} onChangeText={(value) => { setStrCancer(value), getConditionsDetails(value) }} />
                </View>
               <ScrollView style={{backgroundColor:"white",maxHeight:150}} showsVerticalScrollIndicator={false}>{cancerRenderList()}</ScrollView> 
              </View>
              }
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={search}
                  placeHolder={translate("CLINICALS")["SELECT_ITEM"]}
                  multiLine={false}
                  editable={true}
                  isIcon={false}
                  placeholderTextColor={theme.SUB_TITLE}
                  onChangeText={(text: any) => { setSearch(text), text.length > 0 ? setIsSelect(2) : setIsSelect(0) }}
                  extraInputStyle={styles.extraInputStyle}
                />
              </View>
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={country}
                  placeHolder={translate("CHECKOUT")["COUNTRY"]}
                  placeholderTextColor={theme.SUB_TITLE}
                  multiLine={false}
                  editable={false}
                  onChangeText={(value) => { value.length > 0 ? setIsSelect(3) : setIsSelect(0) }}
                  extraInputStyle={styles.extraInputStyle}
                  onComponentPress={() => { setCancerDisplay(false), setCountryDisplay(!countryDisplay), setStrCountry(''), setIsSelect(3) }}
                  onBlur={() => setIsSelect(0)}
                />
              </View>
              {countryDisplay && <View style={{ maxHeight: 250,marginTop: 10, width: "90%", backgroundColor: theme.PRIMARY }}>
                <View style={styles.searchVw}>
                  <Icon name="search" color={'#A2A2A2'} size={18} />
                  <TextInput placeholder={translate("COMMONTEXT")["SEARCH"]} autoFocus={true} placeholderTextColor={'#A2A2A2'} style={styles.searchInput} value={strCountry} onChangeText={(value) => { setStrCountry(value), searchTextList(value) }} />
                </View>
                <ScrollView style={{backgroundColor:"white",maxHeight:150}} showsVerticalScrollIndicator={false}>{countryRenderList()}</ScrollView> 
              </View>
              }
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={city}
                  placeHolder={translate("CHECKOUT")["CITY"]}
                  multiLine={false}
                  editable={true}
                  isIcon={false}
                  placeholderTextColor={theme.SUB_TITLE}
                  onChangeText={(text: any) => { setCity(text), text.length > 0 ? setIsSelect(4) : setIsSelect(0) }}
                  extraInputStyle={styles.extraInputStyle}
                />
              </View>
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={distance}
                  placeHolder={translate("CLINICALS")["DISTANCE"]}
                  multiLine={false}
                  editable={false}
                  onChangeText={(value) => { value.length > 0 ? setIsSelect(5) : setIsSelect(0) }}
                  onComponentPress={() => { setCountryDisplay(false), setMileDisplay(!mileDisplay), setIsSelect(5) }}
                  onBlur={() => setIsSelect(0)}
                  placeholderTextColor={theme.SUB_TITLE}
                  extraInputStyle={styles.extraInputStyle}
                />
              </View>
              {mileDisplay && <View style={{ maxHeight: 350, marginTop:10, width: "90%", backgroundColor: theme.PRIMARY }}>
                <ScrollView style={{ backgroundColor: "white", maxHeight: 150 }} showsVerticalScrollIndicator={false}>{mileRenderList()}</ScrollView>
              </View>
              }
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={recuitment}
                  placeHolder={translate("CLINICALS")["REC_STATUS"]}
                  multiLine={false}
                  editable={false}
                  onChangeText={(value) => { value.length > 0 ? setIsSelect(6) : setIsSelect(0) }}
                  placeholderTextColor={theme.SUB_TITLE}
                  extraInputStyle={styles.extraInputStyle}
                  onComponentPress={() => { setCountryDisplay(false), setRecStatusDisplay(!recStatusDisplay), setIsSelect(6) }}
                  onBlur={() => setIsSelect(0)}
                />
              </View>
               {recStatusDisplay && <View style={{ maxHeight: 150,marginTop:10, width: "90%", backgroundColor: theme.PRIMARY }}>
                <ScrollView style={{ backgroundColor: "white", maxHeight: 150 }} showsVerticalScrollIndicator={false}>{recStatusRenderList()}</ScrollView>
              </View>}
              <View style={{marginTop:10}}>
                <CommonDropDown
                  theme={theme}
                  value={phaseList && phaseList.length > 0 ? phaseList.join(", ") : ''}
                  placeHolder={translate("CLINICALS")["PHASE"]}
                  multiLine={false}
                  editable={false}
                  onChangeText={(value) => { value.length > 0 ? setIsSelect(7) : setIsSelect(0) }}
                  placeholderTextColor={theme.SUB_TITLE}
                    extraInputStyle={styles.extraInputStyle}
                  onComponentPress={() => { setCountryDisplay(false), setPhaseDisplay(!phaseDisplay), setIsSelect(7) }}
                  onBlur={() => setIsSelect(0)}
                />
              </View>
              {phaseDisplay && <View style={{ maxHeight: 350,marginTop:10, width: "90%", backgroundColor: theme.PRIMARY }}>
                <ScrollView style={{backgroundColor:"white",maxHeight:150}} showsVerticalScrollIndicator={false}>{phaseRenderList()}</ScrollView> 
              </View>
              }
              <Pressable style={styles.btnView} onPress={() => checkValidateData() }>
                <Text style={styles.btnTxt}>{translate("COMMONTEXT")["SEARCH"]}</Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        }
      </View>
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);