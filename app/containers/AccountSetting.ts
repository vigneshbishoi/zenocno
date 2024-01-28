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
 import { deleteAccount, deactiviateAccount } from '../store/actions/settingAction';
 import { loggedIn, otpData } from '../store/actions/loginActions';
 import { callUserDetailsData , editImageData} from '../store/actions/onboardingActions';
 import { getCalendarData } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const AccountSetting: any = ConfigFn.getPluginFile('AccountSetting');
 
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
   const AccountSetting: any = {
     actions: {
      deleteAccount: bindActionCreators(deleteAccount, dispatch),
      deactiviateAccount: bindActionCreators(deactiviateAccount, dispatch),
      loggedIn: bindActionCreators(loggedIn, dispatch),
      otpData: bindActionCreators(otpData, dispatch), 
      callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch), 
      editImageData: bindActionCreators(editImageData, dispatch), 
      getCalendarData: bindActionCreators(getCalendarData, dispatch),
     }
   }
   return AccountSetting
 };
 
 /**
  * connect state and action
  */
 const AccountSettingContainer = connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
 export default AccountSettingContainer;
 