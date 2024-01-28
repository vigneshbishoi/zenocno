/**
 * AntiCancerDietPlan style
 * @Author: Anand R
 * @Date: Tue Dec 21 2021 14:29:30 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },
    headerText: { fontSize: 18, fontFamily: FONTFAMILY.POPPINS_MEDIUM, textAlignVertical: 'center', color: theme.GRAY_BLACK, marginLeft: 10, marginTop: -5 },
    selectDateContainer: {
      flexDirection: 'row',
      fontSize: 16,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginVertical: 20,
      alignItems: 'center',
    },
    headerVw:{
       flexDirection: 'row',
        marginHorizontal: 10,
         width: width 
  },
  monthNameTextVw:{ 
    alignItems:'center',
    width:"83%"
},
    foodContainer: {
      // width:widht,
      // shadowOffset: { width: 3, height: 4 },
      // shadowColor: '#BDBDBD',
      // shadowOpacity: 0.35,
      flexDirection: 'row',
      marginHorizontal: 10,
      marginTop: 20,
      borderRadius: 10,
      // borderWidth: 1, 
      padding: 15,
      // borderColor: '#BDBDBD', 
    },
    optionText: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlignVertical: 'center',
      color: theme.GRAY_BLACK,
      marginLeft: 10
    },
    optionView: {
      width: '42%',
      alignItems: 'center',
      justifyContent: 'center',
      //borderWidth:1, 
      paddingVertical: 10,
      borderRadius: 12,
      //borderColor:'#d4d4d4',
      backgroundColor: theme.PRIMARY,
      flexDirection: 'row',
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    monthText: {
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      marginHorizontal: 8
    },
    titleText: {
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlignVertical: 'center',
      color: theme.GRAY_BLACK,
      marginTop: 10
    },
  });
};

export default Style;
