/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */

import { StyleSheet, Dimensions , Platform} from 'react-native';
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
      backgroundColor: theme.PRIMARY
    },
    userProfileVw: {
      flexDirection: 'row',
      alignItems:'center',
      width:'85%'
    },
    userImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: theme.BLACK,
      borderWidth:1,
      //overflow: 'hidden'
    },
    userDesVw: {
      alignSelf: 'flex-start',
      marginLeft: 15,
    },
    userName: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    userDesTxt: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 11,
    },
    counterVw: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 13
    },
    countDes: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 13
    },
    buttonVw: {
      borderRadius: 13,
      backgroundColor: theme.SECONDARY,
      height:37,
      width: 96,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonTxt: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12
    },
    aboutNm: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 12,
    },
    detailTxt: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
      marginRight:30
    },
    readHS: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SECONDARY,
      marginTop: 8
    },
    menuContainer: {
      flexDirection:'row', 
      alignItems:'center', 
      position:'absolute', 
      right:0
    },
    menuPlaceholderImgVw: {
      marginTop: -15,
      width: 35,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuStyle: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#dcd8d8',
      width: 132,
      height: 80,
      marginTop: 23
    },
    menuPlaceholderImg: {
      height: 35,
      width: 15,
      resizeMode: 'contain'
    },
    reasonModalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height:'100%',
      width:'100%'
    },
    reasonModalVw: {
      width: 335,
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      padding: 15
    },
    modalTitleText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
      marginTop: 15
    },
    deactivateText: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginLeft: 5,
      paddingRight: 15
    },
    deletionInputVw: {
      height: 69,
      borderRadius: 4,
      backgroundColor: theme.PRIMARY,
      borderWidth: 1,
      borderColor: '#ebebeb',
      paddingHorizontal: 10,
      marginVertical: 15
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
    okText: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    okView: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: 10,
      alignSelf: 'flex-end',
      paddingVertical: 10,
      paddingHorizontal: 10
    },
  });
};

export default Style;
