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
 const AppointmentCancelled: any = ConfigFn.getPluginFile('AppointmentCancelled');

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
   const AppointmentCancelled: any = {
     actions: {
     }
   }
   return AppointmentCancelled
 };

 /**
  * connect state and action
  */
 const AppointmentCancelledContainer = connect(mapStateToProps, mapDispatchToProps)(AppointmentCancelled);
 export default AppointmentCancelledContainer;