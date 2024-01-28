import React, { useState, useEffect, useCallback } from 'react';
import style from './Style';
import {
  View, StatusBar, Text, ImageBackground, Modal, Image, ScrollView, FlatList, Pressable, Share, ActivityIndicator,
  Platform, BackHandler, Dimensions, TouchableOpacity, RefreshControl
} from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import { useSelector } from 'react-redux';
import BackWhite from '../../../assets/images/backWhite.svg'
import Leave from '../../../assets/images/Leave.svg'
import Dots from '../../../assets/images/Group_dots.svg'
import UserPlaceholder from '../../../assets/images/UserPhoto.svg'
import ViewByPeople from '../../../assets/images/Group.svg';
import CommentWithLines from '../../../assets/images/CommentNew.svg';
import Pin from '../../../assets/images/pin_gray.svg';
import Gallery from '../../../assets/images/Gallery.svg'
import actionTypes from '../../../store/actions/types';
import CancerPost from '../../../components/Community/CancerPost'
import AppLoader from '../../../components/Plugins/AppLoader';
import TabBar from '../../../components/TabBar';
import { SvgUri } from 'react-native-svg';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import appConfig from '../../../config/app-config';
import ContentLoader from "react-native-easy-content-loader";
import ReportOption from '../../../components/Community/ReportOption'
import { FONTFAMILY } from '../../../config/font-config';
import SelectionTab from '../../../components/CommonInput/selectionTab';
import ShareOrAsk from '../../../components/CommonInput/shareOrAsk';
import Button from '../../../components/CommonInput/navigateButton';
import AboutModal from '../../../components/Blog/AboutModal';
import PostErrorModal from '../../../components/Blog/PostErrorModal';
import Toast from 'react-native-toast-message';
import { InstagramLoader } from 'react-native-easy-content-loader';



const widht = Dimensions.get('window').width;

interface IProps {
  theme: any;
  actions: any;
  navigation: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const { route } = props
  const { params } = route
  const mainMenuPopUp = React.createRef();
  const [postType, setPosType] = useState([
    { key: '1', icon: require('../../../assets/images/testProfile.png'), title: 'Discussions' },
    { key: '2', icon: require('../../../assets/images/testProfile.png'), title: 'Ask Zen' },
    { key: '3', icon: require('../../../assets/images/testProfile.png'), title: 'Cannabis' },
    { key: '4', icon: require('../../../assets/images/testProfile.png'), title: 'Cancer Blog' },
    { key: '5', icon: require('../../../assets/images/testProfile.png'), title: 'Community' },
    { key: '6', icon: require('../../../assets/images/testProfile.png'), title: 'Profile Matching' },
  ])
  const [loadeMore, setLoadMore] = useState(true)
  const [communityList, setCommuityList] = useState([])
  const [page, setPage] = useState(1)
  const [valueChange, setValueChange] = useState(false)
  const [pin, setPin] = useState(params.data.pinFlag)
  const [selectedType, setSelectedType] = useState(postType[0])
  const [menuVisible, setMenuVisible] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [rulesTextShown, setRulesTextShown] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [rulesShowMoreButton, setRulesShowMoreButton] = useState(false);
  const [numLines, setNumLines] = useState(undefined);
  const [rulesNumLines, setRulesNumLines] = useState(undefined);
  const [catId, setCatId] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [loader, setLoader] = useState(true);
  const [citem, setCItem] = useState({})
  const [calling, setCalling] = useState(false)
  const [item, setItem] = useState({})
  const [visible, setVisible] = useState(false)
  const [openJoinModal, setOpenJoinModal] = useState(false)
  const [join, setJoin] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const groupData = useSelector((state) => state.storiesReducer?.groupDetailData != undefined ? state.storiesReducer?.groupDetailData?.length > 0 ?
    state.storiesReducer?.groupDetailData[0]?.data != undefined ? state.storiesReducer?.groupDetailData[0] : {} : {} : {} || {});
  const isFollow = useSelector((state) => state.storiesReducer?.groupDetailData != undefined ? state.storiesReducer.groupDetailData?.length > 0 ?
    state.storiesReducer.groupDetailData[0]?.is_follow_user != undefined ? state.storiesReducer.groupDetailData[0]?.is_follow_user.length > 0 ? true : false : false : false : false || false);
  const communityCategoryData =
    useSelector((state) => state.storiesReducer?.communityCategoryGroupListData?.length > 0 ?
      state.storiesReducer.communityCategoryGroupListData[0]?.data : []) || [];
  const members =
    useSelector((state) => state.storiesReducer?.groupMemberData?.length > 0 ?
      state.storiesReducer.groupMemberData[0]?.data : []) || [];
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const communityData = useSelector((state) => state.storiesReducer?.groupPostData?.length > 0 ?
    state.storiesReducer.groupPostData[0]?.data : []) || [];
  const commentsData = useSelector((state: RootState) => state.storiesReducer?.commentsData?.length > 0 ?
    state.storiesReducer.commentsData[0]?.data : []) || [];
  const userData = useSelector((state) => state.onboardingReducer.userDetails);

