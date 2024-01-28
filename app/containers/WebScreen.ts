/**
 * Community Container
 * @Author: Astha
 * @Date: Thur Sep 26 2022 10:00 GMT+0530 (India Standard Time)
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
 const WebScreen: any = ConfigFn.getPluginFile('WebScreen');

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
   const WebScreen: any = {
     actions: {}
   }
   return WebScreen
 };

 /**
  * connect state and action
  */
 const WebScreenContainer = connect(mapStateToProps, mapDispatchToProps)(WebScreen);
 export default WebScreenContainer;