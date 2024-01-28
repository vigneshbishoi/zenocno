/**
 * ProfilesMatch Container
 * @Author: Astha
 * @Date: Thur Apr 18 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ProfileMatchDetail: any = ConfigFn.getPluginFile('ProfileMatchDetail');
 
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
       callPaymentData: bindActionCreators(callPaymentData, dispatch)
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ProfileMatchDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileMatchDetail);
 export default ProfileMatchDetailContainer;
 