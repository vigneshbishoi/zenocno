/**
 * CreateDietPlan Container
 * @Author: Anand R
 * @Date: Sat Dec 18 2021 09:25:06 GMT+0530 (India Standard Time)
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
const CreateDietPlan: any = ConfigFn.getPluginFile('CreateDietPlan');

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
const CreateDietPlanContainer = connect(mapStateToProps, mapDispatchToProps)(CreateDietPlan);
export default CreateDietPlanContainer;
