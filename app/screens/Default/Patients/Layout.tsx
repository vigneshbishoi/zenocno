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
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    Platform,
    TextInput,
    Linking,
    Alert,
    ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import Stage from '../../../assets/images/stage_ic.svg'
import QrCode from '../../../assets/images/qrCode.svg'
import Add_Wellness from '../../../assets/images/addw.svg'
import Search from '../../../assets/images/search.svg'
import Call from '../../../assets/images/call_vital'
import Call_Ic from '../../../assets/images/call_ic'
import Remove from '../../../assets/images/remove_vital'
import Whatsapp from '../../../assets/images/whatsapp'
import Modal from 'react-native-modal'
import translate from '../../../utils/Text';
import { FONTFAMILY } from '../../../config/font-config';
import PhoneInput from "react-native-phone-number-input";
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import Toast from 'react-native-toast-message';
import AppHeader from '../../../components/CommonInput/appHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const [isInviteModalShow, setInviteModalShow] = useState(false)
    const [code, setCode] = useState('91')
    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')
    const [mobError, setMobError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [btnSelected, setBtnSelected] = useState(1)
    const [searchValue, setSearchValue] = useState('');
    const [invitedPateint, setInvitedPatients] = useState([]);
    const [valueChange, setValueChange] = useState(false);
    const [searchData, setSearchData] = useState(false);
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const referal = useSelector((state) => state.patientReducer?.referal?.length > 0 ? state.patientReducer.referal[0]?.data 
     : []) || []; 
    const patients = useSelector((state) => state.patientReducer?.patients?.length > 0 ? state.patientReducer.patients[0]?.data 
     : []) || [];  
    const invitedPatients = useSelector((state) => state.patientReducer?.invitedPatients?.length > 0 ? state.patientReducer.invitedPatients[0]?.data 
     : []) || [];
    const patient = useSelector((state) => state.patientReducer?.patient?.length > 0 ? state.patientReducer.patient[0]?.data 
     : []) || [];

    //Lifecycle Methods
    useEffect(() => {
        getPatients()
        getPatientReferal()
        getInvitedPatients()
    }, []);
    useEffect(() => {
        if(invitedPatients != undefined && invitedPatients.length > 0 ){
            setInvitedPatients(invitedPatients)
        }
    }, [invitedPatients])
    useEffect(() => {
        if(patient != undefined && patient.length > 0 ){
            getInvitedPatients()
            setMobile('')
            setName('')
            props.actions.postPatientListData(
                'patient',
                [],
                actionTypes.POST_PATIENT_DATA,
            )
            setInviteModalShow(false)
            Toast.show({
                type: 'success',
                text1: "Patient invited",
            })
        }
    }, [patient])

    //Api Call
    const getPatients = () => {
        props.actions.getPatients(actionTypes.FETCH_PATIENT, {
            module: 'patient',
            action: 'patient_list',
            formData: {
                userId: userId,
            }
          });
    }
    const getPatientReferal = () => {
        props.actions.getReferalCode(actionTypes.PATIENT_REFERAL, {
            module: 'referral_apply',
            action: 'get_referral_codes',
            formData: {
                userId: userId,
            }
          });
    }
    const invitePatient = () => {
        props.actions.postPatient(actionTypes.POST_PATIENT, {
            module: 'patient',
            action: 'create',
            formData: {
                userId: userId,
                name: name,
                phone: code + mobile,
                status: 1
            }
          });
    }
    const getInvitedPatients = () => {
        props.actions.getInvitedPatients(actionTypes.INVITED_PATIENT, {
            module: 'patient',
            action: 'invited_patient',
            formData: {
                userId: userId,
            }
          });
    }
    const deletePatientApi = (item: any) => {
        props.actions.deletePatient(actionTypes.DELETE_PATIENT, {
            module: 'patient',
            action: 'remove_invited_patient',
            formData: {
                patientsReferredId: item?.id,
            }
          });
    }

    //Helper Methods
    const deletePateint = (item: any) => {
        Alert.alert(
            "",
            "Are you sure you want to delete this patient?",
            [
                {
                    text: "NO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "YES", onPress: () => {
                        removeLocally(item.id)
                        deletePatientApi(item)
                    }
                }
            ]
        );
    }
    const removeLocally = (id: any) => {
        let patientAll = invitedPateint.filter(item => item.id != id)
        setValueChange(!valueChange)
        setInvitedPatients(patientAll);
    }
    const renderPatientsList = ({ item, index }) => {
        return (
            <>
                {btnSelected == 1 &&
                    <Pressable style={styles.patientsItemContainer} >
                        {/* <Pressable style={styles.notificationVw} >
                            <Text style={styles.numberofnotificationText} numberOfLines={1} >3</Text>
                        </Pressable> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={{uri: item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].image : ''}} style={styles.imagePatients} />
                            <View style={styles.contactDetail} >
                        <Text numberOfLines={1} style={styles.commonTwoText} >{item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].name : ''}</Text>
                        <Text numberOfLines={1} style={[styles.commonText, { width: '85%', marginTop: Platform.OS === 'ios' ? 0 : -4 }]} >{item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].cancer_category?.name : ''}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 7 : 1 }} >
                            <Text numberOfLines={1} style={[styles.commonText, { color: theme.SUB_TITLE, marginLeft: 0, width: '65%' }]} >{item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].cancer_stage?.cancer_stage : ''}</Text>

                                    <Pressable style={styles.messageButtonVw} onPress={() => {
                                let user = {
                                    name: item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].name : '',
                                    image: item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].image : '',
                                    userId: item?.user?.id ? item?.user?.id : "",
                                    cancerName: item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].cancer_category?.name : '',
                                    cancerStage :item?.user?.user_details?.length > 0 ? item?.user?.user_details[0].cancer_stage?.cancer_stage : ''
                                  }
                                  props.navigation.navigate('Zen.Chat', { user: user });
                            }} >

                                        <Text style={styles.messageText} numberOfLines={1} >{translate("COMMONTEXT")["MESSAGE"]}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                }
                {btnSelected == 2 &&
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "center", padding: 10, paddingVertical:15 }}>
                            <View style={{ width: '65%' }}>
                                <Text style={[styles.commonText, { color: theme.SUB_TITLE, marginLeft: 8, width: '65%', fontSize:15 }]}>{item.name}</Text>
                                <View style={{ flexDirection: "row", marginTop:5, alignItems:"center" }}>
                                    <Call_Ic />
                                    <Text style={[styles.commonTwoText, { marginLeft:5}]}>{item.phone}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: '35%' }}>
                            <Pressable onPress={() =>Linking.openURL(`whatsapp://send?text=${shareWhatsAppText}&phone=`+item.phone)}>
                                <Whatsapp />
                                </Pressable>
                                <Pressable onPress={() => Linking.openURL(`tel:${'+91' + item.phone}`)}>
                                <Call />
                                </Pressable>
                                <Pressable onPress={() => deletePateint(item)}>
                                <Remove />
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.line]} />
                    </>
                }
            </>
        );
    }
    const onInvite = () => {
        if(mobile.length != 10 ){
            setMobError(true)
        } 
        if(name == ""){
            setNameError(true)
        } 
        if(mobile.length == 10 && name != ""){
            setMobError(false)
            setNameError(false)
            invitePatient()
        }
    }
    const btnPressed = (item) => {
        setBtnSelected(item);
    }
    const getSearchData = (value) => {
        let data = []
        if(btnSelected == 1){
            data = patients.filter(item => item?.user?.user_details[0].name?.includes(value))
        } else {
            data= invitedPateint.filter(item => item.name.includes(value))
        }
        setSearchData(data)
    }

    const shareWhatsAppText = `Hi. I invited you to join the Zenonco Care App. You will benefit from joining it - it gives you access to a large community of users, wellness activities, anti cancer diet, and multiple other features that will benefit you in your journey.`

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("COMMONTEXT")["PATIENTS"]}
                isRightComponent={true}
                isSecondIcon={true}
                rightSecondIcon={<Add_Wellness width={24} height={24} />}
                rightSecondPress={() => { setInviteModalShow(true)}}
                  />
            <View style={styles.searchVw} >
                <Search width={16} height={16} style={{ marginHorizontal: 10 }} />
                <TextInput
                    placeholder={translate("COMMONTEXT")["SEARCH"]}
                    returnKeyType='search'
                    placeholderTextColor={theme.SEARCH_TITLE}
                    onChangeText={value => {
                        setSearchValue(value)
                        getSearchData(value)
                    }}
                    value={searchValue}
                    inlineImageLeft='search_icon'
                    style={styles.searchText}
                />
                <Pressable style={{
                    position: 'absolute', top: 5, right: 0, width: 30,
                    height: 40, alignItems: 'center', justifyContent: 'center'
                }}>
                    <Image style={{ width: 10, height: 10 }} source={require('../../../assets/images/close.png')} />
                </Pressable>
            </View>

            <View style={[styles.counterVw, { marginTop: Platform.OS === 'ios' ? 7 : 4, }]}>
                <Pressable style={[styles.buttonVw, { backgroundColor: btnSelected == 1 ? theme.SECONDARY : theme.PRIMARY }]} onPress={() => btnPressed(1)}>
                    <Text style={[styles.buttonTxt, { color: btnSelected == 1 ? theme.PRIMARY : theme.GRAY_BLACK }]}>{translate("COMMONTEXT")["MY_PATIENTS"]}({patients.length})</Text>
                </Pressable>
                <Pressable style={[styles.buttonVw, { backgroundColor: btnSelected == 2 ? theme.SECONDARY : theme.PRIMARY }]} onPress={() => btnPressed(2)}>
                    <Text style={[styles.buttonTxt, { color: btnSelected == 2 ? theme.PRIMARY : theme.GRAY_BLACK }]}>{translate("COMMONTEXT")["INVITED"]} ({invitedPatients.length})</Text>
                </Pressable>
            </View>

            <FlatList
                data={searchValue.length > 0 ? searchData : btnSelected == 1 ? patients : invitedPateint}
                keyExtractor={item => item.key}
                style={{ paddingHorizontal: btnSelected == 1 ? 20 : 0, marginTop: 15 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>
                    <View style={styles.emptyVw} >
                        <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_PATIENT_FOUND"]}</Text>
                    </View>
                }
                renderItem={renderPatientsList}
            />
            {isInviteModalShow &&
                <Modal
                    isVisible={isInviteModalShow}
                    animationIn={'fadeInLeft'}
                    animationOut={'fadeInDown'}
                    onBackButtonPress={() => setInviteModalShow(false)}
                    onBackdropPress={() => setInviteModalShow(false)}
                    backdropOpacity={0.3}>
                    <View style={styles.modalContainer}>
                        <KeyboardAwareScrollView contentContainerStyle={styles.deleteModalVw}>
                            <Pressable style={styles.closeVw} onPress={() => setInviteModalShow(false)} >
                                <Image source={require('../../../assets/images/close.png')} />
                            </Pressable>
                            <Text style={styles.commonModalText} numberOfLines={1} >{translate("PATIENTS")["SCAN_BELOW"]}</Text>
                            <Image source={require('../../../assets/images/qrCode.png')} style={styles.qrStyle}/>
                            <Text style={styles.commonModalText} numberOfLines={1} >{translate("PATIENTS")["REFERRAL_CODE"]}</Text>
                            <Text style={[styles.commonModalText, { fontFamily: FONTFAMILY.POPPINS_MEDIUM, marginTop: Platform.OS === 'ios' ? 1 : -3 }]} numberOfLines={1} >{referal?.length > 0 ? referal[0].code : ''}</Text>

                            <View style={styles.orContainer} >
                                <View style={styles.line} />
                                <View style={styles.roundOR} >
                                    <Text style={styles.orText} numberOfLines={1} >{translate("PATIENTS")["OR"]}</Text>
                                </View>
                            </View>

                            <Text style={[styles.commonModalText, { fontFamily: FONTFAMILY.POPPINS_MEDIUM }]} numberOfLines={1} >{translate("PATIENTS")["INVITE_JOIN"]}</Text>
                            <TextInput value={name} placeholder={translate("CHECKOUT")["NAME"]} onChangeText={value => setName(value)} 
                            style={[styles.dropShadow, styles.modalInputText, styles.extrastyle, nameError && name.length == 0 && styles.errorStyle]} />
                            <View style={[Platform.OS === 'android' ? styles.inputContainer : styles.inputIOSContainer, Platform.OS === 'ios' && styles.dropShadow]}>
                                <PhoneInput
                                    // ref={phoneInput}
                                    containerStyle={[Platform.OS === 'android' ? styles.inputBox : styles.inputIOSBox, mobError && mobile.length != 10 && styles.errorStyle]}
                                    textInputStyle={[styles.modalInputText, { marginTop: Platform.OS === 'android' ? 9 : 0, height: 48 }]}
                                    codeTextStyle={[styles.modalInputText, { marginTop: Platform.OS === 'android' ? 4 : 0 }]}
                                    textContainerStyle={{ paddingVertical: 0, backgroundColor: theme.PRIMARY }}
                                    defaultCode="IN"
                                    defaultValue={mobile}
                                    placeholder={translate("COMMONTEXT")["PHONE"]}
                                    textInputProps={{ value: mobile }}
                                    onChangeCountry={(country) => {
                                        setCode(country.callingCode[0])
                                    }}
                                    onChangeText={(number) => {
                                        setMobile(number)
                                    }}
                                    countryPickerProps={{
                                        withAlphaFilter: true
                                    }}
                                    withDarkTheme
                                    // autoFocus
                                    textInputProps={{ maxLength: 10 }}
                                />
                            </View>
                            <Pressable style={styles.inviteButtonVw}  onPress={() => onInvite()}>
                                <Text style={[styles.commonModalText, { color: theme.PRIMARY }]} numberOfLines={1} >{translate("PATIENTS")["INVITE"]}</Text>
                            </Pressable>
                        </KeyboardAwareScrollView>
                    </View>
                </Modal>}
        </SafeAreaView>
    );
};

export default withTheme(Layout);