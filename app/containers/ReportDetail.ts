/**
 * Landing Container
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
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
import { bindActionCreators } from 'redux';
import actionTypes from '../store/actions/types'
import { getMyReportsList, getReportCategoryList, getReportFilterList } from '../store/actions/myReportsAction';


const ReportDetail: any = ConfigFn.getPluginFile('ReportDetail');


/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {

  };
};

/**
 * dispatch actions
 */
const mapDispatchToProps = (dispatch: any) => {
  const Report: any = {
    actions: {
      getMyReportsList : bindActionCreators(getMyReportsList, dispatch),
      getReportCategoryList : bindActionCreators(getReportCategoryList, dispatch),
      getReportFilterList: bindActionCreators(getReportFilterList, dispatch)
    }
  }
  return Report;

};

/**
 * connect state and action
 */
const ReportDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
export default ReportDetailContainer;
