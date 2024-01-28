/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useRef, useEffect } from 'react';
import style from './Style';
import {
  View,
  Image,
  StatusBar,
  Pressable,
  ImageBackground,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import Slide1 from '../../../assets/images/slide1.svg';
import Slide2 from '../../../assets/images/slide2.svg';
import Slide3 from '../../../assets/images/slide3.svg';
import Slide4 from '../../../assets/images/slide4.svg';
import { isIphoneX } from 'react-native-iphone-x-helper'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [stepCounter, setStepCounter] = useState(0);
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  let imgWidth = width - 100
  let imgHeight = Platform.OS === 'android' ? height - 340 : isIphoneX() ? height - 400 : height - 320

  const arr = [
    { img: <Slide1 width={imgWidth} height={imgHeight} />, image: require('../../../assets/images/portrait-sample.jpg') , title: 'Meet your personalized \ncancer coach' },
    { img: <Slide2 width={imgWidth} height={imgHeight} />, image: require('../../../assets/images/product_banner.png') , title: 'Cancer-fighting foods' },
    { img: <Slide3 width={imgWidth} height={imgHeight} />, image: require('../../../assets/images/portrait-sample.jpg') , title: 'Manage pain and \nweight loss' },
    { img: <Slide4 width={imgWidth} height={imgHeight} />, image: require('../../../assets/images/product_banner.png') , title: translate('BENEFITS').TITLE1 }
  ]
  const ref = useRef(null)

  //Lifecycle Methods
  useEffect(() => {
    fadeIn()
    setTimeout(() => {
      fadeOut()
      setTimeout(() => {
        stepCounter < 3 ? setStepCounter(stepCounter + 1) : setStepCounter(0)
        fadeIn()
      }, 950)
    }, 1000)
  }, [stepCounter]);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000
    }).start();
  };

  //Helper Methods
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  })

  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    if (changed && changed.length > 0) {
      setStepCounter(changed[0].index);
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      {/* <ImageBackground style={styles.dietImg} source={require('../../../assets/images/BG.png')} > */}
      <View style={styles.mainVw} >
        <Text style={styles.headText} >{translate('BENEFITS').TITLE2}</Text>
        <View style={styles.imageContainer}>
          
          {/* <Animated.Image style={[styles.imageSlide, {
              opacity: opacity
            }]} source={arr[stepCounter].image} /> */}

            <Animated.View style={[styles.imageSlide, {
              opacity: opacity
            }]} >
                {arr[stepCounter].img}
          </Animated.View>
        </View>

        <View style={styles.descVw}>
          <Animated.Text style={[styles.titleText, { opacity: opacity }]}>{arr[stepCounter].title}</Animated.Text>
          <Pressable style={styles.btnView} onPress={() => { props.navigation.navigate('Zen.LoginScreen') }}>
            <Text style={styles.btnTxt}>{translate("COMMONTEXT")["CONTINUE"]}</Text>
            {/* <Image style={[styles.arrowRight]} source={require('../../../assets/images/rightArrow.png')} /> */}
          </Pressable>
        </View>

      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};
export default withTheme(Layout);