/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
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
    userProfileVw: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: theme.BLACK,
      borderWidth: 1,
      //overflow: 'hidden'
    },
    commonTextVw: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
      alignSelf:'center',
      backgroundColor: theme.PRIMARY,
      //paddingHorizontal: 15,
      margin: 10,
      elevation: 3,
      width:'90%'
    },
    commonDropVw: {
      //flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
      alignSelf:'center',
      backgroundColor: theme.PRIMARY,
     // paddingHorizontal: 15,
      marginVertical: 10,
      elevation: 3,
      width:'90%'
    },
    userName: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    btnView: {
      borderRadius: 10,
      backgroundColor: theme.SECONDARY,
      height: 50,
      marginTop: 20,
      width: '90%',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: Platform.OS === 'ios' ? 25 : 15
    },
    btnTxt: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    dropdown: {
     // margin: 16,
      height: 50,
      borderWidth: 1,
      borderColor:theme.PRIMARY,
     // borderBottomColor: 'gray',
     // borderBottomWidth: 0.5,
    //  backgroundColor:'red',
      width: '100%',
      padding: 10,
      borderRadius:10,
    },
    dropdownText: {
     // margin: 16,
      height: 50,
      borderWidth: 1,
      borderColor: theme.PRIMARY,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
     // borderBottomColor: 'gray',
     // borderBottomWidth: 0.5,
    //  backgroundColor:'red',
      width: '100%',
      paddingVertical: 10,
      paddingStart: 10,
      paddingEnd: 30,
      borderRadius:10,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 14,
      color: 'rgba(102,102,102,0.5)',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
     // height: 40,
      //width:"80%",
     // borderColor:'red',
      fontSize: 14,
      textAlignVertical:'center',
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    item: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    textSelectedStyle: {
      marginRight: 0,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    searchVw: {
      flexDirection: 'row',
      alignItems: 'center',
      margin:10 ,
      paddingHorizontal:10,
      //backgroundColor: theme.SELECTED,
      borderRadius: 10,
      borderWidth:1,
      borderColor:'#A2A2A2'
    },
    searchInput: {
      width: '100%',
      paddingHorizontal: 8,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
    },
    extraInputStyle: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
  });
};

export default Style;
