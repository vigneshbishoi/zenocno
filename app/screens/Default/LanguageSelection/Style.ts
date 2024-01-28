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
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },
    content_container: {
      //justifyContent: 'center',
      //flex: 1,
    },
    flatlist_container: {
      backgroundColor: theme.BG,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    item_container: {
      paddingHorizontal: 40,
      paddingVertical: 5,
      height: 101,
      backgroundColor: theme.PRIMARY
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex: 1,
      paddingHorizontal: 25,
      borderRadius: 15,
      height: 70,
      marginHorizontal: 10,
      marginVertical: 10,
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: theme.PRIMARY
    },
    unselected_text: {
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    current_lang: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 24,
      color: theme.GRAY_BLACK,
      textAlign: 'center',
    },
    selectLanguageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 20,

    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      height: 200,
      width: 350,
    },
    tickImg: {
      height: 25,
      width: 25,
      position: 'absolute',
      right: 20
    }
  });
};

export default Style;
