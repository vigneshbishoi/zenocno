/**
 * Stories layout page
 * @Author: Anand R
 * @Date: Fri Dec 03 2021 16:00:13 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons';
import StoryCard from '../../../components/Home/StoryCard';
import actionTypes from '../../../store/actions/types';
import { useSelector } from "react-redux"
import AppLoader from "../../../components/Plugins/AppLoader"
import moment from 'moment'
import { useIsFocused } from "@react-navigation/native";
import { data } from '../../../components/DietPlan/cuisinesData';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../../utils/Text";

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
}

// For all comments screen
const Header = ({ theme, title, navigation }: any) => {
  const styles = style(theme);
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => { navigation.pop() }}>
        <AntDesign style={styles.icon} name={"left"} color={theme.DARK_GRAY} size={18} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* <Pressable onPress={() => { }}>
        <Image
          source={require('../../../assets/images/search.png')}
        />
      </Pressable> */}
      <View></View>
    </View>
  );
}



const AllStories = ({ theme, title, navigation, actions, id, data }: any) => {

  const styles = style(theme);
  const loader = useSelector(state => state.storiesReducer.loader)
  const stories = useSelector(state => state.storiesReducer.storiesAllData)
  const filterData =
    stories[0]?.data?.filter((item) => {
      return item.postCategoryId == id
    })


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      var request = {
        module: "cancerHealingStory",
        action: "getAll"
      }
      actions.loader("loader", false, actionTypes.LOADER)
      actions.getStoriesAll(actionTypes.GET_STORIES_ALL, request)
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      {/* <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} /> */}
      <Header theme={theme} title={title} navigation={navigation} />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {
          title != "All" ? (
            typeof filterData == "object" && filterData.length > 1 &&
            filterData.map((item: any) => {
              return (<StoryCard title={title} fromHome={false} id={id} theme={theme} navigation={navigation} data={item} actions={actions} hideInfo={false} />)
            })) : (
            data.map((item: any) => {
              return (<StoryCard title={title} fromHome={false} id={id} theme={theme} navigation={navigation} data={item} actions={actions} hideInfo={false} />)
            }
            )
          )

        }

      </ScrollView>
    </SafeAreaView>
  );
}



const Layout = (props: any) => {
  const selectedId = props.route.params.id
  return (
    <>
      <AllStories title={props.route.params.title} theme={props.theme} data={props.route.params.data} id={selectedId} fromHome={props.route.params.fromHome} navigation={props.navigation} actions={props.actions} />
    </>
  );
};
export default withTheme(Layout);
