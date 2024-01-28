/**
 * MyBookmark Component
 * @Author: Astha
 * @Date: Fri Jul 8 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Bookmark post
 */
import React, { useState, useRef, useEffect } from 'react';
import style from './Style';
import {
  View,
  StatusBar,
  Pressable,
  SafeAreaView,
  FlatList
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import actionTypes from '../../../store/actions/types';
import translate from "../../../utils/Text"
import { useSelector } from 'react-redux';
import CancerPost from '../../../components/Community/CancerPost'
import { InstagramLoader } from 'react-native-easy-content-loader';
import {
  apiCallForUpdateSupport, onClickHeart, openUserProfileScreen, addComments, apiCallDeletePost, apiCallMarkAsSpamList,
  apiCallReportList, updateSupoort, updateComment, handleReport
} from '../../../utils/communityFunction'
import ReportOption from '../../../components/Community/ReportOption'
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [textShown, setTextShown] = useState(-1);
  const [communityList, setCommuityList] = useState([])
  const [page, setPage] = useState(1)
  const [loadeMore, setLoadMore] = useState(true)
  const [valueChange, setValueChange] = useState(false)
  const [loader, setLoader] = useState(true);
  const [item, setItem] = useState({})
  const [visible, setVisible] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const bookmarkData =
    useSelector((state) => state.storiesReducer?.bookmarkPost?.length > 0 ?
      state.storiesReducer.bookmarkPost[0]?.data : []) || [];
  const commentsData =
    useSelector((state: RootState) => state.storiesReducer?.commentsData?.length > 0 ?
      state.storiesReducer.commentsData[0]?.data : []) || [];

  //Lifecycle Methods
  useEffect(() => {
    getBookmarkData(page)
  }, []);

  useEffect(() => {
    if (bookmarkData.length > 0 && page != 1) {
      if (bookmarkData.length > 9) {
        setLoadMore(true)
      }
      let data = communityList.concat(bookmarkData)
      setCommuityList(data)
    } else if (bookmarkData != undefined) {
      setLoadMore(false);
    }
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [bookmarkData])

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

  //Api Call
  const getBookmarkData = (page) => {
    setPage(page + 1)
    props.actions.myBookmark(actionTypes.MY_BOOKMARK, {
      module: 'cancerHealingStory',
      action: 'stories_all_in_one',
      formData: {
        page: page,
        user_id: userId,
        get_bookmark_on: 1
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
    handleReportDetail(item)
  }

  //Helper Methods Methods
  const updateSupport = (item) => {
    updateSupoort(item, valueChange, setValueChange)
  }
  const updateCommentDetail = (item, type, id) => {
    updateComment(item, type, id, valueChange, setValueChange)
  }
  const handleReportDetail = (item) => {
    handleReport(item, communityList, setCommuityList, valueChange, setValueChange, true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />

      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={translate("DRAWER")["MY_BOOKMARKS"]}
        isRightComponent={false} />
      {loader ?
        <InstagramLoader active listSize={10} />
        :
        <FlatList
          data={communityList}
          renderItem={({ item, index }) => {
            return (
              <CancerPost
                item={item.cancer_healing_story}
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
      }
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