/**
 * Community Filter Component
 * @Author: Astha
 * @Date: Tue May 3 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Dilsplay Filter List
 */
 import React, { useState, useEffect } from 'react';
 import style from './Style';
 import {
   View,
   Image,
   SafeAreaView,
   StatusBar,
   FlatList,
   Pressable,
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import Text from '../../../components/CustomText';
 import {Header} from '../Home/Layout'
 import CancerPost from '../../../components/Community/CancerPost'
 import actionTypes from '../../../store/actions/types';
 import {RootState} from '../../../store';
 import {useSelector} from 'react-redux';
 import Back from '../../../assets/images/Back.svg'
import { filter } from 'lodash';
 
 interface IProps {
   theme: any;
   navigation: any;
   actions: any
   data: any
 }
 const Layout = (props: IProps) => {
   const styles = style(props.theme);
   const theme = props.theme
   const [page, setPage] = useState(1)
   const [catId, setCatId] = useState(1)
   const [isCatSelected, setIsCatSelected] = useState(false)
   const [loadeMore, setLoadMore] = useState(true)
   const [visible, setVisible] = useState(false)
   const [visibleFilter, setVisibleFilter] = useState(false)
   const [valueChange, setValueChange] = useState(false)
   const [filterName, setFilterName] = useState('Most recent')
   const [communityList, setCommuityList] = useState([])
   const communityData =
    useSelector((state: RootState) => state.storiesReducer?.communityListData?.length > 0 ? 
    state.storiesReducer.communityListData[0]?.data : []) || [];
  const communityCategoryData =
    useSelector((state: RootState) => state.storiesReducer?.communityCategoryListData?.length > 0 ?
      state.storiesReducer.communityCategoryListData[0]?.data : []) || [];
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userName = useSelector(state => state.loginReducer.userData)
  const dietTopic = [
    { id: 1, icon: require('../../../assets/images/home/Wellness.png'), title: 'All Stories' },
    { id: 2, icon: require('../../../assets/images/home/ACD.png'), title: 'Matched Stories' },
  ]

  useEffect(() => {
      apiCall(1, filterName)
    }, []);
  useEffect(() => {
    if (communityData.length > 0) {
      setLoadMore(true)
      let data = communityList.concat(communityData)
      setCommuityList(data)
    } else if (communityData != undefined) {
      setLoadMore(false)
    }

  }, [communityData])
  

  //api call
  const apiCall = (page: number, filter) => {
    if(loadeMore || page == 1){
      setPage(page + 1)
      props.actions.getCommunityListData(actionTypes.GET_COMMUNITY_LIST_DATA, {
        module: 'cancerHealingStory',
        action: 'getAll',
        formData: {
          page: page,
          user_id: userId,
          send_filter: filter == 'Most recent' ? 'most_recent' : 'most_support'
        }
      });
      if (page == 1) {
        setCommuityList([])
      }
    }
  }
 
  const apiCallForUpdateSupport = (item) => {
  updateSupoort(item)
  var inputRequest = {
    module: "cancerHealingStorySupport",
    action: "update",
    formData: {
      userId: userId,
      cancerHealingStoryId: item.id
    },
  }
    props.actions.addSupport(actionTypes.ADD_SUPPORT, inputRequest)
  }

  

  //Helper Methods
  const dietTopicRender = ({ item, index }) => {
    return (
      <View style={styles.topicContainer}>
        <Pressable style={[styles.topicItem, catId === item.id && styles.selected]} onPress={() => {}}>
          <Text style={styles.topicTitle}>{item.title}</Text>
        </Pressable>
      </View>
    );
  }
  const updateSupoort = (item) => {
    if(item?.cancer_healing_story_supports?.length > 0){
      item.cancer_healing_story_supports = []
      let count = item.support_count - 1
        item.support_count = count > 0 ? count : 0
    } else {
      item.cancer_healing_story_supports = [{userId: userId}]
      let count = item.support_count + 1
        item.support_count = count 
    }
    setValueChange(!valueChange)
  }
  const updateComment = (item, comment) => {
    if(item.cancer_healing_story_comments.length == 0){
      item.cancer_healing_story_comments = [{
        comment: comment,
        status: 1,
        user: {
         id: userId,
         user_details: [
          {
            name: userName
          }
        ]
      },
      comment_reply: []
      }]
    }
    let count = item.comments_count + 1
    item.comments_count = count
    setValueChange(!valueChange)
  }
   
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <View style={styles.headerVw}>
        <Pressable onPress={() => { props.navigation.pop() }} style={{ position: "absolute", left: 10 }}>
          <Back width={15} height={20} style={{ margin: 15 }} />
        </Pressable>
      </View>
      <View style={styles.container}>
        
        <View style={{height:50}}>
        <FlatList
        data={dietTopic}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 25, paddingVertical: 20, alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        renderItem={dietTopicRender} />
        </View>
        
      {communityList.length > 0 &&
      <FlatList
        data={communityList}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 10, alignItems: 'center', backgroundColor: theme.SECONDARY_OPACITY}}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => apiCall(page, filterName)}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <CancerPost
          item={item}
          onPress={(item) => {
            props.navigation.navigate('Zen.CommunityComment', {id: item.id, item:item, updateSupoort: updateSupoort, updateComment: updateComment})
          }}
          onSupport={apiCallForUpdateSupport}
          navigation={props.navigation}
          showDay={true} theme={theme} index={index}/>
        )} /> }
      </View>

    </SafeAreaView>
   );
 };
 export default withTheme(Layout);
 
