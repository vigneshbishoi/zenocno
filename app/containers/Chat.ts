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
 import { getChatConversation } from "../store/actions/chatAction"
 import {
  userReport,
  blockUser
} from '../store/actions/storiesActions';
 const Chat: any = ConfigFn.getPluginFile('Chat');
 
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
      getChatConversation: bindActionCreators(getChatConversation, dispatch),
      callUserReport: bindActionCreators(userReport, dispatch),
      blockUser: bindActionCreators(blockUser, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);
 export default ChatContainer;
 