/**
 * UserOnBoarding Container
 * @Author: Anand R
 * @Date: Fri Nov 26 2021 17:45:49 GMT+0530 (India Standard Time)
 * @Desc: Common options and redux functionality
 */

/**
 * import all files and screens
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loggedIn} from '../store/actions/loginActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
const UserOnBoarding: any = ConfigFn.getPluginFile('UserOnBoarding');
import {
  callSearchCancerAll, 
  callSearchCitiesAll, 
  callSearchCities,
  callSearchCancer, 
  callTreatment,
  callSearchCitiesData, 
  callSearchCancerData, 
  callUserDetails,
  callCancerStage, 
  callCuisine,
  callAcivity,
  callFactors,
  callSymptoms,
  callMedicalIssues,
  callMedication,
  loader,
  callGetAllDetail,
  treatmentData,
  getOnboard,
  callEditUserDetails
} from "../store/actions/onboardingActions"
import { createCustomer} from '../store/actions/ecommerceActions';
import {getCoachChatId} from '../store/actions/chatAction'

/**
 * changes done (state into props)
 */
const mapStateToProps = () => {
  return {};
};

/**
 * dispatch actions
 */
const mapDispatchToProps = (dispatch: any) => {
  const onboarding: any = {
    actions: {
      callSearchCancerAll: bindActionCreators(callSearchCancerAll, dispatch),
      callSearchCancer: bindActionCreators(callSearchCancer, dispatch),
      callSearchCitiesAll: bindActionCreators(callSearchCitiesAll, dispatch),
      callSearchCities: bindActionCreators(callSearchCities, dispatch),
      callTreatment: bindActionCreators(callTreatment, dispatch),
      callSearchCancerData: bindActionCreators(callSearchCancerData, dispatch),
      callSearchCitiesData: bindActionCreators(callSearchCitiesData, dispatch),
      callUserDetails: bindActionCreators(callUserDetails, dispatch),
      callCancerStage: bindActionCreators(callCancerStage, dispatch),
      callCuisine: bindActionCreators(callCuisine, dispatch),
      callAcivity: bindActionCreators(callAcivity, dispatch),
      callCountry: bindActionCreators(callCancerStage, dispatch),
      callSymptoms: bindActionCreators(callSymptoms, dispatch),
      callFactors: bindActionCreators(callFactors, dispatch),
      callMedicalIssues: bindActionCreators(callMedicalIssues, dispatch),
      callMedication: bindActionCreators(callMedication, dispatch),
      loader: bindActionCreators(loader, dispatch),
      callGetAllDetail: bindActionCreators(callGetAllDetail, dispatch),
      createCustomer: bindActionCreators(createCustomer, dispatch),
      loggedIn: bindActionCreators(loggedIn, dispatch),
      treatmentData: bindActionCreators(treatmentData, dispatch),
      getOnboard: bindActionCreators(getOnboard, dispatch), 
      callEditUserDetails: bindActionCreators(callEditUserDetails, dispatch), 
      getCoachChatId: bindActionCreators(getCoachChatId, dispatch), 
    }
  }
  return onboarding;
};

/**
 * connect state and action
 */
const UserOnBoardingContainer = connect(mapStateToProps, mapDispatchToProps)(UserOnBoarding);
export default UserOnBoardingContainer;
