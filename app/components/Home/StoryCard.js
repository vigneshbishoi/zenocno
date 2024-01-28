
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, TouchableWithoutFeedback, Share, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons';
import style from '../../screens/Default/Stories/Style';
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const StoryCard = ({ theme, navigation, data, actions, hideInfo, id, title }) => {
  const styles = style(theme);
  const [supportCount, setSuppotCount] = useState(data?.cancer_healing_story_supports.length);
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const [isHearted, setIsHearted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0);

  async function buildLink() {
    const link = await dynamicLinks().buildLink({
      link: 'https://zenonco.io',
      domainUriPrefix: 'https://zenco.page.link',
      analytics: { campaign: data?.id.toString() },
    });

    return link;
  }

  useEffect(() => {
    checkIfBookmarked();
    checkIfSupported();
    setSuppotCount(data?.cancer_healing_story_supports.length);
    setCommentsLength(data?.cancer_healing_story_comments?.length);
  }, [data, userId]);


  const checkIfBookmarked = () => {
    if (data && data?.cancer_healing_story_bookmarks?.length > 0) {
      for (let i = 0; i < data?.cancer_healing_story_bookmarks?.length; i++) {
        if (userId == data?.cancer_healing_story_bookmarks[i].userId) {
          setIsBookmarked(true);
          break;
        } else {
          setIsBookmarked(false);
        }
      }
    } else {
      setIsHearted(false);
    }
  }

  const checkIfSupported = () => {
    if (data && data?.cancer_healing_story_supports?.length > 0) {
      for (let i = 0; i < data?.cancer_healing_story_supports?.length; i++) {
        if (userId == data?.cancer_healing_story_supports[i].userId) {
          setIsHearted(true);
          break;
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
        // "cancerHealingStoryCommentId": 1,
        cancerHealingStoryId: data.id
      }
    }
    actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest);
    actions.getStoriesAll(actionTypes.GET_STORIES_ALL, { module: "cancerHealingStory", action: "getAll" })
  }

  const onClickComment = () => {
    var inputRequestAllStories = {
      module: "cancerHealingStory",
      action: "getById",
      formData: {
        id: data.id
      }
    }
    actions.loader("loader", false, actionTypes.LOADER)
    actions.getStoriesById(actionTypes.GET_STORIES_BY_ID, inputRequestAllStories).then((res) => {
      navigation.navigate('Zen.Comments', { storyId: data.id, id: id, comments: data?.cancer_healing_story_comments, support: data?.cancer_healing_story_supports, commentsLength: commentsLength, setCommentsLength: setCommentsLength });
      actions.loader("loader", false, actionTypes.LOADER)
    });
    actions.getStoriesAll(actionTypes.GET_STORIES_ALL, { module: "cancerHealingStory", action: "getAll" });
  }

  const onClickShare = async () => {
    const DEEP_LINK = await buildLink();
    console.log("DEEP_LINK", DEEP_LINK)
    Share.share({ message: DEEP_LINK });
  }

  const onClickBookmark = () => {
    // checkIfBookmarked();
    setIsBookmarked(!isBookmarked);
    var inputRequest = {
      module: "cancerHealingStory",
      action: "updateBookmark",

      formData: {
        userId: userId,
        cancerHealingStoryId: data.id
      }
    }
    actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest);
    actions.getStoriesAll(actionTypes.GET_STORIES_ALL, { module: "cancerHealingStory", action: "getAll" })
  }

  const onOpenStory = () => {
    navigation.navigate('Zen.ViewStory', { title: title, data: data, isBookmarked, isHearted, setIsBookmarked, setIsHearted });
  }

  return (
    <View style={styles.cardContainer}>
      {/* Card Image */}
      <Pressable onPress={(data) => onOpenStory(data)}>
        <Image
          style={styles.cardImage}
          source={data?.image ? { uri: data?.image } : require('../../assets/images/cancer_surviror_stories_1.jpg')}
        />
      </Pressable>
      {/* Like, comments icons */}
      <View style={styles.iconsContainer}>
        {/* Heart, Comments Icons */}
        <View style={styles.flexRow}>
          <Pressable onPress={() => onClickHeart()}>
            <AntDesign style={styles.icon} name={isHearted ? "heart" : "hearto"} color={isHearted ? theme.RED : theme.DARK_GRAY} size={18} />
          </Pressable>
          <Pressable onPress={() => onClickComment()}>
            <IonIcon style={styles.icon} name="md-chatbubble-outline" size={18} color={theme.DARK_GRAY} />
          </Pressable>
          {Platform.OS != 'ios' &&
            <Pressable onPress={() => onClickShare()}>
              <AntDesign style={styles.icon} name="sharealt" color={theme.DARK_GRAY} size={18} />
            </Pressable>
          }
          <Pressable onPress={() => onClickBookmark()}>
            <IonIcon style={styles.icon} name={isBookmarked ? "bookmark" : "bookmark-outline"} size={18} color={theme.DARK_GRAY} />
          </Pressable>
        </View>
        {/* Suport and Comments count */}
        <View style={styles.flexRow}>
          <Text style={styles.commentLabel}>{supportCount} Support</Text>
          <Pressable onPress={() => onClickComment()}>
            <Text style={styles.commentLabel}>{commentsLength} Comments</Text>
          </Pressable>
        </View>
      </View>
      {/* Story Text */}
      <Text style={styles.storyText}>{data?.content.length <= 68 ? data?.content : data?.content.slice(0, 68) + "..."}
        <TouchableWithoutFeedback onPress={(data) => onOpenStory(data)}>
          <Text style={styles.readMoreText}>Read more</Text>
        </TouchableWithoutFeedback>
        {/* <Text>{data.id}</Text> */}
      </Text>
      {/**
       * Profile icon, name and date
       * this is hidden for Cancer healing stories on Home Screen
      */}
      {!hideInfo &&
        <View style={styles.bottomContainer}>
          <Image
            style={styles.profileIcon}
            source={require('../../assets/images/coach.png')}
          />
          <Text style={styles.nameText}>{data?.author_detail.user_details.length > 0 ? data.author_detail.user_details[0].name : "Unknown"}</Text>
          <Text style={styles.dateText}>{moment(data?.publish_date).format("DD MMMM, YYYY")}</Text>
        </View>
      }
    </View>
  );
}

export default StoryCard;