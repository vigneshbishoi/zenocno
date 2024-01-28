/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    FlatList,
    Image,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
import PhysicalAppointment from '../../../components/Doctorlist/physicalAppointment.js'
import VideoAppointment from '../../../components/Doctorlist/videoAppointment.js'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import {handleSlots} from '../../../utils/commonFunction'
import moment from 'moment'

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const [tabSelectedId, setTabSelection] = useState(0)
    const [slots, setSlots] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [valueChange, setValueChange] = useState(false);
    const item = props?.route?.params?.item
    const isFromCancel =  props?.route?.params?.isFromCancel
    const doctorDetail =
        useSelector((state) => state?.appointmentReducer?.doctorDetail?.length > 0 ?
            state?.appointmentReducer?.doctorDetail[0] : []) || [];
    const doctorSchedule =
        useSelector((state) => state?.appointmentReducer?.schedule?.length > 0 ?
            state?.appointmentReducer?.schedule[0] : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);

    //Lifecycle Methods
    useEffect(() => {
        getDoctoDetail()
        getSchedule()
    }, [])
    useEffect(() => {
        if(doctorSchedule != undefined && doctorSchedule?.data?.length > 0){
            handleSlots(doctorSchedule, setSlots, setBookedSlots, setAvailableDates)
            setValueChange(!valueChange)
        }
    }, [doctorSchedule])

    //Api Call
    const getDoctoDetail = () => {
        props.actions.doctorDetail(actionTypes.DOCTOR_DETAIL, {
            module: 'appointment',
            action: 'doctor_detail_page',
            formData: {
                doctorId: isFromCancel != undefined ? item?.appt_name?.id : item?.id || item?.appt_name?.id
            }
        });
    }
    const getSchedule = () => {
        props.actions.doctorSchedule(actionTypes.DOCTOR_SCHEDULE, {
            module: 'appointment',
            action: 'get_reschedule_appointment',
            formData: {
                doctorId: isFromCancel != undefined ? item?.appt_name?.id : item?.id || item?.appt_name?.id
            }
        });
    }
    const onPressBookMark = (id: number) => {
        var inputRequest = {
          module: "cancerHealingStory",
          action: "updateBookmark",
          formData: {
            userId: userId,
            cancerHealingStoryId: id
          }
        }
        props.actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest);
      }

     return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <View style={styles.headerVw}>
                <Pressable onPress={() => { props.navigation.pop() }} style={styles.backVw}>
                    <Back width={8} height={15} />
                </Pressable>
                {/* <View style={styles.selectionView} >
                    <Pressable style={[tabSelectedId == 0 ? styles.tabSelectedView : styles.tabUnSelectedView]} onPress={() => {
                        setTabSelection(0)
                    }}>
                        <Text style={[styles.tabText, { color: tabSelectedId == 0 ? theme.ICON_TINT : theme.PRIMARY }]} numberOfLines={1} >{translate("COMMONTEXT")["PHYSICAL"]}</Text>
                    </Pressable>
                    <Pressable style={[tabSelectedId == 1 ? styles.tabSelectedView : styles.tabUnSelectedView]} onPress={() => {
                        setTabSelection(1)
                    }}>
                        <Text style={[styles.tabText, { color: tabSelectedId == 1 ? theme.ICON_TINT : theme.PRIMARY }]} numberOfLines={1} >{translate("COMMONTEXT")["VIDEO"]}</Text>
                    </Pressable>
                </View> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <PhysicalAppointment
                    item={doctorDetail}
                    mainItem={item}
                    theme={theme}
                    dates={availableDates}  
                    slots={slots}
                    bookSlot={doctorSchedule?.app_booking?.length > 0 ? doctorSchedule?.app_booking : []}
                    getDoctoDetail={getDoctoDetail}
                    onPressBookMark={onPressBookMark}
                    userId={userId}
                    navigation={props.navigation}
                    isFromCancel={isFromCancel}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(Layout);