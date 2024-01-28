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
 import { addToCart, createOrder, fetchCustomer, createOrderServer,getCart,updateCart,deleteCart } from '../store/actions/ecommerceActions';
 import { getReferralCoin } from '../store/actions/referralAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ReviewOrder: any = ConfigFn.getPluginFile('ReviewOrder');
 
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
       addToCart: bindActionCreators(addToCart, dispatch),
       createOrder: bindActionCreators(createOrder, dispatch),
       fetchCustomer: bindActionCreators(fetchCustomer, dispatch),
       createOrderServer: bindActionCreators(createOrderServer, dispatch),
       getCart: bindActionCreators(getCart, dispatch),
       updateCart: bindActionCreators(updateCart, dispatch),
       deleteCart: bindActionCreators(deleteCart, dispatch),
       getReferralCoin: bindActionCreators(getReferralCoin, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ReviewOrderContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
 export default ReviewOrderContainer;
 