import actionTypes from '../store/actions/types';

export const apiCallForUpdateSupport = (action, item, valueChange, setValueChange, userId) => {
    updateSupoort(item, valueChange, setValueChange)
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "update",
      formData: {
        userId: userId,
        cancerHealingStoryId: item.id
      },
    }
    action.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
}
 export const updateSupoort = (item, valueChange, setValueChange) => {
    if (item.cancer_healing_story_supports.length > 0){
        if (item.cancer_healing_story_supports.length > 0 && item.cancer_healing_story_supports[0].status == 1) {
          item.cancer_healing_story_supports[0].status = 0
          let count = item.support_count - 1
          item.support_count = count > 0 ? count : 0
        } else {
          item.cancer_healing_story_supports[0].status = 1
          let count = item.support_count + 1
          item
            .support_count = count
        }
      }else {
        item.cancer_healing_story_supports = [{status: 1}]
          let count = item.support_count + 1
          item
            .support_count = count
      }
    setValueChange(!valueChange)
 }
 export const onClickHeart = (actions, comment: any, item: any, userId, valueChange, setValueChange) => {
    var inputRequest = {
      module: "cancerHealingStorySupport",
      action: "support_to_comments",
      formData: {
        userId: userId,
        cancerHealingStoryCommentId: comment.id,
        cancerHealingStoryId: item.id
      }
    }
    actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)

    updateCommentSupport(comment, valueChange, setValueChange)
  }
  const updateCommentSupport = (comment: any,valueChange, setValueChange) => {
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
  export const addComments = (actions, formData: FormData, item: any, setItem) => {
    setItem(item)
    var inputRequest = {
      module: "cancerHealingStoryComment",
      action: "create",
      formData: formData
    }
    actions.addComments(actionTypes.ADD_COMMENTS, inputRequest)
   }
   export const openUserProfileScreen = (item: any, navigation, theme, onRefresh) => {
    navigation.navigate('Zen.ProfileScreen', {
      item: item,
      showDay: true, theme: theme,
      updateSupport: updateSupoort,onRefresh: onRefresh
    });
  }
  export const apiCallDeletePost = (actions, item: any, communityList, setCommuityList, valueChange,setValueChange, isBookmark = false) => {
    actions.deletePost(actionTypes.DELETE_POST, {
      module: 'cancerHealingStory',
      action: 'remove',
      formData: {
        "id": item.id
      }
    });
    handleReport(item, communityList, setCommuityList,valueChange, setValueChange, isBookmark);
   }
  export const handleReport = (reportItem: any, communityList, setCommuityList,valueChange, setValueChange, isBookmark) => {
    let newCommunityList = []
    if(isBookmark){
      newCommunityList = communityList?.filter((item) => item?.cancer_healing_story?.id !== reportItem.id);
    } else {
      newCommunityList = communityList?.filter((item) => item.id !== reportItem.id);
    }
    setCommuityList(newCommunityList);
    setValueChange(!valueChange);
  }
  export const apiCallReportList = (actions, item: any, communityList, setCommuityList, valueChange,setValueChange, userId, isBookmark = false) => {
    handleReport(item, communityList, setCommuityList,valueChange, setValueChange, isBookmark);
    actions.reportList(actionTypes.POST_REPORT_LIST_STORY, {
      module: 'cancer_healing_story_report',
      action: 'create',
      formData: {
        "userId": userId,
        "author": item.author_detail.id,
        "cancerHealingStoryId": item.id,
        "remarks": "Post hidden by user"
      }
    });
  }
  export const apiCallMarkAsSpamList = (actions, item: any, communityList, setCommuityList, valueChange,setValueChange, userId, isBookmark = false) => {
    handleReport(item, communityList, setCommuityList,valueChange, setValueChange, isBookmark);
    actions.markAsSpamList(actionTypes.POST_MARK_AS_SPAM_STORY, {
      module: 'cancerHealingStory',
      action: 'report_spam',
      formData: {
        "userId": userId,
        "cancer_healing_story_id": item.id,
      }
    });
  }
  export const updateComment = (item, type, id, valueChange, setValueChange) => {
    if (type == 0 && item.cancer_healing_story_comments.length > 0) {
      let filterData = item.cancer_healing_story_comments.filter(item => item.id != id)
      item.cancer_healing_story_comments = filterData
    }

    let count = 0
    if(type == 1){
      count = item.comments_count + 1
    } else {
      count = item.comments_count - 1
    }
    item.comments_count = count
    setValueChange(!valueChange)
  }
  export const onPressBookMark = (actions, item: any, valueChange, setValueChange, userId) => {
    var inputRequest = {
      module: "cancerHealingStory",
      action: "updateBookmark",
      formData: {
        userId: userId,
        cancerHealingStoryId: item.id
      }
    }
    actions.updateBookmark(actionTypes.UPDATE_BOOKMARK, inputRequest);
    updateBookMark(item,valueChange,setValueChange, userId) 
  }
  const updateBookMark = (item: any, valueChange, setValueChange, userId) => {
    // communityList.map((itemA: any) => {
    //   if (itemA.id == item.id) {
        if (item.cancer_healing_story_bookmarks.length > 0) {
          item.cancer_healing_story_bookmarks = []
        } else {
          item.cancer_healing_story_bookmarks = [{ userId: userId }]
        }
    //   }
    // })
    //setCommuityList([...communityList])
    setValueChange(!valueChange)
  }