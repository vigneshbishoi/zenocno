/**
 * Payment style
 * @Author: Anand R
 * @Date: Tue Nov 30 2021 11:13:29 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions } from 'react-native';
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
    backgroundGradient: {
      height: height * 0.36,
      borderBottomLeftRadius: 40
    },
    plansBackgroundGradient: {
      height: height * 0.28,
    },
    titleTextContainer: {
      marginTop: -height * 0.02
    },
    titleText: {
      fontFamily: FONTFAMILY.BOLD,
      color: theme.PRIMARY,
      fontSize: 20,
      textAlign: "center",
    },
    pictureTextContainer: {
      flexDirection: "row",
      justifyContent: "center"
    },
    whiteCircle: {
      backgroundColor: "white",
      height: width * 0.18,
      width: width * 0.18,
      borderRadius: (width * 0.18) / 2,
      justifyContent: "center",
      alignItems: "center",
      margin: width * 0.03
    },
    pictureText: {
      textAlign: "center",
      width: width * 0.25,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.REGULAR,
      marginLeft: width * 0.01
    },
    bottomContainer: {
      marginHorizontal: width * 0.12,

    },
    backgroundImage: {
      position: "absolute",
      right: - width * 0.12
    },
    paymentBackgroundImage: {
      position: "absolute",
      right: - width * 0.12,
      bottom: - height * 0.04,
      opacity: 0.25
    },
    bottomTitleText: {
      fontFamily: FONTFAMILY.BOLD,
      color: theme.DARK_GRAY,
      fontSize: 16,
      marginVertical: height * 0.03
    },
    iconTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: height * 0.01
    },
    iconText: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 14,
      marginLeft: width * 0.015,
      marginBottom: height * 0.005
    },
    btnContainer: {
      marginTop: height * 0.02,
      marginBottom: height * 0.02,
      justifyContent: "center",
      alignItems: "center"
    },
    buyBtnContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    btn: {
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.90,
      height: height * 0.10
    },
    btnLgradient: {
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      paddingHorizontal: 50,
      paddingVertical: height * 0.024
    },
    btnText: {
      fontSize: 20,
      fontWeight: "600",
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.PRIMARY
    },
    paymentContainer: {
      backgroundColor: theme.PRIMARY
    },
    cardContainer: {
      borderWidth: 5,
      width: width * 0.6,
      height: height * 0.25,
      marginHorizontal: width * 0.04,
      borderRadius: 20,
      borderColor: theme.LIGHT_GRAY,
      alignItems: "center",
      backgroundColor: theme.PRIMARY
    },
    cardSelected: {
      borderColor: theme.GOLD,
    },
    priceScrollView: {
      marginTop: -height * 0.07
    },
    month: {
      backgroundColor: theme.SECONDARY,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.MEDIUM,
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.01,
      borderRadius: 8,
      marginVertical: height * 0.02
    },
    flexRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    newPrice: {
      color: theme.DARK_GRAY,
      fontSize: 30
    },
    normalTxt: {
      color: theme.DAKR_GRAY,
      fontFamily: FONTFAMILY.REGULAR
    },
    boldText: {
      color: theme.DAKR_GRAY,
      fontFamily: FONTFAMILY.BOLD
    },
    mediumText: {
      fontFamily: FONTFAMILY.MEDIUM
    },
    oldPrice: {
      marginVertical: height * 0.005
    },
    offerText: {
      marginVertical: height * 0.01
    },
    lineThrough: {
      textDecorationLine: "line-through"
    },
    mediumGray: {
      color: theme.MEDIUM_GRAY
    },
    redText: {
      color: theme.RED
    },
    bottomTitle: {
      color: theme.DARK_GRAY,
      fontSize: 18,

    },
    doLaterLink: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.BOLD,
      alignSelf: "center",
      fontSize: 16,
      paddingBottom: 100
    }
  });
};

export default Style;
