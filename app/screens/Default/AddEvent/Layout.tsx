/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    View,
    SafeAreaView,
    StatusBar,
    Pressable,
    Text,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    Platform
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import { CommonTextInput } from '../../../components/Plugins/CommonTextInput'
import AppLoader from '../../../components/Plugins/AppLoader';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Back from '../../../assets/images/Back.svg'
import Feather from 'react-native-vector-icons/Feather'
import CalendarDayComponent from '../../../components/Activity/CalendarDayComponent'
import actionTypes from '../../../store/actions/types';
import Toast from 'react-native-toast-message';
import AppHeader from '../../../components/CommonInput/appHeader';
import Gallery from '../../../assets/images/eventGallary.svg'
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import { RootState } from '../../../store';
import { FONTFAMILY } from '../../../config/font-config';
import request from '../../../services/client';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}

const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const { route } = props;
    const { params } = route;
    let { eventCategory } = params;
    const theme = props.theme
    const [myEventCategory, setMyEventCategory] = useState(eventCategory.slice(1))
    const [myEventType, setMyEventType] = useState([{
        category: "Online",
        id: 1
    },
    {
        category: "Offline",
        id: 2
    }])
    const [myLanguage, setMyLanguage] = useState([])
    const startMinDate = moment().format('YYYY-MM-DD');
    const [speakerName, setSpeakerName] = useState('')
    const [speakerPrice, setSpeakerPrice] = useState('')
    const [aboutSpeaker, setAboutSpeaker] = useState('')
    const [eventLink, setEventLink] = useState('')
    const [description, setDescription] = useState('')
    const [reloadPage, setReloadPage] = useState(false)
    const convertintoISO = (date) => {
        var date1 = moment(date).utc().format('YYYY-MM-DD HH:mm:ss');
        return (date1)
    }
    const [isStartTimeShow, setStartTimeShow] = useState(false)
    const [startTimeDate, setStartTimeDate] = useState(new Date(new Date().getTime() + 30 * 60000))
    const [eventStartTime, setEventStartTime] = useState(moment(moment(), "hh:mm A").add(30, 'minutes').format('hh:mm A'))
    const [isEndTimeShow, setEndTimeShow] = useState(false)
    const [endTimeDate, setEndTimeDate] = useState(new Date(new Date().getTime() + 60 * 60000))
    const [eventEndTime, setEventEndTime] = useState(moment(moment(), "hh:mm A").add(60, 'minutes').format('hh:mm A'))
    const [showCalender, setShowCalender] = useState(false)
    const [eventDate, setEventDate] = useState(moment().format('YYYY-MM-DD'))
    const [headerDate, setHeaderDate] = useState(moment(eventDate, 'YYYY-MM-DD').format('MMM DD, YYYY'))
    const [selectedImage, setSelectedImage] = useState(undefined)
    const [showError, setShowError] = useState(false)
    const [category, setCategory] = useState('Category')
    const [loader, setLoader] = useState(false)
    const [categoryId, setCategoryId] = useState(-1)
    let initialBStartTime = moment(moment(), "hh:mm A").add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss")
    const [broadCastStart, setBroadCastStart] = useState(convertintoISO(initialBStartTime))
    let initialBEndTime = moment(moment(), "hh:mm A").add(60, 'minutes').format("YYYY-MM-DD HH:mm:ss")
    const [broadCastEnd, setBroadCastEnd] = useState(convertintoISO(initialBEndTime))
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const event = useSelector((state: RootState) => state.eventReducer?.addEvent?.length > 0 ?
        state.eventReducer.addEvent[0] : []) || [];
    const user_Data = useSelector((state) => state.onboardingReducer.userDetails);
    const [eventType, setEventType] = useState('Event type')
    const [eventTypeId, setEventTypeId] = useState(-1)
    const [eventLanguage, setEventLanguage] = useState('Language')
    const [eventLanguageId, setEventLanguageId] = useState(-1)
    const [startDate, setStartDate] = useState(false)
    const [startDateShow, setStartDateShow] = useState(false)
    const [startDateUpdate, setStartDateUpdate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    const [endDateShow, setendDateShow] = useState(false)
    const [onlineLink, setOnlineLink] = useState('')
    const [offlineLocation, setOfflineLocation] = useState('')
    const [offlineLocationSemi, setOfflineLocationSemi] = useState('')
    const eventLanguageArr = useSelector((state: RootState) => state.eventReducer?.eventLanguage?.length > 0 ?
        state.eventReducer.eventLanguage[0]?.data : []) || [];

    useEffect(() => {
        if (event?.data != undefined) {
            setLoader(false)
            props.navigation.goBack();
            Toast.show({
                type: 'success',
                // text1: 'success',
                text2: 'Your event has been created'
            });
            if(props.route?.params?.GoBack){
                props.route?.params.GoBack()
            }
            props.actions.addEventData(
                'addEvent',
                [],
                actionTypes.ADD_EVENT_DATA,
            );
        }
    }, [event])

    useEffect(() => {
        getEventLanguages()
    },[])

    useEffect(() => {
        if(eventLanguageArr?.length > 0 && Platform.OS != 'android'){
            let UpdateLanguage = []
            eventLanguageArr.map((item: any) => {
                UpdateLanguage.push({category: item.language,id: item.id})
            })
            setMyLanguage(UpdateLanguage)
        }
    },[eventLanguageArr])

    //Api Call
    const getEventLanguages = async () => {
        if(Platform.OS == 'android'){
            try {
                let getData = await request({method: 'get', data: {
                    module: 'broadcast_event',
                    action: 'get_broadcast_languages'
                }})
                if(getData?.data?.data?.length > 0)
                {
                    let UpdateLanguage = []
                    getData?.data?.data.map((item: any) => {
                        UpdateLanguage.push({category: item.language,id: item.id})
                    })
                    setMyLanguage(UpdateLanguage)
                }   
            } catch (error) {
                
            }
        }else{
            props.actions.eventLanguage(actionTypes.GET_EVENT_LANGUAGE, {
                module: 'broadcast_event',
                action: 'get_broadcast_languages',
            });
        }
    }


    const openGallery = () => {
        ImagePicker.openPicker({
            multiple: false,
            compressImageMaxWidth: 1080,
            compressImageMaxHeight: 1080,
            cropping: true,
            mediaType: 'photo'
        }).then((image) => {
            setSelectedImage(image)
            setReloadPage(!reloadPage)
        });
    }

    const renderPhaseItem = (item: any) => {
        let selectItem = category == item?.category
        return (
            <View style={[styles.item, { backgroundColor: selectItem ? theme.GHOST_WHITE : theme.PRIMARY }]}>
                <Text style={styles.textItem}>{item.category}</Text>
                {selectItem ? (
                    <AntDesign
                        style={styles.icon}
                        color="#108FE5"
                        name="checkcircle"
                        size={20}
                    />
                ) : null}
            </View>
        );
    };

    const navigateMonth = (flag) => {
        let newDate = ''
        const datte = moment(headerDate, 'MMM DD, YYYY').format('YYYY-MM-DD');
        const chekdate = new Date(datte);
        if (flag == 0) {
            newDate = moment(chekdate).subtract(1, 'month').format("MMM DD, YYYY");
        } else if (flag == 1) {
            newDate = moment(chekdate).add(1, 'month').format("MMM DD, YYYY");
        }
        setHeaderDate(newDate)
        setEventDate(moment(newDate, 'MMM DD, YYYY').format('YYYY-MM-DD'))
        setReloadPage(!reloadPage)
    }

    const navigateYear = (flag) => {
        let newDate = ''
        const datte = moment(headerDate, 'MMM DD, YYYY').format('YYYY-MM-DD');
        const chekdate = new Date(datte);
        if (flag == 0) {
            newDate = moment(chekdate).subtract(1, 'day').format("MMM DD, YYYY");
        } else if (flag == 1) {
            newDate = moment(chekdate).add(1, 'day').format("MMM DD, YYYY");
        }
        setHeaderDate(newDate)
        setEventDate(moment(newDate, 'MMM DD, YYYY').format('YYYY-MM-DD'))
        setReloadPage(!reloadPage)
    }

    const renderCalendarHeader = (date) => {
        return (
            <View style={[styles.activitySubVw, { flex: 1, paddingVertical: 10, marginLeft: -10 }]} >
                <Pressable style={styles.calendarLeftIcon} onPress={() => navigateYear(0)} >
                    <Image source={require('../../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '90deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                </Pressable>
                <Text style={styles.headerDateText} >{headerDate}</Text>
                <Pressable style={styles.calendarLeftIcon} onPress={() => navigateYear(1)} >
                    <Image source={require('../../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7}} />
                </Pressable>
                <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]} >
                    <Pressable style={styles.calendarLeftIcon} onPress={() => navigateMonth(0)} >
                        <Image source={require('../../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '90deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                    <Pressable style={styles.calendarLeftIcon} onPress={() => navigateMonth(1)} >
                        <Image source={require('../../../assets/images/downArrow.png')} style={{ transform: [{ rotate: '270deg' }], tintColor: theme.SECONDARY, width: 10, height: 7 }} />
                    </Pressable>
                </View>
            </View>
        );
    }

    const checkValidation = () => {
        if (categoryId == -1 || eventLanguageId == -1  || speakerName === '' || speakerPrice === '' ||
        // aboutSpeaker === '' || 
        description === '' || (eventLink === '' && eventType == 'Online') || !endDateShow || !startDateShow ||
        (offlineLocation === '' && eventType == 'Offline') || selectedImage == undefined
        ) {
            return false;
        } else {
            return true;
        }
    }

    const publishEvent = () => {
        let City = ''
        if(offlineLocation?.terms?.length > 2){
           const last3Again = offlineLocation?.terms?.slice(offlineLocation?.terms?.length - 3);
           City = last3Again[0]?.value
         }
         if(offlineLocation?.terms?.length > 0){
           const last3Again = offlineLocation?.terms?.slice(offlineLocation?.terms?.length - 1);
           City = last3Again[0]?.value
        }            
        if (checkValidation()) {
            setShowError(false)
            const formDataNew = new FormData();
            formDataNew.append('broadcastCategoryId', categoryId);
            formDataNew.append('name', speakerName);
            // formDataNew.append('aboutSpeaker', aboutSpeaker);
            formDataNew.append('description', description);
            formDataNew.append('joining_link', eventLink);
            formDataNew.append('event_date', eventDate);
            // formDataNew.append('to_time', 10);
            formDataNew.append('broadcast_start', `${eventDate} ${broadCastStart.substring(11, broadCastStart.length)}`);
            formDataNew.append('broadcast_end', `${eventDate} ${broadCastEnd.substring(11, broadCastEnd.length)}`);
            formDataNew.append('userId', userId);
            if(eventType == 'Offline'){
                formDataNew.append('placeId', offlineLocation?.place_id);
                formDataNew.append('placeName', offlineLocation?.description);
                formDataNew.append('placeCity', City);
                formDataNew.append('placeAddress', offlineLocation?.description);
                formDataNew.append('placeLat', '');
                formDataNew.append('placeLong', '');
                formDataNew.append('placeCountry', '');
                formDataNew.append('placeUrl', '');
            }
            // formDataNew.append('googleMapsPlaceId', '');
            formDataNew.append('eventType', eventType);
            formDataNew.append('broadcastLanguageId', eventLanguageId);
            formDataNew.append('price', speakerPrice);
            if (selectedImage != undefined) {
                formDataNew.append('image', { uri: selectedImage?.path, name: 'image.jpg', type: 'image/jpeg' });
            }
            var inputRequest = {
                module: "broadcast_event",
                action: "create",
                formData: formDataNew
            }
            props.actions.addEvent(actionTypes.ADD_EVENT, inputRequest);
            setLoader(true)
        } else {
            setShowError(true)
            Toast.show({
                type: 'error',
                text1: 'Oops',
                text2: 'Please fill up all details'
            });
        }
    }

    useEffect(() => {
        startDate ? setShowCalender(!showCalender): null
        setStartTimeShow(false)
        setEndTimeShow(false)
        startDate ? setStartTimeShow(!isStartTimeShow) : null
    },[startDate, startDateUpdate])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("EVENTS")["CREATE_EVENT"]}
                isRightComponent={true} 
                isText={true}
                rightText={'Cancel'}
                onRightPress={() => props.navigation.goBack()}
                fontColor={theme.BLACK}
               />
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollStyle}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.userImgView}>
                        <Image style={styles.profileImage} source={user_Data?.data?.image == null ? require('../../../assets/images/profileImage.png') : { uri: user_Data?.data?.image }} />
                        <View style={{ marginHorizontal: 7, }}>
                            <Text style={styles.headerTextUser} numberOfLines={1}>{user_Data?.data?.name}</Text>
                            <Text style={styles.disText} numberOfLines={1}>{user_Data?.cancer_category?.name} | {user_Data?.cancer_stage?.cancer_stage}</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => openGallery()} style={[styles.uploadImgButton, styles.commonShadow, showError && selectedImage == undefined && styles.errorMessage]}>
                        {selectedImage != undefined ? <Image style={{height: 190, width : Dimensions.get('screen').width }}
                            source={{ uri: selectedImage?.path }} /> : 
                        <View style={styles.addCover}>
                            <Image source={require('../../../assets/images/eventGallery.png')} />
                            <Text style={styles.uploadText}>{translate("EVENTS")["ADD_COVER_PHOTO"]}</Text>
                        </View>}
                    </Pressable>
                    <CommonDropDown
                        theme={theme}
                        value={speakerName}
                        placeHolder={translate("EVENTS")["EVENT_NAME"]}
                        multiLine={false}
                        editable={true}
                        isIcon={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        onChangeText={(text: any) => { setSpeakerName(text) }}
                        extraInputStyle={styles.extraInputStyle}
                    />
                    <CommonDropDown
                        theme={theme}
                        value={startDateShow ? `${eventDate}  ${eventStartTime}` : ''}
                        placeHolder={translate("EVENTS")["START_DATE_TIME"]}
                        multiLine={true}
                        editable={false}
                        isIcon={true}
                        onComponentPress={() => {
                            setStartDate(true)
                            setEndDate(false)
                            setStartDateUpdate(!startDateUpdate)
                        }}
                        placeholderTextColor={theme.SUB_TITLE}
                        onChangeText={(text: any) => { setSpeakerName(text) }}
                        extraInputStyle={styles.extraInputStyle}
                    />
                    {showCalender && startDate &&
                        <View style={styles.calendarView} >
                            <Calendar
                                initialDate={eventDate}
                                minDate={startMinDate}
                                renderHeader={date => renderCalendarHeader(date)}
                                hideArrows
                                markingType={'custom'}
                                markedDates={{
                                    [eventDate]: {
                                    customStyles: {
                                        container: {backgroundColor: 'rgba(0,128,220,1)'},
                                        text: { color: theme.PRIMARY}
                                    }
                                    }
                                }}
                                enableSwipeMonths={false}
                                // dayComponent={CalendarDayComponent}
                                onDayPress={day => {
                                    let calendarStartDate = moment(day.dateString)
                                    setEventDate(calendarStartDate.format('YYYY-MM-DD'))
                                    setHeaderDate(calendarStartDate.format('MMM DD, YYYY'))
                                    // setShowCalender(false)
                                    setReloadPage(!reloadPage)
                                    setStartDateShow(true)
                                }}
                            />
                        </View>
                    }
                    {isStartTimeShow &&
                        <View style={styles.calendarView} >
                            <DatePicker
                                date={startTimeDate}
                                onDateChange={date => {
                                    let eStartTime = moment(date).format("HH:mm")
                                    let todayDate = moment().format('YYYY-MM-DD')
                                    if (eventDate == todayDate && eStartTime < moment(moment(), "hh:mm").add(0, 'minutes').format("HH:mm")) {
                                        Alert.alert("Error", "Please ensure that start date time is greater than current date time",
                                            [{ text: "OK" }]
                                        );
                                    } else {
                                        setStartTimeDate(date)
                                        setEndTimeDate(new Date(new Date(date).getTime() + 30 * 60000))
                                        const endFromStart = moment(eStartTime, 'HH:mm').add(30, 'minutes').format('hh:mm A');
                                        setEventStartTime(moment(date).format("hh:mm A"))
                                        setEventEndTime(endFromStart)
                                        setBroadCastStart(convertintoISO(date))
                                        // setBroadCastEnd(moment(date).add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"))
                                        let newDate = moment(date).add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss")
                                        setBroadCastEnd(convertintoISO(newDate))
                                    }
                                }}
                                mode={'time'}
                                theme={'light'}
                            />
                            <Pressable onPress={() => { setStartDateUpdate(false)
                                setStartDateShow(true)}} style={styles.applyButton}>
                                <Text style={[styles.applyText, { color: theme.PRIMARY }]}>Apply</Text>
                            </Pressable>
                        </View>
                    }
                    <CommonDropDown
                        theme={theme}
                        value={endDateShow ? `${eventDate}  ${eventEndTime}` : ''}
                        placeHolder={translate("EVENTS")["END_DATE_TIME"]}
                        multiLine={true}
                        editable={false}
                        isIcon={true}
                        onComponentPress={() => {
                            setEndTimeShow(!isEndTimeShow)
                            // setendDateShow(true)
                        }}
                        placeholderTextColor={theme.SUB_TITLE}
                        onChangeText={(text: any) => { setSpeakerName(text) }}
                        extraInputStyle={{fontSize: 14, color: theme.BLACK, fontWeight: '500'}}
                    />
                    {isEndTimeShow &&
                        <View style={styles.calendarView} >
                            <DatePicker
                                date={endTimeDate}
                                onDateChange={date => {
                                    let eEndTime = moment(date).format("HH:mm")
                                    let neweEndTime = moment(startTimeDate, "hh:mm").add(30, 'minutes').format("HH:mm")

                                    if (eEndTime < neweEndTime) {
                                        Alert.alert("Error", "Please ensure that end date time is greater than start date time",
                                            [{ text: "OK" }]
                                        );
                                    } else {
                                        setEventEndTime(moment(date).format("hh:mm A"))
                                        setBroadCastEnd(convertintoISO(date))
                                        setEndTimeDate(date)
                                        setendDateShow(true)
                                    }
                                }}
                                mode={'time'}
                                theme={'light'}
                            />
                            <Pressable onPress={() => { 
                                setendDateShow(true)
                                setEndTimeShow(false)
                                }} style={styles.applyButton}>
                                <Text style={[styles.applyText, { color: theme.PRIMARY }]}>Apply</Text>
                            </Pressable>
                        </View>
                    }
                    <Dropdown
                        style={styles.categoryText}
                        selectedTextStyle={{ color: theme.BLACK }}
                        placeholderStyle={[styles.commonText, styles.extraInputStyle,
                            { color: category != "Category" ? theme.BLACK : theme.SUB_TITLE, fontWeight: '500' }]}
                        inputSearchStyle={{ borderRadius: 10, marginHorizontal: 12 }}
                        containerStyle={{ borderRadius: 20, marginTop: 6, paddingVertical: 10 }}
                        iconStyle={styles.iconStyle}
                        data={myEventCategory}
                        search={false}
                        fontFamily={FONTFAMILY.POPPINS_MEDIUM}
                        renderItem={renderPhaseItem}
                        maxHeight={300}
                        labelField="label"
                        valueField={category}
                        placeholder={category != '' ? category : "Category"}
                        searchPlaceholder={translate("COMMONTEXT")["SEARCH_DOT"]}
                        value={category}
                        onChange={item => {
                            setCategory(item.category)
                            setCategoryId(item?.id)
                        }}
                     />

                    <Dropdown
                        style={styles.categoryText}
                        selectedTextStyle={{ color: theme.BLACK }}
                        placeholderStyle={[styles.commonText,styles.extraInputStyle, { fontSize: 14, 
                            color: eventType != "Event type" ? theme.BLACK : theme.SUB_TITLE, fontWeight: '500'}]}
                        inputSearchStyle={{ borderRadius: 10, marginHorizontal: 12 }}
                        containerStyle={{ borderRadius: 20, marginTop: 6, paddingVertical: 10 }}
                        iconStyle={styles.iconStyle}
                        data={myEventType}
                        search={false}
                        renderItem={renderPhaseItem}
                        maxHeight={300}
                        labelField="label"
                        valueField={eventType}
                        fontFamily={FONTFAMILY.POPPINS_MEDIUM}
                        placeholder={eventType != '' ? eventType : "Event type"}
                        searchPlaceholder={translate("COMMONTEXT")["EVENT_TYPE"]}
                        value={eventType}
                        onChange={item => {
                            setEventType(item.category)
                            setEventTypeId(item?.id)
                        }}
                    />
                    {eventType == 'Offline' ? 
                    <View style={{marginHorizontal: 15, overflow:'hidden'}}>
                        <GooglePlacesAutocomplete
                        placeholder={translate("EVENTS")["LOCATION"]}
                        styles={{
                            textInputContainer: {
                            fontSize: 14, color: theme.BLACK, fontWeight: '500',
                            marginLeft: -5
                            },
                            container:{
                                flex:0,
                                marginTop:10
                            },
                            textInput: {
                                fontSize: 14, color: theme.BLACK, fontWeight: '500',
                                borderBottomWidth:1, borderColor: theme.MEDIUM_GRAY
                            },
                        }}
                        onPress={(data) => {
                            setOfflineLocation(data)
                            setOfflineLocationSemi(data?.description)
                        }}
                        textInputProps={{value: offlineLocationSemi, onChangeText: (value) => {
                            setOfflineLocationSemi(value)
                          }}}
                        query={{
                            key: 'AIzaSyCGH4acjEkrGjauew6afJTzi7i6UiW3Yvs',
                            language: 'en',
                        }}
                        />
                    </View>
                    // <CommonDropDown
                    //     theme={theme}
                    //     value={offlineLocation}
                    //     placeHolder={translate("EVENTS")["LOCATION"]}
                    //     multiLine={false}
                    //     editable={true}
                    //     isIcon={false}
                    //     placeholderTextColor={theme.SUB_TITLE}
                    //     onChangeText={(text: any) => { setOfflineLocation(text) }}
                    //     extraInputStyle={{fontSize: 14, color: theme.BLACK, fontWeight: '500'}}
                    // /> 
                    : eventType == 'Online' ? <CommonDropDown
                        theme={theme}
                        value={onlineLink}
                        placeHolder={translate("EVENTS")["LINK"]}
                        multiLine={false}
                        editable={true}
                        isIcon={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        onChangeText={(text: any) => { setEventLink(text),setOnlineLink(text) }}
                        extraInputStyle={{fontSize: 14, color: theme.BLACK, fontWeight: '500'}}
                    /> : null}

                    <Dropdown
                        style={styles.categoryText}
                        selectedTextStyle={{ color: theme.BLACK }}
                        placeholderStyle={[styles.commonText, styles.extraInputStyle, { color: eventLanguage != "Language" ? theme.BLACK : theme.SUB_TITLE, fontWeight: '500' }]}
                        inputSearchStyle={{ borderRadius: 10, marginHorizontal: 12 }}
                        containerStyle={{ borderRadius: 20, marginTop: 6, paddingVertical: 10 }}
                        iconStyle={styles.iconStyle}
                        data={myLanguage}
                        search={false}
                        renderItem={renderPhaseItem}
                        maxHeight={300}
                        labelField="label"
                        valueField={eventLanguage}
                        fontFamily={FONTFAMILY.POPPINS_MEDIUM}
                        placeholder={eventLanguage != '' ? eventLanguage : "Language"}
                        searchPlaceholder={translate("COMMONTEXT")["EVENT_TYPE"]}
                        value={eventLanguage}
                        onChange={item => {
                            setEventLanguage(item.category)
                            setEventLanguageId(item?.id)
                        }}
                    />
                    <CommonDropDown
                        theme={theme}
                        value={speakerPrice}
                        placeHolder={translate("EVENTS")["PRICE"]}
                        multiLine={false}
                        editable={true}
                        isIcon={false}
                        placeholderTextColor={theme.SUB_TITLE}
                        onChangeText={(text: any) => { setSpeakerPrice(text) }}
                        extraInputStyle={styles.extraInputStyle}
                    />
                    <View style={{marginBottom: 30}}>
                        <CommonDropDown
                            theme={theme}
                            value={description}
                            placeHolder={translate("EVENTS")["ADD_DESCRIPTION"]}
                            multiLine={false}
                            editable={true}
                            isIcon={false}
                            placeholderTextColor={theme.SUB_TITLE}
                            onChangeText={(text: any) => { setDescription(text) }}
                            extraInputStyle={styles.extraInputStyle}
                        />
                    </View>
                    
                    {/* <CommonTextInput
                        value={speakerName}
                        placeholder={translate("EVENTS")["SPEAKER_NAME"]}
                        multiline={false}
                        placeholderTextColor={theme.GRAY_BLACK}
                        onChangeText={(text: any) => { setSpeakerName(text) }}
                        extraStyle={[styles.titleInput, styles.commonText, styles.commonShadow, showError && speakerName === '' && styles.errorMessage]}
                    />
                    <CommonTextInput
                        value={aboutSpeaker}
                        placeholder={translate("EVENTS")["ABOUT_SPEAKER"]}
                        multiline={false}
                        placeholderTextColor={theme.GRAY_BLACK}
                        onChangeText={(text: any) => { setAboutSpeaker(text) }}
                        extraStyle={[styles.titleInput, styles.commonText, styles.commonShadow, showError && aboutSpeaker === '' && styles.errorMessage]}
                    />

                    <CommonTextInput
                        value={description}
                        placeholder={translate("COMMONTEXT")["DESCRIPTION"]}
                        placeholderTextColor={theme.GRAY_BLACK}
                        multiline={true}
                        onChangeText={(text: any) => { setDescription(text) }}
                        extraStyle={[styles.descInput, styles.commonText, styles.commonShadow, showError && description === '' && styles.errorMessage]}
                    />
                    <CommonTextInput
                        value={eventLink}
                        multiline={false}
                        placeholder={translate("EVENTS")["EVENT_LINK"]}
                        placeholderTextColor={theme.GRAY_BLACK}
                        onChangeText={(text: any) => { setEventLink(text) }}
                        extraStyle={[styles.titleInput, styles.commonText, styles.commonShadow, showError && eventLink === '' && styles.errorMessage]}
                    />
                    <View style={[styles.dateInput, styles.commonShadow]}>
                        <View style={[styles.activitySubVw, styles.activitySubVwTwo]}>
                            <Pressable style={[styles.dateTimeVw]} onPress={() => {
                                setShowCalender(!showCalender)
                                setStartTimeShow(false)
                                setEndTimeShow(false)
                            }} >
                                <Text style={[styles.dateTimeText]} >{eventDate}</Text>
                            </Pressable>
                            <View style={[styles.activitySubVw, { position: 'absolute', right: 0 }]}>
                                <Pressable style={[styles.dateTimeVw, { marginRight: 5 }]} onPress={() => {
                                    setStartTimeShow(!isStartTimeShow)
                                    setShowCalender(false)
                                    setEndTimeShow(false)
                                }}>
                                    <Text style={[styles.dateTimeText]} >{eventStartTime}</Text>
                                </Pressable>
                                <Pressable style={styles.dateTimeVw} onPress={() => {
                                    setEndTimeShow(!isEndTimeShow)
                                    setStartTimeShow(false)
                                    setShowCalender(false)
                                }}>
                                    <Text style={[styles.dateTimeText]} >{eventEndTime}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View> */}
                   {/* <Pressable onPress={() => openGallery()} style={[styles.uploadImgButton, styles.commonShadow, showError && selectedImage == undefined && styles.errorMessage]}>
                        <Feather name='upload' size={18} color={theme.PAGINATION_SELECCT} />
                        <Text style={styles.uploadImage}>{translate("EVENTS")["UPLOAD_PHOTO"]}</Text>
                        <Text style={styles.uploadImageDesc}>{translate("COMMONTEXT")["BROWSE"]}</Text>
                    </Pressable> */}
                    {/* {selectedImage != undefined && <Text style={styles.uploadFile}>{translate("COMMONTEXT")["UPLOADING"]}</Text>}
                    {selectedImage != undefined &&
                        <View style={styles.extraPadding}>
                            <View style={[, styles.renderMainView, {
                                marginTop: 12
                            }]}>
                                <Pressable style={styles.renderIconImage}
                                    onPress={() => { }}>
                                    <Image style={styles.fileNameView} source={{ uri: selectedImage?.path }} />
                                </Pressable>

                                <Pressable style={styles.deleteView} onPress={() => setSelectedImage(undefined)}>
                                    <Icon name='delete' size={16} style={{ color: theme.PRIMARY }} />
                                </Pressable>
                            </View>

                        </View>} */}
                </ScrollView>
            </View>

            <Pressable disabled ={!checkValidation()} onPress={() => { publishEvent() }} style={[styles.saveButton,{
                backgroundColor:checkValidation() ? theme.PAGINATION_SELECCT : theme.MEDIUM_GRAY
            }]}>
                <Text style={[styles.headerText, { color: theme.PRIMARY }]}>{translate("EVENTS")["CREATE_EVENT"]}</Text>
            </Pressable>
        </SafeAreaView>

    );
};
export default withTheme(Layout);