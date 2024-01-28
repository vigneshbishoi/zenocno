import actionTypes from '../actions/types';

import {
  IStoriesRequestState,
  IStoriesResponseState,
} from '../../models/actions/stories';

import { IStoriesState } from '../../models/reducers/stories';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
import { State } from 'react-native-gesture-handler';
import { act } from 'react-test-renderer';
import { ISearchState } from '../../models/reducers/onboarding';

const initialState: IStoriesState = {
  data: {},
};

export const storiesReducer = createReducer(initialState, {
  [actionTypes.LOADER](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: action.data,
    };
  },

  //for all stories
  [actionTypes.GET_STORIES_ALL](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_STORIES_ALL_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  //for recent stories
  [actionTypes.GET_RECENT_STORIES](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_RECENT_STORIES_DATA](state: ISearchState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  //for stories by story id
  [actionTypes.GET_STORIES_BY_ID](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_STORIES_BY_ID_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  //for stories by user id
  [actionTypes.GET_STORIES_BY_USER_ID](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_STORIES_BY_USER_ID_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  //for adding comments
  [actionTypes.ADD_COMMENTS](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.ADD_COMMENTS_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  //for getting comments by post id
  [actionTypes.GET_COMMENTS_BY_ID](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_COMMENTS_BY_ID_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  //for adding support
  [actionTypes.ADD_SUPPORT](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.ADD_SUPPORT_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  [actionTypes.UPDATE_BOOKMARK](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.UPDATE_BOOKMARK_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  //for getting discover
  [actionTypes.GET_DISCOVER](state: IStoriesState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.GET_DISCOVER_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  // for getting menu List data
  [actionTypes.GET_MENU_LIST](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_MENU_LIST', {
      action,
    });
    return { ...state };
  },
  [actionTypes.GET_MENU_LIST_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_MENU_LIST_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  [actionTypes.GET_DETAIL_MENU_ITEM](state: IStoriesState, action: any) {
    return { ...state };
  },
  [actionTypes.GET_DETAIL_MENU_ITEM_DATA](state: IStoriesState, action: any) {
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  // for getting FAQ List data
  [actionTypes.GET_FAQ_LIST_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_FAQ_LIST_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting Wellness category all data
  [actionTypes.GET_ALL_WELLNESS_CATEGORY](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_ALL_WELLNESS_CATEGORY', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_ALL_WELLNESS_CATEGORY_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_ALL_WELLNESS_CATEGORY_DATA', {
    //   action,
    // });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting Wellness category BY ID data
  [actionTypes.GET_ALL_WELLNESS_CATEGORY_BYID](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_ALL_WELLNESS_CATEGORY_BYID', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_ALL_WELLNESS_CATEGORY_BYID_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_ALL_WELLNESS_CATEGORY_BYID_DATA', {
    //   action,
    // });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  // for getting COMMUNITY List data
  [actionTypes.GET_COMMUNITY_LIST_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_COMMUNITY_LIST_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_COMMUNITY_LIST_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting COMMUNITY GROUP List data
  [actionTypes.GET_COMMUNITY_GROUP_LIST_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_COMMUNITY_GROUP_LIST_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_COMMUNITY_GROUP_LIST_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting COMMUNITY CATEGORY List data
  [actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_COMMUNITY_CATEGORY_LIST_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

   // for getting COMMUNITY CATEGORY List by Id data
   [actionTypes.GET_COMMUNITY_BYID_LIST_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_COMMUNITY_BYID_LIST_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_COMMUNITY_BYID_LIST_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting COMMUNITY DETAIL data
  [actionTypes.GET_COMMUNITY_DETAIL_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_COMMUNITY_DETAIL_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_COMMUNITY_DETAIL_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for getting GROUP DETAIL data
  [actionTypes.GET_GROUP_DETAIL_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_GROUP_DETAIL_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_GROUP_DETAIL_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for JOIN GROUP DETAIL data
  [actionTypes.POST_JOIN_GROUP](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.POST_JOIN_GROUP_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer POST_JOIN_GROUP_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },


  // for GROUP MEMBER data
  [actionTypes.GET_GROUP_MEMBERS_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_GROUP_MEMBERS_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_GROUP_MEMBERS_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for GROUP POST data
  [actionTypes.GET_GROUP_POSTS_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.GET_GROUP_POSTS_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer GET_GROUP_POSTS_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
  

  // for Filter POST data
  [actionTypes.FITER_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.FITER_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer FITER_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for profile POST data
  [actionTypes.PROFILE_POST](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.PROFILE_POST_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer PROFILE_POST_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for get Tag data
  [actionTypes.TAG_DATA](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.TAG_DATA_ALL](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer TAG_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for get Tag data
  [actionTypes.POST_CATEGORY](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.POST_CATEGORY_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer POST_CATEGORY_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for get Rules data
  [actionTypes.RULES_ALL](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.RULES_ALL_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer TAG_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for Add Summary data
  [actionTypes.SUMMARY](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.SUMMARY_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer TAG_DATA_ALL', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for Follow User data
  [actionTypes.FOLLOW_USER](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.FOLLOW_USER_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer FOLLOW_USER_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

  // for Leave Group
  [actionTypes.LEAVE_GROUP](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.LEAVE_GROUP_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer LEAVE_GROUP_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },

   // for Delete Comment
   [actionTypes.DELETE_COMMENT](state: IStoriesState, action: any) {
    // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
    //   action,
    // });
    return { ...state };
  },
  [actionTypes.DELETE_COMMENT_DATA](state: IStoriesState, action: any) {
    console.log('🚀 storiesReducer.ts ~ storiesReducer DELETE_COMMENT_DATA', {
      action,
    });
    return {
      ...state,
      [action.index]: [action.data],
    };
  },
     // for edit Comment
     [actionTypes.EDIT_COMMENT](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.EDIT_COMMENT_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer EDIT_COMMENT_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for Group Search
    [actionTypes.GROUP_SEARCH](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.GROUP_SEARCH_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer GROUP_SEARCH_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },


    // for Wellness Data
    [actionTypes.ALL_WELLNESS](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.ALL_WELLNESS_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer ALL_WELLNESS_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for Delete Post
    [actionTypes.DELETE_POST](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.DELETE_POST_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer DELETE_POST_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for MyBookmark
    [actionTypes.MY_BOOKMARK](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.MY_BOOKMARK_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer MY_BOOKMARK_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for blockUser
    [actionTypes.BLOCK_USER](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.BLOCK_USER_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer BLOCK_USER_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for report post options
    [actionTypes.REPORT_OPTIONS](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.REPORT_OPTIONS_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer BLOCK_USER_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    // for search data
    [actionTypes.POST_SEARCH](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.POST_SEARCH_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer BLOCK_USER_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

     // for search data
     [actionTypes.GET_POST_COMMENT](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.GET_POST_COMMENT_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer BLOCK_USER_DATA', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },
    
    // for Notification data
    [actionTypes.GET_NOTIFICATION](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.GET_NOTIFICATION_READ](state: IStoriesState, action: any) {
      // console.log('🚀 storiesReducer.ts ~ storiesReducer GET_FAQ_LIST_DATA', {
      //   action,
      // });
      return { ...state };
    },
    [actionTypes.GET_NOTIFICATION_DATA](state: IStoriesState, action: any) {
      console.log('🚀 storiesReducer.ts ~ storiesReducer BLOCK_USER_DATA Notification', {
        action,
      });
      return {
        ...state,
        [action.index]: [action.data],
      };
    },
});
