/**
 * import all files and screens
 */

 import {connect} from 'react-redux';
 import {callFetchDetails} from '../store/actions/onboardingActions';
 import {registerEvent } from '../store/actions/eventAction';
 import {
   loader,
   getDiscover,
   getStoriesById,
   getRecentStories,
   getStoriesAll,
   addSupport,
   updateBookmark,
   getMenuList,
   getCommunityGroupListData,
   getCommunityByIdListAllData,
   getCommunityListAllData,
   getCommunityCategoryListData,
   getCommunityListData,
   getCommunityByIdListData,
   addComments,
   addCommentsData,
   deletePost,
   reportList,
   markAsSpamList,
   reportOption,
   getNotification,
   getNotificationRead,
   joinGroup
 } from '../store/actions/storiesActions';
 import { getCalendar,creatStreak } from '../store/actions/calendarAction';
 import {getCoachChatId} from '../store/actions/chatAction'
 import {chcekFlow} from '../store/actions/dietPlanActions';
 import {loggedIn, otpData} from '../store/actions/loginActions';
 import {postRpm} from
 '../store/actions/rpmAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import {bindActionCreators} from 'redux';
import { allHome } from '../store/actions/homeAction';
 const Home: any = ConfigFn.getPluginFile('Home');
 
 /**
  * changes done (state into props)
  */
 const mapStateToProps = () => {
   return {};
 };
 
 /**
  * dispatch actions
  */
 const mapDispatchToProps = (dispatch: any) => {
   const home: any = {
     actions: {
       loader: bindActionCreators(loader, dispatch), 
       callFetchDetails: bindActionCreators(callFetchDetails, dispatch),
       getDiscover: bindActionCreators(getDiscover, dispatch),
       getRecentStories: bindActionCreators(getRecentStories, dispatch),
       getStoriesAll: bindActionCreators(getStoriesAll, dispatch),
       addSupport: bindActionCreators(addSupport, dispatch),
       updateBookmark: bindActionCreators(updateBookmark, dispatch),
       loggedIn: bindActionCreators(loggedIn, dispatch),
       otpData: bindActionCreators(otpData, dispatch),
       getStoriesById: bindActionCreators(getStoriesById, dispatch),
       chcekFlow: bindActionCreators(chcekFlow, dispatch),
       getMenuList: bindActionCreators(getMenuList, dispatch),
       getCommunityGroupListData: bindActionCreators(getCommunityGroupListData, dispatch),
       allHome: bindActionCreators(allHome, dispatch),
       getCalendar: bindActionCreators(getCalendar, dispatch),
       getCommunityCategoryListData: bindActionCreators(getCommunityCategoryListData, dispatch),
       getCommunityListAllData: bindActionCreators(getCommunityListAllData, dispatch),
       getCommunityByIdListAllData: bindActionCreators(getCommunityByIdListAllData, dispatch),
       getCommunityListData: bindActionCreators(getCommunityListData, dispatch),
       getCommunityByIdListData: bindActionCreators(getCommunityByIdListData, dispatch),
       addComments: bindActionCreators(addComments, dispatch),
       addCommentsData: bindActionCreators(addCommentsData, dispatch),
       deletePost: bindActionCreators(deletePost, dispatch),
       markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
       reportList: bindActionCreators(reportList, dispatch),
       creatStreak: bindActionCreators(creatStreak, dispatch),
       registerEvent: bindActionCreators(registerEvent, dispatch),
       postRpm: bindActionCreators(postRpm, dispatch),
       reportOption: bindActionCreators(reportOption, dispatch),
       getNotification: bindActionCreators(getNotification, dispatch),
       getNotificationRead: bindActionCreators(getNotificationRead, dispatch),
       joinGroup: bindActionCreators(joinGroup, dispatch),
       getCoachChatId: bindActionCreators(getCoachChatId, dispatch),
     },
   };
   return home;
 };
 
 /**
  * connect state and action
  */
 const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
 export default HomeContainer;
 