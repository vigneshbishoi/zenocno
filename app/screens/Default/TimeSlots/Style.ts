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
     doctorInfoVw:{
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:20,
      paddingTop: Platform.OS === 'ios' ? 25 : 20
     },
     doctorImage:{
      width:58,
      height:58,
      borderRadius:10
     },
     doctorTextInfo:{
      marginHorizontal:8,
      width:'82%'
     }, 
     commonText:{
      fontSize:15,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      color:theme.GRAY_BLACK
    },
    expertizationText:{
      fontSize:13,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      color:theme.GRAY_BLACK,
      marginTop:Platform.OS === 'ios' ?0 : -3
    },
     subContainer: {
       flex: 1,
       backgroundColor: theme.SELECTED,
       marginTop: 15,
     },
     availableDateVw:{
       backgroundColor:theme.PRIMARY,
       borderRadius:8,
       borderWidth:1,
       borderColor:'#d1e1f1',
       width:width*0.28,
       height:46,
       alignItems:'center',
       justifyContent:'center',
       margin:5
     },
     commonItemText:{
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      fontSize:12,
      color:theme.GRAY_BLACK
     },
     bookAppButtonVw: {
      backgroundColor: theme.SECONDARY,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 15 : 13,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginVertical: 23
    },
    bookAppText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 16
    },
   });
 };
 
 export default Style;