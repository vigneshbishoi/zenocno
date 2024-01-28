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
 import { eventCategory, eventAll, categoryWiseEvent } from '../store/actions/eventAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 import { getReferralCode } from '../store/actions/referralAction';

 const ReferEarn: any = ConfigFn.getPluginFile('ReferEarn');
 
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
   const ReferEarn: any = {
     actions: {
      getReferralCode: bindActionCreators(getReferralCode, dispatch),
     }
   }
   return ReferEarn
 };
 
 /**
  * connect state and action
  */
 const ReferEarnContainer = connect(mapStateToProps, mapDispatchToProps)(ReferEarn);
 export default ReferEarnContainer;
 