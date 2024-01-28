
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnlineVideo from '../assets/images/onlineVideo.svg'
import { FONTFAMILY } from '../config/font-config';
import { withTheme, _changeTranslations } from '../utils/ThemeProvider';
import translate from "../utils/Text"

const OnlineConsultation = (props: any) => {
  const styles = modalStyles(props.theme);
  return (
    <View style={styles.container}>
      <OnlineVideo />
      <Text style={styles.onlineLable}>
        {
          translate("COMMONTEXT")["ONLINE_CUNSULTATION"]
        }
      </Text>
    </View>
  );
};

const modalStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignContent: 'center',
      backgroundColor:theme.LIGHT_BLUE,
      paddingVertical:6,
      paddingLeft:16
    },
    onlineLable: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 22,
      marginLeft: 8
    },

  });
};
export default withTheme(OnlineConsultation); 
