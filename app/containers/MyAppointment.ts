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
 import { fetchAppointment } from '../store/actions/appointmentAction';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const MyAppointment: any = ConfigFn.getPluginFile('MyAppointment');

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
   const MyAppointment: any = {
     actions: {
      fetchAppointment: bindActionCreators(fetchAppointment, dispatch),
     }
   }
   return MyAppointment
 };

 /**
  * connect state and action
  */
 const MyAppointmentContainer = connect(mapStateToProps, mapDispatchToProps)(MyAppointment);
 export default MyAppointmentContainer;