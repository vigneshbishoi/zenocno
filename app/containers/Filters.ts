/**
 * Filters Container
 * @Author: Anand R
 * @Date: Thu Sep 22 2022 16:54:49 GMT+0530 (India Standard Time)
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
const Filters: any = ConfigFn.getPluginFile('Filters');

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
const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);
export default FiltersContainer;
