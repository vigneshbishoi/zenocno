/**
 * MyBookmark Container
 * @Author: Astha
 * @Date: Fri jul 8 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import {
  myBookmark,
  addSupport,
  updateBookmark,
  pinList,
  followList,
  markAsSpamList,
  reportList,
  addComments,
  addCommentsData,
  getCommunityByIdListAllData,
  getCommunityListAllData,
  deletePost,
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const MyBookmark: any = ConfigFn.getPluginFile('MyBookmark');
 
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
   const MyBookmark: any = {
     actions: {
      myBookmark: bindActionCreators(myBookmark, dispatch),
      addSupport: bindActionCreators(addSupport, dispatch),
      markAsSpamList: bindActionCreators(markAsSpamList, dispatch),
      reportList: bindActionCreators(reportList, dispatch),
      addComments: bindActionCreators(addComments, dispatch),
      addCommentsData: bindActionCreators(addCommentsData, dispatch),
      deletePost: bindActionCreators(deletePost, dispatch), 
      updateBookmark: bindActionCreators(updateBookmark, dispatch),
     }
   }
   return MyBookmark
 };
 
 /**
  * connect state and action
  */
 const MyBookmarkContainer = connect(mapStateToProps, mapDispatchToProps)(MyBookmark);
 export default MyBookmarkContainer;
 