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
 import { financialResources } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const FinancialResources: any = ConfigFn.getPluginFile('FinancialResources');
 
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
   const FinancialResources: any = {
     actions: {
      financialResources: bindActionCreators(financialResources, dispatch),
     }
   }
   return FinancialResources
 };
 
 /**
  * connect state and action
  */
 const FinancialResourcesContainer = connect(mapStateToProps, mapDispatchToProps)(FinancialResources);
 export default FinancialResourcesContainer;
 