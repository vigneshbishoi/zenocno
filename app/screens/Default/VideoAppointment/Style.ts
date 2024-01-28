/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.PRIMARY
        },
        backVw: {
            position: "absolute",
            left: 0,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
        },
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
        onlineConsultation: {
            marginTop: 2
        },
        freeCancellationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 17,
            paddingVertical: 12,
            borderRadius: 7, borderWidth: 1, borderColor: theme.LIGHT_YELLOW_BORDER,
            marginHorizontal: 16,
            backgroundColor: theme.LIGHT_YELLOW
        },
        freeCancellationText: {
            fontSize: 11,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        offerContainer: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },
        headerText: {
            fontSize: 18,
            lineHeight: 30,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
        },
        doctorName: {
            fontSize: 15,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        extraTextStyle: {
            paddingHorizontal: 16,
            paddingVertical: 10
        },
        whstappNotificationTextStyle: {
            paddingHorizontal: 7,
            paddingVertical: 10,
        },
        notificationBodyText: {
            fontSize: 12,
            lineHeight: 20,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.SUB_TITLE,
            marginBottom: 12,
            width: '80%',
            marginLeft: 8
        },
        tremsConditionsText: {
            fontSize: 12,
            lineHeight: 20,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.SECONDARY,
        },
        expertizationText: {
            fontSize: 14,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        zenOncoText: {
            color: theme.SECONDARY,
            width: Platform.OS === 'ios' ? isIphoneX() ? "21%" : "23%" : '22%',
            marginLeft: 5
        },
        zenOncoPromiseContainer: {
            borderRadius: 10, borderWidth: 1, borderColor: theme.SECONDARY,
            marginHorizontal: 16
        },
        zenoncoPromiseWrapper: {
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            paddingVertical: 20,
            backgroundColor: 'rgba(16, 143, 229, 0.1)',
            paddingHorizontal: 17.5
        },
        zenOncoPromiseDetailContainer: {
            marginTop: 12, paddingBottom: 20,
            paddingHorizontal: 17.5
        },
        zenOncoPromiseTextWrapper: { marginLeft: 12.5, width: '80%' },
        zenOncoPrmiseNoteText: {
            fontSize: 16, lineHeight: 22,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: theme.BLACK,
            marginBottom: 4
        },
        bottomLine: {
            height: 1,
            backgroundColor: theme.BORDER_GREAY,
            width: width - 32,
            alignSelf: 'center'
        },
        appointmentInfo: {
            paddingHorizontal: 20,
            paddingVertical: 15
        },
        appointTitleVw: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        },
        payableVw: {
            // paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 15,
            marginHorizontal: 16,
            // backgroundColor: theme.SELECTED,
            borderTopWidth: 1, borderBottomWidth: 1,
            borderColor: theme.SLOT_BORDER,
            width: width - 32
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
            // backgroundColor: theme.GRAY_BLACK,
            borderRadius: 8,
            width: 40, height: 40,
            alignItems: 'center',
            justifyContent: 'center'
        },
        appointmentForVw: {
            backgroundColor: theme.LIGHT_BLUE,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 13
        },
        appointOptionText: {
            fontSize: 12,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        appointmentForVwProfile: {
            height: 40, width: 40, borderRadius: 8
        },
        policyTextStyle: {
            lineHeight: 20
        },
        priseText: {
            fontSize: 14,
            lineHeight: 18,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        },
        dot: {
            backgroundColor: '#848484',
            width: 5,
            height: 5,
            marginTop: 8,
            borderRadius: 2.5
        },
        needHelpContainer: {
            paddingHorizontal: 16, marginTop: 10
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
            borderRadius: 4,
            paddingVertical: 12,
            paddingHorizontal: 26,
            // width: '60%',
            // alignItems: 'center'
        }

    });
};

export default Style;
