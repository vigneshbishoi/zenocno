
import React from 'react';
import {View, Text, StyleSheet, Linking, Pressable} from 'react-native';
import Call from '../assets/images/call_btn.svg';
import Message from '../assets/images/message_btn.svg';
import { FONTFAMILY } from '../config/font-config';
import { withTheme, _changeTranslations } from '../utils/ThemeProvider';
import translate from "../utils/Text"

const NeedHelp = (props: any) => {
  const styles = modalStyles(props.theme);
  return (
    <View
      style={styles.container}>
      <View
        style={styles.msgTextContainer}>
        <Text
          style={styles.titleText}>
         {translate("DOCTORSLIST")["NEED_HELP"]}
        </Text>
        <Text
          style={styles.subTitleText}>
          {translate("DOCTORSLIST")["NEED_HELP_DES"]}
        </Text>
      </View>
      <View
        style={styles.buttonWrapper}>
        <Pressable
          onPress={() => {
            Linking.openURL(`tel:${'+919930709000'}`);
          }}>
          <Call />
        </Pressable>
        <Pressable
          style={styles.msgBtnContainer}
          onPress={() =>{
            let user = {
              name: "ZenOnco.io",
              image: "https://zenapp.s3.ap-south-1.amazonaws.com/zen/AppIcon.png",
              userId: 1,
              cancerName: "",
              cancerStage: ""
            }
            props.navigation.navigate('Zen.Chat', { user: user });
          }}>
          <Message />
        </Pressable>
      </View>
    </View>
  );
};

const modalStyles = (theme: any) => {
  return StyleSheet.create({
      container:{
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: theme.LIGHT_BORDER,
        borderRadius: 6,
        backgroundColor: theme.TERTIARY,
        paddingVertical: 15,
        paddingHorizontal: 20,

      },
      msgTextContainer:{
        width: '75%',
      },
      titleText:{
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
        lineHeight: 30,
      },
      subTitleText:{
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        lineHeight: 16,
      },
      buttonWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '25%',
        justifyContent: 'center',
      },
      msgBtnContainer:{marginLeft: 12, alignSelf: 'center'}
  });
};
export default  withTheme(NeedHelp); 
