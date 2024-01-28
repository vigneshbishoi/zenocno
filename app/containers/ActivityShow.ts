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
 import { addCalendar, calendarCategory, creatStreak, getCalendar, getCalendarSuggestion, getCalendarData } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ActivityShow: any = ConfigFn.getPluginFile('ActivityShow');
 
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
   const ActivityShow: any = {
     actions: {
       addCalendar: bindActionCreators(addCalendar, dispatch),
       calendarCategory: bindActionCreators(calendarCategory, dispatch),
       createStreak: bindActionCreators(creatStreak, dispatch),
       getCalendar: bindActionCreators(getCalendar, dispatch),
       getSuggestion: bindActionCreators(getCalendarSuggestion, dispatch),
       getCalendarData: bindActionCreators(getCalendarData, dispatch),
     }
   }
   return ActivityShow
 };
 
 /**
  * connect state and action
  */
 const ActivityShowContainer = connect(mapStateToProps, mapDispatchToProps)(ActivityShow);
 export default ActivityShowContainer;
 