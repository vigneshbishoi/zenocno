// export action creators
import * as loginActions from './loginActions';
import * as onboardingActions from "./onboardingActions"
import * as storiesActions from "./storiesActions"
import * as dietPlanAction from "./dietPlanActions"
import * as ecommerceAction from "./ecommerceActions"
import * as journalAction from "./journalActions"
import * as calendarAction from "./calendarAction"
import * as clinicalTrialsAction from "./clinicalTrialsAction"
import * as chatAction from "./chatAction"
import * as oncologistAction from './oncologistActions'
import * as leaderboard from './leaderboardAction'
import * as profileMatch from './profileMatchActions'
import * as homeSearch from './homeSearch'
import * as eventAction from './eventAction'

export const ActionCreators = Object.assign({},
    loginActions,
    onboardingActions,
    storiesActions,
    dietPlanAction,
    ecommerceAction,
    journalAction,
    calendarAction,
    clinicalTrialsAction,
    oncologistAction,
    chatAction,
    leaderboard,
    profileMatch,
    eventAction,
    homeSearch);
