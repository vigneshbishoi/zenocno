/**
 * AddActivity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: AddActivity 
 */
import React, { useState } from 'react';
import style from './Style';
import {
    Pressable,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    Switch
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import translate from "../../../utils/Text"
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
    route: object
}

const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    let data = useSelector((state) => state.onboardingReducer.userDetails);
    const [isPushNotification, setPushNotification] = useState(data.data.user.notifications == 1 ? true : false) 

    const toggleNotification = () => {
        props.actions.toggleNotificationAccount(actionTypes.NOTIFICATION_TOGGLE, {
            module: 'user',
            action: 'update_notification',
            formData: {
                userId: userId,
            }
        });
        data.data.user.notifications = data.data.user.notifications == 1 ? 0 : 1
        props.actions.callUserDetailsData("userDetails", data, actionTypes.ADD_USER_DETAILS_DATA)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("DRAWER")["NOTIFICATION"]}
                isRightComponent={false}  />
            <View style={[styles.vwContainer, { marginTop: 25 }]} >
                <View style={styles.notificationVw} >
                    <Text style={styles.pushNotificationText} numberOfLines={1} >{translate("NOTIFICATION")["PUSH"]}</Text>
                    <Switch
                        value={isPushNotification}
                        style={styles.switchVw}
                        trackColor={{ false: "#767577", true: theme.SECONDARY }}
                        thumbColor={isPushNotification ? theme.PRIMARY : theme.PRIMARY}
                        onValueChange={() => {
                            setPushNotification(!isPushNotification)
                            toggleNotification()
                        }}
                    />
                </View>
                <Text style={styles.desText} >{translate("NOTIFICATION")["NOTIFICATION_DESCRIPTION"]}</Text>
            </View>
        </SafeAreaView>
    );
};
export default withTheme(Layout);