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
      backgroundColor: theme.PRIMARY
    },
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: widht
    },
    backVw: {
      position: "absolute",
      left: 0,
    },
    calendarIconVw: {
      position: "absolute",
      left: 20,
      paddingHorizontal:10
    },
    monthName: {
      fontSize: 18,
      color: "black", 
    },
    addButtonVw: {
      position: "absolute",
      right: 40
    },
    addButton: {
      height: 30,
      width: 30,
    },
    bottomContainer: {
      backgroundColor: theme.PRIMARY,
      paddingBottom: 10
    },
    bottomVw: {
      backgroundColor: '#d6eeff',
      borderRadius: 8,
      marginHorizontal: 20,
      paddingVertical: 13,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center'
    },
    bottomTextVw: {
      fontSize: 11,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      textAlign: 'center',
      width:'80%'
      
    },
    closeIconVw: {
      position:'absolute',
      right:0,
      padding:8
    },
    closeIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    checkCircleVw: {
      width: 17,
      height: 17,
      borderRadius: 8.5,
      borderWidth: 1,
      borderColor: 'grey'
    },
    closeTickImg: {
      width: 10,
      height: 4,
      resizeMode: 'contain'
    },
    eventVw: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    darkLine: {
      width: 6,
      backgroundColor: '#18c7a1',
      height: '100%'
    },
    eventIcon: {
      tintColor: '#18c7a1',
      height: 18,
      width: 18,
      marginLeft: 8,
      resizeMode: 'contain'
    },
    eventName: {
      color: '#000',
      fontSize: 12,
      marginLeft: 8,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      width: '57%'
    },
    eventNavVw: {
      width:'23%',  
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      position:'absolute',
      right:2,
    },
    eventTime: {
      color: theme.GRAY_BLACK,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginRight: 7
    },
  });
};

export default Style;