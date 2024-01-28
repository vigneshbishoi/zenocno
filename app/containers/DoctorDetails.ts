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
 import { doctorDetail, doctorSchedule } from '../store/actions/appointmentAction';
 import {
  updateBookmark,
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const DoctorDetails: any = ConfigFn.getPluginFile('DoctorDetails');

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
   const DoctorDetails: any = {
     actions: {
      doctorDetail: bindActionCreators(doctorDetail, dispatch),
      doctorSchedule: bindActionCreators(doctorSchedule, dispatch),
      updateBookmark: bindActionCreators(updateBookmark, dispatch),
     }
   }
   return DoctorDetails
 };

 /**
  * connect state and action
  */
 const DoctorDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(DoctorDetails);
 export default DoctorDetailsContainer;