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
     subContainer: {
       flex: 1,
       backgroundColor: theme.SELECTED,
       marginTop: 15
     },
    contactsItemContainer:{
      paddingHorizontal:20,
      paddingVertical: Platform.OS === 'ios' ? 20 : 17,
      backgroundColor:'#f2f3f5',
      flexDirection:'row',
      alignItems:'center',
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: Platform.OS === 'ios' ?'#E0E0E0' :'grey',
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 5,
      marginBottom:7,
    },
    contactDetail:{
      width:'65%'
    },
    buttonContainer:{
      width:'35%',
      position:'absolute',
      right:0,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end'
    },
    commonText:{
      color:theme.SUB_TITLE,
      fontSize:14,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    commonTwoText:{
      color:theme.GRAY_BLACK,
      fontSize:16,
      marginLeft:3,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM
    }
   });
 };
 
 export default Style;