import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { FONTFAMILY } from "../../../config/font-config";
import { isIphoneX } from 'react-native-iphone-x-helper'

/**
 * style
 */
const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.PRIMARY
        },
        notificationVw: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        modalVw: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 40 : 10,
            paddingHorizontal: 20
        },
        headerVw: {
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center'
        },
        closeImg: {
            width: 12,
            height: 12
        },
        notificationText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: '#333333',
            fontSize: 16,
            marginLeft: 10
        },
        markTextVw: {
            position: 'absolute',
            right: 0
        },
        markText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: '#108FE5',
            fontSize: 12
        },
        renderItemVw: {
            height: 94,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15
        },
        userImage: {
            height: 60,
            width: 60,
            borderRadius: 10,
            overflow: 'hidden'
        },
        userImageView: {
            height: 62,
            width: 62,
            alignItems:"center",
            justifyContent:'center',
            borderRadius: 10,
            overflow: 'hidden'
        },
        userTypeTagVw: {
            borderRadius: 10,
            position: 'absolute',
            alignItems: 'center',
            bottom:2, 
            right:2
        },
        tagImg: {
            width: 11,
            height: 11
        },
        desVw: {
            marginLeft: 10,
            marginRight: 30,
            width: '80%'
        },
        messageTitle: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: '#000000',
            fontSize: 14
        },
        typeVw: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS === 'android' ? -3 : 0
        },
        typeName: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: '#000000',
            fontSize: 14
        },
        dot: {
            color: '#666666',
            paddingHorizontal: 5
        },
        timeText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: '#666666',
            fontSize: 12
        }
    });
};

export default Style;