/**
 * Community Filter Container
 * @Author: Astha
 * @Date: Tue May 3 2022 3:00 GMT+0530 (India Standard Time)
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
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const CommunityFilter: any = ConfigFn.getPluginFile('CommunityFilter');
 
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
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const CommunityFilterContainer = connect(mapStateToProps, mapDispatchToProps)(CommunityFilter);
 export default CommunityFilterContainer;
 