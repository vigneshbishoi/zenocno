/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginBottom:5
    },
    backImg:{ 
      position: "absolute",
      left: 17 
  },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width:'70%',
      textAlign: 'center'
    },
    headerIconVw:{ 
      position: "absolute",
     right: 20, 
    flexDirection: 'row',
     alignItems: 'center'
   },
    imgVw: {
      // borderRadius: 15,
      // marginVertical: 5,
      // overflow: 'hidden'
    },
    imgItem: {
      height: 252,
      // resizeMode: 'contain',
      // justifyContent: 'center',
      // alignItems: 'center'
    },
    durationView: {
      flexDirection: 'row',
      marginVertical: 5,
      // marginHorizontal: 10,
      alignItems: 'center',
    },
    clockIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      tintColor: theme.SEARCH_TITLE
    },
    durationText: {
      fontSize: 14,
      color: theme.SUB_TITLE,
      marginLeft: 5,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    cancerVw: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:5
    },
    cancerType: {
      color: '#464646',
      // paddingHorizontal: 10,
      paddingVertical: 2,
      // backgroundColor: '#dff1ff',
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: "center",
      borderRadius: 2,
      overflow: 'hidden',
      marginLeft:10
    },
    title: {
      color: theme.GRAY_BLACK,
      fontSize: 22,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop:10
    },
    description: {
      color: theme.SUB_TITLE,
      marginVertical: 7,
      fontSize: 13,
      lineHeight: 22,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    playVw: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'center',
      marginHorizontal: 45,
      borderRadius: 20,
      height: 61,
      backgroundColor: theme.SECONDARY
    },
    playText: {
      marginLeft: 10,
      color: theme.PRIMARY,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    playIconVw:{
      borderRadius: 35,
      backgroundColor: 'rgba(58, 58, 58, 0.8)',
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'center',
      borderWidth: 3,
      borderColor: theme.PRIMARY
    },
    playIconImg:{
      width: 26, 
      height: 31, 
      resizeMode: 'contain', 
      tintColor: theme.PRIMARY 
    }
  });
};

export default Style;