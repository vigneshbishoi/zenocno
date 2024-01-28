import React, { useEffect, useState } from 'react';
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
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Dimensions
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import { withTheme, _changeTranslations } from '../../utils/ThemeProvider';
import Back from '../../assets/images/Back.svg'
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import CalendarDayComponent from './CalendarDayComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux';
import BG from '../../assets/images/BG.svg'

var calendarStartDate = moment();
var calendarEndDate = moment();
var defaultData = new Date('1980-01-01')
let startTime = moment(calendarStartDate).format("hh:mm:ss");
let endTime = moment(calendarEndDate).format("hh:mm:ss");

const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

const AddActivityModal = ((props) => {
    const { isActivityModalShow, setActivityModalShow, theme, eventsArr, setEventsArr, postActivity, categories } = props
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const styles = modalStyles(theme);
    const [reloadPage, setReloadPage] = useState(false);
    const [isRepeatShow, setRepeatShow] = useState(false);
    const [isCategoryShow, setCategoryShow] = useState(false);
    const [categoryData, setCategoryData] = useState([
        { key: '1', titleText: 'Category 1' },
        { key: '2', titleText: 'Category 2' },
        { key: '3', titleText: 'Category 3' },
    ])
    const [activityName, setActivityName] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [remarkText, setRemarkText] = useState('')
    const [isReminderEnabled, setIsReminderEnabled] = useState(false);
    const [isStartDateShow, setIsStartDateShow] = useState(false);
    const [isStartTimeShow, setIsStartTimeShow] = useState(false);
    const [isEndDateShow, setIsEndDateShow] = useState(false);
    const [isEndTimeShow, setIsEndTimeShow] = useState(false);
    const [startDate, setStartDate] = useState(calendarStartDate.format('DD-MMM-YYYY'))
    const [endDate, setEndDate] = useState(calendarEndDate.format('DD-MMM-YYYY'))
    const repeatdata = [
        { key: '1', titleText: 'Never' },
        { key: '2', titleText: 'Weekly' },
        { key: '3', titleText: 'Monthly' },
    ]
    const [isRepeatdataSel, setRepeatdataSel] = useState(repeatdata[0]);
    const [selectedRepeatItemTxt, setSelectedRepeatItemTxt] = useState(repeatdata[0].titleText);
    const [monthlyCalendar, setMonthlyCalendar] = useState(false);
    const [monthlyDate, setMonthlyDate] = useState(calendarEndDate.format('DD'))
    const [weeklyData, setWeeklyData] = useState([
        { key: '1', titleText: 'S', checkStatus: 0 },
        { key: '2', titleText: 'M', checkStatus: 0 },
        { key: '3', titleText: 'T', checkStatus: 0 },
        { key: '4', titleText: 'W', checkStatus: 0 },
        { key: '5', titleText: 'T', checkStatus: 0 },
        { key: '6', titleText: 'F', checkStatus: 0 },
        { key: '7', titleText: 'S', checkStatus: 0 },
    ])
    
    const startMinDate = new Date()
    const endMinDate = new Date()
    const monthMinDate = new Date()

    useEffect(() => {
        setActivityName(props.title)
        setCategoryName(props?.category?.name)
    }, [props.title])

    const startPreviousMonth = () => {
        // if (new Date() !== startMinDate) {
        calendarStartDate = calendarStartDate.add(-1, 'month');
        setStartDate(calendarStartDate.format('DD-MMM-YYYY'))
        // }
    }
    const startNextMonth = () => {
        calendarStartDate = calendarStartDate.add(1, 'month');
        setStartDate(calendarStartDate.format('DD-MMM-YYYY'))
    }
    const renderStartDateHeader = (date) => {
        return (
            <View style={[styles.activitySubVw, { flex: 1, paddingVertical: 5 }]} >
                <Text style={styles.headerDateText} >{calendarStartDate.format('MMM DD, YYYY')}</Text>
                <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7, marginLeft: 8 }} />
                <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]} >
                    <Pressable style={{ marginRight: 20 }} onPress={() => startPreviousMonth()} >
                        <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '90deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                    <Pressable onPress={() => startNextMonth()} >
                        <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                </View>
            </View>
        );
    }
    const renderEndDateHeader = (date) => {
        return (
            <View style={[styles.activitySubVw, { flex: 1, paddingVertical: 5 }]} >
                <Text style={styles.headerDateText} >{calendarEndDate.format('MMM DD, YYYY')}</Text>
                <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7, marginLeft: 8 }} />
                <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]} >
                    <Pressable style={{ marginRight: 20 }} >
                        <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '90deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                </View>
            </View>
        );
    }
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
        if (item.checkStatus === 0) {
            item.checkStatus = 1
        } else if (item.checkStatus === 1) {
            item.checkStatus = 0
        }
        let newArr = [...weeklyData]
        newArr[index].checkStatus = item.checkStatus
        setWeeklyData(newArr)
        setReloadPage(!reloadPage)
    }
    const createPostObject = () => {
        var newStartDate = moment(startDate).format('YYYY-MM-DD');
        var newEndDate = moment(endDate).format('YYYY-MM-DD');
        let obj = {
            userId: userId,
            calendarCategoryId: 1,
            calendarStartDate: newStartDate,
            calendarEndDate: newEndDate,
            startTime: startTime,
            endTime: endTime,
            activity: activityName,
            repeatType: selectedRepeatItemTxt,
            remarks:remarkText,
            reminder:isReminderEnabled,
        }
        if(selectedRepeatItemTxt == 'Monthly'){
            obj.days = monthlyDate
        } else if(selectedRepeatItemTxt == 'Weekly') {
            let str = ''
            weeklyData.map(item => {

                if(str.length == 0){
                    str = item.checkStatus.toString() 
                } else {
                    str = str + ',' + item.checkStatus.toString()
                }
            })
            obj.on_days = str
        }
        postActivity(obj)
        setActivityModalShow(false)
    }


    return (
        <Modal isVisible={isActivityModalShow} style={{ margin: 0 }} >
            <View style={{ flex: 1, backgroundColor:theme.SELECTED }}>
                <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
                    <SafeAreaView style={{ flex: 1, marginHorizontal: 15 }} >
                        <View style={styles.headerVw}>
                            <Pressable onPress={() => setActivityModalShow(false)} style={{ position: "absolute", left: -7 }}>
                                <Back width={15} height={20} style={{ margin: 15 }} />
                            </Pressable>
                            <Text style={styles.headerTxt}>Add Activity</Text>
                        </View>
                        <KeyboardAwareScrollView extraScrollHeight={80} enableOnAndroid={true} showsVerticalScrollIndicator={false}  >
                            <View style={{ flex: 1 }} >
                                <TextInput placeholder='Activity Name' style={[styles.textContainer, styles.inputText]} placeholderTextColor={theme.SUB_TITLE} value={activityName} onChangeText={(value) => setActivityName(value)} />
                                <Pressable style={[styles.textContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} onPress={() => !props.isFromWell && setCategoryShow(!isCategoryShow)} >
                                    <TextInput placeholder='Category' style={[styles.inputText, { flex: 1 }]} placeholderTextColor={theme.SUB_TITLE} editable={false} value={categoryName} />
                                    <Image source={require('../../assets/images/downArrow.png')} style={styles.downIcon} />
                                </Pressable>
                                {isCategoryShow &&
                                    <View style={styles.categoryModal} >
                                        {categories.map((item, index) => {
                                            return (
                                                <Pressable style={styles.categoryModalItem} onPress={() => { setCategoryName(item.name), setCategoryShow(false) }}>
                                                    <Text style={styles.inputText} >{item.name}</Text>
                                                </Pressable>);
                                        })}
                                    </View>
                                }
                                <View style={styles.activityTimeVw} >
                                    <View style={[styles.activitySubVw, styles.activitySubVwTwo]}>
                                        <Text style={styles.activityTitle} >Starts</Text>
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
                                                <Text style={[styles.dateTimeText, isStartTimeShow && { color: theme.SECONDARY }]} >{startTime}</Text>
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
                                                    calendarStartDate = moment(day.dateString)
                                                    setStartDate(calendarStartDate.format('DD-MMM-YYYY'))
                                                    setIsStartDateShow(false)
                                                }}
                                            />
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }} />
                                        </>
                                    }
                                    {isStartTimeShow &&
                                        <>
                                            <DatePicker
                                                date={defaultData}
                                                onDateChange={date => startTime = moment(date).format("hh:mm:ss")}
                                                mode={'time'}
                                                theme={'light'}
                                            />
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }} />
                                        </>
                                    }
                                    <View style={[styles.activitySubVw, styles.activitySubVwTwo]}>
                                        <Text style={styles.activityTitle} >Ends</Text>
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
                                                <Text style={[styles.dateTimeText, isEndTimeShow && { color: theme.SECONDARY }]} >{endTime}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    {isEndDateShow &&
                                        <>
                                            <Calendar
                                                minDate={endMinDate}
                                                dayComponent={CalendarDayComponent}
                                                // renderHeader={date => renderEndDateHeader(date)}
                                                // hideArrows
                                                // renderArrow={(direction) => {
                                                //     if (direction == "left")
                                                //       return (
                                                //           <View style={{backgroundColor:'red', flex:1,position:'absolute', right:0}} >
                                                //         <MaterialCommunityIcons name={'arrow-left' } color='#291D89' size={30}  />
                                                //         </View>
                                                //       );
                                                //     if (direction == "right")
                                                //       return (
                                                //         <View style={{backgroundColor:'red', flex:1, position:'absolute', right:0}} >

                                                //         <MaterialCommunityIcons name={'arrow-right' } color='#291D89' size={30} />
                                                //         </View>
                                                //       );
                                                //   }}
                                                onDayPress={day => {
                                                    calendarEndDate = moment(day.dateString)
                                                    setEndDate(calendarEndDate.format('DD-MMM-YYYY'))
                                                    setIsEndDateShow(false)
                                                }}
                                            />
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }} />
                                        </>
                                    }
                                    {isEndTimeShow &&
                                        <>
                                            <DatePicker
                                                date={defaultData}
                                                mode={'time'}
                                                onDateChange={date => endTime = moment(date).format("hh:mm:ss")}
                                                theme={'light'}
                                            />
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }} />
                                        </>
                                    }
                                    <Pressable style={[styles.activitySubVw, styles.activitySubVwTwo]}  >
                                        <Text style={styles.activityTitle} >Repeat</Text>
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
                                            <Text style={[styles.inputText, { color: theme.SUB_TITLE }]}>On these days</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 5 }} >
                                                {weeklyData.map((item, index) => {
                                                    return (
                                                        <Pressable style={styles.checkboxContainer} onPress={() => checkWeeklyDay(item, index)} >
                                                            <MaterialCommunityIcons
                                                                name={item.checkStatus === 0 ? 'checkbox-blank-outline' : 'checkbox-marked' }
                                                                size={22}
                                                                color={item.checkStatus === 0 ? "#000" : "#108FE5"}
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
                                            <Text style={[styles.inputText, { color: theme.SUB_TITLE }]}>One day</Text>
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
                                                    calendarEndDate = moment(day.dateString)
                                                    setMonthlyDate(calendarEndDate.format('DD'))
                                                    setMonthlyCalendar(false)
                                                }} />
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }} />
                                        </>
                                    }
                                    <View style={[styles.activitySubVw, { width: '100%', paddingVertical: 15 }]}>
                                        <Text style={styles.activityTitle} >Set Reminder</Text>
                                        <Switch
                                            style={{ position: 'absolute', right: 0 }}
                                            trackColor={{ false: "#767577", true: theme.SECONDARY }}
                                            thumbColor={isReminderEnabled ? theme.PRIMARY : theme.PRIMARY}
                                            onValueChange={() => setIsReminderEnabled(!isReminderEnabled)}
                                            value={isReminderEnabled}
                                        />
                                    </View>
                                </View>
                                <TextInput placeholder='Remarks' style={[styles.textContainer, styles.inputText, styles.remarksContainer]} multiline={true} placeholderTextColor={theme.SUB_TITLE} value={remarkText} onChangeText={(value) => setRemarkText(value)} />

                            </View>
                        </KeyboardAwareScrollView>
                        <Pressable style={styles.addActivityVw} onPress={() => addActivities()} >
                            <Text style={styles.addActivityText} >ADD ACTIVITY</Text>
                        </Pressable>
                        {isRepeatShow &&
                            <Modal
                                isVisible={isRepeatShow}
                                backdropOpacity={0.1}
                                onBackdropPress={() => setRepeatShow(false)}
                                onBackButtonPress={() => setRepeatShow(false)}
                                style={[{ justifyContent: "flex-end", width: '100%', marginBottom: 0, alignSelf: 'center', }]} >
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
                    </SafeAreaView>
            </View >
        </Modal>
    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        bgImage: {
            width: widht,
            height: height,
            resizeMode: 'contain'
        },
        headerVw: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            height: 50,
        },
        headerTxt: {
            fontSize: 18,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
        },
        textContainer: {
            borderRadius: 15,
            backgroundColor: theme.PRIMARY,
            height: Platform.OS === 'ios' ? 55 : 57,
            paddingHorizontal: 15,
            marginTop: 15
        },
        categoryModal: {
            marginTop: 0.5,
            borderRadius: 15,
            paddingHorizontal: 15,
            backgroundColor: theme.PRIMARY,
            paddingVertical: 15
        },
        categoryModalItem: {
            paddingVertical: 7
        },
        inputText: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.BLACK
        },
        repeatItemUnselect: {
            paddingVertical: 15
        },
        repeatItemSelect: {
            borderRadius: 5,
            backgroundColor: theme.SECONDARY_OPACITY
        },
        remarksContainer: {
            height: 150,
            textAlignVertical: 'top',
            paddingTop: 17
        },
        downIcon: {
            width: 15,
            height: 8,
        },
        activityTimeVw: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 15,
            paddingLeft: 15,
            paddingRight: 10,
            marginTop: 15,
            paddingVertical: 10
        },
        activitySubVw: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        activitySubVwTwo: {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
            paddingVertical: 15
        },
        activityTitle: {
            color: theme.GRAY_BLACK,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        dateTimeVw: {
            backgroundColor: '#eeeef0',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 5,
        },
        dateTimeText: {
            color: theme.GRAY_BLACK,
            fontSize: 16,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
        },
        repetsItemName: {

            backgroundColor: '#eeeef0',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 5,
            overflow: 'hidden'
        },
        repeatText: {
            color: theme.SEARCH_TITLE,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginRight: 10
        },
        repeatDataVw: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: theme.PRIMARY,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5'
        },
        addActivityVw: {
            backgroundColor: theme.SECONDARY,
            borderRadius: 15,
            paddingVertical: 20,
            marginTop: 20,
            marginBottom: Platform.OS === 'ios' ? 20 : 50,
        },
        addActivityText: {
            color: theme.PRIMARY,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        headerDateText: {
            fontSize: 15,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        checkboxContainer: {
            justifyContent: "center",
            paddingRight: widht * .06,
        },

        checkBoxText: {
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 12,
            textAlign: 'center'
        }
    });
};
export default AddActivityModal;