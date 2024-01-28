/**
 * Payment Container
 * @Author: Anand R
 * @Date: Tue Nov 30 2021 11:13:29 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { callPayment, callPaymentPlans, loader, callVerifyPayment, callPaymentData } from '../store/actions/onboardingActions';
import { loggedIn } from '../store/actions/loginActions';

/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const Payment: any = ConfigFn.getPluginFile('Payment');

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
  const payment: any = {
    actions: {
      callPaymentPlans: bindActionCreators(callPaymentPlans, dispatch),
      callPayment: bindActionCreators(callPayment, dispatch),
      loader: bindActionCreators(loader, dispatch),
      callVerifyPayment: bindActionCreators(callVerifyPayment, dispatch),
      callPaymentData: bindActionCreators(callPaymentData, dispatch),
      loggedIn: bindActionCreators(loggedIn, dispatch)
    }
  }
  return payment
};

/**
 * connect state and action
 */
const PaymentContainer = connect(mapStateToProps, mapDispatchToProps)(Payment);
export default PaymentContainer;
