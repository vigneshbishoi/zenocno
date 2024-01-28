/**
 * OnBoarding Container
 * @Author: Anand R
 * @Date: Tue Nov 23 2021 10:59:00 GMT+0530 (India Standard Time)
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
const OnBoarding: any = ConfigFn.getPluginFile('OnBoarding');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {

  };
};

/**
 * dispatch actions
 */
const mapDispatchToProps = () => {
  return {};
};

/**
 * connect state and action
 */
const OnBoardingContainer = connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
export default OnBoardingContainer;
