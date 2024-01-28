/**
 * Community style
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
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
      //  backgroundColor: theme.SKY_BLUE,
      // paddingHorizontal: widht * 0.05,
    },
    header: {
      marginBottom: height * 0.025,
      alignItems: "center",
      flexDirection: 'row',
      // justifyContent: 'center',
      paddingHorizontal: widht * 0.03,
      width: widht,
      height: height * 0.03,
      marginTop: Platform.OS == 'android' ? height * 0.015 : height * 0.01
    },
    commonShadow: {
      shadowColor: theme.LIGHT_GRAY,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      paddingVertical: widht * 0.025
    },
    semiHeader: {
      marginHorizontal: widht * 0.05,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    coinText: {
      textAlign: 'center',
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    position: {
      backgroundColor: theme.ICON_TINT,
      paddingHorizontal: widht * 0.03,
      marginHorizontal: widht * 0.02,
      paddingVertical: widht * 0.005,
      borderRadius: widht * 0.02,
    },
    flexRow: { flexDirection: 'row', alignItems: 'center' },
    Z: { marginLeft: widht * 0.02 },
    renderMainView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: widht * 0.03,
      backgroundColor: theme.PRIMARY
    },
    flatlist: {
      borderRadius: widht * 0.03,
      overflow:'hidden',
      marginVertical: widht * 0.05
    },
    renderTitle: {
      paddingLeft: widht * 0.02,
      flex:1,
      textAlign: 'auto'
    },
    renderIndex: {
      paddingHorizontal: widht * 0.05
    },
    renderImage: {
      width: scale(55),
      height: scale(55),
      borderRadius:widht * 0.03
    },
    renderCoin: {
      marginRight: widht * 0.01,
      width: widht * 0.2,
    },
    renderCommonText: {
      textAlign: 'center',
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
  });
};

export default Style;