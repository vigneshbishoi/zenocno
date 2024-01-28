import {connect} from 'react-redux';
/**
 * Import Other files
 */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 import {
  getCommunityGroupListData,
  groupSearch,
  groupSearchData,
  joinGroup
} from '../store/actions/storiesActions';
import { join } from 'redux-saga/effects';
const ViewallGroup: any = ConfigFn.getPluginFile('ViewallGroup');

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
  const ViewallGroup: any = {
    actions: {
      getCommunityGroupListData: bindActionCreators(getCommunityGroupListData, dispatch),
      groupSearch: bindActionCreators(groupSearch, dispatch),
      groupSearchData: bindActionCreators(groupSearchData, dispatch),
      joinGroup: bindActionCreators(joinGroup, dispatch),
    },
  };
  return ViewallGroup;
};

/**
 * connect state and action
 */
const ViewallGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewallGroup);
export default ViewallGroupContainer;
