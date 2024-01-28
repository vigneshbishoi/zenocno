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
    userProfileVw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      //marginEnd: 20,
      width:"75%",
    },
    userName: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
    },
    container: {
      flex: 1,
    },
    float: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    top: {
      width: '100%',
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
      color: theme.BLACK,
    },
    local: {
      flex: 1,
    },
    remoteContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    remote: {
      width: 120,
      height: 120,
    },
    buttonView: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginHorizontal:20,
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: theme.SECONDARY
    },
    buttonCloseView: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginHorizontal:20,
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: 'red'
    },
    bottonLayoutView: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      position: "absolute",
      width:'100%',
      bottom:36,
    }
  });
};

export default Style;
