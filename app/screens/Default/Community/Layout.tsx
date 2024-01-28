/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import CancerPost from '../../../components/Community/CancerPost'
import CategoryModal from '../../../components/Community/CategoryModal'
import FilterModal from '../../../components/Community/FilterModal'
import actionTypes from '../../../store/actions/types';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import SearchModal from '../../../components/Community/SearchModal';
import NotificationModal from '../../../components/Community/NotificationModal';
import SelectionTab from '../../../components/CommonInput/selectionTab'
import { InstagramLoader } from 'react-native-easy-content-loader';
import ReportOption from '../../../components/Community/ReportOption'
import AppHeader from '../../../components/CommonInput/appHeader';
import {
  apiCallForUpdateSupport, onClickHeart, openUserProfileScreen, addComments, apiCallDeletePost, apiCallMarkAsSpamList,
  apiCallReportList, updateSupoort, updateComment, handleReport
} from '../../../utils/communityFunction'
import {
  getAllStories
} from '../../../services/stories';

import { SvgUri } from 'react-native-svg';
import ShareOrAsk from '../../../components/CommonInput/shareOrAsk';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  
  const styles = style(props.theme);
  const theme = props.theme
  const [page, setPage] = useState(1)
  const [catId, setCatId] = useState(0)
  const [isCatSelected, setIsCatSelected] = useState(false)
  const [loadeMore, setLoadMore] = useState(true)
  const [visible, setVisible] = useState(false)
  const [visibleReport, setVisibleReport] = useState(false)
  const [visibleFilter, setVisibleFilter] = useState(false)
  const [valueChange, setValueChange] = useState(false)
  const [filterName, setFilterName] = useState('Most recent')
  const [communityList, setCommuityList] = useState([])
  const [searchVisible, setSearchVisible] = useState(false);
  const [textShown, setTextShown] = useState(-1);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [allReadNotification, setAllReadNotification] = useState(false);
  const [postLoader, setPostLoader] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const [item, setItem] = useState({})
  const [notiArr, setNotiArr] = useState([
    { key: '1', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Sent you a message", type: 'Discussion', time: '6 s' },
    { key: '2', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '8 m' },
    { key: '3', userImg: require('../../../assets/images/profileImage.png'), message: "Nikita likes Shally's Post", type: 'Discussion', time: '6 h' },
    { key: '4', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '1 d' },
    { key: '5', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Sent you a message", type: 'Discussion', time: '2 d' },
    { key: '6', userImg: require('../../../assets/images/profileImage.png'), message: "Doctor Sam Huel Commented on ZenOnco.io post", type: 'Success Stories', time: '6 d' }
  ])
  const [dummyDataArr, setDummyDataArr] = useState([])
  const [dummyCatId, setDummyCatId] = useState(0)
  const communityCategoryData =
    useSelector((state: RootState) => state.storiesReducer?.communityCategoryListData?.length > 0 ?
      state.storiesReducer.communityCategoryListData[0]?.data : []) || [];
  const commentsData =
    useSelector((state: RootState) => state.storiesReducer?.commentsData?.length > 0 ?
      state.storiesReducer.commentsData[0]?.data : []) || [];
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userData = useSelector((state) => state.onboardingReducer.userDetails);

  useEffect(() => {
    setCommuityList([])
    if (props?.route?.params?.isfromHome) {
      setCatId(5)
      handleCategorySelection({ id: 5 }, filterName)
    } else if (props?.route?.params?.isFromStayUpdated) {
      setCatId(3)
      handleCategorySelection({ id: 3 }, filterName)
    } else if (props?.route?.params?.isFromStories) {
      setCatId(1)
      handleCategorySelection({ id: 1 }, filterName)
    }else {
        apiCall(1, filterName, 0)
    }
    apiCallForGetCategories()
  }, []);

  useEffect(() => {
    setCommuityList([])
    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (commentsData.id != undefined) {
      item.my_new_comment = [commentsData]
      item.comments_count = (item?.comments_count != undefined ? item?.comments_count : 0) + 1
      setValueChange(!valueChange)
      props.actions.addCommentsData(
        'commentsData',
        {},
        actionTypes.ADD_COMMENTS_DATA,
      )
    }
  }, [commentsData])

  //api call
  const apiCall = async (page: number, filter: any, id: number) => {
      let payload = {
        module: 'cancerHealingStory',
        action: 'stories_all_in_one',
      };
      let data = {
        send_filter: filter == 'Most recent' ? 'most_recent' : 'most_support',
        page: page,
      };
      if (id > 0) {
        data.postCategoryId = id
      }
      const response = await getAllStories(data, payload, 'GET');
      setPage(page + 1);
      if(response.status == 1){
        setPostLoader(false)
        let data = response.data
        setLoadMore(data.length < 9 ? false : true)
        if(page == 1){
          setCommuityList(data)
        } else {
          setCommuityList(communityList.concat(data))
        }
      } else {
        setPostLoader(false)
        setLoadMore(false)
      }

  } 
  const apiCallForGetCategories = () => {
    props.actions.getCommunityCategoryListData(actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA, {
      module: 'post_category',
      action: 'getAll',
    });
  }
  const apiCallPinList = (item: any) => {
    props.actions.pinList(actionTypes.POST_PIN_STORY, {
      module: 'cancer_healing_story_pin',
      action: 'create',
      formData: {
        "userId": userId,
        "cancerHealingStoryId": item.id,
      }
    });
    updatePinData(item)
  }

  //Helper Methods
  const updateData = () => {
    handleCategorySelection({ id: catId }, filterName)
  }
  const updatePinData = (item: any) => {
    communityList.map((itemA: any) => {
      if (itemA.id == item.id) {
        if (itemA.cancer_healing_story_pins.length > 0) {
          itemA.cancer_healing_story_pins = []
        } else {
          itemA.cancer_healing_story_pins = [{ userId: userId }]
        }
      }
    })
    setCommuityList([...communityList])
    setValueChange(!valueChange)
  }
  const handleCategorySelection = (item, filter) => {
    setLoadMore(true)
    setCommuityList([])
    setPostLoader(true)
    if (item.id != 0) {
      setIsCatSelected(true)
      setCatId(item.id)
      apiCall(1, filter, item.id)
    } else {
      setIsCatSelected(false)
      setCatId(0)
      apiCall(1, filter, 0)
    }
  }
  const onPressPin = (item: any) => {
    apiCallPinList(item);
  }
  const onPressBookMark = (item: any) => {
    var inputRequest = {
      module: "cancerHealingStory",
      action: "updateBookmark",
      formData: {
        userId: userId,
        cancerHealingStoryId: item.id
      }
    }
    props.actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest);
    updateBookMark(item)
  }
  const onRefresh = () => {
    setRefresh(true)
    handleCategorySelection({ id: catId }, filterName)
    setTimeout(() => {
      setRefresh(false)
    }, 200)
  }

  //Helper Methods Methods
  const updateSupport = (item) => {
    updateSupoort(item, valueChange, setValueChange)
  }
  const updateCommentDetail = (item, type, id) => {
    updateComment(item, type, id, valueChange, setValueChange)
  }
  const handleReportDetail = (item) => {
    handleReport(item, communityList, setCommuityList, valueChange, setValueChange, false)
  }
  function header() {
    return (
    <View>
      {communityCategoryData.length > 2 &&
        <SelectionTab
          theme={theme}
          data={communityCategoryData}
          catId={catId}
          handleCategorySelection={(item) => handleCategorySelection(item, filterName)}
          filterName={filterName}
          updateData={updateData}
        />
      }

      <View style={[styles.writeSomeView, { paddingVertical: 0 }]}>
        <ShareOrAsk
          theme={theme}
          data={userData}
          text={translate("COMMONTEXT")["SHARE_YOUR_THOUGHTS_HERE"]}
          onPress={() => {
            // if (userData == undefined || Object.keys(userData).length == 0) {
            //   props.navigation.navigate('Zen.UserOnBoarding')
            // } else {
            props.navigation.navigate('Zen.CreatePost', {
              fromCommunity: true,
              updateData: updateData,
              setDummyDataArr: setDummyDataArr,
              setDummyCatId: setDummyCatId,
            })
            // }
          }}
        />
      </View>
    </View>
  )}
  const renderFooter = () => {
    return loadeMore && (
      //Footer View with Load More button
      <View style={styles.footer}>
        <ActivityIndicator color="red" style={{ marginLeft: 8 }} />
      </View>
    );
  }
  const updateBookMark = (item: any) => {
    communityList.map((itemA: any) => {
      if (itemA.id == item.id) {
        if (itemA.cancer_healing_story_bookmarks.length > 0) {
          itemA.cancer_healing_story_bookmarks = []
        } else {
          itemA.cancer_healing_story_bookmarks = [{ userId: userId }]
        }
      }
    })
    setCommuityList([...communityList])
    setValueChange(!valueChange) 
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={''}
        isRightComponent={true}
      />
        <InstagramLoader active listSize={postLoader ?10 : 0} />
        <FlatList
          data={communityList}
          ListHeaderComponent={header()}
          refreshing={refresh}
          onRefresh={() => onRefresh()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CancerPost
                item={item}
                onPress={(item) => {
                  props.navigation.navigate('Zen.CommunityComment', {
                    id: item.id, item: item,
                    updateSupport: updateSupport,
                    updateComment: updateCommentDetail,
                    handleReport: handleReportDetail,
                    updateBookMark: updateBookMark,
                  })
                }}
                page={"Community"}
                onPressBookMark={onPressBookMark}
                onSupport={(item) => apiCallForUpdateSupport(props.actions, item, valueChange, setValueChange, userId)}
                apiCallMarkAsSpamList={(item) => apiCallMarkAsSpamList(props.actions, item, communityList, setCommuityList, valueChange, setValueChange, userId, true)}
                apiCallReportList={(item) => apiCallReportList(props.actions, item, communityList, setCommuityList, valueChange, setValueChange, userId, true)}
                onClickCommentHeart={(comment, item) => onClickHeart(props.actions, comment, item, userId, valueChange, setValueChange)}
                showDay={true}
                theme={theme}
                index={index}
                textShown={textShown}
                userData={userData}
                setTextShown={setTextShown}
                openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme, () => { })}
                addComments={(data, item) => addComments(props.actions, data, item, setItem)}
                apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList, valueChange, setValueChange, false)}
                navigation={props.navigation}
                setVisible={(visible: any, item: any) => {
                  setItem(item)
                  setTimeout(() => {
                    setVisibleReport(visible)
                  }, 300)
                }}
              />
            )
          }} 
          onEndReached={() => {
            if (loadeMore) {
              apiCall(page, filterName, isCatSelected ? catId : 0)
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() =>
            <View style={styles.emptyVw} >
              <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_RESULTS_FOUND"]} </Text>
            </View>
          }
        />

      <CategoryModal selected={filterName} data={["Most recent", "Most supported"]} onSelect={(name) => {
        setFilterName(name)
        setValueChange(!valueChange)
        handleCategorySelection({ id: catId }, name)
      }}
        modalDisplay={visible} setModalDisplay={setVisible} theme={theme} />

      <FilterModal selected={catId} data={communityCategoryData} onSelect={(item) => {
        handleCategorySelection(item, filterName)
      }}
        modalDisplay={visibleFilter} setModalDisplay={setVisibleFilter} theme={theme} />
      <SearchModal
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        styles={styles}
        theme={props.theme}
        props={props}
      />
      <NotificationModal
        theme={theme}
        notificationVisible={notificationVisible}
        setNotificationVisible={setNotificationVisible}
        notiArr={notiArr}
        setAllReadNotification={setAllReadNotification}
      />
      <ReportOption
        isVisible={visibleReport}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisibleReport}
        handleReport={handleReportDetail}
        item={item}
        actions={props.actions}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);