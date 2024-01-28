import * as React from 'react';
import { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView

} from 'react-native';
import CancerPost from '../../components/Community/CancerPost';

const Activitypage = (props) => {
  const [valueChange, setValueChange] = useState(false)
  const { data, textShown, setTextShown, onPressBookMark, onDetailClick, onPressPin, onSupport, apiCallFollowList, apiCallMarkAsSpamList,
     apiCallReportList,setVisible, openProfileScreen, theme, onClickCommentHeart, apiCallDeletePost, addComments } = props
  const styles = stylesActivity(theme);

  const updateSupoort = (item) => {
    if (item?.cancer_healing_story_supports?.length > 0) {
      item.cancer_healing_story_supports = []
      let count = item.support_count - 1
      item.support_count = count > 0 ? count : 0
    } else {
      item.cancer_healing_story_supports = [{ userId: userId }]
      let count = item.support_count + 1
      item.support_count = count
    }
    setValueChange(!valueChange)
  }
  const updateViewCount = (item) => {
    if (item.view_count != null) {
      let count = item.view_count + 1
      item.view_count = count > 0 ? count : 0
    } else {
      item.view_count = 1
    }
    setValueChange(!valueChange)
  }
  const updateComment = (item, comment) => {
    if (item.cancer_healing_story_comments.length == 0) {
      item.cancer_healing_story_comments = [{
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
    }
    let count = item.comments_count + 1
    item.comments_count = count
    setValueChange(!valueChange)
  }

  return (
      // <ScrollView style={{height:1000, backgroundColor:theme.SELECTED,}} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
   <View style={{  height:'100%',backgroundColor:theme.SELECTED,}} > 
        {data.map(item => (
          <CancerPost
          topHeader={true}
          item={item}
          onPressBookMark={onPressBookMark}
          onPressPin={onPressPin}
          onSupport={onSupport}
          apiCallFollowList={apiCallFollowList}
          apiCallMarkAsSpamList={apiCallMarkAsSpamList}
          apiCallReportList={apiCallReportList}
          onClickCommentHeart={onClickCommentHeart}
          showDay={true}
          theme={theme}
          page={"Activity"}
          onPress={() => onDetailClick(item)}
          textShown={textShown}
          setTextShown={setTextShown}
          openProfileScreen={openProfileScreen}
          apiCallDeletePost={apiCallDeletePost}
          addComments={addComments}
          navigation={props.navigation}
          setVisible={setVisible}
        />
        ))}
       </View>  
//  </ScrollView>  
  );
}

const stylesActivity = (theme: any) => {


};
export default Activitypage;