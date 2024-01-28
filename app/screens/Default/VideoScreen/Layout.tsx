/**
 * ViewStory layout page
 * @Author: Anand R
 * @Date: Wed Dec 22 2021 15:37:31 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import style from './Style';
import {
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  Dimensions,
  AppState,
  Platform,
  NativeEventSubscription,
  BackHandler,
} from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import Text from '../../../components/CustomText';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Orientation from 'react-native-orientation';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import AppLoader from '../../../components/Plugins/AppLoader';
import AppHeader from '../../../components/CommonInput/appHeader';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import Back from '../../../assets/images/Back.svg'

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
  route: any;
}

const Layout = (props: IProps) => {
  const theme = props.theme
  const [playing, setPlaying] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loading, setIsLoading] = useState(true);
  const [isPortrait, setIsisPortrait] = useState(false)

  const styles = style(props.theme);

  const { url } = props.route.params;
  console.log('url', url);

  const onStateChange = useCallback(state => {
    switch (state) {
      case 'ended':
        setPlaying(false);
        props.navigation.goBack();
        break;
      case 'unstarted':
        // setIsLoading(true);
        break;
      default:
        setIsLoading(false);
    }
    if (state === 'ended') {
      setPlaying(false);
      // playing.current = true;
      props.navigation.goBack();
    } else {
    }
  }, []);

  const togglePlaying = useCallback(() => {
    // setPlaying(prev => !prev);
  }, []);

  useFocusEffect(() => {
    Orientation.lockToLandscapeLeft();
    const onBackPress = () => {
      if (playing) {
        console.log('test');
        setPlaying(false);
      }
      console.log('playing--', JSON.stringify(playing));
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  useEffect(() => {
    let blurSubscription: NativeEventSubscription;
    if (Platform.OS === 'android') {
      blurSubscription = AppState.addEventListener('blur', () => {
        setPlaying(false);
      });
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current && appState.current.match(/inactive|background/)) {
        setPlaying(false);
        // playing.current = false;
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState2', appState.current);
    });
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      subscription.remove();
      if (Platform.OS === 'android') {
        blurSubscription.remove();
      }
    };
   
  }, []);

  const onChangeFullScreen = () => {
    if (isPortrait) {
      Orientation.lockToPortrait();
      setIsisPortrait(false)
    } else {
      Orientation.lockToLandscapeLeft();
      setIsisPortrait(true)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={''}
        isRightComponent={false} />
      <AppLoader visible={loading} textContent={''} />
      <View style={{ justifyContent: 'center', height: '90%', marginTop: 50 }}>
        <YoutubePlayer
          webViewStyle={{ opacity: 0.99 }}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
          onFullScreenChange={onChangeFullScreen}
          forceAndroidAutoplay={true}
          height={300}
          play={playing}
          videoId={url || 'ZwqIm6wQTNE'}
          onChangeState={onStateChange}
          onError={() => setIsLoading(false)}
          onReady={() => setIsLoading(false)}
        />
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);