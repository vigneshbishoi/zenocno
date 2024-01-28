/**
 * UserOnBoarding Container
 * @Author: Anand R
 * @Date: Fri Nov 26 2021 17:45:49 GMT+0530 (India Standard Time)
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
const Summary: any = ConfigFn.getPluginFile('Summary');
import {
  summary,
  summaryData
} from '../store/actions/storiesActions';
import { callUserDetailsData } from '../store/actions/onboardingActions';

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
  const Summary: any = {
    actions: {
      summary: bindActionCreators(summary, dispatch),
      summaryData: bindActionCreators(summaryData, dispatch),
      callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
    }
  }
  return Summary;
};

/**
 * connect state and action
 */
const SummaryContainer = connect(mapStateToProps, mapDispatchToProps)(Summary);
export default SummaryContainer;
