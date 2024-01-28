/**
 * Video Player Component
 * @Author: Astha
 * @Date: Mon May 23 2022 15:08:31 GMT+0530 (India Standard Time)
 * @Desc: Video Player
 */
 import React, {useState, useRef} from 'react';
 import {Text, View, Pressable, Platform, Dimensions} from 'react-native';
 import Video from 'react-native-video';
 import
 MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
import style from './Style';
import { withTheme } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import translate from "../../../utils/Text"
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Layout = (props) => {
  const styles = style(props.theme);
  const theme = props.theme
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('cover');
 
  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };
 
  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
 
  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
 
  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
 
  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
 
  const onLoadStart = (data) => setIsLoading(true);
 
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
 
  const onError = () => alert('Oh! ', error);
 
  const exitFullScreen = () => {
    alert('Exit full screen');
  };
 
  const enterFullScreen = () => {};
 
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
 
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> {translate("COMMONTEXT")["TOOLBAR"]} </Text>
    </View>
  );
 
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
 
  return (
    <View style={{flex: 1, backgroundColor:theme.PRIMARY}}>
      {/* <View style={{alignItems:'center', height:'100%', justifyContent:'center', marginTop:Platform.OS == 'android' ? 
      screenType == 'content' ? (height/2) - 70 : 0 : 0, marginLeft: Platform.OS == 'android' ? screenType == 'content' ? (width/2) - 90 : 0 : 0}}> */}
      <View style={{alignItems:'center', height:'100%', justifyContent:'center', marginTop:Platform.OS == 'android' ? 
      screenType == 'content' ? (height/2) - 70 : 0 : 0, marginLeft: Platform.OS == 'android' ? screenType == 'content' ? (width/2) - 90 : 0 : 0}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
          props.route.params.url,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />
      </View>
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        // onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
      <Pressable onPress={() => { props.navigation.pop() }} style={{ position: "absolute", left: 0, top: 30 }}>
                    <Back width={8} height={15} style={{ margin: 15 }} color={'white'}/>
                </Pressable>
    </View>
  );
};

export default withTheme(Layout);