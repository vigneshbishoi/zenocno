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
 import { eventCategory, eventAll, categoryWiseEvent, registerEvent } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const Events: any = ConfigFn.getPluginFile('Events');
 
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
   const Events: any = {
     actions: {
      eventCategory: bindActionCreators(eventCategory, dispatch),
      eventAll: bindActionCreators(eventAll, dispatch),
      categoryWiseEvent: bindActionCreators(categoryWiseEvent, dispatch),
      registerEvent: bindActionCreators(registerEvent, dispatch),
     }
   }
   return Events
 };
 
 /**
  * connect state and action
  */
 const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
 export default EventsContainer;
 