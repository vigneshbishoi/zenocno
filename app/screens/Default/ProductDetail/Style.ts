/**
 * Product Detail Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Product Detail
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
    headerVw: {
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 60
    },
    backVw: {
      position: "absolute",
      left: 10
    },
    headerTxt: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.BLACK
    },
    itemImageContainer: {
      height: widht,
      width: widht,
    },
    itemImage: {
      height: widht,
      width: widht,
      resizeMode: 'contain'
    },
    dotView: {
      width: 8,
      height: 8,
      borderRadius: 7 / 2,
      alignItems: 'center',
      margin: 3,
    },
    decriptionView: {
      paddingHorizontal: 10,
      paddingTop: 8,
      marginBottom: 10
    },
    featuresView: {
      paddingHorizontal: 10,
    },
    title: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.BOLD,
      fontSize: 26,
      paddingVertical: 1
    },
    desText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
      //lineHeight: 24,
    },
    subDesText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
      //lineHeight: 24,
    },
    reviewVW: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: Platform.OS === 'ios' ? 5 : 4,
      marginBottom: 15,
      // marginLeft:15,
      widht: '100%'
    },
    useProductVw: {
      flexDirection: 'row',
      marginTop: 8
    },
    rateImage: {
      width: 13,
      height: 12,
      marginLeft: 7,
      tintColor: theme.LIGHT_GREEN
    },
    reviewText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
      color: theme.GRAY_BLACK,
      marginLeft: 10,
      marginTop: Platform.OS === 'ios' ? 0 : 3
    },
    outOfRattingText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 15,
      color: theme.GRAY_BLACK,
      // marginTop: Platform.OS === 'ios' ? 0 : 3
    },
    globalRattingText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
      color: theme.SEARCH_TITLE,
      marginTop: 10,
      marginLeft: 5
      // marginTop: Platform.OS === 'ios' ? 0 : 3
    },
    photoVideoButton: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.STROKE_COLOR,
      height: 55,
      marginVertical: 10,
    },
    photoVideoView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    albumText: {
      color: theme.BLACK,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    txtContainer: {
      paddingHorizontal: 10,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: '#cecece',
      height: 51,
      width: '63%',
      justifyContent: 'center'
    },
    utilityVw: {
      width: '30%',
      borderColor: '#e2e2e2',
      alignSelf: "flex-end",
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 6
    },
    utilityVw2: {
      width: '30%',
      borderColor: '#e2e2e2',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      height: 37,
      justifyContent: 'center',
      marginRight: '3%'
    },
    addRemoveItemContainer: {
      paddingVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between'
    },
    addRemoveItem: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
    },
    addRemoveText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
      color: theme.PRIMARY
    },
    totalItem: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    priseText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 18,
    },
    offPriseText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
    },
    priseRupeeText: {
      color: theme.SUB_TITLE,
      fontSize: 18,
    },
    offText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 13,
      color: theme.OFFER
    },
    disPriceText: {
      color: theme.BLACK,
      fontSize: 24,
    },
    attributesContainerVw: {
      backgroundColor: theme.PRIMARY,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#eff9ff',
      borderTopWidth: 4,
      borderBottomWidth: 4
    },
    attributeVw: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',

    },
    attributeIcon: {
      // width:28,
      // height:28,
    },
    attributeText: {
      fontSize: 15,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 8
    },
    cartIcon: {
      width: 23,
      height: 23,
      resizeMode: 'contain'
    },
    cartText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 9,
      //alignSelf: 'center',
      textAlign: 'center'
    },
    dotVw: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      alignSelf: "center",
      alignItems: 'center',
      marginBottom: 3,
      justifyContent: 'center'
    },
    saleVw: {
      backgroundColor: theme.LIGHT_GREEN,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      paddingVertical: 5,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10
    },
    saleText: {
      color: theme.PRIMARY,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    codeContainer: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    codeVw: {
      backgroundColor: '#eff9ff',
      borderColor: theme.SECONDARY,
      borderWidth: 1,
      alignItems: 'center',
      width: 175,
      paddingVertical: Platform.OS === 'ios' ? 8 : 5
    },
    codeText: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    allTexts: {
      color: theme.GRAY_BLACK,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      //lineHeight:22
    },
    descriptionTopicText: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 7,
      marginRight: 10
    },
    freqVw: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    descriptionText: {
      fontSize: 18,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      marginBottom: 6
    },
    headerTextExtra: {
      marginBottom: 15,
      marginHorizontal: 20,
      fontSize: 20,
    },
    subHeaderText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginTop: 15
    },
    downArrawVw: {
      height: 25,
      width: 25,
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    downArrawImg: {
      height: 15,
      width: 15,
      resizeMode: "contain"
    },
    subheader: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.BLACK
    },
    imageItem: {
      width: 60,
      height: 60
    },
    writeReviewVw: {
      width: '40%',
      height: 41,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.SECONDARY,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0
    },
    seeReviewVw: {
      width: '40%',
      height: 41,
      borderRadius: 10,
      borderWidth: 1.5,
      marginEnd: 20,
      borderColor: theme.SECONDARY,
      alignSelf: "flex-end",
      alignItems: 'center',
      justifyContent: 'center',
    },
    writeReviewText: {
      fontSize: 12,
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    noReviewsVw: {
      borderRadius: 12,
      backgroundColor: theme.PRIMARY,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 35,
      marginTop: 15
    },
    noReviewText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
    },
    labelText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    starText: {
      color: theme.RED_COLOR,
      fontSize: 14
    },
    commentContainer: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 10,
      paddingVertical: 15,
      marginVertical: 10,
      paddingHorizontal: 15,
    },
    submitVw: {
      backgroundColor: theme.SECONDARY,
      height: 51,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    userReviewItemContainer: {
      // padding: 15,
      marginHorizontal: 20,
      // marginVertical: 10,
      backgroundColor: theme.PRIMARY,
      borderRadius: 15,
      width: widht - 40
    },
    reviewUserImage: {
      width: 50,
      height: 50,
      borderRadius: 10,
      overflow: 'hidden',
    },
    reviewuserNameText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    userStoryItemContainer: {
      marginHorizontal: 20,
      borderRadius: 20,
      overflow: 'hidden',
      width: widht - 40,
    },
    storyUserImage: {
      width: '100%',
      height: 274
    },
    borderLine: {
      width: '100%',
      height: 1,
      backgroundColor: theme.SLOT_BORDER
    },
    benefitsContainer: {
      marginTop: 20,
      paddingHorizontal: 10
    },
    benefitsSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 11
    },
    benefitText: {
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 5
    },
    productInfoSubContainer: {
      flexDirection: 'row', height: 80
    },
    productInfoLeftContainer: {
      width: '30%',
      backgroundColor: theme.LIGHT_GREY,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productInfoRightContainer: {
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    productInfoTetxt: {
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    }
  });
};

export default Style;