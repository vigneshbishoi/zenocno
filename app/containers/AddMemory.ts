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
import { getJournalCategoryList } from '../store/actions/journalActions';
 const AddMemory: any = ConfigFn.getPluginFile('AddMemory');
 
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
      getJournalCategoryList: bindActionCreators(getJournalCategoryList, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const AddMemoryContainer = connect(mapStateToProps, mapDispatchToProps)(AddMemory);
 export default AddMemoryContainer;
 