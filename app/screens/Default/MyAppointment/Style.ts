/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

 import { underline } from 'colors';
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
     addButtonVw: {
       position: "absolute",
       right: 20
     },
     searchVw: {
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: theme.PRIMARY,
       marginHorizontal: 20,
       marginVertical: 15,
       borderRadius: 13,
       paddingVertical: Platform.OS === 'ios' ? 13 : -5,
       elevation: Platform.OS === 'ios' ? 0 : 5,
       shadowColor: 'grey',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
     },
     searchText: {
       marginRight: 50,
       fontSize: 14,
       fontFamily: FONTFAMILY.POPPINS_REGULAR,
       width: '80%',
       marginTop: Platform.OS === 'ios' ? 0 : 5
     },
     noActivityText: {
       fontSize: 13,
       color: theme.GRAY_BLACK,
       fontFamily: FONTFAMILY.POPPINS_MEDIUM,
       textAlign: 'center',
     },
     emptyVw: {
       flex: 1,
       justifyContent: 'center'
     },
     appointmentContainer:{
      borderRadius:10,
      backgroundColor:theme.PRIMARY,
      flexDirection:'row',
      marginHorizontal:20,
      marginVertical:5
     },
     expertView: {
      backgroundColor: theme.PRIMARY,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      position: 'absolute',
      right: Platform.OS === 'ios' ? 1 : 1.5,
      top: 1,
      padding: 4
  },
     patientImage:{
      width:94,
      height:94,
      borderRadius:10,
      margin:5,
      overflow:'hidden'
     },
     doctorName:{
      fontSize:14,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginTop:Platform.OS === 'ios' ? 13 :3
     },
     expertizationText:{
      fontSize:12,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
     },
     timeContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:Platform.OS === 'ios' ? 13 :10
     },
     messageContainer:{
      flexDirection:'row',
      alignItems:'flex-end',
      marginTop:Platform.OS === 'ios' ?0 :4
     },
     joinButtonVw:{
      backgroundColor:theme.SECONDARY,
      borderRadius:7,
      paddingHorizontal:15,
      paddingVertical:Platform.OS === 'ios' ? 6 :3,
      position:'absolute',
      right:10
     },
     joinText:{
      fontSize:10,
      color:theme.PRIMARY,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      marginTop:Platform.OS === 'ios' ? 0 :3
     },
     seeMoreLessTxt: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
      marginVertical:5,
      textDecorationLine:1
  },
   });
 };
 
 export default Style;
 