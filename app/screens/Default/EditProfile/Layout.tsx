/**
 * EditProfile Component
 * @Author: Astha
 * @Date: Tue April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Edit Profile
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Pressable,
  ScrollView,
  Text,
  Alert,
  Keyboard
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { TextField } from '../../../components/Plugins/Textfield/index';
import translate from '../../../utils/Text'
import { FONTFAMILY } from "../../../config/font-config";
import Tracker from '../../../components/DietPlan/Tracker'
import CitySearch from "../../../components/Onboarding/CitySearch"
import Stage from '../../../components/Stage'
import CancerSearch from '../../../components/Onboarding/CancerSearch';
import ActivitySelector from '../../../components/Onboarding/ActivitySelector'
import GenderSelection from '../../../components/GenderSelection'
import DatePicker from 'react-native-date-picker'
import actionTypes from '../../../store/actions/types';
import moment from 'moment';
import { useSelector } from "react-redux";
import Back from '../../../assets/images/Back.svg';
import DropdownView from '../../../components/Onboarding/DropdownView';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import WeightDetail from '../../../components/Onboarding/WeightDetail'
import HeightDetail from '../../../components/Onboarding/HeightDetail'
import { TouchableWithoutFeedback } from 'react-native';
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import NavigateButton from '../../../components/CommonInput/navigateButton';
import TrackerTab from '../../../components/CommonInput/trackerTab';

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
  data: any;
  route: object;
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  
  const isfromHome = props?.route?.params?.isfromHome;
  const [formData, updateFormData] = useState({
    yourname: userData?.data?.name,
    name: userData?.data?.patientName,
    profile: userData?.user_profile?.name,
    city: userData?.city?.district,
    cityName: '',
    cancerType: userData?.cancer_category?.name,
    stage: userData?.cancer_stage?.cancer_stage,
    medications: '',
    symptoms: '',
    treatment: '',
    activity: userData?.physical_activity?.length > 0 ? userData?.physical_activity[0]?.physical_activity : '',
    DOB: userData?.data?.dob,
    gender: userData?.data?.gender,
    height_metric: userData?.data?.height_metric != undefined ? userData?.data?.height_metric : 'cm',
    weight_metric: userData?.data?.weight_metric,
    height: userData?.data?.height != undefined ? userData?.data?.height : '',
    weight: userData?.data?.weight,
    medicalIssues: '',
    factors: '',
    specialization: userData?.expert_specializations?.length > 0 ? userData?.expert_specializations[0]?.name : '',
    healthStatus: userData?.health_status?.length > 0 ? userData?.health_status[0]?.name : '',
    patientgender: userData?.data?.gender,
  })

  const [formBasicData, updateFormBasicData] = useState({
    name: userData?.data?.name,
    profile: userData?.user_profile?.name,
    city: userData?.city?.district,
    cancerType: userData?.cancer_category?.name,
    stage: userData?.cancer_stage?.cancer_stage,
  })
  var defaultData = new Date('1980-01-01')
  const [date, setDate] = useState(new Date())
  const [weightMetric, setWeightMetric] = useState("Kgs")
  const [heightErr, setHeightErr] = useState(false)
  const [index, setIndex] = useState(1)
  const [citySearchDisplay, setCitySearchDisplay] = useState(false)
  const [profileDisplay, setProfileDisplay] = useState(false)
  const [cancerSearchDisplay, setCancerSearchDisplay] = useState(false)
  const [stageDisplay, setStageDisplay] = useState(false)
  const [optionModal, setOptionModal] = useState(false)
  const [activitySelection, setActivitySelection] = useState(false)
  const [datePickerDisplay, setDatePickerDisplay] = useState(false)
  const [genderDisplay, setGenderDisplay] = useState(false)
  const [weightDetailDisplay, setWeightDetailDisplay] = useState(false)
  const [heightDetailDisplay, setHeightDetailDisplay] = useState(false)
  const [specializationDisplay, setSpecializationDisplay] = useState(false)
  const [healthStatusDisplay, setHealthStatusDisplay] = useState(false)
  const [filterHealthData, setFilterHealthData] = useState([]);
  const [healthId, setHealthId] = useState(userData?.data?.chjHealthStatusId)
  const [specialzationId, setSpecializationId] = useState(userData?.data?.expertSpecializationId)
  const [cityId, setCityId] = useState(userData?.data?.cityId)
  const [profileId, setProfileId] = useState(userData?.data?.userProfileId)
  const [cancetTypeId, setCancerTypeid] = useState(userData?.data?.cancerCategoryId)
  const [cancerStageId, setCancerStageId] = useState(userData?.data?.cancerStageId)
  const [treatmentTitle, setTreatmentTitle] = useState([])
  const [showError, setShowError] = useState(false)
  const [medicationId, setMedicationId] = useState("")
  const [treatmentId, setTreatmentId] = useState("")
  const [symptomsId, setSymptomsId] = useState("")
  const [activityId, setActivityId] = useState(userData?.physical_activity?.length > 0 ? userData?.physical_activity[0]?.id : null)
  const [issuesId, setIssuesId] = useState("")
  const [factorsId, setFactorsId] = useState("")
  const [summaryValue, setSummaryValue] = useState(userData?.data?.summary)
  const [data, setData] = useState([])
  const [valueChange, setValueChange] = useState(false)
  const [isNone, setIsNone] = useState(false)
  const [paramName, setParamName] = useState('')
  const [type, setType] = useState('')
  const [isHeightMetrics, setHeightMetrics] = useState(false)
  const [isWeightMetrics, setWeightMetricsShow] = useState(false)
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState(userData?.city?.district);
  const [searchTreatmentText, setSearchTreatmentText] = useState('');
  const [searchMedication, setSearchMedication] = useState('');
  const [searchCom, setSearchCom] = useState('');
  const [searchSymptpms, setSearchSymptoms] = useState('');
  const [edit, setEdit] = useState(true);
  const [cancerText, setCancerText] = useState(userData?.cancer_category?.name);
  const [patientGenderDisplay, setPatientGenderDisplay] = useState(false)
  let heightValue = formData.height
  let medications = useSelector(state => state?.onboardingReducer?.medicationData);
  var medicalIssues = useSelector(state => state?.onboardingReducer?.medicalIssuesData);
  let symptomsData = useSelector(state => state?.onboardingReducer?.symptomsData);
  var factors = useSelector(state => state?.onboardingReducer?.factorsData);
  var treatmentData = useSelector(state => state?.onboardingReducer?.treatmentData);
  var chatData = useSelector(state => state?.chatReducer?.coachData?.length > 0 ?
    state?.chatReducer?.coachData[0].data : []);
  let onboardData = useSelector(state => state?.onboardingReducer?.onboardData);

  useEffect(() => {
    getAllData()
    if (isfromHome) {
      getCoachData()
    }
  }, []);
  const getAllData = () => {
    var inputRequest = {
      module: "user",
      action: "pre_login_api"
    }
    props.actions.getOnboard(actionTypes.GET_ONBOARD, inputRequest)
  }
  useEffect(() => {
    onboardData && onboardData?.treatment?.map(item => { treatmentId?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item });
    onboardData && onboardData?.medication?.map(item => { medicationId?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item });
    onboardData && onboardData?.comorbidities?.map(item => { issuesId?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item; });
    onboardData && onboardData?.side_effect?.map(item => { symptomsId?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item; });
  }, [onboardData]);

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

  //Helper Methods
  const checkBasicValidation = () => {
    if (formData?.yourname?.length == 0) {
      setShowError(true)
      return false
    } else if (formData?.city?.length == 0) {
      setShowError(true)
      return false
    } else if (formData?.profile?.length == 0) {
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
        if (formData?.gender?.length == 0) {
          setShowError(true)
          return false
        }
      }
      if (formData?.cancerType?.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.stage?.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.healthStatus?.length == 0) {
        setShowError(true)
        return false
      }
    }
    if (formData?.profile == 'Caregiver') {
      if (formData?.patientgender?.length == 0) {
        setShowError(true)
        return false
      } else if (formData?.name?.length == 0) {
        setShowError(true)
        return false
      }
    }
    if (formData?.profile == 'Healthcare expert') {
      if (formData?.specialization?.length == 0) {
        setShowError(true)
        return false
      }
    }
    return true;

  }
  const updatePatientGender = (pGenderVal: string) => {
    updateFormData({ ...formData, patientgender: pGenderVal })
  }
  const updateCity = (cityVal: string,) => {
    setSearchText(cityVal)
    updateFormData({ ...formData, cityName: cityVal })
  }
  const updateProfile = (profileVal: string, profileId: any) => {
    setProfileId(profileId)
    updateFormData({ ...formData, profile: profileVal.name })
  }
  const updateCancerType = (cancerVal: string, cancerId: any, parentId: any) => {
    setCancerText(cancerVal)
    setCancerTypeid(cancerId)
    updateFormData({ ...formData, cancerType: cancerVal })
  }
  const updateStage = (stageVal: string, stageid: any) => {
    setCancerStageId(stageid)
    updateFormData({ ...formData, stage: stageVal.name })
  }
  const updateTreatment = (treatmentVal: any, selectedId: any) => {
    setTreatmentId(selectedId)
    updateFormData({ ...formData, treatment: treatmentVal })
  }
  const updateMedications = (medicationsVal: any, selectedId: any) => {
    setMedicationId(selectedId)
    updateFormData({ ...formData, medications: medicationsVal })
  }
  const updateSymptoms = (symptomsVal: any, symptomIdsVal: any) => {
    updateFormData({ ...formData, symptoms: symptomsVal })
    setSymptomsId(symptomIdsVal)
  }
  const updateActivity = (val: any, id: any) => {
    setActivityId(id)
    updateFormData({ ...formData, activity: val })
  }
  const updateDob = (dobVal: string) => {
    updateFormData({ ...formData, DOB: dobVal })
  }
  const updateGender = (genderVal: string) => {
    updateFormData({ ...formData, gender: genderVal })
  }
  const updateHeightMetric = (heightMetricVal: string) => {
    updateFormData({ ...formData, height_metric: heightMetricVal })
  }
  const updateWeightMetric = (weightMetricVal: string) => {
    updateFormData({ ...formData, weight_metric: weightMetricVal })
  }
  const updateMedicalIssues = (medicalIssuesVal: any, id: any) => {
    setIssuesId(id)
    updateFormData({ ...formData, medicalIssues: medicalIssuesVal })
  }
  const updateFactors = (factorsVal: any, id: any) => {
    setFactorsId(id)
    updateFormData({ ...formData, factors: factorsVal })
  }
  const updateSpecializationStatus = (stageVal: string, stageid: any) => {
    setSpecializationId(stageid)
    updateFormData({ ...formData, specialization: stageVal.name })
  }
  const updateHealthStatus = (stageVal: string, stageid: any) => {
    setHealthId(stageid)
    updateFormData({ ...formData, healthStatus: stageVal.name })
  }
  const validate = (data: any) => {
    const isEmpty = Object.values(data).every(x => x != '');
    return isEmpty
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
  const outsideIndexTwoClose = (r1, r2, r3, r4, r5) => {
    setActivitySelection(r1)
    setDatePickerDisplay(r2)
    setGenderDisplay(r3)
    setHeightDetailDisplay(r4)
    setWeightDetailDisplay(r5)
    if (optionModal) {
      closeModal()
    }
  }
  const outsideIndexFirstClose = (r1, r2, r3, r4) => {
    setCitySearchDisplay(r1)
    setProfileDisplay(r2)
    setCancerSearchDisplay(r3)
    setStageDisplay(r4)
  }
  const openModal = (data, param, type) => {
    if (optionModal) {
      closeModal()
    } else {
      setData(data)
      setParamName(param)
      setType(type)
      setTimeout(() => {
        setOptionModal(true)
      }, 600)
    }
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
  const onNext1 = () => {
    if (checkBasicValidation()) {
      if (profileId == 5) {
        setIndex(3)
      } else {
        setIndex(2)
      }
    } else {
    }
  }
  const onNext2 = () => {
    setIndex(3)
  }
  const handleBack = () => {
    if (profileId == 5) {
      if (index == 3) {
        setIndex(1)
      } else {
        props.navigation.goBack()
      }
    } else {
      if (index == 1) {
        props.navigation.goBack()
      } else {
        setIndex(index - 1)
      }
    }
  }

  //Api Call
  const submit = async (index) => {
    console.log("index>>>", index);

    const submitData = {
      name: formData.yourname,
      patientName: formData.name,
      cityId: cityId,
      cityName: searchText,
      cancerCategoryId: cancetTypeId,
      cancerStageId: cancerStageId,
      userId: userData?.data?.userId,
      userProfileId: profileId,
      condition_ids: treatmentId,
      medication_taken: medicationId == "None" ? "" : medicationId,
      comorbidities: issuesId == "None" ? "" : issuesId,
      symptoms: symptomsId == "None" ? null : symptomsId,
      activity_level: activityId,
      chjHealthStatusId: healthId,
      dob: formData.DOB,
      gender: formData.gender || formData.patientgender,
      height: formData.height,
      weight: formData.weight,
      additional_factors: factorsId == "None" ? "" : factorsId,
      summary: summaryValue,
    }
    if (formData.activity == 'Weak') {
      submitData.conditionId = '277'
    } else if (formData.activity == 'Bedridden') {
      submitData.conditionId = '278'
    }
    if (specialzationId > 0) {
      submitData.expertSpecializationId = specialzationId
    }

    const inputRequest = {
      module: "userDetail",
      action: "update_user_detail",
      formData: {
        ...submitData
      }
    }
    // if (validate(formData) && treatmentTitle && !heightErr) {
    props.actions.callEditUserDetails(actionTypes.EDIT_USER_DETAILS, inputRequest)
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
    console.log("navigating to home")
    // } else {
    //   Alert.alert("Please complete all required information");
    // }
  }
  const getCoachData = () => {
    var inputRequest = {
      module: "chat",
      action: "chat_with_coach"
    }
    props.actions.getCoachChatId(actionTypes.COACH_CHAT, inputRequest)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"} >
        <TouchableWithoutFeedback onPress={() => {
          if (index == 1) {
            outsideIndexFirstClose(false, false, false, false)
          } else if (index == 2) {
            outsideIndexTwoClose(false, false, false, false, false)
            closeModal()
          } else if (index == 3) {
            Keyboard.dismiss();
          }
        }} >
          <View style={{ flex: 1 }} >
            <View style={styles.headerVw} >
              <Pressable onPress={() => {
                handleBack()
              }} style={styles.backVw} >
                <Back width={8} height={15} />
              </Pressable>

            </View>
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

            {/* <View style={styles.headerTitleVw}>
              <Text style={styles.subtitleText}>{index == 1 && 'Introduce Yourself'}{index == 2 && 'Tell us about your Details'}{index == 3 && translate("SUCCESSMESSAGE")["SUMMARY_TITLE"]}</Text>
            </View> */}
            {index == 1 &&
              <>
                <CommonDropDown
                  theme={theme}
                  value={formData.yourname}
                  placeHolder={translate("ONBOARDING")["NAME_AFTER"]}
                  multiLine={true}
                  editable={true}
                  isIcon={false}
                  isErrowShow={showError && formData?.yourname.length == 0 ? true : false}
                  onChangeText={(name: string) => {
                    updateFormData({ ...formData, yourname: name })
                  }}
                />

                {/* {searchText.length > 0 &&
                  <View style={{height:20, marginTop:10, marginHorizontal:15}}>
                    {searchText?.length > 0 && <Text style={styles.prefixText} numberOfLines={1} >{translate("ONBOARDING")["CITY_AFTER"]}</Text>}
                  </View>
                } */}

                {/* <GooglePlacesAutocomplete
                  placeholder={translate("ONBOARDING")["CITY_AFTER"]}
                  
                  renderRightButton={() => (
                    <View style={{ position: 'absolute', right: 12, bottom: 10 }}>
                      <MaterialIcons name='keyboard-arrow-down' size={18} color={theme.SEARCH_TITLE} />
                    </View>
                  )}
                  styles={{
                    textInputContainer: {
                      // marginTop:25,
                      marginBottom:-5,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      color: theme.GRAY_BLACK,
                    },
                    textInput: {
                      height: 30,
                      backgroundColor: theme.SELECTED,
                      color: edit ? theme.SECONDARY : theme.GRAY_BLACK,
                      fontSize: 13,
                      paddingBottom: 0,
                      paddingLeft: 5,
                      borderBottomColor: showError && formData?.yourname.length == 0 ? theme.RED : theme.SEARCH_TITLE,
                      borderBottomWidth: 1,
                      fontFamily: FONTFAMILY.POPPINS_REGULAR,
                    },
                  }}
                  onPress={(data) => {
                    updateCity(data.description)
                  }}
                  query={{
                    key: 'AIzaSyCGH4acjEkrGjauew6afJTzi7i6UiW3Yvs',
                    language: 'en',
                  }}
                /> */}

              <CommonDropDown
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
                if(inputText.length > 3){
                  onChangeTreatmentText(onboardData?.city_lists,'name', inputText, 'city')
                } else {
                  setFilterData([])
                }
                 setSearchText(inputText);
                 
               }}
             />
                {citySearchDisplay &&
               <CitySearch data={filterData} searchText={searchText} selectedId={cityId} actions={props.actions} 
               updateCity={updateCity} modalDisplay={citySearchDisplay} setModalDisplay={setCitySearchDisplay} theme={theme} />
             }

                <CommonDropDown
                  theme={theme}
                  value={formData.profile}
                  placeHolder={translate("ONBOARDING")["PROFILE_AFTER"]}
                  multiLine={false}
                  editable={false}
                  isErrowShow={showError && formData?.profile.length == 0 ? true : false}
                  onComponentPress={() => {
                    outsideIndexFirstClose(false, !profileDisplay, false, false)
                  }}
                />
                {profileDisplay &&
                  <Stage data={onboardData?.user_profile} type={1} selectedId={profileId} profile={true} actions={props.actions} updateStage={updateProfile} modalDisplay={profileDisplay} setModalDisplay={setProfileDisplay} theme={theme} />
                }

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
                            updateFormData({ ...formData, name: name })
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
                            setPatientGenderDisplay(!patientGenderDisplay)
                          }}
                        />
                        {patientGenderDisplay &&
                          <GenderSelection selected={formData.patientgender} updateGender={updatePatientGender} modalDisplay={patientGenderDisplay} setModalDisplay={setPatientGenderDisplay} theme={theme} />
                        }
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
                            setGenderDisplay(!genderDisplay)
                          }}
                        />
                        {genderDisplay &&
                          <GenderSelection selected={formData.gender} updateGender={updateGender} modalDisplay={genderDisplay} setModalDisplay={setGenderDisplay} theme={theme} />
                        }
                      </>
                    }

                    <CommonDropDown
                      theme={theme}
                      value={cancerText}
                      placeHolder={translate("ONBOARDING")["CANCER_TYPE_AFTER"]}
                      multiLine={false}
                      editable={true}
                      isErrowShow={showError && formData?.cancerType.length == 0 ? true : false}
                      onChangeText={(text: string) => {
                        setCancerText(text);
                        onChangeTreatmentText(onboardData?.cancer_category, 'name', text, 'Cancertype')
                      }}
                    />
                    {cancerSearchDisplay &&
                      <CancerSearch selectedId={cancetTypeId} actions={props.actions} updateCancerType={updateCancerType}
                        data={filterData}
                        modalDisplay={cancerSearchDisplay} setModalDisplay={setCancerSearchDisplay} theme={theme} />
                    }

                    <CommonDropDown
                      theme={theme}
                      value={formData.stage}
                      placeHolder={translate("ONBOARDING")["CANCER_STAGE_AFTER"]}
                      multiLine={false}
                      editable={false}
                      isErrowShow={showError && formData?.stage.length == 0 ? true : false}
                      onComponentPress={() => {
                        setStageDisplay(!stageDisplay)
                      }}
                    />
                    {stageDisplay &&
                      <Stage data={onboardData?.cancer_stage} type={2} selectedId={cancerStageId} profile={false} actions={props.actions} updateStage={updateStage} modalDisplay={stageDisplay} setModalDisplay={setStageDisplay} theme={theme} />
                    }
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
                        setHealthStatusDisplay(!healthStatusDisplay)
                      }}
                    />
                    {healthStatusDisplay &&
                      <Stage data={filterHealthData} type={3} selectedId={healthId} profile={true} actions={props.actions} updateStage={updateHealthStatus} modalDisplay={healthStatusDisplay} setModalDisplay={setHealthStatusDisplay} theme={theme} />
                    }
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
                        setSpecializationDisplay(!specializationDisplay)
                      }}
                    />
                    {specializationDisplay &&
                      <Stage data={onboardData?.expert_specialization} type={4} selectedId={specialzationId} profile={true} actions={props.actions} updateStage={updateSpecializationStatus} modalDisplay={specializationDisplay} setModalDisplay={setSpecializationDisplay} theme={theme} />
                    }
                  </>
                }
              </>
            }
            {index == 2 &&
              <>
                <CommonDropDown
                  theme={theme}
                  value={searchTreatmentText}
                  placeHolder={translate("ONBOARDING")["TREATMENT_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    onChangeTreatmentText(onboardData?.treatment, 'condition', '', 'Treatment')
                  }}
                  onChangeText={(treatment: string) => {
                    setSearchTreatmentText(treatment);
                    onChangeTreatmentText(onboardData?.treatment, 'condition', treatment, 'Treatment')
                  }}
                />
                {optionModal && type == 'Treatment' &&
                  <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
                }

                <CommonDropDown
                  theme={theme}
                  value={searchMedication}
                  placeHolder={translate("ONBOARDING")["MEDICATIONS_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    onChangeTreatmentText(onboardData?.medication, 'condition', '', 'Medication')
                  }}
                  onChangeText={(text: string) => {
                    setSearchMedication(text);
                    onChangeTreatmentText(onboardData?.medication, 'condition', text, 'Medication')
                  }}
                />
                {optionModal && type == 'Medication' &&
                  <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
                }

                <CommonDropDown
                  theme={theme}
                  value={searchCom}
                  placeHolder={translate("ONBOARDING")["COMORBIDITIES"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    onChangeTreatmentText(onboardData?.comorbidities, 'condition', '', 'Como')
                  }}
                  onChangeText={(text: string) => {
                    setSearchCom(text);
                    onChangeTreatmentText(onboardData?.comorbidities, 'condition', text, 'Como')
                  }}
                />
                {optionModal && type == 'Como' &&
                  <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
                }

                <CommonDropDown
                  theme={theme}
                  value={searchSymptpms}
                  placeHolder={translate("ONBOARDING")["SYMPTOM_AFTER"]}
                  multiLine={false}
                  editable={true}
                  onFocus={() => {
                    onChangeTreatmentText(onboardData?.side_effect, 'condition', '', 'Symptom')
                  }}
                  onChangeText={(text: string) => {
                    setSearchSymptoms(text);
                    onChangeTreatmentText(onboardData?.side_effect, 'condition', text, 'Symptom')
                  }}
                />
                {optionModal && type == 'Symptom' &&
                  <DropdownView data={filterData} theme={theme} onCheckBoxPressed={onCheckBoxPressed} closeModal={closeModal} />
                }

                <CommonDropDown
                  theme={theme}
                  value={formData.activity}
                  placeHolder={translate("ONBOARDING")["ACTIVITY_LEVEL"]}
                  multiLine={false}
                  editable={false}
                  onComponentPress={() => {
                    setActivitySelection(!activitySelection)
                  }}
                />
                {activitySelection &&
                  <ActivitySelector selectedId={activityId} actions={props.actions} updateActivity={updateActivity} modalDisplay={activitySelection} setModalDisplay={setActivitySelection} theme={theme} />
                }




              </>
            }
            {index == 3 &&
              <>
                <CommonDropDown
                  theme={theme}
                  value={formData.DOB}
                  placeHolder={translate("ONBOARDING")["DOB_AFTER"]}
                  multiLine={false}
                  editable={false}
                  isIcon={true}
                  iconName={"calendar-today"}
                  onComponentPress={() => {
                    outsideIndexTwoClose(false, true, false, false, false)
                  }}
                />
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
                  <HeightDetail setHeightErr={setHeightErr} formData={formData} updateFormData={updateFormData} heightDetailDisplay={heightDetailDisplay} setHeightDetailDisplay={setHeightDetailDisplay} theme={theme} updateHeightMetric={updateHeightMetric} />}

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
                />
                {weightDetailDisplay &&
                  <WeightDetail updateFormData={updateFormData} formData={formData} weightDetailDisplay={weightDetailDisplay} setWeightDetailDisplay={setWeightDetailDisplay} theme={theme} weightMetric={weightMetric} setWeightMetric={setWeightMetric} updateWeightMetric={updateWeightMetric} />}
                <TextInput
                  value={summaryValue}
                  placeholder={translate("ONBOARDING")["TREATMENT_EP"]}
                  autoFocus={true}
                  placeholderTextColor={styles.placeholderText}
                  multiline={true}
                  style={{ margin: 15, borderWidth: 0.8, marginTop: 20, borderRadius: 5, padding: 5, borderColor: theme.SEARCH_TITLE, height: 130 }}
                  onChangeText={(text: any) => setSummaryValue(text)} />
              </>
            }
            <View style={styles.bottomVw}>
              <NavigateButton
                height={41}
                theme={theme}
                buttonText={index == 3 ? 'Submit' : 'Next'}
                width={'95%'}
                onPress={index == 3 ? submit : index == 1 ? onNext1 : onNext2}
                backgroundColor={theme.SECONDARY}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* {datePickerDisplay && */}
      <DatePicker
        modal
        minimumDate={new Date("1910-01-01")}
        maximumDate={date}
        open={datePickerDisplay}
        date={defaultData}
        mode={'date'}
        onConfirm={(date) => {
          setDatePickerDisplay(false)
          let dateVal = moment(date).format('L');
          updateDob(dateVal)
        }}
        onCancel={() => {
          setDatePickerDisplay(false)
        }}
        theme={'light'}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);