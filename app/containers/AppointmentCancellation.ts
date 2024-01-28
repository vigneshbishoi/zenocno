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
 import { cancelAppointment, cancelOptions, cancelAppointmentData } from '../store/actions/appointmentAction';
 import { callPayment } from '../store/actions/onboardingActions';
 const AppointmentCancellation: any = ConfigFn.getPluginFile('AppointmentCancellation');

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
   const AppointmentCancellation: any = {
     actions: {
      cancelAppointment: bindActionCreators(cancelAppointment, dispatch),
      cancelOptions: bindActionCreators(cancelOptions, dispatch),
      cancelAppointmentData: bindActionCreators(cancelAppointmentData, dispatch),
      callPayment: bindActionCreators(callPayment, dispatch),
     }
   }
   return AppointmentCancellation
 };

 /**
  * connect state and action
  */
 const AppointmentCancellationContainer = connect(mapStateToProps, mapDispatchToProps)(AppointmentCancellation);
 export default AppointmentCancellationContainer;