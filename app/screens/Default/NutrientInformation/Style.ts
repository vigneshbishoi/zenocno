/**
 * NutrientInformation style
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 13:15:34 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SECONDARY_OPACITY
    },
    goBack: {
      height: 30,
      width: 30,
      borderRadius: 15,
      backgroundColor: '#5C6572',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:15,
      opacity: 0.7
    },
    foodName: {
      fontSize: 22,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.REGULAR,
      width: '75%',
      flex: 1,
      flexWrap: 'wrap'
    },
    
    foodItemText: {
      marginLeft: 10,
      marginTop: 10,
      fontSize: 16,
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.GRAY_BLACK
    },
    itemDesVw: {
      position: 'absolute',
      bottom: 15,
      left: 30,
      right:1
    },
    itemName: {
      color: theme.PRIMARY,
      fontSize: 24,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    itemSubVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'android' ? -5 : 0
    },
    itemDesText: {
      color: theme.PRIMARY,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 3
    },
    timerImg: {
      height: 17,
      width: 17,
      tintColor: theme.PRIMARY
    },
    tobBarLabelStyle:{ 
      fontSize: 14, 
      fontFamily: FONTFAMILY.POPPINS_MEDIUM 
    },
    foodItemVw: {
      borderRadius: 20,
      overflow: 'hidden',
      height: 210,
      width: 170,
      marginLeft: 10
    },
    similarWordVw: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    similarText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16
    },
    viewAllVw: {
      position: 'absolute',
      right: 30
    },
    viewAllText: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
    },
    foodImage: {
      height: '50%',
      width: '100%',
      backgroundColor:'pink'
    },
    likeImgVw:{
      backgroundColor:theme.PRIMARY,
      borderRadius:16,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center',
      position:'absolute',
      top:6,
      right:8
    },
    likeImg: {
      width: 17,
      height: 16,
      tintColor: 'red',
      margin: 7,
      resizeMode: 'contain'
    },
    bottomVw: {
      marginLeft: 20,
      marginRight: 10,
      marginVertical: Platform.OS === 'android' ? 5 : 8
    },
    foodTitleName: {
      color: '#333333',
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14
    },
    typeVw: {
      backgroundColor: theme.BLACK,
      opacity: 0.8,
      paddingHorizontal: 15,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      position: 'absolute',
      top: 13
    },
    itemSubVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'android' ? 2 : 7,
    },
    foodTime: {
      color: '#666666',
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 3
    },
    tagtypeText: {
      color: theme.PRIMARY,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    rateText: {
      color: theme.PRIMARY,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    rateImg: {
      height: 13,
      width: 13,
      tintColor: theme.PRIMARY,
      marginLeft: 2
    },
    rateVw: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#00C49A',
      position: 'absolute',
      right: 0,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    tagVw: {
      backgroundColor: '#BDFFF2',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginHorizontal: 2,
      marginBottom: Platform.OS === 'android' ? 5 : -10,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tagText: {
      color: '#333333',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 11
    },
    similarFoodContainer:{ 
      backgroundColor: 'aliceblue', 
      height: 300, 
      marginTop: 0 
    }
  });
};

export default Style;
