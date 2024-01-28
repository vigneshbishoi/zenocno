/**
 * FoodSearch style
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 19:39:18 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 0.99,
      backgroundColor: theme.PRIMARY,
    },
    footer: {
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      justifyContent: 'center',
      padding: 20,
      alignContent: "center",
    },
    steps: {
      flex: 0.7,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    counter: {
      height: 10,
      width: 10,
      borderRadius: 30,
      marginHorizontal: 10,
      backgroundColor: theme.SECONDARY,
      opacity: 0.30,
    },
    selectedCounter: {
      height: 15,
      width: 15,
      borderRadius: 30,
      marginHorizontal: 10,
      backgroundColor: theme.SECONDARY,
      opacity: 1
    }
  });
};

export default Style;
