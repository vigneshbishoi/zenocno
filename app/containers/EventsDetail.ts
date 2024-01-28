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
 import { registerEvent } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const EventsDetail: any = ConfigFn.getPluginFile('EventsDetail');
 
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
   const EventsDetail: any = {
     actions: {
      registerEvent: bindActionCreators(registerEvent, dispatch),
     }
   }
   return EventsDetail
 };
 
 /**
  * connect state and action
  */
 const EventsDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EventsDetail);
 export default EventsDetailContainer;
 