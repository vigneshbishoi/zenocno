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
            backgroundColor: theme.PRIMARY
        },
        containerVw: {
            flex:1,
            marginTop: -22,
            borderTopLeftRadius: 35,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            paddingBottom: 15,
            borderTopRightRadius: 35,
            backgroundColor: theme.PRIMARY
        },
        userBasicInfoVw:{ 
            backgroundColor: '#f3faff',
             paddingBottom: 160 
    },
        backgroundVw: {
            flex: 1,
        },
        bgImage: {
            width: '100%',
            height: 250,
        },
        headerVw: {
            flexDirection: "row",
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 30 : 8,
            paddingLeft:10
        },
        titleText:{
            fontSize:20,
            color:theme.SECONDARY,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            alignSelf:'center',
            marginTop:15
        },
        
        planNameText:{
            fontSize:20,
            color:theme.SECONDARY,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            marginHorizontal:20,
            alignSelf:'center',
            marginTop:20
        },
        planEstimateVw:{
            backgroundColor:'#dbfff8',
            flexDirection:'row',
            alignItems:'center',
            width:'70%',
            paddingVertical: Platform.OS === 'ios' ? 10 :8,
            marginVertical:Platform.OS === 'ios' ? 7 :5
        },
        planRsText:{
            fontSize:32,
            color:theme.GRAY_BLACK,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            marginLeft:20,
            marginRight:5
        },
        userImageView:{
            width:42,
            height:42,
            backgroundColor:'#dbfff8',
            borderColor:theme.PRIMARY,
            borderWidth:2,
            borderRadius:21,
            overflow:'hidden',
            marginTop:-50,
            alignSelf:'center',
            zIndex:80
        },
        userPlanImage:{
            width:'100%',
            height:'100%',
            resizeMode:'cover'
        },
        planShortDesText:{
            fontSize:14,
            color:'#515151',
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            alignSelf:'center',
            marginHorizontal:20,
            textAlign:'center',
            marginTop:Platform.OS === 'ios' ? -2:-7
        },
        carouselVw:{ 
            zIndex: 100,
            marginTop: Platform.OS === 'android' ? -153 : -150 
        },
        benifitTitle:{
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            fontSize:16,
            color:theme.GRAY_BLACK,
            marginHorizontal:20,
            marginTop:25
        },
        successImage:{
            width:widht -40,
            borderRadius:15,
            height:130,
            
        },
        featureItemContainer:{
            flexDirection:'row',
            alignItems:'center',
            marginHorizontal:20,
            marginTop:15
        },
        featureItemText:{
            fontSize:13,
            color:theme.SUB_TITLE,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            marginLeft:5
        },
        subscribeButtonVw:{
            backgroundColor:theme.SECONDARY,
            marginHorizontal:40,
            paddingVertical: Platform.OS === 'ios' ? 15 : 13,
            alignItems:'center',
            borderRadius:10,
           marginVertical:20,
        },
        subscribeNowText:{
            fontSize:14,
            color:theme.PRIMARY,
            fontFamily:FONTFAMILY.POPPINS_REGULAR
        },
        planPerTime:{
            fontSize:15,
            color:theme.GRAY_BLACK,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            width:'35%',
            marginLeft:5
        },
        perMonthOff:{ 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: Platform.OS === 'ios' ? 0 : -4 
        },
        totalYear:{
            fontSize:18,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            color:theme.SUB_TITLE
        },
        offerItemContainer:{
            borderRadius:12,
            backgroundColor:theme.PRIMARY,
            borderWidth:2,
            borderColor:'#d6d6d6',
            margin:10
        },
        extraDropShadow:{
            borderColor:theme.SECONDARY,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
        },
        subscribeOffer:{
            backgroundColor:theme.SECONDARY_OPACITY,
            alignItems:'center',
            paddingVertical:8,
            overflow:'hidden',
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10
        },
        offerDescVw:{
            paddingHorizontal:25,
            paddingTop:15,
            paddingBottom: Platform.OS === 'ios' ? 15 : 10
        },
        disRsText:{
            color:'#acacac',
            fontSize:18,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            textDecorationLine:'line-through'
        },
        perMonthVw:{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginTop: Platform.OS === 'ios' ? -5 : -8 
        },
        rsText:{
            color:theme.GRAY_BLACK,
            fontSize:35,
            fontFamily:FONTFAMILY.POPPINS_REGULAR
        },
        txtContainer: {
            paddingRight: 10,
            paddingLeft: 15,
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: theme.PRIMARY,
            height: 50,
            marginVertical: 6,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
      
          },
          dropOfferView: {
            flex: 1,
            marginHorizontal: 23,
            padding: 30,
            backgroundColor: theme.PRIMARY,
            borderRadius: 20,
          },
          selectCard: {
            borderRadius: 10,
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === 'ios' ? 15 : 13
          },
          iconStyle:{ 
            position: "absolute", 
            top: Platform.OS === 'ios' ? 10 : 5, 
            right: 0, 
            color: theme.GRAY_BLACK 
        }
    });
};

export default Style;
