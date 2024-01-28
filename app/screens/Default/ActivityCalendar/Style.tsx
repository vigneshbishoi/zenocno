 import { StyleSheet, Dimensions, Platform } from 'react-native';
 const height = Dimensions.get('window').height;
 const width = Dimensions.get('window').width;
 import { FONTFAMILY } from "../../../config/font-config";
 import { isIphoneX } from 'react-native-iphone-x-helper'
 
 /**
  * style
  */
 const Style = (theme: any) => {
   return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    bgImage:{
      width:width,
      height:height,
      resizeMode:'contain'
    },
    
    calendarVw:{
    backgroundColor:theme.PRIMARY,
    borderRadius:15,
    marginHorizontal:30,
    paddingHorizontal:20,
    paddingVertical:20,
    marginTop:40,
    overflow:'hidden',
    },
    
    calHeaderDateText:{
      color:theme.GRAY_BLACK,
      fontSize:16,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginTop:Platform.OS === 'ios'?0:4
    }
   });
 };
 
 export default Style;