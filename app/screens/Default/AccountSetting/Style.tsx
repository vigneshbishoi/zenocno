import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from 'react-native-iphone-x-helper'

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    vwContainer: {
      marginHorizontal: 10,
      borderRadius: 10,
      marginVertical: 10,
      paddingVertical: Platform.OS === 'android' ? 10 : 12,
      backgroundColor: theme.PRIMARY,
      padding: 20,
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    deactivateText: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    desText: {
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: 8
    },
    onclickText: {
      marginTop: 20
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    deactivateModalVw: {
      width: 229,
      // height: 170,
      borderRadius: 10,
      backgroundColor: theme.PRIMARY
    },
    deleteModalVw: {
      width: width - 60,
      // height: 268,
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      padding: 15
    },
    modalTitleText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
      marginTop: 15
    },
    modalDesText: {
      color: theme.GRAY_BLACK,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      paddingHorizontal: 17,
      paddingVertical: Platform.OS === 'ios' ? 10 : 7,
      textAlign: 'center'
    },
    line: {
      height: 1,
      backgroundColor: 'grey'
    },
    modalButtonVw: {
      borderTopColor: 'grey',
      borderTopWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.OS === 'ios' ? 7 : 5,
    },
    bottomButtonVw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    },
    deletionInputVw: {
      height: 69,
      borderRadius: 4,
      backgroundColor: theme.PRIMARY,
      borderWidth: 1,
      borderColor: '#ebebeb',
      paddingHorizontal: 10,
      marginVertical: 5
    },
    placeholderText: {
      color: theme.SEARCH_TITLE
    },
    postText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      textAlignVertical: 'top',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,

    },
  });
};

export default Style;