/**
 * Stories style
 * @Author: Anand R
 * @Date: Fri Dec 03 2021 16:00:13 GMT+0530 (India Standard Time)
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
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 16
    },
    flexRow: {
      flexDirection: "row"
    },
    cardContainer: {
      justifyContent: "center",
      marginTop: height * 0.016,
      marginBottom: height * 0.026,
      marginHorizontal: width * 0.04,
      width: width * 0.83
    },
    cardImage: {
      width: width * 0.88,
      height: height * 0.25,
      borderRadius: 20,
      alignSelf: "center",
      marginBottom: height * 0.02
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    icon: {
      marginRight: width * 0.02
    },
    commentLabel: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.MEDIUM_GRAY,
      marginLeft: width * 0.016,
      fontSize: 14
    },
    storyText: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 14,
      marginVertical: height * 0.014
    },
    readMoreText: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.SECONDARY,
      fontSize: 14,
      marginVertical: height * 0.014
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileIcon: {
      width: width * 0.06,
      height: width * 0.06,
      borderRadius: 10
    },
    nameText: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.MEDIUM_GRAY,
      fontSize: 14,
      marginLeft: width * 0.02
    },
    dateText: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.MEDIUM_GRAY,
      fontSize: 14,
      marginLeft: width * 0.06
    },
    storyIamge: {
      width: width * 0.90,
      height: height * 0.25,
      borderRadius: 20,
      alignSelf: "center",
      marginBottom: height * 0.02
    },
    textContainer: {
      marginHorizontal: width * 0.08
    },
    storyTitle: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 16,
      marginTop: height * 0.01,
      marginBottom: height * 0.03,
      textTransform: 'capitalize'
    },
    subTitle: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 14,
      marginBottom: height * 0.02,

    },
    storyContent: {
      fontFamily: FONTFAMILY.REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 12,
      lineHeight: 25
    },
    storyBottomContainer: {
      marginHorizontal: width * 0.07,
      marginVertical: height * 0.03,
      flexDirection: "row",
      alignItems: "center"
    },
    storyNameText: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.MEDIUM_GRAY,
      fontSize: 14,
    },
    storyIconsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: width * 0.08,
      marginBottom: height * 0.02
    },
    closeBtn: {
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.MEDIUM,
      fontSize: 18,
      paddingRight: width * 0.02,
      marginTop: - height * 0.005
    },
  });
};

export default Style;
