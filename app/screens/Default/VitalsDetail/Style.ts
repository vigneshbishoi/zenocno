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
     subContainer: {
       flex: 1,
       backgroundColor: theme.SELECTED,
       marginTop: 15,
       paddingHorizontal:20
     },
     headerTitleText:{
       color:theme.GRAY_BLACK,
       fontSize:14,
       fontFamily:FONTFAMILY.POPPINS_MEDIUM
     },
     feverRangeVw:{
       backgroundColor:theme.PRIMARY,
       borderRadius:15,
       paddingHorizontal:20,
       paddingVertical:10
     },
     feverDescriptionVw:{
       flexDirection:'row',
       alignItems:'center'
     },
     feverImgVw:{
       backgroundColor:theme.SECONDARY_OPACITY,
       width:54,
       height:54,
       borderRadius:27,
       alignItems:'center',
       justifyContent:'center'
     },
     feverDes:{
       marginLeft:8
     },
     vitalName:{
       fontSize:20,
       fontFamily:FONTFAMILY.POPPINS_MEDIUM,
       color:theme.GRAY_BLACK
     },
     vitalRangeName:{
       fontSize:12,
       fontFamily:FONTFAMILY.POPPINS_REGULAR,
       color:theme.SUB_TITLE,
       marginTop: Platform.OS === 'ios' ? -2 :-7
     },
     seeAllContainer:{
       position:'absolute',
       right:0
     },
     seeAllText:{
       color:theme.SECONDARY,
       fontSize:13,
       fontFamily:FONTFAMILY.POPPINS_REGULAR
     },    
   });
 };
 
 export default Style;