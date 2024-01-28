/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect, useCallback, useLayoutEffect, useContext } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { FONTFAMILY } from '../../../config/font-config';
import actionTypes from '../../../store/actions/types';
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';
import translate from "../../../utils/Text";
import AppHeader from '../../../components/CommonInput/appHeader';

import {
  SocketContext,
  ADD_USER,
  GET_CONVERSATIONS,
  DISCONNECT_USER,
  DISCONNECT,
  GET_ONLINE_USER,
  CONVERSATIONS
} from '../../../utils/socket';
import { useIsFocused } from '@react-navigation/native';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
  route: object

}
const Layout = (props: IProps) => {

  const styles = style(props.theme);
  const theme = props.theme
  //const socketRef = useRef()
  const socket = useContext(SocketContext);
  const [searchText, setSearchText] = useState('')
  const [conversationList, setConversationList] = useState([])
  const [chatConversationData, setChatConversationData] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const isFocused = useIsFocused();

  const userData = useSelector((state) => state.onboardingReducer.userDetails?.data);
  // const chatConversationData =
  //   useSelector((state) => state.chatReducer?.chatConversationData?.length > 0 ?
  //     state.chatReducer.chatConversationData[0].data : []) || [];

  //console.log("user details ", chatConversationData)

  useEffect(() => {
    console.log(userData?.userId)
    console.log("connect", socket.connected); // x8WIv7-mJelg7on_ALbx
    if (!socket.connected) {
      socket.connect()
    }
    socket.emit(ADD_USER, { userId: userData?.userId }, (err, response) => { console.log(err, response) });

    socket.on(GET_ONLINE_USER, (args) => { console.log('getOnlineUser', args) });
    socket.on(CONVERSATIONS, (args) => {
      console.log("get connections", args?.data?.conversations.length)
      let newStr = []
      args?.data?.conversations?.forEach(element => {
        // if (Object.keys(element).includes('messages')) {
        //   newStr.push(element)
        // }
        console.log("elemete ------------", element)
      });
      setConversationList(args?.data?.conversations),
        setChatConversationData(args?.data?.conversations)
    });
    socket.on(DISCONNECT, () => { console.log('disconnect', socket.connected), socket.connect() });

    return () => {
      socket.emit(DISCONNECT_USER, { userId: userData?.userId }, (err, response) => { console.log(err, response) });
      socket.off(GET_ONLINE_USER, (args) => { console.log('getOnlineUser', args) });
      socket.off(CONVERSATIONS, (args) => { console.log('convesations', args) });
      socket.off(DISCONNECT, (args) => { console.log('disconnect', args) });
      socket.disconnect()
      socket.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    if (socket.connected && isFocused) {
      console.log("emit connections")
      socket.emit(GET_CONVERSATIONS, { userId: userData?.userId }, (err, response) => { console.log(err, response) });
    }
  }, [isFocused])

  const getChatConversations = () => {
    props.actions.getChatConversation(actionTypes.GET_CHAT_CONVERSATION, {
      module: 'chat',
      action: 'get-conversation',
      formData: {
        userId: userData?.userId
      }
    })
    setIsLoader(false)
  }

  const searchTextList = (e) => {
    let text = e.toLowerCase()
    let trucks = chatConversationData
    let filteredName = trucks.filter((item) => {
      return item?.user?.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      setConversationList(chatConversationData)
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setConversationList([])
    } else if (Array.isArray(filteredName)) {
      setConversationList(filteredName)
    }
  }

  const setMessageType = (item) => {
    let type = item?.messages?.type
    if (type == 3) { //audio
      return <Icon name="headphones" color={theme.BLACK} size={18} />
    } else if (type == 4) {
      return <Icon name="video" color={theme.BLACK} size={18} />
    } else if (type == 2) {
      return <Icon name="image" color={theme.BLACK} size={18} />
    } else { //type = 1 = text 
      return <Text style={styles.chatMsg} numberOfLines={1}>{item?.messages?.message}</Text>
    }
  }

  const chatRender = ({ item, index }) => {
    //console.log("items------------", item)
    let time = item?.messages?.createdAt
    if (time) {
      time = moment(time).format('DD MMM');
    }
    return (
      <Pressable onPress={() => {
        let user = {
          name: item?.user?.name,
          image: item?.user?.image ? item?.user?.image : null,
          userId: item?.user?.userId ? item?.user?.userId : "",
          cancerName: item?.user?.cancer_category?.name ? item?.user?.cancer_category?.name : "",
          cancerStage: item?.user?.cancer_stage?.cancer_stage ? item?.user?.cancer_stage?.cancer_stage : ""
        }
        props.navigation.navigate('Zen.Chat', { user: user });
      }}>
        <View style={{ flexDirection: 'row', paddingVertical: 10, width: '95%' }}>
          {item?.user?.image != null ? (
            <Image
              style={{ height: 50, width: 50, borderRadius: 10 }}
              source={{ uri: item?.user?.image }}
            />
          ) : (
            <Image
              style={{ height: 50, width: 50, borderRadius: 10 }}
              source={require('../../../assets/images/profileImage.png')}
            />
          )}
          <View style={{ flexDirection: 'column', width: '70%', marginHorizontal: 8 }}>
            <Text style={styles.chatUserName} numberOfLines={1}>{item?.user?.name}</Text>
            {/* <Text style={styles.chatMsg} numberOfLines={1}>{'Hello, Good Evening! How are you? Hope you are fine.'}</Text> */}
            {setMessageType(item)}
          </View>
          <View style={{ width: '15%', justifyContent: 'flex-end', alignItems: "flex-end" }} >
            {/* <View style={styles.newChatIndicator} /> */}
            <Text style={styles.chatMsg} numberOfLines={1}>{time}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={translate("DRAWER")["MESSAGES"]}
        isRightComponent={true}
        isSecondIcon={true}
        rightSecondIcon={<Image style={styles.newChatImage} source={require('../../../assets/images/chat_edit.png')} />}
        rightSecondPress={() => props.navigation.navigate('Zen.ChatSearchPeople')}
      />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.searchVw}>
          <Icon name="search" color={'#A2A2A2'} size={18} />
          <TextInput placeholder={translate("COMMONTEXT")["SEARCH"]} placeholderTextColor={'#A2A2A2'} style={styles.searchInput} value={searchText} onChangeText={(value) => { setSearchText(value), searchTextList(value) }} />
        </View>
        <Text style={styles.recentText}>{translate("COMMONTEXT")["RECENT_CONVERSATION"]}</Text>
        {conversationList?.length > 0 ?
          <FlatList
            data={conversationList}
            keyExtractor={(item, index) => item.id}
            renderItem={chatRender}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 200 }}
            nestedScrollEnabled={true} />
          : <View style={{ height: '70%', justifyContent: 'center' }}><Text style={{ color: '#A2A2A2', fontSize: 18, alignSelf: 'center' }}>{translate("COMMONTEXT")["NO_CONVERSATION"]}</Text></View>
        }
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);