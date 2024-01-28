/**
 * CommunityComment Component
 * @Author: Astha
 * @Date: Wed April 15 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import style from './Style';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Platform,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Share,
  BackHandler,
  Dimensions,
  FlatList,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { shortNameFunc } from '../../../utils/commonFunction';
import Back from '../../../assets/images/Back.svg'
import MainComment from '../../../components/Community/MainComment'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Menu, MenuItem } from 'react-native-material-menu';
import AppLoader from '../../../components/Plugins/AppLoader';
import appConfig from '../../../config/app-config';
import ContentLoader from "react-native-easy-content-loader";
import FullScreenImage from '../../../components/Community/FullScreenImage';
import { setWith } from 'lodash';
import Carousel from 'react-native-snap-carousel';
import Right from '../../../assets/images/right_arrow_blue.svg';
import Right_Grey from '../../../assets/images/right_arrow_grey.svg';
import RenderHtml from 'react-native-render-html';
import Share1 from '../../../assets/images/share1.svg';
import Comment from '../../../assets/images/comment.svg';
import Support from '../../../assets/images/support.svg';
import Support1 from '../../../assets/images/support_unselected.svg';
import Bookmark from '../../../assets/images/bookmark_selected.svg';
import Bookmark1 from '../../../assets/images/bookmark_unselected.svg';
import ReportOption from '../../../components/Community/ReportOption'
import Toast from 'react-native-toast-message';
import Dots from '../../../assets/images/Dots.svg';


import request from '../../../services/client';

const defaultWidth = Dimensions.get('window').width;

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any;
  route: object
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const flatlistRef = useRef();
  const ref = useRef();
  const popupMenu = React.createRef();
  const menuPopUp = React.createRef();
  const mainMenuPopUp = React.createRef();
  const [commentTxt, setCommentTxt] = useState('');
  const [tagName, setTagName] = useState('');
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [valueChange, setValueChange] = useState(false);
  const [textShown, setTextShown] = useState(true);
  const [numLines, setNumLines] = useState(undefined);
  const [bookmark, setBookMark] = useState(false);
  const [commentId, setCommentId] = useState(0)
  const [isLoader, setLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(false);
  const [loader, setALoader] = useState(true);
  const [imageModal, setImageModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [reply, setReply] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [visibleReport, setVisibleReport] = useState(false)
  const [comments, setComments] = useState([])
  const [loadeMore, setLoadMore] = useState(true)
  const [mediaArr, setMediaArr] = useState([]);
  const [page, setPage] = useState(1)
  const [cancerTypesArray, setCancerTypesArray] = useState([
    { id: 1, text: 'Types of Appendix Cancer' }, { id: 2, text: 'Nasopharyngeal Cancer' }, { id: 3, text: 'B - Cell Prolymphocytic Leukemia And Hairy Cell Leukemia' }
  ]);

  const id = props?.route?.params?.id
  const [item, setItem] = useState(props?.route?.params?.item);
  const communityDetail = useSelector((state) => state.storiesReducer.communityDetailData?.length > 0 ?
    state.storiesReducer.communityDetailData[0] : {} || {});
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const commentData = useSelector((state) => state.storiesReducer.postComment?.length > 0 ?
    state.storiesReducer.postComment[0]?.data : {} || {});
  const addCommentData = useSelector((state) => state.storiesReducer.commentsData?.length > 0 ?
    state.storiesReducer.commentsData[0]?.data : {} || {});  
  const editComment = useSelector((state) => state.storiesReducer.editComment?.length > 0 ?
    state.storiesReducer.editComment[0].data : {} || {});
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  // console.log("44747-----", item);
  
  
  // let descText = ''
  // if (item?.author_detail?.user_details.length > 0) {
  //   let userDetail = item?.author_detail?.user_details[0]
  //   if(userDetail?.cancer_category?.name != undefined){
  //     descText = userDetail?.cancer_category?.name + ' - ' + userDetail?.cancer_stage?.cancer_stage
  //   }
  //   if (userDetail?.chj_health_status) {
  //     descText = descText + ' (' + userDetail?.chj_health_status?.name + ')'
  //   }
  // }
  const [pin, setIsPin] = useState(false);
  const [follow, setIsfollow] = useState(false);

  useEffect(() => {
    setLoader(true);
    apiCallForGetDetail(1)
    getItemDetail()
  }, []);

  const getItemDetail = async () => {
    if(item == undefined){
      try {
            let getData = await request({method: 'get', data: {
                module: 'cancerHealingStory',
                action: 'stories_all_in_one?page=1',
                formData: {
                  story_id : id
                }}})
                
            if(getData?.data?.data != undefined && getData?.data?.data != null)
            {
              setItem(getData?.data?.data)
            }
        } catch (error) {
            
        }
    }
  }

  useEffect(() => {
    if (commentData != undefined && commentData?.cancer_healing_story_comments?.length > 0) {
      setLoader(false);
      setLoadMore(commentData.cancer_healing_story_comments?.length < 7 ? false : true)
      let data = comments.concat(commentData?.cancer_healing_story_comments)
      setComments(data)
    } else {
      setLoadMore(false)
      setLoader(false);
    }
  }, [commentData]);

  useEffect(() => {
    if (addCommentData?.id != undefined) {
      setLoader(false);
      setComments(commentData?.cancer_healing_story_comments)
      callMethods()
      setCommentTxt('');
      setSelectedImage(undefined)
      setTagName('')
      setCommentId(0)
      setReply(false);
      if (commentId == 0) {
        if (!reply) {
          flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
      }

    }
  }, [addCommentData]);

  useEffect(() => {
    if (editComment?.status == 1) {
      setLoader(false)
      callMethods()
      props.actions.editCommentData(
        'editComment',
        [],
        actionTypes.EDIT_COMMENT_DATA,
      )
    }
  }, [editComment]);

  useEffect(() => {
        setCurrentItem(item)
        setIsPin(item?.cancer_healing_story_pins?.length != undefined && item?.cancer_healing_story_pins?.length > 0 ? true : false)
        setBookMark(item?.cancer_healing_story_bookmarks?.length > 0 ? true : false)
        setIsfollow(item?.post_subcategory?.user_follows?.length != undefined && item?.post_subcategory?.user_follows?.length > 0 ?
          item?.post_subcategory?.user_follows[0].status == 1 ? true : false : false)
        setALoader(false);
        setValueChange(!valueChange)
  }, [props]);

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  //Helper Methods
  const callMethods = () => {
    props.actions.postComemntData(
      'postComment',
      [],
      actionTypes.GET_POST_COMMENT_DATA,
    )
    setComments([])
    setTimeout(() => {
      apiCallForGetDetail(1)
    }, 300)
  }
  const apiCallForGetDetail = (page: number) => {
    setPage(page + 1)
    props.actions.postComemnt(actionTypes.GET_POST_COMMENT, {
      module: 'cancerHealingStoryComment',
      action: 'getComments',
      formData: {
        story_id: id,
        page: page,
      }
    });
  }
  const onClickHeart = (comment: any, index: any) => {
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "support_to_comments",
      formData: {
        userId: userId,
        cancerHealingStoryCommentId: comment.id,
        cancerHealingStoryId: props?.route?.params?.item?.id
      }
    }
    props.actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
    updateCommentSupport(comment, index)
  }
  const updateCommentSupport = (comment: any, index: any) => {
    //  setTimeout(() => {
    //    apiCallForGetDetail()
    //  }, 300)
  }
  const hideMenu = () => {
    menuPopUp.current.hide();
  }
  const showMenu = () => {
    menuPopUp?.current.show();
  }
  const onClickReply = (item: any) => {
    setTagName('')
    setReply(true)
    ref.current.focus()
    setCommentId(item.id)
  }
  const onClickReplyToReply = (item: any, name: any) => {
    setTagName(name)
    setReply(true)
    ref.current.focus()
    setCommentId(item.id)
  }
  const RenderComment = ((itemA) => {
    return (
      <View style={{paddingHorizontal:20}}>
      <MainComment key={itemA.id} navigation={props.navigation} item={itemA.item} index={itemA.index} theme={theme} onClickReply={onClickReply} onClickReplyToReply={onClickReplyToReply}
        userId={userId} handleEdit={handleEdit} apiCallDeleteComment={apiCallDeleteComment} onClickHeart={onClickHeart} detail={currentItem} />
        </View>
    );
  })
  const openGallery = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1080,
      cropping: false
    }).then(image => {
      setSelectedImage(image)
    });
  }
  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1080,
      cropping: false,
    }).then(image => {
      setSelectedImage(image)
    });
  }
  const apiCallForUpdateSupport = () => {
    setValueChange(!valueChange)
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "update",
      formData: {
        userId: userId,
        cancerHealingStoryId: id
      }
    }
    props.actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
    props?.route?.params?.updateSupport(props?.route?.params?.item)
  }
  const apiCallForAddComment = () => {
    if (commentTxt.length > 0 || selectedImage != undefined) {
      Keyboard.dismiss();
      setLoader(true);
      setCommentId(0);
      const formData = new FormData();
      formData.append('userId', userId);
      if (selectedImage != undefined) {
        formData.append('image', { uri: selectedImage?.path, name: 'image.jpg', type: 'image/jpeg' });
      }
      formData.append('comment', commentTxt.trim());
      formData.append('cancerHealingStoryId', item?.id);
      if (commentId != 0) {
        formData.append('cancerHealingStoryCommentId', commentId);
      }
      if (tagName.length > 0) {
        formData.append('tagName', tagName);
      }      

      var inputRequest = {
        module: "cancerHealingStoryComment",
        action: "create",
        formData: formData
      }

      props.actions.addComments(actionTypes.ADD_COMMENTS, inputRequest)
      props?.route?.params?.updateComment(props?.route?.params?.item, 1)
    }
  }
  const toggleTextShown = () => {
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setNumLines(3);
      }
    },
    [textShown],
  );
  const onShare = async () => {
    let cleanText = item?.content?.replace(/<\/?[^>]+(>|$)/g, "");
    let message = 'I came across this interesting post on the Zenonco Care App: \n' + cleanText?.substring(0, 40) + '...'  + '\n\n' + 'You can find more on the Zenonco Care App:\n\nAndroid: ' + appConfig.PLAY_STORE + '\niOS: ' + appConfig.APP_STORE
    try {
      const result = await Share.share({
        message: message,
      });
    } catch (error) {
    }
  };
  const onPressBookMark = () => {
    var inputRequest = {
      module: "cancerHealingStory",
      action: "updateBookmark",
      formData: {
        userId: userId,
        cancerHealingStoryId: id
      }
    }
    props.actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest);
    setBookMark(!bookmark)
    props?.route?.params?.updateBookMark(item)
  }
  const onPressPin = (item: any) => {
    props.actions.pinList(actionTypes.POST_PIN_STORY, {
      module: 'cancer_healing_story_pin',
      action: 'create',
      formData: {
        "userId": userId,
        "cancerHealingStoryId": id,
      }
    });
    if (props?.route?.params?.item?.cancer_healing_story_pins.length > 0) {
      props.route.params.item.cancer_healing_story_pins = []
    } else {
      props.route.params.item.cancer_healing_story_pins = [{ id: 1 }]
    }
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
  }
  const apiCallReportList = (item: any) => {
    props.actions.reportList(actionTypes.POST_REPORT_LIST_STORY, {
      module: 'cancer_healing_story_report',
      action: 'create',
      formData: {
        "userId": userId,
        "author": item.author_detail.id,
        "cancerHealingStoryId": id,
        "remarks": "Post hidden by user"
      }
    });
    props?.route?.params?.handleReport(item)
    setTimeout(() => {
      navigateBack()
    }, 300)
  }
  const apiCallDeletePost = (item: any) => {
    props.actions.deletePost(actionTypes.DELETE_POST, {
      module: 'cancerHealingStory',
      action: 'remove',
      formData: {
        "id": id
      }
    });
    props?.route?.params?.handleReport(item)
    setTimeout(() => {
      navigateBack()
    }, 300)
  }
  const apiCallMarkAsSpamList = (item: any) => {
    props.actions.markAsSpamList(actionTypes.POST_MARK_AS_SPAM_STORY, {
      module: 'cancerHealingStory',
      action: 'report_spam',
      formData: {
        "userId": userId,
        "cancer_healing_story_id": id,
      }
    });
    navigateBack()
  }
  const apiCallDeleteComment = (itemA: any) => {
    props.actions.deleteComment(actionTypes.DELETE_COMMENT, {
      module: 'cancerHealingStoryComment',
      action: 'remove',
      formData: {
        "id": itemA.id,
        "CancerStoryId": id,
      }
    });
    props?.route?.params.updateComment(props?.route?.params?.item, 0, itemA.id)
    let filterData = comments.filter(item => item.id != itemA.id)
    setComments(filterData)
  }
  const apiCallEditComment = () => {
    const formData = new FormData();
    if (selectedImage != undefined) {
      formData.append('image', { uri: selectedImage?.path, name: 'image.jpg', type: 'image/jpeg' });
    }
    formData.append('comment', commentTxt.trim());
    formData.append('id', editId);
    setLoader(true)
    props.actions.editComment(actionTypes.EDIT_COMMENT, {
      module: 'cancerHealingStoryComment',
      action: 'update',
      formData: formData
    });
    setIsEdit(false)
    setCommentTxt('')
    setSelectedImage(undefined)
    // setTimeout(() => {
    //   apiCallForGetDetail()
    // }, 10000)
  }
  const handleEdit = (item: any) => {
    ref.current.focus()
    setIsEdit(true)
    setCommentTxt(item.comment)
    setEditId(item.id)
  }
  const commentPopup = (item: any) => {
    return (
      <Menu
        ref={popupMenu}
        style={{ borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 132, marginTop: 22 }}
        anchor={<Pressable style={{ padding: 8, marginTop: -16 }} onPress={() => popupMenu.current.show()}>
          <Image style={[styles.menuPlaceholderImg]} source={require('../../../assets/images/dots.png')} />
        </Pressable>}
        onRequestClose={() => popupMenu.current.hide()}>
        <MenuItem style={{}} onPress={() => { popupMenu.current.hide(); apiCallDeleteComment(item) }}>Delete</MenuItem>
        <MenuItem style={{}} onPress={() => {
          popupMenu.current.hide();
          handleEdit(item)
        }}>{translate("COMMONTEXT")["EDIT"]}</MenuItem>
      </Menu>
    );
  }
  const handleAlert = () => {
    Alert.alert(
      'Hide Post',
      'Are you sure you want to hide this post?',
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => {
            apiCallReportList(item);
          }
        }
      ]
    )
  }
  const postOption = () => {
    return (
      <Menu
        ref={mainMenuPopUp}
        style={{
          borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 132, height: userData?.user_profile?.id >= 7 ? userData?.data?.userId == item?.author_detail?.id ? 120 : 90 :
            userData?.data?.userId == item?.author_detail?.id ? 50 : 90, marginTop: 23
        }}
        anchor={
          <Pressable onPress={() => mainMenuPopUp.current.show()} style={styles.menuPlaceholderImgVw}>
            <Dots />
            {/* <Image style={[styles.menuPlaceholderImg, { marginTop: -20 }]} source={require('../../../assets/images/dots.png')} /> */}
          </Pressable>}
        onRequestClose={() => mainMenuPopUp.current.hide()}>
        {/* <MenuItem style={{}} onPress={() => {
                     apiCallFollowList(item);
                     mainMenuPopUp.current.hide();
                     setIsfollow(!follow)
                     }}>{follow ? 'Unfollow' : 'Follow'}</MenuItem> */}
        <MenuItem style={{}} onPress={() => {
          mainMenuPopUp.current.hide();
          handleAlert(item);
        }}>Hide Post</MenuItem>
        <MenuItem style={{}} onPress={() => {
          mainMenuPopUp.current.hide();
          setTimeout(() => {
            setVisibleReport(true);
          }, 300)
        }}>Report Post</MenuItem>
        {userData?.data?.userId == item?.author_detail?.id &&
          <MenuItem style={{ marginTop: -10 }} onPress={() => {
            mainMenuPopUp.current.hide();
            apiCallDeletePost(item)
          }}>Delete</MenuItem>}
        {userData?.user_profile?.id >= 7 &&
          <MenuItem style={{ marginTop: -11 }} onPress={() => {
            mainMenuPopUp.current.hide();
            apiCallMarkAsSpamList(item);
          }}>Mark as spam</MenuItem>}
        {/* <MenuItem style={{}} onPress={() => {
           mainMenuPopUp.current.hide()
           onPressPin(item)
           setIsPin(!pin);
         }}>{props?.route?.params.item?.cancer_healing_story_pins?.length != undefined && props?.route?.params.item?.cancer_healing_story_pins.length > 0 ? "Unpin post" : "Pin post"}</MenuItem> */}
      </Menu>
    );
  }
  const openProfileScreen = () => {
    props.navigation.navigate('Zen.ProfileScreen', {
      item: item,
      showDay: true, theme: theme,
    });
  }
  const navigateBack = () => {
    if (props?.route?.params?.isBack == undefined) {
      props.actions.postComemntData(
        'postComment',
        [],
        actionTypes.GET_POST_COMMENT_DATA,
      )
      props.navigation.goBack()
    } else {
      props.navigation.pop(2)
    }
  }

  useEffect(() => {
    const backAction = () => {
      navigateBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onChange = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide != activeIndex) {
      setActiveIndex(slide)
    }
    // if (slide == dataArr.length) {
    //     setPaused(false)
    //     setPlayerState(PLAYER_STATES.PLAYING)
    // } else {
    //     setPaused(true)
    //     setPlayerState(PLAYER_STATES.PAUSED)
    // }
  }
  const renderItem = ({ item, index }) => {
    
    
    let height1 = item.height
    let width1 = item.width
    let originalSize = defaultWidth - 40
    let height2 = originalSize
    if (width1 == height1) {
      height2 = originalSize
    } else if (width1 > height1) {
      var ratio = height1 / width1;
      var newHeight = Math.ceil(ratio * originalSize);
      height2 = newHeight
    } else if (height1 < originalSize) {
      height2 = height1 - 40
    } else {
      height2 = originalSize
    }
    let height = !isNaN(height2) ? height2 : originalSize

    return (
      <TouchableWithoutFeedback style={{ backgroundColor: 'pink' }} key={index} onPress={() => {
        let arr = []
        props?.route?.params?.item?.post_images.map(item => {
          
                 arr.push({
                    // url: item.imagesourc
                    uri: item.image
                 })   
            })
            setMediaArr(arr)
            setTimeout(() => {
                setImageModal(true)
            }, 300)
      }}>

        {/* {item.mediaType === "image" ? */}
        <Image source={{ uri: item.image }} style={[styles.postImg, { height: height }]} />
        {/* : <View style={styles.sliderVideoStyle}>
                    <Video
                        source={{ uri: item.url }}
                        onEnd={onEnd}
                        onLoad={onLoad}
                        onLoadStart={onLoadStart}
                        onProgress={onProgress}
                        paused={paused}
                        ref={videoPlayer}
                        resizeMode={screenType}
                        onFullScreen={isFullScreen}
                        style={Platform.OS === 'ios' ? styles.backgroundVideo : [styles.backgroundaVideo, { top: screenType === 'cover' ? 0 : 50, bottom: screenType === 'cover' ? 0 : -50, }]}
                        volume={5}
                    />
                    <MediaControls
                        duration={duration}
                        isLoading={isLoading}
                        mainColor={theme.SUB_TITLE}
                        onFullScreen={onFullScreen}
                        onPaused={onPaused}
                        onReplay={onReplay}
                        onSeek={onSeek}
                        onSeeking={onSeeking}
                        playerState={playerState}
                        progress={currentTime}
                        toolbar={renderToolbar()}
                    />
                </View>} */}
      </TouchableWithoutFeedback>
    )
  };
  const renderFooter = () => {
    return loadeMore && (
      //Footer View with Load More button
      <View style={styles.footer}>
        <ActivityIndicator color="red" style={{ marginLeft: 8 }} />
      </View>
    );
  }
  function header() {
    return (
     <View>
{item?.title?.length > 0 &&
              <Text style={styles.postTitle}>{item?.title}</Text>
            }
            {(item?.post_category?.id == 1 || item?.post_category?.id == 3) ?
              <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <RenderHtml
                  style={{ marginVertical: 10 }}
                  source={{ html: item?.content }}
                /></View> :
              <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={[styles.postDescription, { marginBottom: textShown ? 0 : 0 }]} >
                {item?.content}
              </Text>
            }

            {/* {showMoreButton ? ( */}
            {item?.anonymous_flag != 1 &&
              <Text onPress={toggleTextShown} style={[styles.postDescription, { color: theme.SECONDARY }]}>
                {textShown ? '' : 'See More'}
              </Text>}
            {/* ) : null} */}


            {item?.parent_post != null && item?.parent_post?.length > 0 && item?.parent_post?.map((itemA) => {
              return (
                <>
                  <View style={[styles.lineVW, { marginHorizontal: 0 }]} />
                  <Pressable style={{ flexDirection: "row", paddingHorizontal: 25, paddingVertical: 8 }} onPress={() => {
                    props.navigation.push('Zen.CommunityComment', {
                      id: itemA.id, item: itemA,
                      updateSupport: props?.route?.params?.updateSupoort,
                      updateComment: props?.route?.params?.updateComment,
                      handleReport: props?.route?.params?.handleReport,
                      updateBookMark: props?.route?.params.updateBookMark,
                      isBack: false
                    })
                  }}>
                    <Text style={[styles.cancerTypeText, { color: theme.GRAY_BLACK, width: '91%' }]}>{itemA?.content?.substring(0, 100)}</Text>
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-end' }}>
                      <Right_Grey />
                    </View>
                  </Pressable>
                </>
              )
            })}
            {/* <View style={[styles.lineVW, { marginHorizontal: 0 }]} />
            <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 8 }}>
              <Text style={styles.cancerTypeText}>More Cancer Type</Text>
              <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
              <Right />
              </View>
            </TouchableOpacity>
            <View style={[styles.lineVW, { marginHorizontal: 0, marginBottom: 10 }]} /> */}


            {textShown && item?.author_detail?.user_details.length > 0 && item?.author_detail?.user_details[0].summary != null &&
              item?.author_detail?.user_details[0].summary.length > 0 && item?.anonymous_flag != 1 &&
              <View>
                <View style={[styles.lineVW, { marginTop: 0 }]} />
                <Text style={[styles.postDescription, { marginTop: 5 }]} >{translate("COMMONTEXT")["ABOUT"]} {item?.author_detail?.user_details.length > 0 ? item?.author_detail?.user_details[0].name : ''}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30 }}>
                  <Text style={styles.detailTxt}>{item?.author_detail?.user_details.length > 0 ? item?.author_detail?.user_details[0].summary : ''}</Text>
                </View>
              </View>}
            {/* <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 30 }}>
             <Text style={[styles.cancerType, { backgroundColor: item?.post_subcategory?.post_sub_category_tags[0]?.color }]}>{item?.post_subcategory?.post_sub_category_tags[0]?.name}</Text>
           </View> */}
            {/* {item?.image != null && item.image.length > 0 &&
              <Pressable style={styles.imageView} onPress={() => setImageModal(true)}>
                <Image style={[styles.img, {height: height}]} source={{ uri: item?.image }} />
              </Pressable>
            } */}
            {item?.post_images.length > 0 &&
              <View>
                <View style={styles.counterVw} >
                  <Text style={styles.countText} >{`${activeIndex + 1} / ${item?.post_images.length}`}</Text>
                </View>
                <Carousel
                  layout={"default"}
                  data={item?.post_images}
                  renderItem={renderItem}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  activeSlideAlignment={'center'}
                  activeAnimationType={'spring'}
                  activeAnimationOptions={{
                    bounciness: 1,
                    speed: 1
                  }}
                  onSnapToItem={(index) => {
                    setActiveIndex(index)
                  }}
                />
              </View>}
            <View style={[styles.utilityView, { paddingVertical: 5 }]}>
              <Pressable style={[styles.utility]} onPress={() => apiCallForUpdateSupport()}>
                {item?.cancer_healing_story_supports?.length != undefined && item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1
                  ? <Support /> : <Support1 />}
                <Text style={styles.utilityText}>{item?.support_count == 0 || item?.support_count == null ? '' :item.support_count}{' '}{translate("COMMONTEXT")["SUPPORTS"]}</Text>
                {/* <Image source={item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1 ? favImg : notFavImg} style={[styles.imgStyle, { marginLeft: 0 }]} /> */}
                {/* <Text style={styles.utilityText}>{item?.support_count != null ? item.support_count : '0'} {translate("COMMONTEXT")["SUPPORTS"]}</Text> */}
              </Pressable>
              <Pressable style={styles.utility} onPress={() => {
                if (userData?.user_profile?.id >= item?.post_category?.whoComment) {
                  ref.current.focus()
                }
              }}>
                {/* <Image source={require('../../../assets/images/comment.png')} style={styles.imgStyle} /> */}
                <Comment />
                <Text style={styles.utilityText}>{item?.comments_count == 0 || item?.comments_count == null ? '' :item.comments_count}{' '}{translate("COMMONTEXT")["COMMENT"]}</Text>
                {/* <Text style={styles.utilityText}>{item?.comments_count != null ? item.comments_count : '0'} {translate("COMMONTEXT")["COMMENT"]}</Text> */}
              </Pressable>
              <Pressable style={[styles.utility]} onPress={onShare} >
                {/* <Image source={require('../../../assets/images/share.png')} style={styles.imgStyle} /> */}
                <Share1 />
                <Text style={styles.utilityText}>{item?.view_count != null ? item.view_count : '0'} {translate("COMMONTEXT")["VIEWS"]}</Text>
              </Pressable>
            </View>
            <View style={styles.lineVW} />
     </View>
  )}              

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      {/* <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} /> */}
      {/* <ContentLoader
        containerStyles={{ marginTop: 50 }}
        loading={loader}
        avatar
        pRows={7}
        pHeight={[200, 50, 100, 50, 50]}
        pWidth={[defaultWidth - 100, defaultWidth - 100, defaultWidth - 100, defaultWidth - 100, defaultWidth - 100]}
      /> */}
      {!loader &&
        <View style={styles.header}>
          <Pressable onPress={() => { item?.anonymous_flag != 1 && openProfileScreen() }}>
            <Image style={styles.icon} source={item?.anonymous_flag == 1 || item?.author_detail?.user_details[0]?.image == null ? require('../../../assets/images/profileImage.png') : { uri: item?.author_detail?.user_details[0]?.image }} />
          </Pressable>
          {item?.anonymous_flag != 1 ?
            <Pressable style={styles.headerTextVw} onPress={() => openProfileScreen()}>
              <Text style={styles.headerText} numberOfLines={1}>{item?.author_detail?.user_details.length > 0 ? item?.author_detail?.user_details[0].name : ''}</Text>
              {shortNameFunc(
                    item?.author_detail?.user_details.length > 0 ?
                        item?.author_detail?.user_details[0] : undefined
                ).length > 0 &&
                <Text style={styles.disText} numberOfLines={1}>
                {shortNameFunc(
                    item?.author_detail?.user_details.length > 0 ?
                        item?.author_detail?.user_details[0] : undefined
                )}
              </Text>}
              <View style={styles.topicView}>
                    <Image style={styles.topicIcon} source={require('../../../assets/images/home/Healing_stories.png')} />
                    <Text style={styles.topicTxt}>{item?.post_category?.name}</Text>                   
                </View>
                {/* <View style={{flexDirection:'row', alignItems:"center", marginTop: item?.author_detail?.user_details[0]. chj_health_status == null ? -15 : 0 }}>
                <Image style={styles.topicIcon} source={require('../../../assets/images/home/Healing_stories.png')} />
                <Text style={styles.disText}>{item.post_category.name}</Text>
              </View> */}
            </Pressable> :
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.headerText} numberOfLines={1}>{translate("CREATE_POST")["Anonymous"]}</Text>
            </View>
          }
          <Pressable onPress={() => { navigateBack() }} style={{ position: "absolute", left: 10 }}>
            <Back width={8} height={15} style={{ margin: 15 }} />
          </Pressable>
          <View style={styles.moreImageView}>
            {pin && <Pressable style={{ marginRight: 35 }} onPress={() => {
              onPressPin(item)
              setIsPin(!pin);
            }} >
              <Image style={styles.pinImage} source={require('../../../assets/images/pin.png')} />
            </Pressable>}
            <Pressable style={{ marginRight: 23, height: 20, width: 35, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
              onPressBookMark()
              {!bookmark ?
                Toast.show({
                  text1: 'Success',
                  text2: 'Bookmark added successfully'
                })
              : Toast.show({
                  text1: 'Success',
                  text2: 'Bookmark removed successfully'
                })
              }
            }}>
              {/* <Image style={{ resizeMode: "contain", width: 18, height: 18 }} source={bookmark ? require('../../../assets/images/bookmark1.png') : require('../../../assets/images/bookmark.png')} /> */}
              {bookmark ? <Bookmark /> : <Bookmark1 />}
            </Pressable>
            <View style={styles.menuContainer}>
              {postOption()}
            </View>
          </View>
        </View>}

      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}  >
       
          
            
            {/* <View style={styles.utilityView}>
              <Pressable style={[styles.utility]} onPress={() => apiCallForUpdateSupport()}>
                <Image source={item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1 ? favImg : notFavImg} style={[styles.imgStyle, { marginLeft: 0 }]} />
                <Text style={styles.utilityText}>{translate("COMMONTEXT")["SUPPORT"]}</Text>
              </Pressable>
              <Pressable style={styles.utility} onPress={() => ref.current.focus()}>
                <Image source={require('../../../assets/images/comment.png')} style={styles.imgStyle} />
                <Text style={styles.utilityText}>{translate("COMMONTEXT")["COMMENT"]}</Text>
              </Pressable>
              <Pressable style={[styles.utility]} onPress={onShare} >
                <Image source={require('../../../assets/images/share.png')} style={styles.imgStyle} />
                <Text style={styles.utilityText}>{translate("COMMONTEXT")["SHARE"]}</Text>
              </Pressable>
            </View> */}
            {/* <View style={styles.lineVW} /> */}
            {/* {item.cancer_healing_story_comments.length > 3 &&
             <Pressable style={{ marginVertical: 10, marginHorizontal: 20 }}>
           <Text style={styles.previewCommentTxt}>{translate("COMMONTEXT")["VIEW_PRE_COMMENT"]}</Text>
         </Pressable> } */}
         <View style={{flex:1}}>
            {isLoader &&
              <ActivityIndicator size="small" color="#0000ff" />}
             <FlatList
             ref={flatlistRef}
             ListHeaderComponent={header()}
          data={comments}
          renderItem={RenderComment}
          onEndReached={() => {
            if (loadeMore) {
              apiCallForGetDetail(page)
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
       </View>
         


        {selectedImage != undefined &&
          <View>
            <Image source={{ uri: selectedImage?.path }} style={styles.selectedImage} />
            <Pressable style={styles.closeImageVw} onPress={() => {
              setSelectedImage(undefined)
            }}>
              <Image source={require('../../../assets/images/close.png')} style={styles.closeImage} />
            </Pressable>
          </View>}

        {/* Write here */}
        {(!loader && userData?.user_profile?.id >= item?.post_category?.whoComment) ?
          <View style={styles.writeHereContainer}>
            <View style={styles.writeVw}>
              <Image style={styles.commentIcon} source={userData?.data?.image == null ? require('../../../assets/images/profileImage.png') : { uri: userData?.data?.image }} />
              <View style={[{ paddingLeft: 10, width: '75%' }, tagName.length <= 0 && { flexDirection: 'row' }]} >
                <Text style={[styles.tagName, tagName.length > 0 && { width: '98%' }]} numberOfLines={1} >{tagName}</Text>
                <TextInput ref={ref} value={commentTxt} onChangeText={text => setCommentTxt(text)} placeholder={translate("COMMONTEXT")["WRITE_HERE"]} style={[styles.wrtHr, tagName.length > 0 && { marginTop: Platform.OS === 'ios' ? 0 : -10 }]} multiline={true} />
              </View>

              <View style={styles.cameraGalleryContainer}>
                <Pressable onPress={() => openGallery()} style={styles.cameraGalleryVw}>
                  <Image source={require('../../../assets/images/picture.png')} style={[styles.cameraGalleryIcon, { marginRight: 0, marginTop: 2 }]} />
                </Pressable>
                <Pressable onPress={() => openCamera()} style={styles.cameraGalleryVw}>
                  <Image source={require('../../../assets/images/camera.png')} style={styles.cameraGalleryIcon} />
                </Pressable>
              </View>
            </View>
            <TouchableOpacity style={{ margin: 5 }} onPress={() => {
              if (userData == undefined || Object.keys(userData).length == 0) {
                // props.navigation.navigate('Zen.Summary')
                props.navigation.navigate('Zen.UserOnBoarding')
              } else {
                !isEdit ? apiCallForAddComment() : apiCallEditComment()
              }
              { commentTxt.length > 0 && Toast.show({ text1: 'Successful' });}
            }}>
              <Text style={styles.postText}>{translate("CREATE_POST")["Post"]}</Text>
            </TouchableOpacity>
          </View> : (
            <View style={styles.commentVw}>
              <Text style={styles.commentTitle}>Only Zen Cancer Experts can comment</Text>
            </View>
          )}
      </KeyboardAvoidingView>
     <FullScreenImage
                    mediaArr={mediaArr} 
                    theme={theme} modalDisplay={imageModal} setModalDisplay={setImageModal}
                    // image={item?.image}
                    index={modalIndex}
                    // image={modalImage}
                />
      <ReportOption
        isVisible={visibleReport}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisibleReport}
        handleReport={() => {
          props?.route?.params?.handleReport(item)
          setTimeout(() => {
            navigateBack()
          }, 300)
        }}
        item={item}
        actions={props.actions}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);