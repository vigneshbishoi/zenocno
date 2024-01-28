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
 import { fetchDoctors, doctorCategory, doctorSchedule, fetchDoctorsSearch, saveDoctorData } from '../store/actions/appointmentAction';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const DoctorsList: any = ConfigFn.getPluginFile('DoctorsList');

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
   const DoctorsList: any = {
     actions: {
      fetchDoctors: bindActionCreators(fetchDoctors, dispatch),
      doctorCategory: bindActionCreators(doctorCategory, dispatch),
      doctorSchedule: bindActionCreators(doctorSchedule, dispatch),
      fetchDoctorsSearch: bindActionCreators(fetchDoctorsSearch, dispatch),
      saveDoctorData: bindActionCreators(saveDoctorData, dispatch),
     }
   }
   return DoctorsList
 };

 /**
  * connect state and action
  */
 const DoctorsListContainer = connect(mapStateToProps, mapDispatchToProps)(DoctorsList);
 export default DoctorsListContainer;