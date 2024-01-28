/**
 * Community Container
 * @Author: Astha
 * @Date: Thur Apr 14 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import {
 } from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 const WriteReview: any = ConfigFn.getPluginFile('WriteReview');
 
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
   const WriteReview: any = {
     actions: {
     }
   }
   return WriteReview
 };
 
 /**
  * connect state and action
  */
 const WriteReviewContainer = connect(mapStateToProps, mapDispatchToProps)(WriteReview);
 export default WriteReviewContainer;
 