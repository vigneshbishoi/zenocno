/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Pressable,
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import {handleSlots} from '../../../utils/commonFunction'
import TimeSlot from '../../../components/Doctorlist/timeSlot'
import Toast from 'react-native-toast-message';
import AppLoader from '../../../components/Plugins/AppLoader';
import PaymentDisplay from '../../../components/RazorPay';
import moment from 'moment';
import AppHeader from '../../../components/CommonInput/appHeader';
import {initatePayment} from '../../../utils/commonFunction'

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const navigation= props.navigation
    const insets = useSafeAreaInsets();
    const item = props?.route?.params?.item
    const [selectAvailableDate, setSelectAvailbleDate] = useState('')
    const [selectAvailableTime, setSelectAvailbleTime] = useState('')
    const [selectedDate, setSelectDate] = useState('')
    const [slots, setSlots] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [showRazorpay, setShowRazorpay] = useState(false);
    const [status, setStatus] = useState();
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selected, setSelected] = useState(true);
    const [razorPayData, setRazorPayData] = useState({});
    const [razorPayKey, setRazorPayKey] = useState('');
    const doctorSchedule = useSelector((state) => state?.appointmentReducer?.schedule?.length > 0 ?
        state?.appointmentReducer?.schedule[0] : []) || [];
    const reschedule = useSelector((state) => state?.appointmentReducer?.rescheduleAppoinment?.length > 0 ?
        state?.appointmentReducer?.rescheduleAppoinment[0] : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const userData = useSelector((state) => state.onboardingReducer.userDetails);
    const paymentData = useSelector(state => state.onboardingReducer.paymentData)
    

    useEffect(() => {
        getSchedule()
    }, [])    
    useEffect(() => {
        if(doctorSchedule != undefined && doctorSchedule?.data?.length > 0){
                handleSlots(doctorSchedule, setSlots, setBookedSlots, setAvailableDates)
        }
    }, [doctorSchedule])    
    useEffect(() => {
       if(reschedule != undefined && reschedule?.status == 1){
            setIsLoader(false)
            props.navigation.navigate('Zen.MyAppointment')
            props.actions.rescheduleAppointmentData("rescheduleAppoinment", [], actionTypes.RESCHEDULE_APPOINTMENT_DATA)
       }
    }, [reschedule])
    

    //Api Call
    const getSchedule = () => {
        props.actions.doctorSchedule(actionTypes.DOCTOR_SCHEDULE, {
            module: 'appointment',
            action: 'get_reschedule_appointment',
            formData: {
                doctorId: item?.appt_name?.id
            }
        });
    }
    const rescheduleAppointment = (isAmount: boolean) => {
        setIsLoader(true)
        props.actions.rescheduleAppointment(actionTypes.RESCHEDULE_APPOINTMENT, {
            module: 'appointment',
            action: 'reschedule_booking',
            formData:{
                apptBookingtId:item?.id,
                apptDate: selectAvailableDate?.date,
                apptTime: selectAvailableTime,
                amount:isAmount ? 50 : 0
            }
        });
    }
    const onPaymentClick = () => {
        let amount = 50
        initatePayment(userId, selected, amount,props.actions, setRazorPayKey, setShowRazorpay)
    };

    //Helper Methods
    const onReschedule = () => {
        if(selectAvailableDate?.date?.length > 0 && selectAvailableTime.length > 0){
            onCheckCondition()
        } else {
            Toast.show({
                type: 'error',
                text1: "Please select one slot please",
            })
        }
    }
    const reschedule6Alert = () => {
        Alert.alert(
            'Reschedule',
            'Are you sure you want to reschedule your appointment. Rs 50 shall be charged as fee since appointment is within next 6 hours',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => {onPaymentClick()}},
            ],
          );
    }
    const rescheduleAlert = () => {
        Alert.alert(
            'Reschedule',
            'Are you sure you want to reschedule your appointment. This is free till 6 hours before the appointment',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => {rescheduleAppointment(false)}},
            ],
          );
    }
    const onCheckCondition = () => {
        let currentTime = moment(moment(), "HH:mm").subtract(360, 'minutes').format('HH:mm:ss');
        let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');
        // Alert.alert(
        //     'check for condition',
        //     currentTime + '_' + currentDate + '_' + item?.apptDate + '_' + item?.apptTime,
        //     [
        //       {
        //         text: 'ok',
        //         onPress: () => console.log('Cancel Pressed'),
        //       },
        //     ],
        //   );
        if(currentDate < item?.apptDate){
            rescheduleAlert()
        } else if (currentDate == item.apptDate && currentTime > item?.apptTime){
            rescheduleAlert()
        } else {
            reschedule6Alert()
        }
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

    return (
        <SafeAreaProvider style={styles.container}>
            <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DOCTORSLIST")["SELECT_TIMESLOT"]}
                isRightComponent={false}  />
            <View style={styles.doctorInfoVw} >
                <Image style={styles.doctorImage} source={ item?.appt_name?.image == null || item?.appt_name?.image == "" || item?.appt_name?.image == undefined ? require('../../../assets/images/profileImage.png') : {uri: item?.appt_name?.image}} />
                <View style={styles.doctorTextInfo} >
                    <Text style={styles.commonText} numberOfLines={1} >{item?.appt_name?.name}</Text>
                    <Text style={styles.expertizationText} numberOfLines={1} >{item?.appt_name?.educationSummary}</Text>
                </View>
            </View>
            <ScrollView bounces={false} style={styles.subContainer} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} >
            <TimeSlot dates={availableDates} theme={theme} slots={slots} 
            selectAvailableDate={selectAvailableDate}
            selectAvailableTime={selectAvailableTime}
            selectedDate={selectedDate}
            setSelectAvailbleDate={setSelectAvailbleDate}
            setSelectAvailbleTime={setSelectAvailbleTime}
            setSelectDate={setSelectDate}
            bookSlot={bookedSlots}
            />
            </ScrollView>
            <View style={{ height: insets.bottom, backgroundColor: theme.SELECTED }} />
            <Pressable style={styles.bookAppButtonVw} onPress={()=> onReschedule()} >
                <Text style={styles.bookAppText} numberOfLines={1} >{translate("DOCTORSLIST")["RESCHEDULE_APPOINTMENT"]}</Text>
            </Pressable>
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
             rescheduleAppointment(true)
          }}
        />}
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);