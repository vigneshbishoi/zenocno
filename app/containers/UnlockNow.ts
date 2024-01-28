/**
 * UnlockNow Container
 * @Author: Anand R
 * @Date: Thu Dec 23 2021 14:41:36 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import {connect} from 'react-redux';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
const UnlockNow: any = ConfigFn.getPluginFile('UnlockNow');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
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
const UnlockNowContainer = connect(mapStateToProps, mapDispatchToProps)(UnlockNow);
export default UnlockNowContainer;
