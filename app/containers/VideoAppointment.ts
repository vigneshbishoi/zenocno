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
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';
 import { bookAppointment, bookAppointmentData, getPatientDetailData } from '../store/actions/appointmentAction';
 const VideoAppointment: any = ConfigFn.getPluginFile('VideoAppointment');

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
   const VideoAppointment: any = {
     actions: {
      callPayment: bindActionCreators(callPayment, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch),
      bookAppointment: bindActionCreators(bookAppointment, dispatch),
      bookAppointmentData: bindActionCreators(bookAppointmentData, dispatch),
      getPatientDetailData: bindActionCreators(getPatientDetailData, dispatch),
     }
   }
   return VideoAppointment
 };

 /**
  * connect state and action
  */
 const VideoAppointmentContainer = connect(mapStateToProps, mapDispatchToProps)(VideoAppointment);
 export default VideoAppointmentContainer;