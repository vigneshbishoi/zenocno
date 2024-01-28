/**
 * DietPlan layout page
 * @Author: Anand R
 * @Date: Fri Dec 17 2021 13:51:07 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState } from 'react';
import style from './Style';
import { Pressable, View, StatusBar } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import ArrowButton from "../../../components/DietPlan/arrowBtn"
import CuisinesFoods from "../../../components/DietPlan/CuisinesFoods"
import DietPreference from "../../../components/DietPlan/dietPreference"
import AllergiesFood from '../../../components/DietPlan/AllergiesFood';
import SelectDietFoods from '../../../components/DietPlan/SelectDietFoods';
import { breakFast } from '../../../components/DietPlan/FoodsData';
import AppLoader from '../../../components/Plugins/AppLoader';
import { useSelector } from "react-redux";
import actionTypes from '../../../store/actions/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/images/Back.svg'

interface IProps {
  theme: any;
  actions: any;
  navigation: any;
}

const Layout = (props: IProps) => {
  const { navigation, actions } = props;

  const [stepCounter, setStepCounter] = useState(0);
  const [dietParams, setDietParams] = useState();
  const [cuisineParam, setCuisineParams] = useState();
  const [allergiesParams, setAllergiesParams] = useState();
  const userId = useSelector(state => state.loginReducer.userData)
  const totalSteps = 3
  const styles = style(props.theme);
  const theme = props.theme

  const dietPreferenceAPI = (params: any) => {

    const request = {
      module: "dietPreference",
      action: "createUserDietPreference",
      formData: {
        "userId": userId?.data?.data?.id,
        "dietPreferenceIds": params.toString()
      }
    }
    actions.postDietPreference(actionTypes.POST_DIET_PREFERENCE, request);
    setStepCounter(stepCounter + 1);
  }

  const cuisineFoodAPI = (params: any) => {
    const temp = params.join(',').toString()

    const request = {
      module: "cuisine",
      action: "createUserCuisine",
      formData: {
        "userId": userId?.data?.data?.id,
        "cuisineIds": temp
      }
    }
    actions.postCuisineFoods(actionTypes.POST_CUISINE_FOODS, request);
    setStepCounter(stepCounter + 1);
  }

  const allergiesFoodAPI = (params: any) => {
    const temp = params.join(',').toString()

    const request = {
      module: "foodItem",
      action: "createUserFoodAllergy",
      formData: {
        "userId": userId?.data?.data?.id,
        "foodItemIds": temp
      }
    }

    actions.postAllergiesFoods(actionTypes.POST_CUISINE_FOODS, request);
    //actions.createDietPlan(actionTypes.CREATE_DIET_PLAN, { module: "mealPlanner", action: "createMealPlan", formData: { userId: userId?.data?.data?.id } })
  }

  const onClickNext = () => {
    if (stepCounter < totalSteps - 1) {
      if (dietParams && stepCounter === 0) {

        dietPreferenceAPI(dietParams)
      } else if (cuisineParam && stepCounter === 1) {

        cuisineFoodAPI(cuisineParam);
      }
    }
    else {
      if (allergiesParams) {
         allergiesFoodAPI(allergiesParams);
        navigation.navigate('Zen.AntiCancerDietPlan');
      }
    }

  }

  const renderComponent = () => {
    switch (stepCounter) {
      case 0:
        return <DietPreference dietParams={dietParams} setDietParams={(value: any) => setDietParams(value)} theme={props.theme} actions={props.actions} />
      case 1:
        return <CuisinesFoods cuisineParams={cuisineParam} setCuisineParams={(value: any) => setCuisineParams(value)} actions={props.actions} theme={props.theme} />
      case 2:
        return <AllergiesFood theme={theme} cuisineParams={allergiesParams} setAllergiesParams={(value: any) => setAllergiesParams(value)} actions={props.actions} theme={props.theme} />
      default:
        break;
    }
  }
  const loader = useSelector(state => state.dietPlanReducer?.loader)
  const onClickBack = () => {
    if (stepCounter > 0) {
      setStepCounter(stepCounter - 1)
    }
    else {
      props.navigation.pop()
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.SELECTED} barStyle='dark-content' />
      <View style={styles.header}>
        <View style={styles.headerVw}>
          <Pressable style={styles.backVw} onPress={onClickBack}>
            <Back width={15} height={20} />
          </Pressable>
          <View style={styles.trackerContainer}>
            <View style={[styles.trackVw, { backgroundColor: stepCounter >= 0 ? theme.SECONDARY : '#BAF0E6' }]} />
            <View style={[styles.trackVw, { backgroundColor: stepCounter >= 1 ? theme.SECONDARY : '#BAF0E6' }]} />
            <View style={[styles.trackVw, { backgroundColor: stepCounter >= 2 ? theme.SECONDARY : '#BAF0E6' }]} />
          </View>
        </View>
        {renderComponent()}
      </View>
      <View style={styles.footer}>
        <ArrowButton totalStep={totalSteps} type={"next"} theme={theme} onClickNext={onClickNext} setStepCounter={setStepCounter} navigation={props.navigation} nextScreen={"Zen.FoodSearch"} />
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
