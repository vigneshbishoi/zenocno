/**
 * Cart Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Cart 
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
    container:{
      flex: 1,
       backgroundColor: theme.SELECTED
      },
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 50,
  },
  headerTxt: {
    fontSize: 18,
    color: theme.GRAY_BLACK,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
  },
  checkoutContainer: {
    paddingHorizontal: 30,
    backgroundColor: theme.PRIMARY,
    paddingVertical: Platform.OS === 'ios' ? 15 :12
  },
  priseContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 8 : 5,
  }, 
  emptyCartContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent:'center',
    // marginTop:-50,
  },
  emptyCartView: {
    backgroundColor:'white',
    width:200,
    height:200,
    borderRadius:120,
    alignItems:'center',
    justifyContent:'center'
  },
  totalCountItems: {
    fontSize: 13,
    color: theme.GRAY_BLACK,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
  },
  totalPrise: {
    position: 'absolute',
    right:0,
    color: theme.BLACK,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 16,
  },
  totalPrice: {
    color: theme.BLACK,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 16,
  },
  totalRupeePrise: {
    position: 'absolute',
    right:0,
    color: theme.BLACK,
    fontSize: 16,
  },
  checkoutButton: {
    borderRadius: 10,
    backgroundColor: theme.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    marginVertical: Platform.OS === 'ios' ? 30 :25,
    marginHorizontal:30
  },
  checkoutText: {
    color: theme.PRIMARY,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 16,
  }
 
   });
 };
 
 export default Style;
 