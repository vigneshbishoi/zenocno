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
            marginTop: -30,
            borderTopLeftRadius: 35,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            paddingVertical: 15,
            borderTopRightRadius: 35,
            backgroundColor: '#f3faff'
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
        planItemContainer:{
            backgroundColor:theme.PRIMARY,
            borderRadius:15,
            margin:15,
            paddingVertical: Platform.OS === 'ios' ? 18 : 15,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
            
        },
        planNameText:{
            fontSize:16,
            color:theme.SECONDARY,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            marginHorizontal:20,
            marginBottom:-15
        },
        planEstimateVw:{
            backgroundColor:'#dbfff8',
            flexDirection:'row',
            alignItems:'center',
            width:'70%',
            paddingVertical: Platform.OS === 'ios' ? 10 :8,
            marginVertical:Platform.OS === 'ios' ? 7 :5,
            borderTopWidth:2,
            borderBottomWidth:2,
            borderColor:'#b8fff2'
        },
        planRsText:{
            fontSize:32,
            color:theme.GRAY_BLACK,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
            marginLeft:20,
            marginRight:5
        },
        planImagebgVw:{
            width:115,
            height:115,
            backgroundColor:'#dbfff8',
            borderRadius:115/2,
            marginLeft:'-10%',
            overflow:'hidden'
        },
        planImage:{
            width:'100%',
            height:'100%',
            resizeMode:'cover'
        },
        planShortDesText:{
            fontSize:13,
            color:theme.GRAY_BLACK,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            marginLeft:20,
            width:'55%',
            marginTop:-10
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
            marginLeft:8
        },
        subscribeButtonVw:{
            backgroundColor:theme.SECONDARY,
            marginHorizontal:20,
            paddingVertical: Platform.OS === 'ios' ? 15 : 13,
            alignItems:'center',
            borderRadius:10,
            marginTop:17,
            marginBottom:13,
        },
        subscribeNowText:{
            fontSize:14,
            color:theme.PRIMARY,
            fontFamily:FONTFAMILY.POPPINS_REGULAR
        },
        planPerTime:{
            fontSize:12,
            color:theme.SUB_TITLE,
            fontFamily:FONTFAMILY.POPPINS_REGULAR,
            width:'25%'
        }
    });
};

export default Style;
