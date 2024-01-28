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
 import { doctorSchedule, rescheduleAppointment, rescheduleAppointmentData } from '../store/actions/appointmentAction';
 import { callPayment } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const TimeSlots: any = ConfigFn.getPluginFile('TimeSlots');

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
   const TimeSlots: any = {
     actions: {
      doctorSchedule: bindActionCreators(doctorSchedule, dispatch),
      rescheduleAppointment: bindActionCreators(rescheduleAppointment, dispatch),
      rescheduleAppointmentData: bindActionCreators(rescheduleAppointmentData, dispatch),
      callPayment: bindActionCreators(callPayment, dispatch),
     }
   }
   return TimeSlots
 };

 /**
  * connect state and action
  */
 const TimeSlotsContainer = connect(mapStateToProps, mapDispatchToProps)(TimeSlots);
 export default TimeSlotsContainer;