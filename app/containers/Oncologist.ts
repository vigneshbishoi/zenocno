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
import {
} from '../store/actions/storiesActions';
import { loggedIn, otpData } from '../store/actions/loginActions';
/**
 * Import Other files
 */
import * as ConfigFn from '../config/fn-config';
import { bindActionCreators } from 'redux';
import { getOncologistList, getOncologistFilterList, getSpecialization } from '../store/actions/oncologistActions';
import { callCancerStage, callGetAllDetail, callSearchCancer, callSearchCancerAll, callSearchCancerData, callSearchCities, callSearchCitiesAll, callSearchCitiesData } from '../store/actions/onboardingActions';
const Oncologist: any = ConfigFn.getPluginFile('Oncologist');

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
  const oncologist: any = {
    actions: {
      getOncologistList: bindActionCreators(getOncologistList, dispatch),
      callSearchCitiesAll: bindActionCreators(callSearchCitiesAll, dispatch),
      callGetAllDetail: bindActionCreators(callGetAllDetail, dispatch),
      callSearchCancerAll: bindActionCreators(callSearchCancerAll, dispatch),
      callCancerStage: bindActionCreators(callCancerStage, dispatch),
      callSearchCities: bindActionCreators(callSearchCities, dispatch),
      callSearchCitiesData: bindActionCreators(callSearchCitiesData, dispatch),
      callSearchCancerData: bindActionCreators(callSearchCancerData, dispatch),
      callSearchCancer: bindActionCreators(callSearchCancer, dispatch),
      getOncologistFilterList: bindActionCreators(getOncologistFilterList, dispatch),
      getSpecialization : bindActionCreators(getSpecialization, dispatch)
    }
  }
  return oncologist
};

/**
 * connect state and action
 */
const OncologistContainer = connect(mapStateToProps, mapDispatchToProps)(Oncologist);
export default OncologistContainer;