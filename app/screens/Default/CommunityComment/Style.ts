/**
 * CommunityComment Component
 * @Author: Astha
 * @Date: Wed April 15 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
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
    header: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
    },
    icon: {
      width: 41,
      height: 41,
      borderRadius: 10,
      marginLeft: 55,
    },
    selectedImage: {
      height: 50,
      width: 50,
      borderRadius: 10,
      marginHorizontal: 20
    },
    closeImageVw: {
      position: 'absolute',
      top: 20,
      right: 20
    },
    closeImage: {
      height: 15,
      width: 15
    },
    writeHereContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
      marginHorizontal: 20,
    },
    commentIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
    },
    headerTextVw: {
      marginHorizontal: 10,
      width: '57%',
    },
    headerText: {
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    disText: {
      color: theme.SUB_TITLE,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'android' ? -5 : -2
    },
    moreImageView: {
      position: 'absolute',
      right: 20,
      top: 3,
      flexDirection: 'row',
    },
    menuPlaceholderImg: {
      height: 35,
      width: 15,
      resizeMode: 'contain'
    },
    pinImage: {
      resizeMode: "contain",
      width: 18,
      height: 18
    },
    menuContainer: {
      position: 'absolute',
      right: -7,
      top: -7
    },
    imageView: {
      marginTop: 14,
      borderRadius: 20,
      marginHorizontal: 20,
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    img: {
      borderRadius: 20,
      overflow: 'hidden',
      marginHorizontal: 20,
      width: widht - 40,
      //  height: widht - 40,
      resizeMode: 'contain',
    },

    postDescription: {
      marginHorizontal: 30,
      lineHeight: 20,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
    },
    seeMoreLessTxt: {
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      paddingLeft: 30
    },
    cancerType: {
      overflow: "hidden",
      color: '#464646',
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      backgroundColor: "#bae1ff",
      textAlign: "center",
      borderRadius: 3,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    utilityView: {
      flexDirection: "row",
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20
    },
    utility: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '30%',
    },
    utilityText: {
      marginLeft: 5,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    countUtilityText: {
      marginLeft: 5,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE
    },
    imgStyle: {
      height: 17,
      width: 17,
      marginLeft: 15,
      resizeMode: 'contain'
    },
    imgView: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'aliceblue',
    },
    commentView: {
      backgroundColor: 'aliceblue',
      width: '87%',
      marginHorizontal: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderTopLeftRadius: 0,
    },
    previewCommentTxt: {
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SECONDARY
    },
    lineVW: {
      backgroundColor: '#c5c5c5',
      height: 1,
      marginHorizontal: 20,
      marginVertical: 3
    },
    nameText: {
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK
    },
    minuteText: {
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.MINUTE_GRAY,
      position: 'absolute',
      right: 22,
      top: -5
    },
    moreCommentImg: {
      position: 'absolute',
      right: -13,
      top: -10,
    },
    commentText: {
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
    },
    writeVw: {
      backgroundColor: theme.SELECTED,
      width: '90%',
      paddingRight: 23,
      paddingLeft: 10,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    postText: {
      marginLeft: 5,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SECONDARY
    },
    anchorStyle: {
      backgroundColor: 'blue',
    },
    wrtHr: {
      width: '98%',
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,

    },
    tagName: {
      color: theme.SECONDARY,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'ios' ? 0 : 15
    },

    detailTxt: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE,
    },
    counterVw: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 10,
      paddingVertical: 3,
      zIndex: 100,
      top: 10,
      borderRadius: 10,
      flexDirection: 'row',
      position: 'absolute',
      alignItems: 'center',
      right: 25
    },
    countText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 12,
      color: theme.PRIMARY
    },
    cameraGalleryContainer: {
      position: 'absolute',
      flexDirection: 'row',
      right: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cameraGalleryVw: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cameraGalleryIcon: {
      height: 16,
      width: 16
    },
    postVw: {
      margin: 5,
      paddingVertical: Platform.OS === 'ios' ? 10 : 5
    },
    menuContentStyle: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#dcd8d8',
      width: 132,
      marginTop: 23
    },
    menuPlaceholderImgVw: {
      marginTop: -7,
      width: 35,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    postImg: {
      // borderRadius: 20,
      overflow: 'hidden',
      width: widht - 40,
      marginHorizontal: 20,
      height: widht - 40,
      resizeMode: 'contain',
    },
    cancerTypeText: {
      color: theme.SECONDARY,
      width: '96%',
      lineHeight: 20,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    postTitle: {
      fontSize: 14,
      marginTop: 10,
      fontFamily: FONTFAMILY.POPPINS_BOLD,
      color: theme.GRAY_BLACK,
      marginLeft: 20
    },
    commentVw: {
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F1F5'
    },
    commentTitle: {
      color: '#666666',
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    topicIcon: {
      width: 13,
      height: 13,
      resizeMode: 'contain'
    },
    topicView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? -1 : -3,
  },
  topicTxt: {
    fontSize: 11,
    marginHorizontal: 3,
    textAlign: 'center',
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    color: theme.SUB_TITLE
},
  });
};

export default Style;
