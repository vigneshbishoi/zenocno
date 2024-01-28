/**
 * CreateDietPlan layout page
 * @Author: Anand R
 * @Date: Sat Dec 18 2021 09:25:06 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React from 'react';
import style from './Style';
import { View, Image, Pressable, StatusBar,Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../../utils/Text"
import { withTheme } from '../../../utils/ThemeProvider';
import CustomText from '../../../components/CustomText';
import { useSelector } from "react-redux"
import Back from '../../../assets/images/Back.svg'
import Testacd from '../../../assets/images/testacd.svg'
import { isIphoneX } from 'react-native-iphone-x-helper'

interface IProps {
  theme: any;
  navigation: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme

  const onboardDetails = useSelector(state => state.onboardingReducer.userDetails)
  if (onboardDetails?.data?.name != undefined)
    var name = onboardDetails.data.name
  else if (onboardDetails?.data?.user_details[0]?.name != undefined)
    var name = onboardDetails?.data?.user_details[0]?.name
  else
    var name = 'User'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' translucent={true} backgroundColor={'transparent'} />
      <View style={styles.headerImg}>
        {/* <Image style={styles.img} source={require("../../../assets/images/dietPlanHeader.png")} resizeMode="contain" /> */}
        <Testacd />
        <Pressable style={styles.backVw} onPress={() => { props.navigation.pop() }}>
          <Back width={15} height={20} style={{ marginRight: "90%", marginTop: 0 }} />
        </Pressable>
      </View>
      <View style={styles.content}>
        {/* <View style={styles.titleContainer}> */}
          <Text numberOfLines={1} style={styles.title}>{translate("DIET_PLAN")["HI"]} {name},</Text>
        {/* </View> */}
        {/* <View style={styles.subTitleContainer}> */}
          <CustomText style={styles.subTitle}>{translate("DIET_PLAN")["DESIGN"]}</CustomText>
        {/* </View> */}
        {/* <View style={styles.textContainer}> */}
          <CustomText style={styles.text}>{translate("DIET_PLAN")["WELCOME_TEXT"]}</CustomText>
        {/* </View> */}
        <Pressable style={styles.btnContainer} onPress={() => { props.navigation.navigate("Zen.DietPlan") }}  >
        <CustomText style={styles.btnText}>{translate("DIET_PLAN")["CREATE"]}</CustomText>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
