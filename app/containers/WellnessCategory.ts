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
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';
 import { getWellnessCategory,getWellnessCategoryByID, allWellness, likeWellness } from '../store/actions/storiesActions';
 import { addCalendar } from '../store/actions/calendarAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const WellnessCategory: any = ConfigFn.getPluginFile('WellnessCategory');
 
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
       getWellnessCategory: bindActionCreators(getWellnessCategory, dispatch),
       getWellnessCategoryByID: bindActionCreators(getWellnessCategoryByID, dispatch),
       addCalendar: bindActionCreators(addCalendar, dispatch),
       allWellness: bindActionCreators(allWellness, dispatch),
       likeWellness: bindActionCreators(likeWellness, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const WellnessCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(WellnessCategory);
 export default WellnessCategoryContainer;
 