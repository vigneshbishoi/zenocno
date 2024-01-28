/**
 * ViewStory style
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 15:37:31 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import {StyleSheet, Dimensions} from 'react-native';
import {FONTFAMILY} from '../../../config/font-config';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: '#444444' 
    },
    headerVw: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginBottom:5
    },
  });
};

export default Style;
