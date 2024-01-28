import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
    return StyleSheet.create({
        container:{ 
            flex: 1, 
            backgroundColor: theme.SELECTED 
        },
        textContainer: {
            borderRadius: 15,
            backgroundColor: theme.PRIMARY,
            height: Platform.OS === 'ios' ? 55 : 57,
            paddingHorizontal: 15,
            marginTop: 15
        },
        categoryModal: {
            marginTop: 0.5,
            borderRadius: 15,
            paddingHorizontal: 15,
            backgroundColor: theme.PRIMARY,
            paddingVertical: 15
        },
        categoryModalItem: {
            paddingVertical: 7
        },
        inputText: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.BLACK
        },
        weeklyVw: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 5
        },
        repeatItemUnselect: {
            paddingVertical: 15
        },
        repeatItemSelect: {
            borderRadius: 5,
            backgroundColor: theme.SECONDARY_OPACITY
        },
        remarksContainer: {
            height: 150,
            textAlignVertical: 'top',
            paddingTop: 17
        },
        downIcon: {
            width: 15,
            height: 8,
        },
        activityTimeVw: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 15,
            paddingLeft: 15,
            paddingRight: 10,
            marginTop: 15,
            paddingVertical: 10
        },
        activitySubVw: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        activitySubVwTwo: {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
            paddingVertical: 15
        },
        activityTitle: {
            color: theme.GRAY_BLACK,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        dateTimeVw: {
            backgroundColor: '#eeeef0',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 5,
        },
        dateTimeText: {
            color: theme.GRAY_BLACK,
            fontSize: 16,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
        },
        repetsItemName: {

            backgroundColor: '#eeeef0',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 5,
            overflow: 'hidden'
        },
        repeatText: {
            color: theme.SEARCH_TITLE,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginRight: 10
        },
        repeatDataVw: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: theme.PRIMARY,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5'
        },
        addActivityVw: {
            backgroundColor: theme.SECONDARY,
            borderRadius: 15,
            paddingVertical: 20,
            marginTop: 20,
            marginBottom: Platform.OS === 'ios' ? 20 : 50,
        },
        addActivityText: {
            color: theme.PRIMARY,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        headerDateText: {
            fontSize: 15,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        checkboxContainer: {
            justifyContent: "center",
            paddingRight: widht * .06,
        },

        checkBoxText: {
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 12,
            textAlign: 'center'
        },
        confirmVw: {
            position: 'absolute',
            right: 0,
            padding: 7,
            bottom: 0
        },
        confirmBtn: {
            color: theme.SECONDARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 14
        },
        line: {
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5'
        },
    });
};

export default Style;