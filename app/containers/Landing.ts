/**
 * Landing Container
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
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
import { bindActionCreators } from 'redux';
import actionTypes from '../store/actions/types'
import { getBenefit, updateBenifit, loader } from '../store/actions/loginActions'


const Landing: any = ConfigFn.getPluginFile('Landing');


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
const mapDispatchToProps = (dispatch: any) => {
  const landing: any = {
    actions: {
      getBenefit: bindActionCreators(getBenefit, dispatch),
      updateBenifit: bindActionCreators(updateBenifit, dispatch),
      loader: bindActionCreators(loader, dispatch)
    }
  }
  return landing;

};

/**
 * connect state and action
 */
const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing);
export default LandingContainer;
