/**
 * Faq Container
 * @Author: Astha
 * @Date: Tue Apr 12 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import {
    postSearch
} from '../store/actions/storiesActions';
import {
  myBookmark,
  addSupport,
  updateBookmark,
  markAsSpamList,
  reportList,
  addComments,
  addCommentsData,
  deletePost,
} from '../store/actions/storiesActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const CommunitySearch: any = ConfigFn.getPluginFile('CommunitySearch');
 
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
          postSearch: bindActionCreators(postSearch, dispatch),
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
    return language
 };
 
 /**
  * connect state and action
  */
 const CommunitySearchContainer = connect(mapStateToProps, mapDispatchToProps)(CommunitySearch);
 export default CommunitySearchContainer;