/**
 * FilterCommunity Component
 * @Author: Astha
 * @Date: Wed April 15 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Filters
 */

import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import Back from '../../../assets/images/Back.svg'
import Stage from '../../../components/Stage'
import CancerSearch from '../../../components/Onboarding/CancerSearch';
import GenderSelection from '../../../components/GenderSelection'
import CategoryModal from '../../../components/Community/CategoryModal'
import CitySearch from "../../../components/Onboarding/CitySearch"
import TreatmenFilterModel from '../../../components/Community/TreatmentFilterModal';
import actionTypes from '../../../store/actions/types';
import { TextField } from '../../../components/Plugins/Textfield/index';
import translate from '../../../utils/Text'
import { FONTFAMILY } from "../../../config/font-config";
import { useSelector } from 'react-redux';
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
  const [years, setYears] = useState([])
  const [filterIndex, setFilterIndex] = useState(0)

  const [profileDisplay, setProfileDisplay] = useState(false)
  const [cancerSearchDisplay, setCancerSearchDisplay] = useState(false)
  const [stageDisplay, setStageDisplay] = useState(false)
  const [genderDisplay, setGenderDisplay] = useState(false)
  const [datePickerDisplay, setDatePickerDisplay] = useState(false)
  const [yearDisplay, setYearDisplay] = useState(false)
  const [citySearchDisplay, setCitySearchDisplay] = useState(false)
  const [modalDisplay, setModalDisplay] = useState(false)

  const [profileId, setProfileId] = useState('')
  const [cancetTypeId, setCancerTypeid] = useState('')
  const [cancerStageId, setCancerStageId] = useState('')
  const [cityId, setCityId] = useState('')

  const [formData, updateFormData] = useState({
    profile: '',
    cancerType: '',
    stage: '',
    gender: '',
    age: '',
    DOB: '',
    year1: '',
    year2: '',
    city: '',
    treatment: '',
    treatmentId: '',
    camTreatment: '',
    camTreatmentId: '',
    healthStatus: '',
    healthStatusId: ''
  })
  var medicalTreatment = useSelector(state => state.onboardingReducer.medicalTreatment);
  var camTreatment = useSelector(state => state.onboardingReducer.camTreatment);
  var healthStatus = useSelector(state => state.onboardingReducer.healthStatuses);

  useEffect(() => {
    getYears()
    fetchMedTreatment()
    fetchCamTreatment()
    fetchHealthStatus()
  }, [])

  const getYears = () => {
    let year = 1910
    let currentYr = new Date().getFullYear()
    let allYear = []
    for (let i = 1910; i <= currentYr; i++) {
      allYear.push(i)
    }
    setYears(allYear)
  }
  const fetchMedTreatment = () => {
    var inputRequest = {
      module: 'chj_medical_treatment',
      action: 'getAll',
    };

    props.actions.callSearchCitiesAll(
      actionTypes.MED_TREATMENT_ALL,
      inputRequest,
    );
  }
  const fetchCamTreatment = () => {
    var inputRequest = {
      module: 'chj_cam_treatment',
      action: 'getAll',
    };

    props.actions.callSearchCitiesAll(
      actionTypes.CAM_TREATMENT_ALL,
      inputRequest,
    );
  }
  const fetchHealthStatus = () => {
    var inputRequest = {
      module: 'chj_health_status',
      action: 'getAll',
    };

    props.actions.callSearchCitiesAll(
      actionTypes.HEALTH_STATUS_ALL,
      inputRequest,
    );
  }
  const updateCity = (cityVal: string, cityId: any) => {
    setCityId(cityId)
    updateFormData({ ...formData, city: cityVal })
  }
  const updateProfile = (profileVal: string, profileId: any) => {
    setProfileId(profileId)
    updateFormData({ ...formData, profile: profileVal.name })
  }
  const updateCancerType = (cancerVal: string, cancerId: any, parentId: any) => {
    setCancerTypeid(cancerId)
    updateFormData({ ...formData, cancerType: cancerVal })
  }
  const updateStage = (stageVal: string, stageid: any) => {
    setCancerStageId(stageid)
    updateFormData({ ...formData, stage: stageVal.cancer_stage })
  }
  const updateGender = (genderVal: string) => {
    updateFormData({ ...formData, gender: genderVal })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />

      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={translate("COMMONTEXT")["FILTER"]}
        isRightComponent={false} />

      <ScrollView>
        <Pressable onPress={() => { setProfileDisplay(true) }}>
          <TextField
            label={translate("FILTER")["PROFILE"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.profile}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.profile.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => { setCancerSearchDisplay(true) }}>
          <TextField
            label={translate("FILTER")["CANCER_TYPE"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.cancerType}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.cancerType.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => { setStageDisplay(true) }}>
          <TextField
            label={translate("FILTER")["CANCER_STAGE"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.stage}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.stage.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <TextField
          label={translate("FILTER")["AGE_DIAGNOSED"]}
          keyboardType={"number-pad"}
          labelHeight={25}
          disabled={false}
          lineWidth={1}
          fontSize={18}
          value={formData.age}
          labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
          titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
          affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
          iconName={"calendar-today"}
          iconType={""}
          iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
          textColor={theme.WHITE}
          baseColor={theme.GRAY_BLACK}
          tintColor={theme.SILVER}
          returnKeyType="next"
          maxLength={2}
          blurOnSubmit={false}
          onChangeText={(text: any) => {
            updateFormData({ ...formData, age: text })
          }}
          containerStyle={[styles.txtContainer, formData.age.length > 0 ? {
            shadowColor: theme.SECONDARY,
            shadowOffset: { width: 1, height: 3 },
            shadowOpacity: 1.0,
            shadowRadius: 0.2,
            elevation: 2,
          } : {}]}

        />
        <Pressable onPress={() => { setGenderDisplay(true) }}>
          <TextField
            label={translate("FILTER")["GENDER"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.gender}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.gender.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => { setCitySearchDisplay(true) }}>
          <TextField
            label={translate("FILTER")["LOCATION"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.city}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"location-pin"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.city.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => { setDatePickerDisplay(true) }}>
          <TextField
            label={translate("FILTER")["YEAR_DIAGNOSED"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.year1.toString()}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.year1.toString().length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => { setYearDisplay(true) }}>
          <TextField
            label={translate("FILTER")["YEAR_REMISSION"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.year2.toString()}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.year2.toString().length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => {
          setFilterIndex(0)
          setModalDisplay(true)
        }}>
          <TextField
            label={translate("FILTER")["MEDICAL_TREATMENT"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.treatment}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.treatment.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => {
          setFilterIndex(1)
          setModalDisplay(true)
        }}>
          <TextField
            label={translate("FILTER")["CAM_TREATMENT"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.camTreatment}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.camTreatment.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>
        <Pressable onPress={() => {
          setFilterIndex(2)
          setModalDisplay(true)
        }}>
          <TextField
            label={translate("FILTER")["HEALTH_STATUS"]}
            labelHeight={25}
            disabled={false}
            lineWidth={1}
            fontSize={18}
            value={formData.healthStatus}
            labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.MEDIUM }}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            iconStyle={[{ position: "absolute", bottom: 8, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.WHITE}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={[styles.txtContainer, formData.healthStatus.length > 0 ? {
              shadowColor: theme.SECONDARY,
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 1.0,
              shadowRadius: 0.2,
              elevation: 2,
            } : {}]}

          />
        </Pressable>

        <Pressable style={styles.btnView} onPress={() => props.navigation.goBack()}>
          <Text style={styles.btnTxt}>{translate("COMMONTEXT")["APPLY"]}</Text>
        </Pressable>
      </ScrollView>
      {profileDisplay &&
        <Stage selectedId={profileId} profile={true} actions={props.actions} updateStage={updateProfile} modalDisplay={profileDisplay} setModalDisplay={setProfileDisplay} theme={theme} />
      }
      {cancerSearchDisplay &&
        <CancerSearch selectedId={cancetTypeId} actions={props.actions} updateCancerType={updateCancerType} modalDisplay={cancerSearchDisplay} setModalDisplay={setCancerSearchDisplay} theme={theme} />
      }
      {stageDisplay &&
        <Stage selectedId={cancerStageId} profile={false} actions={props.actions} updateStage={updateStage} modalDisplay={stageDisplay} setModalDisplay={setStageDisplay} theme={theme} />
      }
      {genderDisplay &&
        <GenderSelection selected={formData.gender} updateGender={updateGender} modalDisplay={genderDisplay} setModalDisplay={setGenderDisplay} theme={theme} />
      }
      {citySearchDisplay &&
        <CitySearch selectedId={cityId} actions={props.actions} updateCity={updateCity} modalDisplay={citySearchDisplay} setModalDisplay={setCitySearchDisplay} theme={theme} />
      }

      <CategoryModal
        selected={formData.year1}
        data={years}
        onSelect={(text) => {
          updateFormData({ ...formData, year1: text })
        }}
        modalDisplay={datePickerDisplay}
        setModalDisplay={setDatePickerDisplay}
        theme={theme} />

      <CategoryModal
        selected={formData.year2}
        data={years}
        onSelect={(text) => { updateFormData({ ...formData, year2: text }) }}
        modalDisplay={yearDisplay}
        setModalDisplay={setYearDisplay}
        theme={theme} />
      <TreatmenFilterModel
        selected={filterIndex == 0 ? formData.treatment : filterIndex == 1 ? formData.camTreatment : formData.healthStatus} data={filterIndex == 0 ?
          medicalTreatment?.data : filterIndex == 1 ? camTreatment?.data : healthStatus?.data}
        onSelect={(item) => {
          if (filterIndex == 0) {
            updateFormData({ ...formData, treatment: item.name, treatmentId: item.id })
          } else if (filterIndex == 1) {
            updateFormData({ ...formData, camTreatment: item.name, camTreatmentId: item.id })
          } else {
            updateFormData({ ...formData, healthStatus: item.name, healthStatusId: item.id })
          }
        }}
        modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} theme={theme} />

    </SafeAreaView>
  );
};
export default withTheme(Layout);
