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
 import { getCalendar,getCalendarData,getCalendarSuggestion, } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ActivityCalendar: any = ConfigFn.getPluginFile('ActivityCalendar');
 
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
   const ActivityCalendar: any = {
     actions: {
      getCalendar: bindActionCreators(getCalendar, dispatch),
      getCalendarData: bindActionCreators(getCalendarData, dispatch),
      getSuggestion: bindActionCreators(getCalendarSuggestion, dispatch),
     }
   }
   return ActivityCalendar
 };
 
 /**
  * connect state and action
  */
 const ActivityCalendarContainer = connect(mapStateToProps, mapDispatchToProps)(ActivityCalendar);
 export default ActivityCalendarContainer;
 