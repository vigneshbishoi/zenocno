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
 import { newLoader } from '../store/actions/loginActions';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 import { getPatientList, postPatientList, getReferalCode, getInvitedPatiets, 
  deletePatient, postPatientListData } from '../store/actions/patientAction';
 const Patients: any = ConfigFn.getPluginFile('Patients');

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
   const Patients: any = {
     actions: {
      getPatients: bindActionCreators(getPatientList, dispatch),
      postPatient: bindActionCreators(postPatientList, dispatch),
      getReferalCode: bindActionCreators(getReferalCode, dispatch),
      getInvitedPatients: bindActionCreators(getInvitedPatiets, dispatch),
      deletePatient: bindActionCreators(deletePatient, dispatch),
      postPatientListData: bindActionCreators(postPatientListData, dispatch)
     }
   }
   return Patients
 };

 /**
  * connect state and action
  */
 const PatientsContainer = connect(mapStateToProps, mapDispatchToProps)(Patients);
 export default PatientsContainer;