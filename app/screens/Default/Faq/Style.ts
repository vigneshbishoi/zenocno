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
      resizeMode: 'contain',
    },
    title: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 30,
      marginHorizontal: 20,
      color: theme.GRAY_BLACK,
      textAlign: 'left',
    },
    extraTitle: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
      color: theme.BLACK,
    },
    sectionVw: {
      backgroundColor: theme.PRIMARY,
      paddingVertical: 25,
      paddingHorizontal: 20,
      marginVertical: 10,
      borderRadius: 13,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: 'rgba(145,145,145,0.1607843137254902 )',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 8
    },
    header: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.PAGINATION_SELECCT,
      textAlign: 'left',
      marginRight: 20
    },
    icon: {
      width: 15,
      height: 8,
      resizeMode: 'contain',
      position: 'absolute',
      right: 20
    },
    itemVw: {
      backgroundColor: theme.PRIMARY,
      paddingVertical: 25,
      borderBottomWidth:1,
      borderColor: '#e5e5e5'
    },
    itemText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      textAlign: 'left',
      marginTop: 10,
      paddingHorizontal: 20
    },
    searchIcon: {
      width:36, 
      height:36, 
      borderRadius: 36, 
      justifyContent:'center',
      backgroundColor: theme.DARK_SILVER , 
      alignItems:'center',
    },
    noActivityText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
      marginTop: 10
    },
    emptyVw: {
      flex:1,
      justifyContent: 'center'
    },
  });
};

export default Style;