/**
 * LanguageSelection layout page
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */

import React, { useState, useEffect, useRef } from 'react';
import style from './Style';
import { View, BackHandler, StatusBar, TextInput, Dimensions, Platform, Text } from 'react-native';
import Alert from "../../../components/AlertScreen/Index"
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from '../../../utils/ThemeProvider';
import translate from '../../../utils/Text'
import moment from 'moment';
import GenderSelection from '../../../components/GenderSelection'
import Stage from '../../../components/Stage'
import DatePicker from 'react-native-date-picker'
import actionTypes from '../../../store/actions/types';
import CitySearch from "../../../components/Onboarding/CitySearch"
import CancerSearch from '../../../components/Onboarding/CancerSearch';
import ActivitySelector from '../../../components/Onboarding/ActivitySelector'
import { useSelector } from "react-redux";
import DropdownView from '../../../components/Onboarding/DropdownView';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../../../components/CommonInput/appHeader';
import TrackerTab from '../../../components/CommonInput/trackerTab';
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import NavigateButton from '../../../components/CommonInput/navigateButton';
import WeightDetail from '../../../components/Onboarding/WeightDetail';
import HeightDetail from '../../../components/Onboarding/HeightDetail';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { isIphoneX } from '../../../lib/isIphoneX';
import { FONTFAMILY } from "../../../config/font-config";



const height1 = Dimensions.get('window').height;

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
}

