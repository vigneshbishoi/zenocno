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
} from '../store/actions/storiesActions';
import {loggedIn, otpData} from '../store/actions/loginActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const AddReports: any = ConfigFn.getPluginFile('AddReports');

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
     }
   }
   return language
 };

 /**
  * connect state and action
  */
 const AddReportsContainer = connect(mapStateToProps, mapDispatchToProps)(AddReports);
 export default AddReportsContainer;