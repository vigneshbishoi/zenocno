/**
 * Landing style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
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

    },
    image: {
      height: 55, width: 220
    },
    cardStyle: {
      flex: 1,

      marginVertical: 15,
      marginHorizontal: 17,
      height: height * .18,


      backgroundColor: theme.PRIMARY,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flatlist: {
      marginHorizontal: 20,
      marginTop: -40,
      flex: .55
    },
    item_image: {
      height: height * 0.08,
      width: widht * 0.08
    },
    item_text: {
      textAlign: 'center',
      fontFamily: FONTFAMILY.BOLD,
      fontSize: 14,
      padding: 10,
      color: theme.DARK_GRAY
    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: .45,
      borderBottomLeftRadius: 50,
      paddingTop: 10,
      marginBottom: 30


    },
    journey_text: {
      fontFamily: FONTFAMILY.BOLD,
      textAlign: 'center',
      fontSize: 20,
      color: theme.PRIMARY,
      marginTop: 20,
      marginStart: 20
    },
    btn: {
      backgroundColor: theme.PRIMARY,
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.1,

    },
    btnText: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.BOLD,
      fontSize: 18
    }
  });
};

export default Style;
