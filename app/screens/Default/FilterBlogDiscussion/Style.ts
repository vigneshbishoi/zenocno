/**
 * FilterBlogDiscussion Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Filters
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
    itemName: {
      overflow:"hidden",
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 15,
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.MEDIUM,
  },
  modalMainView: {
      flex: 1, 
      backgroundColor:"white", 
      marginTop: 0
  },
  headerView: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center' 
  },
  
  closeView: { 
      position: 'absolute', 
      right: 30, 
  },
  mapMainView: { 
      flexWrap: 'wrap', 
      flexDirection: 'row', 
      marginHorizontal:20,
      marginTop:20, 
  },
  selectName: {
      color: theme.PRIMARY,
      backgroundColor: 'dodgerblue',
  },
  unSelectName: {
      color: theme.BLACK,
      backgroundColor: 'aliceblue',
      borderRadius: 10,
  },
  btnView: { 
      margin: 5, 
      marginBottom:Platform.OS === 'ios' ? 25 : 15 
  },
  btnTxt: {  
      overflow: "hidden", 
      marginHorizontal: 30, 
      marginTop: 20, 
      textAlign: 'center', 
      borderRadius: 15, 
      paddingHorizontal: 25, 
      paddingVertical: 18, 
      backgroundColor: theme.SECONDARY,
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.MEDIUM, 
  },
  
   });
 };
 
 export default Style;
 