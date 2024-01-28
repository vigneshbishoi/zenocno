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
    saveButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PAGINATION_SELECCT,
      borderRadius: 15,
      height: verticalScale(57)
    },
    symptomsButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.PRIMARY,
      borderWidth: 1,
      borderColor: theme.PAGINATION_SELECCT,
      borderRadius: 15,
      height: verticalScale(57)
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
      marginBottom: 12,
      marginHorizontal: widht * 0.05
    },
    commonText: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    saveText: {
      fontSize: 12,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    headerSaveBtn:{
      padding:10,
      borderRadius: 10 ,
      marginLeft: 15, 
      backgroundColor: theme.PAGINATION_SELECCT
    },
    uploadImageDesc: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SEARCH_TITLE,
      marginTop: 2,
    },
    uploadImage: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SUB_TITLE,
      marginTop: 20
    },
    uploadFile: {
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.BLACK,
      marginTop: verticalScale(10),
      marginHorizontal: scale(20)
    },
    uploadImgButton: {
      marginTop:30,
      backgroundColor: 'rgba(16,143,229, 0.08)',
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderStyle:'dashed',
      borderColor: theme.PAGINATION_SELECCT,
      marginHorizontal: widht * 0.04,
      paddingVertical: verticalScale(20)
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
    iconStyle: {
      height: scale(98),
      width: scale(98),
      borderRadius: scale(10),
      overflow: 'hidden',
    },
    saveBtn: {
      fontSize: 16,
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
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
    }
    ,
    extraInputStyle: {
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
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
    addPhotoModalContainer: {
      marginTop: height * 0.75,
      width: '100%',
      alignSelf: 'center',
      marginBottom: -10,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    cameraGalleryText: {
      color: theme.BLACK,
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginLeft: 8
    },
    itemView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15
    },
    addPhototext:{
      color: theme.BLACK,
      fontSize: 24,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      marginLeft: 20,
      marginBottom:20,
      
    },divederstyle:{
      borderBottomWidth:1,
      marginHorizontal:15,
      borderBottomColor:'#cccccc'
      }
  });
};

export default Style;
