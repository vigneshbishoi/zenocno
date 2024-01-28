import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './Style';
import { TextInput, View, Pressable, Image, Text, FlatList, SafeAreaView, StatusBar, Platform } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import Search from '../../../assets/images/search.svg'
import ViewByPeople from '../../../assets/images/Group.svg';
import CommentWithLines from '../../../assets/images/CommentNew.svg';
import actionTypes from '../../../store/actions/types';
import { useIsFocused } from '@react-navigation/native';
import translate from "../../../utils/Text"
import themes from '../../../config/themes-config';
import AppHeader from '../../../components/CommonInput/appHeader';
import TrackerTab from '../../../components/CommonInput/trackerTab';
import Button from '../../../components/CommonInput/navigateButton';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import AppLoader from '../../../components/Plugins/AppLoader';
import Toast from 'react-native-toast-message';


interface IProps {
  theme: any;
  actions: any;
  navigation: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const { route } = props
  const isFocused = useIsFocused();
  const [joinGroupList, setJoinGroupList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [allGroupList, setAllGroupList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [valueChange, setValueChange] = useState(false);
  const [tabIndex, setTabIndex] = useState(3);
  const [search, setSearch] = useState(false)
  const [loader, setLoader] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const communityGroupData =
    useSelector((state: RootState) => state.storiesReducer?.communityGroupListData?.length > 0 ?
      state.storiesReducer.communityGroupListData[0] : []) || [];
  const searchGroupData =
    useSelector((state: RootState) => state.storiesReducer?.groupSearchData?.length > 0 ?
      state.storiesReducer.groupSearchData[0] : []) || [];
  //Lifecycle Methods  
  useEffect(() => {
    if (isFocused) {
      apiCallForGetGroups()
    }
  }, [isFocused]);
  useEffect(() => {
    if(communityGroupData != undefined){
      getGroupData()
    }
  }, [communityGroupData])

  //Api Call
  const apiCallForGetGroups = () => {
    setGroupList([])
    props.actions.getCommunityGroupListData(actionTypes.GET_COMMUNITY_GROUP_LIST_DATA, {
      module: 'post_subcategory',
      action: 'get_join_and_not_join_list',
      formData: {
        user_id: userId,
      },
    });
  }
  const apiCallForGetGroupsBySearch = (text: string, index:number) => {
    let obj = {
      title: text,
      search_in: index == 1 ? 1 : 0
    }
    if(index != 1){
      obj.search_text = 0
    }
    props.actions.groupSearch(actionTypes.GROUP_SEARCH, {
      module: 'post_subcategory',
      action: 'search_by_group_activity',
      formData: obj,
    });
  }
  const apiCallForJoinGroup = (item) => {
    Toast.show({
      text1: 'Success',
      text2: 'Group joined successfully'
    })
    setLoader(true)
    props.actions.joinGroup(actionTypes.POST_JOIN_GROUP, {
      module: 'user_follow',
      action: 'create_update_group',
      formData: {
        "userId": userId,
        "followPostSubCategoryId": item.id
      }
    });
    if (item?.user_follows?.length > 0) {
      let filter = item.user_follows.filter((item: any) => item.userId == userId)
      if (filter.length > 0) {
        filter[0].status = filter[0].status == 1 ? 0 : 1
      } else {
        item.user_follows.push({ userId: userId, status: 1 })
      }
    } else {
      item.user_follows = [{ userId: userId, status: 1 }]
    }
    setValueChange(!valueChange)
    setTimeout(() => {
      apiCallForGetGroups()

      props.navigation.navigate('Zen.GroupDetail', {
        id: item.id,
        data: item,
        getAllGroups: apiCallForGetGroups,
      });

      setLoader(false);
    }, 1000)
  }

  //Helper Methods
  const getGroupData = () => {
    if (communityGroupData?.joined_group?.length > 0) {
      setJoinGroupList(communityGroupData?.joined_group)
    }
    if(communityGroupData?.not_join_group?.length > 0){
      setGroupList(communityGroupData?.not_join_group);
    }
    setAllGroupList(tabIndex == 1 ? communityGroupData?.joined_group : communityGroupData?.not_join_group)
  }
  const onFirstTabPress = () => {
    setAllGroupList(joinGroupList)
    searchText.length > 0 && apiCallForGetGroupsBySearch(searchText, 1)
    setTimeout(() => {
      setTabIndex(1);
    }, 200)
  }
  const onSecondTabPress = () => {
    setAllGroupList(groupList)
    searchText.length > 0 && apiCallForGetGroupsBySearch(searchText, 3)
    setTimeout(() => {
      setTabIndex(3);
    }, 200)
  }
  const renderGroupItem = ({ item, index }) => {
    return (
      <Pressable style={{ marginTop: '3%' }} onPress={() => {
        props.navigation.navigate('Zen.GroupDetail', {
          id: item.id,
          data: item,
          getAllGroups: apiCallForGetGroups,
        });
      }}>
        <View style={{ marginHorizontal: 15 }}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.image }} style={styles.iconImg} />
            {(item?.user_follows?.length > 0 && item?.user_follows[0].pin_flag == 1) &&
            <Image source={require('../../../assets/images/pin.png')} style={styles.pinImg} />}
            <View style={{ marginLeft: '3%', height:'100%',width:'100%' }}>
                <View style={{ width: '65%' }}>
                  <Text style={styles.hospitalText} numberOfLines={1}>{item?.name}</Text>
                </View>
              <View style={[styles.likeView, {position:'absolute', bottom:0}]}>
                <ViewByPeople style={{ alignSelf: "center" }} width={28} height={28} />
                <Text style={styles.numberText}>{item?.members != null ? item?.members : 0}</Text>
                <CommentWithLines width={30} height={30} style={{marginLeft:'10%'}} />
                <Text style={styles.numberText}>{item.posts != null ? item.posts : 0}</Text>
              </View>
            </View>
            { tabIndex == 3 &&
                  <View style={{ position:'absolute', right:0, top: -5 }}>
                    <Button width={50} height={34} theme={theme} buttonText={translate("COMMONTEXT").JOIN} fontSize={12} onPress={() => {
                      apiCallForJoinGroup(item)
                    }}/>
                  </View>
                }
          </View>
          <Text style={styles.descriptionText} numberOfLines={2}>{item?.description}</Text>
        </View>
        <View style={styles.seperatorView} />
      </Pressable>
    )
  }
  const searchData = (value: string) => {
    apiCallForGetGroupsBySearch(value, tabIndex)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["LOADING"]} />
      {!search ? 
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("DRAWER")["CANCER_SUPPORT_GROUP"]}
                isRightComponent={true}
                rightFirstPress={() => {setSearch(true)}}
                isFirstIcon={true}
                rightFirstIcon={<Search />}
            /> :
            <AppHeaderSearch
                theme={theme}
                onBackPress={() => {setSearch(false), setSearchText('')}}
                searchValue={searchText}
                setSearchValue={setSearchText}
                onSearch={searchData}
            /> }
      <TrackerTab
        theme={theme}
        totalNumber={2}
        index={tabIndex}
        onFirstTabPress={onFirstTabPress}
        onSecondTabPress={onSecondTabPress}
        tab1Title={translate("ONBOARDING")["MY_GROUPS"]}
        tab3Title={translate("HOME")["DISCOVER"]}
      />
      <FlatList
        data={searchText.length > 0 ? searchGroupData?.data : allGroupList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.groupContentContainer}
        renderItem={renderGroupItem}
        ListEmptyComponent={() =>
          <View style={styles.emptyVw} >
              <Text style={styles.noActivityText}>No Groups Found</Text>
          </View>
      }
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout); 
