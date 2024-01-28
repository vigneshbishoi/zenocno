/**
 * Checkout Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callTreatment, callPaymentData ,callCountry} from '../store/actions/onboardingActions';
 import { createCustomer, createCustomerServer, editCustomer, editCustomerData,getAddress,createAddress } from '../store/actions/ecommerceActions';
 import { callUserDetailsData } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const Checkout: any = ConfigFn.getPluginFile('Checkout');
 
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
       createCustomer: bindActionCreators(createCustomer, dispatch),
       createCustomerServer: bindActionCreators(createCustomerServer, dispatch),
       editCustomer: bindActionCreators(editCustomer, dispatch),
       editCustomerData: bindActionCreators(editCustomerData, dispatch),
       callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
       callCountry: bindActionCreators(callCountry, dispatch),
       getAddress: bindActionCreators(getAddress, dispatch),
       createAddress: bindActionCreators(createAddress, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);
 export default CheckoutContainer;
 