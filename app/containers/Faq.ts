/**
 * Faq Container
 * @Author: Astha
 * @Date: Tue Apr 12 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';
 import {
   getFaqListData
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const Faq: any = ConfigFn.getPluginFile('Faq');
 
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
       getFaqListData: bindActionCreators(getFaqListData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const FaqContainer = connect(mapStateToProps, mapDispatchToProps)(Faq);
 export default FaqContainer;
 