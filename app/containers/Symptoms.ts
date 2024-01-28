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
import {
} from '../store/actions/storiesActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
import { getSymptomsList } from '../store/actions/journalActions';
const Symptoms: any = ConfigFn.getPluginFile('Symptoms');

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
      getSymptomsList: bindActionCreators(getSymptomsList, dispatch),
    }
  }
  return language
};

/**
 * connect state and action
 */
const SymptomsContainer = connect(mapStateToProps, mapDispatchToProps)(Symptoms);
export default SymptomsContainer;