const Layout = (props: IProps) => {
  const isfromEdit = props?.route?.params?.isFromEdit;
  const isfromHome = props?.route?.params?.isfromHome;
  let userId = useSelector((state: any) => state.loginReducer.userData?.data?.data?.id);
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  const styles = style(props.theme);
  const theme = props.theme
  let factors = useSelector(state => state?.onboardingReducer?.factorsData);
  let onboardData = useSelector(state => state?.onboardingReducer?.onboardData);
  var chatData = useSelector(state => state?.chatReducer?.coachData?.length > 0 ?
    state?.chatReducer?.coachData[0].data : []);
  const [showAlert, setShowAlert] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formData, updateFormData] = useState({
    yourname: isfromEdit ? userData?.data?.name : '',
    name: isfromEdit ? userData?.data?.patientName : '',
    profile: isfromEdit ? userData?.user_profile?.name : '',
    patientgender: isfromEdit ?  userData?.data?.gender : '',
    gender: isfromEdit ?  userData?.data?.gender : '',
    city: isfromEdit ? userData?.data?.cityName :  '',
    cancerType: isfromEdit ? userData?.cancer_category?.name : '',
    stage: isfromEdit ? userData?.cancer_stage?.cancer_stage : '',
    healthStatus: isfromEdit ? userData?.health_status?.length > 0 ? userData?.health_status[0]?.name : '' : '',
    specialization: isfromEdit ? userData?.expert_specializations?.length > 0 ? userData?.expert_specializations[0]?.name : '' : '',
    treatment: '',
    medications: '',
    medicalIssues: '',
    symptoms: '',
    height: isfromEdit ? userData?.data?.height != undefined ? userData?.data?.height : '' : '',
    height_metric: isfromEdit ? userData?.data?.height_metric != undefined ? userData?.data?.height_metric : 'cm' : 'cm',
    weight_metric: '',
    weight: isfromEdit ? userData?.data?.weight :  '',
    DOB: isfromEdit ? userData?.data?.dob != '0000-00-00' ? moment(userData?.data?.dob).format("MMM DD, YYYY") : '' : '',
    activity: isfromEdit ? userData?.physical_activity?.length > 0 ? userData?.physical_activity[0]?.physical_activity : '' : '',
    factors: '',
  })  
  
  
  const [index, setIndex] = useState(1)
  const [patientGenderDisplay, setPatientGenderDisplay] = useState(false)
  const [genderDisplay, setGenderDisplay] = useState(false)
  const [stageDisplay, setStageDisplay] = useState(false)
  const [profileDisplay, setProfileDisplay] = useState(false)
  const [summaryValue, setSummaryValue] = useState(isfromEdit ? userData?.data?.summary : '')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [citySearchDisplay, setCitySearchDisplay] = useState(false)
  const [cancerSearchDisplay, setCancerSearchDisplay] = useState(false)
  const [healthStatusDisplay, setHealthStatusDisplay] = useState(false)
  const [specializationDisplay, setSpecializationDisplay] = useState(false)
  const [weightDetailDisplay, setWeightDetailDisplay] = useState(false)
  const [heightDetailDisplay, setHeightDetailDisplay] = useState(false)
  const [datePickerDisplay, setDatePickerDisplay] = useState(false)
  const [activitySelection, setActivitySelection] = useState(false)
  const [cityId, setCityId] = useState(isfromEdit ? userData?.data?.cityId : "")
  const [cancetTypeId, setCancerTypeid] = useState("")
  const [cancerStageId, setCancerStageId] = useState("")
  const [healthId, setHealthId] = useState(isfromEdit ? userData?.data?.chjHealthStatusId : 0)
  const [specialzationId, setSpecializationId] = useState(0)
  const [profileId, setProfileId] = useState(isfromEdit ? userData?.data?.userProfileId : "")
  const [issuesId, setIssuesId] = useState("")
  const [activityId, setActivityId] = useState(isfromEdit ? userData?.physical_activity?.length > 0 ? userData?.physical_activity[0]?.id : null : null)
  const [factorsId, setFactorsId] = useState("")
  const [medicationId, setMedicationId] = useState("")
  const [symptomsId, setSymptomsId] = useState("")
  const [type, setType] = useState('')
  const [optionModal, setOptionModal] = useState(false)
  const [valueChange, setValueChange] = useState(false)
  const [treatmentId, setTreatmentId] = useState("")
  const [heightErr, setHeightErr] = useState(false)
  const [isHeightMetrics, setHeightMetrics] = useState(true)
  const [isWeightMetrics, setWeightMetricsShow] = useState(true)
  const [weightMetric, setWeightMetric] = useState("Kgs")
  const [date, setDate] = useState(new Date())
  const [searchTreatmentText, setSearchTreatmentText] = useState('');
  const [searchMedication, setSearchMedication] = useState('');
  const [searchCom, setSearchCom] = useState('');
  const [searchSymptpms, setSearchSymptoms] = useState('');
  const [cancerText, setCancerText] = useState(isfromEdit ? userData?.cancer_category?.name : '');
  const [filterData, setFilterData] = useState([]);
  const [filterHealthData, setFilterHealthData] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeCity, setPlaceCity] = useState('');
  const [placeCountry, setPlaceCountry] = useState('');
  let defaultData = new Date();
  let scrollRef = React.createRef();

  const checkBasicValidation = () => {
    if (formData?.yourname.length == 0) {
      setShowError(true)
      return false
    } else if (formData?.city.length == 0) {
    // } else if (formData?.cityName.length == 0) {
      setShowError(true)
      return false
    } else if (formData?.profile.length == 0) {
      setShowError(true)
      return false
    }
    if (formData?.profile == 'Patient' || formData?.profile == 'Caregiver' || formData?.profile == 'Survivor') {
      if (formData?.profile == 'Caregiver') {
        if (formData?.patientgender.length == 0) {
          setShowError(true)
          return false
        }
      } else {
        if (formData?.gender.length == 0) {
          setShowError(true)
          return false
        }
      }
      if (formData?.cancerType.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.stage.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.healthStatus.length == 0) {
        setShowError(true)
        return false
      }
    }
    if (formData?.profile == 'Caregiver') {
      if (formData?.patientgender.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.name.length == 0) {
        setShowError(true)
        return false
      }
    }
    if (formData?.profile == 'Healthcare expert') {
      if (formData?.specialization.length == 0) {
        setShowError(true)
        return false
      }
    }
    return true;

  }
  const onNext1 = () => {
    if (checkBasicValidation()) {
      if (profileId == 5) {
        setIndex(3)
      } else {
        setIndex(2)
      }      
      submit(1)
    }
    closeAll();
    scrollRef.current.scrollToPosition(0, 0);
  }
  const submit = async (index) => {
    const mobile = await AsyncStorage.getItem('mobile');

    const submitData = {
      userId: userId,
      userProfileId: profileId,
      name: formData.yourname,
      patientName: formData.name,
      //patientgender: formData.patientgender,
      gender: formData.gender || formData.patientgender,
      cancerCategoryId: cancetTypeId,
      cancerStageId: cancerStageId,
      cityId: cityId,
      cityName: formData.city,
      // cityName: searchText,
      condition_ids: treatmentId,
      medication_taken: medicationId == "None" ? "" : medicationId,
      comorbidities: issuesId == "None" ? "" : issuesId,
      symptoms: symptomsId == "None" ? null : symptomsId,
      height: formData.height,
      weight: formData.weight,
      dob: formData.DOB,
      activity_level: activityId,
      summary: summaryValue,
      placeId: placeId,
      placeName: placeName,
      placeCity: placeCity,
      placeCountry: placeCountry
    }
    
    
    if (specialzationId > 0) {
      submitData.expertSpecializationId = specialzationId
    }
    if (healthId > 0) {
      submitData.chjHealthStatusId = healthId
    }
    
    if(!isfromEdit){
      let [first, last] = formData.name.split(' ');
      const email = mobile + "@zenonco.io"
      last = last ? last : ""
      const obj = {
        first_name: first,
        last_name: last,
        email: email,
        billing: {
          first_name: first,
          last_name: last,
          address_1: "",
          city: "",
          state: "",
          postcode: "",
          email: email,
          country: "",
          phone: mobile
        },
        shipping: {
          first_name: first,
          last_name: last,
          address_1: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        }
      }
      props.actions.createCustomer(actionTypes.CREATE_CUSTOMER, {
        module: 'customers',
        action: '',
        formData: obj
      })
    }
    if (userData == undefined || Object.keys(userData).length === 0) {
      const inputRequest = {
        module: "userDetail",
        action: "create_profile",
        formData: {
          ...submitData
        }
      }
      props.actions.callUserDetails(actionTypes.ADD_USER_DETAILS, inputRequest)
    } else {
      submitData.googleMapsPlaceId = userData?.data?.googleMapsPlaceId
      const inputRequest = {
        module: "userDetail",
        action: "update_user_detail",
        formData: {
          ...submitData
        }
      }
      props.actions.callEditUserDetails(actionTypes.EDIT_USER_DETAILS, inputRequest)
    }
    if (index == 3) {
      if(isfromEdit){
        if (isfromHome) {
          let user = {
            name: chatData?.name,
            image: chatData?.image ? chatData?.image : null,
            userId: chatData?.userId ? chatData?.userId : "",
            cancerName: chatData?.cancer_category?.name ? chatData?.cancer_category?.name : "",
            cancerStage: chatData?.cancer_stage?.cancer_stage ? chatData?.cancer_stage?.cancer_stage : ""
          }
          props.navigation.goBack()
          props.navigation.navigate('Zen.Chat', { user: user });
        } else {
          props.navigation.goBack()
        }
      }else {
        props.navigation.navigate('Zen.SuccessMessage', { isSignup: false })
      }
      
    } else {
      AsyncStorage.setItem('loggedIn', 'true')
    }
  }
  const onSkip = () => {
    if (index < 3) {
      setIndex(index + 1)
    } else if (index == 3) {
      submit(3)
    }
    closeAll();
    scrollRef.current.scrollToPosition(0, 0);
  }
  const getAllFactors = () => {
    var inputRequest = {
      module: "condition",
      action: "getAllSpecialConditions"
    }
    props.actions.callFactors(actionTypes.GET_FACTORS, inputRequest)
  }
  const getAllData = () => {
    var inputRequest = {
      module: "user",
      action: "pre_login_api"
    }
    props.actions.getOnboard(actionTypes.GET_ONBOARD, inputRequest)
  }
  const getCoachData = () => {
    var inputRequest = {
      module: "chat",
      action: "chat_with_coach"
    }
    props.actions.getCoachChatId(actionTypes.COACH_CHAT, inputRequest)
  }
  useEffect(() => {
    getAllFactors()
    getAllData()
    if (isfromHome) {
      getCoachData()
    }
  }, []);
  useEffect(() => {
    factors && factors[0]?.data?.map(item => { factorsId?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item });
  }, [factors]);
  useEffect(() => {
    const backAction = () => {
      handleBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    let factorText = ''
    let symptonText = ''
    let issueText = ''
    let medicationText = ''
    let treatmentText = ''
    if (userData?.additional_factors?.length > 0) {
      let ids = ''
      userData?.additional_factors.map((item, index) => {
        if (index == 0) {
          factorText = item.condition
          ids = item.id
        } else {
          factorText = factorText + ',' + item.condition
          ids = ids + ',' + item.id
        }
      })
      setFactorsId(ids.toString())
    }
    if (userData?.symptom?.length > 0) {
      let ids1 = ''
      userData?.symptom.map((item, index) => {
        if (index == 0) {
          symptonText = item.condition
          ids1 = item.id
        } else {
          symptonText = symptonText + ',' + item.condition
          ids1 = ids1 + ',' + item.id
        }
      })
      setSymptomsId(ids1.toString())
    }
    if (userData?.comorbidities?.length > 0) {
      let ids = ''
      userData?.comorbidities.map((item, index) => {
        if (index == 0) {
          issueText = item.condition
          ids = item.id
        } else {
          issueText = issueText + ',' + item.condition
          ids = ids + ',' + item.id
        }
      })
      setIssuesId(ids.toString())
    }
    if (userData?.medication_taken?.length > 0) {
      let ids = ''
      userData?.medication_taken.map((item, index) => {
        if (index == 0) {
          medicationText = item.condition
          ids = item.id
        } else {
          medicationText = medicationText + ',' + item.condition
          ids = ids + ',' + item.id
        }
      })
      setMedicationId(ids.toString())
    }
    if (userData?.condition_data?.length > 0) {
      let ids = ''
      userData?.condition_data.map((item, index) => {
        if (index == 0) {
          treatmentText = item.condition
          ids = item.id
        } else {
          treatmentText = treatmentText + ',' + item.condition
          ids = ids + ',' + item.id
        }
      })
      setTreatmentId(ids.toString())
    }
    updateFormData({
      ...formData, factors: factorText, symptoms: symptonText, medicalIssues: issueText, medications: medicationText,
      treatment: treatmentText
    })
    setSearchTreatmentText(treatmentText)
    setSearchSymptoms(symptonText)
    setSearchCom(issueText)
    setSearchMedication(medicationText)
  }, [userData?.data])

  const updatePatientGender = (pGenderVal: string) => {
    setIsOpenModal(false)
    updateFormData({ ...formData, patientgender: pGenderVal })
  }
  const updateGender = (genderVal: string) => {
    setIsOpenModal(false)
    updateFormData({ ...formData, gender: genderVal })
  }
  const updateHeightMetric = (heightMetricVal: string) => {
    updateFormData({ ...formData, height_metric: heightMetricVal })
  }
  const updateWeightMetric = (weightMetricVal: string) => {
    updateFormData({ ...formData, weight_metric: weightMetricVal })
  }
  const updateStage = (stageVal: string, stageid: any) => {
    setIsOpenModal(false)
    setCancerStageId(stageid)
    updateFormData({ ...formData, stage: stageVal.name })
  }
  const updateHealthStatus = (stageVal: string, stageid: any) => {
    setIsOpenModal(false)
    setHealthId(stageid)
    updateFormData({ ...formData, healthStatus: stageVal.name })
  }
  const updateSpecializationStatus = (stageVal: string, stageid: any) => {
    setIsOpenModal(false)
    setSpecializationId(stageid)
    updateFormData({ ...formData, specialization: stageVal.name })
  }
  const updateProfile = (profileVal: string, profileId: any) => {
    setIsOpenModal(false)
    setProfileId(profileId)
    updateFormData({ ...formData, profile: profileVal.name })
  }
  const updateDob = (dobVal: string) => {
    updateFormData({ ...formData, DOB: dobVal })
  }
  const updateCity = (cityVal: string) => {   
    updateFormData({ ...formData, city: cityVal })    
  }
  const updateCancerType = (cancerVal: string, cancerId: any, parentId: any) => {
    setIsOpenModal(false)
    setCancerTypeid(cancerId)
    updateFormData({ ...formData, cancerType: cancerVal })
    setCancerText(cancerVal)
  }
  const updateWight = (val: any, id: any) => {
    updateFormData({ ...formData, weight: val })
  }
  const updateTreatment = (treatmentVal: any, selectedId: any) => {
    setTreatmentId(selectedId)
    updateFormData({ ...formData, treatment: treatmentVal })
  }
  const updateActivity = (val: any, id: any) => {
    setIsOpenModal(false)
    setActivityId(id)
    updateFormData({ ...formData, activity: val })
  }
  const updateFactors = (factorsVal: any, id: any) => {
    console.log(id, "factors")
    setFactorsId(id)
    updateFormData({ ...formData, factors: factorsVal })
  }
  const updateMedicalIssues = (medicalIssuesVal: any, id: any) => {
    setIssuesId(id)
    updateFormData({ ...formData, medicalIssues: medicalIssuesVal })
  }
  const updateMedications = (medicationsVal: any, selectedId: any) => {
    setMedicationId(selectedId)
    updateFormData({ ...formData, medications: medicationsVal })
  }
  const updateSymptoms = (symptomsVal: any, symptomIdsVal: any) => {
    updateFormData({ ...formData, symptoms: symptomsVal })
    setSymptomsId(symptomIdsVal)
  }
  const onCheckBoxPressed = (id) => {
    filterData?.map(item => {
      if (item.id == id) {
        if (item.selected) {
          item.selected = false
        } else {
          item.selected = true
        }
      }
      return item
    });
    setFilterData(filterData)
    setValueChange(!valueChange)

    if (type == 'Treatment') {
      onboardData?.treatment && onboardData?.treatment?.map(item => {
        if (item.id == id) {
          if (item.selected) {
            item.selected = false
          } else {
            item.selected = true
          }
        }
        return item
      });
    }
    else if (type == 'Medication') {
      onboardData?.medication && onboardData?.medication?.map(item => {
        if (item.id == id) {
          if (item.selected) {
            item.selected = false
          } else {
            item.selected = true
          }
        }
        return item
      });
    } else if (type == 'Como') {
      onboardData?.comorbidities?.map(item => {
        if (item.id == id) {
          if (item.selected) {
            item.selected = false
          } else {
            item.selected = true
          }
        }
        return item
      });
    } else if (type == 'Symptom') {
      onboardData?.side_effect?.map(item => {
        if (item.id == id) {
          if (item.selected) {
            item.selected = false
          } else {
            item.selected = true
          }
        }
        return item
      });
    }
  }
  const closeModal = () => {
    setIsOpenModal(false)
    let selectedData: any = []
    let selectedId: any = []
    if (type == 'Treatment') {
      onboardData?.treatment?.map(item => {
        if (item.selected) {
          item.selected && selectedData.push(item.condition)
          item.selected && selectedId.push(item.id)
        }
      });
      updateTreatment(selectedData?.join(", "), selectedId?.join(", "));
      setSearchTreatmentText(selectedData?.join(", "))
    } else if (type == 'Medication') {
      onboardData?.medication?.map(item => {
        if (item.selected) {
          item.selected && selectedData.push(item.condition)
          item.selected && selectedId.push(item.id)
        }
      });
      updateMedications(selectedData?.join(", "), selectedId?.join(", "));
      setSearchMedication(selectedData?.join(", "))
    } else if (type == 'Como') {
      onboardData?.comorbidities?.map(item => {
        if (item.selected) {
          item.selected && selectedData.push(item.condition)
          item.selected && selectedId.push(item.id)
        }
      });
      updateMedicalIssues(selectedData?.join(", "), selectedId?.join(", "));
      setSearchCom(selectedData?.join(", "))
    } else if (type == 'Symptom') {
      onboardData?.side_effect?.map(item => {
        if (item.selected) {
          item.selected && selectedData.push(item.condition)
          item.selected && selectedId.push(item.id)
        }
      });
      updateSymptoms(selectedData?.join(", "), selectedId?.join(", "));
      setSearchSymptoms(selectedData?.join(", "))
    } else if (type == 'Factor') {
      factors && factors[0]?.data.map(item => {
        if (item.selected) {
          item.selected && selectedData.push(item.condition)
          item.selected && selectedId.push(item.id)
        }
      });
      updateFactors(selectedData?.join(", "), selectedId?.join(", "));
    }
    setOptionModal(false)
  }
  const onNext2 = () => {
    setIndex(3)
    submit(2)
    closeAll();
    scrollRef?.current?.scrollToPosition(0, 0);
  }
  function onChangeTreatmentText(data, param, text, type) {
    let filterData = data.filter(item => item[param].toLowerCase().includes(text.toLowerCase()))
    setFilterData(JSON.parse(JSON.stringify(filterData)))
    setType(type)
    setTimeout(() => {
      if (type == 'Cancertype') {
        setCancerSearchDisplay(true)
      } else if (type == 'city') {
        setCitySearchDisplay(true)
      } else {
        setOptionModal(true)
      }
    }, 600)
  }
  const handleBack = () => {
    if (profileId == 5) {
      if (index == 3) {
        setIndex(1)
      } else{ 
        isfromEdit ? props.navigation.goBack() : props.navigation.navigate('Zen.LoginScreen')
      }
    } else {
      if (index == 1) {
        isfromEdit ? props.navigation.goBack() : props.navigation.navigate('Zen.LoginScreen')
      } else {
        setIndex(index - 1)
        setTimeout(() => {
          updateCity(userData?.data?.cityName)
        },100)
      }
    }
  }
  const closeAll = () => {
    setIsOpenModal(false)
    setProfileDisplay(false)
    setPatientGenderDisplay(false)
    setGenderDisplay(false)
    setStageDisplay(false)
    setHealthStatusDisplay(false)
    setSpecializationDisplay(false)
    setCancerSearchDisplay(false)
    setType('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <AppHeader
        theme={theme}
        onBackPress={() => {
          handleBack()
          closeAll();
          scrollRef.current.scrollToPosition(0, 0);
        }}
        headerTitle={translate("ONBOARDING")["HEADER_TITLE"]}
        isRightComponent={true}
        isText={index == 1 ? false : true}
        rightText={translate("ONBOARDING")["SKIP"]}
        onRightPress={onSkip}
      />

      <View style={{ marginTop: 10 }} >
        <TrackerTab
          theme={theme}
          totalNumber={profileId == 5 ? 2 : 3}
          index={index}
          tab1Title={translate("ONBOARDING")["BASIC"]}
          tab2Title={translate("ONBOARDING")["MEDICAL"]}
          tab3Title={translate("ONBOARDING")["OTHERS"]}
          onFirstTabPress={() => { }}
          onSecondTabPress={() => { }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView ref={scrollRef} bounces={false} extraHeight={0} style={{ marginTop: 20}} keyboardShouldPersistTaps={'handled'}>
          <View style={{ height: height1 }}>
            {index == 1 && <>
              <CommonDropDown
                maxLength={30}
                theme={theme}
                value={formData.yourname}
                placeHolder={translate("ONBOARDING")["YOUR_NAME"]}
                multiLine={false}
                editable={true}
                isIcon={false}
                isErrowShow={showError && formData?.yourname.length == 0 ? true : false}
                onChangeText={(yourname: string) => {
                  let name = yourname.replace(/[^a-zA-Z\s]/gi, '')
                  updateFormData({ ...formData, yourname: name })
                }}
              />
               <View style={{height:20, marginHorizontal: 15, marginTop: 8}}>
                {formData.city?.length > 0 && <Text style={{
                  fontSize: 11,
                  color: theme.SUB_TITLE,
                  fontFamily: FONTFAMILY.POPPINS_REGULAR,
                }} numberOfLines={1} >City</Text>}
                </View>

              <GooglePlacesAutocomplete
                  placeholder={translate("ONBOARDING")["CITY_AFTER"]}
                  renderRightButton={() => (
                    <View style={{ position: 'absolute', right: 12, bottom: 10 }}>
                      <MaterialIcons name='keyboard-arrow-down' size={18} color={theme.SEARCH_TITLE} />
                    </View>
                  )}
                  styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: [styles.textInput ,{
                      borderBottomColor: showError && formData.city.length == 0 ? theme.RED : theme.SEARCH_TITLE}],
                      container: {
                        flex: 0,
                      },
                      poweredContainer: {
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderColor: '#c8c7cc',
                        borderTopWidth: 0.5,
                      },
                  }}
                  onPress={(data) => {
                    setPlaceId(data.place_id)
                    setPlaceName(data.description)
                    if(data?.terms?.length > 2){
                      const last3Again = data?.terms?.slice(data?.terms?.length - 3);
                      setPlaceCity(last3Again[0]?.value)
                    }
                    if(data?.terms?.length > 0){
                      const last3Again = data?.terms?.slice(data?.terms?.length - 1);
                      setPlaceCity(last3Again[0]?.value)
                    }
                    updateCity(data.description)
                  }}
                  textInputProps={{value: formData.city, onChangeText: (value) => {
                      updateCity(value); 
                  }}}
                  query={{
                    key: 'AIzaSyCGH4acjEkrGjauew6afJTzi7i6UiW3Yvs',
                    language: 'en',
                  }}
                />

              {/* <CommonDropDown
                theme={theme}
                value={searchText}
                placeHolder={translate("ONBOARDING")["CITY_AFTER"]}
                multiLine={false}
                editable={true}
                isErrowShow={showError && formData?.city.length == 0 ? true : false}
                // onComponentPress={() => {
                //   outsideIndexFirstClose(false, false, false, false)
                // }}
                onChangeText={(inputText: string) => {
                  setSearchText(inputText);
                  onChangeTreatmentText(onboardData?.city_lists, 'name', inputText, 'city')
                }}
              /> */}
              {/* {citySearchDisplay &&
                <CitySearch data={filterData} searchText={searchText} selectedId={cityId} actions={props.actions}
                  updateCity={updateCity} modalDisplay={citySearchDisplay} setModalDisplay={setCitySearchDisplay} theme={theme} />
              } */}

              <CommonDropDown
                theme={theme}
                value={formData.profile}
                placeHolder={translate("ONBOARDING")["PROFILE_AFTER"]}
                multiLine={false}
                editable={false}
                onComponentPress={() => {
                  if (isOpenModal) {
                    closeAll()
                  } else {
                    setIsOpenModal(true)
                    setProfileDisplay(true)
                  }
                }}
              />


              {(profileId == 1 || profileId == 3 || profileId == 2) &&
                <>
                  {(profileId != 1 && profileId != 3) &&
                    <>
                      <CommonDropDown
                        theme={theme}
                        value={formData.name}
                        placeHolder={translate("ONBOARDING")["PATIENT_NAME"]}
                        multiLine={false}
                        editable={true}
                        isIcon={false}
                        isErrowShow={showError && formData?.name.length == 0 ? true : false}
                        onChangeText={(name: string) => {
                          let editName = name.replace(/[^a-zA-Z\s]/gi, '')
                          updateFormData({ ...formData, name: editName })
                        }}
                      />
                      <CommonDropDown
                        theme={theme}
                        value={formData.patientgender}
                        placeHolder={translate("ONBOARDING")["PATIENT_GENDER"]}
                        multiLine={false}
                        editable={false}
                        isErrowShow={showError && formData?.patientgender.length == 0 ? true : false}
                        onComponentPress={() => {
                          if (isOpenModal) {
                            closeAll()
                          } else {
                            setIsOpenModal(true)
                            setPatientGenderDisplay(!patientGenderDisplay)
                          }
                        }}
                      />

                    </>
                  }

                  {profileId != 2 &&
                    <>
                      <CommonDropDown
                        theme={theme}
                        value={formData.gender}
                        placeHolder={translate("ONBOARDING")["GENDER_AFTER"]}
                        multiLine={false}
                        editable={false}
                        isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                        onComponentPress={() => {
                          if (isOpenModal) {
                            closeAll()
                          } else {
                            setIsOpenModal(true)
                            setGenderDisplay(!genderDisplay)
                          }
                        }}
                      />
                    </>
                  }

                  <CommonDropDown
                    theme={theme}
                    value={cancerText}
                    placeHolder={translate("ONBOARDING")["CANCER_TYPE_AFTER"]}
                    multiLine={false}
                    editable={true}
                    isErrowShow={showError && formData?.cancerType.length == 0 ? true : false}
                    onFocus={() => {
                      if (isOpenModal) {
                        closeAll()
                      } else {
                        setIsOpenModal(true)
                        onChangeTreatmentText(onboardData?.cancer_category, 'name', '', 'Cancertype')
                      }
                    }}
                    onChangeText={(text: string) => {
                      setCancerText(text);
                      onChangeTreatmentText(onboardData?.cancer_category, 'name', text, 'Cancertype')
                    }}
                    isClose={cancerSearchDisplay ? true : false}
                    onClose={() => closeAll()}
                  />

                  <CommonDropDown
                    theme={theme}
                    value={formData.stage}
                    placeHolder={translate("ONBOARDING")["CANCER_STAGE_AFTER"]}
                    multiLine={false}
                    editable={false}
                    isErrowShow={showError && formData?.stage.length == 0 ? true : false}
                    onComponentPress={() => {
                      if (isOpenModal) {
                        closeAll()
                      } else {
                        setIsOpenModal(true)
                        setStageDisplay(!stageDisplay)
                      }
                    }}
                  />

                  <CommonDropDown
                    theme={theme}
                    value={formData.healthStatus}
                    placeHolder={translate("ONBOARDING")["HEALTH_STATUS"]}
                    multiLine={false}
                    editable={false}
                    onComponentPress={() => {
                      if (profileId == 1 || profileId == 3) {
                        let filterData = onboardData?.health_status?.filter(item => item.id != 4)
                        setFilterHealthData(filterData)
                      } else {
                        setFilterHealthData(onboardData?.health_status)
                      }
                      setValueChange(!valueChange)
                      if (isOpenModal) {
                        closeAll()
                      } else {
                        setIsOpenModal(true)
                        setHealthStatusDisplay(!healthStatusDisplay)
                      }
                    }}
                  />
                </>}

              {profileId == 5 &&
                <>
                  <CommonDropDown
                    theme={theme}
                    value={formData.specialization}
                    placeHolder={translate("ONBOARDING")["SPECIALIZATION"]}
                    multiLine={false}
                    editable={false}
                    onComponentPress={() => {
                      if (isOpenModal) {
                        closeAll()
                      } else {
                        setIsOpenModal(true)
                        setSpecializationDisplay(!specializationDisplay)
                      }
                    }}
                  />
                </>
              }
            </>}

            {index == 2 &&
              <>
                <CommonDropDown
                  theme={theme}
                  value={searchTreatmentText}
                  placeHolder={translate("ONBOARDING")["TREATMENT_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    if (isOpenModal) {
                      closeAll()
                    } else {
                      setIsOpenModal(true)
                      onChangeTreatmentText(onboardData?.treatment, 'condition', '', 'Treatment')
                    }
                  }}
                  onChangeText={(treatment: string) => {
                    setSearchTreatmentText(treatment);
                    onChangeTreatmentText(onboardData?.treatment, 'condition', treatment, 'Treatment')
                  }}
                  isSave={optionModal && type == 'Treatment' ? true : false}
                  onSave={() => closeModal()}
                />

                <CommonDropDown
                  theme={theme}
                  value={searchMedication}
                  placeHolder={translate("ONBOARDING")["MEDICATIONS_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    if (isOpenModal) {
                      closeAll()
                    } else {
                      setIsOpenModal(true)
                      onChangeTreatmentText(onboardData?.medication, 'condition', '', 'Medication')
                    }
                  }}
                  onChangeText={(text: string) => {
                    setSearchMedication(text);
                    onChangeTreatmentText(onboardData?.medication, 'condition', text, 'Medication')
                  }}
                  isSave={optionModal && type == 'Medication' ? true : false}
                  onSave={() => closeModal()}
                />

                <CommonDropDown
                  theme={theme}
                  value={searchCom}
                  placeHolder={translate("ONBOARDING")["COMORBIDITIES"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    if (isOpenModal) {
                      closeAll()
                    } else {
                      setIsOpenModal(true)
                      onChangeTreatmentText(onboardData?.comorbidities, 'condition', '', 'Como')
                    }
                  }}
                  onChangeText={(text: string) => {
                    setSearchCom(text);
                    onChangeTreatmentText(onboardData?.comorbidities, 'condition', text, 'Como')
                  }}
                  isSave={optionModal && type == 'Como' ? true : false}
                  onSave={() => closeModal()}
                />

                <CommonDropDown
                  theme={theme}
                  value={searchSymptpms}
                  placeHolder={translate("ONBOARDING")["SYMPTOM_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    if (isOpenModal) {
                      closeAll()
                    } else {
                      setIsOpenModal(true)
                      onChangeTreatmentText(onboardData?.side_effect, 'condition', '', 'Symptom')
                    }
                  }}
                  onChangeText={(text: string) => {
                    setSearchSymptoms(text);
                    onChangeTreatmentText(onboardData?.side_effect, 'condition', text, 'Symptom')
                  }}
                  isSave={optionModal && type == 'Symptom' ? true : false}
                  onSave={() => closeModal()}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.activity}
                  placeHolder={translate("ONBOARDING")["ACTIVITY_LEVEL"]}
                  multiLine={false}
                  editable={false}
                  onComponentPress={() => {
                    if (isOpenModal) {
                      closeAll()
                    } else {
                      setIsOpenModal(true)
                      setActivitySelection(!activitySelection)
                    }
                  }}
                />

              </>
            }

            {index == 3 && <>
              <CommonDropDown
                theme={theme}
                value={formData.height}
                placeHolder={translate("ONBOARDING")["HEIGHT_AFTER"]}
                multiLine={false}
                editable={true}
                isfromHW={true}
                firstText={'Inch'}
                secondText={'CM'}                
                isMetrics={isHeightMetrics}
                onSelectFirst={() => {
                  updateHeightMetric('ft')
                  setHeightMetrics(true)
                }}
                onSelectSecond={() => {
                  updateHeightMetric('cm')
                  setHeightMetrics(false)
                }}
                formData={formData}
                onChangeText={(heightValue: string) => {
                  if (formData.height_metric == 'ft') {
                    if (heightValue.length > 0) {
                      updateFormData({ ...formData, height: heightValue })
                      var inch = parseInt(heightValue)
                      if (inch > 11) {
                        setHeightErr(true)
                      }
                      else {
                        setHeightErr(false)
                      }
                    }
                  } else if (formData.height_metric == 'cm') {
                    updateFormData({ ...formData, height: heightValue })
                  }
                }}
              />
              {heightDetailDisplay &&
                <HeightDetail setHeightErr={setHeightErr} formData={formData} updateFormData={updateFormData} heightDetailDisplay={heightDetailDisplay} setHeightDetailDisplay={setHeightDetailDisplay} theme={theme} updateHeightMetric={updateHeightMetric} />
              }

              <CommonDropDown
                theme={theme}
                value={formData.weight}
                placeHolder={translate("ONBOARDING")["WEIGHT_AFTER"]}
                multiLine={false}
                editable={true}
                isfromHW={true}
                firstText={'KG'}
                secondText={'LBS'}
                isMetrics={isWeightMetrics}
                onSelectFirst={() => {
                  setWeightMetric('Kgs')
                  updateWeightMetric('Kgs')
                  setWeightMetricsShow(true)
                }}
                onSelectSecond={() => {
                  setWeightMetric('Lbs')
                  updateWeightMetric('Lbs')
                  setWeightMetricsShow(false)
                }}
                onChangeText={(weightValue: string) => {
                  updateFormData({ ...formData, weight: weightValue })
                }}
              // onComponentPress={() => {
              //    setWeightDetailDisplay(!weightDetailDisplay)
              // }}
              />
              {weightDetailDisplay &&
                <WeightDetail updateFormData={updateFormData} formData={formData} weightDetailDisplay={weightDetailDisplay} setWeightDetailDisplay={setWeightDetailDisplay} theme={theme} weightMetric={weightMetric} setWeightMetric={setWeightMetric} updateWeightMetric={updateWeightMetric} />
              }

              <CommonDropDown
                theme={theme}
                // value={formData.DOB}
                value={formData.DOB == '' || formData.DOB == 'Invalid date' ? '' : moment(formData.DOB).format('MMM DD, YYYY')}
                placeHolder={translate("ONBOARDING")["DOB_AFTER"]}
                multiLine={false}
                iconName="calendar-today"
                editable={false}
                onComponentPress={() => {
                  setDatePickerDisplay(true)
                }}
              />

              <TextInput
                value={summaryValue}
                placeholder={translate("ONBOARDING")["TREATMENT_EP"]}
                autoFocus={false}
                placeholderTextColor={styles.placeholderText}
                multiline={true}
                style={{ margin: 15, borderWidth: 0.8, marginTop: 20, textAlignVertical: "top", borderRadius: 5, padding: 5, borderColor: theme.SEARCH_TITLE, height: 130 }}
                onChangeText={(text: any) => setSummaryValue(text)} />
            </>}

            <View style={styles.btnContainer}>
              <NavigateButton
                height={41}
                theme={theme}
                buttonText={index == 3 ? translate("ONBOARDING")["CONTINUE"] : translate("COMMONTEXT")["CONTINUE"]}
                width={'95%'}
                onPress={() => { index == 3 ? submit(3) : index == 1 ? onNext1() : onNext2(); }}
                backgroundColor={theme.SECONDARY}
              />
            </View>
            {optionModal && type == 'Treatment' &&
              <View style={[styles.dropdownTopVw,{top: Platform.OS == 'ios' ? isIphoneX() ? '7%' : '10%' : '9%'}]}>
                <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
              </View>
            }
            {optionModal && type == 'Medication' &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '13%' : '18%' : '18%' }]}>
                <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
              </View>
            }
            {optionModal && type == 'Como' &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '20%' : '26%' : '25%' }]}>
                <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
              </View>
            }
            {optionModal && type == 'Symptom' &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '26%' : '35%' : '33%' }]}>
                <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
              </View>
            }
            {activitySelection &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '32%' : '43%' : '42%' }]}>
                <ActivitySelector selectedId={activityId} actions={props.actions} updateActivity={updateActivity} modalDisplay={activitySelection} setModalDisplay={setActivitySelection} theme={theme} />
              </View>
            }
            {profileDisplay &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '20%' : '27%' : '26%' }]}>
                <Stage data={onboardData?.user_profile} type={1} selectedId={profileId} profile={true} actions={props.actions} updateStage={updateProfile} modalDisplay={profileDisplay} setModalDisplay={setProfileDisplay} theme={theme} />
              </View>
            }
            {stageDisplay &&
              <View style={[styles.dropdownTopVw, { top: (profileId == 1 || profileId == 3) ? Platform.OS == 'ios' ? isIphoneX() ? '38%' : '52%' : '50%' : Platform.OS == 'ios' ? isIphoneX() ? '45%' : '60%' : '58%' }]}>
                <Stage data={onboardData?.cancer_stage} type={2} selectedId={cancerStageId} profile={false} actions={props.actions} updateStage={updateStage} modalDisplay={stageDisplay} setModalDisplay={setStageDisplay} theme={theme} />
              </View>
            }
            {specializationDisplay &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '26%' : '35%' : '34%' }]}>
                <Stage data={onboardData?.expert_specialization} type={4} selectedId={specialzationId} profile={true} actions={props.actions} updateStage={updateSpecializationStatus} modalDisplay={specializationDisplay} setModalDisplay={setSpecializationDisplay} theme={theme} />
              </View>
            }
            {healthStatusDisplay &&
              <View style={[styles.dropdownTopVw, { top: (profileId == 1 || profileId == 3) ? Platform.OS == 'ios' ? isIphoneX() ? '45%' : '60%' : '58%' : Platform.OS == 'ios' ? isIphoneX() ? '51%' : '68%' : '67%' }]}>
                <Stage data={filterHealthData} type={3} selectedId={healthId} profile={true} actions={props.actions} updateStage={updateHealthStatus} modalDisplay={healthStatusDisplay} setModalDisplay={setHealthStatusDisplay} theme={theme} />
              </View>
            }
            {genderDisplay &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '26%' : '35%' : '33%' }]}>
                <GenderSelection selected={formData.gender} updateGender={updateGender} modalDisplay={genderDisplay} setModalDisplay={setGenderDisplay} theme={theme} />
              </View>
            }
            {patientGenderDisplay &&
              <View style={[styles.dropdownTopVw, { top: Platform.OS == 'ios' ? isIphoneX() ? '32%' : '43%' : '41%' }]}>
                <GenderSelection selected={formData.patientgender} updateGender={updatePatientGender} modalDisplay={patientGenderDisplay} setModalDisplay={setPatientGenderDisplay} theme={theme} />
              </View>
            }
            {cancerSearchDisplay &&
              // <View style={[styles.dropdownTopVw, { top: (profileId == 1 || profileId == 3) ? '50%' : '60%' }]}>
              <View style={[styles.dropdownTopVw, { top: (profileId == 1 || profileId == 3) ? Platform.OS == 'ios' ? isIphoneX() ? '32%' : '43%' : '42%' : Platform.OS == 'ios' ? isIphoneX() ? '38%' : '51%' : '50%' }]}> 
                <CancerSearch selectedId={cancetTypeId} actions={props.actions} updateCancerType={updateCancerType}
                  data={filterData}
                  modalDisplay={cancerSearchDisplay} setModalDisplay={setCancerSearchDisplay} theme={theme} />
              </View>
            }
          </View>
        </KeyboardAwareScrollView>
      </View>
      <DatePicker
        modal
        minimumDate={new Date("1910-01-01")}
        maximumDate={date}
        open={datePickerDisplay}
        date={defaultData}
        mode={'date'}
        onConfirm={(date) => {
          setDatePickerDisplay(false)
          let dateVal = moment(date).format('MMM DD, YYYY');          
          updateDob(dateVal)
        }}
        onCancel={() => {
          setDatePickerDisplay(false)
        }}
        theme={'light'}
      />
      <Alert
        show={showAlert}
        title={"Sorry !"}
        message={"All the fields are required!"}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"OK"}
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
    </SafeAreaView >
  );
};
export default withTheme(Layout);