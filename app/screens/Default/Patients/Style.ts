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
      backgroundColor: theme.SELECTED
    },
    subContainer: {
      flex: 1,
      backgroundColor: theme.SELECTED,
      marginTop: 15
    },
    patientsItemContainer: {
      borderRadius: 15,
      marginVertical: 7,
      backgroundColor: theme.PRIMARY,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    imagePatients: {
      width: 87,
      height: 87,
      borderRadius: 15,
      margin: 3
    },
    contactDetail: {
      flex: 1,
      marginLeft: 5,
      marginRight: 8
    },
    buttonContainer: {
      width: '35%',
      position: 'absolute',
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    commonText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    inviteButtonVw: {
      backgroundColor: theme.SECONDARY,
      borderRadius: 10,
      height: 51,
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      marginVertical: Platform.OS === 'ios' ? 10 :8,

    },
    commonModalText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    orText: {
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    commonTwoText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '85%'
    },
    messageButtonVw: {
      backgroundColor: theme.SECONDARY,
      borderRadius: 5,
      paddingVertical: Platform.OS === 'ios' ? 7 : 6,
      paddingHorizontal: 3,
      position: 'absolute',
      right: 0
    },
    notificationVw: {
      backgroundColor: '#ff0126',
      borderRadius: 13,
      width: 26,
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 8,
      top: 8
    },
    messageText: {
      color: theme.PRIMARY,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginHorizontal: 5,
      marginTop: Platform.OS === 'ios' ? 0 : 1.5
    },
    numberofnotificationText: {
      color: theme.PRIMARY,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: Platform.OS === 'ios' ? 0 : 3
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeVw: {
      position: 'absolute',
      right: 0,
      padding: 10,
      top: 0
    },
    deleteModalVw: {
      width: width - 40,
      borderRadius: 10,
      backgroundColor: theme.SELECTED,
      padding: 25,
      alignItems: 'center'
    },
    qrStyle: {
      marginBottom: Platform.OS === 'ios' ? 5 : 3,
      marginTop: Platform.OS === 'ios' ? 10 : 5,
      width:230, height:230
    },
    line: {
      height: 1,
      backgroundColor: theme.BORDER_COLOR,
      width: '100%',
    },
    orContainer:{ 
      width: '100%', 
      marginTop: Platform.OS === 'ios' ? 22 :18, 
      marginBottom: Platform.OS === 'ios' ? 7 :5, 
      alignItems: 'center' 
  },
    roundOR: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: '#d8d8d8',
      backgroundColor: theme.PRIMARY,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -18
    },
    inputContainer: {
      elevation: 10,
      borderRadius: 10,
      overflow: 'hidden'
    },
    inputIOSContainer: {
      elevation: 10,
    },
    dropShadow: {
      shadowColor: 'grey',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
    },
    inputBox: {
      width: '100%',
      height: 51,
      backgroundColor: theme.PRIMARY,
      alignSelf: 'center'
    },
    inputIOSBox: {
      width: '100%',
      height: 51,
      alignSelf: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: theme.PRIMARY
    },
    modalInputText: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    extrastyle: {
      height: 51,
      elevation:10,
      marginVertical: Platform.OS === 'ios' ? 10 :8,
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      width: '100%',
      justifyContent:'center',
      // paddingTop: Platform.OS === 'ios' ? 0 :5,
      paddingHorizontal: 15
    },
    errorStyle:{
      borderColor:'red',
       borderWidth:1
    },
    noActivityText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
    },
    emptyVw: {
      height: height - 150,
      justifyContent: 'center'
    },
    searchVw: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
      marginHorizontal: 25,
      marginVertical: 15,
      borderRadius: 13,
      paddingVertical: Platform.OS === 'ios' ? 13 : -5,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    searchText: {
      marginRight: 50,
      fontSize:14,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      width:'80%'
    },
    counterVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20, 
      justifyContent:"space-between"
    },
    buttonVw: {
      borderRadius: 10,
      width:165, 
      height:40,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    buttonTxt: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12
    },
  });
};

export default Style;