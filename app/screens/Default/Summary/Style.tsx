/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions,Platform } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.SELECTED
    },
    innerContainer: {
      flex: 1,
      marginTop: 13
    },
    titleText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '90%',
      alignSelf:'center',
      color: theme.GRAY_BLACK,
      fontSize: 18,
      textAlign: 'center'
    },
    postVw: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
      padding: 15,
      marginHorizontal:20,
      marginTop:30
    },
    placeholderText: {
      color: theme.SEARCH_TITLE
    },
    postText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      textAlignVertical: 'top',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      height:190
    },
    submitBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginHorizontal:20,
      borderRadius:10,
      paddingVertical:15,
      marginVertical:15,
      backgroundColor:theme.SECONDARY
    },
    submitBtnText: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
  });
};

export default Style;
