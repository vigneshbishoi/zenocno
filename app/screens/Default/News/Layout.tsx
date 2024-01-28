/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    FlatList,
    TextInput,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    Modal,
    Share,
    Dimensions
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import Search from '../../../assets/images/search.svg'
// import Bookmark from '../../../assets/images/bookmark_black.svg'
import Sharee from '../../../assets/images/share-black.svg'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import translate from "../../../utils/Text";
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import { scale } from 'react-native-size-matters';
import Alert from '../../../components/AlertScreen/Index';
import { useIsFocused } from '@react-navigation/native';
import CONFIG from '../../../config/app-config';
import Toast from 'react-native-toast-message';
import Bookmark from '../../../assets/images/bookmark_selected.svg';
import Bookmark1 from '../../../assets/images/bookmark_unselected.svg';

const moment = require('moment');

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const insets = useSafeAreaInsets();
    const [searchValue, setSearchValue] = useState('');
    const [searchValueShow, setSearchValueShow] = useState(false);
    const [options, setOptions] = useState(null);
    const [optionModal, setOptionModal] = useState(false)
    const [selectOption, setSelectOption] = useState({})
    const [optionHeight, setOptionHeight] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const [newsPage, setNewsPage] = useState(1)
    const [newsSearchLoader, setNewsSearchLoader] = useState(false)
    const isFocused = useIsFocused();
    const newsData =
        useSelector((state) => state.referralReducer?.news?.length > 0 ?
            state.referralReducer.news[0]?.data : []) || [];
    const newsSearchData =
        useSelector((state) => state.referralReducer?.newsSearch?.length > 0 ?
            state.referralReducer.newsSearch[0]?.data : []) || [];
    const creditLink = 'https://medicalxpress.com';

    const newsBookMarkData =
        useSelector((state) => state.referralReducer?.bookmark) ;

    //Lifecycle Methods
    useEffect(() => {
        getNewsList(newsPage)
    }, []);

    useEffect(() => {
        if(alertShow && isFocused){
            // setShowAlert(true),
            props.actions.getNewsBookMarkUpdate(actionTypes.GET_NEWS_BOOKMARK_UPDATE, {
                selectOption: selectOption
            })
            setOptionModal(false)
            Toast.show({
                type: 'success',
                text2: 'Success ! Bookmark saved'
            })
        }
    }, [newsBookMarkData]);

    useEffect(() => {
        setTimeout(() => {
            setNewsSearchLoader(false)
        }, 2000)},[newsSearchData])

    //Api Call
    const getNewsList = (data) => {
        props.actions.getNews(actionTypes.NEWS_LIST, {
            module: 'news',
            action: 'getAll',
            formData : {
                page: data,
            }
        });
    }
    const getNewsSearch = (text) => {
        props.actions.getNewsSearch(actionTypes.NEWS_SEARCH, {
            module: 'news',
            action: 'search?search_text=' + text,
        });
        setTimeout(() => {
            setNewsSearchLoader(false)
        }, 4000);
    }

    const onShare = async () => {
        let message = "I came across this news for cancer. " +
            selectOption?.title + "\n\n" +
            "You can read more such news at Zenonco Care App:\n" + `• Android: ${CONFIG.PLAY_STORE}` + '\n' + `• iOS: ${CONFIG.APP_STORE}`
        try {
            const result = await Share.share({
                message: message,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                  setOptionModal(false)
                } else {
                  // shared.
                  setOptionModal(false)
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
                setOptionModal(false)
              }
        } catch (error) {
        }
    };

    const renderItemArr = ({ item, index }) => {
        let calendarStartDate = moment(item.pubDate)
        let time1 = calendarStartDate.format('HH:mm a')
        let date = calendarStartDate.format('YYYY-MM-DD')
        return (
            <Pressable style={[styles.newsItemContainer,((newsSearchData.length - 1) == index ||
                 (newsData.length - 1) == index) && {marginBottom: 25 }]} onPress={() => {
                setOptions(null)
                props.navigation.navigate('Zen.NewsDetail', { item: item, creditLink: creditLink })
            }} >
                <View style={{position:"absolute",zIndex: 2, right:0}}>
                    <Pressable onPress={(event) => {
                        let screenHeight = Dimensions.get('screen').height
                        setOptionModal(true)
                        setOptionHeight((screenHeight - event.nativeEvent.pageY > scale(150) ?
                        event.nativeEvent.pageY : event.nativeEvent.pageY - scale(100)))
                        setSelectOption(item)
                    }} style={styles.dotsView}>
                        <View style={styles.dots} />
                        <View style={styles.dots} />
                        <View style={styles.dots} />
                    </Pressable>
                </View>
                <Image style={styles.itemImage} source={{ uri: item.media }} />
                <View style={styles.itemDescriptionContainer} >
                    <Text style={styles.newsTitleText} numberOfLines={3} >{item.title}</Text>
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom: 4}}>
                        <Text style={styles.dateTimeText} numberOfLines={1} >{moment(item?.pubDate).format("MMM DD, YYYY")}</Text>
                        <View style={styles.dot} />
                        <Text style={styles.expressText} numberOfLines={1} >Medical Express</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <View>
                {!searchValueShow ? <AppHeader
                    theme={theme}
                    onBackPress={() => props.navigation.pop()}
                    headerTitle={translate("DRAWER")["NEWS"]}
                    isRightComponent={true}
                    isSecondIcon={true}
                    rightSecondIcon={<View style={{width:36, height:36, borderRadius: 36, justifyContent:'center',
                    backgroundColor: theme.DARK_SILVER , alignItems:'center',}}>
                        <Search /></View>}
                    rightSecondPress={() => {setSearchValueShow(!searchValueShow)}}
                    extraHeaderTxt={{fontSize: 24}}
                    extraHeaderTxtView={{ flex:1 }}
                /> :
                <AppHeaderSearch
                    theme={theme}
                    showSearchIcon={true}
                    onBackPress={() => props.navigation.goBack()}
                    searchValue={searchValue}
                    setSearchValue={(value: any)=> {
                        setNewsSearchLoader(true)
                        setSearchValue(value)
                        getNewsSearch(value)
                    }}
                    onSearch={() => {}}
                    inputViewStyle={{flex:0.9}}
                    inputStyle={{ flex:1 }}
                />}
            </View>
            <FlatList
                data={searchValue.length > 0 ? newsSearchData : newsData}
                keyExtractor={item => item.key}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItemArr}
                ListEmptyComponent={() =>
                    <View style={styles.emptyVw} >
                        {newsSearchLoader ? null : searchValue.length > 0 && newsSearchData.length == 0 ?
                         <Text style={styles.noActivityText}>{translate("COMMONTEXT")["NO_NEWS_FOUND"]}</Text> :
                         searchValue.length == 0 && newsData.length == 0 ? <Text style={styles.noActivityText}>{translate("COMMONTEXT")["NO_NEWS_FOUND"]}</Text>
                            :null}
                    </View>}
                onEndReached={() => {
                    getNewsList(newsPage + 1)
                    setNewsPage(newsPage + 1)
                }}
                onEndReachedThreshold={0.5}
            />
            <Modal
                transparent={true}
                visible={optionModal}
                onRequestClose={() => {
                }}
                >
                <Pressable style={{ flex: 1 }}
                    onPress={() => { setOptionModal(false) }}>
                    {/* <View style={[styles.optionView, { top: optionHeight }]}> */}
                    <View style={[styles.optionsView,{ top: optionHeight }]}>
                        <Pressable onPress={() => {
                            setAlertShow(true)
                            props.actions.getNewsBookMark(actionTypes.GET_NEWS_BOOKMARK, {
                                module: 'news',
                                action: `create_bookmark?newsId=${selectOption?.id}&status=1`
                            });
                        }} style={{flexDirection:'row'}}>
                            {selectOption?.news_bookmarks?.length > 0 ? <Bookmark />: <Bookmark1 />}
                            <Text style={styles.shareText}>Bookmark</Text>
                        </Pressable>
                        <Pressable onPress={() => { onShare()
                            }} style={{flexDirection:'row', marginTop: 20}}>
                            <Sharee />
                            <Text style={styles.shareText}>Share</Text>
                        </Pressable>
                    </View>
                    {/* </View> */}
                </Pressable>
            </Modal>
            <Alert
                show={showAlert}
                title={"Success"}
                message={newsBookMarkData[0]?.message ? newsBookMarkData[0]?.message : 'Your news has been successfully' }
                closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                confirmText={"Ok"}
                onConfirmPressed={() => {
                setShowAlert(false)
            }}
            />
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);
