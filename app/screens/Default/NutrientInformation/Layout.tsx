/**
 * NutrientInformation layout page
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 13:15:34 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import { View, Image, ImageBackground, Pressable, Dimensions, ScrollView, BackHandler, FlatList } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { FONTFAMILY } from '../../../config/font-config';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../../utils/Text"
import themes from '../../../config/themes-config';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IngredientsPage from '../../../components/DietPlan/IngredientsPage';
import DirectionsPage from '../../../components/DietPlan/DirectionsPage';
import { likeFood } from '../../../store/actions/dietPlanActions';
import Back from '../../../assets/images/Back.svg'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
interface IProps {
  theme: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const { route, navigation } = props;
  const { item, parentItem, date } = route?.params;

  const [ingredients, setIngredients] = useState(false);
  const [preprationMethod, setPreprationMethod] = useState(false);
  const [trackStatus, setTrackStatus] = useState(false);
  const [foodDataInfo, setFoodDataInfo] = useState(parentItem);
  const [similarFoodData, setSimilarFoodData] = useState([]);
  const [undoVisible, setUndoVisible] = useState(false);
  const [valueChange, setValueChange] = useState(false)

  const dietFoodInfo = useSelector(state => state.dietPlanReducer?.dietFoodInfo) || {};
  const similarFoods = useSelector(state => state.dietPlanReducer?.similarFoods) || [];
  const changeRandomFood = useSelector(state => state.dietPlanReducer?.changeRandomFood) || [];
  const setTrack = useSelector(state => state.dietPlanReducer?.setTrack) || [];
  const userId = useSelector(state => state.loginReducer.userData);
  const Tab = createMaterialTopTabNavigator();
  const theme = props.theme
  useEffect(() => {
    getDietFoodInfo();
    getSimilarFoods();
  }, []);

  const setTrackOption = (item: any) => {
    if (item && item.track_food_status === 1) {
      setTrackStatus(true);
      setUndoVisible(true);
      setTimeout(() => {
        setUndoVisible(false);
      }, 5000)
    } else {
      setTrackStatus(false);
      setUndoVisible(false);
    }
  }

  useEffect(() => {
    if (changeRandomFood.length > 0) {
      setFoodDataInfo(changeRandomFood[0].data);
      setIngredients(false);
      setTrackOption(changeRandomFood[0].data?.track_food);
    }
  }, [changeRandomFood])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackClick);
    return () => { BackHandler.removeEventListener('hardwareBackPress', handleBackClick); }
  }, [])
  const handleBackClick = () => {
    navigation.navigate("Zen.AntiCancerDietPlan");
    return true
  }
  useEffect(() => {
    setTrackOption(setTrack[0]);
  }, [setTrack])

  useEffect(() => {
    if (dietFoodInfo.length > 0) {
      setFoodDataInfo(dietFoodInfo[0].data);
      setTrackOption(dietFoodInfo[0].data?.track_food);
    }
  }, [dietFoodInfo]);

  useEffect(() => {
    if (similarFoods.length > 0) {
      setSimilarFoodData(similarFoods[0].data);
    }
  }, [similarFoods]);

  useEffect(() => {
    if (dietFoodInfo.length > 0) {
      setFoodDataInfo(dietFoodInfo[0].data);
    }
  }, [dietFoodInfo]);
  const getDietFoodInfo = () => {
    const request = {
      module: "foodItem",
      action: "getFoodDetail",
      formData: {
        foodItemId: item?.id,
        userId: userId?.data?.data?.id,
      }
    }
    props.actions.getDietFoodInfo(actionTypes.GET_DIET_FOOD_INFO, request);
  }

  const getSimilarFoods = () => {
    const request = {
      module: "mealPlanner",
      action: "similarFoodItem",
      formData: {
        //userId?.data?.data?.id
        userId: userId?.data?.data?.id,
        mealTimingId: parentItem?.mealTimingId,
        mealId: parentItem?.mealId,
        subMealId: parentItem?.subMealId,
        foodItemId: parentItem?.foodItemId,
      }
    }
    props.actions.getSimilarFood(actionTypes.GET_SIMILAR_FOODS, request);
  }
  const GoBack = () => (
    <Pressable style={styles.goBack} onPress={() => { navigation.goBack() }}>
      <Image style={{ width: 30, height: 30, margin: 15 }} source={require('../../../assets/images/back_new.png')} />
    </Pressable>
  )

  {/* Similar Foods */ }
  const foodRenderItem = ({ item, index }) => {
    let minute = item.food_item.minutes_cooking != null ? item.food_item.minutes_cooking : 0
    let prep = item.food_item.minutes_preparation != null ? item.food_item.minutes_preparation : 0
    return (
      <View style={styles.foodItemVw} >
        <Image source={{ uri: item?.food_item?.image }} style={styles.foodImage} />
        {/* <Image source={require('../../../assets/images/portrait-sample.jpg')} style={styles.foodImage} /> */}
        {item.food_item.food_state != null &&
          <View style={styles.typeVw}>
            <Text style={styles.tagtypeText} numberOfLines={1} >{item.food_item.food_state}</Text>
          </View>}
        <Pressable style={styles.likeImgVw} onPress={() => {
          likeFoodItem(item)
        }}>
          <Image style={styles.likeImg} source={item.food_item.user_food_hearts.length > 0 ? item.food_item.user_food_hearts[0].status == 1 ? require('../../../assets/images/like.png') : require('../../../assets/images/nonlike.png') : require('../../../assets/images/nonlike.png')} />
        </Pressable>
        <View style={styles.bottomVw} >
          <Text style={styles.foodTitleName} numberOfLines={2}>{item.food_item.food_item}</Text>
          <View style={styles.itemSubVw}>
            <Image source={require('../../../assets/images/clock.png')} style={{ height: 15, width: 15 }} />
            <Text style={styles.foodTime} >{minute + prep} min</Text>
            <View style={styles.rateVw} >
              <Text style={styles.rateText} >{item.food_item.star_rating != null ? item.food_item.star_rating : '0'}</Text>
              <Image source={require('../../../assets/images/rate.png')} style={styles.rateImg} />
            </View>
          </View>
        </View>
        {item.food_item.food_state != null &&
          <View style={styles.tagVw} >
            <Text style={styles.tagText} >{item.food_item.food_state}</Text>
          </View>}
      </View>
    );
  }
  const SimilarFoodList = () => (
    <View style={styles.similarFoodContainer} >
      <View style={styles.similarWordVw} >
        <Text style={styles.similarText} >{translate("DIET_PLAN")["SIMILAR_FOODS"]}</Text>
        {/* <Pressable style={styles.viewAllVw} >
          <Text style={styles.viewAllText} >{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
        </Pressable> */}
      </View>
      <FlatList
        data={similarFoodData}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 30, paddingBottom: 0 }}
        renderItem={foodRenderItem}
      />

    </View>
  )

  const ChangeRandomFood = () => {
    const request = {
      module: "mealPlanner",
      action: "changeFoodItem",
      formData: {
        userId: userId?.data?.data?.id,
        mealTimingId: parentItem?.mealTimingId,
        mealId: parentItem?.mealId,
        subMealId: parentItem?.subMealId,
        foodItemId: parentItem?.foodItemId,
        date: date,
      }
    }
    props.actions.changeRandomFood(actionTypes.CHANGE_RANDOM_FOOD, request);
    getDataFromDate();
  }

  const getDataFromDate = () => {
    const request = {
      module: "mealPlanner",
      action: "getMealPlanFromDate",
      formData: {
        userId: userId?.data?.data?.id,
        date: date
      }
    }
    props.actions.getDietPLan(actionTypes.GET_DIET_PLAN, request)
  }

  const likeFoodItem = (food) => {
    const request = {
      module: "userfoodheart",
      action: "create",
      formData: {
        userId: userId?.data?.data?.id,
        foodItemId: food.food_item.id
      }
    }
    props.actions.likeFood(actionTypes.LIKE_FOOD, request)
    if (food?.food_item.user_food_hearts?.length > 0 && food?.food_item.user_food_hearts[0].status == 1) {
      food.food_item.user_food_hearts[0].status = 0
    } else if (food?.food_item.user_food_hearts?.length > 0 && food?.food_item.user_food_hearts[0].status == 0) {
      food.food_item.user_food_hearts[0].status = 1
    } else {
      food.food_item.user_food_hearts = [{ userId: userId?.data?.data?.id, status: 1 }]
    }
    setValueChange(!valueChange)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ height: 250 }} source={{ uri: foodDataInfo?.food_item?.food_item ? foodDataInfo?.food_item?.image : foodDataInfo?.image }} >
        <View style={styles.itemDesVw} >
          <Text style={styles.itemName}>{foodDataInfo?.food_item?.food_item ? foodDataInfo?.food_item?.food_item : foodDataInfo?.food_item}</Text>
          <View style={styles.itemSubVw}>
            <Image source={require('../../../assets/images/timer.png')} style={styles.timerImg} />
            {(foodDataInfo?.food_item?.minutes_preparation || foodDataInfo?.minutes_preparation) && <Text style={styles.itemDesText} >{foodDataInfo?.food_item?.food_item ? foodDataInfo?.food_item?.minutes_preparation : foodDataInfo?.minutes_preparation}m</Text>}
            <Image source={require('../../../assets/images/serves.png')} style={[styles.timerImg, { marginLeft: 10 }]} />
            <Text style={styles.itemDesText} >Server {foodDataInfo?.food_item?.food_item ? foodDataInfo?.food_item?.serves : foodDataInfo?.serves}</Text>
          </View>
        </View>
        <GoBack />
      </ImageBackground>
      <NavigationContainer independent={true}  >
        <Tab.Navigator initialRouteName="IngredientsPage"
          screenOptions={{
            tabBarActiveTintColor: theme.SECONDARY,
            tabBarInactiveTintColor: theme.GRAY_BLACK,
            tabBarIndicatorStyle: { backgroundColor: theme.SECONDARY },
            tabBarLabelStyle: styles.tobBarLabelStyle,
            tabBarStyle: { backgroundColor: 'aliceblue' },
          }}>
          <Tab.Screen
            name='IngredientsPage'
            children={() => <IngredientsPage theme={theme} dietfoodinfo={foodDataInfo} />}
            options={{ tabBarLabel: 'Ingredients' }} />

          <Tab.Screen
            name='DirectionsPage'
            children={() => <DirectionsPage dietfoodinfo={foodDataInfo} />}
            options={{ tabBarLabel: 'Directions' }} />

        </Tab.Navigator>
      </NavigationContainer>
      {/* <ScrollView> */}
      {similarFoodData?.length > 0 &&
        <SimilarFoodList />}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
export default withTheme(Layout);