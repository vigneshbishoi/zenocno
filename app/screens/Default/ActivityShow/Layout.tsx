/**
 * Show Activity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: ShowActivity 
 */
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Platform,
    Pressable, SafeAreaView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { CalendarProvider, CalendarUtils, ExpandableCalendar, TimelineEventProps, TimelineList, TimelineProps } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import AddActivity from '../../../assets/images/AddActivity.svg';
import translate from '../../../utils/Text'
import Back from '../../../assets/images/Back.svg';
import Open from '../../../assets/images/open.svg';
import Select from '../../../assets/images/select.svg';
import Unselect from '../../../assets/images/unselect.svg';
import AddActivityModal from '../../../components/Activity/AddActivityModal';
import actionTypes from '../../../store/actions/types';
import { withTheme } from '../../../utils/ThemeProvider';
import style from './Style';
import AppLoader from '../../../components/Plugins/AppLoader';
import { SvgCssUri } from 'react-native-svg';
import CalendarIcon from '../../../assets/images/headercalicon.svg';

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
    const isFocused = useIsFocused();
    const { route } = props
    const { params } = route
    const selectDate = params?.newDayDate
    const [isActivityModalShow, setActivityModalShow] = useState(false);
    const [isCalendarSuggestionShow, setCalendarSuggestionShow] = useState(true);
    const [isLoader, setIsLoader] = useState(true);
    const [valueChange, setValueChange] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(moment(selectDate).format('MMMM'));
    const [currentDate, setCurrentDate] = useState(moment(selectDate).format('YYYY-MM-DD'))
    const [eventByDate, setEventByDate] = useState([])
    const [initialTime, setInitialTime] = useState({ hour: 6, minutes: 30 });
    const [isTimeVisible, setIsTimeVisible] = useState(true)
    const [eventsArr, setEventsArr] = useState([])
    const [endEvent, setEndEvent] = useState(false)
    const today = new Date();
    const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
        
    const calendarCategory = useSelector((state) => state?.calendarReducer?.calendarCategory != undefined &&
        state?.calendarReducer?.calendarCategory?.length > 0 ? state?.calendarReducer?.calendarCategory[0]?.data : []);
    let calendarData = useSelector((state) => state?.calendarReducer?.calendarData != undefined && state?.calendarReducer?.calendarData?.length > 0 ?
        state?.calendarReducer?.calendarData[0]?.data : []);
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    const calendarsuggestion = useSelector((state) => state?.calendarReducer?.calendarsuggestion != undefined ? state?.calendarReducer?.calendarsuggestion[0]?.data : []);


    useEffect(() => {
        if (calendarCategory) {
            setTimeout(() => {
                setIsLoader(false);
            }, 200)
        } else {
            setTimeout(() => {
                setIsLoader(false);
            }, 1500)
        }
    }, [calendarCategory])
    useEffect(() => {
        if (calendarData?.length > 0) {
            let eventArr = []
            setEventByDate([])
            calendarData?.map(item => {
                item.user_calendar_dailies.map(itemCalendar => {
                    let endDate = itemCalendar.calendarDate + " " + itemCalendar.endTime
                    let startDate = itemCalendar.calendarDate + " " + itemCalendar.startTime
                    var diff = moment.duration(moment(endDate).diff(moment(startDate)));
                    eventArr.push({
                        start: itemCalendar.calendarDate + " " + itemCalendar.startTime,
                        end: itemCalendar.calendarDate + " " + itemCalendar.endTime,
                        title: item.activity,
                        summary: diff.asHours(),
                        color: 'rgba(255, 255, 255, 0.5)',
                        item: item,
                        id: itemCalendar?.id,
                        completed: itemCalendar?.completed,
                    })
                })
            })
            setEventsArr(eventArr)
            let eventsByDate = _.groupBy(eventArr, e => CalendarUtils.getCalendarDateString(e.start)) as {
                [key: string]: TimelineEventProps[];
            }
            setEventByDate(eventsByDate)
            setValueChange(!valueChange)
        } else {
            setEventByDate([])
            setValueChange(!valueChange)
        }

    }, [calendarData]);

    //Lifecycle Methods
    useEffect(() => {
        getAllCategory()
        getCalendarSuggestionData()
        setTimeout(() => {
            getCalendarData()
        }, 500)
    }, [isFocused])
    useEffect(() => {
        getCalendarSuggestionData()
    }, [])
    

    //Api Call
    const getCalendarSuggestionData = () => {
        props.actions.getSuggestion(actionTypes.GET_CALENDAR_SUGGESTION, {
            module: 'user_calendar',
            action: 'wellness_suggestion?userId=' + userId,
        });
    }
    const getCalendarData = () => {
        props.actions.getCalendar(actionTypes.GET_CALENDAR, {
            module: 'user_calendar',
            action: 'getByUserId',
            formData: {
                user_id: userId,
            }
        });
    }
    const postActivity = (item: any) => {
        props.actions.addCalendar(actionTypes.ADD_CALENDAR, {
            module: 'user_calendar',
            action: 'create',
            formData: item
        });
    }
    const createStreak = (id: any, date: any) => {
        props.actions.createStreak(actionTypes.CREATE_STREAK, {
            module: 'daily_streak',
            action: 'create?id=' + id,
            formData: {
                date: date
            }
        });
    }
    const getAllCategory = () => {
        props.actions.calendarCategory(actionTypes.CALENDAR_CATEGORY, {
            module: 'calendar_category',
            action: 'getAll',
        });
    }

    //Helper Methods
    const monthChange = (monthh) => {
        let mon = monthh.dateString
        let newMonth = moment(mon).format('MMMM')
        setSelectedMonth(newMonth);
    }
    const timelineProps: Partial<TimelineProps> = {
        format24h: true,
        //onEventPress: () => setActivityModalShow(true) ,
        renderEvent: (event) => {
            let hour = (event.summary).toFixed(2);
            return (
                <Pressable style={[styles.eventVw, {
                    backgroundColor: event?.item?.calendar_category?.color != undefined ? event?.item?.calendar_category?.color
                        : '#cefff6'
                }]} onPress={() => {
                    props.navigation.navigate('Zen.AddActivity', {
                        item: event.item,
                        isEdit: true
                    })
                }}>
                    <View style={[styles.darkLine, { backgroundColor: event?.item?.calendar_category?.shadow }]} />
                    {/* <Image source={require('../../../assets/images/wellness.png')} style={styles.eventIcon} /> */}
                    <SvgCssUri
                        width="10%"
                        height="50%"
                        uri={event?.item?.calendar_category?.image}
                    />
                    <Text style={[styles.eventName, { width: '52%' }]} numberOfLines={1} >{event?.title}</Text>
                    <View style={styles.eventNavVw} >
                        {event?.item?.wellness?.id > 0 && <Pressable style={{ marginLeft: 6 }} onPress={() =>
                            props.navigation.navigate('Zen.WellnessCategoryItem', {
                                item: event?.item?.wellness,
                                WellNessCategoryById: event?.item?.calendar_category,
                            })} >
                            <Open width={12} height={12} />
                        </Pressable>}

                        {/* <Text style={styles.eventTime}>{hour} hour</Text> */}
                        <Pressable disabled={endEvent ? false : true}
                         style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginRight: 2 }} onPress={() => {
                            let date = moment(event.start).format('YYYY-MM-DD')
                            createStreak(event?.id, date)
                            let filter = eventsArr.filter(item => item.id == event.id)
                            filter[0].completed = filter[0].completed == 0 ? 1 : 0
                            setEventsArr(eventsArr)
                            let eventsByDateA = _.groupBy(eventsArr, e => CalendarUtils.getCalendarDateString(e.start)) as {
                                     [key: string]: TimelineEventProps[];
                            }
                            setEventByDate(eventsByDateA)
                            setValueChange(!valueChange)
                        }} >
                            {event?.completed == 0 ? <Unselect width={15} height={15} /> : <Select width={15} height={15} />}
                        </Pressable>
                    </View>
                </Pressable>
            )
        },
        onBackgroundLongPressOut: (event) => { props.navigation.navigate('Zen.AddActivity', { isEmpty: true, dateObj: event }) },
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
        initialTime:{hour: 6,
            minutes: 30}
    };
    const handleDate = (date) => {
       setSelectedMonth(moment(date).format('MMMM'))
       setCurrentDate(moment(date).format('YYYY-MM-DD'))
       setInitialTime({ hour: 6, minutes: 30 })
    }
    const renderCalendarHeader = (date) => {
        return (
            <View style={styles.headerVw}>
                <Pressable style={styles.backVw} onPress={() => goBack()}>
                    <Back width={8} height={15} />
                </Pressable>
                <Pressable style={styles.calendarIconVw} onPress={() => props.navigation.navigate('Zen.Calendar', {handleDate: handleDate})}>
                    <CalendarIcon />
                </Pressable>
                <Text style={[styles.monthName, {marginLeft:-45}]}>{selectedMonth}</Text>
                <Pressable style={styles.addButtonVw} onPress={() => {
                    props.navigation.navigate('Zen.AddActivity')
                }} >
                    <AddActivity width={28} height={28} />
                </Pressable>
            </View>
        );
    }
    const goBack = () => {
        props.actions.getCalendarData("calendarData", [], actionTypes.GET_CALENDAR_DATA)
        props.navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <CalendarProvider
                date={currentDate}
                onDateChanged={date => {
                    setInitialTime({ hour: 6, minutes: 30 })
                    setIsTimeVisible(false)
                    setTimeout(() => {
                        setIsTimeVisible(true)
                    }, 50)
                    setCurrentDate(date)
                }}
                onMonthChange={(mon) => monthChange(mon)} >
                <ExpandableCalendar
                    initialPosition={ExpandableCalendar.positions.CLOSED}
                    disablePan={true}
                    renderHeader={date => renderCalendarHeader(date)}
                    allowShadow={false}
                    onDayPress={(date) => {
                        date.dateString <= moment().format('YYYY-MM-DD') ?
                            setEndEvent(true) : setEndEvent(false)
                    }}
                    calendarStyle={Platform.OS === 'ios' && { marginTop: 0 }}
                    theme={{
                        selectedDayBackgroundColor: theme.SECONDARY,
                        'stylesheet.calendar.header': {
                            week: {
                                height: Platform.OS === 'android' ? 80 : 25,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }
                        }
                    }}
                    hideArrows={true} />
                    
                    {isTimeVisible &&
                <TimelineList
                    events={eventByDate}
                    timelineProps={timelineProps}
                    scrollToNow
                    initialTime={initialTime} /> }   
            </CalendarProvider>
            {isCalendarSuggestionShow &&
                <View style={styles.bottomContainer} >
                    <View style={styles.bottomVw} >
                        <Text style={styles.bottomTextVw} numberOfLines={1} >{'Add: ' + calendarsuggestion?.title}</Text>
                        <Pressable style={styles.closeIconVw} onPress={() => {
                            props.navigation.navigate('Zen.AddActivity', {
                                title: calendarsuggestion?.title,
                                category: calendarsuggestion?.wellness_category?.calendar_category,
                                isFromWellness: true,
                                wellnessid: calendarsuggestion?.wellness_category?.id
                            })
                            // setCalendarSuggestionShow(false)
                        }} >
                            <Image source={require('../../../assets/images/add.png')} style={styles.closeIcon} />
                        </Pressable>
                    </View>
                </View>}
            {isActivityModalShow &&
                <AddActivityModal
                    isActivityModalShow={isActivityModalShow}
                    setActivityModalShow={setActivityModalShow}
                    theme={theme}
                    eventsArr={eventsArr}
                    setEventsArr={setEventsArr}
                    postActivity={postActivity}
                    categories={calendarCategory}
                />
            }
            <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
        </SafeAreaView>
    );
};
export default withTheme(Layout);