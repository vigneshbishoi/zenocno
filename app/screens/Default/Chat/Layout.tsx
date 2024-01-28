/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Image,
  Text,
  Alert,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import translate from '../../../utils/Text'
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { FONTFAMILY } from '../../../config/font-config';
import {
  GiftedChat,
  InputToolbar,
  MessageImage,
  Actions,
  Composer,
  Send,
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Time,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyChatDay from '../../../components/MyChatDay';
import ImagePicker from 'react-native-image-crop-picker';
import { chatMediaRequest } from '../../../services/chat';
import { Menu, MenuItem } from 'react-native-material-menu';
import FullScreenImage from '../../../components/Community/FullScreenImage';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  sendChatGetRequest,
  sendChatPostFormRequest,
} from '../../../services/chat';
import {
  SocketContext,
  DISCONNECT,
  ADD_USER,
  SEND_MESSAGE,
  GET_MESSAGE,
} from '../../../utils/socket';
import { ZMessage } from './model';
import Toast from 'react-native-toast-message';
import { createThumbnail } from 'react-native-create-thumbnail';
import moment from 'moment';
import { data } from '../../../components/DietPlan/cuisinesData';
import getMP3Duration from 'react-native-get-mp3-duration';
import { FileSystem } from 'react-native-file-access'; // or another lib that read the file into base64
import actionTypes from '../../../store/actions/types';
import SelectItem from '../../../assets/images/selectitem.svg';
import UnselectItem from '../../../assets/images/unselectitem.svg';
import { onPressBookMark } from '../../../utils/communityFunction';
interface IProps {
  theme: any;
  navigation: any;
  actions: any;
  data: any;
  route: object;
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme;
  const receivedUser = props.route.params.user;
  const [messages, setMessages] = useState<ZMessage[]>([]);
  const [selectedMedia, setSelectedMedia] = useState(undefined);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [page, setPage] = useState(1);
  const [conversationId, setConversationId] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [isReasonPopupShow, setReasonPopupShow] = useState(false)
  const [mediaArr, setMediaArr] = useState([])
  const [imageModal, setImageModal] = useState(false)
  const [reasonArray, setReasonArray] = useState([
    { key: '1', reasonTitle: 'Pretending to be someone', isSel: false },
    { key: '2', reasonTitle: 'Fake account', isSel: false },
    { key: '3', reasonTitle: 'Fake name', isSel: false },
    { key: '4', reasonTitle: 'Posting inappropriate things', isSel: false },
    { key: '5', reasonTitle: 'Harassment or bullying', isSel: false },
    { key: '6', reasonTitle: 'Something else', isSel: false }
  ])
  const [reasonValue, setReasonValue] = useState('')
  const [selectReason, setSelectedReason] = useState(-1)
  const socket = useContext(SocketContext);
  const mainMenuPopUp = React.createRef();

  const userData = useSelector(
    state => state.onboardingReducer.userDetails?.data,
  );

  console.log("121212", userData)

  useEffect(() => {
    console.log(userData);
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit(ADD_USER, { userId: userData?.userId }, (err, response) => {
      console.log(err, response);
    });

    socket.on(GET_MESSAGE, (args: any) => {
      console.log(GET_MESSAGE, userData?.userId, args); // undefined
      let obj = trasnformJson(args, false);
      let newList: any[] = [];
      if (obj != null) {
        newList.push(obj);
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newList),
        );
      }
    });
    socket.on(DISCONNECT, () => {
      console.log('disconnect', socket.connected), socket.connect();
    });

