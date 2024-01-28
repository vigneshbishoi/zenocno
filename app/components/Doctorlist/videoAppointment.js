import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform, Dimensions, FlatList } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import VideoAppoint from '../../assets/images/videoApp.svg';
import { isIphoneX } from '../../lib/isIphoneX';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';

const VideoAppointment = ((props) => {
    const { item, theme, navigation, } = props
    const styles = modalStyles(theme);
    let policy1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    let policy2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
    const [isPayConfirmShow, setPayConfirmShow] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    return (
        <View>
            <View style={styles.doctorInfovw} >
                <Image style={styles.doctorImage} source={item.doctorImage} />
                <View style={styles.doctorInfo} >
                    <Text style={[styles.doctorName, { marginTop: Platform.OS === 'ios' ? 7 : 4 }]} numberOfLines={1} >{item.doctorName}</Text>
                    <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]} numberOfLines={1} >{item.expertization}</Text>
                </View>
            </View>
            <View style={styles.bottomLine} />
            <View style={styles.appointmentInfo} >
                <View style={styles.appointTitleVw} >
                    <VideoAppoint />
                    <Text style={[styles.appointOptionText, { marginLeft: 8 }]} numberOfLines={1} >{translate("DOCTORSLIST")["BOOK_VIDEOAPPOINTMENT"]}</Text>
                </View>
                <Text style={[styles.doctorName, { fontSize: 24, marginVertical: Platform.OS === 'ios' ? 10 : 5 }]} numberOfLines={1} >Fri, 29 Jul  | 09:20 AM</Text>
                <View style={[styles.appointTitleVw, { marginBottom: 10 }]} >
                    <Image style={{ width: 15, height: 15 }} source={require('../../assets/images/tick.png')} />
                    <Text style={[styles.expertizationText, styles.zenOncoText]} numberOfLines={1} >{translate("COMMONTEXT")["ZenOncoIO"]} </Text>
                    <Text style={[styles.expertizationText, { color: theme.SUB_TITLE, width: '80%' }]} numberOfLines={1} >{translate("DOCTORSLIST")["CONFIRM_PPOINTMENT"]}</Text>
                </View>
                <View style={[styles.appointTitleVw, styles.cancellationVw]} >
                    <Text style={[styles.appointOptionText, { fontSize: 11, width: '80%' }]} numberOfLines={1} >Free cancellation before 29-07-2022, 6:20 PM</Text>
                    <Pressable style={{ marginLeft: 5, width: '20%' }} >
                        <Text style={[styles.appointOptionText, { fontSize: 11, textDecorationLine: 'underline' }]} numberOfLines={1} >{translate("COMMONTEXT")["KNOW_MORE"]}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomLine} />
            <Text style={[styles.doctorName, styles.extraTextStyle]} numberOfLines={1} >{translate("DOCTORSLIST")["BILL_DETAIS"]}</Text>
            <View style={[styles.appointTitleVw, { paddingHorizontal: 20 }]}>
                <Text style={[styles.expertizationText, { fontSize: 14, width: '80%' }]} numberOfLines={1} >{translate("COMMONTEXT")["SUBTOTAL"]}</Text>
                <Text style={styles.priseText} numberOfLines={1} >{'\u20B9' + '1,500'}</Text>
            </View>
            <View style={[styles.appointTitleVw, { paddingHorizontal: 20, marginVertical: 10 }]}>
                <Text style={[styles.expertizationText, { fontSize: 14, width: '80%' }]} numberOfLines={1} >{translate("DOCTORSLIST")["BOOKING_FEE"]}</Text>
                <Text style={[styles.priseText, { color: '#ee5d5d' }]} numberOfLines={1} >{translate("COMMONTEXT")["FREE"]}</Text>
            </View>
            <View style={[styles.appointTitleVw, styles.payableVw]}>
                <Text style={[styles.doctorName, { fontSize: 13, width: '80%' }]} numberOfLines={1} >{translate("DOCTORSLIST")["TOTAL_PAYABLE"]}</Text>
                <Text style={styles.priseText} numberOfLines={1} >{'\u20B9' + '1,500'}</Text>
            </View>
            <Text style={[styles.doctorName, styles.extraTextStyle]} numberOfLines={1} >{translate("DOCTORSLIST")["CANCEL_POLICY"]}</Text>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row' }} >
                <View style={styles.dot} />
                <Text style={[styles.appointOptionText, styles.policyTextStyle ]} >{policy1}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginVertical: 17 }} >
                <View style={styles.dot} />
                <Text style={[styles.appointOptionText, styles.policyTextStyle]} >{policy2}</Text>
            </View>
            <View style={styles.appointmentForVw} >
                <View style={styles.profileVw} >
                    <Text style={styles.letterText} numberOfLines={1}>C</Text>
                </View>
                <View style={{ marginLeft: 8, width: "65%" }} >
                    <Text style={styles.appointOptionText} numberOfLines={1} >{translate("DOCTORSLIST")["APPOINTMENT_FOR"]}</Text>
                    <Text style={[styles.doctorName, { fontSize: 17, marginTop: 5 }]} numberOfLines={1} >
                        {'Chandu Patil'}
                        <Text style={[styles.appointOptionText, { position: 'absolute', top: -0 }]} numberOfLines={1} > {'(MySelf)'}</Text>
                    </Text>
                </View>
                <Pressable style={{ width: "18%" }}>
                    <Text style={[styles.doctorName, { color: theme.SECONDARY, textAlign: "right" }]} numberOfLines={1} >{translate("DIET_PLAN")["CHANGE"]}</Text>
                </Pressable>
            </View>
            <View style={[styles.appointTitleVw, { paddingHorizontal: 20, marginVertical: 20 }]}>
                <View style={{ width: '40%' }} >
                    <Text style={[styles.doctorName, { fontSize: 26 }]} numberOfLines={1} >{'\u20B9' + '1,500'}</Text>
                    <Pressable>
                        <Text style={[styles.doctorName, { color: theme.SECONDARY }]} numberOfLines={1} >{translate("DOCTORSLIST")["VIEW_BILL"]}</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.payandConfirmButton} onPress={() => setPayConfirmShow(true)} >
                    <Text style={[styles.letterText, { fontSize: 16 }]} numberOfLines={1} >{translate("COMMONTEXT")["PAY_CONFIRM"]}</Text>
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
                                <Image style={styles.closeImage} source={require('../../assets/images/close.png')} />
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
        </View>
    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        doctorInfovw: {
            paddingHorizontal: 20,
            paddingTop: 15,
            flexDirection: 'row',
            paddingBottom: 10
        },
        doctorImage: {
            width: 58,
            height: 58,
            borderRadius: 10
        },
        doctorInfo: {
            marginLeft: 8,
            width: '85%'
        },
        doctorName: {
            fontSize: 15,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        extraTextStyle: {
            fontSize: 16,
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        expertizationText: {
            fontSize: 13,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        zenOncoText:{ 
            color: theme.SECONDARY, 
            width: Platform.OS === 'ios' ? isIphoneX() ? "21%" : "23%" : '22%', 
            marginLeft: 5 
        },
        bottomLine: {
            height: 7,
            backgroundColor: theme.SELECTED
        },
        appointmentInfo: {
            paddingHorizontal: 20,
            paddingVertical: 15
        },
        appointTitleVw: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        payableVw: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 15,
            backgroundColor: theme.SELECTED
        },
        cancellationVw: {
            backgroundColor: '#f8f9ef',
            borderRadius: 7,
            paddingVertical: 13,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15
        },
        profileVw: {
            backgroundColor: theme.GRAY_BLACK,
            borderRadius: 49 / 2,
            width: 49, height: 49,
            alignItems: 'center',
            justifyContent: 'center'
        },
        appointmentForVw: {
            backgroundColor: theme.SELECTED,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center'
        },
        appointOptionText: {
            fontSize: 14,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        policyTextStyle:{ 
            fontSize: 12, 
            marginLeft: 5, 
            lineHeight: 19 
        },
        priseText: {
            fontSize: 14,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            position: 'absolute',
            right: 20,
            width: '18%',
            textAlign: 'right'
        },
        dot: {
            backgroundColor: '#848484',
            width: 5,
            height: 5,
            marginTop: 8,
            borderRadius: 2.5
        },
        letterText: {
            color: theme.PRIMARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 23,
        },
        modalContainer: {
            justifyContent: 'flex-end',
            flex: 1,
        },
        modalVw: {
            backgroundColor: theme.SELECTED,
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        closeImageVw: {
            position: 'absolute',
            right: 5,
            top: 5,
            padding: 10
        },
        closeImage: {
            height: 16,
            width: 16,
            tintColor: theme.BLACK
        },
        inputContainer: {
            borderRadius: 10,
            backgroundColor: theme.PRIMARY,
            paddingHorizontal: 15,
            paddingVertical: 15,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
            marginTop: 10
        },
        confirmButtonVw: {
            backgroundColor: theme.SECONDARY,
            borderRadius: 10,
            marginBottom: 15,
            marginTop: 25,
            paddingVertical: 15,
            alignItems: 'center'
        },
        payandConfirmButton: {
            backgroundColor: theme.SECONDARY,
            borderRadius: 10,
            paddingVertical: 15,
            width: '60%',
            alignItems: 'center'
        }
    });
};

export default VideoAppointment