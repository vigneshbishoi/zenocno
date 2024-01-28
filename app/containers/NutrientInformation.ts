/**
 * NutrientInformation Container
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 13:15:34 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { changeRandomFood, getDietFoodInfo, getDietPLan, getSimilarFood, setTrackFood, likeFood } from '../store/actions/dietPlanActions';
const NutrientInformation: any = ConfigFn.getPluginFile('NutrientInformation');

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
};

/**
 * dispatch actions
 */
 const mapDispatchToProps = (dispatch:any) => {
  const NutrientInformation = {
    actions: {
      getDietFoodInfo: bindActionCreators(getDietFoodInfo, dispatch),
      getSimilarFood: bindActionCreators(getSimilarFood, dispatch),
      setTrackFood: bindActionCreators(setTrackFood, dispatch),
      changeRandomFood: bindActionCreators(changeRandomFood, dispatch),
      getDietPLan: bindActionCreators(getDietPLan, dispatch),
      likeFood: bindActionCreators(likeFood, dispatch)
    }
  }
  return NutrientInformation;
};

/**
 * connect state and action
 */
const NutrientInformationContainer = connect(mapStateToProps, mapDispatchToProps)(NutrientInformation);
export default NutrientInformationContainer;
