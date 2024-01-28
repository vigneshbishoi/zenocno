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
 import { toggleNotificationAccount } from '../store/actions/settingAction';
 import { callUserDetailsData } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
import { getNotification, getNotificationRead } from '../store/actions/storiesActions';
 const HomeNotification: any = ConfigFn.getPluginFile('HomeNotification');
 
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
   const Notification: any = {
     actions: {
      toggleNotificationAccount: bindActionCreators(toggleNotificationAccount, dispatch),
      callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
      getNotification: bindActionCreators(getNotification, dispatch),
      getNotificationRead: bindActionCreators(getNotificationRead, dispatch),
     }
   }
   return Notification
 };
 
 /**
  * connect state and action
  */
 const HomeNotificationContainer = connect(mapStateToProps, mapDispatchToProps)(HomeNotification);
 export default HomeNotificationContainer;
 