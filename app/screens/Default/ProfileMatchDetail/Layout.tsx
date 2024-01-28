/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Match
 */
import React, { useRef, useState } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  FlatList,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Animated
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import Back from '../../../assets/images/Back.svg'
import CircularProgress from 'react-native-circular-progress-indicator'
import Icon from 'react-native-vector-icons/Ionicons'
import ReadMore from '@fawazahmed/react-native-read-more';
import { scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image';
interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const item = props.route.params.item
  const offset = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 250
  const [searchText, setSearchText] = useState('')


  const backImgItem = () => {
    const headerHeight = offset.interpolate({
      inputRange: [50, 250],
      outputRange: [maxHeaderHeight, minHeaderHeight],
      extrapolate: 'clamp',
    });
    return (
      <View style={{ flex: 1, backgroundColor: theme.SELECTED }}>
        <Animated.View style={{
          // height: offset.interpolate({
          //   inputRange: [0, offset ],
          //   outputRange: [0 , -250],
          //   extrapolate: 'clamp'
          // })
          // height: headerHeight
        }}>
          <FastImage
            style={{ width: '100%', height: verticalScale(232) }}
            source={item?.image ? { uri: item?.image } :
              require('../../../assets/images/profileImage.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.backButtonView}>
            <Pressable onPress={() => { props.navigation.pop() }} style={{ padding: scale(2) }}>
              <AntDesign name={"left"} color={theme.PRIMARY} size={18} />
            </Pressable>
          </View>
        </Animated.View>
        <View style={styles.mainDetailView}>
          <Animated.ScrollView
            // onScroll={Animated.event(
            //   [{ nativeEvent: { contentOffset: { y: offset } } }],
            //   { useNativeDriver: false }
            // )} 
            style={{ marginTop: verticalScale(10), marginBottom: verticalScale(70) }}
            showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: verticalScale(60) }}>
              <Text style={styles.modalTitle}>{item?.name}</Text>
              <Text style={styles.modalDesText}>
                {item?.cancer_category?.name != undefined ?
                  `${item?.cancer_category?.name} - ${item?.cancer_stage?.cancer_stage}` : "Blood Cancer - Stage 3"}
              </Text>
              <Text style={styles.modalDesSubText}>Survivor</Text>
              <View>
                <View style={styles.textView}>
                  <Text style={styles.text}>Year of diagnosis: </Text>
                  <Text style={[styles.subText, { marginLeft: 2 }]}>2007</Text>
                </View>
                {item?.cityName != undefined && <View style={styles.textView}>
                  <Icon name="location-sharp" color={'#666666'} size={19} />
                  {/* <Image style={[styles.messageIcon, { marginRight: 7 }]} source={require('../../../assets/images/location-pin.png')} /> */}
                  <Text style={[styles.text, { marginLeft: 4 }]}>item?.cityName</Text>
                </View>}
                {item?.treatment != null && <>
                  <Text style={[styles.text, { marginTop: 10 }]}>Treatment:</Text>
                  <View style={[styles.textView, { marginTop: 3 }]}>
                    <Image style={[styles.messageIcon, { marginRight: 7 }]} source={require('../../../assets/images/medical.png')} />
                    <Text style={[styles.subText, { fontSize: 14 }]}>{item?.treatment?.treatment}</Text>
                  </View>
                  {/* <View style={[styles.textView, { marginBottom: 3 }]}>
                    <Image style={[styles.messageIcon, { marginRight: 7 }]} source={require('../../../assets/images/chemeo.png')} />
                    <Text style={[styles.subText, { fontSize: 14 }]}>Chemotherapy</Text>
                  </View> */}
                </>}
                {item?.summary != null && <>
                  <Text style={styles.useDesText}>About {item?.name}</Text>
                  <ReadMore numberOfLines={3} style={[styles.text, { paddingVertical: 10, fontSize: 14 }]} seeMoreStyle={styles.seeMore} seeLessStyle={styles.seeMore} seeMoreText={"More"} seeLessText={"Less"}>
                    {item?.summary}
                  </ReadMore>
                </>}
              </View>
            </View>

          </Animated.ScrollView>
          <Pressable style={[styles.msgButton, {
            position: 'absolute', width: '100%',
            marginLeft: scale(30), bottom: 0
          }]} onPress={() => {
            let user = {
              name: item?.name,
              image: item?.image ? item?.image : null,
              userId: item?.userId ? item?.userId : "",
              cancerName: item?.cancer_category?.name ? item?.cancer_category?.name : "",
              cancerStage :item?.cancer_stage?.cancer_stage ? item?.cancer_stage?.cancer_stage :""
            }
            //console.log("selected data",user,item?.cancer_category,item?.cancer_stage)
            props.navigation.navigate('Zen.Chat', { user: user })
          }}>
            <Image style={styles.messageIcon1} source={require('../../../assets/images/message1.png')} />
            <Text style={styles.messageText}>{translate("COMMONTEXT")["MESSAGE"]}</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      {backImgItem()}
    </SafeAreaView>
  );
};
export default withTheme(Layout);
