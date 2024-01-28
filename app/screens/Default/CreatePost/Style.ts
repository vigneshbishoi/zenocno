import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
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
      backgroundColor: theme.PRIMARY
    },
    header: {
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 60
    },
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    backImg: {
      width: 15,
      height: 15,
    },
    backImgView: {
      left: 20,
      position: 'absolute'
    },
    userImgView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 20,
    },
    profileImage: {
      width: 49,
      height: 49,
      borderRadius: 10,
      overflow: 'hidden'
    },
    headerText: {
      color: theme.BLACK,
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    disText: {
      color: theme.SUB_TITLE,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      marginTop: Platform.OS === 'android' ? -4 : -2
    },
    typeContainer: {
      marginLeft: 10,
    },
    productItem: {
      paddingHorizontal: 18,
      backgroundColor: theme.PRIMARY,
      borderColor: 'gray',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 30,
      height: 40
    },
    typeIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    typeName: {
      color: theme.GRAY_BLACK,
      paddingLeft: 5,
      fontSize: 13,
    },
    selected: {
      backgroundColor: theme.SECONDARY,
      borderWidth: 0,
    },
    placeholderText: {
      color: theme.SEARCH_TITLE
    },
    selectedImage: {
      marginTop: 15,
      height: 50,
      width: 50,
      borderRadius: 10,
      marginRight: 10
    },
    closeImageVw: {
      alignSelf:'flex-end',
      padding:10,
    },
    postVw: {
      backgroundColor: theme.PRIMARY,
      paddingVertical: 8,
    },
    titleView: {
      backgroundColor: theme.PRIMARY,
      borderBottomWidth:0.5, 
      borderBottomColor:'#999999', 
      marginHorizontal:15 
    },
    postText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      textAlignVertical: 'top',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    photoVideoButton: {
      borderRadius: 10,
      marginHorizontal:20,
      backgroundColor: theme.PRIMARY,
      justifyContent: 'center',
      height: 50,
      marginVertical: 5,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    photoVideoView: {
      margin: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    albumImg: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      tintColor: theme.ICON_TINT
    },
    albumText: {
      color: theme.GRAY_BLACK,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    albumDesText: {
      color: theme.SUB_TITLE,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    postButton: {
      borderRadius: 10,
      paddingVertical: 12,
      marginTop: 5,
      marginBottom: 30,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.SECONDARY
    },
    post: {
      color: theme.PRIMARY,
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_REGULAR

    },
    txtContainer: {
      paddingRight: 10,
      paddingLeft: 15,
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: theme.PRIMARY,
      height: 50,
      marginVertical: 5,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    },
    ruleTxt: {
      textDecorationLine: 'underline',
      color: theme.SECONDARY,
      fontSize: 13,
      fontFamily: FONTFAMILY.POPPINS_LIGHT
    },
    mediaView: {
      flexDirection:'row', 
      alignItems:"center",
      justifyContent:"space-between", 
      backgroundColor:theme.PRIMARY,
      paddingHorizontal:20,
      marginTop:10, 
      marginBottom:10,
    },
    checkView: {
      borderWidth:1, 
      borderColor: theme.SEARCH_TITLE, 
      borderRadius:3, 
      height:17, 
      width:17
    },
    anonymousText: {
      fontSize:12, 
      marginLeft:5, 
      fontFamily:FONTFAMILY.POPPINS_REGULAR, 
      color:theme.SUB_TITLE,
    },
    selectionTabView: {
      backgroundColor:"white", 
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',      
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
      borderTopLeftRadius:15, 
      borderTopRightRadius:15,  
      paddingVertical:15,
      paddingHorizontal:10
    }
  });
};

export default Style;
