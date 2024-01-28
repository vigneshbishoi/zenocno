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
 import { getNewsBookMark, getNewsBookMarkUpdate, getNewsById } from '../store/actions/referralAction';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const NewsDetail: any = ConfigFn.getPluginFile('NewsDetail');

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
   const NewsDetail: any = {
     actions: {
      getNewsById: bindActionCreators(getNewsById, dispatch),
      getNewsBookMark: bindActionCreators(getNewsBookMark, dispatch),
      getNewsBookMarkUpdate: bindActionCreators(getNewsBookMarkUpdate, dispatch),
     }
   }
   return NewsDetail
 };

 /**
  * connect state and action
  */
 const NewsDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
 export default NewsDetailContainer;