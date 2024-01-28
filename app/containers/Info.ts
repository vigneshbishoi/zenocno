/**
 * Info Container
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 14:36:46 GMT+0530 (India Standard Time)
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
const Info: any = ConfigFn.getPluginFile('Info');

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
const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);
export default InfoContainer;
