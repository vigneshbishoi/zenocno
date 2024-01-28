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
       paddingVertical: Platform.OS === 'ios' ? 12 : -9,
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
     itemContainer: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 0
  },
  dropshadow: {
      borderRadius: 10,
      marginVertical: 8,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
  },
    dividerLine: {
      backgroundColor: theme.LIGHT_GREY,
      height:2,
      width:'100%',
      marginTop:5,
    },
    
   });
 };
 
 export default Style;
 