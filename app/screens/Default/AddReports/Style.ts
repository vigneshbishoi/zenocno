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
       backgroundColor: theme.SELECTED,
      // paddingHorizontal: widht * 0.05,
    },
    headerText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    saveButton: {
      // flex: 1,
      width: widht * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
      borderRadius: 15,
      paddingVertical: 20,
      marginHorizontal:20,
      // marginTop: 20,
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
      height: widht * 0.15,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginHorizontal: widht * 0.05
    },
    descInput: {
      marginVertical: 10,
      backgroundColor: theme.PRIMARY,
      height: height * 0.3, borderRadius: 12,
      padding: 12, paddingTop: 12,
      marginHorizontal: widht * 0.05,
      textAlignVertical: 'top'
    },
    scrollStyle: {
      marginBottom: height * 0.1
    },
    dateInput: {
      alignItems: 'center',
      justifyContent: "space-between",
      borderRadius: 12,
      flexDirection: 'row', paddingHorizontal: 12,
      height: widht * 0.15, backgroundColor: theme.PRIMARY,
      marginTop: 12,
      marginHorizontal: widht * 0.05
    },
    categoryInput: {
      borderRadius: 12, paddingHorizontal: 12,
      height: widht * 0.15, backgroundColor: theme.PRIMARY,
      marginTop: 12,
      marginHorizontal: widht * 0.05
    },
    commonText: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
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
      color: theme.BLACK,
    },
    uploadFile: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.BLACK,
      marginTop: verticalScale(10),
      marginHorizontal: scale(20)
    },
    uploadImgButton: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.PAGINATION_SELECCT,
      marginHorizontal: widht * 0.05,
      paddingVertical: verticalScale(10)
    },
    buttonView: {
      height: height * 0.15, width: widht * 0.9,
      position: 'absolute', zIndex: 2,
      bottom: 0, alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center', flexDirection: "row"
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
      shadowColor: theme.LIGHT_GRAY,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9
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
      alignItems: 'center'
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
      paddingRight: 10,
      paddingVertical: 2
    },
    deleteIcon: {
      right: widht * 0.03,
      padding: 5,
      position: 'absolute',
      zIndex: 2
    },
  });
};

export default Style;