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
 import { getNews, getNewsBookMark, getNewsSearch, getNewsBookMarkUpdate } from '../store/actions/referralAction';

 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const News: any = ConfigFn.getPluginFile('News');

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
   const News: any = {
     actions: {
      getNews: bindActionCreators(getNews, dispatch),
      getNewsSearch: bindActionCreators(getNewsSearch, dispatch),
      getNewsBookMark: bindActionCreators(getNewsBookMark, dispatch),
      getNewsBookMarkUpdate: bindActionCreators(getNewsBookMarkUpdate, dispatch),
     }
   }
   return News
 };

 /**
  * connect state and action
  */
 const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News);
 export default NewsContainer;