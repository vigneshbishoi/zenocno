/**
 * Landing style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
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
      backgroundColor: theme.SELECTED
    },
    header: {
      flexDirection: 'row',
      marginBottom: height * 0.025,
      alignItems: "center",
      marginHorizontal: widht * 0.03,
      marginTop: Platform.OS == 'android' ? height * 0.018 : height * 0.01,
    },
    headerText: {
      fontSize: 16,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
    },
    arrowButton: {
      padding: 5
    },
    headerRightView: {
      alignItems: 'center',
      justifyContent: "flex-end",
      paddingRight: 5,
      flexDirection: 'row'
    },
    filterIcon: {
      marginLeft: widht * 0.04,
      padding: 5
    },
    divider: {
      borderBottomWidth: 1,
      borderColor: theme.LIGHT_GRAY
    },
    saveButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PAGINATION_SELECCT,
      marginHorizontal: widht * 0.05,
      borderRadius: 15,
      paddingVertical: 20,
      marginTop: 20,
      marginBottom: Platform.OS === 'ios' ? 20 : 30,
    },
    addReportText: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    renderView: {
      padding: widht * 0.05,
      flexDirection: 'row'
    },
    renderTextView: {
      justifyContent: 'space-between',
      marginLeft: widht * 0.03,
      flex: 1
    },
    renderdivider: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    renderTitle: {
      fontSize: scale(18),
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.BLACK,
      marginTop: verticalScale(-4)
    },
    renderCategory: {
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      backgroundColor: theme.LIGHT_SKY, maxWidth: '70%',
      paddingHorizontal: 6, opacity: 0.8
    },
    renderEmptyCategory: {
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      backgroundColor: theme.SELECTED, maxWidth: '70%',
      paddingHorizontal: 6, opacity: 0.8
    },
    renderDate: {
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.DARK_GRAY
    },
    optionView: {
      width: widht * 0.32, position: 'absolute',
      right: 0,
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
    serachView: {
      backgroundColor: theme.PRIMARY,
      height: height * 0.038,
      marginLeft: widht * 0.03,
      alignItems: 'center', width: '82%',
      flexDirection: 'row',
      paddingLeft: widht * 0.025,
      borderRadius: widht * 0.02,
    },
    textInput: { flex: 1, marginLeft: widht * 0.025, padding: 0 },
    closeIcon: { padding: widht * 0.025 },
    emptyList :{
      flex:1, alignItems:'center', justifyContent:'center' ,
      height: height * 0.8
    },
    emptyListMsg:{
      fontSize: widht * 0.035,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    dotButton:{
      position:'absolute',
      right: scale(12)
    },
    desc: {
      marginHorizontal: scale(20),
      marginBottom: scale(20),
      marginTop: scale(5),
      fontSize: scale(12),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SUB_TITLE
    },
    renderMainView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '33%',
      overflow: 'hidden',
      borderRadius: scale(10)
    },
    extraPadding: {
      marginBottom: verticalScale(50),
      flexDirection: "row",
      flexWrap: 'wrap',
      marginHorizontal: widht * 0.05,
      alignItems: 'center'
    },
    renderText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.PRIMARY,
      marginLeft: 10
    },
    deleteView: {
      position: 'absolute',
      zIndex: 2,
      right: scale(10),
      top: scale(6),
      borderRadius: scale(30),
      padding: scale(4),
      backgroundColor: theme.DARK_GRAY
    },
    fileNameView: {
      width: '100%', 
      position: 'absolute',
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.4)', 
      paddingRight: 10
    },iconStyle: {
      height: scale(98),
      width: scale(98),
      borderRadius: scale(10),
      overflow: 'hidden',
    },
  });
};

export default Style;
