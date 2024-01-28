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
    ImageBackground,
    Platform,
    Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
import { useIsFocused } from '@react-navigation/native';
import Calendar from '../../../assets/images/calendaricon.svg'
import { isIphoneX } from '../../../lib/isIphoneX';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import moment from 'moment'
import Toast from 'react-native-toast-message';
import {
    sendChatPostFormRequest,
  } from '../../../services/chat';
import AppHeader from '../../../components/CommonInput/appHeader';
import Button from '../../../components/CommonInput/navigateButton';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const isFromPayment = props?.route?.params?.isFromPayment
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    const isFocused = useIsFocused();
    const appoinmentData =
        useSelector((state) => state?.appointmentReducer?.appointments?.length > 0 ?
            state?.appointmentReducer?.appointments[0]?.data : []) || [];

    useEffect(() => {
        if(isFocused){
            getAppoinmentData();
        }
    }, [isFocused]);    


    //Api Call
    const getAppoinmentData = () => {
        props.actions.fetchAppointment(actionTypes.FETCH_APPOINTMENT, {
            module: 'appointment',
            action: 'get_appointment',
            formData: {
                userId: userId,
            }
        });
    }
    const initialiseCall = async (user: any) => {
        let payload = {
          module: 'agora',
          action: 'create-token',
        };
        let type = 'video_call';
        const frmData = new FormData();
        frmData.append('type', type);
        frmData.append('receiver_ids[0]', user?.userId);
    
        const response = await sendChatPostFormRequest(frmData, payload, 'POST');
        if (response?.data.status != 0) {
          let data = response?.data;
            props.navigation.navigate('Zen.ChatVideo', {
              receivedUser: user,
              agoraData: data,
            });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Oops',
            text2: 'Please try again',
          });
        }
      };

    //Helper Method
    const renderAppointment = ({ item, index }) => {       
        let joinTime = moment(item.apptTime, "hh:mm").subtract(10, 'minutes').format('HH:mm');
        let joinTime1 = moment(item.apptTime, "hh:mm").add(30, 'minutes').format('HH:mm');
        let currentTime = moment(moment(), "hh:mm").format('HH:mm');
        let date = moment(item.apptDate, "yyyy-MM-DD").format('yyyy-MM-DD');
        let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');
        return (
            <Pressable style={styles.appointmentContainer} onPress={() => {props.navigation.navigate('Zen.AppointmentConfirm', {item:item})}}>
                <ImageBackground source={item?.appt_name?.image == null || item?.appt_name?.image == "" || item?.appt_name?.image == undefined ? require('../../../assets/images/profileImage.png') : {uri: item?.appt_name?.image}} style={styles.patientImage} >
                    <Image style={styles.expertView} source={{uri: item?.appt_name?.appt_category?.image}}/>
                </ImageBackground>
                 <View style={{ marginHorizontal: 0}} >
                    <Text style={styles.doctorName} numberOfLines={1} >{item?.appt_name?.name}</Text>
                    <View style={styles.messageContainer} >
                    <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 0 : -3 ,width: '60%'}]} >{item?.appt_name?.educationSummary}</Text>
                    {/* <Pressable style={[styles.joinButtonVw,{width: 75}]} onPress={() => {
                        let user = {
                            name: item?.appt_name?.name,
                            image: item?.appt_name?.image,
                            userId: item?.appt_name?.id,
                            cancerName: '',
                            cancerStage : ''
                          }
                          props.navigation.navigate('Zen.Chat', { user: user });
                    }}>
                            <Text style={styles.joinText} numberOfLines={1} >{translate("COMMONTEXT")["MESSAGE"]}</Text>
                        </Pressable> */}
                        </View>
                    <View style={styles.timeContainer} >
                        <Calendar />
                        <Text style={[styles.expertizationText, { marginLeft: 8, width: Platform.OS === 'ios' ? isIphoneX() ? '65%' : '60%' : '65%' }]} numberOfLines={1} >{`${item?.apptDate} | ${item?.apptTime}`}</Text>
                       
                    </View>
                    <View style={[styles.messageContainer, {marginBottom: 0}]} >
                    {/* {date == currentDate && currentTime > joinTime && currentTime < joinTime1 &&
                    <Pressable style={styles.joinButtonVw} onPress={() => {
                        let user = {
                            name: item?.appt_name?.name,
                            image: item?.appt_name?.image,
                            userId: item?.appt_name?.id,
                            cancerName: '',
                            cancerStage : ''
                          }
                          initialiseCall(user)
                    }}>
                        <Text style={styles.joinText} numberOfLines={1} >{translate("COMMONTEXT")["JOIN"]}</Text>
                    </Pressable>} */}
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => { isFromPayment != undefined ? props.navigation.navigate('Zen.DoctorsList') : props.navigation.pop() }}
                headerTitle={translate("DRAWER")["MYAPPOINTMENT"]}
                isRightComponent={false}  />
            <FlatList
                data={appoinmentData}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={renderAppointment}
                ListEmptyComponent={() =>
                 <View style={styles.emptyVw} >
                     <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_APPOINTMENT_FOUND"]}</Text>
                     <Button height={40} width={160} marginTop={10} theme={theme} borderRadius={3} buttonText="Book Appointment" fontSize={14}
                            onPress={() => props.navigation.navigate('Zen.DoctorsList')}
                        />
                 </View>
             }
            />
        </SafeAreaView>
    );
};

export default withTheme(Layout);