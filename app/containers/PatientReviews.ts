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
 import { bindActionCreators } from 'redux';
 import {docotorReview} from '../store/actions/appointmentAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 const PatientReviews: any = ConfigFn.getPluginFile('PatientReviews');
 
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
   const PatientReviews: any = {
     actions: {
      docotorReview: bindActionCreators(docotorReview, dispatch)
     }
   }
   return PatientReviews
 };
 
 /**
  * connect state and action
  */
 const PatientReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(PatientReviews);
 export default PatientReviewsContainer;
 