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
import { getOncologistDr, getOncologistList } from '../store/actions/oncologistActions';
const OncologistBook: any = ConfigFn.getPluginFile('OncologistBook');

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
  const oncologist: any = {
    actions: {
      getOncologistList: bindActionCreators(getOncologistList, dispatch),
      getOncologistDr: bindActionCreators(getOncologistDr, dispatch),
    }
  }
  return oncologist
};

/**
 * connect state and action
 */
const OncologistBookContainer = connect(mapStateToProps, mapDispatchToProps)(OncologistBook);
export default OncologistBookContainer;