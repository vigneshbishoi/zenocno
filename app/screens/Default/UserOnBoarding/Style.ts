/**
 * UserOnBoarding style
 * @Author: Anand R
 * @Date: Fri Nov 26 2021 17:45:49 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY,
    },
    txtContainer: {
      paddingRight: 10,
      paddingLeft: 15,
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      height: 50,
      marginVertical: 6,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0

    },
    btnContainer: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20
    },
    btnLgradient: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 55

    },
    btnText: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    skipBtnText: {
      fontSize: 14,
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    dietImg: {
      width: widht,
      height: height,
      resizeMode: 'contain',
    },
    errorMessage: {
      borderColor: theme.RED,
      borderWidth: 1
    },
    dropdownTopVw: {
      position:'absolute', 
      top:'10%', 
      width:'100%'
    },
    textInputContainer:{
      marginTop:0,
      marginBottom:-5,
      paddingHorizontal: 10,
      justifyContent: 'center',
      color: theme.GRAY_BLACK,
    },
    textInput:{
      height: 30,
      // backgroundColor: theme.SELECTED,
     color: theme.GRAY_BLACK,
    fontSize: 13,
    paddingBottom: 0,
    paddingLeft: 5,
    borderBottomColor:theme.SEARCH_TITLE,
    borderBottomWidth: 1,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    }
  });
};

export default Style;
