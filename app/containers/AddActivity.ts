/**
 * ActivityShow Container
 * @Author: Astha
 * @Date: Thur Apr 8 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { addCalendar,getCalendarData, calendarCategory, editCalendar,addCalendarData, deleteActivity } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const AddActivity: any = ConfigFn.getPluginFile('AddActivity');
 
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
   const AddActivity: any = {
     actions: {
       addCalendar: bindActionCreators(addCalendar, dispatch),
       addCalendarData: bindActionCreators(addCalendarData, dispatch),
       getCalendarData: bindActionCreators(getCalendarData, dispatch),
       calendarCategory: bindActionCreators(calendarCategory, dispatch),
       editCalendar: bindActionCreators(editCalendar, dispatch),
       deleteActivity: bindActionCreators(deleteActivity, dispatch),
     }
   }
   return AddActivity
 };
 
 /**
  * connect state and action
  */
 const AddActivityContainer = connect(mapStateToProps, mapDispatchToProps)(AddActivity);
 export default AddActivityContainer;
 