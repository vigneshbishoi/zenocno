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
 import { subscription } from '../store/actions/dietPlanActions';
 import { callPayment, callPaymentPlans, loader, callVerifyPayment, callPaymentData } from '../store/actions/onboardingActions';
 import { loggedIn } from '../store/actions/loginActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const SubscriptionDetail: any = ConfigFn.getPluginFile('SubscriptionDetail');

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
   const SubscriptionDetail: any = {
     actions: {
      subscription: bindActionCreators(subscription, dispatch),
      callPaymentPlans: bindActionCreators(callPaymentPlans, dispatch),
      callPayment: bindActionCreators(callPayment, dispatch),
      loader: bindActionCreators(loader, dispatch),
      callVerifyPayment: bindActionCreators(callVerifyPayment, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch),
      loggedIn: bindActionCreators(loggedIn, dispatch)
     }
   }
   return SubscriptionDetail
 };

 /**
  * connect state and action
  */
 const SubscriptionDetailContainer = connect(mapStateToProps, mapDispatchToProps)(SubscriptionDetail);
 export default SubscriptionDetailContainer;