/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import CancerPost from '../../../components/Community/CancerPost'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import translate from "../../../utils/Text"
import {
  apiCallForUpdateSupport, onClickHeart, openUserProfileScreen, addComments, apiCallDeletePost, apiCallMarkAsSpamList,
  apiCallReportList, updateSupoort, updateComment, handleReport
} from '../../../utils/communityFunction'
import ReportOption from '../../../components/Community/ReportOption'

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme;
  const search = props.route.params.search
  const [searchText, setSearchText] = useState(search)
  const [valueChange, setValueChange] = useState(false)
  const [communityList, setCommuityList] = useState([])
  const [loadeMore, setLoadMore] = useState(true)
  const [item, setItem] = useState({})
  const [visible, setVisible] = useState(false)
  const [textShown, setTextShown] = useState(-1);
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const searchData =
    useSelector((state) => state.storiesReducer?.postSearch?.length > 0 ?
      state.storiesReducer.postSearch[0]?.data : []) || [];
  const commentsData =
    useSelector((state) => state.storiesReducer?.commentsData?.length > 0 ?
      state.storiesReducer.commentsData[0]?.data : []) || [];

  useEffect(() => {
    getSearchData(search)
  }, []);
  useEffect(() => {
    if (searchData.length > 0) {
      if (searchData.length > 9) {
        setLoadMore(true)
      }
      setCommuityList(searchData)
    } else if (searchData != undefined) {
      setLoadMore(false);
    }
  }, [searchData])

  //Api Call
  const getSearchData = (text: string) => {
    props.actions.postSearch(actionTypes.POST_SEARCH, {
      module: 'cancerHealingStory',
      action: 'stories_all_in_one',
      formData: {
        page: 1,
        search_text:searchText,
        send_filter: 'Most recent'
      }
    });
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

  //Helper Methods Methods
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
  const updateSupport = (item) => {
    updateSupoort(item, valueChange, setValueChange)
  }
  const updateCommentDetail = (item, type, id) => {
    updateComment(item, type, id, valueChange, setValueChange)
  }
  const handleReportDetail = (item) => {
    handleReport(item, communityList, setCommuityList, valueChange, setValueChange, false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppHeaderSearch
        theme={theme}
        showSearchIcon={true}
        onBackPress={() => props.navigation.goBack()}
        searchValue={searchText}
        setSearchValue={setSearchText}
        onSearch={() => {getSearchData(searchText)}}
      />
      <View style={styles.separatorView} />
      <FlatList
        data={communityList}
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
                  updateBookMark: handleReportDetail
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
              setTextShown={setTextShown}
              openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme, () => { })}
              addComments={(data, item) => addComments(props.actions, data, item, setItem)}
              apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList, valueChange, setValueChange, true)}
              navigation={props.navigation}
              setVisible={(visible: any, item: any) => {
                setItem(item)
                setTimeout(() => {
                  setVisible(visible)
                }, 300)
              }}
            />
          )
        }}
        ListEmptyComponent={() =>
          <View style={styles.emptyVw} >
            <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_RESULTS_FOUND"]} </Text>
          </View>
        }
      />
      <ReportOption
        isVisible={visible}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisible}
        handleReport={handleReportDetail}
        item={item}
        actions={props.actions}
      />

    </SafeAreaView>
  );
};
export default withTheme(Layout);
