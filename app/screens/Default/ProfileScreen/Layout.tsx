/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
  Text,
  BackHandler,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import {shortNameFunc} from "../../../utils/commonFunction"
import Back from '../../../assets/images/Back.svg'
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Postpage from '../../../components/Community/Postpage'
import { FONTFAMILY } from '../../../config/font-config';
import Activitypage from '../../../components/Community/Activitypage';
import actionTypes from '../../../store/actions/types';
import AppLoader from '../../../components/Plugins/AppLoader';
import { call } from 'redux-saga/effects';
import Modal from 'react-native-modal';
import ContentLoader from "react-native-easy-content-loader";
import SelectItem from '../../../assets/images/selectitem.svg';
import UnselectItem from '../../../assets/images/unselectitem.svg';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import ReportOption from '../../../components/Community/ReportOption'
import CancerPost from '../../../components/Community/CancerPost';
import AppHeader from '../../../components/CommonInput/appHeader';
import Button from '../../../components/CommonInput/navigateButton';
import {
  apiCallForUpdateSupport, onClickHeart, openUserProfileScreen, addComments, apiCallDeletePost, apiCallMarkAsSpamList,
  apiCallReportList, updateSupoort, updateComment, handleReport
} from '../../../utils/communityFunction';
import { isIphoneX } from '../../../lib/isIphoneX';
const widht = Dimensions.get('window').width;


interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
  route: object

}
const Layout = (props: IProps) => {

  const styles = style(props.theme);
  const theme = props.theme
  const mainMenuPopUp = React.createRef();
  const [textShown, setTextShown] = useState(-1);
  const [valueChange, setValueChange] = useState(false);
  const [loadeMore, setLoadMore] = useState(true)
  const [loader, setLoader] = useState(true);
  const [pageLoader, setPageLoader] = useState(true);
  const [communityList, setCommuityList] = useState([])
  const [page, setPage] = useState(1)
  const [calling, setCalling] = useState(false)
  const [cItem, setCItem] = useState({})
  const [isReasonPopupShow, setReasonPopupShow] = useState(false)
  const [isPictureModal, setPictureModal] = useState(false)
  const item = props.route.params?.item;
  const isFromHome = props.route.params?.isFromHome;
  const [reasonArray, setReasonArray] = useState([
    { key: '1', reasonTitle: 'Pretending to be someone', isSel: false },
    { key: '2', reasonTitle: 'Fake account', isSel: false },
    { key: '3', reasonTitle: 'Fake name', isSel: false },
    { key: '4', reasonTitle: 'Posting inappropriate things', isSel: false },
    { key: '5', reasonTitle: 'Harassment or bullying', isSel: false },
    { key: '6', reasonTitle: 'Something else', isSel: false }
  ])
  const [reasonValue, setReasonValue] = useState('')
  const [selectReason, setSelectedReason] = useState(-1)
  const [visible, setVisible] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userData = useSelector((state) => state.onboardingReducer.userDetailsData);
  const currentUserData = useSelector((state) => state.onboardingReducer.userDetails);

  console.log("123", isFromHome, userData)
  
  const commentsData =
    useSelector((state: RootState) => state.storiesReducer?.commentsData?.length > 0 ?
      state.storiesReducer.commentsData[0]?.data : []) || [];
  const communityData =
    useSelector((state: RootState) => state.storiesReducer?.profilePost?.length > 0 ?
      state.storiesReducer.profilePost[0] : []) || [];
  const imageData = useSelector((state) => state.onboardingReducer.profileImage);


  useEffect(() => {
    if (Object.keys(currentUserData).length !== 0 &&  imageData != undefined && imageData?.data?.length > 0 && imageData?.data[0].image != 
    currentUserData?.data?.image) {
      currentUserData.data.image = imageData?.data[0]?.image
      props.actions.callUserDetailsData("userDetails", currentUserData, actionTypes.ADD_USER_DETAILS_DATA)
      apiCallForGetProfile();
    }
    setTimeout(() => {
      setLoader(false);
      setPageLoader(false)
    }, 500);
  }, [imageData])
  useEffect(() => {
    if (commentsData.id != undefined) {
      cItem.my_new_comment = [commentsData]
      cItem.comments_count = (cItem?.comments_count != undefined ? cItem?.comments_count : 0) + 1
      setValueChange(!valueChange)
      props.actions.addCommentsData(
        'commentsData',
        {},
        actionTypes.ADD_COMMENTS_DATA,
      )
    }
  }, [commentsData])
  useEffect(() => {
    apiCallForGetProfile()
    apiCallForGetPosts(1)
  }, []);
  useEffect(() => {
    if (communityData?.data?.length > 0) {
      setCalling(true)
      setLoader(false)      
      setLoadMore(communityData?.data?.length < 15 ? false : true)
      let data = communityList.concat(communityData?.data)
      setCommuityList(data)
    } else if (communityData != undefined) {
      setLoadMore(false)
      setLoader(false)
    }
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [communityData])
  useEffect(() => {
    setCommuityList([])
    const backAction = () => {
      goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const goBack = () => {
      props.navigation.goBack()
      setTimeout(() => {
        props.actions.otherUserProfileData(
          'userDetailsData',
          [],
          actionTypes.FETCH_OTHER_DETAIL_DATA,
        );
        props.actions.profilePostData(
          'profilePost',
          [],
          actionTypes.PROFILE_POST_ALL,
        );
      }, 300)
  }

  //Api Call
  const apiCallForGetPosts = (page: number) => {
    if (loadeMore || page == 1) {
      setCalling(false)
      setPage(page + 1)
      props.actions.profilePost(actionTypes.PROFILE_POST, {
        module: 'cancerHealingStory',
        action: 'stories_all_in_one',
        formData: {
          "fetch_by_user_id": item?.author_detail?.id || item?.user?.user_details[0]?.userId || item?.userId,
          "page": page
        }
      });
      if (page == 1) {
        setCommuityList([])
      }
    }
  }
  const apiCallForGetProfile = () => {
    let inputRequest = {
      module: 'userDetail',
      action: 'getById',
      formData: {
        "userId": item?.author_detail?.id || item?.user?.user_details[0]?.userId || item?.userId,
      }
    }
    props.actions.callFetchDetails(actionTypes.FETCH_OTHER_DETAILS, inputRequest)
  }
  const apiCallForUserReport = () => {
    let inputRequest = {
      module: 'user_report',
      action: 'create',
      formData: {
        "userId": userData.data.userId,
        "reportedUserId": item?.author_detail?.id || item?.user?.user_details[0]?.userId || item?.userId,
        "reason": reasonValue
      }
    }
    props.actions.callUserReport(actionTypes.USER_REPORT, inputRequest)
    setLoader(true)
    handleBack(true)
  }
  const apiCallForFollowUser = () => {
    let inputRequest = {
      module: 'user_follow',
      action: 'user_follow_user',
      formData: {
        "userId": userId,
        "followUserId": item?.author_detail?.id || item?.user?.user_details[0]?.userId || item?.userId,
      }
    }
    props.actions.callFetchDetails(actionTypes.FOLLOW_USER, inputRequest)
    console.log("123")
    if (userData?.user_follow?.length > 0) {
      if (userData?.user_follow[0].status == 1) {
        userData.user_follow[0].status = 0
        userData.followers_count = userData.followers_count > 0 ? userData.followers_count - 1 : 0
      } else {
        userData.followers_count = userData?.followers_count + 1
        userData.user_follow[0].status = 1
      }
    } else {
      userData.user_follow = [{ userId: userId, status: 1 }]
      userData.followers_count = userData.followers_count + 1
    }
    setValueChange(!valueChange)
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
  const apiCallBlockUser = () => {
    props.actions.blockUser(actionTypes.BLOCK_USER, {
      module: 'user_blocked',
      action: 'create',
      formData: {
        "blockedUserId": userData?.data?.userId,
      }
    });
    setLoader(true)
    handleBack(false)
  }
  const apiCallForEditImage = (image: any) => {
    setPictureModal(false)
    const formData = new FormData();
    if (image != undefined) {      
      formData.append('image', { uri: image?.path, name: 'image.jpg', type: 'image/jpeg' });
    }    
    formData.append('id', userData?.data?.id);
    var inputRequest = {
      module: "userDetail",
      action: "update",
      formData: formData
    }
    props.actions.editImage(actionTypes.EDIT_IMAGE, inputRequest)
  }
  const handleBack = (isReport = true) => {
    setTimeout(() => {
      props?.route?.params?.onRefresh()
      props.navigation.goBack();
      props.navigation.goBack()
      props.actions.otherUserProfileData(
        'userDetailsData',
        [],
        actionTypes.FETCH_OTHER_DETAIL_DATA,
      );
      props.actions.profilePostData(
        'profilePost',
        [],
        actionTypes.PROFILE_POST_ALL,
      );
      if (!isReport) {
        Toast.show({
          type: 'success',
          text1: 'You blocked this user',
        });
      } else {
        Toast.show({
          // type: 'error',
          text1: 'Thank you for reporting.',
          text2: 'We shall shortly review this profile.'
        });
      }
      setLoader(false)
    }, 700)
  }

  //Helper Methods
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
        if (itemA?.post_subcategory?.user_follows?.length > 0 && item?.post_subcategory?.user_follows[0].status == 1) {
          itemA.post_subcategory.user_follows[0].status = 0
        } else if (itemA?.post_subcategory?.user_follows?.length > 0) {
          itemA.post_subcategory.user_follows[0].status = 1
        } else {
          itemA.post_subcategory.user_follows = [{ userId: userId, status: 1 }]
        }
      }
    })
    setCommuityList([...communityList])
    setValueChange(!valueChange)
  }
  const openGallery = () => {    
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      apiCallForEditImage(image)
    });
  }
  const openCamera = () => {
    setPictureModal(false)
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      apiCallForEditImage(image)
    });
  }
  const updateCommentSupport = (comment: any) => {
    if (comment?.cancer_healing_story_supports[0]?.status == 1) {
      comment.cancer_healing_story_supports[0].status = 0
      let count = comment.commentSupport - 1
      comment.commentSupport = count > 0 ? count : 0
    } else {
      comment.cancer_healing_story_supports = [{ status: 1 }]
      let count = comment.commentSupport + 1
      comment.commentSupport = count
    }
    setValueChange(!valueChange)
  }
  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 50;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }
  const handleBlockAlert = () => {
    let str = userData?.data?.name + "\n" + "They won't be able to see your profile or posts. They will not receive a notification for being blocked."
    Alert.alert(
      'Block user?',
      str,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Block", onPress: () => {
            apiCallBlockUser()
          }
        }
      ]
    )
  }
  const postOption = () => {
    return (
      <Menu
        ref={mainMenuPopUp}
        style={styles.menuStyle}
        anchor={
          <Pressable onPress={() => mainMenuPopUp.current.show()} style={styles.menuPlaceholderImgVw}>
            <Image style={[styles.menuPlaceholderImg]} source={require('../../../assets/images/dots.png')} />
          </Pressable>}
        onRequestClose={() => mainMenuPopUp.current.hide()}>

        <MenuItem style={{ marginBottom: -10 }} onPress={() => {
          setTimeout(() => {
            setReasonPopupShow(true)
          }, 500)
          mainMenuPopUp.current.hide()
        }}>{translate("COMMONTEXT")["REPORT_USER"]}</MenuItem>

        <MenuItem onPress={() => {
          setTimeout(() => {
            handleBlockAlert()
          }, 500)
          mainMenuPopUp.current.hide()
        }}>{translate("COMMONTEXT")["BLOCK_USER"]}</MenuItem>

      </Menu>
    );
  }
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <AppHeader
        theme={theme}
        onBackPress={() => goBack()}
        headerTitle={translate("FILTER")["PROFILE"]}
        isRightComponent={true}
        isMenu={true}
        menuOption={currentUserData?.data?.userId == userData?.data?.userId ? <View/> : postOption()}
      />
      <ScrollView nestedScrollEnabled={false}
        keyboardShouldPersistTaps={'always'}
        onScroll={({ nativeEvent }) => {
          if (isScrollviewCloseToBottom(nativeEvent)) {
            if (calling) {
              apiCallForGetPosts(page)
            }
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={{ paddingBottom: 10 }}>
          <View>
            <View style={styles.userProfileVw}>
              <Pressable onPress={() => userData?.data?.userId == userId ? setPictureModal(!isPictureModal) : ''} >
                <Image source={userData?.data?.image == null || userData?.data?.image == undefined ? require('../../../assets/images/profileImage.png') : { uri: userData?.data?.image }} style={styles.userImg} />
              </Pressable>
              <View style={styles.userDesVw} >
                <Text style={[styles.userName, {fontSize:14}]} numberOfLines={1} >{userData?.data?.name}</Text>
                <Text style={[styles.userDesTxt, { marginTop: Platform.OS === 'ios' ? 0 : -3, fontSize:12, }]} > 
                  {shortNameFunc(
                     isFromHome ? userData : item?.author_detail?.user_details.length > 0 ?
                          item?.author_detail?.user_details[0] : undefined
                  )}
                </Text>
                <Text style={[styles.userDesTxt, { marginTop: Platform.OS === 'ios' ? -2 : -6, fontSize:12 }]} > {userData?.chj_health_status?.name}</Text>

                <View style={[styles.counterVw, { marginTop: Platform.OS === 'ios' ? 3 : 0 }]}>
                  {!pageLoader && userData?.data?.userId != userId &&
                    <>
                      <Button height={25} width={101} marginTop={Platform.OS == 'ios' ? -1 : 0} theme={theme} buttonText={userData?.user_follow?.length > 0 && userData?.user_follow[0].status == 1 ? 'Unfollow' : 'Follow'} fontSize={10} 
                        onPress={() => { apiCallForFollowUser()}}
                      />
                      <View style={{marginLeft:10}}>
                      {/* <Button height={25} width={101} marginTop={Platform.OS == 'ios' ? -1 : 0} theme={theme} fontFamily={FONTFAMILY.POPPINS_REGULAR} buttonText={translate("COMMONTEXT").MESSAGE} fontSize={10} 
                         onPress={() => {
                          let user = {
                            name: userData?.data?.name,
                            image: userData?.data?.image ? userData?.data?.image : null,
                            userId: item?.author_detail?.id || item?.user?.user_details[0]?.userId || item?.userId,
                            cancerName: userData?.cancer_category?.name ? userData?.cancer_category?.name : "",
                            cancerStage: userData?.cancer_stage?.cancer_stage ? userData?.cancer_stage?.cancer_stage :""
                          }
                          props.navigation.navigate('Zen.Chat', { user: user })}
                         }/> */}
                      </View>
                    </>
                  }
                </View>
              </View>
            </View>

            <View style={[styles.counterVw, { borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: theme.STROKE_COLOR, paddingVertical: Platform.OS === 'android' ? 10 : 12,  paddingHorizontal:10}]}>
              <Text style={styles.countText} numberOfLines={1}>{userData?.user_activity_count}</Text>
              <Text style={styles.countText} numberOfLines={1}> {translate("COMMONTEXT")["ACTIVITIES"]}</Text>
              <View style={styles.line} />
              <Text style={styles.countText} numberOfLines={1}>{userData?.followers_count}</Text>
              <Text style={styles.countText} numberOfLines={1}> {translate("COMMONTEXT")["FOLLOWERS"]}</Text>
              <View style={styles.line} />
              <Text style={styles.countText} numberOfLines={1}>{userData?.following_count}</Text>
              <Text style={styles.countText} numberOfLines={1}> {translate("COMMONTEXT")["FOLLOWING"]}</Text>
            </View>
          </View>
          {userData?.data?.summary != null && userData?.data?.summary.length > 0 &&
            <Text style={styles.aboutNm}>{'About ' + userData?.data?.name}</Text>}
          <Text style={styles.detailTxt}>{userData?.data?.summary}</Text>
          {/* <Text style={styles.readHS}>Read Cancer Healing Journey ⇉</Text> */}
        </View>
        {communityList.map((item, index) => (
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
                  apiCallMarkAsSpamList={(item) => apiCallMarkAsSpamList(props.actions, item, communityList, setCommuityList,valueChange, setValueChange, userId, true)}
                  apiCallReportList={(item) => apiCallReportList(props.actions, item, communityList, setCommuityList,valueChange, setValueChange, userId, true)}
                  onClickCommentHeart={(comment, item) => onClickHeart(props.actions,comment, item, userId, valueChange, setValueChange)}
                  showDay={true}
                  theme={theme}
                  index={index}
                  textShown={textShown}
                  setTextShown={setTextShown}
                  openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme, () => {})}
                  addComments={(data, item) => addComments(props.actions, data,item, setCItem)}
                  apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList,valueChange, setValueChange, true)}
                  navigation={props.navigation}
                  setVisible={(visible: any, item: any) => {
                    setCItem(item)
                    setTimeout(() => {
                      setVisible(visible)
                    }, 300)
                  }}
                />
        ))}
        {loadeMore && communityList.length > 0 &&
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={theme.SECONDARY} />
          </View>
        }

      </ScrollView>
      {isReasonPopupShow &&
        <Modal
          isVisible={isReasonPopupShow}
          animationIn={'fadeInUp'}
          animationOut={'fadeInDown'}
          onBackdropPress={() => setReasonPopupShow(false)}
          onBackButtonPress={() => setReasonPopupShow(false)}
          backdropOpacity={0.3}
        >
          <View style={styles.reasonModalContainer} >
            <View style={styles.reasonModalVw}>
              <Text style={[styles.modalTitleText, { marginTop: 5 }]} numberOfLines={1} >{translate("CHECKOUT")["REASON_TO_REPORT"]}</Text>
              {reasonArray.map((item, index) => {
                return (
                  <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }} >
                    <Pressable onPress={() => {
                      setSelectedReason(index)
                    }} >
                      {selectReason == index ?
                        <SelectItem width={23} height={23} /> :
                        <UnselectItem width={23} height={23} />}
                    </Pressable>
                    <Text style={styles.deactivateText} numberOfLines={1} onPress={() => {
                      setSelectedReason(index)
                    }}>{item.reasonTitle}</Text>
                  </View>
                );
              })}
              {selectReason === reasonArray.length - 1 &&
                <View style={styles.deletionInputVw}>
                  <TextInput
                    value={reasonValue}
                    placeholder={translate("CHECKOUT")["REASON_FOR_REPORT"]}
                    placeholderTextColor={styles.placeholderText}
                    style={styles.postText}
                    multiline={true}
                    onChangeText={(value) => setReasonValue(value)} />
                </View>
              }
              <Pressable onPress={() => {
                if (selectReason != -1) {
                  apiCallForUserReport()
                }
                setReasonPopupShow(false)
              }} style={styles.okView} >
                <Text style={[styles.okText]} numberOfLines={1} >{translate("COMMONTEXT")["OK"]}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>}
        {isPictureModal &&
            <Modal
              onBackdropPress={() => setPictureModal(false)}
              onBackButtonPress={() => setPictureModal(false)}
              isVisible={isPictureModal}
              style={styles.pictureModalContainer}>
              <Pressable style={styles.itemView} onPress={() => openCamera()} >
                <Image style={styles.cameraGalleryImage} source={require('../../../assets/images/camera.png')} />
                <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["CAMERA"]}</Text>
              </Pressable>
              <Pressable style={styles.itemView} onPress={() => openGallery()} >
                <Image style={styles.cameraGalleryImage} source={require('../../../assets/images/picture.png')} />
                <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["GALLERY"]}</Text>
              </Pressable>
            </Modal>
          }
      <ReportOption
        isVisible={visible}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisible}
        handleReport={handleReport}
        item={cItem}
        actions={props.actions}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
