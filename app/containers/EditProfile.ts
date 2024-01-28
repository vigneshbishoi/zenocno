/**
 * EditProfile Container
 * @Author: Astha
 * @Date: Thur Apr 19 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callCancerStage, callPaymentData, callSearchCitiesAll, callGetAllDetail, 
  callSearchCancerAll, callTreatment, callMedication, callSymptoms, callAcivity, callMedicalIssues, callSearchCancer,getOnboard,
  callFactors, callEditUserDetails, callSearchCities, callSearchCitiesData, callSearchCancerData,callUserDetailsData, treatmentData} from '../store/actions/onboardingActions';
import {getCoachChatId} from '../store/actions/chatAction'
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const EditProfile: any = ConfigFn.getPluginFile('EditProfile');
 
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
       callSearchCitiesAll: bindActionCreators(callSearchCitiesAll, dispatch),  
       callGetAllDetail: bindActionCreators(callGetAllDetail, dispatch),
       callSearchCancerAll: bindActionCreators(callSearchCancerAll, dispatch),
       callCancerStage: bindActionCreators(callCancerStage, dispatch),
       callTreatment: bindActionCreators(callTreatment, dispatch),
       callMedication: bindActionCreators(callMedication, dispatch),
       callSymptoms: bindActionCreators(callSymptoms, dispatch),
       callAcivity: bindActionCreators(callAcivity, dispatch),
       callMedicalIssues: bindActionCreators(callMedicalIssues, dispatch),
       callFactors: bindActionCreators(callFactors, dispatch),
       callEditUserDetails: bindActionCreators(callEditUserDetails, dispatch),
       callSearchCities: bindActionCreators(callSearchCities, dispatch),
       callSearchCitiesData: bindActionCreators(callSearchCitiesData, dispatch),
       callSearchCancerData: bindActionCreators(callSearchCancerData, dispatch),
       callSearchCancer: bindActionCreators(callSearchCancer, dispatch),
       callUserDetailsData: bindActionCreators(callUserDetailsData, dispatch),
       treatmentData: bindActionCreators(treatmentData, dispatch),
       getCoachChatId: bindActionCreators(getCoachChatId, dispatch),
       getOnboard: bindActionCreators(getOnboard, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfile);
 export default EditProfileContainer;
 