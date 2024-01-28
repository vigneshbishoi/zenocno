/**
 * ProfileScreen Container
 * @Author: Astha
 * @Date: Thur Apr 18 2022 3:00 GMT+0530 (India Standard Time)
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
 import { addToCart,getCart,createCart,updateCart,deleteCart } from '../store/actions/ecommerceActions';
 const MyOrderDetail: any = ConfigFn.getPluginFile('MyOrderDetail');
 
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
 const MyOrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MyOrderDetail);
 export default MyOrderDetailContainer;
 