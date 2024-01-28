/**
 * SuccessMessage Container
 * @Author: Astha
 * @Date: Thur Apr 8 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';
import {loggedIn, otpData} from '../store/actions/loginActions';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const SuccessMessage: any = ConfigFn.getPluginFile('SuccessMessage');
 
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
      loggedIn: bindActionCreators(loggedIn, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const SuccessMessageContainer = connect(mapStateToProps, mapDispatchToProps)(SuccessMessage);
 export default SuccessMessageContainer;