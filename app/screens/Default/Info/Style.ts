/**
 * Info style
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 14:36:46 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import {StyleSheet, Dimensions} from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.PRIMARY
    },
    closeIconContainer:{
      position: 'absolute', zIndex: 999, top: 50, right: 5, overflow: 'visible'
    },
    subContainer: {
      marginTop:15,
      paddingHorizontal: 20,
    },
    careBenefitsText:{
      color: theme.BLACK,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      marginBottom:23
    },
    rowContainer:{
      flexDirection:'row', marginBottom:11
    },
    careBenefitsSubText:{
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginLeft:11.4
    },
    dividerLine: {
      backgroundColor: theme.BORDER_GREAY,
      height: 1,
      width:'100%',
      alignSelf:'center'
    },
    alongBestDr: {
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop:15
    },
    alongBestSubText: {
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      // marginTop:15,
      marginLeft:10,
      marginBottom:35
    },
    howItWorkText:{
      color: theme.BLACK,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      marginBottom:10
    },
    howItWorkDescription:{
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.REGULAR,
      marginBottom:10
    },
    timeLineContainer:{
      flexDirection: 'row', marginTop: 13, width: '90%'
    },
    timeLineStep:{
      color: theme.BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.MEDIUM,
      marginBottom:3
    },
    timeLineSubText:{
      color: theme.SUB_TITLE,
      fontSize: 12,
      fontFamily: FONTFAMILY.MEDIUM,
      // marginBottom:3
    },
    featureDesVw: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    topBorder: {
        borderTopWidth: 1,
        borderTopColor: theme.BORDER_COLOR,
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: theme.BORDER_COLOR,
    },
    featureTitleText: {
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        fontSize: 14,
        color: theme.GRAY_BLACK,
        marginTop:9
    },
    rightArraw: {
      top:12, 
        right: 0,
        transform: [{ rotateY: '180deg' }],
        position: 'absolute'
    },
    expandSubText: {
      fontFamily: FONTFAMILY.REGULAR,
      fontSize: 12,
      color: theme.SUB_TEXT,
   },
   adjustContainer:{
    height: 300, width: '100%'
   }
  });
};

export default Style;
