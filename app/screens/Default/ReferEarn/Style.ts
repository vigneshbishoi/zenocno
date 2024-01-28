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
      backgroundColor: theme.SECONDARY_OPACITY
    },
    headerVw: {
      // height: (height / 2) - 50,
      backgroundColor: theme.SECONDARY
    },
    bgImage: {
      flexDirection: 'row',
      alignSelf: 'center',
      paddingTop: Platform.OS === 'ios' ? 70 : 50,
      paddingBottom: 130
    },
    headerTxt: {
      fontSize: 19,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 40,
      alignSelf: 'center',
      paddingBottom: Platform.OS === 'ios' ? 20 : 15,
      textAlign: 'center'
    },
    pointsContainer: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 13,
      marginHorizontal: 20,
      marginBottom: 20,
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
      fontSize: 28,
      marginLeft: 8,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '80%',
      marginTop: Platform.OS === 'ios' ? 0 : 3
    },
    scrollviewStyle: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },
    codeContainer: {
      backgroundColor: theme.SECONDARY_OPACITY,
      paddingHorizontal: 20,
    },
    codeVw: {
      paddingHorizontal: 15,
      marginVertical: 25,
      paddingVertical: Platform.OS === 'ios' ? 13 : 10,
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: theme.SECONDARY,
      borderWidth: 1,
      borderStyle: 'dotted',
      backgroundColor: theme.PRIMARY
    },
    earningItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 13
    },
    earningItemTitleText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 14,
      marginLeft: 10,
      width: '80%'
    },
    codeText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 20,
      width: '50%'
    },
    codeUtilityVw:{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      position: 'absolute', 
      right: 0
     },
    utilityVw: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    utilityText: {
      fontSize: 12,
      color: '#46a4e5',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 5
    }
  });
};

export default Style;
