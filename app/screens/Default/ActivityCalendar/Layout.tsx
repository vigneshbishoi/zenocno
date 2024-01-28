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
    SafeAreaView
} from 'react-native';
import _ from 'lodash';
import { Calendar } from 'react-native-calendars';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import moment from 'moment'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
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
    const todayDate = moment()
    const [reloadPage, setReloadPage] = useState(false)
    const [selectDate, setSelectdate] = useState(todayDate.format('YYYY-MM-DD'))
    const [headerDate, setHeaderDate] = useState(todayDate.format('MMM YYYY'))
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    let calendarData = useSelector((state) => state?.calendarReducer?.calendarData != undefined && state?.calendarReducer?.calendarData?.length > 0 ?
        state?.calendarReducer?.calendarData[0]?.data : []);
    const [markDates, setMarkDates] = useState([])
    const [mark, setMark] = useState({})
    const isFocused = useIsFocused();

    useEffect(() => {
        setMarkDates([])
        setTimeout(() => {
            getCalendarData()
        }, 500)
    }, [isFocused]);
    useEffect(() => {
        setMark({})
        if (calendarData?.length > 0 && markDates.length == 0) {
            let allMarkDates: any = []
            calendarData?.map(item => {
                item.user_calendar_dailies.map(itemCalendar => {
                    allMarkDates.push(itemCalendar.calendarDate)
                })
            })
            allMarkDates.forEach(day => {
                mark[day] = {
                    marked: true,
                    selectedColor: theme.SECONDARY
                };
            })
            setMark(mark)
            setMarkDates(allMarkDates)
            setReloadPage(!reloadPage)
        }
    }, [isFocused, calendarData?.length != undefined, calendarData?.length > 0]);

    //api call
    const getCalendarData = () => {
        props.actions.getCalendar(actionTypes.GET_CALENDAR, {
            module: 'user_calendar',
            action: 'getByUserId',
            formData: {
                user_id: userId,
            }
        });
    }

    //Helpoer Moethods
    const renderCalendarHeader = () => {
        return (
            <Text style={styles.calHeaderDateText} >{headerDate}</Text>
        );
    }
    const dayMonthChange = (dayMonth, flag) => {
        let dayDate = dayMonth.dateString
        let newDayDate = moment(dayDate).format('MMM YYYY')
        setSelectdate(newDayDate)
        setHeaderDate(newDayDate)
        if (flag === 1) {
            props?.route?.params?.handleDate(dayDate)
            props.navigation.goBack()
        }
        setReloadPage(!reloadPage)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={''}
                isRightComponent={false} />
            <View style={styles.calendarVw} >
                <Calendar
                    current={selectDate}
                    markedDates={mark}
                    renderHeader={renderCalendarHeader}
                    onDayPress={(day) => dayMonthChange(day, 1)}
                    onMonthChange={month => dayMonthChange(month, 0)}
                    theme={{
                        dayTextColor: "#222222",
                        textDisabledColor: "#d9e1e8",
                        textDayFontWeight: "300",
                        textMonthFontWeight: "bold",
                        textDayHeaderFontWeight: "500",
                        textDayFontSize: 16,
                        textDayHeaderFontSize: 12,
                        selectedDayTextColor: theme.SECONDARY,
                        todayBackgroundColor: theme.SECONDARY,
                        todayTextColor: theme.PRIMARY
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default withTheme(Layout);