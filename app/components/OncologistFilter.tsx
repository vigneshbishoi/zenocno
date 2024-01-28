import { StyleSheet, Dimensions, View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FONTFAMILY } from '../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { TextField } from './Plugins/Textfield';
import { useSelector } from 'react-redux';
import translate from '../utils/Text'
import CitySearch from './Onboarding/CitySearch';
import CancerSearch from './Onboarding/CancerSearch';
import Stage from './Stage';
import Specialization from './Specialization';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function OncologistFilter({ props, cancerType, theme, type, setType, stage, setStage,
    special, setSpecial, specialId, setSpecialId, city, setCity, cityId, setCityId, cancerId, setCancerId,
    cancerStageId, setCancerStageId, searchName, setSearchName, Apply }: any) {
    const styles = style(theme);
    const userData = useSelector((state) => state.onboardingReducer.userDetails);
    const [formData, updateFormData] = useState({
        name: userData.data.name,
        profile: userData.user_profile.name,
        city: userData.city.district,
        cancerType: userData.cancer_category.name,
        stage: userData.cancer_stage.cancer_stage,
        medications: '',
        symptoms: '',
    })
    const [citySearchDisplay, setCitySearchDisplay] = useState(false)
    const [cancerSearchDisplay, setCancerSearchDisplay] = useState(false)
    const [stageDisplay, setStageDisplay] = useState(false)
    const [specializationDisplay, setSpecializationDisplay] = useState(false)

    const updateCity = (cityVal: string, cityId: any) => {
        setCity(cityVal)
        setCityId(cityId)
    }

    const updateCancerType = (cancerVal: string, cancerId: any, parentId: any) => {
        setType(cancerVal)
        setCancerId(cancerId)
    }

    const updateStage = (stageVal: string, stageid: any) => {
        setStage(stageVal?.cancer_stage)
        setCancerStageId(stageid)
    }

    const updateSpecial = (stageVal: string, stageid: any) => {
        setSpecial(stageVal?.name)
        setSpecialId(stageVal?.ID)
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={() => { setCancerSearchDisplay(!cancerSearchDisplay) }}>
                    <TextField
                        placeholder={translate("ONBOARDING")["CANCER_TYPE_AFTER"]}
                        labelHeight={0}
                        disabled={false}
                        lineWidth={1}
                        fontSize={scale(14)}
                        value={type}
                        titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        iconName={"keyboard-arrow-down"}
                        iconType={"MaterialIcons"}
                        iconStyle={[styles.iconStyle, { color: theme.PRIMARY }]}
                        textColor={theme.WHITE}
                        baseColor={theme.GRAY_BLACK}
                        tintColor={theme.SILVER}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        containerStyle={[styles.categoryInput, styles.commonShadow, {
                            justifyContent: 'center', marginBottom: cancerSearchDisplay ? verticalScale(10) : 0
                        }]}
                    />
                </Pressable>
                {cancerSearchDisplay &&
                    <CancerSearch
                        selectedId={cancerId != '' ? cancerId : userData?.data.cancerCategoryId}
                        actions={props.actions}
                        updateCancerType={updateCancerType}
                        modalDisplay={cancerSearchDisplay}
                        setModalDisplay={setCancerSearchDisplay} theme={theme} />
                }
                <Pressable onPress={() => { setStageDisplay(!stageDisplay) }} >
                    <TextField
                        // label={translate("ONBOARDING")["CANCER_STAGE_AFTER"]}
                        placeholder={translate("ONBOARDING")["CANCER_STAGE_AFTER"]}
                        labelHeight={0}
                        disabled={false}
                        lineWidth={1}
                        fontSize={scale(14)}
                        value={stage}
                        // labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-11%', marginRight: '15%' }}
                        titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        iconName={"keyboard-arrow-down"}
                        iconType={"MaterialIcons"}
                        iconStyle={[styles.iconStyle, { color: theme.GRAY_BLACK }]}
                        textColor={theme.WHITE}
                        baseColor={theme.GRAY_BLACK}
                        tintColor={theme.SILVER}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        containerStyle={[styles.categoryInput, styles.commonShadow, {
                            justifyContent: 'center', marginBottom: stageDisplay ? verticalScale(10) : 0
                        }]}
                    />
                </Pressable>
                {stageDisplay &&
                    <Stage
                        selectedId={cancerStageId != '' ? cancerStageId : userData?.data.cancerStageId}
                        profile={false}
                        actions={props.actions}
                        updateStage={updateStage}
                        modalDisplay={stageDisplay}
                        setModalDisplay={setStageDisplay} theme={theme} />
                }
                <Pressable onPress={() => { setSpecializationDisplay(!specializationDisplay) }} >
                    <TextField
                        placeholder={translate("ONBOARDING")["SPECIALIZATION"]}
                        labelHeight={0}
                        disabled={false}
                        lineWidth={1}
                        fontSize={scale(14)}
                        value={special}
                        titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        iconName={"keyboard-arrow-down"}
                        iconType={"MaterialIcons"}
                        iconStyle={[styles.iconStyle, { color: theme.GRAY_BLACK }]}
                        textColor={theme.WHITE}
                        baseColor={theme.GRAY_BLACK}
                        tintColor={theme.SILVER}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        containerStyle={[styles.categoryInput, styles.commonShadow, {
                            justifyContent: 'center', marginBottom: specializationDisplay ? verticalScale(10) : 0
                        }]}
                    />
                </Pressable>
                {specializationDisplay &&
                    <Specialization
                        selectedId={specialId}
                        profile={false}
                        actions={props.actions}
                        updateStage={updateSpecial}
                        modalDisplay={specializationDisplay}
                        setModalDisplay={setSpecializationDisplay} theme={theme} />
                }
                <Pressable onPress={() => { setCitySearchDisplay(!citySearchDisplay) }}>
                    <TextField
                        placeholder={translate("ONBOARDING")["CITY_AFTER"]}
                        labelHeight={0}
                        disabled={false}
                        lineWidth={1}
                        fontSize={scale(14)}
                        value={city}
                        titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                        iconName={"keyboard-arrow-down"}
                        iconType={"MaterialIcons"}
                        iconStyle={[styles.iconStyle, { color: theme.PRIMARY }]}
                        textColor={theme.WHITE}
                        baseColor={theme.GRAY_BLACK}
                        tintColor={theme.SILVER}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        containerStyle={[styles.categoryInput, styles.commonShadow, {
                            justifyContent: 'center', marginBottom: citySearchDisplay ? verticalScale(10) : 0
                        }]}
                    />
                </Pressable>
                {citySearchDisplay &&
                    <CitySearch
                        selectedId={cityId != '' ? cityId : userData?.data.cityId}
                        actions={props.actions}
                        updateCity={updateCity}
                        modalDisplay={citySearchDisplay}
                        setModalDisplay={setCitySearchDisplay} theme={theme} />
                }
                <TextField
                    placeholder={translate("COMMONTEXT")["SEARCH_BY_NAME"]}
                    labelHeight={0}
                    disabled={false}
                    lineWidth={1}
                    fontSize={scale(14)}
                    value={searchName}
                    titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                    affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                    iconName={"keyboard-arrow-down"}
                    iconType={"MaterialIcons"}
                    iconStyle={[styles.iconStyle, { color: theme.PRIMARY }]}
                    textColor={theme.WHITE}
                    baseColor={theme.GRAY_BLACK}
                    tintColor={theme.SILVER}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onChangeText={(name) => setSearchName(name)}
                    editable={true}
                    placeholderTextColor={theme.SUB_TITLE}
                    containerStyle={[styles.categoryInput, styles.commonShadow, {
                        justifyContent: 'center'
                    }]}
                />
                <Pressable onPress={() => { Apply() }}
                    style={[styles.saveButton, { marginLeft: scale(2) }]}>
                    <Text style={[styles.headerText, { color: theme.PRIMARY }]}>{translate("COMMONTEXT")["APPLY"]}</Text>
                </Pressable>
            </ScrollView>
        </>
    )
}

const style = (theme: any) => {
    return StyleSheet.create({
        commonShadow: {
            shadowColor: theme.LIGHT_GRAY,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9
        },
        categoryInput: {
            borderRadius: scale(10), paddingHorizontal: scale(12),
            backgroundColor: theme.PRIMARY,
            paddingVertical: verticalScale(8),
            marginTop: verticalScale(12),
            marginHorizontal: scale(20)
        },
        iconStyle: { position: "absolute", top: '45%', right: 0, },
        saveButton: {
            borderRadius: scale(10),
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.PAGINATION_SELECCT,
            width: '90%',
            marginTop: verticalScale(30),
            padding: verticalScale(15)
        },
        headerText: {
            fontSize: scale(16),
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
    })
}