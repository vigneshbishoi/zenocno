/**
 * Comments Container
 * @Author: Anand R
 * @Date: Tue Dec 07 2021 13:49:47 GMT+0530 (India Standard Time)
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
const Comments: any = ConfigFn.getPluginFile('Comments');

import { loader, getStoriesById, addSupport, getCommentsById, addComments, getStoriesAll } from "../store/actions/storiesActions"
import { bindActionCreators } from 'redux';
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
  const comments: any = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getCommentsById: bindActionCreators(getCommentsById, dispatch),
      addComments: bindActionCreators(addComments, dispatch),
      getStoriesAll: bindActionCreators(getStoriesAll, dispatch),
      getStoriesById: bindActionCreators(getStoriesById, dispatch),
      addSupport: bindActionCreators(addSupport, dispatch)
    }
  }
  return comments;
};

/**
 * connect state and action
 */
const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(Comments);
export default CommentsContainer;
