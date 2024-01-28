import React from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import VideoAppoint from '../../assets/images/videoApp.svg';
import CertifiedDoctor from '../../assets/images/certifiedDoctor.svg';
import { isIphoneX } from '../../lib/isIphoneX';
import moment from 'moment'

const AppointmentStatus = ((props) => {
    const { theme, isFromVideoApp = false, isFromCancel = false, date, time, isFromCancelled = false } = props
    const styles = modalStyles(theme);
    let momentObj = moment(date?.date || date, 'YYYY-MM-DD')
    const previous = new Date(date?.date || date);
    previous.setDate(previous.getDate() - 1);
    let showDate1 = moment(previous).format('MM-DD-YYYY')
    let showDate = moment(momentObj).format('MMM DD, YYYY')
    let startTime = moment(time, "HH:mm");
    let showTime = startTime?.format("HH:mm a")

    return (
        <View style={styles.appointmentInfo} >
            <View style={styles.appointTitleVw} >
                {!isFromVideoApp &&
                    // <>
                    //     <VideoAppoint />
                    //     <Text style={[styles.appointOptionText, { marginLeft: 8 }]} numberOfLines={1} >{translate("DOCTORSLIST")["BOOK_VIDEOAPPOINTMENT"]}</Text>
                    // </> 
                    // :
                    <Text style={[styles.appointOptionText, {textDecorationLine: isFromCancelled ? 'line-through' : 'none', textDecorationColor: theme.SUB_TITLE}]} numberOfLines={1} >{translate("DOCTORSLIST")["APPN_TIME"]}</Text>}
            </View>
            <Text style={[styles.doctorName, { fontSize: 18, marginVertical: Platform.OS === 'ios' ? 10 : 5, textDecorationLine: isFromCancelled ? 'line-through' : 'none', textDecorationColor: theme.BLACK, }]} numberOfLines={1} >{showDate} | {showTime}</Text>
            {isFromVideoApp ?
                <View style={[styles.appointTitleVw, { marginBottom: 10 }]} >
                    {/* <Image style={{ width: 15, height: 15 }} source={require('../../assets/images/tick.png')} /> */}
                    <CertifiedDoctor />
                    <Text style={[styles.expertizationText, styles.zenOncoText]} numberOfLines={1} >{translate("COMMONTEXT")["Zens"]} {translate("COMMONTEXT")["Promise"]} </Text>
                    <Text style={[styles.expertizationText, { color: theme.BLACK, width: '80%' }]} numberOfLines={1} > {translate("DOCTORSLIST")["CONFIRM_PPOINTMENT"]}</Text>
                </View> :
                <View style={[styles.appointTitleVw, { marginBottom: 10 }]} >
                    <Image style={{ width: 15, height: 15 }} source={require('../../assets/images/tick.png')} />
                    <Text style={[styles.expertizationText, styles.zenOncoText]} numberOfLines={1} >{'Book for -'} </Text>
                    <Text style={[styles.expertizationText, { color: theme.SUB_TITLE, width: '80%' }]} numberOfLines={1} >{'Chandu Patil'}</Text>
                </View>}
            {!isFromCancel &&
                <View style={styles.freeCancellationContainer}>
                    <Text style={styles.freeCancellationText}>{translate("COMMONTEXT")["FREE_CANCELLATION_BEFORE"]}29 Jul, 6:20 PM</Text>
                    <Pressable onPress={() => {}}>
                        <Text style={[styles.freeCancellationText, { color: theme.BLACK, textDecorationLine: 'underline' }]} numberOfLines={1} >{translate("COMMONTEXT")["KNOW_MORE"]}</Text>
                    </Pressable>
                </View>
                // <View style={[styles.appointTitleVw, styles.cancellationVw]} >
                //     <Text style={[styles.appointOptionText, { fontSize: 11, width: '80%' }]} numberOfLines={1} >Free cancellation before {showDate1}, {showTime}</Text>
                //     <Pressable style={{ marginLeft: 5, width: '20%' }} >
                //         <Text style={[styles.appointOptionText, { fontSize: 11, textDecorationLine: 'underline' }]} numberOfLines={1} >{translate("COMMONTEXT")["KNOW_MORE"]}</Text>
                //     </Pressable>
                // </View>
                
                }
        </View>

    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        appointmentInfo: {
            paddingHorizontal: 20,
            paddingVertical: 15
        },
        appointTitleVw: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        appointOptionText: {
            fontSize: 14,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        doctorName: {
            fontSize: 15,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        zenOncoText: {
            color: theme.SECONDARY,
            width: Platform.OS === 'ios' ? isIphoneX() ? "25%" : "25%" : '22%',
            marginLeft: 5
        },
        cancellationVw: {
            backgroundColor: '#f8f9ef',
            borderColor:theme.LIGHT_YELLOW_BORDER,
            borderWidth:1,
            borderRadius: 7,
            paddingVertical: 13,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15
        },
        expertizationText: {
            fontSize: 12,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },     
        freeCancellationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 17,
            paddingVertical: 12,
            borderRadius: 7, borderWidth: 1, borderColor: theme.LIGHT_YELLOW_BORDER,
            backgroundColor: theme.LIGHT_YELLOW
        },
        freeCancellationText: {
            fontSize: 11,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },  
    });
};

export default AppointmentStatus