/**
 * FilterCommunity Container
 * @Author: Astha
 * @Date: Thur Apr 15 2022 3:00 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import { connect } from 'react-redux';
 import { callPayment, callCountry, callPaymentData, callGetAllDetail, callCamTreatmentAll, callHealthStatusAll, callMedTreatmentAll,
  callSearchCancerAll, callCancerStage, callSearchCitiesAll } from '../store/actions/onboardingActions';
 /**
  * Import Other files
  */
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';
 const FilterCommunity: any = ConfigFn.getPluginFile('FilterCommunity');
 
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
       callGetAllDetail: bindActionCreators(callGetAllDetail, dispatch),
       callSearchCancerAll: bindActionCreators(callSearchCancerAll, dispatch),
       callCancerStage: bindActionCreators(callCancerStage, dispatch),
       callCountry: bindActionCreators(callCountry, dispatch),
       callSearchCitiesAll: bindActionCreators(callSearchCitiesAll, dispatch),
       callCamTreatmentAll: bindActionCreators(callCamTreatmentAll, dispatch),
       callHealthStatusAll: bindActionCreators(callHealthStatusAll, dispatch),
       callMedTreatmentAll: bindActionCreators(callMedTreatmentAll, dispatch),
     }
   }
   return language
 };
 
 /**
  * connect state and action
  */
 const FilterCommunityContainer = connect(mapStateToProps, mapDispatchToProps)(FilterCommunity);
 export default FilterCommunityContainer;
 