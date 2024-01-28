/**
 * Wellness Category Container
 * @Author: Astha
 * @Date: Wed Apr 13 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { financialResourcesById } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const FinancialResourcesDetail: any = ConfigFn.getPluginFile('FinancialResourcesDetail');
 
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
   const FinancialResourcesDetail: any = {
     actions: {
      financialResourcesById: bindActionCreators(financialResourcesById, dispatch),
     }
   }
   return FinancialResourcesDetail
 };
 
 /**
  * connect state and action
  */
 const FinancialResourcesDetailContainer = connect(mapStateToProps, mapDispatchToProps)(FinancialResourcesDetail);
 export default FinancialResourcesDetailContainer;
 