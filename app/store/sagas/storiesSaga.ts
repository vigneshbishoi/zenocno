import * as storiesActions from '../actions/storiesActions';
import actionTypes from '../actions/types';
import {Alert} from 'react-native';
import {put, call} from 'redux-saga/effects';
import axios from 'axios';
import {resolvePlugin} from '@babel/core';
import {storiesReducer} from '../reducers/storiesReducer';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getAllStoriesSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getStoriesAllData(
        'storiesAllData',
        response.data,
        actionTypes.GET_STORIES_ALL_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for getting stories by storyid
export function* getStoriesByIdSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getStoriesByIdData(
        'storiesByIdData',
        response.data,
        actionTypes.GET_STORIES_BY_ID_DATA,
      ),
    );
    payload.resolve(response.data);
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for getting stories by user id
export function* getStoriesByUserIdSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getStoriesByUserIdData(
        'storiesByUserIdData',
        response.data,
        actionTypes.GET_STORIES_BY_USER_ID_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for adding comment
export function* addCommentsSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.addCommentsData(
        'commentsData',
        response.data,
        actionTypes.ADD_COMMENTS_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for a getting comments based on id
export function* getCommentsByIdSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getCommentsByIdData(
        'commentsByIdData',
        response.data,
        actionTypes.GET_COMMENTS_BY_ID_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for adding suport
export function* addSupportSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    console.log("22222----", response)
    yield put(
      storiesActions.addSupportData(
        'supportData',
        response.data,
        actionTypes.ADD_SUPPORT_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for USer Report
export function* userReportSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.userReportData(
        'userReport',
        response.data,
        actionTypes.USER_REPORT_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

// for updating bookmark
export function* updateBookmarkSage(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.updateBookmarkData(
        'updateBookmark',
        response.data,
        actionTypes.UPDATE_BOOKMARK_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for adding discover
export function* getDiscoverSaga(service: any, payload: object): any {
  try {
    console.log('getDiscover Payload---', {payload});
    const response = yield call(service, payload);
    yield put(
      storiesActions.getDiscoverData(
        'discoverData',
        response.data,
        actionTypes.GET_DISCOVER_DATA,
      ),
    );
    // yield put(storiesActions.loader("loader", false, actionTypes.LOADER))
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for recent activities
export function* getRecentStoriesSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getRecentStoriesData(
        'recentStoriesData',
        response.data,
        actionTypes.GET_RECENT_STORIES_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getMenuListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);

    yield put(
      storiesActions.getFaqListAllData(
        'menuListData',
        response.data,
        actionTypes.GET_MENU_LIST_DATA,
      ),
    );
    // yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getFaqListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getFaqListAllData(
        'faqListData',
        response.data,
        actionTypes.GET_FAQ_LIST_DATA_ALL,
      ),
    );
    // yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getCommunityListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getCommunityListAllData(
        'communityListData',
        response.data,
        actionTypes.GET_COMMUNITY_LIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* addSummarySaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.summaryData(
        'summaryData',
        response.data,
        actionTypes.SUMMARY_DATA,
      ),
    );
  } catch (e: any) {
    console.log('Summary_error', e.message);
  }
}

export function* getCommunityByIdListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getCommunityByIdListAllData(
        'communityByIdListData',
        response.data,
        actionTypes.GET_COMMUNITY_BYID_LIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getRulesSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getRulesData(
        'RulesData',
        response.data,
        actionTypes.RULES_ALL_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getCommunityGroupListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getCommunityGroupListAllData(
        'communityGroupListData',
        response.data,
        actionTypes.GET_COMMUNITY_GROUP_LIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getCommunityGroupDetailDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getGroupDetailAllData(
        'groupDetailData',
        response.data,
        actionTypes.GET_GROUP_DETAIL_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getGroupMemberDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getGroupMemberAllData(
        'groupMemberData',
        response.data,
        actionTypes.GET_GROUP_MEMBERS_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getGroupPostDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getGroupPostAllData(
        'groupPostData',
        response.data,
        actionTypes.GET_GROUP_POSTS_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getCommunityCategoryListDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    response.data.data = [{"id": 0,
    "name": "All",
    "image": null,
    "status": 1
}, ...response.data.data]
    yield put(
      storiesActions.getCommunityCategoryListAllData(
        payload.payload.formData != undefined ? 'communityCategoryGroupListData' : 'communityCategoryListData',
        response.data,
        actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getCommunityDetailDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getCommunityDetailAllData(
        'communityDetailData',
        response.data,
        actionTypes.GET_COMMUNITY_DETAIL_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* joinGroupSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.joinGroupData(
        'joinGroup',
        response.data,
        actionTypes.POST_JOIN_GROUP_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* pinGroupSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.pinGroupData(
        'pinGroup',
        response.data,
        actionTypes.POST_PIN_GROUP_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* pinListSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.pinListData(
        'pinList',
        response.data,
        actionTypes.POST_PIN_STORY_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* followListSaga(service: any, payload: object): any {  
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.followListData(
        'followList',
        response.data,
        actionTypes.POST_FOLLOWLIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* ReportListSaga(service: any, payload: object): any {  
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.reportListData(
        'reportList',
        response.data,
        actionTypes.POST_REPORT_LIST_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* markAsSpamListSaga(service: any, payload: object): any {  
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.markAsSpamListData(
        'markAsSpamList',
        response.data,
        actionTypes.POST_MARK_AS_SPAM_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* postFilterDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.postFilterDataAll(
        'filterData',
        response.data,
        actionTypes.FITER_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* profilePostDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.profilePostData(
        'profilePost',
        response.data,
        actionTypes.PROFILE_POST_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getWellnessCategorySaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getWellnessCategoryData(
        'getAllWellnessCategory',
        response.data,
        actionTypes.GET_ALL_WELLNESS_CATEGORY_DATA,
      ),
    );
    // yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getWellnessCategoryByIDSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getWellnessCategoryByIdData(
        'getAllWellnessCategoryById',
        response.data,
        actionTypes.GET_ALL_WELLNESS_CATEGORY_BYID_DATA,
      ),
    );
    // yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getDetailMenuItemSaga(service: any, payload: object): any {
  try {
    yield put(storiesActions.loader('loader', true, actionTypes.LOADER));

    const response = yield call(service, payload);

    yield put(
      storiesActions.getMenuItemByTableData(
        'menuItemDetail',
        response.data,
        actionTypes.GET_DETAIL_MENU_ITEM_DATA,
      ),
    );
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  } catch (e: any) {
    console.log('error', e.message);
    yield put(storiesActions.loader('loader', false, actionTypes.LOADER));
  }
}

export function* getTagDataSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getTagsData(
        'tags',
        response.data,
        actionTypes.TAG_DATA_ALL,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getPostCategorySaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getPostCategoryData(
        'postCategory',
        response.data,
        actionTypes.POST_CATEGORY_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* followUserSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.followUserData(
        'followUser',
        response.data,
        actionTypes.FOLLOW_USER_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* leaveGroupSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.leaveGroupData(
        'leaveGroup',
        response.data,
        actionTypes.LEAVE_GROUP_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* deleteCommentSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.deleteCommentData(
        'deleteComment',
        response.data,
        actionTypes.DELETE_COMMENT_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* editCommentSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.editCommentData(
        'editComment',
        response,
        actionTypes.EDIT_COMMENT_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for group search Data
export function* callGroupSearchData(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.groupSearchData(
        'groupSearchData',
        response.data,
        actionTypes.GROUP_SEARCH_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for all wellness Data
export function* allWllnessSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.allWellnessData(
        'getAllWellnessCategoryById',
        response.data,
        actionTypes.ALL_WELLNESS_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for delete post
export function* deletePostSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.deletePostData(
        'deletePost',
        response.data,
        actionTypes.DELETE_POST_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for get mybookmark
export function* myBookmarkSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.myBookmarkData(
        'bookmarkPost',
        response.data,
        actionTypes.MY_BOOKMARK_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for block user
export function* blockUserSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.blockUserData(
        'userBlock',
        response.data,
        actionTypes.BLOCK_USER_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for report options
export function* reportOptionSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.reportOptionData(
        'reportOptions',
        response.data,
        actionTypes.REPORT_OPTIONS_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for search data
export function* postSearchSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.postSearchData(
        'postSearch',
        response.data,
        actionTypes.POST_SEARCH_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for post comment data
export function* getPostCommentSaga(service: any, payload: any): any {
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.postComemntData(
        'postComment',
        response.data,
        actionTypes.GET_POST_COMMENT_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for post comment data
export function* getNotificationSaga(service: any, payload: any): any {
  
  try {
    const response = yield call(service, payload);
    yield put(
      storiesActions.getNotificationData(
        'notification',
        response.data,
        actionTypes.GET_NOTIFICATION_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for like Wellness
export function* likeWellnessSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    console.log('RES LIKE WELLNESS -->', response);
    // yield put(dietPlanActions.likeFoodData("likeWellness", response.data, actionTypes.LIKE_FOOD_ALL))
  } catch (e: any) {
    console.log("WELLNESS Error", e)
  }
}
//for put notification read data
export function* getNotificationReadSaga(service: any, payload: any): any {
  
  try {
    const response = yield call(service, payload);
    // yield put(
    //   storiesActions.getNotificationData(
    //     'notification',
    //     response.data,
    //     actionTypes.GET_NOTIFICATION_DATA,
    //   ),
    // );
  } catch (e: any) {
    console.log('error', e.message);
  }
}
