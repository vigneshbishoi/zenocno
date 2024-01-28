/**
 * ReviewOrder Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 import { createOrderData,clearUserCart,getCart } from '../store/actions/ecommerceActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ReceivedOrder: any = ConfigFn.getPluginFile('ReceivedOrder');
 
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
       createOrderData: bindActionCreators(createOrderData, dispatch),
       clearUserCart: bindActionCreators(clearUserCart, dispatch),
       getCart: bindActionCreators(getCart, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ReceivedOrderContainer = connect(mapStateToProps, mapDispatchToProps)(ReceivedOrder);
 export default ReceivedOrderContainer;
 