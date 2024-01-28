/**
 * ViewStory layout page
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 15:37:31 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'

import Text from '../../../components/CustomText';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../../utils/Text"

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
  route: object;
}
const SingleStoryHeader = ({ theme, title, navigation }: any) => {
  const styles = style(theme);

  return (
    <View style={styles.headerContainer}>
      <View />
      <Text style={styles.headerTitle}>{title}</Text>
      <Pressable onPress={() => navigation.pop()}>
        <Text style={styles.closeBtn}>X</Text>
      </Pressable>
    </View>
  );
}
const SingleStory = ({ theme, id, title, navigation, actions, data, isBookmarked, isHearted, setIsBookmarked, setIsHearted }: any) => {
  const styles = style(theme);
  const [supportCount, setSuppotCount] = useState(0);
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const [commentsLength, setCommentsLength] = useState(0);
  const [localIsHearted, setLocalIsHearted] = useState(isHearted);
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked);
  const isFocused = useIsFocused();
  useEffect(() => {
    var inputRequestAllStories = {
      module: "cancerHealingStory",
      action: "getById",
      formData: {
        id: data?.id
      }
    }
    if (isFocused) {
      actions?.loader("loader", false, actionTypes.LOADER)
      actions?.getStoriesById(actionTypes.GET_STORIES_BY_ID, inputRequestAllStories);
    }
  }, [isFocused])
  const apiData = useSelector(state => state.storiesReducer.storiesByIdData)
  const onClickHeart = () => {
    setIsHearted(!isHearted)
    setLocalIsHearted(!localIsHearted);
    localIsHearted ? setSuppotCount(supportCount - 1) : setSuppotCount(supportCount + 1)
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "support_to_comments",
      formData: {
        userId: userId,
        cancerHealingStoryId: data?.id
      }
    }
    actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
  }

  const onClickComment = () => {
    var inputRequest = {
      module: "cancerHealingStory",
      action: "getById",
      formData: {
        id: data?.id
      }
    }
    actions.loader("loader", false, actionTypes.LOADER)
    actions.getStoriesById(actionTypes.GET_STORIES_BY_ID, inputRequest).then((res) => {
      navigation.navigate('Zen.Comments', { storyId: data.id, comments: data?.cancer_healing_story_comments, support: data?.cancer_healing_story_supports, commentsLength: commentsLength, setCommentsLength: setCommentsLength });
      actions.loader("loader", false, actionTypes.LOADER)
    });

  }

  const onClickShare = () => {
    // share options
  }

  const onClickBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setLocalIsBookmarked(!localIsBookmarked);
    var inputRequest = {
      module: "cancerHealingStory",
      action: "updateBookmark",

      formData: {
        userId: userId,
        cancerHealingStoryId: data.id
      }
    }
    actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest)
  }
  useEffect(() => {
    if (typeof (apiData) == "object") {
      var len = apiData[0]?.data?.cancer_healing_story_comments.length
      var suppLen = apiData[0]?.data?.cancer_healing_story_supports?.length

      setCommentsLength(len);
      setSuppotCount(suppLen)
    }
  }, [apiData, userId]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* To Do: Create a new header for single Story */}
        <SingleStoryHeader title={title} theme={theme} navigation={navigation} />
        <Image
          style={styles.storyIamge}
          source={data?.image ? { uri: data?.image } : require('../../../assets/images/cancer_surviror_stories_1.jpg')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.storyTitle}>{data?.title ? data?.title : "Title"}</Text>
          {/* <Text style={styles.subTitle}>{"Sub Title"}</Text> */}
          <Text style={styles.storyContent} >{data?.content ? data?.content : "Content"}</Text>
        </View>
      </ScrollView>
      <View style={styles.storyBottomContainer}>
        <Image
          style={styles.profileIcon}
          source={require('../../../assets/images/coach.png')}
        />
        <Text style={styles.nameText}>{data?.author_detail?.user_details.length > 0 ? data.author_detail.user_details[0].name : "Unknown"}</Text>
        <Text style={styles.dateText}>{moment(data?.publish_date).format("DD MMMM, YYYY")}</Text>
      </View>
      {/* Like, comments icons */}
      <View style={styles.storyIconsContainer}>
        {/* Heart, Comments Icons */}
        <View style={styles.flexRow}>
          <Pressable onPress={() => onClickHeart()}>
            <AntDesign style={styles.icon} name={localIsHearted ? "heart" : "hearto"} color={localIsHearted ? theme.RED : theme.DARK_GRAY} size={18} />
          </Pressable>
          <Pressable onPress={() => onClickComment()}>
            <IonIcon style={styles.icon} name="md-chatbubble-outline" size={18} color={theme.DARK_GRAY} />
          </Pressable>
          <Pressable onPress={() => onClickShare()}>
            <AntDesign style={styles.icon} name="sharealt" color={theme.DARK_GRAY} size={18} />
          </Pressable>
          <Pressable onPress={() => onClickBookmark()}>
            <IonIcon style={styles.icon} name={localIsBookmarked ? "bookmark" : "bookmark-outline"} size={18} color={theme.DARK_GRAY} />
          </Pressable>
        </View>
        {/* Suport and Comments count */}
        <View style={styles.flexRow}>
          <Text style={styles.commentLabel}>{supportCount} {translate("COMMONTEXT")["SUPPORT"]}</Text>
          <Pressable onPress={() => onClickComment()}>
            <Text style={styles.commentLabel}>{commentsLength} {translate("COMMONTEXT")["COMMENTS"]}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SingleStory theme={props.theme}
        title={props.route.params.title}
        navigation={props.navigation}
        actions={props.actions}
        data={props.route.params.data}
        isBookmarked={props.route.params.isBookmarked}
        isHearted={props.route.params.isHearted}
        setIsBookmarked={props.route.params.setIsBookmarked}
        setIsHearted={props.route.params.setIsHearted}
      />
    </SafeAreaView>

  )
};
export default withTheme(Layout);
