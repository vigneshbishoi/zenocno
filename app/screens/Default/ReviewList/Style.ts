/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */

import { StyleSheet, Dimensions , Platform} from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from '../../../lib/isIphoneX';

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    
    
    recentText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
      paddingVertical: 8,
      marginHorizontal:5,
    },
    searchVw: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:10 ,
      paddingHorizontal:10,
      backgroundColor: theme.SELECTED,
      borderRadius:10
    },
    searchInput: {
      width: '100%',
      paddingHorizontal: 8,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
    },
    chatUserName: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 14,
    },
    chatMsg: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_LIGHT,
      fontSize: 12,
    },
    newChatIndicator: {
      height: 10,
      width: 10,
      backgroundColor: theme.SECONDARY,
      borderRadius: 5,
      marginVertical: 8
    },
    userReviewItemContainer:{
      padding:15,
      marginHorizontal: 20,
      marginVertical:10,
      backgroundColor:theme.PRIMARY,
      borderRadius:15,
      width:widht-40
    },
    reviewUserImage:{
      width:50,
      height:50,
      borderRadius:10,
      overflow:'hidden',
    },
    reviewuserNameText:{
      fontSize:16,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    codeContainer:{
      alignItems:'center',
      flexDirection:'row'
    },
    noReviewText:{
      color:theme.SUB_TITLE,
      fontFamily:FONTFAMILY.POPPINS_REGULAR,
      fontSize:14,
    },
  });
};

export default Style;
