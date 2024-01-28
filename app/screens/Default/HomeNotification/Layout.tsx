/**
 * AddActivity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: AddActivity 
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
    Pressable,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    Switch,
    FlatList,
    Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import translate from "../../../utils/Text"
import StaticImg from "../../../assets/images/homeNotification.svg"
import NoImage from "../../../assets/images/NoImage.svg"
import AppHeader from '../../../components/CommonInput/appHeader';
import { RootState } from '../../../store';
import { SvgCssUri } from 'react-native-svg';
import { FONTFAMILY } from '../../../config/font-config';
import { openUserProfileScreen } from '../../../utils/communityFunction';
import request from '../../../services/client';
import { dateDiffInDaysMonthsYears } from '../../../utils/commonFunction';

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
    const [notificationData, setNotificationData] = useState([])
    const [updateData, setUpdateData] = useState(true)
    const [loader, setLoader] = useState(true)
    const communityNotification =
        useSelector((state: RootState) => state.storiesReducer?.notification);

    useEffect(() => {
        getNotification()
        setTimeout(() => {
            setLoader(false)
        }, 6000);
    }, []);

    useEffect(() => {
        if (communityNotification?.length > 0) {
            setNotificationData(communityNotification[0]?.data)
            setTimeout(() => {
                setLoader(false)
            }, 200);
        }
    }, [communityNotification]);

     //Api Call
    const getNotification = () => {
        props.actions.getNotification(actionTypes.GET_NOTIFICATION, {
        module: 'notification_type',
        action: 'getNotificationHistory',
        });
    }

    const NotificationPress = async (item) => {
        const formDataNew = new FormData();
        formDataNew.append('notificationTypeId', item?.notificationTypeId);
        formDataNew.append('notification_id', item?.id);
        props.actions.getNotificationRead(actionTypes.GET_NOTIFICATION_READ, {
          module: 'user_notification',
          action: 'read_notification',
          formData: JSON.stringify({
            notificationTypeId : item?.notificationTypeId,
            notification_id : item?.id
            // formDataNew
          })
        });
        if (item?.notificationTypeId > 1 && item?.notificationTypeId < 6) {
          props?.navigation?.navigate('Zen.CommunityComment', {
            id: item.cancerHealingStoryId,
          })
        }
        if(item?.notificationTypeId == 10)
        {
          props.navigation.navigate('Zen.MyAppointment')
        }
        if(item?.notificationTypeId == 8)
        {
          props.navigation.navigate('Zen.ActivityShow')
        }
        if(item?.notificationTypeId == 6)
        {
          try {
            let getData = await request({
              method: 'get', data: {
                module: 'cancerHealingStory',
                action: 'stories_all_in_one?page=1',
                formData: {
                  story_id: item?.cancerHealingStoryId
                }
              }
            })
    
            if (getData?.data?.data != undefined && getData?.data?.data != null) {
              openUserProfileScreen(getData?.data?.data, props.navigation, theme, () => { })
            }
          } catch (error) {
    
          }
        }
        if (item?.notificationTypeId == 7) {
          try {
            let eventData = await request({
              method: 'get', data: {
                module: 'broadcast_event',
                action: 'broadcast_event_by_id',
                formData: {
                  eventId : item?.cancerHealingStoryId
                }
              }
            })
            if (eventData?.data?.data != undefined && eventData?.data?.data != null) {
              props.navigation.navigate('Zen.EventsDetail', { item: eventData?.data?.data[0]})
            }
          } catch (error) {
    
          }
        }
      }

    const renderNotification = ({ item, index }) => {
        var fileName = item?.notification_type?.image;
        var extension = fileName.split('.').pop();
        return (
            <Pressable onPress={() => {
                NotificationPress(item)
                notificationData[index].unread = 0
                setUpdateData(!updateData)
            }} style={[styles.renderItemVw,{
                backgroundColor: item?.unread == 1 ? "#e9f3ff" : theme.PRIMARY
            }]}>
                <View style={styles.userImageView}>
                    {item?.notification_type?.image == null  || item?.notification_type?.image == undefined ?
                        <NoImage width={60} height={60} /> :
                    extension == 'svg' ? <SvgCssUri
                        width={60}
                        height={60}
                        style={{borderRadius: 10}}
                        uri={item?.notification_type?.image}
                    /> :<Image style={styles.userImage} source={{ uri: item?.notification_type?.image}} /> }
                    <View style={styles.userTypeTagVw}>
                        <StaticImg />
                    </View>
                </View>
                <View style={styles.desVw}>
                    <Text numberOfLines={1} style={styles.messageTitle} >{item?.notif_desc}</Text>
                    <Text style={styles.typeName} numberOfLines={1} >{item?.notification_type?.text}</Text>
                    <Text style={styles.timeText} numberOfLines={1}>{item.time}{dateDiffInDaysMonthsYears(item.createdAt)}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("COMMONTEXT")["NOTIFICATION"]}
                isRightComponent={false} 
                extraHeaderTxt={{fontFamily: FONTFAMILY.POPPINS_MEDIUM,}} />
            <View style={[{ }]} >
                {/* <View style={styles.headerVw}>
                    <Pressable style={{padding: 10, marginLeft: -10,
                        }} onPress={() => setNotificationVisible(false)}>
                        <Image style={styles.closeImg} source={require('../../assets/images/close.png')} />
                    </Pressable>
                    <Text style={styles.notificationText} numberOfLines={1} >{translate("COMMONTEXT")["NOTIFICATION"]}</Text>
                    <Pressable style={styles.markTextVw} onPress={() => setAllReadNotification(true)} >
                        <Text style={styles.markText} numberOfLines={1} >Mark all as read</Text>
                    </Pressable>
                </View> */}
                <FlatList
                    data={notificationData}
                    style={{marginBottom: 30,}}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotification}
                    ListEmptyComponent={() => {
                        return <View style={{flex:1, alignItems:'center', marginTop: 20}}>
                        {!loader ? <Text style={styles.emptyListMsg}>{translate("COMMONTEXT")["NO_DATA_FOUND1"]}</Text>: <Text></Text>}
                        </View>
                    }} />
            </View>
        </SafeAreaView>
    );
};
export default withTheme(Layout);