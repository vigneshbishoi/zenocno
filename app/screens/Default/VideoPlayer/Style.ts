/**
 * Video Player Component
 * @Author: Astha
 * @Date: Mon May 23 2022 15:08:31 GMT+0530 (India Standard Time)
 * @Desc: Video Player
 */

import { StyleSheet, Dimensions } from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.PRIMARY 
    },
    toolbar: {
      marginTop: 30,
      backgroundColor: theme.PRIMARY,
      padding: 10,
      borderRadius: 5,
    },
    mediaPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: theme.PRIMARY,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });
};


export default Style;
