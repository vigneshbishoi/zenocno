/**
 * CreateDietPlan Container
 * @Author: Anand R
 * @Date: Sat Dec 18 2021 09:25:06 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

 import {connect} from 'react-redux';
 /**
  * Import Other files
  */
  import { callPayment, callCountry, callPaymentData, callGetAllDetail, callCamTreatmentAll, callHealthStatusAll, callMedTreatmentAll,
    callSearchCancerAll,createPost, callCancerStage, callSearchCitiesAll, callSearchCities, callSearchCitiesData, } from '../store/actions/onboardingActions';
  import {
      getCommunityCategoryListData,getRules,getTags,getPostCategory
    } from '../store/actions/storiesActions';
 import * as ConfigFn from '../config/fn-config';
 import { bindActionCreators } from 'redux';

 const CreatePost: any = ConfigFn.getPluginFile('CreatePost');
 
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
        createPost: bindActionCreators(createPost, dispatch),
        getCommunityCategoryListData: bindActionCreators(getCommunityCategoryListData, dispatch),
        getRules: bindActionCreators(getRules, dispatch),
        getTags: bindActionCreators(getTags, dispatch),
        getPostCategory: bindActionCreators(getPostCategory, dispatch),
       callSearchCities: bindActionCreators(callSearchCities, dispatch),
       callSearchCitiesData: bindActionCreators(callSearchCitiesData, dispatch),

      }
    }
    return language
  };
 
 /**
  * connect state and action
  */
 const CreateDietPlanContainer = connect(mapStateToProps, mapDispatchToProps)(CreatePost);
 export default CreateDietPlanContainer;
 