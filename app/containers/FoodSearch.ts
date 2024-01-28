/**
 * FoodSearch Container
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 19:39:18 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { getFoodItemBf, getFoodItemLu, getFoodItemSn, searchFoodItem, submitFoodItem } from "../store/actions/dietPlanActions"
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const FoodSearch: any = ConfigFn.getPluginFile('FoodSearch');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
};

/**
 * dispatch actions
 */
const mapDispatchToProps = (dispatch) => {
  const FoodSearch = {
    actions: {
      getFoodItemBf: bindActionCreators(getFoodItemBf, dispatch),
      getFoodItemLu: bindActionCreators(getFoodItemLu, dispatch),
      getFoodItemSn: bindActionCreators(getFoodItemSn, dispatch),
      searchFoodItem: bindActionCreators(searchFoodItem, dispatch),
      submitFoodItem: bindActionCreators(submitFoodItem, dispatch)

    }
  }
  return FoodSearch;
};

/**
 * connect state and action
 */
const FoodSearchContainer = connect(mapStateToProps, mapDispatchToProps)(FoodSearch);
export default FoodSearchContainer;
