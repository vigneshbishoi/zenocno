/**
 * Cart Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 import { addToCart,getCart,createCart,updateCart,deleteCart } from '../store/actions/ecommerceActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const Cart: any = ConfigFn.getPluginFile('Cart');
 
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
       getCart: bindActionCreators(getCart, dispatch),
       createCart: bindActionCreators(createCart, dispatch),
       updateCart: bindActionCreators(updateCart, dispatch),
       deleteCart: bindActionCreators(deleteCart, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
 export default CartContainer;
 