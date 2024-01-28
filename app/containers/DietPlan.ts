/**
 * DietPlan Container
 * @Author: Anand R
 * @Date: Fri Dec 17 2021 13:51:07 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { createDietPlan, getCuisines, loader, getDietPreference, postDietPreference, postCuisineFoods, 
  postAllergiesFoods, getDietFoodInfo, getAllergiesFoods } from "../store/actions/dietPlanActions"
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const DietPlan: any = ConfigFn.getPluginFile('DietPlan');

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
  const dietPlan = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getCuisines: bindActionCreators(getCuisines, dispatch),
      postCuisineFoods: bindActionCreators(postCuisineFoods, dispatch),
      getDietPreference: bindActionCreators(getDietPreference, dispatch),
      postDietPreference: bindActionCreators(postDietPreference, dispatch),
      postAllergiesFoods: bindActionCreators(postAllergiesFoods, dispatch),
      createDietPlan: bindActionCreators(createDietPlan, dispatch),
      getAllergiesFoods: bindActionCreators(getAllergiesFoods, dispatch),
    }
  }
  return dietPlan;
};

/**
 * connect state and action
 */
const DietPlanContainer = connect(mapStateToProps, mapDispatchToProps)(DietPlan);
export default DietPlanContainer;
