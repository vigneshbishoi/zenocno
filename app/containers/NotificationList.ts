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
 import { getChatConversation } from '../store/actions/chatAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const NotificationList: any = ConfigFn.getPluginFile('NotificationList');
 
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
   const NotificationList: any = {
     actions: {
      getChatConversation: bindActionCreators(getChatConversation, dispatch),
     }
   }
   return NotificationList
 };
 
 /**
  * connect state and action
  */
 const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);
 export default NotificationListContainer;
 