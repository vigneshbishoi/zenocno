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
       backgroundColor: theme.PRIMARY
     },
     headerVw: {
       flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
       height: 60
     },
     backVw: {
       position: "absolute",
       left: 0,
       width: 50,
       height: 50,
       alignItems: 'center',
       justifyContent: 'center'
     },
     headerTxt: {
       fontSize: 16,
       textAlign: 'center',
       color: '#ff4040',
       fontFamily: FONTFAMILY.POPPINS_MEDIUM,
     },
     commonText: {
       textAlign: 'center',
       fontSize: 12,
       color: theme.SUB_TITLE,
       fontFamily: FONTFAMILY.POPPINS_MEDIUM,
     },
     doctorInfovw: {
       paddingHorizontal: 20,
       paddingTop: 15,
       flexDirection: 'row',
       paddingBottom: 10
     },
     doctorImage: {
       width: 58,
       height: 58,
       borderRadius: 10
     },
     doctorInfo: {
       marginLeft: 8,
       width: '85%'
     },
     doctorName: {
       fontSize: 15,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_MEDIUM
     },
     desText: {
       fontSize: 12,
       color: theme.SUB_TITLE,
       fontFamily: FONTFAMILY.POPPINS_REGULAR
     },
     extraTextStyle: {
       fontSize: 16,
       paddingHorizontal: 20,
       paddingVertical: 10
     },
     expertizationText: {
       fontSize: 13,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_REGULAR
     },
     zenOncoText: {
       color: theme.SECONDARY,
       width: Platform.OS === 'ios' ? isIphoneX() ? "21%" : "23%" : '22%',
       marginLeft: 5
     },
     bottomLine: {
       height: 7,
       backgroundColor: theme.SELECTED
     },
     desContainer: {
       padding: 20
     },
     fdView: {
       flexDirection: 'row',
       alignItems: 'center',
       marginTop: Platform.OS === 'ios' ? 15 : 10
     },
     extraTitleText:{
       fontSize: 18,
        width:'90%',
        marginTop: Platform.OS === 'ios' ? 22 : 16
       },
     promiseContainer: {
       borderRadius: 20,
       borderWidth: 1,
       borderColor: theme.SECONDARY,
       marginVertical: Platform.OS === 'ios' ? 22 : 17,
       marginHorizontal:5
     },
     promiseVw: {
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: theme.SECONDARY_OPACITY,
       paddingHorizontal: 15,
       paddingVertical: Platform.OS === 'ios' ? 18 : 13,
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20
     },
     extraPromiseText: {
       fontSize: 18,
       marginHorizontal: 10,
       color: theme.SECONDARY
     },
     promiseTopicVw:{
       flexDirection: 'row',
       marginTop: Platform.OS === 'ios' ? 15 : 13,
       marginHorizontal:20
     },
     bookAgainButtonVw:{
      borderRadius:10,
      backgroundColor:theme.SECONDARY,
      alignItems:'center',
      paddingVertical:Platform.OS === 'ios' ? 15 :12,
      marginHorizontal:20,
    },
    bookAgainText:{
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    cancelAppointmentContainer: {
      // flexDirection: 'row',
      // alignItems: 'center',
      backgroundColor: '#FFE9EC',
      paddingLeft: 25,
      paddingTop: 14,
      paddingBottom: 14,
      borderRadius:8, 
      marginHorizontal:20
    },
    bookedForText: {
      color: theme.GRAY_BLACK,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 24,
      marginLeft: 6.3,
    },
    appointmentCancelText: {
      color: theme.SECONDARY_RED,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 30,
      marginLeft: 5.3,
    },
    appointmentCancelSubText: {
      color: theme.BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      lineHeight: 20,
    },
   });
 };
 
 export default Style;
 