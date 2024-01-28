/**
 * SidebarSetting Container
 * @Author: Astha
 * @Date: Fri Jun 10 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import {  editImage, callUserDetailsData, editImageData } from '../store/actions/onboardingActions';
 import { loggedIn, otpData } from '../store/actions/loginActions';
 import { getCalendarData } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const SidebarSetting: any = ConfigFn.getPluginFile('SidebarSetting');
 
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
        editImage: bindActionCreators(editImage, dispatch),
        callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
        loggedIn: bindActionCreators(loggedIn, dispatch),
        otpData: bindActionCreators(otpData, dispatch),
        editImageData: bindActionCreators(editImageData, dispatch),
        getCalendarData: bindActionCreators(getCalendarData, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const SidebarSettingContainer = connect(mapStateToProps, mapDispatchToProps)(SidebarSetting);
 export default SidebarSettingContainer;
 