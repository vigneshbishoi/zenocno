/**
 * Community Container
 * @Author: Astha
 * @Date: Thur Apr 14 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
import {
} from '../store/actions/storiesActions';
import { getJournalCategoryList, getJournalItem, getJournalList } from '../store/actions/journalActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const JournalDetail: any = ConfigFn.getPluginFile('JournalDetail');

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
  console.log('FUNACLL');
  
  const language: any = {
    actions: {
      getJournalList: bindActionCreators(getJournalList, dispatch),
      getJournalCategoryList: bindActionCreators(getJournalCategoryList, dispatch),
      getJournalItem: bindActionCreators(getJournalItem, dispatch),
    }
  }
  return language
};

/**
 * connect state and action
 */
const JournalContainer = connect(mapStateToProps, mapDispatchToProps)(JournalDetail);
export default JournalContainer;
