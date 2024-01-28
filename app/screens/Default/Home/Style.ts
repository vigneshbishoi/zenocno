/**
 * Home style
 * @Author: Anand R
 * @Date: Thu Dec 02 2021 10:53:59 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
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
      backgroundColor: theme.PRIMARY,
      // backgroundColor: theme.SELECTED,
      //  marginBottom:30
    },
    headerContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems:'center'
    },
    headerVw: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%'
    },
    menuVw: {
      height: 50,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5
    },
    moveRight: {
      alignSelf: "flex-end",
    },
    headerIcon: {
      paddingRight: 0
    },
    notificationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'orange',
      position: 'absolute',
      right: 0,
      top: 0
    },
    mainView: {
      //  paddingHorizontal: 10
      marginTop: 25
    },
    topicContainer: {
      marginRight: 10,
    },
    topicItem: {
      paddingHorizontal: 20,
      backgroundColor: theme.PRIMARY,
      borderColor: '#B8B8B8',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      borderRadius: 10,
      height: 42
    },
    topicIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    topicTitle: {
      paddingLeft: 5,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    headerIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 15,
    },
    coinVw: {
      flexDirection: 'row',
      alignItems: 'center',
      // paddingRight:20
    },
    headerSliderImg: {
      // height:35, 
      // width:35,      
      alignItems:'center', 
      marginRight:20, 
      overflow:"hidden"
    },
    coinTxt: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.BLACK,
      fontSize: 12,
      marginLeft: 7,

    },
    selected: {
      backgroundColor: theme.SECONDARY,
    },
    horizantalMenus: {
      flexDirection: 'row',
    },
    menuContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: width * 0.95,
      paddingHorizontal: height * 0.02,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    menuTitle: {
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: width * 0.02,
      fontSize: 14,
    },
    halfMenuContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: width * 0.46,
      backgroundColor: theme.GHOST_WHITE,
      marginLeft: width * 0.025,
      marginTop: height * 0.02,
      padding: height * 0.02,
      paddingRight: width * 0.15,
      borderRadius: 10,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    halfMenuImage: {
      width: width * 0.1,
      height: width * 0.1,
    },
    menuImage: {
      width: width * 0.14,
      height: width * 0.14,
    },
    halfMenuTitle: {
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: width * 0.01,
      fontSize: 14,
    },
    searchContainer: {
      height: height * 0.06,
      marginTop: height * 0.012,
      marginBottom: height * 0.02,
      marginHorizontal: width * 0.055,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: theme.VERY_LIGHT_GRAY,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: width * 0.03,
      padding: width * 0.02,
      paddingBottom: width * 0.02,
      fontSize: 16,
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    storiesHeaderContainer: {
      flexDirection: 'row',
      marginTop: '5%',
      justifyContent: 'space-between',
      marginHorizontal: width * 0.05,
      borderTopColor: theme.LIGHT_GRAY,
      borderTopWidth: 0.2,
      paddingTop: height * 0.01,
    },
    cancerHealingTitle: {
      fontFamily: FONTFAMILY.MEDIUM,
      color: theme.DARK_GRAY,
      fontSize: 16,
    },
    viewAllText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SECONDARY,
      fontSize: 14,
    },
    cancerStoriesContainer: {
      marginLeft: width * 0.03,
      marginTop: height * 0.02,
    },
    discoverContainer: {
      marginLeft: width * 0.05,
      borderTopColor: theme.LIGHT_GRAY,
      borderTopWidth: 0.4,
      paddingTop: height * 0.01,
      marginBottom: height * 0.01,
    },
    discoverHeader: {
      marginBottom: height * 0.02,
    },
    cardBackground: {
      padding: width * 0.05,
      borderRadius: 10,
      marginHorizontal: width * 0.02,
    },
    cardText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 14,
      marginTop: height * 0.01,
    },
    cardIconContainer: {
      alignItems: 'center',
    },
    cardImage: {
      width: width * 0.06,
      height: width * 0.06,
    },
    singleStoryContainer: {
      marginTop: height * 0.02,
      paddingLeft: width * 0.04,
    },
    singleStoryHeaderContainer: {
      paddingTop: height * 0.02,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: width * 0.05,
    },
    iconBackground: {
      padding: width * 0.03,
      borderRadius: 50,
      marginHorizontal: width * 0.02,
    },
    iconImage: {
      width: width * 0.05,
      height: width * 0.05,
    },
    titleText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 16,
    },
    singleCardContainer: {
      marginTop: height * 0.02,
      alignItems: 'center',
    },
    bottomMenuContainer: {
      height: height * 0.08,
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
      paddingLeft: width * 0.02,
      paddingRight: width * 0.02,
    },
    bottomMenuIcon: {
      width: width * 0.06,
      height: width * 0.06,
    },
    bottomBarItemVw: {
      width: '26%',
      alignItems: 'center',
      height: 45,
      justifyContent: 'space-between'
    },
    askZenIcon: {
      marginTop: -35,
      resizeMode: 'contain',
      height: 60,
      width: 60
    },
    iconText: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.GRAY_BLACK,
      fontSize: 10,
      height: 15
    },
    gridItemsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    sectionImage: {
      height: 70,
      width: 70,
      borderRadius: 70 / 2,
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
    },
    gridItem: {
      borderRadius: 20,
      backgroundColor: theme.lIGHT_GRAY,
      alignItems: 'center',
      margin: 5,
      height: 160,
      width: 180,
    },
    sectionText: {
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      flexShrink: 1,
      marginHorizontal: 2,
    },
    descText: {
      marginTop: 4,
      fontSize: 12,
      marginHorizontal: 5,
      textAlign: 'center',
      flexShrink: 1,
      color: theme.BLACK,
    },
    userInfoVw: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.PRIMARY
    },
    welcomeTxt: {
      color: theme.BLACK,
      fontSize: 24,
      fontFamily: FONTFAMILY.POPPINS_BOLD
    },
    userNameTxt: {
      color: theme.SUB_TITLE,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '100%'
    },

    userStatusView: {
      width: 8,
      height: 8,
      borderRadius: 4,
      position: 'absolute',
      right: 10,
      top: -3,
      backgroundColor: 'orange'
    },
    // headerContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 10,
    //     paddingVertical: 10
    // },
    headerUtitlityIcon: {
      flexDirection: 'row',
      position: 'absolute',
      right: 0,
    },
    headerUtilityIcon: {
      height: 20,
      width: 20,
      marginRight: 10
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      paddingHorizontal: 13
    },
    userPhotoView: {
      borderRadius: 48,
      position: 'absolute',
      right: 15,
      overflow: 'hidden'
    },
    featuresItemText: {
      // marginLeft: 10,
      color: theme.GRAY_BLACK,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: '70%'
    },
    dottedView: { 
      borderWidth:1, 
      borderStyle: 'dotted', 
      width:0.5, 
      borderColor: 
      theme.SEARCH_TITLE,
      height:10, 
      marginLeft: 12
    },
    openLinkVw:{ 
      position: 'absolute', 
      right: 0, 
      paddingHorizontal: 5 
  },
    featureTime: {
      color: '#404040',
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      right: 0,
      position: 'absolute'
    },
    addInputVw: {
      marginTop: 7,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: "center",
      paddingLeft: 12,
      paddingRight: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.SEARCH_TITLE,
      paddingVertical: Platform.OS === 'ios' ? 4 : 0
    },
    addActivityTxtInput: {
      width: '93%',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12
    },
    addActivityiTick: {
      width: 28,
      height: 28
    },
    weekDayNameText: {
      textAlign: 'center',
      fontSize: 9,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop:7,
      color: theme.BLACk
    },
    streakTxt: {
      color: theme.GRAY_BLACK,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },

    userPhoto: {
      width: 47,
      height: 47,
    },
    typeItem: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 15,
      marginHorizontal: 6,
      marginVertical: 15,
      width: 91,
      height: 86,
      justifyContent: 'center',
      alignItems: 'center',
    },
    typeIcon: {
      width: 22,
      height: 22,
      marginTop: 5
    },
    typeName: {
      color: theme.GRAY_BLACK,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center'
    },
    planItem: {
      height: 106,
      marginVertical: 10,
      backgroundColor: theme.PRIMARY,
      borderRadius: 15,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
    },

    livePlanVw: {
      flexDirection: 'row',
      width: width - 40,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginHorizontal: 20
    },
    liveImageVw: {
      height: 63,
      width: 63,
      borderRadius: 32.5,
      overflow: 'hidden'
    },
    planname: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 10,
    },
    startNowButton: {
      width: 90,
      marginTop: 8,
      backgroundColor: 'dodgerblue',
      borderRadius: 20,
      paddingVertical: 5,
      alignItems: 'center',
      marginLeft: 20
    },
    startNowText: {
      color: theme.PRIMARY,
      fontSize: 14
    },
    timetext: {
      color: theme.SUB_TITLE,
      marginHorizontal: 10,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: 3
    },
    slide: {
      // marginVertical: 10,
      // overflow: 'hidden',
      // borderRadius: 20,
      // paddingVertical: 15,
      // paddingHorizontal: 20,
      backgroundColor: theme.PRIMARY,
      // elevation: 5,
      // shadowColor: theme.BLACK,
      // shadowOffset: {
      //   width: 0,
      //   height: 10,
      // },
      // shadowOpacity: 0.3,
      width:'100%'
    },
    slideHeader: {
      color: theme.GRAY_BLACK,
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_BOLD
    },
    zenIoText: {
      color: theme.BLACK,
      fontSize: 28,
    },
    nextAssessmentText:{ 
      marginTop: 80, 
      textAlign: 'center', 
      lineHeight: 20, 
      marginHorizontal: 65, 
      color: theme.BLACK, 
      fontSize: 15 
  },
    takeAssButton: {
      backgroundColor: 'dodgerblue',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal: 10,
      marginVertical: 10
    },
    takeAssText: {
      color: theme.PRIMARY,
      textAlign: 'center',
      fontSize: 15
    },
    featureItemView: {
      flexDirection: 'row',
      // marginVertical: 6,
      alignItems: 'center'
    },
    liveView: {
      backgroundColor: 'red',
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderBottomRightRadius: 15,
      borderTopLeftRadius: 5
    },
    liveText: {
      color: theme.PRIMARY,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    addView: {
      position: 'absolute',
      right: 8,
    },
    profileItemView: {
      borderRadius: 12,
      overflow: 'hidden',
      marginRight: 13,
      marginBottom: 10
    },
    profileImg: {
      width: 108,
      height: 108
    },
    percentageView: {
      backgroundColor: '#1e90ff',
      opacity: 0.8,
      paddingVertical: 3,
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    percentageText: {
      color: theme.PRIMARY,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    profileButton: {
      backgroundColor: theme.PRIMARY,
      marginVertical: 50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      elevation: 10,
      paddingVertical: 8,
      paddingHorizontal: 20,
      shadowColor: theme.BLACK,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.3,
    },
    bgImage: {
      backgroundColor: theme.SELECTED
    },
    nextPreIconVw: {
      // paddingHorizontal: 10
      padding: 5,
    },
    currentDateText: {
      color: theme.BLACK,
      fontSize: 14,
      // marginLeft: 7,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      // width: 48,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20
    },
    supportGpText: {
      // fontSize: 18,
      fontSize: 20,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_BOLD,
      // fontFamily: FONTFAMILY.POPPINS_BOLD,
      marginRight: 25,
      marginLeft: 10
    },
    tipsDesc: {
      fontFamily:FONTFAMILY.POPPINS_MEDIUM, 
      fontSize:14,
       marginLeft:40
    },
    viewAllVw: {
      position: 'absolute',
      right: 25
    },
    viewAllTxt: {
      fontSize: 14,
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,

    },
    interestItemContainer: {
      margin: 10,
      alignItems: 'center',
    },
    gpImgVw: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: theme.PRIMARY,
    },
    gpImg: {
      width: 56,
      height: 56,
    },
    gptext: {
      fontSize: 11,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: 'center',
      width: 50,
      marginTop: 4
    },
    highlightText: {
      fontSize: 18,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 20,
      marginBottom: 15
    },
    activityIndicator: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    seperatorView: {
      height:1, 
      backgroundColor:theme.HOME_BORDER, 
      marginVertical:15 
    },
    writeSomeView: {
      backgroundColor: theme.PRIMARY,
      flexDirection: 'row',
      marginVertical: 1 ,
      paddingHorizontal: 0,
      alignItems: 'center',
      borderBottomWidth:1,
      borderColor:'#e4e6ea',
      marginBottom: 10
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
    },
    tipsModalVw: {
      width: width - 30,
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 25,
      paddingBottom: Platform.OS == 'ios' ? 15 : 5
    },
    modalDesText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'ios' ? 25 : 15, 
      marginBottom: 10
    },
    closeImageVw: {
      padding: 5,
      position: 'absolute',
      right: 10,
      top: 10
    },
    closeImg: {
      height: 10,
      width: 10
    },
    bannerView: {
      flexDirection:"row", 
      height:36, 
      backgroundColor: theme.BANNER_BG, 
      marginHorizontal:15, 
      alignItems:"center", 
      paddingHorizontal:10, 
      borderRadius:5,
      width: Dimensions.get('window').width - 30,
      marginVertical: 10,
      borderWidth: 0.5,
      borderColor:'#e1edfc'
    },
    bannerTxt: {
      fontSize:14, 
      fontFamily: FONTFAMILY.POPPINS_MEDIUM, 
      width:'88%', 
      color: theme.PRIMARY
    },
    itemImage: {
      width: 27,
      height: 27,
      marginRight: 10
  },
  });
};

export default Style;