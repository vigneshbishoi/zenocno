/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React from 'react';
import style from './Style';
import {
  StatusBar,
  Text,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
  Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Add_Wellness from '../../../assets/images/addw.svg'
import AppHeader from '../../../components/CommonInput/appHeader';
import Clock from '../../../assets/images/clock.svg'
import BackBG from '../../../assets/images/backBG.svg'      
import Like from '../../../assets/images/ratingHeart.svg'      
import Share from '../../../assets/images/share-black.svg'      
import AddIcon from '../../../assets/images/addIcon.svg'  
import BlankHeart from '../../../assets/images/blankHeart.svg'

import { useSelector } from 'react-redux';
import { onPressLikeWellness, onPressShareWellness } from '../../../utils/wellnessFunction';


interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any;
  route: object;
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const item = props.route.params.item
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const WellNessCategoryById = useSelector(state => state.storiesReducer.getAllWellnessCategoryById);

  const category = props?.route?.params?.WellNessCategoryById?.length > 0 ?
   props?.route?.params?.WellNessCategoryById[0]?.data?.categoryName || props?.route?.params?.WellNessCategoryById[0]?.data[0]?.categoryName : '' || 
   props.route.params?.WellNessCategoryById.wellness_categories.length > 0 ? props.route.params?.WellNessCategoryById.wellness_categories[0]?.categoryName : ''
  let key = item.image
  let url = 'https://img.youtube.com/vi/' + key + '/hqdefault.jpg' 
  
  const onPlusPreess = () => {
    props.navigation.navigate('Zen.AddActivity', {
      title: item.title,
      wellnessid: item.id,
      category: props.route.params?.WellNessCategoryById[0]?.data?.calendar_category || 
      props.route.params?.WellNessCategoryById.WellNessCategoryById || props.route.params?.WellNessCategoryById[0]?.data[0] || props.route.params?.WellNessCategoryById,
      isFromWellness: true
  })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      {/* <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={props.route.params.item.title}
        isRightComponent={true}
        rightFirstPress={() => onPlusPreess()}
        isFirstIcon={true}
        rightFirstIcon={<Add_Wellness/>}
      /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgVw}>
          <ImageBackground style={styles.imgItem} source={{uri:url}} >
            <Pressable 
              onPress={()=> props.navigation.goBack()}
              style={{paddingTop:53, paddingLeft:10}}>
              <BackBG/>
            </Pressable>
            
            <Pressable onPress={() => {
              props.navigation.navigate('Zen.VideoScreen', {
                url: key
              })
            }} style={styles.playIconVw}>
              <Image style={styles.playIconImg} source={require('../../../assets/images/play.png')} />
            </Pressable>
          </ImageBackground>
        </View>

        <View style={{marginHorizontal:10}}>
          <Text style={styles.title}>{item.short_description}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}} >
            <View style={styles.durationView}>
              <Clock/>
              <Text style={styles.durationText}>{item.minutes} m</Text>
              {/* <Text style={styles.durationText}>{item.minutes}:{item.seconds} m</Text> */}
              <Text style={styles.cancerType}>{category}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginRight: 5}}>
              {/* <Pressable onPress={()=>
                onPressLikeWellness(props.actions, item, userId )
              }>
              <BlankHeart   width={22} height={22} />
              </Pressable> */}
              <Pressable 
                onPress={()=>
                  props.navigation.navigate('Zen.AddActivity', {
                    title: item.title,
                    wellnessid: item.id,
                    category: WellNessCategoryById[0]?.data.calendar_category || item.calCat,
                    isFromWellness: true,
                    isWellnessCategory: true
                })}
               style={{marginHorizontal: 20}}>
                <AddIcon width={20} height={20}/>
              </Pressable>
              <Pressable onPress={()=> onPressShareWellness(item)}>
                <Share />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal:10}}>
          <Text style={styles.description} >{item.long_description}</Text>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default withTheme(Layout);