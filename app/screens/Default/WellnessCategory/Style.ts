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
       backgroundColor:theme.PRIMARY
     },
     bgImg: {
       width: widht,
       height: height,
       resizeMode: 'contain'
     },
     headerVw: {
       flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
       height: 50,
 
     },
     headerTxt: {
       fontSize: 16,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_REGULAR,
     },
     searchText: {
       marginRight: 50,
       fontSize:14,
       fontFamily:FONTFAMILY.POPPINS_REGULAR,
       width:'80%'
     },
     topicContainer: {
       marginRight: 10,
       backgroundColor:'pink'
     },
     topicItem: {
 
       marginRight: 10,
       paddingHorizontal: 20,
       backgroundColor: theme.PRIMARY,
       flexDirection: 'row',
       alignItems: 'center',
       borderRadius: 13,
       height: 42,
       elevation: Platform.OS === 'ios' ? 0 : 5,
       shadowColor: 'grey',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
     },
     topicIcon: {
       width: 15,
       height: 15,
       resizeMode: 'contain',
     },
     topicTitle: {
       paddingLeft: 5,
       fontSize: 14,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_REGULAR,
     },
     selected: {
       backgroundColor: theme.SECONDARY
     },
     noActivityText:{
      fontSize:13,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
     },
     emptyVw:{
      flex: 1,
      justifyContent:'center'
     },
     footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
   });
 };
 
 export default Style;
 