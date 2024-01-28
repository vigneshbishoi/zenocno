/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect, useRef } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text, Image,
  FlatList, ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import AppLoader from '../../../components/Plugins/AppLoader';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import actionTypes from '../../../store/actions/types';
import Check from '../../../assets/images/checkBooked.svg'
import Diet from '../../../assets/images/applediet.svg'
import Medical from '../../../assets/images/CBD.svg'
import Ayurveda from '../../../assets/images/ayurveda.svg'
import Wellness from '../../../assets/images/wellnessdiet.svg'
import Protocal from '../../../assets/images/Protocal.svg'
import { scale } from 'react-native-size-matters';
interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data);
  const userData = useSelector((state) => state.loginReducer?.userDetails?.data);
  const Data = useSelector((state) => state.oncologistReducer?.oncologistDr);
  const [loader, setLoader] = useState(false)
  const ID = props?.route?.params?.ID
  const [doctor, setDoctor] = useState({})
  const Item = props?.route?.params?.item

  // useEffect(() => {
  //   setLoader(true)
  //   apiCall()
  // }, []);

  useEffect(() => {
    if (Item != undefined) {
      setLoader(false)
      setDoctor(Item)
    } else {
      setLoader(false)
    }
  }, []);

  const ProfileView = () => {
    return (
      <View style={[styles.renderShadow, {}]}>
        <Image style={styles.renderImage} resizeMode={'cover'}
          source={{ uri: `https://zenonco-web-image.s3.ap-south-1.amazonaws.com/dr_oncologist/${doctor?.profile_picture}` }} />
        <View style={styles.renderData}>
          <Text numberOfLines={1} style={styles.drName}>{doctor?.name}</Text>
          <Text numberOfLines={1} style={styles.specialText}>
            {doctor?.specialization}</Text>
          <View style={styles.rowView}>
            <Feather name='calendar' size={16} color={theme.MEDIUM_GRAY} />
            <Text numberOfLines={1} style={[styles.specialText, styles.experienceText]}>
              {doctor?.exp_year} {translate("DOCTORSLIST")["YRS_EXPERIENCE"]}</Text>
          </View>
          <View style={styles.rowView}>
            <EvilIcons name='location' size={22} color={theme.MEDIUM_GRAY} style={{
              marginLeft: -2
            }} />
            <Text numberOfLines={1} style={[styles.specialText, { color: theme.DARK_GRAY, }]}>
              {doctor?.city}</Text>
          </View>
        </View>
      </View >
    )
  }

  const DietView = ({ name, icon, onPress }: any) => {
    return (
      <Pressable style={[styles.DietView, styles.commonShadow, {
        marginBottom: icon == 5 ? scale(35) : scale(8)
      }]} onPress={onPress}>
        <View style={styles.iconView}>
          {icon == 1 ? <Diet /> : icon == 3 ? <Ayurveda /> :
            icon == 4 ? <Wellness /> : icon == 5 ? <Protocal /> : <Medical />}
        </View>
        <Text style={styles.listText}>{name}</Text>
      </Pressable>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <View style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
          <View style={styles.header}>
            <Pressable style={[styles.arrowButton, styles.backArrow]}
              onPress={() => { props.navigation.goBack() }}>
              <AntDesign name={"left"} color={theme.BLACK} size={18} />
            </Pressable>
            <Text style={[styles.headerText, { textAlign: 'center' }]}>
              Booked</Text>
          </View>
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {/* Profile View */}
              <View style={{ backgroundColor: theme.PRIMARY }}>
                <ProfileView />
                <View style={styles.divider} />
                <View style={styles.successView}>
                  <Check />
                  <Text style={styles.successText}>
                    We have received your booking request.
                    We shall reach out to you shortly
                    with updates on this.
                  </Text>
                </View>
              </View>
              <Text style={styles.meanwhileText}>{`In the meanwhile\nyou should explore the below`}</Text>
              <DietView name={'Anti Cancer Diet'} icon={1} onPress={() => {
                props.navigation.goBack()
                props.navigation.navigate('Zen.CreateDietPlan')
              }} />
              <DietView name={'Medical Cannabis'} icon={2} />
              <DietView name={'Ayurveda'} icon={3} />
              <DietView name={'Wellness Activities'} icon={4} onPress={() => {
                props.navigation.goBack()
                props.navigation.navigate('Zen.WellnessCategory')
              }} />
              <DietView name={'Zen Integrative Oncology Protocol'} icon={5} />
            </ScrollView>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
};
export default withTheme(Layout);
