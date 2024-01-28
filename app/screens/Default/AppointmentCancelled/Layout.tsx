/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useEffect } from 'react';
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
    BackHandler
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import CancelDate from '../../../assets/images/cancelDate.svg';
import translate from "../../../utils/Text"
import AppointmentStatus from '../../../components/Doctorlist/appointmentStatus';
import BookingDetails from '../../../components/Doctorlist/bookingDetails';
import AppHeader from '../../../components/CommonInput/appHeader';
import DoctorCardInfo from '../../../components/Doctorlist/doctorCardInfo';
import NeedHelp from '../../../components/NeedHelp';
import OnlineConsultation from '../../../components/OnlineConsultation';

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

    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate('Zen.MyAppointment')
            return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            {/* <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.navigate('Zen.MyAppointment')}
                headerTitle={translate("DOCTORSLIST")["APPN_CANCELLED"]}
                isRightComponent={false}
                isSubText={true}
                // subText={`${translate("DOCTORSLIST")["APPN_ID"]}: ${item?.id}`}
                headerFontColor={'#ff4040'}
            /> */}
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* <View style={styles.doctorInfovw} >
                    <Image style={styles.doctorImage} source={ item?.appt_name?.image == null || item?.appt_name?.image == "" || item?.appt_name?.image == undefined ? require('../../../assets/images/profileImage.png') : {uri : item?.appt_name?.image}} />
                    <View style={styles.doctorInfo} >
                        <Text style={[styles.doctorName, { marginTop: Platform.OS === 'ios' ? 7 : 4 }]} numberOfLines={1} >{item?.appt_name?.name}</Text>
                        <Text style={[styles.expertizationText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]} numberOfLines={1} >{item?.appt_name?.educationSummary}</Text>
                    </View>
                </View> */}
             
                <View>
                    <DoctorCardInfo
                        item={item}
                        theme={theme}
                        navigation={props.navigation}
                        onSaveDoctorBookMark={()=> null}
                    />
                </View>
                <View style={styles.cancelAppointmentContainer}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <CancelDate />
                        <Text style={styles.appointmentCancelText}>
                            {translate('DOCTORSLIST')['APPN_CANCELLED']}
                        </Text>
                    </View>
                    <Text style={styles.appointmentCancelSubText}>
                       {translate('COMMONTEXT')['APPOINTMENT_CANCELLED']}
                    </Text>
                </View>
                <View style={{marginHorizontal: 20, marginBottom:11, marginTop:11}}>
                    <NeedHelp navigation={props.navigation}/>
                </View>
                <OnlineConsultation />  
                <View style={styles.bottomLine} />
                <AppointmentStatus theme={theme} isFromVideoApp={false} isFromCancel={true} isFromCancelled={true} date={item?.apptDate} time={item?.apptTime}/>
                <Pressable style={styles.bookAgainButtonVw} onPress={() => {
                        props.navigation.navigate('Zen.DoctorDetails', { item: item, isFromCancel: true })
                    }} >
                        <Text style={styles.bookAgainText} numberOfLines={1} >{translate("DOCTORSLIST")["BOOK_AGAIN"]}</Text>
                    </Pressable>
                <View style={styles.desContainer} >
                    {/* <Text style={[styles.doctorName, { fontSize: 18 }]} numberOfLines={1} >{translate("DOCTORSLIST")["NEED_HELP"]}</Text>
                    <Text style={[styles.desText, { lineHeight: 18, marginVertical: Platform.OS === 'ios' ? 5 : 2 }]} >{translate("DOCTORSLIST")["CANCELLED_DES"]}</Text>
                    <Text style={[styles.expertizationText, {fontSize:20}]} numberOfLines={1} >{'+91 99 30 70 90 00'}</Text>
                    <Text style={[styles.doctorName, styles.extraTitleText]} numberOfLines={1} >{translate("DOCTORSLIST")["BOOKING_DETAILS"]}</Text> */}
                    <BookingDetails
                        theme={theme}
                        item={item}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(Layout);