/**
 * Coupons Container
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 18:28:03 GMT+0530 (India Standard Time)
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
const Coupons: any = ConfigFn.getPluginFile('Coupons');

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
const CouponsContainer = connect(mapStateToProps, mapDispatchToProps)(Coupons);
export default CouponsContainer;
