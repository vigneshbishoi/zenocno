/**
 * LanguageSelection style
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Styling of View
 */

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
    line: {
      height:1, 
      borderWidth: 0.5,
      marginTop: 5, 
      borderColor: theme.TAB_BG
    },
    titleView: {flex:1, 
      backgroundColor: theme.SEMI_GRAY, 
      paddingTop: 12
    },
    renderTitleView:{
      marginBottom: 18 , 
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    titleText:{
      fontSize: 12, 
      color: theme.BLACK, 
      fontWeight: '600'
    },
    feeView:{
      flexWrap:'wrap', marginHorizontal:15
    },
    feeButton:{
      padding: 12,
      borderRadius:10, 
      flexDirection:'row', 
      alignItems:'center'
    },
    searchView:{
      flexDirection:'row', 
      borderBottomWidth: 1, 
      borderColor: '#999999',
      marginHorizontal:15,
      paddingBottom: 2,
      marginBottom: 20,
      marginTop: 10,
      justifyContent:'space-between'
    },
    sliderStyle:{
      backgroundColor: theme.PRIMARY, 
      width: 17, 
      height: 17,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    saveButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#108fe5',
      borderRadius: 10,
      alignSelf:'flex-end',
      paddingHorizontal: 35,
      paddingVertical: 10,
      marginRight: 10,
      marginBottom: Platform.OS === 'ios' ? 5 : 10,
    }, 
     headerText: {
      fontSize: 15,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      // marginHorizontal: 40
    }
  });
};

export default Style;
