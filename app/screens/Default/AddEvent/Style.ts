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
      // paddingHorizontal: widht * 0.05,
    },
    headerText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginHorizontal: 40
    },
    saveButton: {
      width: widht * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
      borderRadius: 15,
      height: widht * 0.13,
      marginHorizontal: 20,
      marginBottom: Platform.OS === 'ios' ? 20 : 30,
    },
    symptomsButton: {
      flex: 1,
      borderRadius: widht * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      height: widht * 0.15,
      backgroundColor: theme.PRIMARY,
      marginBottom: widht * 0.03,
      borderWidth: 1,
      borderColor: '#108fe5'
    },
    titleInput: {
      backgroundColor: theme.PRIMARY,
      height: widht * 0.13,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginHorizontal: widht * 0.05,
      marginTop: 18,
    },
    errorMessage:{
      borderColor:theme.RED,
       borderWidth:1
      },
    descInput: {
      marginTop: 18,
      backgroundColor: theme.PRIMARY,
      height: height * 0.4, borderRadius: 12,
      padding: 12, paddingTop: 12,
      marginHorizontal: widht * 0.05,
      textAlignVertical: 'top'
    },
    scrollStyle: {
      marginBottom: 10
    },
    dateInput: {
      alignItems: 'center',
      //  justifyContent: "space-between",
      borderRadius: 12,
      flexDirection: 'row',
      paddingHorizontal: 12,
      height: widht * 0.13,
      backgroundColor: theme.PRIMARY,
      marginTop: 18,
      marginHorizontal: widht * 0.05
    },
    categoryInput: {
      borderRadius: 12,
      paddingHorizontal: 12,
      height: widht * 0.13,
      backgroundColor: theme.PRIMARY,
      marginHorizontal: widht * 0.05,
      marginTop: 18
    },
    commonText: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    categoryText: { 
      marginHorizontal :15, 
      marginTop: 20, 
      borderBottomColor: theme.SEARCH_TITLE,
      borderBottomWidth: 1, 
    },
    uploadImageDesc: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.PAGINATION_SELECCT,
      marginTop: 2,
      textDecorationLine: 'underline'
    },
    uploadImage: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
    },
    uploadFile: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      marginHorizontal: scale(20)
    },
    uploadImgButton: {
      backgroundColor: '#c9ccd0',
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: verticalScale(10),
      marginBottom: verticalScale(10),
      height: 190,
    },
    renderMainView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '33%',
      overflow: 'hidden',
      borderRadius: scale(10)
    },
    renderText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.PRIMARY,
      marginLeft: 10
    },
    commonShadow: {
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    iconStyle: { height: 20, width: 16 },
    renderIconImage: {
      height: scale(98),
      width: scale(98),
      borderRadius: scale(10),
      overflow: 'hidden',
    },
    item: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal:10
    },
    textItem: {
      flex: 1,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    icon: {
      marginRight: 5,
    },
    extraPadding: {
      marginBottom: verticalScale(50),
      flexDirection: "row",
      flexWrap: 'wrap',
      marginHorizontal: widht * 0.05,
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 3 : 0
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
      height: '100%',
      position: 'absolute',
      // bottom: 0,
      paddingRight: 10,
      paddingVertical: 2
    },
    deleteIcon: {
      right: widht * 0.03,
      padding: 5,
      position: 'absolute',
      zIndex: 2
    },
    activitySubVw: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    activitySubVwTwo: {
      width: '100%',
    },
    headerDateText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
  },
    activityTitle: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    dateTimeVw: {
      backgroundColor: '#eeeef0',
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 5,
    },
    dateTimeText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    calendarView: {
      marginHorizontal: 20,
      borderRadius:12,
      backgroundColor:theme.PRIMARY,
      marginTop:10,
      overflow:'hidden',
      paddingHorizontal:15,
      paddingVertical:20
    },
    disText: {
      color: theme.SUB_TITLE,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'android' ? -4 : -2
    },
    userImgView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 20
    },
    profileImage: {
      width: 49,
      height: 49,
      borderRadius: 10,
      overflow: 'hidden'
    },
    headerTextUser: {
      color: theme.BLACK,
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    addCover:{
      backgroundColor:'#e4e6ea',
      alignItems: "center",
      flexDirection: 'row',
      padding: 10,
      borderRadius:scale(5)
    },
    uploadText: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.BLACK,
      fontWeight: '500',
      marginLeft: 8
    },
    extraInputStyle: {
      fontSize: 14, 
      color: theme.BLACK, 
      fontWeight: '500', 
      flex:1
    },
    applyButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
      borderRadius: 10,
      alignSelf:'flex-end',
      paddingHorizontal: 30,
      paddingVertical: 8,
      // marginRight: 10,
      marginBottom: Platform.OS === 'ios' ? 5 : 10,
    }, 
     applyText: {
      fontSize: 15,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      // marginHorizontal: 40
    },
    calendarLeftIcon:{ 
      padding: 6, 
      paddingVertical: 10, 
      alignItems:'center',
      justifyContent:'center'
    }
  });
};

export default Style;