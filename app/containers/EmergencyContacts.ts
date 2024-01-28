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
 import { getEmergencyContact, postEmergencyContact, deleteEmergencyContact } from
  '../store/actions/rpmAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const EmergencyContacts: any = ConfigFn.getPluginFile('EmergencyContacts');

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
   const EmergencyContacts: any = {
     actions: {
      getEmergencyContact: bindActionCreators(getEmergencyContact, dispatch),
      postEmergencyContact: bindActionCreators(postEmergencyContact, dispatch),
      deleteEmergencyContact: bindActionCreators(deleteEmergencyContact, dispatch),
     }
   }
   return EmergencyContacts
 };

 /**
  * connect state and action
  */
 const EmergencyContactsContainer = connect(mapStateToProps, mapDispatchToProps)(EmergencyContacts);
 export default EmergencyContactsContainer;