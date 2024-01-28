/**
 * ViewStory Container
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 15:37:31 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { getStoriesById, loader, addSupport, updateBookmark } from '../store/actions/storiesActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
const ViewStory: any = ConfigFn.getPluginFile('ViewStory');

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
  const ViewStory = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getStoriesById: bindActionCreators(getStoriesById, dispatch),
      addSupport: bindActionCreators(addSupport, dispatch),
      updateBookmark: bindActionCreators(updateBookmark, dispatch)
    }
  }
  return ViewStory;
};

/**
 * connect state and action
 */
const ViewStoryContainer = connect(mapStateToProps, mapDispatchToProps)(ViewStory);
export default ViewStoryContainer;
