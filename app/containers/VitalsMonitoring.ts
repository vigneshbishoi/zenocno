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
 import { getRpmPermission, postRpmPermission, fetchRpm, postEmergencyContact, postRpm, postRpmData } from
  '../store/actions/rpmAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const VitalsMonitoring: any = ConfigFn.getPluginFile('VitalsMonitoring');

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
   const VitalsMonitoring: any = {
     actions: {
      getRpmPermission: bindActionCreators(getRpmPermission, dispatch),
      postRpmPermission: bindActionCreators(postRpmPermission, dispatch),
      postEmergencyContact: bindActionCreators(postEmergencyContact, dispatch),
      fetchRpm: bindActionCreators(fetchRpm, dispatch),
      postRpm: bindActionCreators(postRpm, dispatch),
      postRpmData: bindActionCreators(postRpmData, dispatch),
     }
   }
   return VitalsMonitoring
 };

 /**
  * connect state and action
  */
 const VitalsMonitoringContainer = connect(mapStateToProps, mapDispatchToProps)(VitalsMonitoring);
 export default VitalsMonitoringContainer;