    getChatHistoryList(page);
    return () => {
      socket.off(GET_MESSAGE, args => {
        console.log('GET_MESSAGE', args);
      });
    };
  }, []);

  const apiCallBlockUser = () => {
    props.actions.blockUser(actionTypes.BLOCK_USER, {
      module: 'user_blocked',
      action: 'create',
      formData: {
        "blockedUserId": receivedUser?.userId,
      }
    });
    props.navigation.navigate("Zen.ChatConversations")
  }
  const apiCallForUserReport = () => {
    let inputRequest = {
      module: 'user_report',
      action: 'create',
      formData: {
        "userId": receivedUser?.userId,
        "reportedUserId": userData?.userId,
        "reason": reasonValue
      }
    }
    props.actions.callUserReport(actionTypes.USER_REPORT, inputRequest)
    props.navigation.navigate("Zen.ChatConversations")
  }

  const trasnformJson = (item: any, isList: boolean) => {
    let data = null;
    if (isList) {
      data = {
        _id: item?.id,
        text: item?.type == 1 ? item?.message : '',
        createdAt: item?.createdAt,
        user: {
          _id: item?.getReceiver?.id,
          //name: 'React Native',
          //avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: item?.type == 2 ? item?.media_url : '',
        // You can also add a video prop:
        video: item?.type == 4 ? item?.media_url : '',
        // You can also add a video prop:
        audio: item?.type == 3 ? item?.media_url : '',
        thumbnail: item.thumbnail === null ? '' : item.thumbnail,
        duration: item.duration,
        // Mark the message as sent, using one tick
        //  sent: true,
        // Mark the message as received, using two tick
        //  received: true,
        // Mark the message as pending with a clock loader
        // pending: true,
        // Any additional custom parameters are passed through
      };
    } else {
      data = {
        _id: item?.id,
        text: item?.type == 1 ? item?.message : '',
        createdAt: item?.createdAt,
        user: {
          _id: item?.receiver_id,
          //name: 'React Native',
          //avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: item?.type == 2 ? item?.media_url : '',
        // You can also add a video prop:
        video: item?.type == 4 ? item?.media_url : '',
        // You can also add a video prop:
        audio: item?.type == 3 ? item?.media_url : '',
        thumbnail: item != null ? item?.thumbnail === null ? '' : item.thumbnail : '',
        duration: item.duration,
        // Mark the message as sent, using one tick
        //  sent: true,
        // Mark the message as received, using two tick
        //  received: true,
        // Mark the message as pending with a clock loader
        // pending: true,
        // Any additional custom parameters are passed through
      };
    }
    return data;
  };

  const getChatHistoryList = async (page: number) => {
    if (loadEarlier || page == 1) {
      setPage(page + 1);
      let payload = {
        module: 'chat',
        action: 'get-message',
      };
      let data = {
        receiver_id: receivedUser?.userId,
        page: page,
      };
      const response = await sendChatGetRequest(data, payload);
      console.log("123", response)
      if (response?.data) {
        if (response?.data?.conversationData) {
          let converId = response?.data?.conversationData?.id
            ? response?.data?.conversationData?.id
            : '0';
          setConversationId(converId);
        }
        let chatData = response?.data?.chatData;
        if (chatData?.length > 0) {
          let newChatList: any[] = [];
          chatData.map((chatObj: any) => {
            let obj = trasnformJson(chatObj, true);
            if (obj != null) newChatList.push(obj);
          });
          if (page > 1) {
            setMessages(previousMessages =>
              GiftedChat.prepend(previousMessages, newChatList),
            );
          } else {
            setMessages(newChatList);
          }
          console.log("234----", response?.data?.page_Information)
          if (response?.data?.page_Information) {
            if (response?.data?.page_Information?.lastpage > 1) {
              setLoadEarlier(true);
            } else {
              setLoadEarlier(false);
            }
          }
          setIsLoadingEarlier(false);
        } else {
          setLoadEarlier(false);
          setIsLoadingEarlier(false);
        }
        //console.log('response ------',chatData)
      }
      console.log('response ------', response?.data?.chatData);
    }
  };

  const initialiseCall = async (isAudio: any) => {
    let payload = {
      module: 'agora',
      action: 'create-token',
    };
    // let data = {
    //   type : isAudio ? "audio_call" : "video_call",
    //   receiver_id : [receivedUser?.userId]
    //   //receiver_id: receivedUser?.userId
    // };
    let type = isAudio ? 'audio_call' : 'video_call';
    const frmData = new FormData();
    frmData.append('type', type);
    frmData.append('receiver_ids[0]', receivedUser?.userId);
    console.log('data---------', frmData);

    const response = await sendChatPostFormRequest(frmData, payload, 'POST');
    console.log('response---------', response.data);
    if (response?.data.status != 0) {
      let data = response?.data;
      if (isAudio) {
        props.navigation.navigate('Zen.ChatAudio', {
          receivedUser: receivedUser,
          agoraData: data,
        });
      } else {
        props.navigation.navigate('Zen.ChatVideo', {
          receivedUser: receivedUser,
          agoraData: data,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: 'Please try again',
      });
    }
  };

  const openGallery = (type: any) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: type,
      durationLimit: 60,
      videoQuality: 'low',
    })
      .then(image => {
        setTimeout(() => {
          sendMediaUpload(image, 0);
        }, 1000);
      })
      .catch(e => {
        console.log('e', e);
      });
  };
  const openCamera = (type: any) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: type,
      durationLimit: 60,
      videoQuality: 'low',
    })
      .then(image => {
        setTimeout(() => {
          sendMediaUpload(image, 0);
        }, 1000);
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const openAudio = () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [types.audio],
    })
      .then(data => {
        if (data[0]) {
          setTimeout(() => {
            fetchAudio(data[0]);
          }, 1000);
        }
      })
      .catch(handleError);
  };

  const fetchAudio = async (file: any) => {
    console.log(
      file
    )
    const bufferStr = await FileSystem.readFile(file.uri, 'base64')
    const duration = await getMP3Duration(bufferStr)
    if (duration) {
      let dura = duration / 1000
      sendMediaUpload(file, dura);
    }
    console.log(duration, 'ms') // 285727 ms

  };
  const thumbnail = async (path: string) => {
    const res = await createThumbnail({
      url: path,
      timeStamp: 2000,
      format: 'jpeg',
    });
    return res;
  };
  const sendMediaUpload = async (selectedImage: any, durationTime: any) => {
    let size = formatBytes(selectedImage?.size);
    console.log('selectedImage', selectedImage, size);
    const fileSize = selectedImage?.size / 1024 / 1024; // in MiB
    if (fileSize > 25) {
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: 'Maximum file size allowed is 25 MB',
      });
    } else {
      if (socket.connected) {
      const formData = new FormData();
      if (selectedImage != undefined) {
        let mediaType = 1;
        if (
          selectedImage?.type?.includes('image') ||
          selectedImage?.mime?.includes('image')
        ) {
          mediaType = 2;
          formData.append('media', {
            uri: selectedImage?.path,
            name: 'image.jpg',
            type: selectedImage?.mime,
          });
        } else if (
          selectedImage?.type?.includes('video') ||
          selectedImage?.mime?.includes('video')
        ) {
          mediaType = 4;
          uploadVideoFile(selectedImage);
          return;
        } else if (selectedImage?.type?.includes('audio')) {
          mediaType = 3;
          formData.append('media', {
            uri: selectedImage?.uri,
            name: randomString() + '.mp3',
            type: selectedImage?.type,
          });
        }
        console.log('form data', formData);
        if (mediaType != 1) {
          setIsUpload(true);
          const response = await chatMediaRequest(formData, setUploadPercent);
          if (response?.status == 1) {
            console.log('asios response', response.data, socket.connected);
            if (socket.connected) {
              let data = {
                receiver_id: receivedUser?.userId,
                message: '',
                type: mediaType,
                duration: durationTime,
                conversation_id: conversationId,
                sender_id: userData?.userId,
                media_url: response?.data?.url,
              };
              console.log('send data', data);
              socket.emit(SEND_MESSAGE, data, (err, response) => {
                console.log(response);
              });
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Oops',
              text2: 'Please try again',
            });
          }
          setIsUpload(false);
        }
      }}
    }
  };
  const randomString = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r;
  };

  const uploadVideoFile = async (selectedImage: any) => {
    let formData = new FormData();

    let res = await thumbnail(selectedImage?.path);
    if (res) {
      formData.append('media', {
        uri: selectedImage?.path,
        name: randomString() + '.mp4',
        type: selectedImage?.mime,
      });
      const VideoFile = await chatMediaRequest(formData, setUploadPercent);

      formData = new FormData();
      formData.append('media', {
        uri: res?.path,
        name: randomString() + '.jpeg',
        type: res?.mime,
      });
      const thumbFile = await chatMediaRequest(formData, setUploadPercent);

      if (VideoFile && thumbFile) {
        if (socket.connected) {
          let data = {
            receiver_id: receivedUser?.userId,
            message: '',
            type: 4,
            conversation_id: conversationId,
            sender_id: userData?.userId,
            media_url: VideoFile?.data?.url,
            thumbnail: thumbFile?.data.url,
            duration: selectedImage?.duration,
          };
          console.log('send data', data);
          socket.emit(SEND_MESSAGE, data, (err, response) => {
            console.log(response);
          });
        }
      }
    }
  };

  const onSend = useCallback((messages = []) => {
    console.log('messages', messages);
    if (socket.connected) {
      let data = {
        receiver_id: receivedUser?.userId,
        message: messages[0]?.text,
        type: 1,
        conversation_id: conversationId,
        sender_id: userData?.userId,
        media_url: '',
      };
      console.log('send data', data);
      socket.emit(SEND_MESSAGE, data, (err, response) => {
        console.log(response);
      });
    }
  }, []);

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{
        flex: 1,
        height: 45,
        marginBottom: 15,
        marginEnd: 15,
        borderTopColor: 'transparent',
      }}
      primaryStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}
    />
  );

  const renderActions = props => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 45,
        flex: 1,
      }}>
      <Actions
        {...props}
        containerStyle={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={() => <Icon name="camera" color={'#3d85c6'} size={25} />}
        options={{
          Image: () => {
            openCamera('photo');
          },
          Video: () => {
            openCamera('video');
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#222B45"
      />
      <Actions
        {...props}
        containerStyle={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={() => <Icon name="image" color={'#3d85c6'} size={25} />}
        options={{
          Image: () => {
            openGallery('photo');
          },
          Video: () => {
            openGallery('video');
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#222B45"
      />
      <Actions
        {...props}
        containerStyle={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={() => <Icon name="microphone" color={'#3d85c6'} size={25} />}
        options={{
          'Select Audio': () => {
            openAudio();
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#222B45"
      />
    </View>
  );

  const renderComposer = props => (
    <View
      style={{
        backgroundColor: theme.SELECTED,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 8,
        alignSelf: 'flex-end',
        width: '72%',
        height: 45,
      }}>
      <Composer
        {...props}
        textInputStyle={{
          color: '#666666',
          paddingHorizontal: 8,
          textAlignVertical: 'center',
        }}
      />
      <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}>
        <Icon name="paper-plane" color={'#3d85c6'} size={20} />
      </Send>
    </View>
  );

  const renderSend = props => <View />;

  const renderAvatar = props => <Avatar {...props} />;

  const renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#999999',
            fontSize: 14,
          },
          right: {
            color: props.currentMessage.text ? theme.PRIMARY : '#999999',
            fontSize: 14,
          },
        }}
      />
    );
  };

  const renderBubble = props => (
    <Bubble
      {...props}
      // renderTime={() => <Text>Time</Text>}
      // renderTicks={() => <Text>Ticks</Text>}
      containerStyle={{
        left: {},
        right: {},
      }}
      wrapperStyle={{
        left: {
          backgroundColor: props.currentMessage.text
            ? '#EFEFEF'
            : 'transparent',
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          borderTopRightRadius: 18,
          padding: props.currentMessage.text ? 8 : 0,
          margin: 10,
        },
        right: {
          backgroundColor: props.currentMessage.text
            ? '#108FE5'
            : 'transparent',
          borderTopLeftRadius: 18,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          borderTopRightRadius: 3,
          padding: props.currentMessage.text ? 8 : 0,
          margin: 10,
        },
      }}
      bottomContainerStyle={{
        left: { alignSelf: 'flex-end' },
        right: {},
      }}
      tickStyle={{}}
      usernameStyle={{}}
      containerToNextStyle={{
        left: {},
        right: {},
      }}
      containerToPreviousStyle={{
        left: {},
        right: {},
      }}
    />
  );

  const renderSystemMessage = props => (
    <SystemMessage
      {...props}
      containerStyle={{ backgroundColor: 'pink' }}
      wrapperStyle={{ borderWidth: 10, borderColor: theme.PRIMARY }}
      textStyle={{ color: 'crimson', fontWeight: '900' }}
    />
  );

  const renderMessage = props => (
    <Message
      {...props}
      renderDay={props => <MyChatDay {...props} />}
    // containerStyle={{
    //    left: { col: 'grey' },
    //    right: { backgroundColor: 'blue' },
    // }}
    />
  );

  const renderMessageText = props => (
    <MessageText
      {...props}
      textStyle={{
        left: { color: '#333333' },
        right: { color: theme.PRIMARY },
      }}
      linkStyle={{
        left: { color: 'blue' },
        right: { color: 'blue' },
      }}
      customTextStyle={{
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        fontWeight: null,
        lineHeight: 24,
      }}
    />
  );

  const onPressImage = (item) => {

    if (item != undefined || item != null || item != '') {
      if (item.image != undefined && item.image != null && item.image != '') {
        mediaArr.push({
          uri: item.image
        })
      }
    }
    setMediaArr(mediaArr)
    setImageModal(true);
  }

  const renderMessageImage = props => {
    return (
      <Pressable style={{ borderRadius: 10, overflow: 'hidden' }} onPress={() => {
        setImageModal(true)
        let array = [];
        if (props != undefined || props != null || props != '') {
          if (props.currentMessage != undefined || props.currentMessage != null || props.currentMessage != '') {
            if (props.currentMessage.image != undefined && props.currentMessage.image != null && props.currentMessage.image != '') {     
              array.push({
                url: props.currentMessage.image
              })
            }
          }
        }
        setMediaArr(array)
      }}>
        <Image
          source={{ uri: props.currentMessage.image }}
          style={{ width: 211, height: 150, resizeMode: 'cover' }}
        />
      </Pressable>
      // <MessageImage
      //   {...props}
      //   imageStyle={{
      //     height: 150,
      //     width: 211,
      //     borderRadius: 10,
      //     backgroundColor: 'rgba(0,0,0,0.1)',
      //   }}
      //   containerStyle={{
      //     backgroundColor: 'transparent',
      //     borderRadius: 18,
      //   }}
      //   imageProps={{
      //     resizeMode: 'cover',
      //   }}
      // // style={{}}
      // //source={{uri : 'https://tenor.com/by5Qc.gif'}}
      // />
    );
  };

  const renderMessageVideo = prop => {
    console.log('video--->', prop.currentMessage.thumbnail);
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('Zen.VideoPlayer', {
            url: prop?.currentMessage?.video,
          })
        }
        style={{
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginStart: 8,
          backgroundColor: 'rgba(0,0,0,0.1)',
          alignSelf: 'flex-end',
        }}>
        <Image
          source={{ uri: prop.currentMessage.thumbnail != null ? prop.currentMessage.thumbnail : prop.currentMessage.video }}
          style={{
            height: 150,
            width: 211,
          }}
        />
        <Icon
          name="play"
          color={'#3d85c6'}
          size={40}
          style={{ position: 'absolute', top: 50, left: 90 }}
        />
      </Pressable>
    );
  };

  const renderMessageAudio = prop => {
    console.log("props audio", prop.currentMessage?.duration)
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('Zen.VideoPlayer', {
            url: prop?.currentMessage?.audio,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#EFEFEF',
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            alignSelf: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: theme.PRIMARY,
              borderRadius: 15,
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="play" color={'#3d85c6'} size={12} />
          </View>
          <View
            style={{ height: 2, width: 20, backgroundColor: theme.PRIMARY }}
          />
          <View
            style={{
              backgroundColor: theme.PRIMARY,
              borderRadius: 15,
              height: 30,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14, color: '#3d85c6' }}>{prop?.currentMessage?.duration ? moment.utc(prop?.currentMessage?.duration * 1000).format('mm:ss') : 0}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const onLoadEarlier = () => {
    setIsLoadingEarlier(true);
    getChatHistoryList(page);
  };

  const handleBlockAlert = () => {
    let str = userData?.name + "\n" + "They won't be able to see your profile or posts. They will not receive a notification for being blocked."
    Alert.alert(
      'Block user?',
      str,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Block", onPress: () => {
            apiCallBlockUser()
          }
        }
      ]
    )
  }

  const postOption = () => {
    return (
      <Menu
        ref={mainMenuPopUp}
        style={styles.menuStyle}
        anchor={
          <Pressable onPress={() => mainMenuPopUp.current.show()} style={styles.menuPlaceholderImgVw}>
            <Image style={[styles.menuPlaceholderImg]} source={require('../../../assets/images/dots.png')} />
          </Pressable>}
        onRequestClose={() => mainMenuPopUp.current.hide()}>

        <MenuItem style={{ marginBottom: -10 }} onPress={() => {
          setTimeout(() => {
            setReasonPopupShow(true)
          }, 500)
          mainMenuPopUp.current.hide()
        }}>Report User</MenuItem>

        <MenuItem onPress={() => {
          setTimeout(() => {
            handleBlockAlert()
          }, 500)
          mainMenuPopUp.current.hide()
        }}>{translate("COMMONTEXT")["BLOCK_USER"]}</MenuItem>
      </Menu>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.SELECTED} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <Pressable
          style={{ paddingLeft: 25, paddingRight: 10 }}
          onPress={() => props.navigation.goBack()}>
          <Back width={8} height={15} />
        </Pressable>
        <View style={styles.userProfileVw}>
          {receivedUser?.image != null ? (
            <Image style={styles.userImg} source={{ uri: receivedUser?.image }} />
          ) : (
            <Image
              style={styles.userImg}
              source={require('../../../assets/images/profileImage.png')}
            />
          )}
          <View style={{ flexDirection: 'column', marginStart: 8, width: '58%' }}>
            <Text style={styles.userName}>
              {receivedUser?.name ? receivedUser?.name : ''}
            </Text>
            <Text style={styles.userDesTxt}>
              {(receivedUser?.cancerName ? receivedUser?.cancerName : '') +
                (receivedUser?.cancerStage
                  ? ' - ' + receivedUser?.cancerStage
                  : '')}
            </Text>
          </View>
          <View style={styles.menuContainer} >
            {userData?.userProfileId >= 7 && <>
              <Pressable onPress={() => initialiseCall(true)}>
                <Icon
                  name="phone-alt"
                  color={'#3d85c6'}
                  size={18}
                  style={{ marginHorizontal: 3 }}
                />
              </Pressable>
              <Pressable onPress={() => initialiseCall(false)}>
                <Icon
                  name="video"
                  color={'#3d85c6'}
                  size={18}
                  style={{ marginLeft: 10, marginRight: 3 }}
                />
              </Pressable>
            </>}
            <View>
              {postOption()}
            </View>
          </View>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        loadEarlier={loadEarlier}
        onLoadEarlier={() => onLoadEarlier()}
        isLoadingEarlier={isLoadingEarlier}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        placeholder={translate("COMMONTEXT")["TYPE"]}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderChatFooter={() => <View style={{ height: 50 }} />}
        alwaysShowSend={true}
        showUserAvatar={false}
        dateFormat={'DD MMM YYYY'}
        multiline={false}
        showAvatarForEveryMessage={false}
        renderAvatar={null}
        infiniteScroll
        renderBubble={renderBubble}
        renderTime={renderTime}
        // renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderMessageImage={renderMessageImage}
        renderMessageVideo={renderMessageVideo}
        renderMessageAudio={renderMessageAudio}

        // renderMessageImage
        //renderCustomView={renderCustomView}
        timeFormat={'HH:mm'}
        timeTextStyle={{
          left: { color: '#999999', fontSize: 14, paddingTop: 0 },
          right: { color: theme.PRIMARY, fontSize: 14, paddingTop: 0 },
        }}
        onSend={messages => onSend(messages)}
        user={{
          _id: userData?.userId,
          _id: receivedUser?.userId,
        }}
      />
      {isUpload && (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              backgroundColor: theme.PRIMARY,
              width: '50%',
              height: '10%',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#108FE5', fontSize: 20 }}>
              {uploadPercent + '%'}
            </Text>
            <Text style={{ color: '#108FE5', fontSize: 20 }}>{translate("COMMONTEXT")["UPLOADING_DOT"]}
            </Text>
          </View>
        </View>
      )}
      <FullScreenImage
        theme={theme}
        modalDisplay={imageModal}
        setModalDisplay={setImageModal}
        mediaArr={mediaArr}
      />
      {isReasonPopupShow &&
        <Modal
          isVisible={isReasonPopupShow}
          animationIn={'fadeInUp'}
          animationOut={'fadeInDown'}
          onBackdropPress={() => setReasonPopupShow(false)}
          onBackButtonPress={() => setReasonPopupShow(false)}
          backdropOpacity={0.3}
        >
          <View style={styles.reasonModalContainer} >
            <View style={styles.reasonModalVw}>
              <Text style={[styles.modalTitleText, { marginTop: 5 }]} numberOfLines={1} >{translate("CHECKOUT")["REASON_TO_REPORT"]}</Text>
              {reasonArray.map((item, index) => {
                return (
                  <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }} >
                    <Pressable onPress={() => {
                      setSelectedReason(index)
                    }} >
                      {selectReason == index ?
                        <SelectItem width={23} height={23} /> :
                        <UnselectItem width={23} height={23} />}
                    </Pressable>
                    <Text style={styles.deactivateText} numberOfLines={1} onPress={() => {
                      setSelectedReason(index)
                    }}>{item.reasonTitle}</Text>
                  </View>
                );
              })}
              {selectReason === reasonArray.length - 1 &&
                <View style={styles.deletionInputVw}>
                  <TextInput
                    value={reasonValue}
                    placeholder={translate("CHECKOUT")["REASON_FOR_REPORT"]}
                    placeholderTextColor={styles.placeholderText}
                    style={styles.postText}
                    multiline={true}
                    onChangeText={(value) => setReasonValue(value)} />
                </View>
              }
              <Pressable onPress={() => {
                if (selectReason != -1) {
                  apiCallForUserReport()
                }
                setReasonPopupShow(false)
              }} style={styles.okView} >
                <Text style={[styles.okText]} numberOfLines={1} >{translate("COMMONTEXT")["OK"]}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>}
    </SafeAreaView>
  );
};
export default withTheme(Layout);