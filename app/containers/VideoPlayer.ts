/**
 * SuccessMessage Container
 * @Author: Astha
 * @Date: Thur Apr 8 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const VideoPlayer: any = ConfigFn.getPluginFile('VideoPlayer');
 
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
   const language: any = {
     actions: {
       callPayment: bindActionCreators(callPayment, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const VideoPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
 export default VideoPlayerContainer;