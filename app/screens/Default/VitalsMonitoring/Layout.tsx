/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    FlatList,
    TextInput,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Fever from '../../../assets/images/fever_ic.svg'
import Anxiety from '../../../assets/images/anxiety_dl.svg'
import Appetiteloss from '../../../assets/images/appetiteloss.svg'
import Constipation from '../../../assets/images/constipation.svg'
import Depression from '../../../assets/images/depression.svg'
import Diarrhoea from '../../../assets/images/diarrhoea.svg'
import Nausea from '../../../assets/images/nausea.svg'
import Nightsweats from '../../../assets/images/nightsweats.svg'
import SexualDifficulties from '../../../assets/images/sexualdifficulties.svg'
import SleepIssues from '../../../assets/images/sleepissues.svg'
import Weakness from '../../../assets/images/weakness.svg'
import BloodPressure from '../../../assets/images/blood_pressure.svg'
import Pain from '../../../assets/images/pain_dl.svg'
import BodyTemp from '../../../assets/images/body_temp.svg'
import Caloriesburn from '../../../assets/images/calories_burn.svg'
import Dailystep from '../../../assets/images/daily_step.svg'
import Oxygensat from '../../../assets/images/oxygen_sat.svg'
import Pulseheartrate from '../../../assets/images/pulse_heartrate.svg'
import Respirator from '../../../assets/images/respirator_ic.svg'
import SleepHours from '../../../assets/images/sleep_hours.svg'
import ContactVital from '../../../assets/images/contact_vital.svg'
import SOS from '../../../assets/images/sos_vitalbtn.svg'
import VitalsItem from '../../../components/vitalsItem.js'
import SosEmergencyContact from '../../../components/sosEmergencyContact.js'
import { BarChart } from "react-native-web-svg-charts";
import Alert from "../../../components/AlertScreen/Index"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health';
const width = Dimensions.get('window').width;
import Toast from 'react-native-toast-message';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {askForAndroidPermission, askForPermission} from '../../../utils/commonFunction'
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
    const insets = useSafeAreaInsets();
    const [isAccessAllowShow, setAccessAllowShow] = useState(false)
    const [isSosModalShow, setSosModalShow] = useState(false)
    const [valueChange, setValueChange] = useState(false)
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const permission = useSelector((state) => state?.rpmReducer?.rpmpermission?.length > 0 ? state?.rpmReducer?.rpmpermission[0] : [] ) || [];
    const rpmData = useSelector((state) => state?.rpmReducer?.rpm?.length > 0 ? state?.rpmReducer?.rpm[0] : [] ) || [];
    const rpmPost = useSelector((state) => state?.rpmReducer?.rpmData?.length > 0 ? state?.rpmReducer?.rpmData[0] : [] ) || [];

    const data = [
        50,
        100,
        40,
        95,
        45,
        54,
        85
    ];
    const [vitalSignArr, setVitalSignArr] = useState([
        { key: '1', icon: <BloodPressure />, vitalTitle: 'Blood Pressure', vitalTemp: '141/90', vitalMap: 'mmHg' },
        { key: '2', icon: <BodyTemp />, vitalTitle: 'Body Temperature', vitalTemp: '37C', vitalMap: 'Degree' },
        { key: '3', icon: <Pulseheartrate />, vitalTitle: 'Pulse / Heart Rate', vitalTemp: '125', vitalMap: 'bpm' },
        { key: '4', icon: <Respirator />, vitalTitle: 'Respiratory Rate', vitalTemp: '12-16', vitalMap: 'breaths per minute' },
        { key: '5', icon: <Oxygensat />, vitalTitle: 'Oxygen Saturation (SpO2)', vitalTemp: '90/60', vitalMap: 'Degree' },
        { key: '6', icon: <SleepHours />, vitalTitle: 'Sleep Hours', vitalTemp: '8', vitalMap: 'hrs' },
        { key: '7', icon: <Caloriesburn />, vitalTitle: 'Calories Burnded', vitalTemp: '135', vitalMap: 'Calories' },
        { key: '8', icon: <Dailystep />, vitalTitle: 'Daily Steps', vitalTemp: '135', vitalMap: 'Steps' },
    ]);
    const [symptomsArr, setSymptomsArr] = useState([
        { key: '1', icon: <Anxiety />, vitalTitle: 'Anxiety', vitalTemp: '7/10' },
        { key: '2', icon: <Appetiteloss />, vitalTitle: 'Appetite loss', vitalTemp: '6/10' },
        { key: '3', icon: <Constipation />, vitalTitle: 'Constipation', vitalTemp: '7/10' },
        { key: '4', icon: <Depression />, vitalTitle: 'Depression', vitalTemp: '6/10' },
        { key: '5', icon: <Diarrhoea />, vitalTitle: 'Diarrhoea', vitalTemp: '7/10' },
        { key: '6', icon: <Fever />, vitalTitle: 'Fever', vitalTemp: '6/10' },
        { key: '7', icon: <Nausea />, vitalTitle: 'Nausea', vitalTemp: '7/10' },
        { key: '8', icon: <Nightsweats />, vitalTitle: 'Night Sweats', vitalTemp: '6/10' },
        { key: '9', icon: <Pain />, vitalTitle: 'Pain', vitalTemp: '6/10' },
        { key: '10', icon: <SexualDifficulties />, vitalTitle: 'Sexual Difficulties', vitalTemp: '6/10' },
        { key: '11', icon: <SleepIssues />, vitalTitle: 'Sleep Issues', vitalTemp: '6/10' },
        { key: '12', icon: <Weakness />, vitalTitle: 'Weakness', vitalTemp: '6/10' }
    ]);
    const [emerContactArr, setEmerContactArr] = useState([
        { key: '1', contactName: 'Sandeep Kumar', contactNumber: '+91 98 85 74 23 50' },
        { key: '2', contactName: 'Vijay Joshi', contactNumber: '+91 98 85 74 23 50' },
        { key: '3', contactName: 'Shriram Madukar', contactNumber: '+91 98 85 74 23 50' },
        { key: '4', contactName: 'Vijay Patil', contactNumber: '+91 98 85 74 23 50' },
    ])

    useEffect(() => {
        checkPermission()
        fetchRpm()
    }, [])
    useEffect(() => {
        if (permission.status == 0) {
            setAccessAllowShow(true)
        } else {
            checkValue()
        }
    }, [permission != undefined])
    useEffect(() => {
        if (permission.status == 0) {
            setAccessAllowShow(true)
        } else {
            checkValue()
        }
    }, [permission != undefined])
    useEffect(() => {
        if(rpmData != undefined){
            vitalSignArr.map((item, index) => {
                if(index == 0){
                    if(rpmData?.rpm_bp?.length > 0){
                        item.value = rpmData.rpm_bp[0]?.systolic
                    }
                } else if(index == 1){
                    if(rpmData?.rpm_temparature?.length > 0){
                        item.value = rpmData.rpm_temparature[0].value
                    }
                } else if(index == 2){
                    if(rpmData?.rpm_pulse?.length > 0){
                        item.value = rpmData.rpm_pulse[0].value
                    }
                } else if(index == 3){
                    if(rpmData?.rpm_respiration?.length > 0){
                        item.value = rpmData.rpm_respiration[0].value
                    }
                } else if(index == 4){
                    if(rpmData?.rpm_spo2?.length > 0){
                        item.value = rpmData.rpm_spo2[0].value
                    }
                } else if(index == 5){
                    if(rpmData?.rpm_spo2?.length > 0){
                        item.value = rpmData.rpm_spo2[0].value
                    }
                } else if(index == 6){
                    if(rpmData?.rpm_basal_energy?.length > 0){
                        item.value = rpmData.rpm_basal_energy[0].value
                    }
                } else if(index == 7){
                    if(rpmData?.rpm_step?.length > 0){
                        item.value = rpmData.rpm_step[0].value
                    }
                }
            })
            setVitalSignArr(vitalSignArr)
        }
    }, [rpmData])

    //Api Call
    const checkPermission = () => {
        props.actions.getRpmPermission(actionTypes.RPM_GET_PERMISSION, {
            module: 'rpm',
            action: 'get_rpm_health_access',
            formData: {
                userId: userId,
            },
        });
    }
    const postPermission = () => {
        props.actions.postRpmPermission(actionTypes.RPM_POST_PERMISSION, {
            module: 'rpm',
            action: 'create_rpm_health_access',
            formData: {
                userId: userId,
            },
        });
    }
    const postContact = (name: any, number: any) => {
        props.actions.postEmergencyContact(actionTypes.CREATE_SOS, {
            module: 'rpm_deviation_contact',
            action: 'create',
            formData: {
                userId: userId,
                name: name,
                phone: number
            },
          });
          Toast.show({
            type: 'success',
            text1: name + " has registered as your caregiver.",
          })
    }
    const fetchRpm = () => {
        props.actions.fetchRpm(actionTypes.FETCH_RPM, {
            module: 'rpm',
            action: 'rpm_main_screen',
            formData: {
                userId: userId,
            },
          });
    }

    //Helper Methods
    const checkValue = async() => {
        AsyncStorage.setItem('TIMER_START', 'true');
        setTimerMethod()
        const handle = setInterval(setTimerMethod,4 * 60 * 60000);
    }
    const setTimerMethod = () => {
        Platform.OS == 'android' ? askForAndroidPermission(props, permission, postPermission, userId) : askForPermission(postPermission, permission, props, userId)
        setTimeout(() => {
            fetchRpm()
        }, 1500)
    }
    const renderVitalSignItem = ({ item, index }) => {
        return (
            <>
                {index <= 1 &&
                    <VitalsItem
                        item={item}
                        theme={theme}
                    />
                }
            </>
        );
    }
    const renderSymptomsItem = ({ item, index }) => {
        return (
            <>
                {index <= 1 &&
                    <VitalsItem
                        item={item}
                        theme={theme}
                        isSymptoms={true}
                    />
                }
            </>
        );
    }
    // const askForPermission = () => {
    //     const permissions = {
    //         permissions: {
    //             read: [AppleHealthKit.Constants.Permissions.HeartRate],
    //             write: [AppleHealthKit.Constants.Permissions.Steps],
    //         },
    //     } as HealthKitPermissions

    //     AppleHealthKit.initHealthKit(permissions, (error: string) => {
    //         /* Called after we receive a response from the system */

    //         if (error) {
    //             console.log('[ERROR] Cannot grant permissions!')
    //         } else if (permission.status == 0) {
    //             postPermission()
    //             permission.status = 1
    //         }

    //         /* Can now read or write to HealthKit */

    //         const options = {
    //             startDate: new Date(2020, 1, 1).toISOString(),
    //         }

    //         AppleHealthKit.getHeartRateSamples(
    //             options,
    //             (callbackError: string, results: HealthValue[]) => {
    //                 /* Samples are now collected from HealthKit */
    //                 console.log("data===", results)
    //             },
    //         )
    //     })

    // }
    // const askForAndroidPermission = () => {
    //     const options = {
    //         scopes: [
    //           Scopes.FITNESS_ACTIVITY_READ,
    //           Scopes.FITNESS_ACTIVITY_WRITE,
    //           Scopes.FITNESS_BODY_READ,
    //           Scopes.FITNESS_BODY_WRITE,
    //           Scopes.FITNESS_SLEEP_READ,
    //           Scopes.FITNESS_SLEEP_WRITE,
    //           Scopes.FITNESS_BODY_TEMPERATURE_READ,
    //           Scopes.FITNESS_BODY_TEMPERATURE_WRITE,
    //           Scopes.FITNESS_BLOOD_PRESSURE_READ,
    //           Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
    //           Scopes.FITNESS_HEART_RATE_READ,
    //           Scopes.FITNESS_HEART_RATE_WRITE,
    //           Scopes.FITNESS_OXYGEN_SATURATION_READ,
    //           Scopes.FITNESS_OXYGEN_SATURATION_WRITE,
    //           Scopes.FITNESS_ACTIVITY_READ,
    //           Scopes.FITNESS_ACTIVITY_WRITE,
    //           Scopes.FITNESS_BODY_READ,
    //           Scopes.FITNESS_BODY_WRITE,
    //           Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
    //           Scopes.FITNESS_REPRODUCTIVE_HEALTH_WRITE,
    //         ],
    //       }
    //       GoogleFit.authorize(options)
    //         .then(authResult => {
    //           if (authResult.success) {
    //             postPermission()
    //             permission.status = 1
    //             getData()
    //           } else {
    //             console.log("errr", authResult)
    //           }
    //         })
    //         .catch((err) => {
    //           console.log('err >>> ', err)
    //         })
    // }
    // const getData = async () => {
    //     var d = new Date();
    //     d.setDate(d.getDate() - 1);     
    //     const opt = {
    //         startDate: d.toISOString(), // required ISO8601Timestamp
    //         endDate: new Date().toISOString(), // required ISO8601Timestamp
    //       };
          
    //       const steps = await GoogleFit.getDailyStepCountSamples(opt)
    //       const sleep = await GoogleFit.getSleepSamples(opt)
    //       const temp = await GoogleFit.getBodyTemperatureSamples(opt)
    //       const bp = await GoogleFit.getBloodPressureSamples(opt)
    //       const hr = await GoogleFit.getHeartRateSamples(opt)
    //       const oxy = await GoogleFit.getOxygenSaturationSamples(opt)
    //       const activity = await GoogleFit.getActivitySamples(opt)
    //       const body = await GoogleFit.getDailyCalorieSamples(opt)

    //       postRpm(steps, sleep, temp, bp, hr, oxy, activity, body)
    // }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DRAWER")["VITALS_MONITORING"]}
                isRightComponent={true}
                isSecondIcon={true}
                rightSecondIcon={<ContactVital />}
                rightSecondPress={() => {
                    props.navigation.navigate('Zen.EmergencyContacts', { emerContactArr: emerContactArr })
                }}
            />

            <ScrollView bounces={false} style={styles.subContainer} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} >
                <Pressable onPress={() => { setSosModalShow(true) }} style={styles.sosButtonContainer} >
                    <SOS width={width - 40} />
                    <Text style={styles.addSOSText} numberOfLines={1} >{translate("VITALS_MONITORING")["ADD_SOS_NUMBER"]}</Text>
                    <Text style={styles.addCriticalText} numberOfLines={1} >{translate("VITALS_MONITORING")["CRITICAL_UPDATE"]}</Text>
                </Pressable>
                <Text numberOfLines={1} style={[styles.headerTitleText, { marginBottom: Platform.OS === 'ios' ? 15 : 12 }]} >{translate("VITALS_MONITORING")["DEVIATIONS"]}</Text>
                <View style={styles.feverRangeVw} >
                    <View style={styles.feverDescriptionVw} >
                        <Fever />
                        <View style={styles.feverDes} >
                            <Text numberOfLines={1} style={styles.commonText} >Fever</Text>
                            <Text numberOfLines={1} style={styles.vitalRangeName} >Avg range 98.6 to 99.6 F</Text>
                        </View>
                    </View>
                    <View style={[styles.feverDescriptionVw, { paddingTop: 10 }]} >
                        <View style={{ width: '50%', alignSelf: 'flex-end', paddingLeft: 15 }} >
                            <Text numberOfLines={1} style={[styles.commonText, { color: theme.SECONDARY_TWO }]} >{rpmData?.rpm_temparature?.length > 0 ? rpmData?.rpm_temparature[0]?.value : ''} F</Text>
                            <Text numberOfLines={1} style={[styles.vitalRangeName, { color: theme.SEARCH_TITLE }]} >22 July</Text>
                        </View>
                        <View style={{ width: '50%' }} >
                            <BarChart
                                style={{ height: 40, marginBottom: 5 }}
                                data={data}
                                spacingInner={0.8}
                                spacingOuter={1}
                                svg={{ fill: theme.SECONDARY_TWO }}
                                contentInset={{ top: 0, bottom: 10 }}
                            />
                            <Text numberOfLines={1} style={[styles.vitalRangeName, { textAlign: 'center', color: theme.SEARCH_TITLE, marginTop: Platform.OS === 'ios' ? 0 : 1 }]} >Last 7 Reading</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.feverDescriptionVw, { marginTop: Platform.OS === 'ios' ? 17 : 15 }]} >
                    <Text numberOfLines={1} style={styles.headerTitleText} >{translate("VITALS_MONITORING")["VITAL_SIGNS"]}</Text>
                    <Pressable style={styles.seeAllContainer} onPress={() => {
                        props.navigation.navigate('Zen.VitalsDetail', { arr: vitalSignArr, headerText: 'Vital Signs' })
                    }} >
                        <Text style={styles.seeAllText} >{translate("COMMONTEXT")["SEE_ALL"]}</Text>
                    </Pressable>
                </View>
                <View>
                    <FlatList
                        data={vitalSignArr}
                        scrollEnabled={false}
                        keyExtractor={item => item.key}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderVitalSignItem} />

                </View>
                <View style={[styles.feverDescriptionVw, { marginTop: Platform.OS === 'ios' ? 17 : 15 }]} >
                    <Text numberOfLines={1} style={styles.headerTitleText} >{translate("DRAWER")["SYMPTOMS"]}</Text>
                    <Pressable style={styles.seeAllContainer} onPress={() => {
                        props.navigation.navigate('Zen.VitalsDetail', { arr: symptomsArr, headerText: 'Symptoms', isSymptoms: true })
                    }} >
                        <Text style={styles.seeAllText}>{translate("COMMONTEXT")["SEE_ALL"]}</Text>
                    </Pressable>
                </View>
                <View>
                    <FlatList
                        data={symptomsArr}
                        scrollEnabled={false}
                        keyExtractor={item => item.key}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSymptomsItem} />
                </View>
            </ScrollView>
            {isSosModalShow &&
                <SosEmergencyContact
                    theme={theme}
                    isSosModalShow={isSosModalShow}
                    setSosModalShow={setSosModalShow} 
                    onSave={postContact}
                />
            }
            {isAccessAllowShow &&
                <Alert
                    show={isAccessAllowShow}
                    title={""}
                    message={"We need access to your health data to allow monitoring your vitals. Kindly select Allow on the next screen"}
                    closeOnTouchOutside={{ val: false, setShowAlert: setAccessAllowShow }}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText={translate("COMMONTEXT")["CONTINUE"]}
                    onConfirmPressed={() => {
                        setAccessAllowShow(false)
                        Platform.OS == 'android' ? askForAndroidPermission(props, permission, postPermission, userId) : askForPermission(postPermission, permission, props, userId)
                    }}
                />
            }
            <View style={{ height: insets.bottom, backgroundColor: theme.SELECTED }} />
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);