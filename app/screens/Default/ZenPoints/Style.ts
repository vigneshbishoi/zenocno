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
    headerVw: {
      height: 180,
      backgroundColor: theme.SECONDARY
    },
    backVw: {
      position: "absolute",
      left: 0,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerTxt: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 40,
      alignSelf: 'center',
      paddingBottom: Platform.OS === 'ios' ? 20 : 15
    },
    pointsContainer: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 13,
      marginHorizontal: 20,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    pointText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      marginLeft: 8,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '25%',
    },
    totalPoints: {
      position: 'absolute',
      right: 25,
      fontSize: 30,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '45%',
      textAlign: 'right',
    },
    earnTitle: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 20,
      marginTop: 20,
    },
    earningItemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomColor: '#d6d6d6',
      borderBottomWidth: 1
    },
    earningItemTitleText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 16
    },
    earningItemDetailText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
      fontSize: 14,

    },
    earningDesVw: {
      marginLeft: 8,
      width: '65%'
    },
    extra: {
      backgroundColor: theme.SECONDARY_OPACITY,
      paddingHorizontal: 5,
      borderRadius: 5,
      overflow: 'hidden',
      flexDirection: 'row',
      position: 'absolute',
      right: 20,
      top: 15,
    },
    redeemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    redeemItemVw: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '49.75%',
      paddingHorizontal: 20
    },
    lineVw: {
      width: '0.50%',
      height: '100%',
      backgroundColor: '#d6d6d6',
    },
    extraRedeemTitle: {
      fontSize: 14,
      paddingHorizontal: 20,
      paddingVertical: 15
    },
    redeemNowButton: {
      backgroundColor: theme.SECONDARY,
      marginHorizontal: 20,
      marginTop: Platform.OS === 'ios' ? 40 : 35,
      marginBottom: 20,
      paddingVertical: Platform.OS === 'ios' ? 15 : 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
    },
    redeemNowText: {
      color: theme.PRIMARY,
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginHorizontal: 20
    }
  });
};

export default Style;
