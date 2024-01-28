/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState } from 'react';
import style from './Style';
import {
    Share,
    Pressable,
    View,
    Image,
    Text,
    StatusBar,
    SafeAreaView,
    Linking,
    ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import translate from "../../../utils/Text"
import Share1 from '../../../assets/images/share.svg';
import actionTypes from '../../../store/actions/types';
import EventItem from '../../../components/evenItem';
import Toast from 'react-native-toast-message';
import Register from '../../../assets/images/Register.svg'
import Sharee from '../../../assets/images/share-black.svg'
import Net from '../../../assets/images/eventNet.svg'
import Location from '../../../assets/images/locationEvent.svg'
import Registered from '../../../assets/images/Registred.svg'
import Repess from '../../../assets/images/eventRupess.svg'
import EventUser from '../../../assets/images/eventUser.svg'
import AppHeader from '../../../components/CommonInput/appHeader';
import moment from 'moment';
import Back from '../../../assets/images/backWhite.svg'
import Clock from '../../../assets/images/clockEvent.svg'
import ClockTime from '../../../assets/images/eventTime.svg'
import People from '../../../assets/images/eventPeople.svg'
import User from '../../../assets/images/eventUser.svg'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReadMore from '../../../components/EventLoadMore';
interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const [reloadPage, setReloadPage] = useState(false)
    const item = props?.route?.params?.item
    const itemArr = props?.route?.params?.itemArr
    let d2 = moment(item?.broadcast_start).format('hh:mm a');
    let d3 = moment(item?.broadcast_end).format('hh:mm a');
    let calendarStartDate = moment(item?.broadcast_start)
    let time1 = calendarStartDate.format('HH:mm')
    let currentTime = moment(moment(), "hh:mm").add(10, 'minutes').format('HH:mm')
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()

    const registerEvent = (id, type) => {
        props.actions.registerEvent(actionTypes.REGISTER_EVENT, {
            module: 'broadcast_event',
            action: 'broadcast_event_register',
            formData: {
                userId: userId,
                eventId: id,
                join_register: type
            }
        });
    }
    const onShare = async () => {
        let checkEventType = item?.google_maps_place != undefined && item?.google_maps_place != null
        let message = checkEventType ? "I came across this event. I'm planning to join this. You should also join. Event details below:\n" +
            "Event: " + item?.broadcast_category?.category + "\nAbout: " + item.name + 
            "\nDate: " + moment(item?.broadcast_start).format("DD-MMM-YY") + ", "+ d2 + " " +
            "\nAttend here: " + item.google_maps_place.placeName  : "I came across this event. I'm planning to join this. You should also join. Event details below:\n" +
            "Event: " + item?.broadcast_category?.category + "\nAbout: " + item.name + 
            "\nDate: " + moment(item?.broadcast_start).format("DD-MMM-YY") + ", "+ d2 + " " +
            "\nJoin here: " + item.joining_link
        try {
            const result = await Share.share({
                message: message,
            });
        } catch (error) {
        }
    };
    const updateItem = (item) => {
        item.broadcast_events_registers = [{ userId: 1 }]
        setReloadPage(!reloadPage)
    }
    const joinEvent = (item, type) => {
        registerEvent(item.id, type)
    }

    let calendarEndDate = moment(item.broadcast_end)
    let time2 = calendarEndDate.format('HH:mm')
    // let currentTime = moment(moment(), "hh:mm").add(10, 'minutes').format('HH:mm')
    let joinTime = moment(time1, "hh:mm").subtract(10, 'minutes').format('HH:mm');

    let verifyTodayDate = new Date().toLocaleDateString() == new Date(item.broadcast_start).toLocaleDateString()
    function parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
     }
    var minutes = parseTime(time2) - parseTime(time1);

    const RegisterView = () => {
       return( <Pressable style={[styles.joinButtonVwNew, { backgroundColor: item?.broadcast_events_registers?.length > 0 ? theme.SEARCH_TITLE : theme.SECONDARY }]} onPress={() => {
            if (item?.broadcast_events_registers?.length > 0) {
                Toast.show({
                    type: 'success',
                    text1: "You've already applied for this event",
                })
            } else {
                updateItem(item)
                joinEvent(item, 'register')
            }
        }} >
            <Text style={styles.joinText} numberOfLines={1}> {item?.broadcast_events_registers?.length > 0 ? 'Registered' : 'Register'}</Text>

        </Pressable>)
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      
    let eventTime = formatAMPM(new Date(item?.broadcast_start))

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />

            <Pressable onPress={() => {
                navigation.goBack()
            }} style={[styles.backView,{top: insets.top + 15}]}>
                <Back width={9} height={15} color={'white'} />
            </Pressable>
            <ScrollView style={{ backgroundColor: theme.PRIMARY }} showsVerticalScrollIndicator={false} >
                {/* <View style={styles.authorBasicDetail} >
                    <View style={styles.dateTimeContainer} >
                        <Text style={styles.dateTimeText} numberOfLines={1} >{`${moment(item.broadcast_start).format('DD-MM-YYYY')} | ${d2} - ${d3} IST`}</Text>
                        {time1 > currentTime ?
                            <Pressable style={styles.calendarIconVw} onPress={() => {
                                if (item.broadcast_events_registers.length > 0) {
                                    Toast.show({
                                        type: 'success',
                                        text1: "You've already applied for this event",
                                    })
                                } else {
                                    props?.route?.params?.updateItem(item)
                                    updateItem(item)
                                    joinEvent(item, 'register')
                                }
                            }} >
                                {item?.broadcast_events_registers?.length > 0 ? <Registered /> : <Register />}
                            </Pressable>
                            : <Pressable style={styles.joinButtonVw} onPress={() => {
                                Linking.openURL(item.joining_link)
                                joinEvent(item, 'join')
                            }} >
                                <Text style={styles.joinText} numberOfLines={1}>{translate("COMMONTEXT")["JOIN"]}</Text>
                            </Pressable>}
                    </View>
                </View> */}
                <Image source={{ uri: item.image }} resizeMode={'cover'} style={styles.authorImage} />
                <Text style={[styles.eventTypeTxt,{fontWeight: '600',color: (currentTime >= joinTime && verifyTodayDate) ? theme.OFFER : theme.SUB_TITLE,}]} numberOfLines={1} >
                        {
                            // (currentTime >= joinTime30 && verifyTodayDate && !(currentTime >= joinTime)) ? 
                            //'Start in 30 minutes' : 
                            (currentTime > joinTime && verifyTodayDate ) ? 'HAPPENING NOW' :
                            verifyTodayDate ? "TODAY" : moment(item?.event_date).format('ddd ,MMM DD').toLocaleUpperCase()}
                        {(currentTime >= joinTime && verifyTodayDate) ? null : ' AT ' + `${eventTime != '' && eventTime != undefined ? eventTime.toUpperCase() : ''}` + " IST"}</Text>
                <Text style={styles.eventNameTxt} numberOfLines={2} >{item?.name}{item?.aboutSpeaker ? ' ,' : ''}</Text>
                {item?.aboutSpeaker ? <Text style={styles.eventNameTxt} numberOfLines={2} >{item?.aboutSpeaker}</Text>: null}
                <View style={styles.directionRow}>
                    <Text style={[styles.eventTypeTxtExtra,{fontWeight: '600'}]} numberOfLines={1} >{item?.eventType}</Text>
                    {item?.eventType ? <View style={styles.dots} /> : null}
                    <Text style={[styles.eventTypeTxtExtra,{fontWeight: '600'}]} numberOfLines={1} >{item?.broadcast_category?.category}</Text>
                    {item?.broadcast_language?.language ? <View style={styles.dots} /> : null}
                    <Text style={[styles.eventTypeTxtExtra,{fontWeight: '600'}]} numberOfLines={1} >{item?.broadcast_language?.language}</Text>
                </View>
                <View style={[styles.directionRow,{justifyContent:'space-between', marginBottom: 25}]}>
                            {currentTime < joinTime ?
                                RegisterView()
                            : (currentTime >= joinTime) && verifyTodayDate ? 
                            <Pressable style={styles.joinButtonVwNew} onPress={() => {
                                Linking.openURL(item.joining_link)
                                joinEvent(item, 'join')
                            }} >
                                <Text style={styles.joinText} numberOfLines={1}>{translate("COMMONTEXT")["JOIN"]}</Text>
                            </Pressable>: RegisterView()
                            }
                            <Pressable onPress={() => {onShare()}} style={styles.shareButton}>
                                <Sharee />
                            </Pressable>
                </View>
                <View style={[styles.directionRow, {marginBottom: 14, width:'80%'}]}>
                    <View style={styles.innerIconView}>
                        <ClockTime width={18} height={18} />
                    </View>
                    <Text style={[styles.timeText]} numberOfLines={1} >{minutes > 0 ? (minutes / 60).toString().substring(0,3) : 0} hr</Text>
                </View>
                {currentTime >= joinTime && verifyTodayDate && item?.total_register_count != undefined && item?.total_register_count != null &&
                        item?.total_register_count > 10 ? <View style={[styles.directionRow,{marginBottom: 14, width:'80%'}]}>
                    <View style={styles.innerIconView}>
                        <People width={25} height={19} />
                    </View>
                    <Text style={[styles.timeText]} numberOfLines={1} >{item?.total_register_count} going</Text>
                </View> : null}
                {item?.price != undefined && item?.price != null ? <View style={[styles.directionRow,{marginBottom: 14, width:'80%'}]}>
                    <View style={styles.innerIconView}>
                        <Repess width={18} height={18} />
                    </View>
                    <Text style={[styles.timeText]} numberOfLines={1} >{item?.price == 0 ? 'FREE' : `₹ ${item?.price}`}</Text>
                </View> : null}
                {item?.user?.user_details[0]?.name  ? <View style={[styles.directionRow,{marginBottom: 14, width:'80%'}]}>
                    <View style={styles.innerIconView}>
                        <EventUser width={18} height={18} />
                    </View>
                    <Text style={[styles.timeText]} numberOfLines={1} >Event by {item?.user?.user_details[0]?.name}</Text>
                </View> : null}
                {item?.eventType == 'Online' ? 
                <View style={[styles.directionRow,{ width:'80%'}]}>
                    <View style={[styles.innerIconView,{justifyContent:'center'}]}>
                        <Net width={18} height={18} />
                    </View>
                    <Text style={[styles.timeText,{}]} numberOfLines={3} >Online 
                        {item?.joining_link && <Text style={{color: theme.PAGINATION_SELECCT}}>: {item?.joining_link}</Text>}</Text>
                </View>: null}
                {item?.google_maps_place != undefined && item?.google_maps_place != null ? <View style={[styles.directionRow,{ width:'80%'}]}>
                    <View style={[styles.innerIconView,{justifyContent:'flex-start'}]}>
                        <Location />
                    </View>
                    <Text style={[styles.timeText,{}]} numberOfLines={3} >{item?.google_maps_place?.placeName}</Text>
                </View>: null}
                <View style={styles.line} />
                <View style={styles.descVw} >
                    <Text style={styles.descTitle} >{translate("COMMONTEXT")["ABOUT_EVENT"]}</Text>
                    <ReadMore numberOfLines={10} style={[styles.descText, {color: theme.BLACK}]} 
                        seeMoreStyle={[styles.descText, {}]} seeLessStyle={[styles.descText, {color: theme.PRIMARY}]}>
                            {item.description}</ReadMore>
                </View>
                <View style={styles.line} />
                <View style={styles.similareventsVw} >
                    {itemArr && <View style={[styles.directionRow, {marginHorizontal: 0, justifyContent:'space-between'}]}>
                        <Text style={[styles.descTitle, { marginHorizontal: 20 }]} >{translate("COMMONTEXT")["SUGGESTED_EVENTS"]}</Text>
                        <Pressable onPress={() => {navigation.goBack()
                            if(props.route?.params?.GoBack){
                                props.route?.params.GoBack({
                                    broadcastCategoryId: item?.broadcastCategoryId})
                            }}}>
                            <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
                        </Pressable>
                    </View>}
                    <ScrollView horizontal contentContainerStyle={{ paddingRight: 20 }} showsHorizontalScrollIndicator={false} >
                        {itemArr?.map((item, index) => {
                            return (
                                <EventItem
                                    item={item}
                                    isEventDetail={true}
                                    theme={theme}
                                    itemArr={itemArr}
                                    extraDetailStyle={{width: 300}}
                                    navigation={props.navigation} />
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(Layout);