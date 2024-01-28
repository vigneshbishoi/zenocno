/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

 import { StyleSheet, Dimensions } from 'react-native';
 const height = Dimensions.get('window').height;
 const widht = Dimensions.get('window').width;
 import { FONTFAMILY } from "../../../config/font-config";
 
 /**
  * style
  */
 const Style = (theme: any) => {
   return StyleSheet.create({
    container:{
        alignItems:'center'
      },
      checkImg:{
        width:73,
        height:73,
        resizeMode:'contain',
        marginBottom: 10,
      },
      textSignup:{
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        fontSize: 40,
        color: theme.GRAY_BLACK,
        paddingVertical:10,
        textAlign:'center',
      },
      desText:{
        marginHorizontal:80,
        textAlign:'center',
        color: theme.GRAY_BLACK,
        fontSize: 14,
        marginTop: 10,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        lineHeight: 20,
      }
   });
 };
 
 export default Style;
 