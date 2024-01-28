/**
 * Wellness Category Container
 * @Author: Astha
 * @Date: Wed Apr 13 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { eventCategory, eventAll, categoryWiseEvent, registerEvent, eventLanguage } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const EventFilter: any = ConfigFn.getPluginFile('EventFilter');
 
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
   const EventFilter: any = {
     actions: {
      eventCategory: bindActionCreators(eventCategory, dispatch),
      eventAll: bindActionCreators(eventAll, dispatch),
      categoryWiseEvent: bindActionCreators(categoryWiseEvent, dispatch),
      registerEvent: bindActionCreators(registerEvent, dispatch),
      eventLanguage: bindActionCreators(eventLanguage, dispatch),
     }
   }
   return EventFilter
 };
 
 /**
  * connect state and action
  */
 const EventFilterContainer = connect(mapStateToProps, mapDispatchToProps)(EventFilter);
 export default EventFilterContainer;
 