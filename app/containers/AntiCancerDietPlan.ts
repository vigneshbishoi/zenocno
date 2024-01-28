/**
 * AntiCancerDietPlan Container
 * @Author: Anand R
 * @Date: Tue Dec 21 2021 14:29:30 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { getDietFoodInfo, getDietPLan, ingredients } from "../store/actions/dietPlanActions"
import { newLoader } from '../store/actions/loginActions';
const AntiCancerDietPlan: any = ConfigFn.getPluginFile('AntiCancerDietPlan');

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
const mapDispatchToProps = (dispatch) => {
  const AntiCancerDietPlan = {
    actions: {
      getDietPLan: bindActionCreators(getDietPLan, dispatch),
      newLoader: bindActionCreators(newLoader, dispatch),
      ingredients: bindActionCreators(ingredients, dispatch),
    }
  }
  return AntiCancerDietPlan;
};

/**
 * connect state and action
 */
const AntiCancerDietPlanContainer = connect(mapStateToProps, mapDispatchToProps)(AntiCancerDietPlan);
export default AntiCancerDietPlanContainer;
