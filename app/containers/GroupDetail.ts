/**
 * Community Container
 * @Author: Astha
 * @Date: Thur Apr 14 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 import {
  getGroupDetailData,
  getCommunityCategoryListData,
  joinGroup,
  getGroupMemberData,
  getGroupPostData,
  addSupport,
  pinGroup,
  getCommunityGroupListData,
  updateBookmark,
  pinList,
  followList,
  markAsSpamList,
  reportList,
  leaveGroup,
  addComments,
  addCommentsData,
  getGroupDetailAllData,
  deletePost
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const GroupDetail: any = ConfigFn.getPluginFile('GroupDetail');
 
 /**
  * changes done (state into props)
  */
 const mapStateToProps = () => {
   return {};
 };
 
 /**
  * dispatch actions
  */
 const mapDispatchToProps = (dispatch) => {
   const language: any = {
     actions: {
       callPayment: bindActionCreators(callPayment, dispatch),
       callPaymentData: bindActionCreators(callPaymentData, dispatch),
       getGroupDetailData: bindActionCreators(getGroupDetailData, dispatch),
       getCommunityCategoryListData: bindActionCreators(getCommunityCategoryListData, dispatch),
       joinGroup: bindActionCreators(joinGroup, dispatch),
       getGroupMemberData: bindActionCreators(getGroupMemberData, dispatch),
       getGroupPostData: bindActionCreators(getGroupPostData, dispatch),
       addSupport: bindActionCreators(addSupport, dispatch),
       pinGroup: bindActionCreators(pinGroup, dispatch),
       getCommunityGroupListData: bindActionCreators(getCommunityGroupListData, dispatch),
       updateBookmark: bindActionCreators(updateBookmark, dispatch),
       pinList: bindActionCreators(pinList, dispatch),
       followList: bindActionCreators(followList, dispatch),
       markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
       reportList: bindActionCreators(reportList, dispatch),
       leaveGroup: bindActionCreators(leaveGroup, dispatch),
       addComments: bindActionCreators(addComments, dispatch),
       addCommentsData: bindActionCreators(addCommentsData, dispatch),
       getGroupDetailAllData: bindActionCreators(getGroupDetailAllData, dispatch),
       deletePost: bindActionCreators(deletePost, dispatch),
      }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const GroupDetailContainer = connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
 export default GroupDetailContainer;
 