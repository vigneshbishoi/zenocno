/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  FlatList,
  Text,
  Dimensions,
  Platform
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import { CommonTextInput } from '../../../components/Plugins/CommonTextInput';
import Close from '../../../assets/images/close.svg';
import Search from '../../../assets/images/search.svg';
import FastImage from 'react-native-fast-image';
import request from '../../../services/client';
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
  const [matchList, setMatchList] = useState([])
  const [fullmatchList, setFullMatchList] = useState([])
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const Data = useSelector((state) => state.profileMatchReducer);
  const [searchShow, setSearchShow] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    apiCall()
    treatmentCall()
  }, []);

  useEffect(() => {
    if (Data?.match?.length > 0) {
      setMatchList(Data?.match)
    }
  }, [Data]);

  //api call
  const apiCall = async () => {
    if (Platform.OS == 'ios') {
      props.actions.getProfileMatchList(actionTypes.GET_PROFILE_MATCH_LIST, {
        module: 'userDetail',
        action: `get_match_profile_list?userId=${userId}`,
        formData: {}
      });
    }
    try {
      const ApiCall = await request({
        method: 'get', data: {
          module: 'userDetail',
          action: `get_match_profile_list?userId=${userId}`,
          formData: {},
        },
        isFormData: true
      });
      if (ApiCall?.status == '200') {
        props.actions.getProfileMatchList(actionTypes.GET_PROFILE_MATCH_LIST, {
          module: '',
          action: ApiCall?.data,
          formData: {}
        })
        setMatchList(ApiCall?.data?.match_profile)
        setFullMatchList(ApiCall?.data?.match_profile)
      }
    } catch (error) {
      console.log(error, 'Error');
    }
  }

  //treatment call
  const treatmentCall = () => {
    props.actions.getProfileMatchList(actionTypes.GET_TREATMENT_LIST, {
      module: 'treatment',
      action: `getAll`,
      formData: {}
    });
  }

  const chatRender = ({ item, index }) => {

    return (
      <Pressable onPress={() => {
        // props.navigation.navigate('Zen.ProfileMatchDetail', { item: item });
        props.navigation.navigate('Zen.ProfileScreen', { item: item, showDay: true, theme: theme, });
      }}>
        <View style={styles.optionView}>
          <View style={styles.renderImageView}>
            <FastImage
              style={[styles.renderImage, {}]}
              source={item?.image ? { uri: item?.image } :
                require('../../../assets/images/profileImage.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.viewMatch}>
              <Text style={styles.matchTxt}>{"30% Match"}</Text>
            </View>
          </View>
          <View style={styles.renderTextView}>
            <Text style={styles.userNameTxt} numberOfLines={1}>{item?.name}</Text>
            <Text style={styles.cancerTypeTxt} numberOfLines={1}>
              {item?.cancer_category?.name != undefined ?
                `${item?.cancer_category?.name} - ${item?.cancer_stage?.cancer_stage}` : "Blood Cancer - Stage 3"}</Text>
            <Text style={styles.userTypeTxt} numberOfLines={1}>{"Survivor"}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  const searchFilter = (Data, text) => {
    const UpdateArr = Data?.filter(function (item: any) {
      let check = item?.name?.toLowerCase();
      let checkCancerType = item?.cancer_category?.name?.toLowerCase();
      if (check.includes(text.toLowerCase()) || (checkCancerType &&
        checkCancerType.includes(text.toLowerCase()))) {
        return item
      }
    })
    return UpdateArr
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />

      {searchShow ?
        <View style={styles.headerVw}>
          <Pressable onPress={() => { props.navigation.goBack() }}
            style={styles.backButton}>
            <Back width={8} height={15} />
          </Pressable>
          <View style={styles.serachView}>
            <Search width={widht * 0.04} height={widht * 0.04} />
            <CommonTextInput
              extraStyle={styles.textInput}
              value={search}
              placeholder={translate("COMMONTEXT")["SEARCH"]}
              autoFocus={true}
              onChangeText={(text) => {
                setSearch(text)
                if (Data?.match?.length > 0) {
                  setMatchList(searchFilter(Data?.match, text))
                }
                if (fullmatchList?.length > 0 && Platform.OS == 'android') {
                  setMatchList(searchFilter(fullmatchList, text))
                }
              }} />
            <Pressable style={styles.closeIcon}
              onPress={() => {
                if (search == '') { setSearchShow(false) }
                else {
                  setSearch('')
                  setMatchList(Data?.match?.length > 0 ? Data?.match : [])
                  if (fullmatchList?.length > 0 && Platform.OS == 'android') {
                    setMatchList(fullmatchList)
                  }
                }
              }}>
              <Close width={widht * 0.04} height={widht * 0.04} />
            </Pressable>
          </View></View> : <>

          <AppHeader
            theme={theme}
            onBackPress={() => props.navigation.goBack()}
            headerTitle={translate("DRAWER")["AI_MATCHED_SURVIVORS"]}
            isRightComponent={true}
            isSecondIcon={true}
            rightSecondIcon={<Icon name="search" color={'#848484'} size={18} />}
            rightSecondPress={() => { setSearchShow(true) }}
          />

          {/* <Pressable onPress={() => { props.navigation.navigate('Zen.FilterCommunity'); }} style={{ marginHorizontal: 5 }}>
                 <Image style={styles.messageIcon1} source={require('../../../assets/images/filter1.png')} />
           </Pressable>*/}
        </>}
      <FlatList
        style={{ marginHorizontal: 15 }}
        data={matchList}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={chatRender}
        ListEmptyComponent={() => {
          return <View style={[{ opacity: 1, }, styles.emptyList]}>
            <Text style={[styles.headerTxt, { fontSize: 14 }]}>{translate("COMMONTEXT")["NO_DATA_FOUND1"]}</Text>
          </View>
        }}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
