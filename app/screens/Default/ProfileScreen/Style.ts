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
    moreImg: {
      height: 18,
      width: 18,
    },
    headerVw: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20
    },
    backVw: {
      position: 'absolute',
      left: -8,
      padding: 8
    },
    notificationText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: '#333333',
      fontSize: 16,
    },
    markTextVw: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 5
    },
    closeImg: {
      width: 16,
      height: 21,
    },
    menuContainer: {
      // borderRadius: 10,
      // backgroundColor: theme.PRIMARY,
      // justifyContent: 'center',
      // alignItems:'center',
      // borderWidth: 1,
      // borderColor: '#dcd8d8',
      // width: 80,
      // height:35, 
      // top: 50,
      // position: 'absolute',
      // right: 20
      position: 'absolute',
      right: 0,
      // top: 7,
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
    userProfileVw: {
      flexDirection: 'row',
      marginTop: 15,
      marginBottom: 8,
      paddingHorizontal: 25
    },
    userImg: {
      width: 81,
      height: 81,
      borderRadius: 20,
      overflow: 'hidden'
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
      fontSize: 13,
    },
    counterVw: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14
    },
    line:{ 
      width: 1, 
      height: 12, 
      backgroundColor: theme.GRAY_BLACK, 
      marginHorizontal: 10 
    },
    countDes: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 13
    },
    buttonVw: {
      borderRadius: 10,
      backgroundColor: theme.SECONDARY,
      height: 33,
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
      paddingHorizontal: 25,
      marginTop: 15,
      marginBottom: 10
    },
    detailTxt: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
      paddingHorizontal: 25
    },
    totalPostView: {
      backgroundColor: '#eef7ff',
      alignItems: 'center',
      borderBottomColor: theme.SECONDARY,
      borderBottomWidth: 2,
      paddingVertical: Platform.OS === 'ios' ? 15 : 12
    },
    totalPost: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SECONDARY
    },
    readHS: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SECONDARY,
      marginBottom: 12,
      paddingHorizontal: 25
    },
    reasonModalContainer: {
      justifyContent: 'center',
      alignItems: 'center'
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
    activityIndicator: {
      height: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pictureModalContainer: {
      marginTop: height * 0.75,
      width: '100%',
      alignSelf: 'center',
      marginBottom: -10,
      backgroundColor: theme.PRIMARY,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    itemView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15
    },
    cameraGalleryImage: {
      width: 20,
      height: 20
    },
    cameraGalleryText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 8
    }
  });
};

export default Style;
