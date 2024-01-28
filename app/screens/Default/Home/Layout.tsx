
/**
 * Home layout page
 * @Author: Giri Madhan
 * @Date: Thu Dec 02 2021 10:53:59 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState, useEffect, useRef } from 'react';
import style from './Style';
import {
  View,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  AppState,
  Text,
  Alert,
  RefreshControl,
  Linking
} from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import SideBar from '../../../components/Home/SideBar';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import AppLoader from '../../../components/Plugins/AppLoader';
import { useIsFocused } from '@react-navigation/native';
import _, { update } from 'lodash';
import { RootState } from '../../../store';
import moment from 'moment'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CircularProgress from 'react-native-circular-progress-indicator';
import DateTimePicker from '@react-native-community/datetimepicker';
import CoachBack from '../../../assets/images/home_coach_arrow.svg'
import Back from '../../../assets/images/Back.svg'
import SelectItem from '../../../assets/images/selectitem.svg'
import SelectedIcon from '../../../assets/images/orangeSelected.svg'
import UnselectItem from '../../../assets/images/unselectitem.svg'
import Open from '../../../assets/images/open.svg'
import Add_Wellness from '../../../assets/images/addw.svg'
import Flame from '../../../assets/images/streak_active.svg'
import Unflame from '../../../assets/images/streak_gray.svg'
import Calendar from '../../../assets/images/calendaricon.svg'
import HeaderSlider from '../../../assets/images/headerSlider.svg'
import Diet from '../../../assets/images/deiticon.svg'
import Community from '../../../assets/images/Community_Home1.svg'
import Doctor from '../../../assets/images/Doctor.svg'
import WellnessIcon from '../../../assets/images/wellnessicon.svg'
import Community_top from '../../../assets/images/Community_Home.svg'
import Wellness_top from '../../../assets/images/Wellness_Home.svg'
import BannerImg from '../../../assets/images/homeBannerImg.svg'
import Products from '../../../assets/images/productsicon.svg'
import Anticancerdiet from '../../../assets/images/anticancerdieticon.svg'
import Consultoncologist from '../../../assets/images/consultoncologist.svg'
import Cancercoach from '../../../assets/images/cancercoach.svg'
import Antisupplimentor from '../../../assets/images/antisupplimentor.svg'
import ChatHome from '../../../assets/images/chat_home.svg'
import IntegrativeExpert from '../../../assets/images/integrativeexpert.svg'
import Search from '../../../assets/images/searchicon.svg'
import Message from '../../../assets/images/messageheader.svg'
import Messages from '../../../assets/images/Message1.svg'
// import Notification from '../../../assets/images/bell.svg'
// import Notification from '../../../assets/images/Notify.svg'
import Notification from '../../../assets/images/Notification1.svg'
import Hamburger from '../../../assets/images/hamburger.svg'
import Zencoins from '../../../assets/images/zencoins.svg'
import Coin from '../../../assets/images/Coin.svg'
import Support from '../../../assets/images/support.svg'
import Unsupport from '../../../assets/images/support_unselected.svg'
import ViewByPeople from '../../../assets/images/Group.svg';
import CommentWithLines from '../../../assets/images/CommentNew.svg';
import CancerPost from '../../../components/Community/CancerPost';
import SimilarFood from '../../../components/DietPlan/SimilarFood';
import { WellnessRender } from '../../../components/Home/Wellness';
import RenderGroup from '../../../components/Community/RenderGroup';
import SearchModal from '../../../components/Community/SearchModal';
import NotificationModal from '../../../components/Community/NotificationModal';
import TabBar from '../../../components/TabBar'
import Alert1 from "../../../components/AlertScreen/Index"
import EventItem from '../../../components/Home/EventHomeItem';
import LearningItem from '../../../components/Home/LearningSpaceItem';
import HopeItem from '../../../components/Home/HopeStoryItem';
import BannerItem from '../../../components/Home/BannerItem';
import { InstagramLoader } from 'react-native-easy-content-loader';
import translate from "../../../utils/Text"
import {
  apiCallForUpdateSupport, onClickHeart, openUserProfileScreen, addComments, apiCallDeletePost, apiCallMarkAsSpamList,
  apiCallReportList, updateSupoort, updateComment, handleReport, onPressBookMark
} from '../../../utils/communityFunction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { askForAndroidPermission, askForPermission, shortNameFunc } from '../../../utils/commonFunction'
import ReportOption from '../../../components/Community/ReportOption'
import SelectionTab from '../../../components/CommonInput/selectionTab'
import News from '../../../assets/images/news.svg'
import Toast from 'react-native-toast-message';
import {
  getAllStories,
  getSuccessImages
} from '../../../services/stories';
import request from '../../../services/client';
import { FONTFAMILY } from '../../../config/font-config';
import Button from '../../../components/CommonInput/navigateButton';
import { SvgCssUri } from 'react-native-svg';
import ShareOrAsk from '../../../components/CommonInput/shareOrAsk';
import AskExpert from '../../../assets/images/AskExpert.svg'
import FullScreenImage from '../../../components/Community/FullScreenImage';
import Modal from 'react-native-modal'
import Coach from '../../../assets/images/Coach_home.png'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



interface IProps {
  theme: any;
  actions: any;
  navigation: any;
  data: any
}

export const Header = ({ theme, redirectToCoach, onSuccessPress, props, data, showSearchModal, showFilterModal, showNotificationModal, allReadNotification, onImagePress }: any) => {
  const styles = style(theme);
  const [modalDisplay, setModalDisplay] = useState(false);


  return (
    <View style={styles.headerContainer}>
      <SideBar
        modalDisplay={modalDisplay}
        data={data}
        setModalDisplay={setModalDisplay}
        theme={theme}
        props={props}
        redirectToCoach={redirectToCoach}
        onSuccessPress={() => {
          onImagePress()
        }}
      />
      <View style={styles.headerVw}>
        <Pressable onPress={() => setModalDisplay(!modalDisplay)} style={styles.menuVw}>
          <Hamburger width={21} height={20} />
        </Pressable>
        {/* <Logo width={20} height={38} style={{ marginLeft: 10 }} /> */}
        <View style={styles.headerIconContainer}>
          {/* <Pressable style={styles.coinVw} onPress={() => props.navigation.navigate('Zen.ZenPoints')}>
             <Zencoins width={25} height={25} />
             <Text style={styles.coinTxt} >{coins}</Text>
           </Pressable> */}
          {/* <Pressable style={styles.headerIcon} onPress={showSearchModal}>
         <Search width={20} height={20} />
       </Pressable> */}
          <Pressable style={styles.headerSliderImg} onPress={() => onImagePress()}>
            <Image source={require('../../../assets/images/Status.png')} style={{ height: 45, width: 45, }} />
          </Pressable>
          <Pressable style={{ backgroundColor: theme.DARK_SILVER, padding: 3, borderRadius: 25 }}
            //  onPress={showFilterModal} 
            onPress={() => {
              Linking.openURL(`whatsapp://send?phone=${919880378899}`);
              // props.navigation.navigate('Zen.ChatConversations')}
            }}
          >
            <Image source={require('../../../assets/images/Message.png')} style={{ height: 40, width: 40, }} />
            {/* <Message width={21} height={21} /> */}
            {/* <Messages width={30} height={30} /> */}
          </Pressable>
          <Pressable style={{ marginLeft: 18, backgroundColor: theme.DARK_SILVER, padding: 3, borderRadius: 25 }} onPress={showNotificationModal}>
            {/* <Notification /> */}
            <Image source={require('../../../assets/images/Notification1.png')} style={{ height: 40, width: 40, }} />
          </Pressable>
          {/* <Pressable>
                  <Image style={[styles.headerIcon,{height:25,width:25}]} source={require('../../../assets/images/add.png')} />
                </Pressable>   */}
          {/* {allReadNotification === false &&
              <View style={styles.notificationDot} />
            } */}
        </View>
      </View>

      {/* <Pressable onPress={() => setShowSearchBar(!showSearchBar)}>
            <Image
              source={require('../../../assets/images/search.png')}
            />
          </Pressable> */}

      {/* <View style={{flex: 0.15, backgroundColor:'red'}}></View> */}
    </View>
  );
};
export const PictureMenuHalf = ({ theme, image, menuTitle }: any) => {
  const styles = style(theme);

  return (
    <Pressable>
      <View style={styles.halfMenuContainer}>
        <Image style={styles.halfMenuImage} source={image} />
        <Text style={styles.halfMenuTitle}>{menuTitle}</Text>
      </View>
    </Pressable>
  );
};
export const PictureMenu = ({
  theme,
  image,
  menuTitle,
  navigation,
  flow,
}: any) => {
  const styles = style(theme);
  const onSubmit = () => {
    if (flow.userDietPlanPreData == 0) {
      navigation.navigate('Zen.CreateDietPlan');
    } else {
      navigation.navigate('Zen.AntiCancerDietPlan');
    }
  };
  return (
    <Pressable onPress={() => onSubmit()}>
      <View style={styles.menuContainer}>
        <View style={styles.flexRow}>
          <Image style={styles.menuImage} source={image} />
          <Text style={styles.menuTitle}>{menuTitle}</Text>
        </View>
        <Image source={require('../../../assets/images/right.png')} />
      </View>
    </Pressable>
  );
};
export const BottomMenu = ({ theme, navigation, flow, action, onCoach }: any) => {
  const styles = style(theme);

  const onSubmit = () => {
    if (typeof flow == 'object' && flow[0].userDietPlanPreData == 0) {
      navigation.navigate('Zen.CreateDietPlan');
    } else {
      navigation.navigate('Zen.AntiCancerDietPlan');
    }
  };

  return (
    <View style={styles.bottomMenuContainer}>
      <Pressable style={styles.bottomBarItemVw} onPress={() => {
        navigation.navigate('Zen.Community')
      }}>
        <Community width={24} height={24} />
        <Text style={styles.iconText}>{translate("DRAWER")["COMMUNITY"]}</Text>
      </Pressable>

      <Pressable style={styles.bottomBarItemVw} onPress={() => navigation.navigate('Zen.WellnessCategory')}>
        <WellnessIcon width={26} height={21} />
        <Text style={styles.iconText}>{translate("DRAWER")["WELLNESS"]}</Text>
      </Pressable>

      <Pressable style={{
        width: '20%',
        alignItems: 'center',
      }}
        // onPress={() => navigation.navigate('Zen.CreatePost', { isfromHome: true, updateData: updateData })}>
        onPress={() => navigation.navigate('Zen.Community', { isfromHome: true })}>
        <AskExpert width={26} height={26} />
        {/* <Image source={require('../../../assets/images/magic.gif')} style={styles.askZenIcon} /> */}
        <Text style={[styles.iconText, { marginTop: 5 }]}>{translate("BOTTOMBAR")["ASK_ZENA"]}</Text>
      </Pressable>

      <Pressable style={styles.bottomBarItemVw}
        onPress={() => {
          Linking.openURL(`whatsapp://send?phone=${919880378899}`);
          //onSubmit();
          //onCoach()
          //navigation.navigate('Zen.DoctorsList')
        }}>
        {/* <Diet width={20} height={24} /> */}
        <ChatHome width={22} height={22} />
        <Text style={styles.iconText}>Cancer Coach</Text>
      </Pressable>

      {/* <Pressable style={styles.bottomBarItemVw}
        onPress={() => {
          // Linking.openURL(url);
          navigation.navigate('Zen.Ecommerce')
        }}>
        <Products />
        <Text style={styles.iconText}>Medicine</Text>
      </Pressable> */}
    </View>
  );
};

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [groupList, setGroupList] = useState([])
  const [communityList, setCommuityList] = useState([])
  const [successImages, setSuccessImages] = useState([])
  const [isFromSuccess, setIsFromSuccess] = useState(false)
  const [textShown, setTextShown] = useState(-1);
  const [featureArr, setFeatureArr] = useState([])
  const [mainArr, setMainArr] = useState([])
  const [catId, setCatId] = useState(0)
  const isFocused = useIsFocused();
  const [reloadPage, setReloadPage] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [allReadNotification, setAllReadNotification] = useState(false);
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [curDate, setCurDate] = useState(moment().format('ddd, MMM DD'))
  const [activeIndex, setActiveIndex] = useState(0);
  const [calling, setCalling] = useState(false)
  const [page, setPage] = useState(1)
  const [callStarted, setCallStarted] = useState(false)
  const [loadeMore, setLoadMore] = useState(true)
  const [postLoader, setPostLoader] = useState(true)
  const [isCatSelected, setIsCatSelected] = useState(false)
  const [remainingTime, setRemainingTime] = useState('')
  const [fromDetail, setFromDetail] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const [typeArr, setTypeArr] = useState([
    { key: '1', icon: <Cancercoach />, title: 'Get a cancer coach', onPress: () => showAlert() },
    // { key: '2', icon: <Anticancerdiet />, title: 'Anti-cancer diet', onPress: () => onPressItem('Zen.CreateDietPlan') },
    // { key: '3', icon: <Consultoncologist />, title: 'Consult oncologist', onPress: () => onPressItem('Zen.Oncologist') },
    { key: '3', icon: <Antisupplimentor />, title: 'Anti cancer Supplements', onPress: () => onPressItem('Zen.Ecommerce') },
    { key: '4', icon: <Community_top width={30} height={30} />, title: 'Join community', onPress: () => onPressItem('Zen.Community') },
    { key: '5', icon: <Wellness_top width={30} height={30} />, title: 'Improve wellness', onPress: () => onPressItem('Zen.WellnessCategory') },
    { key: '6', icon: <News width={30} height={30} />, title: 'News on cancer', onPress: () => onPressItem('Zen.News') },
    // { key: '5', icon: <IntegrativeExpert />, title: 'Integrative experts', onPress: () => { } }
  ])
  const [notiArr, setNotiArr] = useState([])
  const [scoreArr, setScoreArr] = useState([
    {
      key: '1', title: 'Your daily plan',
      features: [
        { fname: 'Physical activity', icon: require('../../../assets/images/home/Wellness.png'), time: '9 PM', isSel: false, selValue: 1 },
        { fname: 'Mental wellness', icon: require('../../../assets/images/home/Wellness.png'), time: '2 PM', isSel: false, selValue: 0 },
        { fname: 'Diet', icon: require('../../../assets/images/home/Wellness.png'), time: '2:15 PM', isSel: false, selValue: 0 },
      ]
    },
  ])
  const [dailyTask, setDailyTask] = useState([
    { key: '1', title: 'Morning Exercise' },
    { key: '2', title: 'Cycling beakfast ride' },
    { key: '3', title: 'Food' },
    { key: '4', title: 'Medicine' },
    { key: '5', title: 'Morning Exercise' },
    { key: '6', title: 'Food' },
  ])
  const [wellnessData, setWellnessData] = useState([]);
  const [similarFoodData, setSimilarFoodData] = useState();
  const [item, setItem] = useState({})
  const [result, setResult] = useState(0)
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7])
  const [visible, setVisible] = useState(false)
  const [numberofStreak, setNumberOfStreak] = useState(0)
  const [coins, setCoins] = useState(0)
  const [mediaArr, setMediaArr] = useState([]);
  const [emojiArr, setEmojiArr] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [topText, setTopText] = useState('');
  const [isMoodModal, setIsMoodModal] = useState(false);
  const [moodText, setMoodText] = useState(false);
  const [name, setName] = useState('');

  const loader = useSelector((state: RootState) => state.storiesReducer.loader);
  const userData = useSelector((state) => state.onboardingReducer.userDetails);

  const communityGroupData =
    useSelector((state: RootState) => state.storiesReducer?.communityGroupListData?.length > 0 ?
      state.storiesReducer.communityGroupListData[0] : []) || [];
  const calendarData = useSelector((state) => state?.calendarReducer?.calendarData != undefined && state?.calendarReducer?.calendarData?.length > 0 ?
    state?.calendarReducer?.calendarData[0]?.data : []);
  const allHomeData =
    useSelector((state: RootState) => state.homeReducer?.allHomeData ? state.homeReducer?.allHomeData[0] : []);
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userData?.data?.data?.id,
  );
  var chatData = useSelector(state => state?.chatReducer?.coachData?.length > 0 ?
    state?.chatReducer?.coachData[0]?.data : []);
  const eventCategory = useSelector((state: RootState) => state.eventReducer?.eventCategory?.length > 0 ?
    state.eventReducer.eventCategory[0]?.data : []) || [];
  const commentsData =
    useSelector((state: RootState) => state.storiesReducer?.commentsData?.length > 0 ?
      state.storiesReducer.commentsData[0]?.data : []) || [];
  const flowData = useSelector(
    (state: RootState) => state.dietPlanReducer.flowData,
  );
  const permission = useSelector((state) => state?.rpmReducer?.rpmpermission?.length > 0 ? state?.rpmReducer?.rpmpermission[0] : []) || [];
  const range = (start, end) => {
    let nums = [];
    for (let i = start; i < end; i++) {
      nums.push(i);
    }
    return nums;
  }
  const communityNotification =
    useSelector((state: RootState) => state.storiesReducer?.notification);

  useEffect(() => {
    getNotification()
  }, []);
  
  useEffect(() => {
    if (communityNotification?.length > 0) {
      setNotiArr(communityNotification[0]?.data)
    }
  }, [communityNotification]);
  useEffect(() => {
    if (calendarData?.length > 0) {
      setFeatureArr([])
      let allMarkDates: any = []
      setMainArr([])
      let feature1 = []
      calendarData?.map(item => {
        item.user_calendar_dailies.map(itemCalendar => {
          allMarkDates.push(itemCalendar.calendarDate)
          let endDate = itemCalendar.calendarDate + " " + itemCalendar.endTime
          let startDate = itemCalendar.calendarDate + " " + itemCalendar.startTime
          var diff = moment.duration(moment(endDate).diff(moment(startDate)));
          feature1.push({
            start: itemCalendar.calendarDate + " " + itemCalendar.startTime,
            end: itemCalendar.calendarDate + " " + itemCalendar.endTime,
            title: item.activity,
            summary: diff.asHours(),
            item: item,
            id: itemCalendar?.id,
            completed: itemCalendar?.completed,
          })
        })
      })
      setMainArr(feature1)
      filterFeature(curDate, feature1, 0)
      setReloadPage(!reloadPage)
    } else {
      setMainArr([])
      setFeatureArr([])
      setReloadPage(!reloadPage)
    }
  }, [calendarData != undefined])
  useEffect(() => {
    callMethods()
    getCoachData()
  }, []);
  useEffect(() => {
    if (allHomeData != undefined && allHomeData?.logged_in_user_data != undefined) {
      // if (allHomeData?.wellness_category?.length > 0) {
      //   let data = []
      //   allHomeData?.wellness_category?.map(item => {
      //     let arr = []
      //     let itemData = {}
      //     itemData.data = item
      //     arr.push(itemData)
      //     item.wellnesses.map(itemA => {
      //       let itemWell = itemA
      //       itemWell.wellCat = item.categoryName
      //       itemWell.calCat = item.calendar_category
      //       itemWell.wellnessCat = arr
      //       data.push(itemWell)
      //     })
      //   })
      //   setWellnessData(data)
      // }
      handleTimer()
      if (allHomeData?.subliminal?.length > 0) {
        setTopText(allHomeData?.subliminal[0]?.text)
      }
      setNumberOfStreak(allHomeData?.logged_in_user_data?.dailyStreak != undefined ? allHomeData?.logged_in_user_data?.dailyStreak : 0)
      setCoins(allHomeData?.points)
      let arr = []
      allHomeData?.tips_images?.map(item => {
        arr.push({
          uri: item.image
        })
      })
      setMediaArr(arr)
      let currentName = userData?.data?.name || translate("COMMONTEXT")["USER"]
      let splitData = currentName.split(' ')
      console.log("123", splitData)
      if(splitData.length > 0){
        setName(splitData[0])
      }
      if (allHomeData?.logged_in_user_data?.dailyStreak != undefined)
        findCloset(allHomeData?.logged_in_user_data?.dailyStreak)
    }
  }, [allHomeData])
  useEffect(() => {
    if (commentsData.id != undefined) {
      item.my_new_comment = [commentsData]
      item.comments_count = (item?.comments_count != undefined ? item?.comments_count : 0) + 1
      setReloadPage(!reloadPage)
      props.actions.addCommentsData(
        'commentsData',
        {},
        actionTypes.ADD_COMMENTS_DATA,
      )
    }
  }, [commentsData])
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      console.log("AppState", nextAppState);
      if (nextAppState === 'unknown' && userData != undefined) {
        console.log("123")
        var timerVal = await AsyncStorage.getItem('TIMER_START');
        if (timerVal != null) {
          AsyncStorage.setItem('TIMER_START', 'true');
          const handle = setInterval(setTimerMethod, 4 * 60 * 60000);
          setTimerMethod()
        }
      }
    })
    return () => {
      subscription.remove();
    };
  }, [])
  const setTimerMethod = () => {
    Platform.OS == 'android' ? askForAndroidPermission(props, permission, () => { }, userId) : askForPermission(() => { }, permission, props, userId)
  }

  //Api Call
  const getNotification = () => {
    props.actions.getNotification(actionTypes.GET_NOTIFICATION, {
      module: 'notification_type',
      action: 'getNotificationHistory',
    });
  }
  const getCoachData = () => {
    var inputRequest = {
      module: "chat",
      action: "chat_with_coach"
    }
    props.actions.getCoachChatId(actionTypes.COACH_CHAT, inputRequest)
  }
  const getReportOptions = () => {
    props.actions.reportOption(actionTypes.REPORT_OPTIONS, {
      module: 'cancer_healing_story_report',
      action: 'get_story_report_option',
    });
  }
  const getCalendarData = () => {
    props.actions.getCalendar(actionTypes.GET_CALENDAR, {
      module: 'user_calendar',
      action: 'getByUserId',
      formData: {
        user_id: userId,
      }
    });
  }
  const apiCallForGetGroups = () => {
    setGroupList([])
    props.actions.getCommunityGroupListData(actionTypes.GET_COMMUNITY_GROUP_LIST_DATA, {
      module: 'post_subcategory',
      action: 'get_post_subcategories_summary',
      formData: {
        user_id: userId,
      },
    });
  }
  const apiCallForAllHome = () => {
    props.actions.allHome(actionTypes.ALL_HOME, {
      module: 'home_screen',
      action: 'getAll?user_id=' + userId,
      formData: {
        user_id: userId,
      },
    });
  }
  const apiCallForDiet = () => {
    props.actions.chcekFlow(actionTypes.CHECK_FLOW_DIET_PLAN, {
      module: 'dietPreference',
      action: 'checkUserDietPlanData',
      formData: { userId: userId },
    });
  }
  const apiCallForGetCategories = () => {
    props.actions.getCommunityCategoryListData(actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA, {
      module: 'post_category',
      action: 'getAll',
    });
  }
  const apiCallForJoinGroup = (item) => {
    props.actions.joinGroup(actionTypes.POST_JOIN_GROUP, {
      module: 'user_follow',
      action: 'create_update_group',
      formData: {
        "userId": userId,
        "followPostSubCategoryId": item.id
      }
    });
    if (item?.user_follows?.length > 0) {
      let filter = item.user_follows.filter((item: any) => item.userId == userId)
      if (filter.length > 0) {
        filter[0].status = filter[0].status == 1 ? 0 : 1
      } else {
        item.user_follows.push({ userId: userId, status: 1 })
      }
    } else {
      item.user_follows = [{ userId: userId, status: 1 }]
    }
    setReloadPage(!reloadPage)
  }
  const apiCall = async (page: number, filter: any, id: number) => {
    let payload = {
      module: 'cancerHealingStory',
      action: 'stories_all_in_one',
    };
    let data = {
      send_filter: filter == 'Most recent' ? 'most_recent' : 'most_support',
      page: page,
    };
    const response = await getAllStories(data, payload, 'GET');
    setPage(page + 1);
    if (response.status == 1) {
      setCalling(true)
      setPostLoader(false)
      let data1 = response.data
      setLoadMore(data1.length < 9 ? false : true)
      if (page == 1) {
        setCommuityList(data1)
      } else {
        setCommuityList(communityList.concat(data1))
      }
    } else {
      setPostLoader(false)
      setLoadMore(false)
    }

  }
  const apiCallForSuccessStories = async () => {
    let payload = {
      module: 'cancerHealingStory',
      action: 'get_success_stories',
    };
    const response = await getSuccessImages({}, payload, 'GET');
    if (response.status == 1) {
      let arr = []
      response?.zen_success_stories?.map(item => {
        arr.push({
          uri: item.image
        })
      })
      setSuccessImages(arr)
    } else {
      Toast.show({
        type: 'success',
        text1: "something went wrong",
      })
    }

  }
  const createStreak = (id: any, date: any) => {
    props.actions.creatStreak(actionTypes.CREATE_STREAK, {
      module: 'daily_streak',
      action: 'create?id=' + id,
      formData: {
        date: date
      }
    });
  }

  //Helper Methods
  const callMethods = () => {
    getReportOptions()
    setCallStarted(true)
    apiCall(1, 'Most recent')
    apiCallForAllHome();
    getCalendarData()
    apiCallForDiet()
    apiCallForGetCategories()
    apiCallForSuccessStories()
  }
  const getGroupData = () => {
    let allData = []
    if (communityGroupData?.data?.length > 0) {
      if (communityGroupData.pined_group.length > 0) {
        communityGroupData.pined_group.map((item: any) => {
          item.pinFlag = true
          allData.push(item);
        })
      }

      if (communityGroupData?.data.length > 0) {
        communityGroupData?.data.map((item: any) => {
          item.pinFlag = false
          allData.push(item);
        })
      }
    }
    setGroupList(allData);
  }
  const onPressItem = (str) => {
    props.navigation.navigate(str)
  }
  const onchange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowDate(false)
    // setCurDate(currentDate)
  }
  const registerEvent = (id, type) => {
    props.actions.registerEvent(actionTypes.REGISTER_EVENT, {
      module: 'broadcast_event',
      action: 'broadcast_event_register',
      formData: {
        userId: userId,
        eventId: id,
        join_register: type
      }
    });
    if(type != 'join'){
      Toast.show({
        type: 'success',
        text1: "You have registered for this event",
      })
    }
  }
  const showAlert = () => {
    Alert.alert(
      "",
      translate("HOME")["ALERT_MESSAGE"],
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: translate("COMMONTEXT")["CONTINUE"], onPress: () => {
            props.navigation.navigate('Zen.EditProfile', { isfromHome: true })
          }
        }
      ]
    )
  }
  const onPressCancerCoach = () => {
    // let user = {
    //   name: chatData?.name,
    //   image: chatData?.image ? chatData?.image : null,
    //   userId: chatData?.userId ? chatData?.userId : "",
    //   cancerName: chatData?.cancer_category?.name ? chatData?.cancer_category?.name : "",
    //   cancerStage: chatData?.cancer_stage?.cancer_stage ? chatData?.cancer_stage?.cancer_stage : ""
    // }
    // props.navigation.navigate('Zen.Chat', { user: user });
    Linking.openURL(`whatsapp://send?phone=${919880378899}`);
  }
  const joinEvent = (item, type) => {
    registerEvent(item.id, type)
  }
  const updateItem = (item) => {
    item.broadcast_events_registers = [{ userId: 1 }]
    setReloadPage(!reloadPage)
  }
  const showSearchModal = () => {
    setSearchVisible(!searchVisible);
  }
  const showNotificationModal = () => {
    props.navigation.navigate('Zen.HomeNotification')
    // setNotificationVisible(!notificationVisible);
    // getNotification()
  }
  const typreRenderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.typeItem} onPress={(str) => item.onPress(str)} >
        <View style={{ alignItems: 'center', height: '100%' }} >
          <View style={{ width: 30, alignItems: 'center', overflow: 'hidden', justifyContent: 'flex-end', height: '48%' }} >
            {item.icon}
          </View>
          <View style={{ marginHorizontal: 8, alignItems: 'center', marginTop: 5, height: '52%' }} >
            <Text style={styles.typeName} numberOfLines={2} >{item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  const statusRenderItem = ({ item, index }) => {
    return (
      <EventItem
        item={item}
        updateItem={updateItem}
        joinEvent={joinEvent}
        theme={theme}
        navigation={props.navigation}
        isfromHome={true}
        homePress={() => {onPressItem('Zen.Events')}}
        itemArr={allHomeData?.event_data}
      />
    );
  }
  const statusLearningItem = ({ item, index }) => {
    return (
      <LearningItem
        item={item}
        theme={theme}
        onPress={() => {
          setIsFromSuccess(false)
          setIsEmoji(false)
          setTimeout(() => {
            setImageModal(true)
          }, 600)
        }}
      />
    );
  }
  const storiesItem = ({ item, index }) => {
    return (
      <HopeItem
        item={item}
        theme={theme}
        onPress={(item) => {
          props.navigation.navigate('Zen.CommunityComment', {
            id: item.id, item: item,
            updateSupport: updateSupport,
            updateComment: updateCommentDetail,
            handleReport: handleReportDetail,
            updateBookMark: updateBookMark
          })
        }}
      />
    );
  }
  const bannerItem = ({ item, index }) => {
    return (
      <BannerItem
        item={item}
        theme={theme}
      />
    );
  }
  const foodRenderItem = ({ item, index }) => {
    return (
      <SimilarFood
        theme={theme}
        item={item}
        index={index}
      />
    );
  }
  const profileRenderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.profileItemView} onPress={() => { props.navigation.navigate('Zen.ProfileMatchDetail', { item: item }) }}>
        <ImageBackground source={item?.image ? { uri: item?.image } :
          require('../../../assets/images/profileImage.png')} style={styles.profileImg} >
          <View style={styles.percentageView}>
            <Text style={styles.percentageText} numberOfLines={1} >{item.title} {translate("COMMONTEXT")["MATCH"]}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  }
  const renderInterestItem = ({ item, index }) => {
    return (
      <RenderGroup
        theme={theme}
        item={item}
        navigation={props.navigation}
        apiCallForGetGroups={apiCallForGetGroups}
        apiCallForJoinGroup={(item) => apiCallForJoinGroup(item)}
      />
    );
  }
  const renderItem = (item, index) => {
    return (
      <View style={[styles.slide]}>
        {index === 0 &&
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
              {/* <Text style={styles.slideHeader}>{item.title}</Text>  */}
              <Text style={styles.slideHeader}>Daily Guide</Text>

              <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                <Pressable style={[styles.nextPreIconVw]} onPress={() => previosDate()}>
                  <Back width={8} height={15} />
                </Pressable>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center", width: 90 }}>
                  {/* <Pressable onPress={() => {
                       // setShowDate(true)
                     }}>
                       <Calendar width={15} height={16} />
                     </Pressable> */}
                  <Text style={styles.currentDateText}>{curDate}</Text>
                </View>
                <Pressable style={[styles.nextPreIconVw]} onPress={() => nextDate()} >
                  <Back width={8} height={15} style={{ transform: [{ rotateY: '180deg' }] }} />
                </Pressable>
              </View>

              <Button height={30} width={51} marginTop={-2} theme={theme} borderRadius={3} buttonText="Add" fontSize={12}
                onPress={() => props.navigation.navigate('Zen.AddActivity', {
                  getCalendarData:getCalendarData
                })}
              />
            </View>

            <FlatList
              style={{ marginHorizontal: 20, height: featureArr.length > 6 ? Platform.OS == 'ios' ? 152 : 190 : featureArr?.length * 32 }}
              data={featureArr}
              nestedScrollEnabled={true}
              bounces={false}
              showsVerticalScrollIndicator={true}
              renderItem={renderFeatures}
            />

            {/* <View style={styles.seperatorView} /> */}

            {/* <Pressable style={styles.addInputVw} onPress={() => props.navigation.navigate('Zen.AddActivity')}  >
               <Text style={styles.addActivityTxtInput}>{translate("HOME")['ACTIVITY_PLACEHOLDER']}</Text>
               <View style={{ padding: 5 }}>
                 <Add_Wellness width={20} height={20} />
               </View>
             </Pressable> */}

            <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={[styles.streakTxt, { width: '90%', fontFamily: FONTFAMILY.POPPINS_MEDIUM }]} >{translate("HOME")["STREAK"]} <Text style={[styles.streakTxt, { color: theme.SUB_TITLE }]}>: {remainingTime} {`${translate("HOME")["TO_COMPLETE"]}`} </Text> </Text>
                <Pressable style={[styles.coinVw, { alignItems: "center", position: 'absolute', right: 10 }]} onPress={() => props.navigation.navigate('Zen.ZenPoints')}>
                  <Image source={require('../../../assets/images/$.png')} style={{ height: 30, width: 30 }} />
                  <Text style={styles.coinTxt} >{coins}</Text>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10, width: '100%' }}>
                {
                  nums.map((item, index) => {
                    return (
                      <View style={{ marginHorizontal: 4, justifyContent: "center" }}>
                        {item > numberofStreak ?
                          <Unsupport />
                          : <Support />}
                        <Text style={styles.weekDayNameText}>{item}</Text>
                      </View>
                    );
                  })
                }
                <View style={{ position: 'absolute', right: 0 }}>
                  <CircularProgress
                    value={result}
                    fontSize={11}
                    radius={25}
                    inActiveStrokeColor={'dodgerblue'}
                    inActiveStrokeWidth={7}
                    activeStrokeWidth={7}
                    activeStrokeColor={'dodgerblue'}
                    progressValueColor={'#000'}
                    inActiveStrokeOpacity={0.3}
                    valueSuffix={'%'} />
                </View>
              </View>

              {/* <View style={{ marginRight: 15 }} >
                 <CircularProgress
                   value={result}
                   fontSize={11}
                   radius={34}
                   inActiveStrokeColor={'dodgerblue'}
                   inActiveStrokeWidth={7}
                   activeStrokeWidth={7}
                   activeStrokeColor={'dodgerblue'}
                   progressValueColor={'#000'}
                   inActiveStrokeOpacity={0.3}
                   valueSuffix={'%'} />
               </View> */}
            </View>
          </View>}

        {index === 1 &&
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.zenIoText}>{translate("HOME")["CLINICAL"]}</Text>
                <Text style={[styles.zenIoText, { fontWeight: '500' }]}>{translate("HOME")["SCORE"]}</Text>
              </View>

              <View style={{ right: 0, position: 'absolute' }}>
                <CircularProgress
                  progressValueFontSize={10}
                  value={72}
                  inActiveStrokeColor={'dodgerblue'}
                  activeStrokeColor={'dodgerblue'}
                  progressValueColor={'#000'}
                  valueSuffix={'%'} />
              </View>
            </View>
            <Text style={styles.nextAssessmentText}>{translate("HOME")["ASSESSMENT"]}</Text>

            <Pressable style={[styles.takeAssButton, { marginVertical: 40 }]}>
              <Text style={styles.takeAssText}>{translate("HOME")["TAKE_NOW"]}</Text>
            </Pressable>
          </View>}
      </View>
    );
  }
  const renderFeatures = ({ item, index }) => {
    let currentDate = moment().format('YYYY-MM-DD')
    return (
      <>
        <View style={[styles.featureItemView]}>
          <Pressable
            style={{ height: 27, width: 27, alignItems: "center", justifyContent: "center" }}
            disabled={moment(item.start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') ? false : true}
            onPress={() => {
              let date = moment(item.start).format('YYYY-MM-DD')
              if (date === currentDate) {
                createStreak(item.id, date)
                item.completed = item.completed == 1 ? 0 : 1
                filterFeature(item.start, featureArr, 1)
                setReloadPage(!reloadPage)
                setTimeout(() => {
                  apiCallForAllHome();
                }, 600)
              }
            }}
          >
            {item.completed == 1 ?
              // <SelectItem width={13} height={13} /> :
              <SelectedIcon width={15} height={15} /> :
              <UnselectItem width={15} height={15} />
            }
          </Pressable>
          <Text style={styles.featuresItemText} numberOfLines={1} onPress={() => {
            props.navigation.navigate('Zen.AddActivity', {
              item: item.item,
              isEdit: true,
              getCalendarData:getCalendarData
            })
          }}>{item.title}</Text>
          {item.item.wellnessId != 0 &&
            <Pressable style={styles.openLinkVw} onPress={() =>
              props.navigation.navigate('Zen.WellnessCategoryItem', {
                item: item?.item?.wellness,
                WellNessCategoryById: item?.item?.calendar_category,
              })} >
              <Open width={15} height={15} />
            </Pressable>
          }
          {/* <Text style={styles.featureTime}>{item.summary}</Text> */}
        </View>
        {index < featureArr.length - 1 &&
          <View style={styles.dottedView} />
        }
      </>
    );
  }
  const pagination = () => {
    return (
      <Pagination
        dotsLength={2}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingVertical: -8 }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#108FE5'
        }}
        inactiveDotStyle={{
          backgroundColor: theme.PRIMARY
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }
  const previosDate = () => {
    utility(0)
    setReloadPage(!reloadPage)
  }
  const nextDate = () => {
    utility(1)
    setReloadPage(!reloadPage)
  }
  const utility = (flag) => {
    let newDate = ''
    if (flag == 0) {
      newDate = moment(curDate, "ddd, MMM DD").subtract(1, "day").format("ddd, MMM DD");
    } else if (flag == 1) {
      newDate = moment(curDate, "ddd, MMM DD").add(1, "day").format("ddd, MMM DD");
    }
    setCurDate(newDate)
    filterFeature(newDate, mainArr, 0)
    setReloadPage(!reloadPage)
  }
  const filterFeature = (date, featureArr1, flag) => {
    let convertCurDate;
    if (flag == 1) {
      convertCurDate = moment(date).format('YYYY-MM-DD')
    } else {
      convertCurDate = moment(date, 'DD MMM').format('YYYY-MM-DD')
    }
    let arr1 = []
    let completedArr = []
    featureArr1.map(item => {
      let convertStart = moment(item.start).format('YYYY-MM-DD')

      if (convertStart == convertCurDate) {
        arr1.push(item)
        if (item.completed == 1) { completedArr.push(item) }
      }
    })
    setFeatureArr(arr1)
    let result1 = Math.floor((completedArr.length / arr1.length) * 100)
    setResult(isNaN(result1) ? 0 : result1)
  }
  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 100;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }
  const refresh = () => { }
  const updateSupport = (item) => {
    updateSupoort(item, reloadPage, setReloadPage)
  }
  const updateCommentDetail = (item, type, id) => {
    updateComment(item, type, id, reloadPage, setReloadPage)
  }
  const handleReportDetail = (item) => {
    handleReport(item, communityList, setCommuityList, reloadPage, setReloadPage, false)
  }
  const findCloset = (n) => {
    if (n > 0) {
      if (n % 7 == 0) {
        let range1 = range(n - 6, n)
        console.log("123", range1)
        setNums(range(n - 6, n + 1))
      } else {
        let m = 7
        let q = Math.floor(n / m);
        let n1 = m * q;
        n1 = n1 > 0 ? n <= 7 ? 1 : (n1 % 7 == 0) ? n1 + 1 : n1 : 1
        let n2 = (n * m) > 1 ? (m * (q + 1)) : (m * (q - 1));
        // if (Math.abs(n - n1) < Math.abs(n - n2)) {
        let range1 = range(n1, n1 + 7)
        console.log("123", range1)
        setNums(range(n1, n1 + 7))
        // } else {
        //   setNums(range(n2, n2 + 7))
        // }
      }

    }
  }
  const updateBookMark = (item: any) => {
    communityList.map((itemA: any) => {
      if (itemA.id == item.id) {
        if (itemA.cancer_healing_story_bookmarks.length > 0) {
          itemA.cancer_healing_story_bookmarks = []
        } else {
          itemA.cancer_healing_story_bookmarks = [{ userId: userId }]
        }
      }
    })
    setCommuityList([...communityList])
    setReloadPage(!reloadPage)
  }
  const handleTimer = () => {
    const handle = setInterval(calculateTImer, 1000);
  }
  const calculateTImer = () => {
    let getNextDay = moment().add(1, 'day').format('YYYY-MM-DD')
    let time = '24:00'
    let getNextDayTime = moment(getNextDay + ' ' + time).add(1, 'day')
    let currentTime = moment()
    let seconds = getNextDayTime.diff(currentTime, 'seconds')
    var hours = parseInt(seconds / 3600) % 24;
    var minutes = parseInt(seconds / 60) % 60;
    //setRemainingTime(moment.utc(getNextDayTime.diff(currentTime)).format('HH:mm'))
    setRemainingTime(hours + 'h ' + minutes + 'm' )
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    callMethods()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, []);
  const updateData = () => {
    apiCall(1, 'Most recent')
  }
  const NotificationPress = async (item) => {
    const formDataNew = new FormData();
    formDataNew.append('notificationTypeId', item?.notificationTypeId);
    formDataNew.append('notification_id', item?.id);
    props.actions.getNotificationRead(actionTypes.GET_NOTIFICATION_READ, {
      module: 'user_notification',
      action: 'read_notification',
      formData: JSON.stringify({
        notificationTypeId : item?.notificationTypeId,
        notification_id : item?.id
        // formDataNew
      })
    });
    if (item?.notificationTypeId > 1 && item?.notificationTypeId < 6) {
      setNotificationVisible(false)
      props?.navigation?.navigate('Zen.CommunityComment', {
        id: item.cancerHealingStoryId,
      })
    }
    if(item?.notificationTypeId == 10)
    {
      setNotificationVisible(false)
      props.navigation.navigate('Zen.MyAppointment')
    }
    if(item?.notificationTypeId == 8)
    {
      setNotificationVisible(false)
      props.navigation.navigate('Zen.ActivityShow')
    }
    if(item?.notificationTypeId == 6)
    {
      try {
        let getData = await request({
          method: 'get', data: {
            module: 'cancerHealingStory',
            action: 'stories_all_in_one?page=1',
            formData: {
              story_id: item?.cancerHealingStoryId
            }
          }
        })

        if (getData?.data?.data != undefined && getData?.data?.data != null) {
          setNotificationVisible(false)
          openUserProfileScreen(getData?.data?.data, props.navigation, theme, () => { })
        }
      } catch (error) {

      }
    }
    if (item?.notificationTypeId == 7) {
      try {
        let eventData = await request({
          method: 'get', data: {
            module: 'broadcast_event',
            action: 'broadcast_event_by_id',
            formData: {
              eventId : item?.cancerHealingStoryId
            }
          }
        })
        if (eventData?.data?.data != undefined && eventData?.data?.data != null) {
          setNotificationVisible(false)
          props.navigation.navigate('Zen.EventsDetail', { item: eventData?.data?.data[0]})
        }
      } catch (error) {

      }
    }
    setNotificationVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <Header
        theme={props.theme}
        data={userData}
        props={props}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
        showSearchModal={showSearchModal}
        showNotificationModal={showNotificationModal}
        coins={coins}
        showAlert={() => showAlert()}
        redirectToCoach={onPressCancerCoach}
        onImagePress={() => {
          setIsEmoji(false)
          setIsFromSuccess(true)
          setTimeout(() => {
            setImageModal(true)
          }, 600)
        }}
        allReadNotification={allReadNotification} />
      {/* {postLoader && ( */}
      <InstagramLoader active listSize={postLoader ? 10 : 0} />
      {/* )}
       {!postLoader && */}
      <ScrollView style={styles.container} bounces={true} showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isScrollviewCloseToBottom(nativeEvent)) {
            if (loadeMore && calling) {
              setCalling(false)
              apiCall(page, 'Most recent', isCatSelected ? catId : 0)
            }
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        scrollEventThrottle={400}>
        <View style={styles.userInfoVw} >
          <View>
            {/* <Text style={styles.welcomeTxt} >{translate("HOME")["WELCOME"]}</Text> */}
            <Text style={[styles.welcomeTxt,]} >{topText}</Text>
            <Text style={styles.userNameTxt} numberOfLines={1} >{userData?.data?.name || translate("COMMONTEXT")["USER"]}</Text>
            <Text style={[styles.userNameTxt, { marginTop: Platform.OS === 'ios' ? 0 : -3, fontSize:12, }]} > 
                  {shortNameFunc(
                     userData)}
                </Text>
          </View>
          <Pressable style={styles.userPhotoView} onPress={() => {
            let item = {};
            item.author_detail = { id: userId, user_details: [{}] }
            props.navigation.navigate('Zen.ProfileScreen', {
              isFromHome: true,
              item: item
            });
          }}>
            {/* <Image style={styles.userPhoto} source={require('../../../assets/images/home/Healingbanner.png')} /> */}
            <Image style={styles.userPhoto} source={userData?.data?.image == null ? require('../../../assets/images/profileImage.png') : { uri: userData?.data?.image }} />
          </Pressable>
        </View>

        {/* <View style={styles.bannerView}>
           <Text style={styles.bannerTxt}>Early detecttion saves lives</Text>
           <BannerImg />
         </View> */}
        <FlatList
          data={allHomeData?.quotations_text}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={bannerItem} />

        <Pressable style={[styles.bannerView, { backgroundColor: '#389CDF' }]} onPress={() => {
          onPressCancerCoach()
        }}>
          <Image source={require('../../../assets/images/Coach_home.png')} style={styles.itemImage} />
          <Text style={styles.bannerTxt}>Connect with cancer coach</Text>
          <CoachBack width={8} height={10} />
        </Pressable>


        {/* <FlatList
           data={typeArr}
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={{ paddingLeft: 15 }}
           renderItem={typreRenderItem} /> */}

        {/* <Carousel
           layout={"default"}
           data={scoreArr}
           renderItem={renderItem}
           inactiveSlideScale={0.8}
           inactiveSlideOpacity={0.8}
           sliderWidth={Dimensions.get('window').width}
           itemWidth={Dimensions.get('window').width - 40}
           activeSlideAlignment={'center'}
           activeAnimationType={'spring'}
           activeAnimationOptions={{
             bounciness: 1,
             speed: 10
           }}
           onSnapToItem={(index) => {
             setResult(result1)
             setActiveIndex(index)
           }}
         /> */}

        <View>
          {scoreArr.map((item, index) => {
            return (
              <>
                {renderItem(item, index)}
              </>
            );
          })}
        </View>
        <View style={styles.seperatorView} />

        <View style={{ paddingHorizontal: 15 }}>
          {/* <Text style={{ fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 16, color: theme.BLACK, alignSelf: "center" }}>How are you feeling today, {name}?</Text> */}
          <Text style={[styles.supportGpText, {marginBottom: 2, }]}>How are you feeling today, {name}?</Text>
          <FlatList
            data={allHomeData?.tips_mood}
            horizontal
            bounces={false}
            style={{ marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ marginLeft: 10, width: (width / 6.6) }}>
                  <Pressable onPress={() => {
                    setMoodText(item?.tips_mood_solutions?.length > 0 ? item?.tips_mood_solutions[0]?.tips : '')
                    let arr = [{
                      uri: item?.tips_mood_solutions?.length > 0 ? item?.tips_mood_solutions[0]?.tips : ''
                    }]                    
                    setEmojiArr(arr)
                    setIsEmoji(true)
                    setTimeout(() => {
                       setImageModal(true)
                    }, 600)
                  }} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    {item.image.endsWith('.svg') ?
                      <SvgCssUri width={40} height={40} style={styles.topicIcon} uri={item?.image} />
                      : <Image source={{ uri: item.image }} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
                    }
                  </Pressable>
                  <Text style={{ marginTop: 5, fontSize: 12, textAlign: 'center' }}>{item.mood}</Text>
                </View>
              )
            }}
          />
        </View>
        <View style={styles.seperatorView} />
        <View style={[styles.titleContainer, { marginBottom: 8, marginTop: -10, paddingHorizontal: 10 }]}>
          <Text style={styles.supportGpText}>{translate("HOME")["GROUP"]}</Text>
          <Pressable style={styles.viewAllVw} onPress={() => { props.navigation.navigate('Zen.ViewallGroup') }}>
            <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
          </Pressable>
        </View>
        <FlatList
          data={allHomeData?.pined_group}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={renderInterestItem} />
        <View style={[styles.seperatorView, { marginTop: 0 }]} />
        <View style={[styles.titleContainer, { marginBottom: 8, marginTop: -10, paddingHorizontal: 10 }]}>
          <Text style={styles.supportGpText}>{translate("HOME")["EXPERTS"]}</Text>
          <Pressable style={styles.viewAllVw} onPress={() => { props.navigation.navigate('Zen.Community', { isfromHome: true }) }}>
            <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
          </Pressable>
        </View>

        <View style={[styles.writeSomeView]}>
          <ShareOrAsk
            theme={theme}
            borderColor={theme.PRIMARY}
            borderWidth={4}
            paddingHorizontal={15}
            right={20}
            data={userData}
            text={translate("COMMONTEXT")["ASK_YOUR_QUESTION_HERE"]}
            onPress={() => {
              if (userData == undefined || Object.keys(userData).length == 0) {
                props.navigation.navigate('Zen.UserOnBoarding')
              } else {
                props.navigation.navigate('Zen.CreatePost', {
                  isfromHome: true,
                  updateData: callMethods
                })
              }
            }}
          />
        </View>

        <FlatList
          data={allHomeData?.question_answer_stories}
          horizontal
          style={{ marginHorizontal: 0}}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: width }}>
                <CancerPost
                  item={item}
                  theme={theme}
                  isFrom={'HomeExpert'}
                  onPress={(item) => {
                    setFromDetail(true)
                    props.navigation.navigate('Zen.CommunityComment', {
                      id: item.id, item: item,
                      updateSupport: updateSupport,
                      updateComment: updateCommentDetail,
                      handleReport: handleReportDetail,
                      updateBookMark: updateBookMark
                    })
                  }}
                  onPressBookMark={(item) => onPressBookMark(props.actions, item, reloadPage, setReloadPage, userId)}
                  // onPressPin={onPressPin}
                  onSupport={(item) => apiCallForUpdateSupport(props.actions, item, reloadPage, setReloadPage, userId)}
                  // apiCallFollowList={apiCallFollowList}
                  apiCallMarkAsSpamList={(item) => apiCallMarkAsSpamList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
                  apiCallReportList={(item) => apiCallReportList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
                  onClickCommentHeart={(comment, item) => onClickHeart(props.actions, comment, item, userId, reloadPage, setReloadPage)}
                  showDay={true}
                  index={index}
                  textShown={textShown}
                  setTextShown={setTextShown}
                  openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme, () => { })}
                  addComments={(data, item) => addComments(props.actions, data, item, setItem)}
                  apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage)}
                  setVisible={(visible: any, item: any) => {
                    setItem(item)
                    setTimeout(() => {
                      setVisible(visible)
                    }, 300)
                  }}
                />
              </View>
            )
          }}
        />
        {/* <View style={styles.seperatorView} /> */}

        {/* <View style={[styles.titleContainer, { marginBottom: 8, marginTop: 8, paddingHorizontal: 10 }]}>
          <Text style={styles.supportGpText}>{translate("HOME")["LIVE_EXPERIENCE"]}</Text>
          <Pressable style={styles.viewAllVw} onPress={() => { onPressItem('Zen.Events') }}>
            <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
          </Pressable>
        </View>

        <FlatList
          data={allHomeData?.event_data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={statusRenderItem} />

        <View style={styles.seperatorView} /> */}

        <View style={[styles.titleContainer, { marginBottom: 8, marginTop: 8, paddingHorizontal: 10 }]}>
          <Text style={styles.supportGpText}>{translate("HOME")["LEARNING_SPACE"]}</Text>
        </View>

        <FlatList
          data={allHomeData?.tips_images}
          horizontal
          pagingEnabled
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
          renderItem={statusLearningItem} />
        <View style={styles.seperatorView} />

        <View style={[styles.titleContainer, { marginBottom: 8, marginTop: -10, paddingHorizontal: 10 }]}>
          <Text style={styles.supportGpText}>{translate("HOME")["STORIES_HOPE"]}</Text>
          <Pressable style={styles.viewAllVw} onPress={() => { props.navigation.navigate('Zen.Community', { isFromStories: true }) }}>
            <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
          </Pressable>
        </View>

        <FlatList
          data={allHomeData?.cancer_healing_stories}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={storiesItem} />
        <View style={[styles.seperatorView]} />



        {/* <View style={[styles.titleContainer, { marginTop: 13, marginBottom: 20 }]}>
             <Text style={styles.supportGpText}>{translate("HOME")["AC_RECIPES"]}</Text>
             <Pressable style={styles.viewAllVw} onPress={() => { onPressItem('Zen.CreateDietPlan') }} >
               <Text style={styles.viewAllTxt}>{translate("HOME")["PERSONALIZED"]}</Text>
             </Pressable>
           </View> */}

        {/* <FlatList
             data={allHomeData?.food_item}
             horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ paddingHorizontal: 20 }}
             renderItem={foodRenderItem}
           /> */}

        {/* <View style={[styles.titleContainer, { marginBottom: 8 }]}>
           <Text style={styles.supportGpText}>{translate("DRAWER")["WELLNESS"]}</Text>
           <Pressable style={styles.viewAllVw} onPress={() => { onPressItem('Zen.WellnessCategory') }} >
             <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
           </Pressable>
         </View>
 
         <FlatList
           data={wellnessData}
           horizontal
           pagingEnabled
           keyExtractor={item => item.key}
           showsHorizontalScrollIndicator={false}
           renderItem={(item) => {
             return (
               <WellnessRender isHorizontal={true} item={item.item} navigation={props.navigation}
                 extraStyle={{ width: width - 40, marginHorizontal: 20 }}
                 WellNessCategoryById={item.item.wellnessCat} theme={props.theme} onPress={(item) => {
                   props.navigation.navigate('Zen.WellnessCategoryItem', {
                     item: item,
                     WellNessCategoryById: item.wellnessCat
                   })
                 }} onPlusPress={(item: any) => {
                   props.navigation.navigate('Zen.AddActivity', {
                     title: item.title,
                     wellnessid: item.id,
                     category: item.wellnessCat[0].data.calendar_category,
                     isFromWellness: true,
                     isWellnessCategory: true
                   })
                 }} />
             )
           }} /> */}

        {/* <View style={[styles.titleContainer, { marginBottom: 13 }]}>
             <Text style={styles.supportGpText}>{translate("HOME")["AI_WARRIORS"]}</Text>
             <Pressable style={styles.viewAllVw} onPress={() => { onPressItem('Zen.ProfileMatch') }} >
               <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
             </Pressable>
           </View> */}

        {/* <FlatList
             data={allHomeData?.match_profile}
             horizontal
             contentContainerStyle={{ paddingLeft: 20 }}
             showsHorizontalScrollIndicator={false}
             renderItem={profileRenderItem} /> */}

        {/* <View style={[styles.titleContainer, { marginBottom: 5 }]}>
             <Text style={styles.supportGpText}>{translate("COMMONTEXT")["SUPPORT_GROUPS"]}</Text>
             <Pressable style={styles.viewAllVw} onPress={() => {
               groupList.length > 0 && props.navigation.navigate('Zen.ViewallGroup', {
                 groupList: groupList,
                 getAllGroups: apiCallForGetGroups
               })
             }} >
               <Text style={styles.viewAllTxt}>{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
             </Pressable>
           </View>
           <View style={{ height: 110 }}>
             <FlatList
               data={groupList}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 0 }}
               renderItem={renderInterestItem} />
           </View> */}
        {/* {communityCategoryData.length > 2 && (
             <View style={{marginVertical: 10}}>
           <SelectionTab
           theme={theme}
           data={communityCategoryData}
           catId={catId}
           handleCategorySelection={(item) => handleCategorySelection(item, 'Most recent')}
         />
         </View>
             )} */}
        {/* <Text style={styles.highlightText}>{translate("HOME")["HIGHLIGHTS"]}</Text> */}
        <View >
          <Text style={[styles.supportGpText, { marginBottom: 20, paddingHorizontal: 10, marginTop: -5 }]}>{translate("HOME")["SHARING_SPACE"]}</Text>
          <View style={{ marginTop: -22 }}>
            {communityList?.length > 0 &&
              communityList.map((item, index) => {
                return (
                  <CancerPost
                    item={item}
                    onPress={(item) => {
                      setFromDetail(true)
                      props.navigation.navigate('Zen.CommunityComment', {
                        id: item.id, item: item,
                        updateSupport: updateSupport,
                        updateComment: updateCommentDetail,
                        handleReport: handleReportDetail,
                        updateBookMark: updateBookMark
                      })
                    }}
                    navigation={props.navigation}
                    page={"Community"}
                    onPressBookMark={(item) => onPressBookMark(props.actions, item, reloadPage, setReloadPage, userId)}
                    // onPressPin={onPressPin}
                    onSupport={(item) => apiCallForUpdateSupport(props.actions, item, reloadPage, setReloadPage, userId)}
                    // apiCallFollowList={apiCallFollowList}
                    apiCallMarkAsSpamList={(item) => apiCallMarkAsSpamList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
                    apiCallReportList={(item) => apiCallReportList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
                    onClickCommentHeart={(comment, item) => onClickHeart(props.actions, comment, item, userId, reloadPage, setReloadPage)}
                    showDay={true}
                    theme={theme}
                    index={index}
                    textShown={textShown}
                    setTextShown={setTextShown}
                    reloadPage={reloadPage}
                    setReloadPage={setReloadPage}
                    openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme, () => { })}
                    addComments={(data, item) => addComments(props.actions, data, item, setItem)}
                    apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage)}
                    setVisible={(visible: any, item: any) => {
                      setItem(item)
                      setTimeout(() => {
                        setVisible(visible)
                      }, 300)
                    }}
                  />
                )
              })
            }
          </View>
        </View>
        {loadeMore &&
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>}
      </ScrollView>
      {/* } */}
      <BottomMenu
        flow={flowData}
        theme={props.theme}
        navigation={props.navigation}
        actions={props.actions}
        updateData={updateData}
        onCoach={onPressCancerCoach}
      />
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display={'default'}
          onChange={onchange}
        />
      )}
      {/* Search Modal */}
      <SearchModal
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        styles={styles}
        theme={props.theme} />

      {/* <NotificationModal
        theme={theme}
        notificationVisible={notificationVisible}
        setNotificationVisible={setNotificationVisible}
        notiArr={notiArr}
        setAllReadNotification={setAllReadNotification}
        onPress={(item: any) => {
          NotificationPress(item)
        }}
      /> */}
      <ReportOption
        isVisible={visible}
        reasonArray={[]}
        theme={theme}
        setVisible={setVisible}
        handleReport={handleReportDetail}
        item={item}
        actions={props.actions}
      />

      {isMoodModal &&
        <Modal
          isVisible={isMoodModal}
          animationIn={'slideInUp'}
          animationOut={'slideInDown'}
          backdropOpacity={0.3}
          onBackdropPress={() => setIsMoodModal(false)}
          onBackButtonPress={() => setIsMoodModal(false)}>
          <View style={styles.modalContainer} >
            <View style={styles.tipsModalVw} >
              <Pressable style={styles.closeImageVw} onPress={() => setIsMoodModal(false)} >
                <Image source={require('../../../assets/images/close.png')} style={styles.closeImg} />
              </Pressable>

              <Text style={[styles.modalDesText, {  }]}>
                {moodText}
              </Text>
            </View>
          </View>
        </Modal>
      }

      <FullScreenImage
        mediaArr={isEmoji ? emojiArr : isFromSuccess ? successImages : mediaArr}
        theme={theme} modalDisplay={imageModal} setModalDisplay={setImageModal}
        index={0}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);