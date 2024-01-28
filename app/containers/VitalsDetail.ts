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
 import { bindActionCreators } from 'redux';
 const VitalsDetail: any = ConfigFn.getPluginFile('VitalsDetail');

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
   const VitalsDetail: any = {
     actions: {
     }
   }
   return VitalsDetail
 };

 /**
  * connect state and action
  */
 const VitalsDetailContainer = connect(mapStateToProps, mapDispatchToProps)(VitalsDetail);
 export default VitalsDetailContainer;