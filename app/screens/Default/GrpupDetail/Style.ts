import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONTFAMILY } from '../../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    },
    backVw: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 12,
      marginTop: 10,
      height: 32,
      width: 32,
      borderRadius: 30,
      backgroundColor: 'lightgray'
    },
    menuIcon:{ 
      position: 'absolute',
      right: 10,
      height:50, 
      width: 50, 
      alignItems:'center',
      justifyContent:'center' 
  },
    containerVw: {
      marginTop: -25,
      // position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 35,
      overflow: 'hidden',
      width: '100%',
      //  paddingTop: 20, 
      height:'100%',
      borderTopRightRadius: 35,
    },
    header: {
      backgroundColor: theme.PRIMARY,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 60
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundVw: {
      flex: 1,
      // marginHorizontal: 5,
      // marginTop: 5,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      resizeMode: 'contain',
    },
    bgImage: {
      width: '100%',
      height: 237,
      // borderTopLeftRadius: 40,
      // borderTopRightRadius: 40,
      // overflow: "hidden"
    },
    headerVw:{
       flexDirection: "row",
        alignItems: 'center',
         marginTop: Platform.OS === 'ios' ? 30 : 8 
  },
    cancerTypeWarriorTitle: {
      color: theme.GRAY_BLACK,
      textAlign: 'center',
      fontSize: 20,
      paddingTop: 20,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    locationView: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginHorizontal: 10,
      marginVertical: Platform.OS === 'ios' ? 6 : 0,
    },
    locationImg: {
      width: 15,
      height: 15,
      tintColor: theme.SUB_TITLE,
      resizeMode: 'contain'
    },
    locationText: {
      color: theme.SUB_TITLE,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    inviteButton: {
      backgroundColor: 'dodgerblue',
      borderRadius: 20,
      paddingVertical: 20,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 15,
    },
    inviteText: {
      color: theme.PRIMARY,
      fontWeight: 'bold',
      fontSize: 16
    },
    memberContainerStyle: {
      paddingVertical: 5,
    },
    memberItemView: {
      margin: 5
    },
    memberImg: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
    },
    shareOrAskTxt: {
      width: '80%',
      fontSize: 16,
      marginHorizontal: 10,
      fontFamily: FONTFAMILY.POPPINS_LIGHT,
      color: theme.SEARCH_TITLE
    },
    writeSomeView: {
      borderColor: '#d6e4ff',
      borderWidth: 1,
      backgroundColor: theme.PRIMARY,
      flexDirection: 'row',
      marginVertical: 15,
      height: 51,
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 15

    },
    line: {
      backgroundColor: theme.GRAY_BLACK,
      width: 1,
      height: 25,
      marginHorizontal: 3,
    },
    photoView: {
      position: 'absolute',
      flexDirection: 'row',
      right: 15,
    },
    photoIcon: {
      height: 21,
      width: 24,
      resizeMode: 'contain'
    },
    typeContainer: {
      marginLeft: 10,
    },
    productItem: {
      paddingHorizontal: 18,
      backgroundColor:theme.PRIMARY,
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
      backgroundColor: "dodgerblue",
      borderWidth: 0,
    },
    topicContainer: {
      marginRight: 10,
    },
    topicItem: {
      paddingHorizontal: 18,
      backgroundColor: theme.PRIMARY,
      borderColor: '#B8B8B8',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 11,
      height: 42
    },
    topicIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    topicTitle: {
      paddingLeft: 5,
      fontSize: 14,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    descriptionView: {
      alignItems: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor:theme.PRIMARY
    },
    descriptionTitleText: {
      color: theme.GRAY_BLACK,
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    descriptioneText: {
      marginTop: 5,
      color: theme.SUB_TITLE,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    profileImage:{ 
      width: 32, 
      height: 32,
       borderRadius: 10,
        marginLeft: 7 
    },
    seeMoreTxt: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    joinGroupButton: {
      backgroundColor: theme.SECONDARY,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 133,
      height: 49
    },
    joinGroupText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 16
    },
    txtShare: {
      marginLeft: 10,
      fontSize: 15,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
    menuText: {
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,      
      marginLeft: 10
    },
    leaveGpIcon: {
      marginRight: 5,
    },
    centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent:"center",
      paddingHorizontal: 25,
      backgroundColor: "rgba(0,0,0,0.54)"
    },
    modalView: {
      backgroundColor:theme.PRIMARY,
     borderRadius: 10,
      height:78,
      width:297,      
      alignItems:"center",
      justifyContent:"center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    menuContainer: {
      position: 'absolute',
      paddingHorizontal: 14,
      paddingVertical: 5,
      right: 10,
      width: 132,
      borderRadius: 10,
      marginTop: Platform.OS === 'ios' ? 75 : 48,
      backgroundColor: theme.PRIMARY
    },
    menuItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 30,
      width: '100%'
    },
    menuItemIcon: {
      width: 17,
      height: 17, 
    },
    likesText: { 
      marginLeft: 3, 
      fontSize: 15, 
      color: theme.SUB_TITLE, 
      fontFamily: FONTFAMILY.POPPINS_MEDIUM 
    },
    likesView: { 
      // width: '75%', 
      flexDirection: "row", 
      alignItems: "center" 
    },
    aboutImg: { 
      height: 18, 
      width: 18 
    },
    btnView: { 
      position:'absolute', 
      right:0
    },
    likesMainView: { 
      width:'100%', 
      marginHorizontal: 0, 
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: Platform.OS === 'ios' ? 6 : 0,
    },
    headerContainerView: { 
      backgroundColor: theme.withTheme,
      borderTopLeftRadius: 0, 
      borderTopRightRadius: 0,
      marginTop: -25,
      bottom: 0,
      overflow: 'hidden',
      width: '100%',
      height:'100%',
    },
    menuStyle: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#dcd8d8',
      marginTop: 30,
      marginLeft:-20,
      paddingHorizontal: 10,
      justifyContent:"center",
      alignItems:"center",
      height: 180
    },
    menuPlaceholderImgVw: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    shareIcon: { 
      resizeMode: 'contain', 
      width: 13, 
      height: 17 
    },
    pinIcon: { 
      marginTop: Platform.OS == 'android' ? 4 : 2, 
      transform: [{ rotate: '45deg' }]
    },
    menuItemView: { 
      flexDirection: 'row'
    }
  });
};

export default Style;
