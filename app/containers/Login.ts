/**
 * Login Container
 * @Author: Anand R
 * @Date: Fri Nov 12 2021 13:46:28 GMT+0530 (India Standard Time)
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
import actionTypes from '../store/actions/types'
import { callOtp,referralCode, userData, loader, getUserDetails, newLoader, referralCodeData } from '../store/actions/loginActions'
import { callFetchDetails } from "../store/actions/onboardingActions"
const Login: any = ConfigFn.getPluginFile('Login');

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
  const login: any = {
    actions: {
      callOtp: bindActionCreators(callOtp, dispatch),
      referralCode: bindActionCreators(referralCode, dispatch),
      referralCodeData: bindActionCreators(referralCodeData, dispatch),
      userData: bindActionCreators(userData, dispatch),
      loader: bindActionCreators(loader, dispatch),
      getUserDetails: bindActionCreators(getUserDetails, dispatch),
      callFetchDetails: bindActionCreators(callFetchDetails, dispatch),
      newLoader: bindActionCreators(newLoader, dispatch)

    }
  }
  return login;
};

/**
 * connect state and action
 */
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
