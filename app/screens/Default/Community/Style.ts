/**
 * Community style
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
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
      backgroundColor: theme.PRIMARY,
    },
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50
    },
    backVw:{ 
      position: "absolute", 
      left: 0, 
      width: 50, 
      height: 50, 
      alignItems: 'center', 
      justifyContent: 'center' 
  },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
    },
    headerText: {
      fontSize: 13,
      marginLeft: 20,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    menuDownImage: {
      width: 10,
      height: 8,
      marginLeft: 5,
      marginTop: Platform.OS == 'android' ? 0 : 3,
      resizeMode: 'contain'
    },
    headerImg: {
      marginLeft: 5
    },
    shareOrAskTxt: {
      width: '80%',
      fontSize: 14,
      marginHorizontal: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    writeSomeView: {
      backgroundColor: theme.PRIMARY,
      flexDirection: 'row',
      marginVertical: 1 ,
      paddingHorizontal: 5,
      alignItems: 'center',
      borderBottomWidth:1,
      borderColor:'#e4e6ea',
      marginBottom: 10
    },
    memberItemView: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
      marginLeft: 10,
      overflow: 'hidden'
    },
    memberImg: {
      width: 40,
      height: 40,
      borderRadius: 10
    },
    photoView: {
      position: 'absolute',
      flexDirection: 'row',
      right: 10,
    },
    photoIcon: {
      height: 21,
      width: 24,
      resizeMode: 'contain'
    },
    titleText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginRight: 25,
      marginLeft: 20
    },
    viewAllPress: {
      position: 'absolute',
      right: 18,
      padding: 7
    },
    viewAll: {
      fontSize: 14,
      color: theme.SECONDARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,

    },
    interestItemContainer: {
      marginVertical: 10,
      marginHorizontal: 5,
      alignItems: 'center'
    },
    imgVw: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: theme.PRIMARY,
      elevation: Platform.OS === 'ios' ? 5 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    img: {
      width: 72,
      height: 54,
    },
    pinImage:{ 
      height: 13, 
      width: 13, 
      position: 'absolute', 
      left: 7, 
      top: 7 
    },
    text: {
      fontSize: 11,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: 'center',
      width: 72,
      marginTop: 4
    },
    selected: {
      backgroundColor: theme.SECONDARY,
      borderWidth: 0,
    },
    searchTXT: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft: 10,
      marginRight: 60,
    },
    searchItem: {
      paddingHorizontal: 15,
      backgroundColor: theme.PRIMARY,
      borderColor: '#B8B8B8',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      borderRadius: 10,
      height: 40
    },
    searchTitle: {
      fontSize: 14,
      color: '#414141',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    searchListauthorName: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
    },
    searchListsurType: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
    },
    searchListHdrTxt: {
      // marginLeft:12,
      marginTop: 15,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 16,
    },
    recentSrch: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    sugSrchTxt: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      marginHorizontal: 7
    },
    noSug: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    menuText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      // marginLeft:3
    },
    menuContainerStyle: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#dcd8d8',
      width: 200,
      height: 95,
      marginTop: 23,
      alignItems: 'center'
    },
    menuTitleVw: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 200
    },
    menuVw: {
      position: 'absolute',
      left: 0
    },
    activityIndicator: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },

    headerDummy: {
      flexDirection: 'row',
      marginTop: 5,
      alignItems: 'center'
    },
    imgView: {
      borderRadius: 10,
      width: 43,
      height: 43,
    },
    icon: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    dummyHeaderText: {
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    postDescription: {
      lineHeight: 20,
      fontSize: 14,
      marginTop: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    imageView: {
      marginTop: 10,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.2)'
    },
    disText: {
      color: theme.GRAY_BLACK,
      fontSize: 11,
      marginTop: Platform.OS === 'ios' ? -2 : -5,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    topicView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? -1 : -3,
    },
    topicIconD: {
      width: 13,
      height: 13,
      resizeMode: 'contain'
    },
    topicTxt: {
      fontSize: 11,
      marginHorizontal: 3,
      textAlign: 'center',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.SUB_TITLE
    },
    noPostVw:{
      alignItems:'center', 
      justifyContent:'center',
      height:200
  },
    noActivityText:{
      fontSize:13,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
     },
     emptyVw: {
      flex: 1,
      justifyContent: 'center'
    },
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};

export default Style;
