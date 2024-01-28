import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Pressable,
  Platform,
  Image,
  Share,
} from 'react-native';
import UserIcon from '../../assets/images/user.svg';
import CancelDate from '../../assets/images/cancelDate.svg';
import {FONTFAMILY} from '../../config/font-config';
import translate from '../../utils/Text';
import {withTheme} from '../../utils/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import DoctorCardInfo from './doctorCardInfo';

const AppointmentCardInfo = props => {
  const {
    item,
    theme,
    onSaveDoctorBookMark,
    isAppointmentCancelled = false,
  } = props;
  const navigation = useNavigation();
  const styles = modalStyles(theme);

  return (
    <View style={styles.container}>
      {isAppointmentCancelled && (
        <View style={styles.cancelAppointmentContainer}>
          <CancelDate />
          <Text style={styles.appointmentCancelText}>
            {translate('DOCTORSLIST')['APPN_CANCELLED']}
          </Text>
        </View>
      )}
      <View style={styles.subContainer}>
        <DoctorCardInfo
          myAppointments
          item={item}
          theme={theme}
          navigation={props.navigation}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.subBottomContainer}>
            <UserIcon />
            <View>
              <Text style={styles.bookedForText}>
                {translate('DOCTORSLIST')['BOOKED_FOR']}
              </Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.bookButtonVw} onPress={() => null}>
              <Text style={styles.bookText} numberOfLines={1}>
                {translate('DOCTORSLIST')['BOOK_AGAIN']}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const modalStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      marginTop: 30,
      borderRadius: 8,
      borderWidth: 1,
      marginLeft: 17,
      marginRight: 13,
      borderColor: theme.SECONDARY_BORDER,
    },
    subContainer: {
      paddingHorizontal: 11,
      paddingTop: 7,
      paddingBottom: 14,
    },
    cancelAppointmentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFE9EC',
      paddingLeft: 10.3,
      paddingTop: 6,
      paddingBottom: 9.7,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    bookedForText: {
      color: theme.GRAY_BLACK,
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 24,
      marginLeft: 6.3,
    },
    bookButtonVw: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.SECONDARY,
      borderRadius: 4,
      paddingHorizontal: Platform.OS === 'ios' ? 15 : 15,
      paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    },
    appointmentCancelText: {
      color: theme.SECONDARY_RED,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 30,
      marginLeft: 5.3,
    },
    bookText: {
      color: theme.PRIMARY,
      fontSize: 12,
      lineHeight: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subBottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export default withTheme(AppointmentCardInfo);
