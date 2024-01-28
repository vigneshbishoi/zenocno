/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
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
    container: {
      flex: 1,
      backgroundColor:theme.SELECTED
    },
    userNameDesVw: {
      marginLeft: 8,
      justifyContent: 'space-between',
      width: widht - widht * 0.30
    },
    userNameText: {
      color: '#000',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 18,
    },
    subText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
      marginTop: Platform.OS === 'ios' ? -2 : -5
    },
    editProfileText: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    listText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 10
    },
    pressStyle: {
      marginTop: 20
    },
    notiCountView: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 2,
      backgroundColor: '#f88e3e',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    bottomItemView: {
      marginHorizontal: 40,
      justifyContent: 'flex-start',
      marginBottom: 20
    },
    seprator: {
      height: 1,
      backgroundColor: theme.VERY_LIGHT_GRAY,
      marginHorizontal: 30,
      marginVertical: 30
    },
    typesMainVw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      borderBottomColor: theme.VERY_LIGHT_GRAY,
      borderBottomWidth: 1,
      paddingVertical: 13
    },
    imgBg: {
      backgroundColor: '#f0f5fe',
      padding: 5,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    img: {
      resizeMode: 'contain',
      width: 23,
      height: 23,
      tintColor: theme.ICON_SIDEBAR
    },
    editVw: {
      height: 50,
      borderRadius: 15,
      backgroundColor: '#f0f5fe',
      marginVertical: Platform.OS === 'ios' ? 15 : 8,
      marginHorizontal: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgProfile: {
      width: 60,
      height: 55,
      borderRadius: 10,
      overflow: 'hidden',
      resizeMode: 'cover'
    },
    headerVw: {
      flexDirection: 'row',
      backgroundColor: theme.PRIMARY,
      alignItems: 'center',
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 13,
      marginTop: 5,
      marginHorizontal: 10
    },
    optionVw: {
      borderRadius: 15,
      marginHorizontal: 10,
      backgroundColor: theme.PRIMARY,
      marginTop: 15
    },
    closeVw: {
      width: 21,
      height: 21,
    },
    rightIcon: {
      resizeMode: 'contain',
      width: 8,
      height: 17,
      tintColor: theme.BLACK
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
