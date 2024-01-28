/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { FONTFAMILY } from '../../../config/font-config';
import actionTypes from '../../../store/actions/types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLoader from '../../../components/Plugins/AppLoader';
import { searchUserRequest } from '../../../services/chat';
import { useIsFocused } from '@react-navigation/native';
import translate from '../../../utils/Text'
import AppHeader from '../../../components/CommonInput/appHeader';


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
  const socketRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [conversationList, setConversationList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const isFocused = useIsFocused();
  const data = [
    { name: 'Vijay Patil', id: '1' },
    { name: 'Divya Sharma', id: '2' },
    { name: 'Sandeep Joshi', id: '3' },
    { name: 'Vishal Verma', id: '4' },
  ];
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);

  useEffect(() => {
    getUsersListDetails('');
  }, [isFocused])

  useEffect(() => {
    return () => {
      setSearchText('');
    };
  }, []);

  const getUsersListDetails = async value => {
    //setIsLoader(true)
    let data = {
      userId: userId,
      page: 1,
      search_name: value
    }
    const response = await searchUserRequest(data);
    if (response?.data) {
      setConversationList(response?.data?.data);
      //console.log("asios response", response?.data?.data.length)
    }
    //setIsLoader(false)
  };

  //  const searchTextList = (e) => {
  //     let text = e.toLowerCase()
  //     let trucks = data
  //     let filteredName = trucks.filter((item) => {
  //       return item.name.toLowerCase().match(text)
  //     })
  //     if (!text || text === '') {
  //        setConversationList(data)
  //     } else if (!Array.isArray(filteredName) && !filteredName.length) {
  //       // set no data flag to true so as to render flatlist conditionally
  //       setConversationList([])
  //     } else if (Array.isArray(filteredName)) {
  //       setConversationList(filteredName)
  //     }
  //   }

  const chatRender = ({ item, index }) => {
    //console.log("items------------", item)
    // {"cancer_category": {"name": "Breast Cancer"}, "image": "https://zenapp-test.s3.ap-south-1.amazonaws.com/image-1654931201692.jpg", "name": "Ast
    // ha ", "userId": 1}
    return (
      <Pressable
        onPress={() => {
          setSearchText('');
          let user = {
            name: item?.name,
            image: item?.image ? item?.image : null,
            userId: item?.userId ? item?.userId : "",
            cancerName: item?.cancer_category?.name ? item?.cancer_category?.name : "",
            cancerStage: item?.cancer_stage?.cancer_stage ? item?.cancer_stage?.cancer_stage : ""
          }
          console.log("user------------", user)
          props.navigation.navigate('Zen.Chat', { user: user });
        }}>
        <View style={{ flexDirection: 'row', paddingVertical: 10, width: '95%' }}>
          {item?.image != null ? (
            <Image
              style={{ height: 50, width: 50, borderRadius: 10 }}
              source={{ uri: item?.image }}
            />
          ) : (
            <Image
              style={{ height: 50, width: 50, borderRadius: 10 }}
              source={require('../../../assets/images/profileImage.png')}
            />
          )}
          <View
            style={{
              flexDirection: 'column',
              width: '80%',
              marginHorizontal: 8,
              justifyContent: 'center',
            }}>
            <Text style={styles.chatUserName} numberOfLines={1}>
              {item?.name}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.PRIMARY} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={translate("COMMONTEXT")["SEARCH_PEOPLE"]}
        isRightComponent={true}
      />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.searchVw}>
          <Icon name="search" color={'#A2A2A2'} size={18} />
          <TextInput
            placeholder={translate("COMMONTEXT")["SEARCH"]}
            placeholderTextColor={'#A2A2A2'}
            style={styles.searchInput}
            value={searchText}
            onChangeText={value => {
              setSearchText(value), getUsersListDetails(value);
            }}
          />
        </View>
        <Text style={styles.recentText}>{translate("COMMONTEXT")["SUGGESTED"]}</Text>
        {conversationList?.length > 0 ? (
          <FlatList
            data={conversationList}
            keyExtractor={(item, index) => item?.userId}
            renderItem={chatRender}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}
            nestedScrollEnabled={false}
          />
        ) : (
          <View style={styles.noConversationVw}>
            <Text style={styles.noConversation}>
              {translate("COMMONTEXT")["NO_CONVERSATION"]}
            </Text>
          </View>
        )}
      </View>
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
