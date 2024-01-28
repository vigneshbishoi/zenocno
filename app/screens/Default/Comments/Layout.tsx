/**
 * Comments layout page
 * @Author: Anand R
 * @Date: Tue Dec 07 2021 13:49:47 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState, useEffect, useRef } from 'react';
import style from './Style';
import { View, Pressable, Image, ScrollView, TextInput, Keyboard, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux"
import actionTypes from "../../../store/actions/types"
import moment from 'moment';
import { setTheme } from 'colors';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get("window")

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
}

const Header = ({ theme, navigation, commentsLength, replyMode, setReplyMode }: any) => {
  const styles = style(theme);

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => replyMode ? setReplyMode(false) : navigation.pop()}>
        <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
      </Pressable>
      <Text style={styles.headerTitle}>Comments ({commentsLength})</Text>
      <View></View>
    </View>
  );
}

const Comment = ({ theme, setCurrCmt, supported, storyId, userId, actions, showStat, data, component, onScreenComments, setOnScreenComments, replyMode, setReplyMode, setCommentId, textBox, scrollRef }: any) => {
  const styles = style(theme);

  const name = data?.user?.user_details
  //for comments time
  const commentPostedTime = moment(data?.updatedAt);
  const currentTime = moment();
  const differenceInMinutes = Math.floor(moment.duration(currentTime.diff(commentPostedTime)).asMinutes());
  const differenceInHours = Math.floor(moment.duration(currentTime.diff(commentPostedTime)).asHours());
  const differenceInDays = Math.floor(moment.duration(currentTime.diff(commentPostedTime)).asDays());
  const postedDate = moment(commentPostedTime).format('DD/MMM/YYYY');
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState({} as { [k: number]: any });
  useEffect(() => {
    checkIfSupported()
  }, [data, userId])

  const scrollHandler = (scrollToIndex: any) => {
    setTimeout(() => {

      if (Object.keys(dataSourceCords).length > scrollToIndex) {
        scrollRef.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      } else {
        // alert('Out of Max Index');
      }
    },
      500);

  };

  let postedAgo = "0";
  if (differenceInMinutes < 60) {
    if (differenceInMinutes <= 0) {
      postedAgo = "0 min ago"
    }
    else if (differenceInMinutes == 1) {
      postedAgo = "1 min ago"
    }
    else {
      postedAgo = differenceInMinutes.toString() + " mins ago";
    }
  } else if (differenceInMinutes >= 60 && differenceInHours < 24) {
    postedAgo = differenceInHours.toString() + " hrs ago";
  } else if (differenceInHours >= 24 && differenceInDays < 7) {
    postedAgo = differenceInDays.toString() + " days ago";
  } else {
    postedAgo = postedDate;
  }

  const [supportCount, setSuppotCount] = useState(data?.cancer_healing_story_supports.length)
  const [isHearted, setIsHearted] = useState(false);
  const checkIfSupported = () => {
    if (data && data?.cancer_healing_story_supports?.length > 0) {
      for (let i = 0; i < data?.cancer_healing_story_supports?.length; i++) {
        if (userId == data?.cancer_healing_story_supports[i].userId) {
          setIsHearted(true)
        } else {
          setIsHearted(false);
        }
      }
    } else {
      setIsHearted(false);
    }
  }


  const onClickHeart = () => {
    setIsHearted(!isHearted)
    isHearted ? setSuppotCount(supportCount - 1) : setSuppotCount(supportCount + 1)
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "support_to_comments",
      formData: {
        userId: userId,
        cancerHealingStoryCommentId: data.id,
        cancerHealingStoryId: storyId
      }
    }
    actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
  }

  const onClickComment = (id: any) => {

    setScrollToIndex(id)
    textBox();

    // open comment screen
    setCommentId(id)
    setCurrCmt(id)
    console.log(id, "id")
    const updatedCommentsList = Object.keys(onScreenComments)?.filter((comment: any) => comment.id === id);
    setOnScreenComments(updatedCommentsList);
    setReplyMode(true);
    scrollHandler(id)
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null}>
      <View style={[styles.commentContainer, { padding: 3, borderRadius: 20, borderWidth: .1, borderColor: '#ebebeb', backgroundColor: '#ebebeb', }]}
        key={data.id}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[data.id] = layout.y;
          setDataSourceCords({ ...dataSourceCords, [data.id]: layout.y });

        }}>
        {/* Profile photo */}
        <Image
          style={styles.profileIcon}
          source={require('../../../assets/images/coach.png')}
        />
        {/* Comment section */}
        <View style={styles.textContainer}>
          {/* Username */}
          <Text style={styles.userNameText}>{name && name.length > 0 ? name[name.length - 1].name : "Unknown"}</Text>
          {/* Comment */}
          <Text style={styles.commentText}>{data.comment} </Text>
          {/* Comment info */}
          <View style={styles.commentInfoContainer}>
            <Text style={styles.commentInfoText}>{postedAgo}</Text>
            {showStat && <Text style={styles.commentInfoText}>{supportCount} Support </Text>}
            {showStat && <Text style={styles.commentInfoText}>{data?.comment_reply && data.comment_reply.length} Reply</Text>}
          </View>
          {/* Support and comment buttons */}
          {showStat &&
            <View style={styles.commentBtnContainer}>
              <Pressable onPress={() => onClickHeart()} style={styles.iconBtnContainer}>
                <AntDesign style={styles.icon} name={isHearted ? "heart" : "hearto"} color={isHearted ? theme.RED : theme.DARK_GRAY} size={14} />
                <Text style={[styles.iconText, isHearted && { color: theme.DARK_GRAY }]}>Support</Text>
              </Pressable>
              <Pressable onPress={() => onClickComment(data.id)} style={styles.iconBtnContainer}>
                <IonIcon style={styles.icon} name="md-chatbubble-outline" size={14} color={theme.DARK_GRAY} />
                <Text style={styles.iconText}>Reply</Text>
              </Pressable>
            </View>
          }
        </View>
      </View>

      {component ? component : null}
    </KeyboardAvoidingView>

  );
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const [comment, setComment] = useState("");
  const { comments, support, storyId, commentsLength, setCommentsLength } = props.route.params

  const [onScreenComments, setOnScreenComments] = useState(comments);
  const [replyMode, setReplyMode] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(0);
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userName = useSelector(state => state.onboardingReducer.userDetails?.data?.name)
  const textBoxRef = useRef();

  const [scrollRef, setRef] = useState();


  const [currCmt, setCurrCmt] = useState()
  const onChangeText = (inputText: string) => {
    setComment(inputText);
  }

  useEffect(() => {
    if (!replyMode) {
      setOnScreenComments(comments);
    }

  }, [replyMode]);


  const storiesData = useSelector(state => state.storiesReducer.storiesByIdData)
  var commentsData = storiesData?.length > 0 ? storiesData[0]?.data?.cancer_healing_story_comments : undefined
  const [commentId, setCommentId] = useState()

  const onSubmit = () => {
    Keyboard.dismiss()
    setReplyMode(false)
    setComment("");
    const formDataForParentComment = {
      userId: userId,
      comment: comment,
      cancerHealingStoryId: storyId
    };

    const formDataForReplyComment = {
      userId: userId,
      comment: comment,
      cancerHealingStoryId: storyId,
      cancerHealingStoryCommentId: commentId
    }

    var inputRequest = {
      module: "cancerHealingStoryComment",
      action: "create",
      formData: replyMode ? formDataForReplyComment : formDataForParentComment
    }
    // locally updating the value on state to display comment on screen
    const updatedComments = [...onScreenComments, {
      // id: 1,
      userId: userId,
      cancerHealingStoryCommentId: null,
      cancerHealingStoryId: storyId,
      comment: comment,
      status: 1,
      user: {
        id: userId,
        user_details: [
          {
            name: userName
          }
        ]
      },
      comment_reply: []
    }]
    setOnScreenComments(updatedComments);
    if (comment != "") {
      props.actions.addComments(actionTypes.ADD_COMMENTS, inputRequest)
    }
    // Calling getAll stories api to update comment data from backend
    var inputRequestAllStories = {
      module: "cancerHealingStory",
      action: "getById",
      formData: {
        id: storyId
      }
    }
    props.actions.getStoriesById(actionTypes.GET_STORIES_BY_ID, inputRequestAllStories);

    setTimeout(() => {

      setCommentsLength(commentsLength + 1);
    }, 10);
  }
  //focus on textinput 
  function textBox() {
    setTimeout(() => {
      textBoxRef.current.focus();
    }, 100);
  }
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
        {/* Header */}
        <Header theme={props.theme} commentsLength={commentsData?.length} navigation={props.navigation} replyMode={replyMode} setReplyMode={setReplyMode} />
        {/* Comments cards */}
        <ScrollView
          style={{ height: height * 0.75 }}
          ref={(ref: any) => {
            setRef(ref);
          }}>
          {
            !replyMode ? commentsData && commentsData?.map(item => (
              <View>
                <Comment setCurrCmt={setCurrCmt} supported={support} storyId={storyId} actions={props.actions} userId={userId} showStat={true} setCommentId={setCommentId} theme={props.theme} data={item} onScreenComments={onScreenComments} setOnScreenComments={setOnScreenComments} setReplyMode={setReplyMode} textBox={textBox} scrollRef={scrollRef} />
                {/* Replies */}
                <View style={{ marginLeft: 50 }}>
                  {
                    item.comment_reply ? item.comment_reply.map((item) => {
                      return (
                        <Comment showStat={false} theme={props.theme} data={item} textBox={textBox} scrollRef={scrollRef} />
                      )
                    }) : null
                  }
                </View>
              </View>
            )) : (
              commentsData && commentsData?.map((item) => {
                if (item.id == currCmt) {

                  return (<View>
                    <Comment setCurrCmt={setCurrCmt} supported={support} storyId={storyId} actions={props.actions} userId={userId} showStat={false} setCommentId={setCommentId} theme={props.theme} data={item} onScreenComments={onScreenComments} setOnScreenComments={setOnScreenComments} setReplyMode={setReplyMode} textBox={textBox} scrollRef={scrollRef} />
                    {/* Replies */}
                    <View style={{ marginLeft: 50 }}>
                      {
                        item.comment_reply ? item.comment_reply.map((item) => {
                          return (
                            <Comment showStat={false} theme={props.theme} data={item} textBox={textBox} scrollRef={scrollRef} />
                          )
                        }) : null
                      }
                    </View>
                  </View>)
                }
              })
            )
          }

        </ScrollView>
        {/* Comment input */}
        <View style={styles.textInputContainer}>
          <TextInput
            ref={textBoxRef}
            style={styles.textInput}
            onChangeText={inputText => onChangeText(inputText)}
            value={comment}
            placeholder={replyMode ? "Write a reply" : "Write a comment"}
            placeholderTextColor={props.theme.LIGHT_GRAY}
            blurOnSubmit={false}
          // showSoftInputOnFocus={false}
          />
          <Pressable onPress={() => { onSubmit() }}>

            <Image
              style={styles.sendIcon}
              source={require('../../../assets/images/send.png')}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};
export default withTheme(Layout);
