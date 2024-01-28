/**
 * ProfileScreen Container
 * @Author: Astha
 * @Date: Thur Apr 18 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData,otherUserProfileData, otherUserProfile, editImageData, editImage,callUserDetailsData } from '../store/actions/onboardingActions';
 import {
  profilePost,
  followUser,
  updateBookmark,
  pinList,
  followList,
  markAsSpamList,
  reportList,
  addSupport,
  profilePostData,
  deletePost,
  addCommentsData,
  addComments,
  userReport,
  blockUser,
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ProfileScreen: any = ConfigFn.getPluginFile('ProfileScreen');
 
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
       profilePost: bindActionCreators(profilePost, dispatch),
       profilePostData: bindActionCreators(profilePostData, dispatch),
       callFetchDetails: bindActionCreators(otherUserProfile, dispatch),
       followUser: bindActionCreators(followUser, dispatch),
       updateBookmark: bindActionCreators(updateBookmark, dispatch),
       pinList: bindActionCreators(pinList, dispatch),
       followList: bindActionCreators(followList, dispatch),
       markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
       reportList: bindActionCreators(reportList, dispatch),
       addSupport: bindActionCreators(addSupport, dispatch),
       otherUserProfileData: bindActionCreators(otherUserProfileData, dispatch),
       deletePost: bindActionCreators(deletePost, dispatch),
       addCommentsData: bindActionCreators(addCommentsData, dispatch),
       addComments: bindActionCreators(addComments, dispatch),
       callUserReport: bindActionCreators(userReport, dispatch),
       blockUser: bindActionCreators(blockUser, dispatch),
       editImageData: bindActionCreators(editImageData, dispatch),
       editImage: bindActionCreators(editImage, dispatch),
       callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ProfileScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
 export default ProfileScreenContainer;
 