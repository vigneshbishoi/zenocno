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
       backgroundColor: theme.PRIMARY
     },
    authorBasicDetail:{
      paddingHorizontal:20,
      paddingTop:5,
      paddingBottom:15,
    },
    eventNameTxt:{
      color:theme.BLACK,
      fontSize:20,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 15
    },
    eventCTypeTxt:{
      color:theme.GRAY_BLACK,
      fontSize:16,
      marginTop:Platform.OS === 'ios' ? -3 : -7,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    dateTimeContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:Platform.OS === 'ios' ? 11 : 6,
    },
    dateTimeText:{
      color:theme.SEARCH_TITLE,
      fontSize:14,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM
    },
    joinButtonVw:{
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:theme.SECONDARY,
      borderRadius:8,
      paddingHorizontal: Platform.OS === 'ios' ? 17 : 19,
      paddingVertical: Platform.OS === 'ios' ? 8 :5,
      position:'absolute',
      right: 0
    },
    joinText:{
      color:theme.PRIMARY,
      fontSize:13,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginTop:Platform.OS === 'android' ? 4: 0
    },
    calendarIconVw:{
      position:'absolute',
      right: Platform.OS === 'ios' ? 10 : 0,
      padding:5
    },
    authorImage:{
      width:widht,
      height:230,
      marginTop:5
    },
    descVw:{
      paddingHorizontal:20
    },
    descTitle:{
      fontSize:20,
      color:theme.BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginBottom: 10
    },
    descText:{
      fontSize:14,
      color:theme.SUB_TITLE,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    similareventsVw:{
      backgroundColor:theme.PRIMARY,
      marginBottom:20,
    },
    eventTypeTxt: {
      color: theme.SUB_TITLE,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal:15,
      marginTop: 15,
    },
    timeTexteventTypeTxtExtra: {
      color: theme.SUB_TITLE,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    timeText: {
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontWeight: '600',
      width:'100%'
    },
    directionRow: {
      flexDirection:'row', 
      alignItems:'center',
      marginHorizontal:15
    },
    dots: { 
      width: 3, 
      height: 3, 
      borderRadius: 3, 
      marginHorizontal: 3, 
      backgroundColor: theme.SUB_TITLE , 
      alignSelf:'center'
    },
    shareButton:{ 
      alignItems:'center', 
      justifyContent:'center',
      backgroundColor: theme.DARK_SILVER, 
      width: 46, 
      height: 33, 
      borderRadius: 6,
      marginTop: 6, 
    },
    joinButtonVwNew: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.SECONDARY,
      borderRadius: 6,
      marginTop: 6,
      width:'80%',
      height: 33
    },
    backView:{
      position: "absolute",
      left: 10,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.BLACK,
      borderRadius: 40,
      zIndex:2
    },
    innerIconView:{
      width: 40, 
      alignItems:'center', 
      justifyContent:'center',
      marginLeft: -5
    },
    viewAllTxt: {
      fontSize: 14,
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontWeight:'500',
      marginHorizontal: 15
    },
    line:{
      height:1,
      marginHorizontal: 15,
      marginVertical: 20, 
      backgroundColor: theme.TAB_BG 
    }
   });
 };
 
 export default Style;
 