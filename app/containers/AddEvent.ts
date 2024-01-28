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
import { addEvent, addEventData, eventLanguage } from '../store/actions/eventAction';
 const AddEvent: any = ConfigFn.getPluginFile('AddEvent');

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
   const AddEvent: any = {
    actions: {
      addEvent: bindActionCreators(addEvent, dispatch),
      addEventData: bindActionCreators(addEventData, dispatch),
      eventLanguage: bindActionCreators(eventLanguage, dispatch),
     }
   }
   return AddEvent
 };

 /**
  * connect state and action
  */
 const AddEventContainer = connect(mapStateToProps, mapDispatchToProps)(AddEvent);
 export default AddEventContainer;