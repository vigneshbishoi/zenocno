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
    newsTitleTxt:{
      color:theme.BLACK,
      fontSize:22,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      marginRight:10
    },
    authorImage:{
      width:'100%',
      height:250,
      resizeMode:'cover'
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
    descText:{
      fontSize:13,
      color:theme.BLACK,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      marginRight:10,
      marginTop:Platform.OS === 'ios' ? 10 : 7,
      lineHeight:23
    },
    dateTimeText: {
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop:Platform.OS === 'ios' ? 15 : 13
  },
    expressText: {
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
  },
  creditsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
    backgroundColor:theme.SELECTED,
    paddingHorizontal:50
  },
  creditLinkText:{
    fontSize:14,
    color:theme.SUB_TITLE,
    fontFamily:FONTFAMILY.POPPINS_REGULAR
  },
  semiItemView:{
    flexDirection:"row" ,
    justifyContent:'space-between' , 
    alignItems:"center"
  },
  semiItemExtraView:{
    flexDirection:"row" ,justifyContent:'space-between' , alignItems:"center"
  },
  shareButton:{flexDirection:'row', padding:8}
   });
 };
 
 export default Style;
 