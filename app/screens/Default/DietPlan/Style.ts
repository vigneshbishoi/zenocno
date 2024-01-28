/**
 * DietPlan style
 * @Author: Anand R
 * @Date: Fri Dec 17 2021 13:51:07 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from '../../../config/font-config';
/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED,

    },
    header: {
      flex: 0.99,
      backgroundColor: theme.SELECTED,
    },
    headerVw: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 20
    },
    backVw: {
      width: 20,
      marginLeft: 30
    },
    footer: {
      backgroundColor: theme.SELECTED,
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
    },
    trackerContainer: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    trackVw: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 10
    }

  });
};

export default Style;
