import {connect} from 'react-redux';
import {getMenuItemByTable, loader} from '../store/actions/storiesActions';

import * as ConfigFn from '../config/fn-config';
import {bindActionCreators} from 'redux';
const MenuDetailScreen: any = ConfigFn.getPluginFile('MenuDetailScreen');

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
  const menuDetailScreen: any = {
    actions: {
      loader: bindActionCreators(loader, dispatch),
      getMenuItemDetailData: bindActionCreators(getMenuItemByTable, dispatch),
    },
  };
  return menuDetailScreen;
};

/**
 * connect state and action
 */
const MenuDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuDetailScreen);
export default MenuDetailContainer;
