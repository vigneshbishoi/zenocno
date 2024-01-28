/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React from 'react';
import style from './Style';
import {
    Image,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
import Reschedule from "../../../assets/images/reschedule.svg";
import Cancel from "../../../assets/images/cancel.svg";
import NeedHelp from "../../../assets/images/needHelp.svg";
import Verified from "../../../assets/images/verified.svg";
import CheckRight from "../../../assets/images/checkRight.svg";
import AppointmentStatus from '../../../components/Doctorlist/appointmentStatus';
import BookingDetails from '../../../components/Doctorlist/bookingDetails';
import moment from 'moment'
import DoctorCardInfo from '../../../components/Doctorlist/doctorCardInfo';
import OnlineConsultation from '../../../components/OnlineConsultation';
import NeedHelpComponent from '../../../components/NeedHelp';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const item = props?.route?.params?.item
    let currentTime = moment(moment(), "HH:mm").format('HH:mm:ss');
    let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');

    const cancelVw = () => (
        <Pressable style={styles.fdView} onPress={() => {
            props.navigation.navigate("Zen.AppointmentCancellation",{item:item})
        }} >
            <Cancel width={21} height={21} style={{ marginRight: 19 }} />
            <Text style={[styles.doctorName, styles.extraTitleText]} numberOfLines={1} >{translate("COMMONTEXT")["CANCEL"]}</Text>
        </Pressable>
    )
    const resheduleVw = () => (
        <Pressable style={[styles.fdView, { marginTop: Platform.OS === 'ios' ? 20 : 17 }]} onPress={() => {
            props.navigation.navigate('Zen.TimeSlots', { item: item })
        }}>
            <Reschedule width={28} height={28} style={{ marginRight: 12 }} />
            <Text style={[styles.doctorName, styles.extraTitleText]} numberOfLines={1} >{translate("DOCTORSLIST")["RESCHEDULE"]}</Text>
        </Pressable>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <View style={styles.headerVw}>
                <Pressable onPress={() => { props.navigation.pop() }} style={styles.backVw}>
                    <Back width={8} height={15} />
                </Pressable>
                <View style={{ marginHorizontal: 40 }} >
                    <Text numberOfLines={1} style={styles.headerTxt} >{translate("DOCTORSLIST")["APPN_CONFIRMED"]}</Text>
                    {/* <Text numberOfLines={1} style={[styles.commonText,{marginTop: Platform.OS === 'ios' ? 0 : -5}]} >{translate("DOCTORSLIST")["APPN_ID"]}: {item?.id}</Text> */}
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <DoctorCardInfo
                    item={item}
                    theme={theme}
                    navigation={props.navigation}
                    onSaveDoctorBookMark={()=> null}
                />
                <OnlineConsultation />  
                <View style={styles.bottomLine} />
                <AppointmentStatus theme={theme} isFromVideoApp={false} date={item?.apptDate} time={item.apptTime}/>
                
                <View style={{marginHorizontal: 20}}>
                    <NeedHelpComponent />
                </View>

                {/* <View style={styles.bottomLine} /> */}
                <View style={styles.desContainer} >
                    {/* <Text style={[styles.doctorName, { fontSize: 18 }]} numberOfLines={1} >{translate("DOCTORSLIST")["NEED_HELP"]}</Text> */}
                    <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["HELP_DES"]}</Text>
                    {currentDate < item.apptDate ?
                    resheduleVw()  :   currentDate == item.apptDate && item.apptTime > currentTime  ?
                    resheduleVw() : <View/>}
                    {currentDate < item.apptDate ?
                    cancelVw()  :   currentDate == item.apptDate && item.apptTime > currentTime  ?
                    cancelVw() : <View/>}
                    <View style={{height:10, width:'100%'}} />
                    <View style={styles.dividerLine} />

                    {/* <View style={styles.fdView} >
                        <NeedHelp width={21} height={20} style={{ marginRight: 19 }} />
                        <Text style={[styles.doctorName, styles.extraTitleText]} numberOfLines={1} >{translate("DOCTORSLIST")["HELP_ISSUE"]}</Text>
                    </View> */}
                    {/* <View style={styles.promiseContainer} >
                        <View style={styles.promiseVw} >
                            <Verified />
                            <Text style={[styles.doctorName, styles.extraPromiseText]} numberOfLines={1} >{translate("DOCTORSLIST")["NEED_HELP"]}</Text>
                        </View>
                        <View style={styles.promiseTopicVw} >
                            <CheckRight />
                            <View style={{ marginHorizontal: 12 }} >
                                <Text style={[styles.doctorName, { fontSize: 16 }]} numberOfLines={1} >{translate("DOCTORSLIST")["30M_WAIT"]}</Text>
                                <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["30M_DES"]}</Text>
                            </View>
                        </View>
                        <View style={[styles.promiseTopicVw, { marginBottom: Platform.OS === 'ios' ? 15 : 13 }]} >
                            <CheckRight />
                            <View style={{ marginHorizontal: 12 }} >
                                <Text style={[styles.doctorName, { fontSize: 16 }]} numberOfLines={1} >{translate("DOCTORSLIST")["NO_EXTRA_CHARGE"]}</Text>
                                <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["NO_EXTRA_DES"]}</Text>
                            </View>
                        </View>
                    </View> */}
                     <BookingDetails
                        theme={theme}
                        item={item}
                    />
                </View>
            </ScrollView>
            {/* <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.doctorInfovw} >
                    <Image style={styles.doctorImage} source={ item?.appt_name?.image == null || item?.appt_name?.image == "" || item?.appt_name?.image == undefined ? require('../../../assets/images/profileImage.png') : {uri:item?.appt_name?.image}} />
                    <View style={styles.doctorInfo} >
                        <Text style={[styles.doctorName, { marginTop: Platform.OS === 'ios' ? 7 : 4 }]} numberOfLines={1} >{item?.appt_name?.name}</Text>
                        <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]} numberOfLines={1} >{item?.appt_name?.educationSummary}</Text>
                    </View>
                </View>
                <View style={styles.bottomLine} />
                <AppointmentStatus theme={theme} isFromVideoApp={false} date={item?.apptDate} time={item.apptTime}/>
                <View style={styles.bottomLine} />
                <View style={styles.desContainer} >
                    <Text style={[styles.doctorName, { fontSize: 18 }]} numberOfLines={1} >{translate("DOCTORSLIST")["NEED_HELP"]}</Text>
                    <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["HELP_DES"]}</Text>
                    {currentDate < item.apptDate ?
                    resheduleVw()  :   currentDate == item.apptDate && item.apptTime > currentTime  ?
                    resheduleVw() : <View/>}
                    {currentDate < item.apptDate ?
                    cancelVw()  :   currentDate == item.apptDate && item.apptTime > currentTime  ?
                    cancelVw() : <View/>}
                    <View style={styles.fdView} >
                        <NeedHelp width={21} height={20} style={{ marginRight: 19 }} />
                        <Text style={[styles.doctorName, styles.extraTitleText]} numberOfLines={1} >{translate("DOCTORSLIST")["HELP_ISSUE"]}</Text>
                    </View>
                    <View style={styles.promiseContainer} >
                        <View style={styles.promiseVw} >
                            <Verified />
                            <Text style={[styles.doctorName, styles.extraPromiseText]} numberOfLines={1} >{translate("DOCTORSLIST")["NEED_HELP"]}</Text>
                        </View>
                        <View style={styles.promiseTopicVw} >
                            <CheckRight />
                            <View style={{ marginHorizontal: 12 }} >
                                <Text style={[styles.doctorName, { fontSize: 16 }]} numberOfLines={1} >{translate("DOCTORSLIST")["30M_WAIT"]}</Text>
                                <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["30M_DES"]}</Text>
                            </View>
                        </View>
                        <View style={[styles.promiseTopicVw, { marginBottom: Platform.OS === 'ios' ? 15 : 13 }]} >
                            <CheckRight />
                            <View style={{ marginHorizontal: 12 }} >
                                <Text style={[styles.doctorName, { fontSize: 16 }]} numberOfLines={1} >{translate("DOCTORSLIST")["NO_EXTRA_CHARGE"]}</Text>
                                <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["NO_EXTRA_DES"]}</Text>
                            </View>
                        </View>
                    </View>
                     <BookingDetails
                            theme={theme}
                            item={item}
                        />
                </View>
            </ScrollView> */}
        </SafeAreaView>
    );
};

export default withTheme(Layout);