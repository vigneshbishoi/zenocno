/**
 * Comments style
 * @Author: Anand R
 * @Date: Tue Dec 07 2021 13:49:47 GMT+0530 (India Standard Time)
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
    },
    headerContainer: {
      margin: height * 0.03,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    headerTitle: {
      fontFamily: FONTFAMILY.BOLD,
      color: theme.MEDIUM_GRAY,
      fontSize: 16,
      alignSelf: "center"
    },
    flexRow: {
      flexDirection: "row"
    },
    commentContainer: {
      marginVertical: height * 0.02,
      marginLeft: width * 0.04,
      marginRight: width * 0.16,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row"
    },
    profileIcon: {
      width: width * 0.09,
      height: width * 0.09,
      borderRadius: 35
    },
    textContainer: {
      marginLeft: width * 0.02
    },
    userNameText: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 14
    },
    commentText: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.MEDIUM_GRAY,
      marginVertical: height * 0.012,
      fontSize: 12
    },
    commentInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight: width * 0.2
    },
    commentInfoText: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.MEDIUM_GRAY,
      fontSize: 12,
      marginLeft: width * 0.02
    },
    commentBtnContainer: {
      flexDirection: "row",
      marginTop: height * 0.02
    },
    iconBtnContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: width * 0.04
    },
    icon: {
      marginRight: width * 0.01
    },
    iconText: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.MEDIUM_GRAY,
      fontSize: 12,
      marginBottom: height * 0.004
    },
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    textInput: {
      marginHorizontal: width * 0.03,
      padding: width * 0.05,
      paddingLeft: width * 0.08,
      fontSize: 16,
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.REGULAR,
      width: "70%"
    },
    sendIcon: {
      width: width * 0.05,
      height: width * 0.05,
      marginRight: width * 0.08
    }
  });
};

export default Style;
