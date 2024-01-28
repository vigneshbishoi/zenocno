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
            backgroundColor: theme.SELECTED
        },
        noDataTxt: {
            fontSize: 20,
            color: "#333333",
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            width: "75%",
            alignSelf: 'center',
            textAlign: "center",
            marginTop: 15
        },
        noDataSubTxt: {
            fontSize: 16,
            color: '#666666',
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            width: "75%",
            alignSelf: 'center',
            textAlign: "center"
        },
        vwContainer: {
            marginHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: theme.PRIMARY,
            padding: 30,
            ...Platform.select({
                ios: {
                    shadowColor: 'grey',
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.4,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 3,
                },
            }),
        },
        closeImg: {
            width: 12,
            height: 12
        },
        notificationText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: '#333333',
            fontSize: 16,
            marginLeft: 20
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
            height: 90,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20
        },
        userImage: {
            height: 71,
            width: 71,
            borderRadius: 10,
            overflow: 'hidden'
        },
        userTypeTagVw: {
            //backgroundColor: 'skyblue',
            // borderRadius: 10,
            position: 'absolute',
            alignItems: 'center',
            // width: 21,
            //height: 21,
            justifyContent: 'center',
            bottom: 10,
            left: 52
        },
        tagImg: {
            width: 21,
            height: 21
        },
        desVw: {
            marginLeft: 10,
            marginRight: 30,
            width: '80%'
        },
        messageTitle: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.BLACK,
            fontSize: 14
        },
        typeVw: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS === 'android' ? 0 : 0
        },
        typeName: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: '#666666',
            fontSize: 12
        },
        dot: {
            color: '#666666',
            paddingHorizontal: 5
        },
        timeText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: '#666666',
            fontSize: 12
        },
        noNotificationVw: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 15,
            justifyContent: 'center'
        },
        noNotificationImg: {
            width: '100%',
            height: "50%"
        }
    });
};

export default Style;