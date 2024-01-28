/**
 * Community style
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
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
    commonShadow: {
      shadowColor: theme.BLACK,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9
    },
    header: {
      flexDirection: 'row',
      marginBottom: height * 0.025,
      alignItems: "center",
      justifyContent: 'space-between',
      marginHorizontal: widht * 0.03,
    },
    headerText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      width: scale(80),
      textAlign:'center'
    },
    renderMainView: {
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      marginBottom: height * 0.01,
      borderRadius: height * 0.02,
      marginHorizontal: widht * 0.05,
      height: 400,
      overflow:'hidden'
    },
    dateText: {
      fontSize: widht * 0.052,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    monthText: {
      fontSize: widht * 0.035,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    dayText: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    divider: {
      height: '100%',
      borderWidth: 0.5,
      borderColor: theme.DARK_GRAY,
      opacity: 0.3
    },
    renderTitle: {
      fontSize: widht * 0.036,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    arrowButton: {
      padding: 5,
    },
    extraPadding:{
      paddingHorizontal: 10,
    },
    bottomButtonView: {
      height: height * 0.15,
      width: Dimensions.get('screen').width,
      position: 'absolute',
      zIndex: 2, bottom: 0, alignItems: 'center',
      justifyContent: 'center'
    },
    addMemoryButton: {
      width: widht * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PAGINATION_SELECCT,
      borderRadius: 15,
      height: verticalScale(60)
    },
    dateView: {
      width: widht * 0.14,
      alignItems: 'center',
    },
    renderTitleView: {
      flex: 1,
      overflow: 'hidden'
    },
    emptyView: {
      width: widht,
      height: height * 0.8,
      marginLeft: -widht * 0.05,
      position:'absolute',
    },
    itemImages: {
      height: widht * 0.16,
      width: widht * 0.16,
      borderRadius: 6,
      overflow:'hidden'
    },
    alingCenter: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    dotView:{
      flexDirection: 'row', width: '100%',
      justifyContent: 'space-between'
    },
    optionView: {
      width: widht * 0.32, position: 'absolute',
      right: widht * 0.07,
      backgroundColor: theme.PRIMARY,
      borderRadius: widht * 0.03,
      padding: widht * 0.035,
      borderWidth: 1.5,
      borderColor: theme.LIGHT_GRAY
    },
    optionButton: {
      alignItems: "center",
      flexDirection: 'row',
      marginBottom: widht * 0.05
    },
    optionText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginLeft: widht * 0.02
    },
    searchIcon: {
      width:36, 
      height:36, 
      borderRadius: 36, 
      justifyContent:'center',
      backgroundColor: theme.DARK_SILVER , 
      alignItems:'center',
    },
    dots: {
      width:3, 
      height:3, 
      borderRadius:3, 
      backgroundColor: theme.BLACK, 
      marginBottom: 2
    },
    dotsView:{
      padding:5, 
      marginRight: -2,
      height: 30,
      marginLeft:10,
      marginTop:2
    },
    backView:{
      position: "absolute",
      left: 10,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.BLACK,
      borderRadius: 40,
      zIndex:2
    },
    heartView:{
      position: "absolute",
      right: 5,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      zIndex:99
    },
    authorImage:{
      width:widht,
      height:230,
      marginTop:5
    },
    titleText:{
      fontSize: 18,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    decText:{
      fontSize: 14,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 15
    },
    dateTextItem:{
      fontSize: 12,
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    titleView:{
      marginVertical: 20, 
      paddingHorizontal:15, 
      flexDirection:'row',
      justifyContent:'space-between'
    }
  });
};

export default Style;
