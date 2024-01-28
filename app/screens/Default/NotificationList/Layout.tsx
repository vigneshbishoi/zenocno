/**
 * AddActivity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: AddActivity 
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Pressable,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import actionTypes from '../../../store/actions/types';
import Icon from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { SvgCssUri } from 'react-native-svg';
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
    const [isPushNotification, setPushNotification] = useState(false)
    const [isLoader, setIsLoader] = useState(false)

    // const [notiArr, setNotiArr] = useState([
    //     { key: '1', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Sent you a message", type: 'Discussion', time: '6 s' },
    //     { key: '2', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '8 m' },
    //     { key: '3', userImg: require('../../../assets/images/profileImage.png'), message: "Nikita likes Shally's Post", type: 'Discussion', time: '6 h' },
    //     { key: '4', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '1 d' },
    //     { key: '5', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Sent you a message", type: 'Discussion', time: '2 d' },
    //     { key: '6', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '6 d' }
    // ])

    const userData = useSelector((state) => state.onboardingReducer.userDetails?.data);
    const notificationData =
        useSelector((state) => state.chatReducer?.chatConversationData?.length > 0 ?
            state.chatReducer.chatConversationData[0].data : []) || [];

    useEffect(() => {
        getNotificationData()
    }, [])

    const getNotificationData = () => {
        props.actions.getChatConversation(actionTypes.GET_CHAT_CONVERSATION, {
            module: 'user_notification',
            action: 'getByUser',
            formData: {
                userId: 69 //userData?.userId
            }
        })
        setIsLoader(false)
    }

    const setNotifyType = (item) => {
        let type = item?.notificationTypeId
        if (type == 2) { //audio
            return <Image source={require('../../../assets/images/noti_comment.png')} style={styles.tagImg} />
        } else if (type == 3) {
            return <Image source={require('../../../assets/images/discussion.png')} style={styles.tagImg} />
        } else if (type == 4) {
            return <Image source={require('../../../assets/images/noti_like.png')} style={styles.tagImg} />
        } else { //type = 1 = text 
            return <Image source={require('../../../assets/images/discussion.png')} style={styles.tagImg} />
        }
    }

    const setNotifyTime = (time) => {
        let now = moment();
        let end = moment(time); // another date
        let duration = moment.duration(end.diff(now));

        //Get Days and subtract from duration
        let days = duration.asDays();
        duration.subtract(moment.duration(days, 'days'));

        //Get hours and subtract from duration
        let hours = duration.hours();
        duration.subtract(moment.duration(hours, 'hours'));

        //Get Minutes and subtract from duration
        let minutes = duration.minutes();
        duration.subtract(moment.duration(minutes, 'minutes'));

        //Get seconds
        let seconds = duration.seconds();
        //console.log("Days: ", days);
        let strTime = ""
        if (days > 0) {
            strTime = days + " d"
        } else if (hours > 0) {
            strTime = hours + " h"
        } else if (minutes > 0) {
            strTime = minutes + " m"
        } else if (seconds > 0) {
            strTime = seconds + " s"
        }
        // console.log("Hours: ",hours);
        // console.log("Minutes: ",minutes);
        // console.log("Seconds: ",seconds);
        return strTime
    }

    const renderNotification = ({ item, index }) => {
        //console.log("notification_type",item.user)
        return (
            <View style={styles.renderItemVw}>
                {item?.user?.user_details[0]?.image != null ?
                    <Image style={styles.userImage} source={{ uri: item?.user?.user_details[0]?.image }} />
                    : <Image style={styles.userImage} source={require('../../../assets/images/profileImage.png')} />}
                <View style={styles.userTypeTagVw}>
                    <SvgCssUri style={styles.tagImg} uri={item?.notification_type?.image} />
                </View>
                <View style={styles.desVw}>
                    <Text style={styles.messageTitle} numberOfLines={2}>{item.notif_desc}</Text>
                    <View style={styles.typeVw}>
                        <Text style={styles.typeName} numberOfLines={1} >{item?.notification_type?.text}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.timeText} numberOfLines={1}>{setNotifyTime(item?.notification_type?.createdAt)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("COMMONTEXT")["NOTIFICATION"]}
                isRightComponent={true}
            // isSecondIcon={true} 
            // rightSecondIcon={<Icon name="dots-three-horizontal" color={theme.BLACK} size={18} />}
            // rightSecondPress={() => props.navigation.navigate('Zen.ChatSearchPeople')}
            />
            {notificationData.length > 0 ?
                <FlatList
                    data={notificationData}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotification}
                    keyExtractor={(item, index) => item.key} />
                :
                <View style={styles.noNotificationVw}>
                    <Image source={require('../../../assets/images/no_notification.png')} style={styles.noNotificationImg} />
                    <Text style={styles.noDataTxt}>{translate("DRAWER")["NOTIFICATION"]}</Text>
                    <Text style={styles.noDataSubTxt}>{translate("NOTIFICATION")["NO_NOTIFICATION"]}</Text>
                </View>}
        </SafeAreaView>
    );
};
export default withTheme(Layout);