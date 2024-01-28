/**
 * CommunityComment Container
 * @Author: Astha
 * @Date: Thur Apr 15 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 import {
  getCommunityDetailData,
  addSupport,
  addComments,
  updateBookmark,
  pinList,
  followList,
  markAsSpamList,
  reportList,
  editComment,
  editCommentData,
  deleteComment,
  getCommunityDetailAllData,
  deletePost,
  postComemnt,
  postComemntData
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const CommunityComment: any = ConfigFn.getPluginFile('CommunityComment');
 
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
       getCommunityDetailData: bindActionCreators(getCommunityDetailData, dispatch),
       addSupport: bindActionCreators(addSupport, dispatch),
       addComments: bindActionCreators(addComments, dispatch),
       updateBookmark: bindActionCreators(updateBookmark, dispatch),
       pinList: bindActionCreators(pinList, dispatch),
       followList: bindActionCreators(followList, dispatch),
       markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
       reportList: bindActionCreators(reportList, dispatch),
       editComment: bindActionCreators(editComment, dispatch),
       editCommentData: bindActionCreators(editCommentData, dispatch),
       deleteComment: bindActionCreators(deleteComment, dispatch),
       getCommunityDetailAllData: bindActionCreators(getCommunityDetailAllData, dispatch),
       deletePost: bindActionCreators(deletePost, dispatch),
       postComemnt: bindActionCreators(postComemnt, dispatch),
       postComemntData: bindActionCreators(postComemntData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const CommunityCommentContainer = connect(mapStateToProps, mapDispatchToProps)(CommunityComment);
 export default CommunityCommentContainer;
 