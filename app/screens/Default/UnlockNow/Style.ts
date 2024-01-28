/**
 * UnlockNow style
 * @Author: Anand R
 * @Date: Thu Dec 23 2021 14:41:36 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rgba(255,255,255,0.5)',
      justifyContent:'center',
      alignItems:'center'
    },
  });
};

export default Style;
