/**
 * LanguageSelection Container
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 23:35:26 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const LanguageSelection: any = ConfigFn.getPluginFile('LanguageSelection');

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
  const language: any = {
    actions: {
      callPayment: bindActionCreators(callPayment, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch)
    }
  }
  return language
};

/**
 * connect state and action
 */
const LanguageSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(LanguageSelection);
export default LanguageSelectionContainer;
