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
 const AppointmentConfirm: any = ConfigFn.getPluginFile('AppointmentConfirm');

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
   const AppointmentConfirm: any = {
     actions: {
     }
   }
   return AppointmentConfirm
 };

 /**
  * connect state and action
  */
 const AppointmentConfirmContainer = connect(mapStateToProps, mapDispatchToProps)(AppointmentConfirm);
 export default AppointmentConfirmContainer;