  useEffect(() => {
    props.actions.getGroupDetailAllData(
      'groupDetailData',
      [],
      actionTypes.GET_GROUP_DETAIL_DATA_ALL,
    ),
      setCommuityList([])
    apiCall()
    apiCallForGetMembers()
    apiCallForGetCategories()
  }, []);

  const onRefresh = React.useCallback(() => {
    props.actions.getGroupDetailAllData(
      'groupDetailData',
      [],
      actionTypes.GET_GROUP_DETAIL_DATA_ALL,
    ),
      setCommuityList([])
    apiCall()
    apiCallForGetMembers()
    apiCallForGetCategories()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, []);

  useEffect(() => {
    if (communityCategoryData.length > 1) {
      apiCallForGetPosts(1, communityCategoryData[1].id)
      setCatId(communityCategoryData[0].id)
      setSelectedType(communityCategoryData[1])
    }
  }, [communityCategoryData]);

  useEffect(() => {
    setJoin(isFollow)
  }, [isFollow]);

  useEffect(() => {
    setCalling(true)
    if (communityData.length > 0 && page != 1) {
      if (communityData.length > 9) {
        setLoadMore(true)
      }
      let data = communityList.concat(communityData)
      setCommuityList(data)
    } else if (communityData != undefined) {
      setLoadMore(false);
    } else {
      setLoader(false);
    }
  }, [communityData])
  useEffect(() => {
    if (groupData?.status != undefined) {
      if (groupData?.data?.length > 0) {
        setItem(groupData.data[0])
      }
      setLoader(false)
    }
  }, [groupData])
  useEffect(() => {
    if (commentsData.id != undefined) {
      citem.my_new_comment = [commentsData]
      citem.comments_count = (citem?.comments_count != undefined ? citem?.comments_count : 0) + 1
      setValueChange(!valueChange)
      props.actions.addCommentsData(
        'commentsData',
        {},
        actionTypes.ADD_COMMENTS_DATA,
      )
    }
  }, [commentsData])

  //Api Call
  const apiCall = () => {
    props.actions.getGroupDetailData(actionTypes.GET_GROUP_DETAIL_DATA, {
      module: 'post_subcategory',
      action: 'get_post_subcategories_details',
      formData: {
        id: props.route.params.id,
        user_id: userId
      }
    });
  }
  const apiCallForGetCategories = () => {
    props.actions.getCommunityCategoryListData(actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA, {
      module: 'post_category',
      action: 'getAll',
      formData: {
        post_subcategory_id: props?.route?.params?.id,
      }
    });
  }
  const apiCallPinGroup = (pin: any) => {
    props.actions.pinGroup(actionTypes.POST_PIN_GROUP, {
      module: 'user_follow',
      action: 'pinned_group',
      formData: {
        "userId": userId,
        "followPostSubCategoryId": item.id,
        "pin_flag": !pin ? 0 : 1
      }
    });
    setTimeout(() => {
      apiCallForGetGroups()
      params.getAllGroups()
    }, 1000)
  }
  const apiCallForJoinGroup = () => {
    Toast.show({
      text1: 'Success',
      text2: 'Group joined successfully'
    })
    props.actions.joinGroup(actionTypes.POST_JOIN_GROUP, {
      module: 'user_follow',
      action: 'create_update_group',
      formData: {
        "userId": userId,
        "followPostSubCategoryId": item.id
      }
    });
    setJoin(true)
    setTimeout(() => {
      apiCall()
      apiCallForGetMembers()
      if (communityCategoryData.length > 1) {
        apiCallForGetPosts(1, communityCategoryData[1].id)
      }
    }, 1000)
  }
  const apiCallForGetMembers = () => {
    props.actions.getGroupMemberData(actionTypes.GET_GROUP_MEMBERS_DATA, {
      module: 'post_subcategory',
      action: 'get_user_follow_list_by_sub_cat_id',
      formData: {
        "user_id": userId,
        "id": props.route.params.id,
      }
    });
  }
  const apiCallForGetPosts = (page: number, catId) => {
    if (loadeMore || page == 1) {
      setCalling(false)
      setPage(page + 1)
      let obj = {
        "postSubcategoryId": props.route.params.id,
        "page": page,
      }
      if (catId !== 0) {
        obj.post_cat_id = catId
      }
      props.actions.getGroupPostData(actionTypes.GET_GROUP_POSTS_DATA, {
        module: 'cancerHealingStory',
        action: 'stories_all_in_one',
        formData: obj
      });
      if (page == 1) {
        setCommuityList([])
      }
    }
  }
  const apiCallForUpdateSupport = (item) => {
    updateSupoort(item)
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "update",
      formData: {
        userId: userId,
        cancerHealingStoryId: item.id
      },
    }
    props.actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
  }
  const apiCallForGetGroups = () => {
    props.actions.getCommunityGroupListData(actionTypes.GET_COMMUNITY_GROUP_LIST_DATA, {
      module: 'post_subcategory',
      action: 'get_post_subcategories_summary',
      formData: {
        user_id: userId,
      },
    });
  }
  const apiCallReportList = (item: any) => {
    handleReport(item);
    props.actions.reportList(actionTypes.POST_REPORT_LIST_STORY, {
      module: 'cancer_healing_story_report',
      action: 'create',
      formData: {
        "userId": userId,
        "author": item.author_detail.id,
        "cancerHealingStoryId": item.id
      }
    });
  }
  const apiCallMarkAsSpamList = (item: any) => {
    handleReport(item);
    props.actions.markAsSpamList(actionTypes.POST_MARK_AS_SPAM_STORY, {
      module: 'cancerHealingStory',
      action: 'report_spam',
      formData: {
        "userId": userId,
        "cancer_healing_story_id": item.id,
      }
    });
  }
  const apiCallDeletePost = (item: any) => {
    props.actions.deletePost(actionTypes.DELETE_POST, {
      module: 'cancerHealingStory',
      action: 'remove',
      formData: {
        "id": item.id
      }
    });
    handleReport(item);
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
  const apiCallFollowList = (item: any) => {
    props.actions.followList(actionTypes.POST_FOLLOWLIST_STORY, {
      module: 'user_follow',
      action: 'user_follow_postsubcategory',
      formData: {
        "userId": userId,
        "followPostSubCategoryId": item.postSubcategoryId,
      }
    });
    updateFollowData(item)
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
  const leaveGroup = () => {
    var inputRequest = {
      module: "user_follow",
      action: "user_group_remove?id=" + item.id,
      formData: {
        userId: userId,
        followPostSubCategoryId: item.id
      }
    }
    props.actions.leaveGroup(actionTypes.LEAVE_GROUP, inputRequest);
    setJoin(false)
    setTimeout(() => {
      apiCall()
      params.getAllGroups()
      apiCallForGetMembers()
    }, 1000)
  }
  const postSelectType = (item) => {

    setSelectedType(item)
    setCatId(item.id)
    setCommuityList([])
    apiCallForGetPosts(1, item.id)

  }
  const addComments = (formData: FormData, item: any) => {
    setCItem(item)
    var inputRequest = {
      module: "cancerHealingStoryComment",
      action: "create",
      formData: formData
    }
    props.actions.addComments(actionTypes.ADD_COMMENTS, inputRequest)
  }

  //Helper Methods
  const postTypeItem = ({ item, index }) => {
    return item.name != 'All' && (
      <View style={styles.topicContainer}>
        <Pressable style={[styles.topicItem, selectedType === item && styles.selected]} onPress={() => {
          setSelectedType(item)
          setCatId(item.id)
          setCommuityList([])
          apiCallForGetPosts(1, item.id)
        }}>
          {item.id != 0 ?
            <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
              <SvgUri
                width="60%"
                height="60%"
                color='#000'
                uri={item.image}
              />
            </View> :
            <Image style={[styles.topicIcon, catId === item.id && { tintColor: theme.PRIMARY }]} source={require('../../../assets/images/all.png')} />}
          <Text style={[styles.topicTitle, selectedType === item && { color: theme.PRIMARY }]}>{item.name}</Text>
        </Pressable>
      </View>
    );
  }
  const renderMembers = ({ item, index }) => {
    return (
      <View style={styles.memberItemView}>
        <UserPlaceholder width={40} height={40} style={{ borderRadius: 20 }} />
        {/* <Image source={require('../../../assets/images/testProfile.png')} style={styles.memberImg} /> */}
        {/* <Text style={[styles.topicTitle, selectedType === item && {color: theme.PRIMARY}]}>{item.name}</Text> */}
      </View>
    );
  }
  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = contentSize.height > 1200 && communityList.length > 9 ? 1500 : 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }
  const updateSupoort = (item) => {
    if (item.cancer_healing_story_supports?.length > 0) {
      if (item.cancer_healing_story_supports?.length > 0 && item.cancer_healing_story_supports[0].status == 1) {
        item.cancer_healing_story_supports[0].status = 0
        let count = item.support_count - 1
        item.support_count = count > 0 ? count : 0
      } else {
        item.cancer_healing_story_supports[0].status = 1
        let count = item.support_count + 1
        item.support_count = count
      }
    } else {
      item.cancer_healing_story_supports = [{ status: 1 }]
      let count = item.support_count + 1
      item.support_count = count
    }
    setValueChange(!valueChange)
  }
  const onClickHeart = (comment: any, item: any) => {
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "support_to_comments",
      formData: {
        userId: userId,
        cancerHealingStoryCommentId: comment.id,
        cancerHealingStoryId: item.id
      }
    }
    props.actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
    updateCommentSupport(comment)
  }
  const updateCommentSupport = (comment: any) => {
    if (comment?.cancer_healing_story_supports != undefined) {
      if (comment?.cancer_healing_story_supports[0]?.status == 1) {
        comment.cancer_healing_story_supports[0].status = 0
        let count = comment.commentSupport - 1
        comment.commentSupport = count > 0 ? count : 0
      } else {
        comment.cancer_healing_story_supports[0] = { userId: 1, status: 1 }
        let count = comment.commentSupport + 1
        comment.commentSupport = count
      }
    } else {
      comment.cancer_healing_story_supports = [{ userId: 1, status: 1 }]
      comment.commentSupport = 1
    }
    setValueChange(!valueChange)
  }
  const toggleTextShown = () => {
    setTextShown(!textShown);
  };
  const toggleRulesTextShown = () => {
    setRulesTextShown(!rulesTextShown);
  };
  useEffect(() => {
    setNumLines(textShown ? undefined : 5);
  }, [textShown]);
  useEffect(() => {
    setRulesNumLines(textShown ? undefined : 7);
  }, [rulesTextShown]);
  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length >= 5 && !textShown) {
        setShowMoreButton(true);
        setNumLines(5);
      }
    },
    [textShown],
  );
  const onRulesTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length >= 5 && !rulesTextShown) {
        setRulesShowMoreButton(true);
        setRulesNumLines(7);
      }
    },
    [rulesTextShown],
  );
  const openProfileScreen = (item: any) => {
    props.navigation.navigate('Zen.ProfileScreen', {
      item: item,
      showDay: true, theme: theme,
    });
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
  const updateFollowData = (item: any) => {
    communityList.map((itemA: any) => {
      if (itemA.id == item.id) {
        if (itemA.post_subcategory.user_follows != undefined && itemA.post_subcategory.user_follows.length > 0 && item?.post_subcategory?.user_follows[0].status == 1) {
          itemA.post_subcategory.user_follows[0].status = 0
        } else if (itemA.post_subcategory.user_follows != undefined && itemA.post_subcategory.user_follows.length > 0) {
          itemA.post_subcategory.user_follows[0].status = 1
        } else {
          itemA.post_subcategory.user_follows = [{ userId: userId, status: 1 }]
        }
      }
    })
    setCommuityList([...communityList])
    setValueChange(!valueChange)
  }
  const handleReport = (reportItem: any) => {
    let newCommunityList = communityList.filter((item) => item.id !== reportItem.id);
    setCommuityList(newCommunityList);
    setValueChange(!valueChange);
  }
  const updateComment = (item, type, id) => {
    if (type == 0 && item.cancer_healing_story_comments.length > 0) {
      let filterData = item.cancer_healing_story_comments.filter(item => item.id != id)
      item.cancer_healing_story_comments = filterData
    }
    let count = 0
    if (type == 1) {
      count = item.comments_count + 1
    } else {
      count = item.comments_count - 1
    }
    item.comments_count = count
    setValueChange(!valueChange)
  }
  const onShare = async () => {
    let link = Platform.OS == 'ios' ? appConfig.APP_STORE : appConfig.PLAY_STORE
    let message = 'I came across this: \n' + item.name + '\n\n' + 'You can find more on this Cancer Care App:\n' + link
    try {
      const result = await Share.share({
        title: 'Share cancer care info',
        message: message,
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack()
      props.actions.getGroupDetailAllData(
        'groupDetailData',
        [],
        actionTypes.GET_GROUP_DETAIL_DATA_ALL,
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const postOption = () => {
    return (
      <Menu
        ref={mainMenuPopUp}
        style={[styles.menuStyle, { height: join ? 180 : 130 }]}
        anchor={
          <Pressable onPress={() => mainMenuPopUp.current.show()} style={styles.menuPlaceholderImgVw}>
            <Dots width={30} height={30} />
          </Pressable>}
        onRequestClose={() => mainMenuPopUp.current.hide()}
      >
        <MenuItem style={{ marginTop: Platform.OS == 'ios' ? 10 : 0, marginBottom: -8 }} onPress={() => {
          mainMenuPopUp.current.hide()
          setTimeout(() => {
            setOpenDetails(true);
          }, 600)
        }}>
          <View style={styles.menuItemView}>
            <Image style={styles.menuItemIcon} source={require('../../../assets/images/about.png')} />
            <Text style={styles.menuText}>{translate("GROUP")["ABOUT_GROUP"]}</Text>
          </View>
        </MenuItem>

        {join &&
          <MenuItem onPress={() => {
            leaveGroup();
            mainMenuPopUp.current.hide();
            Toast.show({
              text1: 'Success',
              text2: 'Group left successfully'
            })
          }}>
            <View style={styles.menuItemView}>
              <Leave width={17} height={17} />
              <Text style={styles.menuText}>{translate("GROUP")["LEAVE_GROUP"]}</Text>
            </View>
          </MenuItem>
        }
        <MenuItem onPress={() => {
          mainMenuPopUp.current.hide()
          setTimeout(() => {
            onShare()
          }, 600)
        }}>
          <View style={styles.menuItemView}>
            <Image style={styles.shareIcon} source={require('../../../assets/images/share.png')} />
            <Text style={styles.menuText}>{translate("COMMONTEXT")["SHARE"]}</Text>
          </View>
        </MenuItem>
        <MenuItem onPress={() => {
          mainMenuPopUp.current.hide();
          setPin(!pin);
          apiCallPinGroup(!pin);
          {
            !pin ?
            Toast.show({
              text1: 'Success',
              text2: 'Group pinned successfully'
            })
            :

            Toast.show({
              text1: 'Success',
              text2: 'Group unpinned successfully'
            })

          }
        }}>
          <Pressable style={styles.menuItemView}>
            <Pin width={21} height={21} style={styles.pinIcon} />
            <Text style={styles.menuText}>{!pin ? 'Pin' : 'Unpin'}</Text>
          </Pressable>
        </MenuItem>

      </Menu>
    );
  }

  return (
    <View style={styles.container}>
      {/* <ContentLoader
        containerStyles={{ marginTop: 50 }}
        loading={loader}
        pRows={4}
        pHeight={[200, 200, 50, 50]}
        pWidth={[widht - 20, widht - 20, widht - 20, widht - 20]}
      /> */}
      {loader &&
        <InstagramLoader active listSize={10} />}
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />

      {!loader &&
        <ScrollView style={styles.backgroundVw} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isScrollviewCloseToBottom(nativeEvent)) {
              if (calling) {
                apiCallForGetPosts(page, catId)
              }
            }
          }}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <ImageBackground style={styles.bgImage} source={{ uri: item?.image }} >
            <View style={styles.headerVw}>
              <Pressable style={[styles.backVw, { backgroundColor: 'rgba(0,0,0,0.3)' }]} onPress={() => {
                props.actions.getGroupDetailAllData(
                  'groupDetailData',
                  [],
                  actionTypes.GET_GROUP_DETAIL_DATA_ALL,
                );
                props.navigation.goBack()
              }}>
                <BackWhite width={15} height={15} style={{ marginLeft: -2 }} />
                {/* </Pressable> */}
              </Pressable>
              <View style={styles.menuIcon}>
                <View style={{ width: '60%', backgroundColor: 'rgba(0,0,0,0.3)', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                  {postOption()}
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.headerContainerView}>
            <View style={{ backgroundColor: theme.PRIMARY }}>
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={[styles.cancerTypeWarriorTitle, { textAlign: 'left', fontSize: 22, }]}>{item?.name}</Text>
                <View style={styles.likesMainView}>
                  <View style={[styles.likesView, { width: !join ? '75%' : '95%' }]}>
                    <ViewByPeople style={{ marginLeft: '1%' }} width={28} height={28} />
                    <Text style={styles.likesText}>{item?.members != null ? item?.members : 0}</Text>
                    <CommentWithLines style={{ marginLeft: '5%' }} width={30} height={30} />
                    <Text style={styles.likesText}>{item.posts != null ? item.posts : 0}</Text>
                  </View>
                  <Pressable onPress={() => { setOpenDetails(true) }} style={{ marginBottom: Platform.OS == 'android' ? 15 : 5 }}>
                    <Image source={require('../../../assets/images/about.png')} style={styles.aboutImg} />
                  </Pressable>
                  {!join &&
                    <View style={[styles.btnView, { bottom: Platform.OS == 'android' ? 8 : 0 }]}>
                      <Button height={34} width={50} marginTop={-7} theme={theme} buttonText={translate("COMMONTEXT").JOIN} fontSize={12} onPress={() => {
                        apiCallForJoinGroup();
                      }}
                      />
                    </View>
                  }
                </View>
              </View>

              <ShareOrAsk
                theme={theme}
                borderColor={"#e4e6ea"}
                borderWidth={4}
                text={translate("COMMONTEXT")["SHARE_YOUR_THOUGHTS_HERE"]}
                onPress={() => {
                  if (userData == undefined || Object.keys(userData).length == 0) {
                    props.navigation.navigate('Zen.UserOnBoarding')
                  } else {
                    if (!join) {
                      setOpenJoinModal(true);
                    } else {
                      props.navigation.navigate('Zen.CreatePost', {
                        fromCommunity: false,
                        postSubcategoryId: item.id
                      })
                    }
                  }
                }}
              />

              {communityCategoryData.length > 2 &&
                <View style={{ backgroundColor: "white", paddingVertical: 8 }} >
                  <SelectionTab
                    theme={theme}
                    data={communityCategoryData}
                    catId={catId}
                    handleCategorySelection={(item) => {
                      setSelectedType(item)
                      setCatId(item.id)
                      setCommuityList([])
                      apiCallForGetPosts(1, item.id)
                    }}
                  />
                </View>}
              <View style={{ height: 4, backgroundColor: "#e4e6ea", width: '100%' }} />

              {communityList.length > 0 ?
                communityList.map((item, index) => (
                  <CancerPost
                    item={item}
                    onPress={(item) => {
                      props.navigation.navigate('Zen.CommunityComment', {
                        id: item.id, item: item,
                        updateSupport: updateSupoort, updateComment: updateComment, handleReport: handleReport, updateBookMark: updateBookMark
                      })
                    }}
                    navigation={props.navigation}
                    onPressBookMark={onPressBookMark}
                    onPressPin={apiCallPinList}
                    onSupport={apiCallForUpdateSupport}
                    apiCallFollowList={apiCallFollowList}
                    apiCallMarkAsSpamList={apiCallMarkAsSpamList}
                    apiCallReportList={apiCallReportList}
                    onClickCommentHeart={onClickHeart}
                    showDay={true} theme={theme} index={index}
                    textShown={textShown}
                    setTextShown={setTextShown}
                    addComments={addComments}
                    apiCallDeletePost={apiCallDeletePost}
                    openProfileScreen={openProfileScreen}
                    isFrom={'GroupDetails'}
                    setVisible={(visible: any, item: any) => {
                      setCItem(item)
                      setTimeout(() => {
                        setVisible(visible)
                      }, 300)
                    }}
                  />
                ))
                :
                <View style={{ marginTop: 150, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize:14, color:theme.BLACK}}>Be the first one to post here</Text>
                </View>
              }

              {loadeMore &&
                <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator />
                </View>}

            </View>
          </View>
        </ScrollView>
      }

      <AboutModal
        openDetails={openDetails}
        setOpenModal={setOpenDetails}
        textShown={textShown}
        showMoreButton={showMoreButton}
        rulesShowMoreButton={rulesShowMoreButton}
        rulesTextShown={rulesTextShown}
        toggleRulesTextShown={toggleRulesTextShown}
        toggleTextShown={toggleTextShown}
        onRulesTextLayout={onRulesTextLayout}
        btnOnPress={() => { apiCallForJoinGroup(); setOpenDetails(false); }}
        onTextLayout={onTextLayout}
        rulesNumLines={rulesNumLines}
        numLines={numLines}
        theme={theme}
        item={item}
        isFollow={join}
      />

      <ReportOption
        isVisible={visible}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisible}
        handleReport={handleReport}
        item={item}
        actions={props.actions}
      />

      {openJoinModal &&
        <PostErrorModal
          openJoinModal={openJoinModal}
          setOpenJoinModal={setOpenJoinModal}
          theme={theme}
          onPress={() => { apiCallForJoinGroup(); setOpenJoinModal(false); }}
        />

        //   <Modal
        //    visible={openJoinModal}
        //    transparent={true}
        //    onRequestClose={() => { setOpenJoinModal(false); }}
        // >
        //   <Pressable style={styles.centeredView} onPress={() => setOpenJoinModal(false)}>
        //           <View style={styles.modalView}>
        //             <View style={{flexDirection:"row", alignItems:"center"}}>
        //               <Text style={{fontSize:14, fontFamily: FONTFAMILY.POPPINS_MEDIUM, marginRight:20}}>Please join to post</Text>
        //               <Button onPress={() => { apiCallForJoinGroup() }} height={34} width={66} marginTop={ Platform.OS == 'ios' ? -3 : 0} theme={theme} buttonText={translate("COMMONTEXT").JOIN} fontSize={12} />
        //             </View>
        //           </View>
        //       </Pressable>

        // </Modal>
      }
    </View>
  );
};
export default withTheme(Layout);
