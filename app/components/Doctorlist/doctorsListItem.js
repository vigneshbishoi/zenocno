import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Pressable, Platform, Image, Share } from 'react-native';
import Calendar from '../../assets/images/calendaricon.svg'
import Education from '../../assets/images/education.svg'
import Star from '../../assets/images/Star.svg'
import DotMenu from '../../assets/images/dotMenu.svg'
import Story from '../../assets/images/story.svg'
import Bookmark from '../../assets/images/Bookmark.svg'
import ShareIcon from '../../assets/images/shareProductIcon.svg'
import DoctorBriefCase from '../../assets/images/doctorBriefCase.svg'
import RatingHeart from '../../assets/images/ratingHeart.svg'
import CertifiedDoctorIcon from '../../assets/images/certifiedDoctor.svg'
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import TimeSlot from './timeSlot';
import Toast from 'react-native-toast-message';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import DoctorCardInfo from './doctorCardInfo';
import AppointmentCardInfo from './appointmentCardInfo';

const DoctorsListItem = ((props) => {
    const { item,index, theme, navigation, isDoctorsList = false, bookNow, dates, slots, book, bookSlot, searchValue = false,
        selectAvailableDate, setSelectAvailbleDate,selectAvailableTime,  setSelectAvailbleTime, selectedDate, setSelectDate, onSaveDoctorBookMark, hasDoctorsDetails=false } = props
    const styles = modalStyles(theme);
    const menuPopUp = React.createRef();
    useEffect(() => {
        setSelectAvailbleDate(dates?.length > 0 ? dates[0] : '')
        // setSelectAvailbleTime(slots?.length > 0 ? slots[0] : '')    // Pre selected time slot
        setSelectDate(dates?.length > 0 ? dates[0]?.date : '')
    }, [props.dates])


    const postOption = () => {
        return (
            <Menu
                ref={menuPopUp}
                style={{ borderRadius: 6, borderWidth: 1, borderColor: '#dcd8d8', width: 110, height: 100, marginTop: 23}}
                anchor={
                    <Pressable onPress={() => menuPopUp.current.show()} style={{ marginTop: -5, width: 30, height: 50, alignItems: 'center', justifyContent: 'center', marginRight:10}}>
                       <DotMenu />
                    </Pressable>}
                onRequestClose={() => menuPopUp.current.hide()}>
                <MenuItem style={{ alignItems:'center' }} 
                onPress={() => { onSaveDoctorBookMark();
                    // menuPopUp.current.hide()
                }}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Bookmark /> 
                        <Text style={styles.popupMenuText}>Save</Text>
                    </View>
                </MenuItem>
                <MenuItem style={{ alignItems:'center' }} onPress={() =>{
                   Share.share({
                    message:
                    `I wanted to share profile of {{appt_names.name}} ${item?.doctorName} who specializes in {{appt_categories.name}}${item?.appt_category?.categoryName} . Appointment with him can be easily booked from the Zen Cancer Care App. \n\nAndroid: https://play.google.com  \niOS: https://www.apple.com/in/app-store`,
                  });
                }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <ShareIcon /> 
                        <Text style={styles.popupMenuText}>Share</Text>
                    </View>
                </MenuItem>
            </Menu>
        );
    }

    return (
        <Pressable style={[styles.itemContainer, isDoctorsList && styles.dropshadow]} onPress={() => navigation.navigate('Zen.DoctorDetails', { item: item })} >
            {/* <View style={styles.itemSubContainer} >
                <ImageBackground style={styles.itemImage} source={ searchValue ? item?.image == null || item?.image == "" || item?.image == undefined ? require('../../assets/images/profileImage.png') : { uri: item?.image } :
                    item?.doctorImage == null || item?.doctorImage == "" || item?.doctorImage == undefined ? require('../../assets/images/profileImage.png') : { uri: item?.doctorImage }} >
                    {isDoctorsList &&
                        <View style={styles.expertView} >
                            <CertifiedDoctorIcon/>
                        </View>
                    }
                </ImageBackground>
                <View style={styles.itemDescriptionContainer} >
                    <Text style={[styles.doctorNameTxt, !isDoctorsList && {fontSize:15}]} numberOfLines={1} >{item?.doctorName || item?.appt_name?.name || item?.name}</Text>
                    <Text style={[styles.expertizationTxt,!isDoctorsList && {fontSize:13}]} numberOfLines={1} >{item?.educationSummary || item?.appt_name?.educationSummary} </Text>
                    <View style={[styles.itemFlex, styles.commonViewStyle, isDoctorsList && { width: '85%' }]} >
                        <DoctorBriefCase />
                        <Text style={[styles.commonText, { marginLeft: 5 },!isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.expYears || item?.appt_name?.expYears} years of experience</Text>
                    </View>
                    <View style={[styles.itemFlex, styles.commonViewStyle, isDoctorsList && { width: '85%' }]} >
                        <Education/>
                        <Text style={[styles.commonText, { marginLeft: 5 },!isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.educationSummary || item?.appt_name?.educationSummary}</Text></View>
                    <View style={[styles.itemFlex, styles.commonViewStyle, isDoctorsList && { width: '85%' }]} >
                        <RatingHeart/>
                        <Text style={[styles.commonText, { marginLeft: 5 },!isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.total_review}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: -10, top: -7 }}>
                 {postOption()}
                </View>
            </View> */}
                <DoctorCardInfo
                    item={item}
                    theme={theme}
                    navigation={props.navigation}
                    onSaveDoctorBookMark={onSaveDoctorBookMark}
                />
                {/* <View style={[styles.itemFlex, { width: '14%' }]} >
                    <Star />
                    <Text style={[styles.commonText, styles.commonStyle , !isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.total_review?.toString() || item?.appt_name?.total_review?.toString()}</Text>
                </View> */}
                <View style={[styles.extraInfoContainer, isDoctorsList ? styles.padding1 : styles.padding2]} >
                <View style={[styles.itemFlex]} >
                    {item?.total_review !== 0 && <View style={{flexDirection:'row'}}>
                    <Story/>
                    <Text style={[styles.commonText, styles.commonStyle,!isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.total_review} reviews</Text>

                    </View>}
                    {/* <Text style={[styles.commonText, styles.commonStyle,!isDoctorsList && {fontSize:12}]} numberOfLines={1} >{item?.total_story?.toString() || item?.appt_name?.totol_story?.toString()} reviews</Text> */}
                     </View>
                        <View style={styles.jsCenter}>
                        <Text style={[isDoctorsList ? styles.feesIsDText : styles.feesText]} numberOfLines={1} >{`\u20B9` + " " + (item?.fee || item?.appt_name?.fee)} </Text>
                        {isDoctorsList &&
                            <Pressable style={styles.bookButtonVw} onPress={() => {
                                if(book == index){
                                    if(selectAvailableDate?.date?.length > 0 && selectAvailableTime.length > 0){
                                        navigation.navigate('Zen.VideoAppointment',{item:item, date: selectAvailableDate, time: selectAvailableTime})
                                    } else {
                                        Toast.show({
                                            type: 'error',
                                            text1: "Please select one slot please",
                                        })
                                    }
                                    
                                } else {
                                    bookNow(item)
                                }
                            }} >
                                <Text style={styles.bookText} numberOfLines={1}>{translate("COMMONTEXT")["BOOK"]}</Text>
                            </Pressable>}
                        </View>
                    </View>
            {
                index === book ?
                <View style={styles.lightDividerLine} />
                :
                <View style={styles.dividerLine} />
            }
            {index == book &&
            <TimeSlot dates={dates} theme={theme} slots={slots} 
            selectAvailableDate={selectAvailableDate}
            selectAvailableTime={selectAvailableTime}
            selectedDate={selectedDate}
            setSelectAvailbleDate={setSelectAvailbleDate}
            setSelectAvailbleTime={setSelectAvailbleTime}
            setSelectDate={setSelectDate}
            bookSlot={bookSlot}
            onSelectSlot={()=>{
                navigation.navigate('Zen.VideoAppointment',{item:item, date: selectAvailableDate, time: selectAvailableTime})
            }}
            
            />}
      
        </Pressable>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        itemContainer: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 0,
            paddingHorizontal:0,
        },
        dropshadow: {
            // borderRadius: 10,
            // marginVertical: 8,
            // elevation: Platform.OS === 'ios' ? 0 : 5,
            // shadowColor: 'grey',
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
        },
        line: {
            backgroundColor: '#dff1ff',
            height: 1.5,
        },
        dividerLine: {
            backgroundColor: theme.BORDER_GREAY,
            height: 1,
            width:'95%',
            alignSelf:'center'
        },
        lightDividerLine: {
            backgroundColor: theme.LIGHT_BORDER,
            height: 1,
            width:'100%',
            alignSelf:'center'
        },
        itemSubContainer: {
            flexDirection: 'row',
            margin: 5,
            paddingTop:'2%',
            paddingHorizontal:15
        },
        itemFlex: {
            flexDirection: 'row',
            alignItems:'center'
        },
        commonViewStyle: {
            marginTop: Platform.OS === 'ios' ? 5 : 2
        },
        itemImage: {
            width: 100,
            height: 100,
            borderRadius: 10,
            overflow: 'hidden'
        },
        expertView: {
            // backgroundColor: theme.PRIMARY,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            position: 'absolute',
            right: Platform.OS === 'ios' ? 0 : 1.5,
            top: 0,
            padding: 4
        },
        itemDescriptionContainer: {
            width: '65%',
            marginHorizontal: 7,
            marginVertical: 5,
        },
        expertizationTxt: {
          color: theme.SUB_TITLE,
          fontSize: 12,
          fontFamily: FONTFAMILY.POPPINS_MEDIUM,
          lineHeight:18,
          marginTop: Platform.OS === 'ios' ? 0 : -3,
        },
        feesIsDText: {
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? 0 : -3,
            fontSize: 16, marginRight: '28%'
        },
        feesText: {
          color: theme.BLACK,
          fontSize: 16,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? 0 : -3,
            position:'absolute', right: '25%'
        },
        doctorNameTxt: {
            color: theme.BLACK,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            lineHeight:18
        },
        commonText: {
            color: theme.SUB_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            lineHeight:17,
            marginLeft: 7
        },
        commonStyle: {
            color: theme.SECONDARY,
            marginLeft: 5
        },
        dateTimeText: {
            color: theme.SEARCH_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginTop: Platform.OS === 'ios' ? 0 : -3
        },
        bookButtonVw: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.SECONDARY,
            borderRadius: 4,
            paddingHorizontal: Platform.OS === 'ios' ? 30 : 30,
            paddingVertical: Platform.OS === 'ios' ? 10 : 10,
            position: 'absolute', 
            right: 0,
        },
        bookText: {
            color: theme.PRIMARY,
            fontSize: 12,
            lineHeight:16,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        calendarIconVw: {
            position: 'absolute',
            right: Platform.OS === 'ios' ? 10 : 0,
            padding: 5
        },
        extraInfoContainer: {
            // marginTop: 2,
            flexDirection: 'row',
            alignItems: 'center',
            // marginHorizontal: '3%',
            justifyContent:'space-between',
            paddingHorizontal: 15
        },
        padding1: {
            paddingTop: Platform.OS === 'ios' ? 0 : 10,
            paddingBottom: Platform.OS === 'ios' ? 13 : 10,
        },
        padding2: {
            paddingVertical: 11,
        },
        jsCenter:{
            justifyContent:'center'
        },
        popupMenuText: {
            marginLeft:10, 
            color: theme.BLACK,
            fontSize: 12,
            lineHeight:16,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM},
        fulfilledText:{
            color: theme.SEARCH_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            lineHeight:18
        }
    });
};
export default DoctorsListItem;  