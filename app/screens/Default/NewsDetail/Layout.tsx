/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
    Pressable,
    View,
    Image,
    Text,
    StatusBar,
    Share,
    ScrollView,
    FlatList,
    Platform
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/backWhite.svg'
import Share1 from '../../../assets/images/share-black.svg';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import CONFIG from '../../../config/app-config';
import translate from "../../../utils/Text";
import AppHeader from '../../../components/CommonInput/appHeader';
import { useNavigation } from '@react-navigation/native';
import Alert from '../../../components/AlertScreen/Index';
import Toast from 'react-native-toast-message';
import Bookmark from '../../../assets/images/bookmark_selected.svg';
import Bookmark1 from '../../../assets/images/bookmark_unselected.svg';
import request from '../../../services/client';
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
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [dataAdd, setDataAdd] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const item = props?.route?.params?.item
    const desText = 'Scientists at the Francis Crick Institute have found that using immunotherapy alongside a drug that blocks a common gene mutation in lung cancer could be a promising new combination therapy for certain types of lung tumors.\n\nTheir work, published today (20 July) in Science Advances, could help select patients for clinical trials to confirm whether this combination therapy is effective in people.'
    const newsDetail =
        useSelector((state) =>
            state.referralReducer?.newsDetail?.length > 0 ?
                state.referralReducer.newsDetail[0]?.data : []
        ) || [];
    let calendarStartDate = moment(newsDetail?.pubDate)
    let time1 = calendarStartDate.format('HH:mm a')
    let date = calendarStartDate.format('MMM DD, YYYY')
    const newsBookMarkData =
        useSelector((state) => state.referralReducer?.bookmark) ;

    //Lifecycle Methods
    useEffect(() => {
        getNewsById()
    }, []);

    useEffect(() => {
        if(Platform.OS != 'android'){
            if(!dataAdd){
                setData(newsDetail)
            }else{
                setData(data.concat(newsDetail))
            }
        }
    }, [newsDetail]);

    useEffect(() => {
        if(alertShow){
            // setShowAlert(true)
            Toast.show({
                type: 'success',
                text2: 'Success ! Bookmark saved'
            })
        }
    }, [newsBookMarkData]);

    //Api Call
    const getNewsById = async () => {
        if(Platform.OS == 'android'){
            try {
                let getData = await request({method: 'get', data: {
                    module: 'news',
                    action: 'getById',
                    formData: {
                        id: item?.id
                    }}})   
                if(getData?.data?.data?.length > 0)
                {
                    setData(getData?.data?.data)
                }
                    console.log('getDatagetData', getData?.data?.data);
                    
            } catch (error) {
                
            }
        } else{
            props.actions.getNewsById(actionTypes.NEWS_DETAIL, {
                module: 'news',
                action: 'getById',
                formData: {
                    id: item?.id
                }
            });
        }
    }

    const OnEndReach = async () => {
        if(Platform.OS == 'android'){
            try {
                let getData = await request({method: 'get', data: {
                    module: 'news',
                    action: 'getById',
                    formData: {
                        pubDate: data[data.length - 1]?.pubDate,
                        load_more: 1
                    }}})   
                if(getData?.data?.data?.length > 0)
                {
                    setData(data.concat(getData?.data?.data))
                }   
            } catch (error) {
                
            }
        }else{
        props.actions.getNewsById(actionTypes.NEWS_DETAIL, {
            module: 'news',
            action: 'getById',
            formData: {
                pubDate: data[data.length - 1]?.pubDate,
                load_more: 1
            },
            static: true
        }); 
        }
        setDataAdd(true)
    }
    const onShare = async (data: any) => {
        let message = "I came across this news for cancer. " +
            data + "\n\n" +
            "You can read more such news at Zenonco Care App:\n" + `• Android: ${CONFIG.PLAY_STORE}` + '\n' + `• iOS: ${CONFIG.APP_STORE}`
        try {
            const result = await Share.share({
                message: message,
            });
        } catch (error) {
        }
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <Pressable onPress={() => {
                navigation.goBack()
            }} style={[styles.backView,{top: insets.top + 10}]}>
                <Back width={9} height={15} color={'white'} />
            </Pressable>
            
            {/* <ScrollView showsVerticalScrollIndicator={false} > */}
            <FlatList 
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                   return( <>
                        <Image source={{ uri: item?.media }} style={styles.authorImage} />
                        <View style={{ paddingHorizontal: 20,marginBottom: 10  }}>
                            <View style={styles.semiItemView}>
                                <Text style={styles.expressText} numberOfLines={1} >Medical Express</Text>
                                <View style={styles.semiItemExtraView}>
                                    <Pressable onPress={() => {onShare(item?.title)}} style={styles.shareButton}>
                                        <Share1 />
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        setAlertShow(true)
                                        props.actions.getNewsBookMark(actionTypes.GET_NEWS_BOOKMARK, {
                                            module: 'news',
                                            action: `create_bookmark?newsId=${item?.id}&status=1`
                                        });
                                        data[index].news_bookmarks=[{id : item.id}]
                                        props.actions.getNewsBookMarkUpdate(actionTypes.GET_NEWS_BOOKMARK_UPDATE, {
                                            selectOption: item
                                        })
                                    }} style={[styles.shareButton,{ marginRight : -8}]}>
                                        {item?.news_bookmarks?.length > 0 ? <Bookmark />: <Bookmark1 />}
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={styles.newsTitleTxt} numberOfLines={3} >{item?.title}</Text>
                            <Text style={styles.dateTimeText} numberOfLines={1} >{moment(item?.pubDate).format('MMM DD, YYYY')}</Text>
                            <Text style={styles.descText} >{item?.description}</Text>
                        </View>
                        <View style={{ height:1, backgroundColor: theme.TAB_BG, 
                            marginHorizontal:15, marginBottom: 20 }} />
                    </>)
                }}
                onEndReached={() => {
                    OnEndReach()
                  }}
                onEndReachedThreshold={0.5}
            />
            {/* </ScrollView> */}
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
