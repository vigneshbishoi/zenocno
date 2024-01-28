/**
 * javascript comment
 * @Author: Anand R
 * @Date: 2021-11-21 22:07:51
 * @Desc: Navigation Logic & Session Handler
 */
import * as React from 'react';
import {
  Text,
  Dimensions,
  Image,
  LogBox,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { navigationRef, navigationNotfiRef } from './NavigationService';
import LoginScreen from '../containers/Login';
import LandingScreen from '../containers/Landing';
import LanguageSelection from '../containers/LanguageSelection';
import UserOnBoarding from '../containers/UserOnBoarding';
import Payment from '../containers/Payment';
import Notification from '../containers/Notification';
import Stories from '../containers/Stories';
import { FONTFAMILY } from '../config/font-config';
import Otp from '../containers/Otp';
import Comments from '../containers/Comments';
import Home from '../containers/Home';
import DietPlan from '../containers/DietPlan';
import CreateDietPlan from '../containers/CreateDietPlan';
import CreatePost from '../containers/CreatePost';
import { useSelector } from 'react-redux';
import AntiCancerDietPlan from '../containers/AntiCancerDietPlan';
import NutrientInformation from '../containers/NutrientInformation';
import FoodSearch from '../containers/FoodSearch';
import UnlockNow from '../containers/UnlockNow';
import ViewStory from '../containers/ViewStory';
import Benefits from '../containers/Benefits';
import WellnessCategoryContainer from '../containers/WellnessCategory';
import WellnessCategoryItemContainer from '../containers/WellnessCategoryItem';
import SuccessMessage from '../containers/SuccessMessage';
import MenuDetailContainer from '../containers/MenuDetailScreen';
import FaqContainer from '../containers/Faq';
import CommunitySearchContainer from '../containers/CommunitySearch';
import FilterCommunityContainer from '../containers/FilterCommunity';
import FilterBlogDiscussionContainer from '../containers/FilterBlogDiscussion';
import CommunityContainer from '../containers/Community';
import CommunityCommentContainer from '../containers/CommunityComment';
import ProfileMatchContainer from '../containers/ProfileMatches';
import ProfileScreenContainer from '../containers/ProfileScreen';
import EcommerceContainer from '../containers/Ecommerce';
import ProductDetailContainer from '../containers/ProductDetail';
import CartContainer from '../containers/Cart';
import CheckoutContainer from '../containers/Checkout';
import ReviewOrderContainer from '../containers/ReviewOrder';
import ReceivedOrderContainer from '../containers/ReceivedOrder';
import EditProfileContainer from '../containers/EditProfile';
import EventsContainer from '../containers/Events';
import EventFilterContainer from '../containers/EventFilter';
import EventsDetailContainer from '../containers/EventsDetail';
import CommunityFilterContainer from '../containers/CommunityFilter';
import { RootState } from '../store';
import VideoContainer from '../containers/VideoScreen';
import GroupDetailContainer from '../containers/GroupDetail';
import ViewallGroupContainer from '../containers/ViewallGroups';
import VideoPlayer from '../screens/Default/VideoPlayer/Index';
import ChatContainer from '../containers/Chat'
import JournalContainer from '../containers/Journal';
import JournalDatilContainer from '../containers/JournalDetail';
import ActivityCalendarContainer from '../containers/ActivityCalendar';
import AccountSettingContainer from '../containers/AccountSetting';
import NotificationContainer from '../containers/Notification';
import ActivityShowContainer from '../containers/ActivityShow';
import ClinicalTrialsContainer from '../containers/ClinicalTrials'
import SidebarSettingContainer from '../containers/SidebarSetting';
import ChatConversationsContainer from '../containers/ChatConversations';
import ChatSearchPeopleContainer from '../containers/ChatSearchPeople';
import AddMemoryContainer from '../containers/AddMemory';
import ReportContainer from '../containers/Report';
import AddReportsContainer from '../containers/AddReports';
import ChatVideoContainer from '../containers/ChatVideo';
import ChatAudioContainer from '../containers/ChatAudio';
import AddActivityContainer from '../containers/AddActivity';
import ProfileMatchDetailContainer from '../containers/ProfileMatchDetail';
import OncologistContainer from '../containers/Oncologist';
import OncologistBookContainer from '../containers/OncologistBook';
import LeaderBoardContainer from '../containers/LeaderBoard';
import SymptomsContainer from '../containers/Symptoms';
import ReportDetailContainer from '../containers/ReportDetail';
import SummaryContainer from '../containers/Summary';
import NotificationListContainer from '../containers/NotificationList'
import OncologistBookedContainer from '../containers/OncologistBooked';
import ReviewListContainer from '../containers/ReviewList';
import MyBookmarkContainer from '../containers/MyBookmark';
import MyOrdersContainer from '../containers/MyOrders';
import MyOrderDetailContainer from '../containers/MyOrderDetail';
import FinancialResourcesContainer from '../containers/FinancialResources';
import FinancialResourcesDetailContainer from '../containers/FinancialResourcesDetail';
import ZenPointsContainer from '../containers/ZenPoints';
import ReferEarnContainer from '../containers/ReferEarn';
import AddEventContainer from '../containers/AddEvent';
import SubscriptionContainer from '../containers/Subscription';
import SubscriptionDetailContainer from '../containers/SubscriptionDetail';
import NewsContainer from '../containers/News';
import NewsDetailContainer from '../containers/NewsDetail';
import VitalsMonitoringContainer from '../containers/VitalsMonitoring';
import VitalsDetailContainer from '../containers/VitalsDetail';
import EmergencyContactsContainer from '../containers/EmergencyContacts';
import PatientsContainer from '../containers/Patients';
import DoctorsListContainer from '../containers/DoctorsList';
import TimeSlotsContainer from '../containers/TimeSlots';
import DoctorDetailsContainer from '../containers/DoctorDetails';
import MyAppointmentContainer from '../containers/MyAppointment';
import WriteReviewContainer from '../containers/WriteReview';
import PatientReviewsContainer from '../containers/PatientReviews';
import VideoAppointmentContainer from '../containers/VideoAppointment';
import AppointmentConfirmContainer from '../containers/AppointmentConfirm';
import AppointmentCancellationContainer from '../containers/AppointmentCancellation';
import AppointmentCancelledContainer from '../containers/AppointmentCancelled';
import WebScreenContainer from '../containers/WebScreen';
import CouponsContainer from '../containers/Coupons';
import InfoContainer from '../containers/Info';
import FiltersContainer from '../containers/Filters';
import HomeNotificationContainer from '../containers/HomeNotification';
//Auth stacks components
const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack.Navigator initialRouteName='Zen.AddMemory' screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Transition as IOS
      }}>
        <HomeStack.Screen
          name="Zen.AddMemory"
          component={AddMemoryContainer}
          options={{ headerShown: false }}
        />
        {/* <AuthStack.Screen
          name="Zen.LanguageSelection"
          component={LanguageSelection}
          options={{
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: 'push',
            headerShown: false,
            headerBackTitle: undefined,
            headerBackTitleVisible: false,
          }}
        /> */}
        <AuthStack.Screen
          name="Zen.Benefits"
          component={Benefits}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.SuccessMessage"
          component={SuccessMessage}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        {/* <AuthStack.Screen name="Zen.LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} /> */}
        <AuthStack.Screen
          name="Zen.LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.Otp"
          component={Otp}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.UserOnBoarding"
          component={UserOnBoarding}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.Stories"
          component={Stories}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.Comments"
          component={Comments}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Home"
          component={Home}
          options={{ headerShown: false }}
        />

      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

