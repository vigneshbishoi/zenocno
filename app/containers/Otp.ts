/**
 * Otp Container
 * @Author: Anand R
 * @Date: Thu Nov 18 2021 22:03:40 GMT+0530 (India Standard Time)
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
import { otpData, verifyUser, newLoader, userData, callOtp, loader, getUserDetails, loggedIn } from '../store/actions/loginActions'
import { callFetchDetails } from "../store/actions/onboardingActions"
const Otp: any = ConfigFn.getPluginFile('Otp');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
};

/**
 * dispatch actions
 */
const mapDispatchToProps = (dispatch: any) => {
  const store: any = {
    actions: {
      otpData: bindActionCreators(otpData, dispatch),
      verifyUser: bindActionCreators(verifyUser, dispatch),
      userData: bindActionCreators(userData, dispatch),
      callOtp: bindActionCreators(callOtp, dispatch),
      loader: bindActionCreators(loader, dispatch),
      getUserDetails: bindActionCreators(getUserDetails, dispatch),
      loggedIn: bindActionCreators(loggedIn, dispatch),
      callFetchDetails: bindActionCreators(callFetchDetails, dispatch),
      newLoader: bindActionCreators(newLoader, dispatch)

    }
  }
  return store;
};

/**
 * connect state and action
 */
const OtpContainer = connect(mapStateToProps, mapDispatchToProps)(Otp);
export default OtpContainer;
