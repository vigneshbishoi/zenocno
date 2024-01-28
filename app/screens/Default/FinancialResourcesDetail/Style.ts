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
     resourceBasicVw:{
      paddingHorizontal:20,
      paddingVertical:15,
      backgroundColor: theme.SELECTED
     },
     nameLocationTitle: {
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_MEDIUM,
       fontSize: 14,
       marginHorizontal: 20,
       marginTop: 5
     },
     rnameText: {
       color: theme.BLACK,
       fontSize: 18,
       fontFamily: FONTFAMILY.POPPINS_MEDIUM,
       marginHorizontal: 20,
       paddingTop: 5,
       paddingBottom: 10
     },
     locationInnerVw: {
       flexDirection: 'row',
       alignItems: 'center',
       marginTop: Platform.OS === 'ios' ? 6 : 2
     },
     rlocationText: {
       fontSize: 14,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_REGULAR,
       marginLeft: 8,
       marginTop:Platform.OS === 'ios' ?0 :3
     },
     contactDetailTitle:{
      color: theme.BLACK,
      fontSize: 14,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginTop:Platform.OS === 'ios' ? 20 :18
     },
     contactItem:{
      flexDirection:'row',
      marginTop: Platform.OS === 'ios' ? 10 :5,
     },
     contactItemTitleText:{
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      width:'23%'
     },
     contactItemInfoText:{
      color: theme.BLACK,
      fontSize: 14,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      width:'80%'
     },
     resourceDetailVw:{
      backgroundColor:theme.PRIMARY,
      paddingHorizontal:20,
      paddingVertical:15,
      flex:1
     },
     detailText:{
      color:theme.BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      fontSize:14,
      lineHeight:25
     },
      remarkVw:{
      borderRadius:13,
      backgroundColor:'#fafbf5',
      padding:15,
      marginTop:25,
      borderWidth: 1,
      borderColor: theme.LIGHT_GRAY,
      marginBottom: 20
     },
     remarkText:{
      fontSize:14,
      color:theme.BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginBottom: Platform.OS === 'ios' ? 6 : 2
     },
     remarkDetailText:{
      color:theme.BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      fontSize:12,
     },
   });
 };
 
 export default Style;
 