const Navigator = (isLoggedIn: string) => {
  // const benifitObject: boolean = useSelector((state: any) => state.loginReducer.benifitObject);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  return (
    <View style={{ flex: 1, backgroundColor: '#020507' }}>
      {getData(isLoggedIn)}
      {/* <AuthStackScreen /> */}
    </View>
  );
};

const getData = (isLoggedIn: string) => {
  const internetConnected = useSelector(
    (state: RootState) => state.loginReducer.internetConnected,
  );
  const loginStatus = useSelector(
    (state: RootState) => state.loginReducer.loginStatus,
  );

  let dataToReturn;
  console.log("!234----", isLoggedIn)
  if (!internetConnected) dataToReturn = <NoInternetContainer />;
  else if (loginStatus) dataToReturn = <HomeNavigator />;
  // else dataToReturn = <HomeNavigator />;
  else dataToReturn = <AuthStackScreen />;

  return dataToReturn;
};

/**
 * @desc: No internet design container
 */
const NoInternetContainer = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#FFFFFF'} />
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/no_internet.png')}
          style={{ resizeMode: 'contain' }}
        />
        <Text
          style={{
            color: '#108FE5',
            marginTop: 15,
            fontFamily: FONTFAMILY.MEDIUM,
            fontSize: 17,
            textAlign: 'center',
          }}>
          No Internet Connection
        </Text>
        <Text
          style={{
            color: '#108FE5',
            fontSize: 15,
            marginTop: 2,
            textAlign: 'center',
          }}>
          {'Check your network and try again'}
        </Text>
      </View>
    </>
  );
};

