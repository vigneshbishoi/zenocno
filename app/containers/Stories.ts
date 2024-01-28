/**
 * Stories Container
 * @Author: Anand R
 * @Date: Fri Dec 03 2021 16:00:13 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { loader, getStoriesAll, getStoriesById, getStoriesByUserId, addComments, addSupport, updateBookmark } from '../store/actions/storiesActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
const Stories: any = ConfigFn.getPluginFile('Stories');

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
  const stories: any = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getStoriesAll: bindActionCreators(getStoriesAll, dispatch),
      getStoriesById: bindActionCreators(getStoriesById, dispatch),
      getStoriesByUserId: bindActionCreators(getStoriesByUserId, dispatch),
      addComments: bindActionCreators(addComments, dispatch),
      addSupport: bindActionCreators(addSupport, dispatch),
      updateBookmark: bindActionCreators(updateBookmark, dispatch)
    }
  }
  return stories;
};

/**
 * connect state and action
 */
const StoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Stories);
export default StoriesContainer;
