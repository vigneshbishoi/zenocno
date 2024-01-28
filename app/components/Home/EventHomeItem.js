import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform, Dimensions, Linking, Share, Alert } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import translate from '../../utils/Text'

const EventItem = ((props) => {
    const { item, joinEvent, theme, isfromHome = false, homePress = () => {}, navigation, itemArr, isEventDetail = false, updateItem } = props
    const styles = modalStyles(theme);
    var startB = moment(item.broadcast_start).local().format('hh:mm a');
    var endB = moment(item.broadcast_end).local().format('hh:mm a');
    let calendarStartDate = moment(item.broadcast_start)
    let time1 = calendarStartDate.format('HH:mm')
    let calendarEndDate = moment(item.broadcast_end)
    let time2 = calendarEndDate.format('HH:mm')
    // let currentTime = moment(moment(), "hh:mm").add(10, 'minutes').format('HH:mm')
    let joinTime = moment(time1, "hh:mm").subtract(10, 'minutes').format('HH:mm');
    let joinTime30 = moment(time1, "hh:mm").subtract(30, 'minutes').format('HH:mm');
    let currentTime = moment(moment(), "hh:mm").format('HH:mm');

    let verifyTodayDate = new Date().toLocaleDateString() == new Date(item.broadcast_start).toLocaleDateString()
    function parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
     }
    var minutes = parseTime(time2) - parseTime(time1);

    const onShare = async () => {
        let message = "I came across this event. I'm planning to join this. You should also join. Event details below:\n" +
            "Event: " + item?.broadcast_category?.category + "\nAbout: " + item.name + " " + item.aboutSpeaker +
            "\nDate: " + moment(item?.broadcast_start).format("DD-MMM-YY") + ", "+ startB + " " +
            "\nJoin here: " + item.joining_link
        try {
            const result = await Share.share({
                message: message,
            });
        } catch (error) {
        }
    };

    const RegisterView = () => {
        return(
            <Pressable style={[styles.joinButtonVw, { backgroundColor: item?.broadcast_events_registers?.length > 0 ? theme.SEARCH_TITLE : theme.SECONDARY }]} onPress={() => {
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
                <Text style={styles.joinText} numberOfLines={1}> {item?.broadcast_events_registers?.length > 0 ? 'Registered' : 'Reg..'}</Text>

            </Pressable>
        )
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
        <Pressable style={[styles.itemContainer, { width: Dimensions.get('window').width - 20 }]} onPress={() => {
            let filterArr = itemArr?.filter(itemA => itemA.id != item.id)
            navigation.navigate('Zen.EventsDetail', { item: item, itemArr: filterArr, updateItem: updateItem })
        }} >
            <View style={{flexDirection:'row'}}>
                <View style={{width:'30%'}}>
            <Image style={styles.itemImage} source={{ uri: item.image }} resizeMode={'cover'}/>
            </View>
            <View style={{width:'50%'}}>
            <View style={styles.itemDescriptionContainer} >
                <Text style={styles.eventNameTxt} numberOfLines={2} >{item?.name}{item?.aboutSpeaker ? ' ,' + item?.aboutSpeaker : ''}</Text>
                <Text style={[styles.eventTypeTxt,{fontWeight: '600',color: (currentTime >= joinTime && verifyTodayDate) ? theme.OFFER : theme.SUB_TITLE,}]} numberOfLines={2} >
                        {
                            (currentTime > joinTime && verifyTodayDate ) ? 'HAPPENING NOW' :
                            verifyTodayDate ? "TODAY" : moment(item?.broadcast_start).format('ddd, MMM DD').toLocaleUpperCase()}
                            {(currentTime >= joinTime && verifyTodayDate) ? null : ' AT ' + `${eventTime != '' && eventTime != undefined ? eventTime.toUpperCase() : ''}` + " IST"}</Text>
            </View>
            </View>
            <View style={{width:'20%'}}>
                <View style={[styles.directionRow,{justifyContent:'space-between'}]}>
                            {currentTime < joinTime ?
                                RegisterView()
                            : (currentTime >= joinTime) && verifyTodayDate ? 
                            <Pressable style={styles.joinButtonVw} onPress={() => {
                                Linking.openURL(item.joining_link)
                                joinEvent(item, 'join')
                            }} >
                                <Text style={styles.joinText} numberOfLines={1}>{translate("COMMONTEXT")["JOIN"]}</Text>
                            </Pressable> : RegisterView()
                            }
                        </View>
            </View>
            </View>
        </Pressable>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        itemContainer: {
            backgroundColor: theme.PRIMARY,
            marginVertical: 0,
            marginHorizontal: 10,
            alignItems:'center', 
            justifyContent:'center'
        },
        itemImage: {
            width: '100%',
            height: 80,
            borderRadius: 10,
            marginLeft: 10
        },
        itemDescriptionContainer: {
            paddingHorizontal: 15,
            paddingVertical: 15,
            paddingTop: 10
        },
        eventTypeTxt: {
            color: theme.SUB_TITLE,
            fontSize: 12,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        eventNameTxt: {
            color: theme.BLACK,
            fontSize: 15,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? -5 : -5
        },
        eventCTypeTxt: {
            color: theme.GRAY_BLACK,
            fontSize: 13,
            marginTop: Platform.OS === 'ios' ? 0 : -6,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },

        dateTimeText: {
            color: theme.SEARCH_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? 0 : -3
        },
        joinButtonVw: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.SECONDARY,
            borderRadius: 6,
            marginTop: 6,
            width:'80%',
            height: 33
        },
        joinText: {
            color: theme.PRIMARY,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        calendarIconVw: {
            position: 'absolute',
            right: Platform.OS === 'ios' ? 10 : 0,
            padding: 5
        },
        directionRow: {
            flexDirection:'row', 
            alignItems:'center'
        },
        shareButton:{ 
            alignItems:'center', 
            justifyContent:'center',
            backgroundColor: theme.DARK_SILVER, 
            width: 46, 
            height: 33, 
            borderRadius: 6,
            marginTop: 6, 
        }
    });
};
export default EventItem;  