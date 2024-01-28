/**
 * Community Filter Component
 * @Author: Astha
 * @Date: Tue May 3 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Dilsplay Filter List
 */

 import { StyleSheet, Dimensions } from 'react-native';
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
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 60
  },
    topicContainer: {
      marginRight: 10,
    },
    topicItem: {
      paddingHorizontal: 18,
      backgroundColor: theme.PRIMARY,
      borderColor: '#B8B8B8',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 30,
      height: 40
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
      fontFamily: FONTFAMILY.MEDIUM,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'aliceblue',
      paddingVertical: 20,
      marginTop: 10
    },
    headerText: {
      marginLeft: 15,
    },
    headerImg: {
      marginLeft: 10
    },
    titleText: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.MEDIUM,
      paddingHorizontal: 25,
    },
    interestItemContainer: {
      margin: 10,
    },
    img: {
      width: 54,
      height: 54,
      borderRadius: 15,
    },
    text: {
      fontSize: 12,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.MEDIUM,
      textAlign: 'center',
      width: 50,
      paddingVertical: 2,
    },
    selected: {
      backgroundColor: theme.SECONDARY_OPACITY,
      borderWidth: 0,
    },
 
   });
 };
 
 export default Style;
 