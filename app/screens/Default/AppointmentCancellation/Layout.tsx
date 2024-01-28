/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useEffect, useState } from 'react';
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
    FlatList,
    Alert
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
import AppointmentStatus from '../../../components/Doctorlist/appointmentStatus';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import AppLoader from '../../../components/Plugins/AppLoader';
import moment from 'moment'
import PaymentDisplay from '../../../components/RazorPay';
import AppHeader from '../../../components/CommonInput/appHeader';
import DoctorCardInfo from '../../../components/Doctorlist/doctorCardInfo';
import NeedHelp from '../../../components/NeedHelp';
import BookingDetails from '../../../components/Doctorlist/bookingDetails';

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
    const [selectReason, setSelectedReason] = useState(-1)
    const [activeButton, setActiveButton] = useState(false)
    const [isLoader, setIsLoader] = useState(false);
    const [showRazorpay, setShowRazorpay] = useState(false);
    const [status, setStatus] = useState();
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selected, setSelected] = useState(true);
    const [razorPayData, setRazorPayData] = useState({});
    const cancelReasons =
        useSelector((state) => state?.appointmentReducer?.cancelOptions?.length > 0 ?
            state?.appointmentReducer?.cancelOptions[0]?.data : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const cancelAppoinment = useSelector((state) => state?.appointmentReducer?.cancelAppoinment?.length > 0 ?
        state?.appointmentReducer?.cancelAppoinment[0] : []) || [];
    const userData = useSelector((state) => state.onboardingReducer.userDetails);
    const paymentData = useSelector(state => state.onboardingReducer.paymentData);

    useEffect(() => {
        getReasons()
    }, [])
    useEffect(() => {
        if (cancelAppoinment != undefined && cancelAppoinment?.status == 1) {
            setIsLoader(false)
            Alert.alert(
                'Cancel Appointment',
                'Your appointment has been cancelled. The amount shall be refunded within 5-7 working days',
                [
                    {
                        text: 'ok',
                        onPress: () => {
                            props.navigation.navigate("Zen.AppointmentCancelled", { item: item })
                            props.actions.cancelAppointmentData("cancelAppoinment", [], actionTypes.CANCEL_APPOINTMENT_DATA)
                        },
                    },
                ],
            );
        }
    }, [cancelAppoinment])

    //Api Call
    const cancelAppointment = (isRefund: true) => {
        setIsLoader(true)
        let amount = item.fee
        if (isRefund) {
            amount = item?.appt_name?.fee - (item?.appt_name?.fee * 50 / 100)
        }
        props.actions.cancelAppointment(actionTypes.CANCEL_APPOINTMENT, {
            module: 'appointment',
            action: 'cancel_appointment',
            formData: {
                apptBookingtId: item?.id,
                userId: userId,
                apptCancellationReasonsId: selectReason,
                refund_amount: amount
            }
        });
    }
    const getReasons = () => {
        props.actions.cancelOptions(actionTypes.CANCEL_OPTIONS, {
            module: 'appointment',
            action: 'get_appt_cancel_reason',
        });
    }
    const onPaymentClick = () => {
        let amount = item?.appt_name?.fee - (item?.appt_name?.fee * 50 / 100)
        var inputRequest = {
            module: 'payment',
            action: 'initiatePay',
            formData: {
                userId: userId,
                subscriptionPlanId: selected,
                amount: amount,
                currency: 'INR',
            },
        };
        if (selected) {
            props.actions
                .callPayment(actionTypes.GET_PAYMENT, inputRequest)
                .then(data => {
                    setShowRazorpay(true);
                });
        }
    };

    //Helper Methods
    const renderReasonArr = ({ item, index }) => {
        return (
            <Pressable style={[styles.reasonItemContainer, index == cancelReasons?.length - 1 && { borderBottomWidth: 0 }]} onPress={() => {
                setSelectedReason(item?.id)
                setActiveButton(true)
            }} >
                <View style={[styles.unselectedVw, selectReason == item.id && styles.selectedVw]} />
                <Text style={[styles.commonTexts, { fontSize: 13, marginHorizontal: 10, marginTop: Platform.OS === 'ios' ? 0 : 3 }]} numberOfLines={1} >{item?.text}</Text>
            </Pressable>
        );
    }
    const calcelAlert = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel your appointment for 50% cancellation charges? You can instead reschedule for Rs 50 only',
            [
                {
                    text: 'Cancel',
                    onPress: () => { cancelAppointment(true) },
                    style: 'cancel',
                },
                { text: 'Reschedule', onPress: () => { props.navigation.goBack() } },
                { text: 'Back', onPress: () => { } },
            ],
        );
    }
    const calcelAlert1 = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel your appointment? You can instead reschedule for free',
            [
                {
                    text: 'Cancel',
                    onPress: () => { cancelAppointment(false) },
                    style: 'cancel',
                },
                { text: 'Reschedule', onPress: () => { props.navigation.goBack() } },
                { text: 'Back', onPress: () => { } },
            ],
        );
    }
    const onCheckCondition = () => {
        let currentTime = moment(moment(), "HH:mm").subtract(360, 'minutes').format('HH:mm:ss');
        let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');
        if (currentDate < item?.apptDate) {
            calcelAlert1()
        } else if (currentDate == item.apptDate && currentTime > item?.apptTime) {
            calcelAlert1()
        } else {
            calcelAlert()
        }
    }
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DOCTORSLIST")["APPN_CANCELLATION"]}
                isRightComponent={false}
                isSubText={true}
                headerFontColor={'#ff4040'}
            />

            <ScrollView showsVerticalScrollIndicator={false} >
                {/* <View style={styles.doctorInfovw} >
                    <Image style={styles.doctorImage} source={item?.doctor?.image == null || item?.doctor?.image == undefined ? require('../../../assets/images/profileImage.png') : { uri: item?.doctor?.image }} />
                    <View style={styles.doctorInfo} >
                        <Text style={[styles.doctorName, { marginTop: Platform.OS === 'ios' ? 7 : 4 }]} numberOfLines={1} >{item?.appt_name?.name}</Text>
                        <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]} numberOfLines={1} >{item?.appt_name?.educationSummary}</Text>
                    </View>
                </View> */}
                <View>
                    <DoctorCardInfo
                        item={item}
                        theme={theme}
                        navigation={props.navigation}
                        onSaveDoctorBookMark={()=> null}
                    />
                </View>
                <View style={styles.bottomLine} />
                  <AppointmentStatus theme={theme} isFromVideoApp={false} isFromCancel={true} date={item?.apptDate} time={item?.apptTime} />
                <View style={{marginHorizontal: 20}}>
                    <NeedHelp navigation={props.navigation} />
                </View>
                <View style={styles.desContainer} >
                    <Text style={styles.commonTexts} numberOfLines={1} >{translate("DOCTORSLIST")["REASON_TITLE"]}</Text>
                    <FlatList
                        data={cancelReasons}
                        style={styles.flatlistStyle}
                        renderItem={renderReasonArr}
                    />
                    <Pressable style={[styles.cancelButtonVw, activeButton && { backgroundColor: theme.SECONDARY }]} onPress={() => {
                        // if (activeButton) {
                        //     onCheckCondition()
                        // }
                        props.navigation.navigate("Zen.AppointmentCancelled", { item: item })
                    }} >
                        <Text style={styles.wantCancelText} numberOfLines={1} >{translate("COMMONTEXT")["WANT_CANCEL"]}</Text>
                    </Pressable>
                </View>
                <View style={{marginHorizontal:20}}>
                    <BookingDetails
                        theme={theme}
                        item={item}
                    />
                </View>
                {showRazorpay &&
                    <PaymentDisplay
                        navigation={props.navigation}
                        name={userData?.data.name}
                        setError={setError}
                        userId={userId}
                        subId={selected}
                        phone={''}
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
                            cancelAppointment(true)
                        }}
                    />}
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(Layout);