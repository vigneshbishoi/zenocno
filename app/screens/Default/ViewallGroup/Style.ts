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

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.SELECTED
    },
    dietImg: {
      width: widht,
      height: height,
      resizeMode: 'contain'
    },
    headerView: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      //  marginTop: Platform.OS === 'ios' ? 40 : 15
    },
    closeImageVw: {
      position: 'absolute',
      top: 0,
      right: 20,
      width: 30,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeImage: {
      width: 10,
      height: 10
    },
    backVw: {
      position: 'absolute',
      left: 20
    },
    supportTxt: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16,
      color: theme.GRAY_BLACK,
      textAlign: 'center'
    },
    searchVw: {
      position: 'absolute',
      right: 20
    },
    searchImgVw: {
      width: 20,
      height: 20
    },
    groupContentContainer: {
      paddingVertical: 20,
      },
    groupItemCVw: {
      backgroundColor: theme.PRIMARY,
      borderRadius: 20,
      width: '45%',
      margin: 10,
      elevation: Platform.OS == 'ios' ? .4 : 5,
      shadowColor: theme.SUB_TITLE,
      shadowOffset: {
        width: 0,
        height: Platform.OS == 'ios' ? 1 : 10,
      },
      shadowOpacity: 0.1,
    },
    groupImg: {
      width: '100%',
      height: 110,
      overflow: 'hidden',
      borderRadius: 20
    },
    pinImg: {
      width: 18,
      height: 18,
      position: 'absolute',
      top: 8,
      left: 8
    },
    grpName: {
      width: 120,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 13,
      color: theme.GRAY_BLACK,
      textAlign: 'center',
      height: 38
    },
    userIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain'
    },
    totUser: {
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 11,
      color: theme.SUB_TITLE,
      paddingHorizontal: 5
    },
    joinBTN: {
      width: 59,
      height: 31,
      backgroundColor: theme.SECONDARY,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5
    },
    joinTxt: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 12,
      color: theme.PRIMARY,
    },
    textInput: {
      width: '90%',
      height: 40,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      paddingHorizontal: 15
    },
    descriptionText: {
      marginVertical:'3%', 
      fontFamily:'poppins', 
      fontSize:12, 
      color:theme.GRAY_BLACK
    },
    seperatorView: {
      borderBottomColor:'#e4e6ea', 
      borderBottomWidth:3
    },
    numberText: {
      fontFamily:'poppins', 
      fontSize:12, 
      color:theme.GRAY_BLACK, 
      marginLeft:3
    },
    pinImg: {
      height:17, 
      width:17, 
      position:'absolute', 
      top: Platform.OS == 'android' ? 4 : 8, 
      left:2
    },
    imageView: {
      flexDirection:"row", 
      alignItems:"center"
    },
    iconImg: {
      height:60, 
      width:60, 
      borderRadius:5
    },
    likeView: {
      flexDirection:'row', 
      marginTop:'2%', 
      alignItems:"center"
    },
    hospitalText: {
      fontFamily:'poppins', 
      fontSize:15, 
      color:theme.GRAY_BLACK
    },
    noActivityText:{
      fontSize:13,
      color:theme.GRAY_BLACK,
      fontFamily:FONTFAMILY.POPPINS_MEDIUM,
      textAlign: 'center',
     },
     emptyVw:{
      height:height - 150,
      justifyContent:'center',
      alignItems: 'center'
     },
   
  });
};

export default Style;
