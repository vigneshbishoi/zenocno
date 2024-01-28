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
    searchVw: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
      marginHorizontal: 20,
      marginVertical: 15,
      borderRadius: 13,
      paddingVertical: Platform.OS === 'ios' ? 13 : -5,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    searchText: {
      marginRight: 50,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      width: '80%',
      marginTop: Platform.OS === 'ios' ? 0 : 5
    },
    noActivityText: {
      fontSize: 13,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
    },
    emptyVw: {
      flex: 1,
      justifyContent: 'center'
    },
    newsItemContainer: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 15,
      marginTop: 10,
      flexDirection: 'row'
    },
    itemImage: {
      width: 101,
      height: 101,
      borderRadius: 15
    },
    itemDescriptionContainer: {
      width: '60%',
      marginHorizontal: 7,
      marginTop: 10,
      justifyContent:'space-between'
    },
    newsTitleText: {
      fontSize: 15,
      color: theme.BLACK,
      fontWeight:'600',
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    dateTimeText: {
      color: theme.SUB_TITLE,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
  },
  shareText: {
    color: theme.BLACK,
    fontSize: 12,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    marginLeft: 10,
    fontWeight:'500'
},
    expressText: {
      color: theme.SEARCH_TITLE,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
  },
  dot: {
    width:2, 
    height:2, 
    borderRadius:2, 
    backgroundColor: theme.SEARCH_TITLE, 
    marginHorizontal: 8
  },
  dots: {
    width:3, 
    height:3, 
    borderRadius:3, 
    backgroundColor: theme.SUB_TITLE, 
    marginBottom: 2
  },
  dotsView:{
    position:"absolute", 
    right:0,
    padding:3, 
    paddingHorizontal:5,
    marginRight: -2
  },
  optionsView:{
    marginTop:8,
    paddingVertical: 15, 
    paddingHorizontal: 20, paddingRight: 30, 
    borderColor:'#dfdbdb',
    width: widht * 0.38, position: 'absolute',
    right: 20,
    backgroundColor: theme.PRIMARY,
    borderRadius: widht * 0.03,
    padding: widht * 0.035,
    borderWidth: 1.5
  },
  creditsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
    backgroundColor:theme.PRIMARY,
    marginTop:10,
    paddingHorizontal:50
  },
  creditLinkText:{
    fontSize:14,
    color:theme.SUB_TITLE,
    fontFamily:FONTFAMILY.POPPINS_REGULAR
  }
  });
};

export default Style;
