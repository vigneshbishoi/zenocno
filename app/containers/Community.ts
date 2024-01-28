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
  getCommunityListData,
  getCommunityGroupListData,
  getCommunityCategoryListData,
  getCommunityByIdListData,
  addSupport,
  updateBookmark,
  pinList,
  followList,
  markAsSpamList,
  reportList,
  addComments,
  addCommentsData,
  getCommunityByIdListAllData,
  getCommunityListAllData,
  deletePost
} from '../store/actions/storiesActions'; 
import { loggedIn, otpData } from '../store/actions/loginActions';
import { addToCart } from '../store/actions/ecommerceActions';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
import { getHomeSearchList } from '../store/actions/homeSearch';
 const Community: any = ConfigFn.getPluginFile('Community');
 
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
       getCommunityListData: bindActionCreators(getCommunityListData, dispatch),
       getCommunityGroupListData: bindActionCreators(getCommunityGroupListData, dispatch),
       getCommunityCategoryListData: bindActionCreators(getCommunityCategoryListData, dispatch),
       getCommunityByIdListData: bindActionCreators(getCommunityByIdListData, dispatch),
       addSupport: bindActionCreators(addSupport, dispatch),
       updateBookmark: bindActionCreators(updateBookmark, dispatch),
       pinList: bindActionCreators(pinList, dispatch),
       followList: bindActionCreators(followList, dispatch),
       markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
       reportList: bindActionCreators(reportList, dispatch),
       loggedIn: bindActionCreators(loggedIn, dispatch),
       otpData: bindActionCreators(otpData, dispatch),
       addToCart: bindActionCreators(addToCart, dispatch),
       addComments: bindActionCreators(addComments, dispatch),
       addCommentsData: bindActionCreators(addCommentsData, dispatch),
       getCommunityListAllData: bindActionCreators(getCommunityListAllData, dispatch),
       getCommunityByIdListAllData: bindActionCreators(getCommunityByIdListAllData, dispatch),
       deletePost: bindActionCreators(deletePost, dispatch),
       getHomeSearchList: bindActionCreators(getHomeSearchList, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const CommunityContainer = connect(mapStateToProps, mapDispatchToProps)(Community);
 export default CommunityContainer;
 