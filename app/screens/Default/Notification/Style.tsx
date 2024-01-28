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
        notificationVw: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        pushNotificationText: {
            fontSize: 14,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        desText: {
            fontSize: 12,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginTop: 25
        },
        switchVw: {
            position: 'absolute',
            right: 0
        },
    });
};

export default Style;