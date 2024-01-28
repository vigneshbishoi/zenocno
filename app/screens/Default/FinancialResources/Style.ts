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
    bgImg: {
      width: widht,
      height: height,
      resizeMode: 'contain'
    },
    
    searchVw: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.SELECTED,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 11,
      paddingVertical: Platform.OS === 'ios' ? 13 : 0,
      //  elevation: Platform.OS === 'ios' ? 0 : 5,
      //  shadowColor: 'grey',
      //  shadowOffset: {
      //    width: 0,
      //    height: 2,
      //  },
      //  shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    searchText: {
      marginRight: 50,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      width: '80%',
      marginTop: Platform.OS === 'ios' ? 0 : 5,
    },
    nameLocationTitle: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
      marginHorizontal: 20,
      marginTop: 5
    },
    resourceItemContainer: {
      flexDirection: 'row',
      // borderBottomWidth: 1,
      // borderBottomColor: '#efefef'
    },
    descVw: {
      paddingVertical: 15,
      width: '93%',
      paddingLeft: 20,
      paddingRight: 40
    },
    borderStyle: {
      // borderTopWidth: 1,
      // borderTopColor: '#efefef'
    },
    rnameText: {
      color: theme.BLACK,
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    locationInnerVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 5 : 2,
      marginLeft: 2
    },
    rlocationText: {
      fontSize: 13,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginLeft: 5
    },
    searchIcon: {
      width:36, 
      height:36, 
      borderRadius: 36, 
      justifyContent:'center',
      backgroundColor: theme.DARK_SILVER , 
      alignItems:'center',
    }
  });
};

export default Style;
