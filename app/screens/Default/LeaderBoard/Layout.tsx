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
  Dimensions,
  FlatList
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import AppLoader from '../../../components/Plugins/AppLoader';
import Z from '../../../assets/images/Z.svg'
import actionTypes from '../../../store/actions/types';
import Itemheader from '../../../components/Home/ItemHeader';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../../components/CommonInput/appHeader';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const Data = useSelector((state) => state.leaderboardReducer);
  const [loader, setLoader] = useState(false)
  const [leaderData, setLeaderData] = useState([])

  useEffect(() => {
    setLoader(true)
    apiCall()
  }, []);

  useEffect(() => {
    if (Data?.data?.leaderboardData?.length >= 1) {
      setLoader(false)
      setLeaderData(Data?.data?.leaderboardData)
    } else {
      setLoader(false)
    }
  }, [Data]);

  // //api call
  const apiCall = () => {
    props.actions.getLeaderboardList(actionTypes.GET_LEADERBOARD_LIST, {
      module: 'daily_streak',
      action: 'get-leaderboard',
      formData: {},
    });
  }

  const renderItem = (renderItem: any, mainIndex: any) => {
    return <View style={[styles.renderMainView, styles.commonShadow,
    {
      borderTopLeftRadius: mainIndex == 0 ? widht * 0.03 : 0,
      borderTopRightRadius: mainIndex == 0 ? widht * 0.03 : 0,
      borderBottomLeftRadius: mainIndex == (leaderData?.length - 1) ? widht * 0.03 : 0,
      borderBottomRightRadius: mainIndex == (leaderData?.length - 1) ? widht * 0.03 : 0
    }]}>
      <Text style={[styles.renderCommonText, styles.renderIndex]}>{mainIndex + 1}</Text>
      <FastImage
        style={[styles.renderImage, {}]}
        source={renderItem?.image ? { uri: renderItem?.image } :
          require('../../../assets/images/profileImage.png')}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text numberOfLines={1} style={[styles.renderCommonText, styles.renderTitle]}>
        {renderItem.userName}</Text>
      <Text numberOfLines={1} style={[styles.renderCommonText, styles.renderCoin]}>{renderItem.coins}</Text>
    </View>
  }

  let UpdatePosition = leaderData.length > 0 ?
    leaderData?.filter((data, index) => { if (data?.userId == userId) { return index } })
    : 0

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <AppHeader
          theme={theme}
          onBackPress={() => props.navigation.goBack()}
          headerTitle={translate("DRAWER")["LEADERBOARD"]}
          isRightComponent={true}
        />
        <View style={styles.container}>
          <View style={[styles.semiHeader, { flexDirection: 'row' }]}>
            <View style={styles.flexRow}>
              <Text style={styles.coinText}>{translate("MEMORY")["POSITION"]}</Text>
              <View style={styles.position}>
                <Text style={[styles.coinText, { color: theme.PRIMARY }]}>{Data?.data?.user_rank != null ? Data?.data?.user_rank : '0'}</Text>
              </View>
            </View>
            <Pressable style={styles.flexRow} onPress={() => props.navigation.navigate('Zen.ZenPoints')}>
              <Z width={25} height={25} />
              <Text style={[styles.coinText, styles.Z]}>{Data?.data?.userCoinData != null ? Data?.data?.userCoinData : '0'}</Text>
            </Pressable>
          </View>
          <FlatList
            data={leaderData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatlist}
          // ListEmptyComponent={() => {
          //   return <View style={[{ opacity: 1 }, styles.emptyView, styles.alingCenter]}>
          //     <Text style={styles.monthText}>{translate("MEMORY")["START_ADD_MEMORY"]}</Text>
          //   </View>
          // }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default withTheme(Layout);