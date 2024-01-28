import React from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import { isIphoneX } from '../../lib/isIphoneX';

const BookingDetails = ((props) => {
    const { theme, item } = props
    const styles = modalStyles(theme);

    return (
        <View style={styles.bookingDetailContainer} >
            <View style={[styles.patientVw, { flexDirection: 'row', paddingBottom: Platform.OS === 'ios' ? 22 : 17 }]} >
                <View style={{ width: '70%' }} >
                    <Text style={styles.titleText} numberOfLines={1} >{translate("DOCTORSLIST")["BOOKING_DETAILS"]}</Text>
                    <Text style={styles.infoOtherText} numberOfLines={1} >{translate("DOCTORSLIST")["PATIENT"]}</Text>
                    <Text style={styles.infoMainText} numberOfLines={1} >{'Chandu Patil'}</Text>
                    <Text style={[styles.infoMainText, { color: theme.SUB_TITLE }]} numberOfLines={1} >{'+91 9876543210'}</Text>
                    <Text style={[styles.infoMainText, { color: theme.SUB_TITLE }]} numberOfLines={1} >{'chandu@gmail.com'}</Text>
                </View>
                <View style={styles.addPhotoContainer} >
                    <Pressable style={styles.photoContainer} >
                        <Image source={require('../../assets/images/portrait-sample.jpg')} style={styles.addPhotoImage} />
                    </Pressable>
                    <Text style={[styles.infoOtherText, { color: theme.SECONDARY, marginTop: Platform.OS === 'ios' ? 3 : 0 }]} numberOfLines={1} >+ {translate("DOCTORSLIST")["ADD_PHOTO"]}</Text>
                </View>
            </View>
            <View style={[styles.patientVw, { paddingVertical: Platform.OS === 'ios' ? 15 : 12 }]} >
                <Text style={[styles.infoOtherText,{width: '40%'}]} numberOfLines={1} >{translate("DOCTORSLIST")["APPN_ID"]}</Text>
                <Text style={styles.infoMainText} numberOfLines={1} >{item?.id}</Text>
            </View>
            <View style={[styles.patientVw, { borderBottomWidth: 0, paddingVertical: Platform.OS === 'ios' ? 15 : 12 }]} >
                <Text style={[styles.infoOtherText,{width: '40%'}]} numberOfLines={1} >{translate("DOCTORSLIST")["APPN_FEE"]}</Text>
                <Text style={styles.infoMainText} numberOfLines={1} >{'\u20B9 ' + item?.appt_name?.fee}</Text>
            </View>
        </View>
    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        bookingDetailContainer: {
            paddingVertical: Platform.OS === 'ios' ? 15 : 12,
        },
        patientVw: {
            flexDirection:'row',
            borderBottomWidth: 1,
            borderBottomColor: theme.SUB_TITLE
        },
        infoMainText: {
            fontSize: 16,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? 0 : -4
        },
        addPhotoContainer: {
            position: 'absolute',
            right: 0,
            alignItems: 'center'
        },
        titleText: {
            fontSize: 16,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginBottom:11
        },
        infoOtherText: {
            fontSize: 14,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        photoContainer: {
            height: 67,
            width: 67,
            borderRadius: 67 / 2,
            borderWidth: 1,
            borderColor: theme.BORDER_COLOR,
            alignItems: 'center',
            justifyContent: 'center'
        },
        addPhotoImage: {
            width: 38,
            height: 38,
            resizeMode: 'cover'
        }
    });
};

export default BookingDetails