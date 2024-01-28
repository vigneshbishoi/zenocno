import {connect} from 'react-redux';
import {getMenuItemByTable, loader} from '../store/actions/storiesActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import {bindActionCreators} from 'redux';
const VideoScreen: any = ConfigFn.getPluginFile('VideoScreen');

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
  const VideoScreen: any = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getMenuItemDetailData: bindActionCreators(getMenuItemByTable, dispatch),
    },
  };
  return VideoScreen;
};

/**
 * connect state and action
 */
const VideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoScreen);
export default VideoContainer;
