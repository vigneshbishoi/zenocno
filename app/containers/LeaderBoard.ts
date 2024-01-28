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
import { loggedIn, otpData } from '../store/actions/loginActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
import { getLeaderboardList } from '../store/actions/leaderboardAction';
const LeaderBoard: any = ConfigFn.getPluginFile('LeaderBoard');

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
  const leaderBoard: any = {
    actions: {
      getLeaderboardList: bindActionCreators(getLeaderboardList, dispatch)
    }
  }
  return leaderBoard
};

/**
 * connect state and action
 */
const LeaderBoardContainer = connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
export default LeaderBoardContainer;