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
import { getCondition,saveCondition } from "../store/actions/clinicalTrialsAction"
import { callCountry} from '../store/actions/onboardingActions';

 const ClinicalTrials: any = ConfigFn.getPluginFile('ClinicalTrials');
 
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
      getCondition: bindActionCreators(getCondition, dispatch),
      saveCondition: bindActionCreators(saveCondition, dispatch),
       callCountry: bindActionCreators(callCountry, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const ClinicalTrialsContainer = connect(mapStateToProps, mapDispatchToProps)(ClinicalTrials);
 export default ClinicalTrialsContainer;
 