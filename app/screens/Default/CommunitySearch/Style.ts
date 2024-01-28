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
       backgroundColor: theme.SELECTED
     },     
    separatorView: {
      height:6, 
      backgroundColor:theme.TAB_BG, 
      marginTop:10
    },
    noActivityText:{
      fontSize:13,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
     },
     emptyVw:{
      height: height - 100,
      width: widht,
      justifyContent:'center',
      alignItems: 'center'
     },
   });
 };
 
 export default Style;