//default screen setup
const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer ref={navigationNotfiRef}>
      <HomeStack.Navigator initialRouteName='Zen.Home' screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Transition as IOS
      }}>
        <HomeStack.Screen
          name="Zen.Community"
          component={CommunityContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.UserOnBoarding"
          component={UserOnBoarding}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AntiCancerDietPlan"
          component={AntiCancerDietPlan}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.FoodSearch"
          component={FoodSearch}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.NutrientInformation"
          component={NutrientInformation}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Stories"
          component={Stories}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Comments"
          component={Comments}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.CreateDietPlan"
          component={CreateDietPlan}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.DietPlan"
          component={DietPlan}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.UnlockNow"
          component={UnlockNow}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ViewStory"
          component={ViewStory}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zen.Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.MenuDetail"
          component={MenuDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.VideoScreen"
          component={VideoContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ViewallGroup"
          component={ViewallGroupContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.WellnessCategory"
          component={WellnessCategoryContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.WellnessCategoryItem"
          component={WellnessCategoryItemContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Faq"
          component={FaqContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.CommunitySearch"
          component={CommunitySearchContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.GroupDetail"
          component={GroupDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Filter"
          component={FilterBlogDiscussionContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.FilterCommunity"
          component={FilterCommunityContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.CommunityComment"
          component={CommunityCommentContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ProfileMatch"
          component={ProfileMatchContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ProfileScreen"
          component={ProfileScreenContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Ecommerce"
          component={EcommerceContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ProductDetail"
          component={ProductDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Cart"
          component={CartContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Checkout"
          component={CheckoutContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ReviewOrder"
          component={ReviewOrderContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ReceivedOrder"
          component={ReceivedOrderContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.EditProfile"
          component={EditProfileContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Events"
          component={EventsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.EventFilter"
          component={EventFilterContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.EventsDetail"
          component={EventsDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.CommunityFilterList"
          component={CommunityFilterContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.VideoPlayer"
          component={VideoPlayer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Chat"
          component={ChatContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Journal"
          component={JournalContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.JournalDetail"
          component={JournalDatilContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Calendar"
          component={ActivityCalendarContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AccountSetting"
          component={AccountSettingContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Notification"
          component={NotificationContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ActivityShow"
          component={ActivityShowContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ClinicalTrials"
          component={ClinicalTrialsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.SidebarSetting"
          component={SidebarSettingContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ChatConversations"
          component={ChatConversationsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ChatSearchPeople"
          component={ChatSearchPeopleContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AddMemory"
          component={AddMemoryContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Report"
          component={ReportContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AddReports"
          component={AddReportsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen

          name="Zen.ChatVideo"
          component={ChatVideoContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ChatAudio"
          component={ChatAudioContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AddActivity"
          component={AddActivityContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ProfileMatchDetail"
          component={ProfileMatchDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Oncologist"
          component={OncologistContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.OncologistBook"
          component={OncologistBookContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.LeaderBoard"
          component={LeaderBoardContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Symptoms"
          component={SymptomsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ReportDetail"
          component={ReportDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Summary"
          component={SummaryContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.NotificationList"
          component={NotificationListContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.OncologistBooked"
          component={OncologistBookedContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ReviewList"
          component={ReviewListContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.MyBookmark"
          component={MyBookmarkContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.MyOrders"
          component={MyOrdersContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.MyOrderDetail"
          component={MyOrderDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.FinancialResources"
          component={FinancialResourcesContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.FinancialResourcesDetail"
          component={FinancialResourcesDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ZenPoints"
          component={ZenPointsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.ReferEarn"
          component={ReferEarnContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AddEvent"
          component={AddEventContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Subscription"
          component={SubscriptionContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.SubscriptionDetail"
          component={SubscriptionDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.News"
          component={NewsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.NewsDetail"
          component={NewsDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.VitalsMonitoring"
          component={VitalsMonitoringContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.VitalsDetail"
          component={VitalsDetailContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.EmergencyContacts"
          component={EmergencyContactsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Patients"
          component={PatientsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.DoctorsList"
          component={DoctorsListContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.TimeSlots"
          component={TimeSlotsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.DoctorDetails"
          component={DoctorDetailsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.MyAppointment"
          component={MyAppointmentContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.WriteReview"
          component={WriteReviewContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.PatientReviews"
          component={PatientReviewsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.VideoAppointment"
          component={VideoAppointmentContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AppointmentConfirm"
          component={AppointmentConfirmContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AppointmentCancellation"
          component={AppointmentCancellationContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.AppointmentCancelled"
          component={AppointmentCancelledContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Info"
          component={InfoContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Zen.Coupons"
          component={CouponsContainer}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
           name="Zen.Filters"
           component={FiltersContainer}
           options={{ headerShown: false }}
         />
         <HomeStack.Screen
           name="Zen.WebScreen"
           component={WebScreenContainer}
           options={{ headerShown: false }}
         />
        <HomeStack.Screen
          name="Zen.HomeNotification"
          component={HomeNotificationContainer}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
