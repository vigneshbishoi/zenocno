/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Image,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
    TextInput,
    Alert,
    FlatList
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import RigthArrow from '../../../assets/images/RigthArrow.svg';
import Offer from '../../../assets/images/offer.svg';
import TickMark from '../../../assets/images/tickMark.svg';
import CheckMark from '../../../assets/images/checkMark.svg';
import RatingHeart from '../../../assets/images/ratingHeart.svg';
import DotMenu from '../../../assets/images/dotMenu.svg'
import CheckboxSelected from '../../../assets/images/checkboxSelected.svg'
import WhatsAppIcon from '../../../assets/images/whatsAppIcon.svg'
import translate from "../../../utils/Text"
import Modal from 'react-native-modal';
import AppointmentStatus from '../../../components/Doctorlist/appointmentStatus';
import PaymentDisplay from '../../../components/RazorPay';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import AppHeader from '../../../components/CommonInput/appHeader';
import {initatePayment} from '../../../utils/commonFunction'
import { FONTFAMILY } from '../../../config/font-config';
import DoctorsListItem from '../../../components/Doctorlist/doctorsListItem';
import OnlineConsultation from '../../../components/OnlineConsultation';
import DoctorCardInfo from '../../../components/Doctorlist/doctorCardInfo';
import NeedHelp from '../../../components/NeedHelp';
import RatingCard from '../../../components/RatingCard';
import ReviewCard from '../../../components/ReviewCard';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const item = props?.route?.params?.item
    const date = props?.route?.params?.date
    const time = props?.route?.params?.time
    const isFromCancel = props?.route?.params?.isFromCancel
    let policy1 = "There are no cancellation charges if the cancellation is done before 6 hours of appointment"
    let policy2 = "If cancellation happens within 6 hours of appointment, there shall be cancellation charges of 50%. Instead, you can reschedule the appointment for Rs 50 only"
    const [isPayConfirmShow, setPayConfirmShow] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [showRazorpay, setShowRazorpay] = useState(false);
    const [status, setStatus] = useState();
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selected, setSelected] = useState(true);
    const [razorPayData, setRazorPayData] = useState({});
    const [razorPayKey, setRazorPayKey] = useState('');
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const userData = useSelector((state) => state.onboardingReducer.userDetails);
    const paymentData = useSelector(state => state.onboardingReducer.paymentData);
    const bookAppointment =
        useSelector((state) => state?.appointmentReducer?.bookAppoinment?.length > 0 ?
            state?.appointmentReducer?.bookAppoinment[0] : []) || [];

    const doctorReview =
        useSelector((state) => console.log('state --->', state)
         );
    
    const patientDetail =
         useSelector((state) => state?.appointmentReducer?.patientDetail?.length > 0 ? state?.appointmentReducer?.patientDetail[0]?.patient_detail : []) || [];
         

    useEffect(() => {
        // props.actions.getPatientDetailData("patientDetail", [], actionTypes.GET_PATIENT_DETAIL_DATA)
    }, [])

    useEffect(() => {
        if (bookAppointment != undefined && bookAppointment?.status == 1) {
            props.navigation.navigate('Zen.MyAppointment', { isFromPayment: isFromCancel ? undefined : true })
            props.actions.bookAppointmentData("bookAppoinment", [], actionTypes.BOOK_APPOINTMENT_DATA)
            props.actions.bookAppointmentData("patientDetail", [], actionTypes.GET_PATIENT_DETAIL_DATA) 
        }
    }, [bookAppointment])

    useEffect(() => {
        props.actions.getPatientDetailData(actionTypes.GET_PATIENT_DETAIL, {
            module: 'appointment',
            action: `get_patient_detail`
        })
    }, [])


    //Api Call
    const onPaymentClick = () => {
        let amount = (item?.fee || item?.appt_name?.fee)
        initatePayment(userId, selected, amount,props.actions, setRazorPayKey, setShowRazorpay)
    };
    const onPayment = (data: any) => {
        props.actions.bookAppointment(actionTypes.BOOK_APPOINTMENT, {
            module: 'appointment',
            action: 'create',
            formData: {
                doctorId: isFromCancel != undefined ? item?.appt_name?.id : item?.id,
                userId: userId,
                apptDate: date?.date,
                apptTime: time,
                paymentId: data.razorpay_payment_id,
                paymentStatus: "1",
                completed: "1"
            }
        });
    }

    //Helper Methods 
    const paymentFailure = () => {
        Alert.alert(
            "Payment failed",
            "If money was deducted from your account, it will be automatically refunded in 5-7 working days.\n\n Please retry payment to continue with booking.",
            [
                {
                    text: "cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Retry", onPress: () => {
                        onPaymentClick()
                    }
                }
            ]
        );
    }

    console.log('ITEM -->', item);
    


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DOCTORSLIST")["BOOK_APPOINTMENT"]}
                isRightComponent={false}
                extraHeaderTxt={{fontSize: 16, fontFamily: FONTFAMILY.POPPINS_SEMIBOLD}}
                extraHeaderTxtView={{ flex:1 }}
            />
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* <View style={styles.doctorInfovw} >
                    <Image style={styles.doctorImage} source={item?.length == 0 || item?.image == null || item?.image == undefined ? require('../../../assets/images/profileImage.png') : { uri: item?.doctor?.image }} />
                    <View style={styles.doctorInfo} >
                        <Text style={[styles.doctorName, { marginTop: Platform.OS === 'ios' ? 7 : 4 }]} numberOfLines={1} >{item?.doctorName || item?.appt_name?.name}</Text>
                        <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]} numberOfLines={1} >{item?.educationSummary || item?.appt_name?.educationSummary}</Text>
                    </View>
                </View> */}
                <DoctorCardInfo
                    hasDoctorsDetails
                    item={item}
                    theme={theme}
                    navigation={props.navigation}
                />
                <View style={styles.onlineConsultation} > 
                    <OnlineConsultation />
                </View>
                {/* <View style={styles.bottomLine} /> */}
                <AppointmentStatus theme={theme} isFromVideoApp={true} date={date} time={time} />
                {/* <View style={styles.bottomLine} /> */}
                {/* <View style={styles.freeCancellationContainer}>
                    <Text style={styles.freeCancellationText}>{translate("COMMONTEXT")["FREE_CANCELLATION_BEFORE"]}29 Jul, 6:20 PM</Text>
                    <Pressable onPress={() => {}}>
                        <Text style={[styles.freeCancellationText, { color: theme.BLACK, textDecorationLine: 'underline' }]} numberOfLines={1} >{translate("COMMONTEXT")["KNOW_MORE"]}</Text>
                    </Pressable>
                </View> */}
               
                {/* Use Coupons section */}
                {/* <View style={[styles.freeCancellationContainer, {
                    backgroundColor: theme.LIGHT_BLUE,
                    borderWidth:0, marginTop: 17
                }]}>
                    <View style={styles.offerContainer}>
                        <Offer />
                        <Text style={[styles.headerText, {marginLeft: 9}]}>{translate("COMMONTEXT")["USE_COUPONS"]}</Text>
                    </View>
                    <View style={styles.offerContainer}>
                        <RigthArrow />
                    </View>
                </View> */}

                {/* Price detail section */}
                <Text style={[styles.headerText, {marginLeft: 16, marginTop: 15}]}>{translate("COMMONTEXT")["PRICE_DETAILS"]}</Text>
                {/* <Text style={[styles.doctorName, styles.extraTextStyle]} numberOfLines={1} >{translate("DOCTORSLIST")["BILL_DETAIS"]}</Text> */}
                <View style={[styles.appointTitleVw, { paddingHorizontal: 16, marginTop: 17 }]}>
                    <Text style={[styles.expertizationText, { fontSize: 14, width: '80%' }]} numberOfLines={1} >{translate("COMMONTEXT")["TOTAL_AMOUNT"]}</Text>
                    <Text style={styles.priseText} numberOfLines={1} >{/*'\u20B9' +*/ (item?.fee || item?.appt_name?.fee)}</Text>
                </View>
                {/* <View style={[styles.appointTitleVw, { paddingHorizontal: 16, marginTop: 15, marginBottom: 22 }]}>
                    <Text style={[styles.expertizationText, { fontSize: 14, width: '80%' }]} numberOfLines={1} >{translate("COMMONTEXT")["DISCOUNT"]}</Text>
                    <Text style={[styles.priseText, { color:theme.GREEN }]} numberOfLines={1} >{- 900}</Text>
                </View> */}
                <View style={[styles.appointTitleVw, styles.payableVw]}>
                    <Text style={[styles.doctorName, { fontSize: 14, width: '80%', fontFamily: FONTFAMILY.POPPINS_SEMIBOLD }]} numberOfLines={1} >{translate("COMMONTEXT")["TOTAL_AMOUNT"]}</Text>
                    <Text style={styles.priseText} numberOfLines={1} >{/*'\u20B9' +*/ (item?.fee || item?.appt_name?.fee)}</Text>
                </View>
                {/* <Text style={[styles.priseText, {color: theme.GREEN, marginHorizontal: 16, marginBottom: 24}]}>You will save `999 on this order</Text> */}
                
                {/* ZenOnco.io Promise */}
                <View style={styles.zenOncoPromiseContainer}>
                    <View style={styles.zenoncoPromiseWrapper}>
                        <TickMark />
                        <Text style={[styles.headerText, {color: theme.SECONDARY, marginLeft: 10}]}>{translate("COMMONTEXT")["ZenOncoIO"]} {translate("COMMONTEXT")["Guarantee"]}</Text>
                    </View>
                    <View style={styles.zenOncoPromiseDetailContainer}>
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <CheckMark />
                            <View style={styles.zenOncoPromiseTextWrapper}>
                                <Text style={styles.zenOncoPrmiseNoteText} >Immediate appointment confirmation</Text>
                                <Text style={styles.appointOptionText}>Your appointment date and timing will be confirmed within 30 mins of the booking</Text>
                            </View>

                        </View>
                        <View style={{
                            flexDirection:'row',
                            marginTop: 15
                        }}>
                            <CheckMark />
                            <View style={[styles.zenOncoPromiseTextWrapper, { }]}>
                                <Text style={styles.zenOncoPrmiseNoteText}>No extra charge</Text>
                                <Text style={styles.appointOptionText}>We assure that the doctor or the clinic will not charge you what is promised on ZenOnco.io</Text>
                            </View>

                        </View>
                        <View style={{
                            flexDirection:'row',
                            marginTop: 15
                        }}>
                            <CheckMark />
                            <View style={[styles.zenOncoPromiseTextWrapper, { }]}>
                                <Text style={styles.zenOncoPrmiseNoteText}>24/7 support from cancer coach</Text>
                                <Text style={styles.appointOptionText}>Dedicated cancer coach to guide you throughout your journey</Text>
                            </View>

                        </View>
                    </View>
                </View>
                
                {/* Reviews Section */}
                {/* <Text style={[styles.headerText, {marginLeft: 16, marginTop: 24}]}>{translate("DRAWER")["REVIEWS"]}</Text>
                <Text style={{
                    paddingHorizontal: 16,
                    fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 11, color: theme.BLACK, lineHeight: 18
                }}>These stories represent patient options and exprinece. They do not reflect the doctor's medical capabilityes.</Text>
                <View style={[styles.bottomLine, { marginTop: 7}]} />
                    <View style={{
                        flexDirection:'row',
                        paddingVertical: 5,
                        paddingHorizontal: 16,
                    }}>
                        <View style={{
                          paddingHorizontal: 15,
                            flexDirection:'row', 
                            justifyContent:'center',
                            alignContent:'center', alignItems: 'center'
                        }}>
                            <RatingHeart height={19} width={22} />
                            <Text style={{
                                marginLeft: 4,
                                fontSize: 20, fontFamily: FONTFAMILY.POPPINS_SEMIBOLD, lineHeight: 30
                            }}>97%</Text>
                        </View>
                        <View style={{height: '100%', width: 1, backgroundColor: theme.LIGHT_BORDER, marginHorizontal: 10}} /> 
                        <View style={{
                            flexDirection:'row',
                             alignItems:'center',
                        }}>
                            <Text style={{width: '70%',fontSize: 11, fontFamily: FONTFAMILY.POPPINS_REGULAR, lineHeight: 16, color: theme.SUB_TITLE}}>Out of 224 patient who were surveyed, 97% of them recommend visitng ths docter</Text>
                            <Pressable style={{
                                position:'absolute', right: 12
                            }}>
                                <RigthArrow />
                            </Pressable>
                        </View>
                    </View>
                <View style={styles.bottomLine} />
                <FlatList 
                    horizontal 
                    data={[1,2,3,4,5,6]} 
                    renderItem={({item}) => <RatingCard/>} 
                /> */}

                <ReviewCard  item={item}/>
                {/* Notification on Whatsapp */}
                <View style={styles.bottomLine} />      
                <View style={{paddingHorizontal: 20}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {/* <CheckboxSelected/> 
                    <Text style={[styles.headerText, styles.whstappNotificationTextStyle]} numberOfLines={1} >{translate("NOTIFICATION")["WHATSAPP_NOTIFICATION"]}</Text>
                    <WhatsAppIcon /> */}
                </View>
                {/* <Text style={[styles.notificationBodyText, {marginTop: 10}]}>• Note: Rs 50 cancellation charges applicable</Text>
                <Text style={styles.notificationBodyText}>• Update will be sent to +91 99 30 70 90 00</Text> */}
                <View style={{flexDirection:'row', marginTop: 6}}>
                    

                <CheckboxSelected/> 
                    
                        <Text style={styles.notificationBodyText}>By booking the appointment, you agree to ZenOnco.io{" "}
                        <Text style={styles.tremsConditionsText}>
                             Terms and Conditions.
                        </Text> 
                        {/* You can also Pre-pay for this appointment by selecting Pay Online option. You can read our payment  */}
                        <Text style={styles.tremsConditionsText}>
                         {"  "}FAQs.
                        </Text></Text>
                </View>
                </View>
                {/* <Text style={styles.notificationBodyText}>• By booking the appointment, you agree to ZenOnco.io
                1Trems and Conditions. You can also Pre-pay for this appointment by selecting Pay Online option. You can read our payment FAQs.</Text> */}
                {/* </View> */}
                
                <View style={styles.bottomLine} />


                {/* Cancellation Policy section */}
                <Text style={[styles.headerText, styles.extraTextStyle]} numberOfLines={1} >{translate("DOCTORSLIST")["CANCEL_POLICY"]}</Text>
                <View style={{ paddingHorizontal: 16, flexDirection: 'row' }} >
                    {/* <View style={styles.dot} /> */}
                    <Text style={[styles.appointOptionText, styles.policyTextStyle]} >{policy1}</Text>
                </View>
                <View style={{ paddingHorizontal: 16, flexDirection: 'row', marginVertical: 12 }} >
                    {/* <View style={styles.dot} /> */}
                    <Text style={[styles.appointOptionText, styles.policyTextStyle]} >{policy2}</Text>
                </View>

                {/* Need Help section */}
                <View style={styles.needHelpContainer}>
                    <NeedHelp navigation={props.navigation} />
                </View>

                {/* Appointment for section */}
                <View style={styles.appointmentForVw} >
                <View style={styles.profileVw} >
                    {/* <Text style={styles.letterText} numberOfLines={1}>C</Text> */}
                    <Image style={styles.appointmentForVwProfile} source={require('../../../assets/images/profileImage.png')} />
                </View>
                {/* <View style={{ marginLeft: 8, width: "65%" }} >
                    <Text style={styles.appointOptionText} numberOfLines={1} >{translate("DOCTORSLIST")["APPOINTMENT_FOR"]}</Text>
                    <Text style={[styles.doctorName, { fontSize: 16, lineHeight:26 }]} numberOfLines={1} >
                        {'Dimple Pamar '}
                        {/* <Text style={[styles.appointOptionText, { position: 'absolute', top: -0 }]} numberOfLines={1} > {'(MySelf)'}</Text> 
                    </Text>
                </View> */}
                <FlatList
                    data={patientDetail}
                    renderItem={(patientItem: any, index: any)=>{
                        return(
                            <View style={{ marginLeft: 8, width: "65%" }} >
                                <Text style={styles.appointOptionText} numberOfLines={1} >{translate("DOCTORSLIST")["APPOINTMENT_FOR"]}</Text>
                                <Text style={[styles.doctorName, { fontSize: 16, lineHeight:26 }]} numberOfLines={1} >
                                    {patientItem?.item?.patientName}
                                </Text>
                        </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    extraData={patientDetail}
                />
                <Pressable style={{ width: "18%" }}>
                    <Text style={[styles.doctorName, { color: theme.SECONDARY, textAlign: "right" }]} numberOfLines={1} >{translate("DIET_PLAN")["CHANGE"]}</Text>
                </Pressable>
                </View>
                <View style={[styles.appointTitleVw, { paddingHorizontal: 20, marginVertical: 20 }]}>
                    <View style={{ width: '40%' }} >
                        <Text style={[styles.doctorName, { fontSize: 22 }]} numberOfLines={1} >{'\u20B9' + (item?.fee || item?.appt_name?.fee)}</Text>
                        {/* <Pressable>
                            <Text style={[styles.doctorName, { color: theme.SECONDARY }]} numberOfLines={1} >{translate("DOCTORSLIST")["VIEW_BILL"]}</Text>
                        </Pressable> */}
                    </View>
                    <Pressable style={styles.payandConfirmButton} onPress={() => {
                        onPaymentClick()
                        // props.navigation.navigate('Zen.AppointmentConfirm', {item:item})
                    }}>
                        <Text style={[styles.letterText, { fontSize: 14, lineHeight: 16, fontFamily:FONTFAMILY.POPPINS_MEDIUM }]} numberOfLines={1} >{translate("COMMONTEXT")["PAY_CONFIRM"]}</Text>
                    </Pressable>
                </View>
                {isPayConfirmShow &&
                    <Modal
                        isVisible={isPayConfirmShow}
                        animationIn={'fadeIn'}
                        animationOut={'fadeInDown'}
                        style={{ margin: 0 }}
                        onBackdropPress={() => { }}
                        onBackButtonPress={() => { setPayConfirmShow(false) }} >
                        <View style={styles.modalContainer} >
                            <View style={styles.modalVw} >
                                <Pressable style={styles.closeImageVw} onPress={() => setPayConfirmShow(false)} >
                                    <Image style={styles.closeImage} source={require('../../../assets/images/close.png')} />
                                </Pressable>
                                <Text style={[styles.doctorName, { fontSize: 20, marginTop: 10 }]} numberOfLines={1} >{translate("DOCTORSLIST")["EDIT_DETAILS"]}</Text>
                                <TextInput placeholder='Chandu Patil' value={patientName} onChangeText={value => setPatientName(value)} style={[styles.inputContainer, { marginTop: 15 }]} />
                                <TextInput placeholder='+91 98 56 77 45 45' value={mobileNumber} onChangeText={value => setMobileNumber(value)} style={styles.inputContainer} />
                                <TextInput placeholder={`${translate("CHECKOUT")["EMAIL"]}*`} value={emailAddress} onChangeText={value => setEmailAddress(value)} style={styles.inputContainer} />
                                <Pressable style={styles.confirmButtonVw} >
                                    <Text style={[styles.letterText, { fontSize: 16 }]} numberOfLines={1} >{translate("COMMONTEXT")["CONFIRM"]}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>}
                {showRazorpay &&
                    <PaymentDisplay
                        navigation={props.navigation}
                        name={userData?.data.name}
                        setError={setError}
                        userId={userId}
                        subId={selected}
                        phone={''}
                        razorPayKey={razorPayKey}
                        actions={props.actions}
                        payInfo={paymentData[0]?.data}
                        setShowRazorpay={setShowRazorpay}
                        setStatus={setStatus}
                        setShowAlert={setShowAlert}
                        fromProduct={false}
                        fromAppointment={true}
                        onError={paymentFailure}
                        onSuccess={(data) => {
                            setRazorPayData(data)
                            onPayment(data)
                        }}
                    />}
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(Layout);