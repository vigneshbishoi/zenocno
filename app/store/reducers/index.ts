/*
 * combines all th existing reducers
 */
import * as loginReducer from './loginReducer';
import * as onboardingReducer from "./onboardingReducer"
import * as storiesReducer from "./storiesReducer"
import * as dietPlanReducer from "./dietPlanReducer"
import * as ecommerceReducer from "./ecommerceReducer"
import * as journalReducer from "./journalReducer"
import * as calendarReducer from "./calendarReducer"
import * as clinicalTrialsReducer from "./clinicalTrialsReducer"
import * as chatReducer from "./chatReducer"
import * as myReportsReducer from "./myReportsReducer"
import * as oncologistReducer from "./oncologistReducer"
import * as leaderboardReducer from './leaderboardReducer'
import * as profileMatchReducer from './profileMatchReducer'
import * as homeReducer from './homeReducer'
import * as homeSearchReducer from './homeSearchReducer'
import * as eventReducer from './eventReducer'
import * as referralReducer from './referralReducer'
import * as rpmReducer from './rpmReducer'
import * as patientReducer from './patientReducer'
import * as appointmentReducer from './appointmentReducer'
export default Object.assign(loginReducer, onboardingReducer, storiesReducer, dietPlanReducer, ecommerceReducer, journalReducer,
    calendarReducer,clinicalTrialsReducer,chatReducer, myReportsReducer, oncologistReducer, leaderboardReducer, profileMatchReducer,
    homeReducer, homeSearchReducer, eventReducer, referralReducer,rpmReducer, patientReducer, appointmentReducer);
