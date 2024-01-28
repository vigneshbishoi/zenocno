/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */

import React, { useState, useEffect } from 'react';
import style from './Style';
import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Platform, Keyboard, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from '../../../utils/ThemeProvider';
import CutomText from '../../../components/CustomText';
import translate from '../../../utils/Text'
import { FONTFAMILY } from "../../../config/font-config";
import Back from '../../../assets/images/Back.svg'
import { useSelector } from "react-redux";
import AppLoader from '../../../components/Plugins/AppLoader'
import { useIsFocused } from "@react-navigation/native";
import actionTypes from '../../../store/actions/types';
import { sum } from 'lodash';
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
}

const Layout = (props: IProps) => {
  let userId = useSelector((state: any) => state.loginReducer.userData?.data?.data?.id);
  const styles = style(props.theme);
  const isFocused = useIsFocused();
  const theme = props.theme
  let data = useSelector((state) => state.onboardingReducer.userDetails);
  const summaryData = useSelector((state) => state.storiesReducer?.summaryData);
  const placeHolderText = 'Example: \n01-May-2017: Diagnosed with colorectal cancer. MSI mutation \nJun-2017: Colectomy surgery \n13-Jul-2017: Completely cancer free \n15-May-2018: Cancer relapsed \n1 year of treatment. FOLFOX Chemotherapy. 12 cycles. \nCancer-free today'
  const [summaryValue, setSummaryValue] = useState('')

  useEffect(() => {
    if (summaryData?.length > 0 && summaryData[0]?.status == 1) {
      data.data.summary = summaryValue
      props.actions.callUserDetailsData("userDetails", data, actionTypes.ADD_USER_DETAILS_DATA)
      props.navigation.goBack()
      props.actions.summaryData(
        'summaryData',
        [],
        actionTypes.SUMMARY_DATA,
      )
    }
  }, [summaryData])

  const onSubmit = () => {
    var inputRequest = {
      module: "userDetail",
      action: "update_user_summery",
      formData: {
        userId: userId,
        summery: summaryValue,
      }
    }
    props.actions.summary(actionTypes.SUMMARY, inputRequest)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={''}
        isRightComponent={false} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}  >
        <View style={{ flex: 1 }}>
          <View style={styles.innerContainer}>
            <CutomText style={styles.titleText}>{translate("SUCCESSMESSAGE")["SUMMARY_TITLE"]}</CutomText>
            <View style={styles.postVw} >
              <TextInput
                value={summaryValue}
                placeholder={placeHolderText}
                autoFocus={true}
                placeholderTextColor={styles.placeholderText}
                style={styles.postText}
                multiline={true}
                onChangeText={(text: any) => setSummaryValue(text)} />
            </View>
            <Pressable onPress={() => {
              summaryValue.length > 0 && onSubmit()
            }} style={styles.submitBtn}>
              <Text style={styles.submitBtnText} >{translate("LANGUAGE")["SUBMIT"]}</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
