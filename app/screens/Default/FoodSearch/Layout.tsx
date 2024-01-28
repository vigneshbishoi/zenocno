/**
 * FoodSearch layout page
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 19:39:18 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import { View } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import { breakFast } from '../../../components/DietPlan/FoodsData';

import SelectDietFoods from '../../../components/DietPlan/SelectDietFoods';
import { useSelector } from 'react-redux';
import AppLoader from '../../../components/Plugins/AppLoader';
import ArrowButton from '../../../components/DietPlan/arrowBtn';
import actionTypes from '../../../store/actions/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../../utils/Text"
import Tracker from '../../../components/DietPlan/Tracker';

interface IProps {
  theme: any;
  actions: any;
  navigation: any;
}

const Layout = (props: IProps) => {
  const { navigation, actions } = props
  const [stepCounter, setStepCounter] = useState(0);
  const [breakFast, setBreakFast] = useState('');
  const [lunch, setLunch] = useState('');
  const [snacks, setSnacks] = useState("");

  const totalSteps = 3
  const styles = style(props.theme);
  const theme = props.theme
  const userId = useSelector(state => state.loginReducer.userData);
  const submitBreakFast = () => {
    const req = {
      module: "foodItem",
      action: "createUserFoodPreference",
      formData: {
        userId: userId?.data?.data?.id,
        mealTimingId: 1,
        foodItemIds: breakFast.join(",")
      }
    }
    actions.submitFoodItem(actionTypes.SUBMIT_FOOD_ITEM, req)
    setStepCounter(stepCounter + 1);
  }
  const submitLunch = () => {
    const req = {
      module: "foodItem",
      action: "createUserFoodPreference",
      formData: {
        userId: userId?.data?.data?.id,
        mealTimingId: 6,
        foodItemIds: lunch.join(",")
      }
    }
    actions.submitFoodItem(actionTypes.SUBMIT_FOOD_ITEM, req)
    setStepCounter(stepCounter + 1);
  }
  const submitSnacks = () => {
    const req = {
      module: "foodItem",
      action: "createUserFoodPreference",
      formData: {
        userId: userId?.data?.data?.id,
        mealTimingId: 1,
        foodItemIds: snacks.join(",")
      }
    }
    actions.submitFoodItem(actionTypes.SUBMIT_FOOD_ITEM, req)

    navigation.navigate("Zen.AntiCancerDietPlan")
  }

  const onClickNext = () => {

    if (stepCounter < totalSteps - 1) {
      if (breakFast && stepCounter == 0) {
        submitBreakFast()
      }
      else if (lunch && stepCounter == 1) {
        submitLunch()
      }
    }
    else {
      if (snacks) {
        submitSnacks()
      }
    }
  }

  const loader = useSelector(state => state.dietPlanReducer.loader)
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
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
      <View style={styles.header}>
      <Tracker theme={props.theme} index={stepCounter + 4} onBack={() => {
            onClickBack()
        }}/>
        {stepCounter == 0 && <SelectDietFoods theme={theme} query={"Breakfast"} selected={breakFast} setParams={(value: any) => setBreakFast(value)} actions={props.actions} dietFoods={breakFast} title={translate("DIET_PLAN")["BF"]} subTitle={translate("DIET_PLAN")["BF_SUB"]} />}
        {stepCounter == 1 && <SelectDietFoods theme={theme} query={"Evening"} selected={lunch} setParams={(value: any) => setLunch(value)} actions={props.actions} dietFoods={breakFast} title={translate("DIET_PLAN")["LU"]} subTitle={translate("DIET_PLAN")["LU_SUB"]} />}
        {stepCounter == 2 && <SelectDietFoods theme={theme} query={"Dinner"} selected={snacks} setParams={(value: any) => setSnacks(value)} actions={props.actions} dietFoods={breakFast} title={translate("DIET_PLAN")["SN"]} subTitle={translate("DIET_PLAN")["SN_SUB"]} />}
      </View>
      <View style={styles.footer}>        
        <ArrowButton onClickNext={onClickNext} totalStep={totalSteps} type={"next"} theme={theme} stepCounter={stepCounter} setStepCounter={setStepCounter} navigation={props.navigation} />
      </View>

    </SafeAreaView>
  );
};
export default withTheme(Layout);
