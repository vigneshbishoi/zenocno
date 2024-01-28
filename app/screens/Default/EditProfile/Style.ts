/**
 * EditProfile Component
 * @Author: Astha
 * @Date: Tue April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Edit Profile
 */

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
    headerVw: {
      flexDirection: 'row',
       alignItems: 'center',
        justifyContent:'center',
         height:50 
    },
    backVw:{ 
      position:'absolute', 
      left:30 
  },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.MEDIUM,
    },
    mainHeaderText: {
      fontSize: 24,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 35
    },
    checkoutContainer: {
      paddingHorizontal: 30,
      backgroundColor: theme.PRIMARY
    },
    priseContainer: {
      flexDirection: "row",
      alignItems: 'center',
      paddingVertical: 20,
    },
    totalCountItems: {
      fontSize: 14,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    totalPrise: {
      position: 'absolute',
      right: 0,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.BOLD,
      fontSize: 22,
    },
    checkoutButton: {
      borderRadius: 20,
      backgroundColor: theme.SECONDARY,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 23,
      marginVertical: 20
    },
    checkoutText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 18,
    },
    txtContainer: {
      paddingRight: 10,
      paddingLeft: 15,
      justifyContent:'center',
      borderRadius: 10,
      backgroundColor:theme.PRIMARY,
      // height:52,
      paddingVertical:5,
      marginVertical: 6,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    errorMessage:{
      borderColor:theme.RED,
       borderWidth:1
      },
    headerTitleVw:{ 
      paddingHorizontal: 50,
       marginTop: Platform.OS === 'ios' ? 10 :12,
        marginBottom: 10, 
        alignItems:'center' 
  },
    titleText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 24,
    },
    subtitleText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 20,
      marginTop: Platform.OS === 'ios' ? 3 : -5,
      textAlign:'center'
    },
    bottomVw:{
      marginBottom:Platform.OS === 'ios' ? 15 :25
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
    prefixText: {
      fontSize: 11,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
  },
  });
};
export default Style;