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
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
import { getReferralCoin } from '../store/actions/referralAction';
 const ZenPoints: any = ConfigFn.getPluginFile('ZenPoints');
 
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
   const ZenPoints: any = {
     actions: {
      getReferralCoin: bindActionCreators(getReferralCoin, dispatch),
     }
   }
   return ZenPoints
 };
 
 /**
  * connect state and action
  */
 const ZenPointsContainer = connect(mapStateToProps, mapDispatchToProps)(ZenPoints);
 export default ZenPointsContainer;
 