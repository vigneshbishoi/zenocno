/**
 * Wellness Category Item Container
 * @Author: Astha
 * @Date: Wed Apr 13 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callPaymentData,  } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const WellnessCategoryItem: any = ConfigFn.getPluginFile('WellnessCategoryItem');
 import { likeWellness } from '../store/actions/storiesActions';
 
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
   const language: any = {
     actions: {
       callPayment: bindActionCreators(callPayment, dispatch),
       callPaymentData: bindActionCreators(callPaymentData, dispatch),
       likeWellness: bindActionCreators(likeWellness, dispatch),

     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const WellnessCategoryItemContainer = connect(mapStateToProps, mapDispatchToProps)(WellnessCategoryItem);
 export default WellnessCategoryItemContainer;
 