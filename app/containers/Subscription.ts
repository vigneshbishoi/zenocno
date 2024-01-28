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
 const Subscription: any = ConfigFn.getPluginFile('Subscription');

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
   const Subscription: any = {
     actions: {}
   }
   return Subscription
 };

 /**
  * connect state and action
  */
 const SubscriptionContainer = connect(mapStateToProps, mapDispatchToProps)(Subscription);
 export default SubscriptionContainer;