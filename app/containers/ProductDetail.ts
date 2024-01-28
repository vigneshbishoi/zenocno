/**
 * ProductDetail Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData } from '../store/actions/onboardingActions';
 import { getProductDetail,addToCart,getCart,updateCart,createCart, deleteCart } from '../store/actions/ecommerceActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const ProductDetail: any = ConfigFn.getPluginFile('ProductDetail');
 
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
       getProductDetail: bindActionCreators(getProductDetail, dispatch),
       addToCart: bindActionCreators(addToCart, dispatch),
       getCart: bindActionCreators(getCart, dispatch),
       updateCart: bindActionCreators(updateCart, dispatch),
       createCart: bindActionCreators(createCart, dispatch),
       deleteCart: bindActionCreators(deleteCart, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
 export default ProductDetailContainer;
 