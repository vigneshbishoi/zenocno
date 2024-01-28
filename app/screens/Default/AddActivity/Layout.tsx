/**
 * Show Activity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: ShowActivity 
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
    View,
    SafeAreaView,
    ImageBackground,
    StatusBar,
    Pressable,
    Text,
    TextInput,
    Image,
    Switch,
    Platform,
    Alert
} from 'react-native';
import _ from 'lodash';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import Back from '../../../assets/images/Back.svg'
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import CalendarDayComponent from '../../../components/Activity/CalendarDayComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import Toast from 'react-native-toast-message';
import AppLoader from '../../../components/Plugins/AppLoader';
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
    const CalendarData = useSelector((state) => state?.calendarReducer?.addCalendarData);
    const editCalendar = useSelector((state) => state?.calendarReducer?.editCalendar);
    const calendarCategory = useSelector((state) => state?.calendarReducer?.calendarCategory != undefined &&
        state?.calendarReducer?.calendarCategory?.length > 0 ? state?.calendarReducer?.calendarCategory[0]?.data : []);
       
    const [reloadPage, setReloadPage] = useState(false);
    const [isRepeatShow, setRepeatShow] = useState(false);
    const [isCategoryShow, setCategoryShow] = useState(false);
    const [activityName, setActivityName] = useState(props?.route?.params?.title)
    const [categoryName, setCategoryName] = useState(props?.route?.params?.category?.name || props?.route?.params?.category?.categoryName)
    const [remarkText, setRemarkText] = useState('')
    const [isReminderEnabled, setIsReminderEnabled] = useState(false);
    const [isStartDateShow, setIsStartDateShow] = useState(false);
    const [isStartTimeShow, setIsStartTimeShow] = useState(false);
    const [isEndDateShow, setIsEndDateShow] = useState(false);
    const [isEndTimeShow, setIsEndTimeShow] = useState(false);
    const [startDate, setStartDate] = useState(moment().format('DD-MMM-YYYY'))
    const [startTimeDate, setStartTimeDate] = useState(new Date(new Date().getTime() + 30 * 60000))
    const [endTimeDate, setEndTimeDate] = useState(new Date(new Date().getTime() + 60 * 60000))
    const [endDate, setEndDate] = useState(moment().format('DD-MMM-YYYY'))
    const dateIsSame = moment(startDate).isSame(moment(endDate));
    const [activityStartTime, setActivityStartTime] = useState(moment(moment(), "hh:mm A").add(30, 'minutes').format('hh:mm A'))
    const [activityEndTime, setActivityEndTime] = useState(moment(moment(), "hh:mm A").add(60, 'minutes').format('hh:mm A'))
    const repeatdata = [
        { key: '1', titleText: 'Never' },
        { key: '2', titleText: 'Daily' },
        { key: '3', titleText: 'Weekly' },
        { key: '4', titleText: 'Monthly' },
    ]
    const [isRepeatdataSel, setRepeatdataSel] = useState(repeatdata[0]);
    const [selectedRepeatItemTxt, setSelectedRepeatItemTxt] = useState(repeatdata[0].titleText);
    const [monthlyCalendar, setMonthlyCalendar] = useState(false);
    const [loader, setLoader] = useState(false);
    const [monthlyDate, setMonthlyDate] = useState(moment().format('DD'))
    const [weeklyData, setWeeklyData] = useState([
        { key: '1', titleText: 'S', checkStatus: 0 },
        { key: '2', titleText: 'M', checkStatus: 0 },
        { key: '3', titleText: 'T', checkStatus: 0 },
        { key: '4', titleText: 'W', checkStatus: 0 },
        { key: '5', titleText: 'T', checkStatus: 0 },
        { key: '6', titleText: 'F', checkStatus: 0 },
        { key: '7', titleText: 'S', checkStatus: 0 },
    ])
    const [endMinDate, setEndMinDate] = useState(moment().format('YYYY-MM-DD'))
    const startMinDate = moment().format('YYYY-MM-DD');
    const monthMinDate = moment().format('YYYY-MM-DD');    

    let startTime = moment(startTimeDate).format("HH:mm")

    useEffect(() => {
        if (props?.route?.params?.isEdit) {
            let newArr = weeklyData
            if (props?.route?.params?.item?.repeatType === 'Weekly') {
                var oldString = props?.route?.params?.item?.on_days;
                var mynewarray = oldString.split(',')
                newArr.map((item, index) => {
                    item.checkStatus = mynewarray[index]
                })
                console.log("newArr------>",newArr);
                
                setWeeklyData(newArr)
                setReloadPage(!reloadPage)
            } else if (props?.route?.params?.item?.repeatType === 'Monthly') {
                setMonthlyDate(props?.route?.params?.item?.on_days)
            }
        }
    }, [])

    //Lifecycle Methods
    useEffect(() => {
        if (props?.route?.params?.item != undefined) {
            let item = props?.route?.params?.item
            setActivityName(item.activity)
            setCategoryName(item?.calendar_category?.name)
            setStartDate(moment(item.calendarStartDate).format('DD-MMM-YYYY'))
            setEndDate(moment(item.calendarEndDate).format('DD-MMM-YYYY'))
            //  setStartTimeDate(new Date(moment(item.calendarStartDate).format('YYYY-MM-DD') + " " + item.startTime))
            //  setEndTimeDate(new Date(moment(item.calendarEndDate).format('YYYY-MM-DD') + " " + item.endTime))
            setStartTimeDate(Platform.OS === 'ios' ? new Date(item.calendarStartDate + 'T' + item.startTime) : new Date(moment(item.calendarStartDate).format('YYYY-MM-DD') + " " + item.startTime))
            setEndTimeDate(Platform.OS === 'ios' ? new Date(item.calendarEndDate + 'T' + item.endTime) : new Date(moment(item.calendarEndDate).format('YYYY-MM-DD') + " " + item.endTime))
            setActivityStartTime(moment(item.startTime,"hh:mm").format('hh:mm A'))
            setActivityEndTime(moment(item.endTime,"hh:mm").format('hh:mm A'))
            setRepeatdataSel(item.repeatType == 'Weekly' ? repeatdata[1] : item.repeatType == 'Monthly' ? repeatdata[1] : repeatdata)
            setSelectedRepeatItemTxt(item.repeatType.length > 0 ? item.repeatType : "Never")
            setIsReminderEnabled(item.reminder == 0 ? false : true)
            setRemarkText(item.remarks)
        }
    }, [props?.route?.params?.item])
    useEffect(() => {
        !props?.route?.params?.isFromWellness && getAllCategory()
    }, [])
    const getAllCategory = () => {
        props.actions.calendarCategory(actionTypes.CALENDAR_CATEGORY, {
            module: 'calendar_category',
            action: 'getAll',
        });
    }
    useEffect(() => {        
        if (CalendarData != undefined && CalendarData[0]?.message) {
            if (CalendarData[0].status == 1) {
                Toast.show({
                    // type: 'error',
                    text1: 'Success',
                    text2: CalendarData[0].total_activity + ' events added'
                });
                if(props?.route?.params?.getCalendarData != undefined ){
                    props?.route?.params?.getCalendarData()
                }
            } else {
                Toast.show({
                    // type: 'error',
                    text1: CalendarData[0].message,
                    // text2: CalendarData[0].total_activity + ' events added'
                });
            }
            props.navigation.goBack();
            setLoader(false)

            props.actions.addCalendarData(
                'addCalendarData',
                [],
                actionTypes.ADD_CALENDAR_DATA,
            )
        }

    }, [CalendarData])

    //Helper Methods
    const selectRepeatitem = (item, index) => {
        setRepeatdataSel(item)
        setSelectedRepeatItemTxt(item.titleText)
        setRepeatShow(false)
        setReloadPage(!reloadPage)
    }
    const addActivities = () => {
        createPostObject()
    }
    const checkWeeklyDay = (item, index) => {
        if (item.checkStatus == 0) {
            item.checkStatus = 1
        } else if (item.checkStatus == 1) {
            item.checkStatus = 0
        }
        let newArr = [...weeklyData]
        newArr[index].checkStatus = item.checkStatus
        setWeeklyData(newArr)
        setReloadPage(!reloadPage)
    }

    const createPostObject = () => {   
        if (categoryName != undefined && activityName != undefined && categoryName.length > 0 && activityName.length > 0) {
            setLoader(true)
            props.actions.getCalendarData(
                'calendarData',
                [],
                actionTypes.GET_CALENDAR_DATA,
            )
            var newStartDate = Platform.select({
                ios: moment(startDate).format('YYYY-MM-DD'),
                android: moment(startDate, 'DD MMM YYYY').format('YYYY-MM-DD'),
            })
            var newEndDate = Platform.select({
                ios: moment(endDate).format('YYYY-MM-DD'),
                android: moment(endDate, 'DD MMM YYYY').format('YYYY-MM-DD'),
            })
            let catId = 0
            if (props?.route?.params?.isFromWellness) {
                catId = props?.route?.params?.category?.id
            } else {
                const filterdata = calendarCategory.filter(item => item.name == categoryName)
                catId = filterdata[0]?.id
            }
            var convertedStartTime = moment(activityStartTime, 'hh:mm A').format('HH:mm:ss')
            var convertedEndTime = moment(activityEndTime, 'hh:mm A').format('HH:mm:ss')
            let obj = {
                userId: userId,
                calendarCategoryId: catId,
                calendarStartDate: newStartDate,
                calendarEndDate: newEndDate,
                startTime: convertedStartTime,
                endTime: convertedEndTime,
                activity: activityName,
                repeatType: selectedRepeatItemTxt,
                remarks: remarkText,
                reminder: isReminderEnabled ? 1 : 0,
                wellnessId: props?.route?.params?.isFromWellness ? props?.route?.params?.wellnessid : 0
            }
            if (selectedRepeatItemTxt == 'Monthly') {
                obj.on_days = monthlyDate
            } else if (selectedRepeatItemTxt == 'Weekly') {
                let str = ''
                weeklyData.map(item => {
                    if (str.length == 0) {
                        str = item.checkStatus.toString()
                    } else {
                        str = str + ',' + item.checkStatus.toString()
                    }
                })
                obj.on_days = str
            } else if (selectedRepeatItemTxt == 'Daily') {
                obj.on_days = 1
            }
            props?.route?.params?.item != undefined ? editActivity(obj) : postActivity(obj)
        } else {
            Alert.alert("Error", "Please fill up all details",
                [{ text: "OK" }]
            );
        }
    }

    //Api Call
    const postActivity = (item: any) => {
        props.actions.addCalendar(actionTypes.ADD_CALENDAR, {
            module: 'user_calendar',
            action: 'create',
            formData: item
        });
    }
    const editActivity = (item: any) => {
        item.id = props?.route?.params?.item.id
        props.actions.editCalendar(actionTypes.EDIT_CALENDAR, {
            module: 'user_calendar',
            action: 'user_calendar_update',
            formData: item
        });
    }
    const deleteActivity = () => {
        props.actions.getCalendarData(
            'calendarData',
            [],
            actionTypes.GET_CALENDAR_DATA,
        )
        props.actions.deleteActivity(actionTypes.DELETE_ACTIVITY, {
            module: 'user_calendar',
            action: 'delete_calendar',
            formData: {
                userId: userId,
                id: props?.route?.params?.item.id
            }
        });
        Toast.show({
            type: 'success',
            // text1: 'Oops',
            text2: 'Your activity has been deleted'
        });   
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
            if(props?.route?.params?.getCalendarData != undefined ){
                props?.route?.params?.getCalendarData()
            }
            props.navigation.goBack();
        }, 1500)     
    }
    const displayAlert = () => {
        Alert.alert(
            "",
            "Are you sure you want to delete activity?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                deleteActivity()
              } }
            ]
          );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={props?.route?.params?.isEdit ? 'Edit Activity' : 'Add Activity'}
                isRightComponent={true}
                isText={props?.route?.params?.isEdit ? true : false}
                rightText={translate("COMMONTEXT")["DELETE"]}
                onRightPress={() => displayAlert()}
                fontColor={'red'}
            />
            <View style={{ marginHorizontal: 15 }} >
                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 50 }} extraScrollHeight={80} enableOnAndroid={true} showsVerticalScrollIndicator={false}  >
                    <View>
                    {props?.route?.params?.isFromWellness &&<TextInput placeholder={translate("CALENDARS")["ACTIVITY_NAME"]} selection={{start: 0 }} numberOfLines={1} style={[styles.textContainer, styles.inputText, { flex: 1, backgroundColor: props?.route?.params?.isFromWellness ? theme.LIGHT_GRAY : theme.PRIMARY }]} placeholderTextColor={theme.SUB_TITLE} value={activityName} onChangeText={(value) => setActivityName(value)} editable={props?.route?.params?.isFromWellness ? false : true} />}
                       {!props?.route?.params?.isFromWellness && <TextInput placeholder={translate("CALENDARS")["ACTIVITY_NAME"]} numberOfLines={1} style={[styles.textContainer, styles.inputText, { flex: 1, backgroundColor: props?.route?.params?.isFromWellness ? theme.LIGHT_GRAY : theme.PRIMARY }]} placeholderTextColor={theme.SUB_TITLE} value={activityName} onChangeText={(value) => setActivityName(value)} editable={props?.route?.params?.isFromWellness ? false : true} />}
                        <Pressable style={[styles.textContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: props?.route?.params?.isFromWellness ? theme.LIGHT_GRAY : theme.PRIMARY }]} onPress={() => !props?.route?.params?.isFromWellness && setCategoryShow(!isCategoryShow)} >
                            {/* <TextInput placeholder={translate("COMMONTEXT")["CATEGORY"]} style={[styles.inputText, { flex: 1 }]} placeholderTextColor={theme.SUB_TITLE} editable={false} value={categoryName} /> */}
                            <Text style={[styles.inputText, {color: categoryName?.length > 0 ? theme.BLACK : theme.DARK_GRAY}]}>{categoryName?.length > 0 ? categoryName : translate("COMMONTEXT")["CATEGORY"]}</Text>
                            {!props?.route?.params?.isFromWellness &&
                                <Image source={require('../../../assets/images/downArrow.png')} style={styles.downIcon} />}
                        </Pressable>
                        {isCategoryShow &&
                            <View style={styles.categoryModal} >
                                {calendarCategory?.map((item, index) => {                                    
                                    return (
                                        <Pressable style={styles.categoryModalItem} onPress={() => { setCategoryName(item.name), setCategoryShow(false) }}>
                                            <Text style={styles.inputText} >{item.name}</Text>
                                        </Pressable>);
                                })}
                            </View>
                        }
                        <View style={styles.activityTimeVw} >
                            <View style={[styles.activitySubVw, styles.activitySubVwTwo]}>
                                <Text style={styles.activityTitle} >{translate("CALENDARS")["STARTS"]}</Text>
                                <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]}>
                                    <Pressable style={[styles.dateTimeVw, { marginRight: 5 }]}
                                        onPress={() => {
                                            setIsStartDateShow(!isStartDateShow)
                                            setIsStartTimeShow(false)
                                        }} >
                                        <Text style={[styles.dateTimeText, isStartDateShow && { color: theme.SECONDARY }]} >{startDate}</Text>
                                    </Pressable>
                                    <Pressable style={styles.dateTimeVw}
                                        onPress={() => {
                                            setIsStartTimeShow(!isStartTimeShow)
                                            setIsStartDateShow(false)
                                        }} >
                                        <Text style={[styles.dateTimeText, isStartTimeShow && { color: theme.SECONDARY }]} >{activityStartTime}</Text>
                                    </Pressable>
                                </View>
                            </View>
                            {isStartDateShow &&
                                <>
                                    <Calendar
                                        minDate={startMinDate}
                                        // renderHeader={date => renderStartDateHeader(date)}
                                        // hideArrows
                                        dayComponent={CalendarDayComponent}
                                        onDayPress={day => {
                                            let calendarStartDate = moment(day.dateString)
                                            setStartDate(calendarStartDate.format('DD-MMM-YYYY'))
                                            setEndDate(calendarStartDate.format('DD-MMM-YYYY'))
                                            setIsStartDateShow(false)
                                            let todayDate = moment(new Date()).format('DD-MMM-YYYY')
                                            let date1 = calendarStartDate.format('DD-MMM-YYYY')
                                            if (date1 == todayDate && activityStartTime < moment(moment(), "hh:mm").add(30, 'minutes').format('hh:mm A')) {
                                                setActivityStartTime(moment(moment(), "hh:mm").add(30, 'minutes').format('hh:mm A'))
                                                setActivityEndTime(moment(moment(), "hh:mm").add(60, 'minutes').format('hh:mm A'))
                                            }
                                            setEndMinDate(calendarStartDate.format('YYYY-MM-DD'))
                                        }}
                                    />
                                    <View style={styles.line} />
                                </>
                            }
                            {isStartTimeShow &&
                                <View>
                                    <DatePicker
                                        date={startTimeDate}
                                        onDateChange={date => {
                                            let endTime = moment(date).format("HH:mm")
                                            let todayDate = moment(new Date()).format('DD-MMM-YYYY')
                                            // if (startDate == todayDate && endTime < moment(moment(), "hh:mm").add(0, 'minutes').format('HH:mm')) {
                                            //     Alert.alert("Error", "Please ensure that start date time is greater than current date time",
                                            //         [{ text: "OK" }]);
                                            // } else {
                                                setStartTimeDate(date)
                                                let startTime = moment(date).format("HH:mm")
                                                const newEndTime = moment(startTime, 'HH:mm').add(30, 'minutes').format('hh:mm A');
                                                setActivityStartTime(moment(date).format("hh:mm A"))
                                                setActivityEndTime(newEndTime)
                                                setEndTimeDate(new Date(new Date(date).getTime() + 30 * 60000))
                                                if(startTime >= '23:30'){
                                                    setEndDate(moment(startDate,'DD-MMM-YYYY').add(1, 'day').format('DD-MMM-YYYY'))
                                                } else{
                                                    setEndDate(moment(startDate,'DD-MMM-YYYY').add(0, 'day').format('DD-MMM-YYYY'))
                                                }
                                            // }

                                        }}
                                        mode={'time'}
                                        theme={'light'}
                                    />
                                    <Pressable style={styles.confirmVw} onPress={() => setIsStartTimeShow(false)} >
                                        <Text style={styles.confirmBtn} >{translate("COMMONTEXT")["CONFIRM"]}</Text>
                                    </Pressable>
                                    <View style={styles.line} />
                                </View>
                            }
                            <View style={[styles.activitySubVw, styles.activitySubVwTwo]}>
                                <Text style={styles.activityTitle} >{translate("CALENDARS")["ENDS"]}</Text>
                                <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]}>
                                    <Pressable style={[styles.dateTimeVw, { marginRight: 5 }]}
                                        onPress={() => {
                                            setIsEndDateShow(!isEndDateShow)
                                            setIsEndTimeShow(false)
                                        }} >
                                        <Text style={[styles.dateTimeText, isEndDateShow && { color: theme.SECONDARY }]} >{endDate}</Text>
                                    </Pressable>
                                    <Pressable style={styles.dateTimeVw}
                                        onPress={() => {
                                            setIsEndTimeShow(!isEndTimeShow)
                                            setIsEndDateShow(false)
                                        }} >
                                        <Text style={[styles.dateTimeText, isEndTimeShow && { color: theme.SECONDARY }]} >{activityEndTime}</Text>
                                    </Pressable>
                                </View>
                            </View>
                            {isEndDateShow &&
                                <>
                                    <Calendar
                                        minDate={endMinDate}
                                        dayComponent={CalendarDayComponent}
                                        onDayPress={day => {
                                            let calendarEndDate = moment(day.dateString)
                                            setEndDate(calendarEndDate.format('DD-MMM-YYYY'))
                                            setRepeatdataSel(repeatdata[1])
                                            setSelectedRepeatItemTxt(repeatdata[1].titleText)
                                            setReloadPage(!reloadPage)
                                            setIsEndDateShow(false)
                                        }}
                                    />
                                    <View style={styles.line} />
                                </>
                            }
                            {isEndTimeShow &&
                                <View>
                                    <DatePicker
                                        date={endTimeDate}
                                        mode={'time'}
                                        onDateChange={date => {
                                            let endTime = moment(date).format("HH:mm")
                                            let newEndTime = moment(startTimeDate, "hh:mm").add(0, 'minutes').format('HH:mm');
                                            
                                            // if (endTime < newEndTime) {
                                            //     Alert.alert("Error", "Please ensure that end date time is greater than start date time",
                                            //         [{ text: "OK" }]
                                            //     );
                                            // } else {
                                                setActivityEndTime(moment(date).format("hh:mm A"))
                                                
                                                setEndTimeDate(date)
                                            // }
                                        }}
                                        theme={'light'}
                                    />
                                    <Pressable style={styles.confirmVw} onPress={() => setIsEndTimeShow(false)} >
                                        <Text style={styles.confirmBtn} >{translate("COMMONTEXT")["CONFIRM"]}</Text>
                                    </Pressable>
                                    <View style={styles.line} />
                                </View>
                            }
                            <Pressable style={[styles.activitySubVw, styles.activitySubVwTwo]}  >
                                <Text style={styles.activityTitle} >{translate("COMMONTEXT")["REPEAT"]}</Text>
                                <Pressable style={{ position: 'absolute', right: 0 }} onPress={() => { setRepeatShow(!isRepeatShow) }}>
                                    {(selectedRepeatItemTxt === 'Weekly' || selectedRepeatItemTxt === 'Monthly') ?
                                        <Text style={[styles.dateTimeText, styles.repetsItemName, { color: theme.SECONDARY }]} >{selectedRepeatItemTxt}</Text>
                                        :
                                        <View style={[styles.activitySubVw]} >
                                            <Text style={styles.repeatText} >{selectedRepeatItemTxt}</Text>
                                            <Back width={7} height={12} style={{ transform: [{ rotateY: '180deg' }] }} />
                                        </View>
                                    }
                                </Pressable>
                            </Pressable>


                            {selectedRepeatItemTxt === 'Weekly' &&
                                <View style={styles.repeatDataVw}>
                                    <Text style={[styles.inputText, { color: theme.SUB_TITLE }]}>{translate("CALENDARS")["THESE_DAYS"]}</Text>
                                    <View style={styles.weeklyVw} >
                                        {weeklyData.map((item, index) => {

                                            return (
                                                <Pressable style={styles.checkboxContainer} onPress={() => checkWeeklyDay(item, index)} >
                                                    <MaterialCommunityIcons
                                                        name={item.checkStatus == 0 ? 'checkbox-blank-outline' : 'checkbox-marked'}
                                                        size={22}
                                                        color={item.checkStatus == 0 ? "#000" : "#108FE5"}
                                                    />
                                                    <Text style={styles.checkBoxText}>{item.titleText}</Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </View>
                            }
                            {selectedRepeatItemTxt === 'Monthly' &&
                                <View style={[styles.repeatDataVw, { justifyContent: 'center' }]}>
                                    <Text style={[styles.inputText, { color: theme.SUB_TITLE }]}>{translate("CALENDARS")["ONE_DAY"]}</Text>
                                    <Pressable style={[styles.activitySubVw, { position: 'absolute', right: 5 }]} onPress={() => setMonthlyCalendar(!monthlyCalendar)} >
                                        <Text style={styles.repeatText} >{monthlyDate}</Text>
                                        <Back width={7} height={12} style={{ transform: [{ rotate: '270deg' }] }} />
                                    </Pressable>
                                </View>
                            }
                            {(monthlyCalendar && selectedRepeatItemTxt === 'Monthly') &&
                                <>
                                    <Calendar
                                        minDate={monthMinDate}
                                        onDayPress={day => {
                                            let calendarEndDate = moment(day.dateString)
                                            setMonthlyDate(calendarEndDate.format('DD'))
                                            setMonthlyCalendar(false)
                                        }} />
                                    <View style={styles.line} />
                                </>
                            }
                            <View style={[styles.activitySubVw, { width: '100%', paddingVertical: 15 }]}>
                                <Text style={styles.activityTitle} >{translate("CALENDARS")["REMINDER"]}</Text>
                                <Switch
                                    style={{ position: 'absolute', right: 0 }}
                                    trackColor={{ false: "#767577", true: theme.SECONDARY }}
                                    thumbColor={isReminderEnabled ? theme.PRIMARY : theme.PRIMARY}
                                    onValueChange={() => setIsReminderEnabled(!isReminderEnabled)}
                                    value={isReminderEnabled}
                                />
                            </View>
                        </View>
                        <TextInput placeholder={translate("COMMONTEXT")["REMARKS"]} style={[styles.textContainer, styles.inputText, styles.remarksContainer]} multiline={true} placeholderTextColor={theme.SUB_TITLE} value={remarkText} onChangeText={(value) => setRemarkText(value)} />

                    </View>
                    <Pressable style={styles.addActivityVw} onPress={() => addActivities()} >
                        <Text style={styles.addActivityText} >{props?.route?.params?.isEdit ? 'Edit Activity' : 'Add Activity'}</Text>
                    </Pressable>
                </KeyboardAwareScrollView>

                {isRepeatShow &&
                    <Modal
                        isVisible={isRepeatShow}
                        backdropOpacity={0.1}
                        onBackdropPress={() => setRepeatShow(false)}
                        onBackButtonPress={() => setRepeatShow(false)}
                        style={[{ justifyContent: "flex-end", width: '100%', marginBottom: 0, alignSelf: 'center' }]} >
                        <View style={[styles.repeatDataVw, { borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingVertical: 20 }]}>
                            {repeatdata.map((item, index) => {
                                return (
                                    <Pressable style={[styles.repeatItemUnselect, isRepeatdataSel === item && styles.repeatItemSelect]} onPress={() => selectRepeatitem(item, index)} >
                                        <Text style={[styles.inputText, { marginLeft: 10 }]} >{item.titleText}</Text>
                                    </Pressable>
                                )
                            }
                            )}
                        </View>
                    </Modal>
                }
            </View>
        </SafeAreaView >
    );
};
export default withTheme(Layout);
