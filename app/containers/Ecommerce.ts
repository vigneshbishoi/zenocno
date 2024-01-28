/**
 * Ecommerce Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callPaymentData } from '../store/actions/onboardingActions';
 import { getProductCategory, getProducts, getCategoryProducts, addToCart,getProductImages,createCart, deleteCart ,getCart,updateCart} from '../store/actions/ecommerceActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const Ecommerce: any = ConfigFn.getPluginFile('Ecommerce');
 
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
       getProductCategory: bindActionCreators(getProductCategory, dispatch),
       getProducts: bindActionCreators(getProducts, dispatch),
       getCategoryProducts: bindActionCreators(getCategoryProducts, dispatch),
       addToCart: bindActionCreators(addToCart, dispatch),
       getProductImages: bindActionCreators(getProductImages, dispatch),
       createCart: bindActionCreators(createCart, dispatch),
       getCart: bindActionCreators(getCart, dispatch),
       updateCart: bindActionCreators(updateCart, dispatch),
       deleteCart: bindActionCreators(deleteCart, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const EcommerceContainer = connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
 export default EcommerceContainer;
 