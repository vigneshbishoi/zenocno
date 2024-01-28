import actionTypes from './types';
import {IStoriesResponse} from '../../models/api/stories';
import {ObjectTypeAnnotation} from '@babel/types';
export function loader(index: string, data: boolean, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
//for getting all stories
export function getStoriesAll(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getStoriesAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for getting stories by story id
// export function getStoriesById(type: string, payload: any) {

//     return {
//         type,
//         payload
//     }
// }
export function getStoriesById(type: string, payload: any) {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: type,
        payload,
        resolve,
        reject,
      });
    });
  };
}

export function getStoriesByIdData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for getting stories by userId
export function getStoriesByUserId(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getStoriesByUserIdData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function getRecentStories(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getRecentStoriesData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}
//for adding comments
export function addComments(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function addCommentsData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for Reporting user comments
export function userReport(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function userReportData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for getting comments by id
export function getCommentsById(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getCommentsByIdData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for adding support
export function addSupport(type: string, payload: any) {
  console.log(payload, 'payload');
  return {
    type,
    payload,
  };
}

//for pinned group
export function pinGroup(type: string, payload: any) {
  console.log(payload, 'payload');
  return {
    type,
    payload,
  };
}

export function addSupportData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for getting discover data
export function getDiscover(type: string, payload: any) {
  console.log('getDiscover---', {type, payload});
  return {
    type,
    payload,
  };
}

export function getDiscoverData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for updating bookmark
export function updateBookmark(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

//for pinList
export function pinList(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

//for pinListData
export function pinListData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for unpinList
export function followList(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

//for pinListData
export function followListData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for reportList
export function reportList(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

//for reportListData
export function reportListData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

//for markAsSpamList
export function markAsSpamList(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

//for markAsSpamListData
export function markAsSpamListData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function updateBookmarkData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
export function getMenuList(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getMenuListData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getFaqListData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getFaqListAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getCommunityListData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getCommunityListAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getCommunityByIdListData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getCommunityByIdListAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getCommunityGroupListData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getCommunityGroupListAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function summary(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function summaryData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getCommunityCategoryListData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getCommunityCategoryListAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getRules(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getRulesData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getNotification(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getNotificationRead(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getNotificationData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getCommunityDetailData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getCommunityDetailAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function postFilterData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function postFilterDataAll(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getGroupDetailData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getGroupDetailAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getGroupMemberData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getGroupMemberAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getGroupPostData(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getGroupPostAllData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function pinGroupData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function joinGroup(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function joinGroupData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function profilePost(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function profilePostData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getWellnessCategory(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function getWellnessCategoryData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getWellnessCategoryByID(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getWellnessCategoryByIdData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getMenuItemByTable(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getMenuItemByTableData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function getTags(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getTagsData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function getPostCategory(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export function getPostCategoryData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function followUser(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function followUserData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function leaveGroup(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function leaveGroupData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function deleteComment(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function deleteCommentData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function editComment(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function editCommentData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function groupSearch(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function groupSearchData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function allWellness(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function allWellnessData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function deletePost(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function deletePostData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}


export function myBookmark(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function myBookmarkData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function blockUser(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function blockUserData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function reportOption(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function reportOptionData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function postSearch(type: string, payload: any) {
  console.log("123--")
  return {
    type,
    payload,
  };
}
export function postSearchData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}

export function postComemnt(type: string, payload: any) {
  return {
    type,
    payload,
  };
}
export function postComemntData(
  index: string,
  data: object,
  type: string,
) {
  return {
    type: type,
    index,
    data,
  };
}
export function likeWellness(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

