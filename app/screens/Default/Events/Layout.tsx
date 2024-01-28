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
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useIsFocused } from '@react-navigation/native';
import TabBar from '../../../components/TabBar'
import Search from '../../../assets/images/search.svg'
import Create from '../../../assets/images/eventCreate.svg'
import translate from "../../../utils/Text"
import EventItem from '../../../components/evenItem';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { InstagramLoader } from 'react-native-easy-content-loader';
import AddActivity from '../../../assets/images/AddActivity.svg';
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const isFocused = useIsFocused();
    const [searchValue, setSearchValue] = useState('');
    const [catId, setCatId] = useState({})
    const [reloadPage, setReloadPage] = useState(false)
    const [searchData, setSearchData] = useState(false)
    const [loader, setLoader] = useState(true);
    const eventCategory = useSelector((state: RootState) => state.eventReducer?.eventCategory?.length > 0 ?
        state.eventReducer.eventCategory[0]?.data : []) || [];
    const eventAll = useSelector((state: RootState) => state.eventReducer?.eventAll?.length > 0 ?
        state.eventReducer.eventAll[0]?.data : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const [searchValueShow, setSearchValueShow] = useState(false);
    const [filterObject, setFilterObject] = useState({});
    const [filterApply, setFilterApply] = useState(false);

    useEffect(() => {
        getEventCategories()
    }, [])

    useEffect(() => {
        if (isFocused) {
            getEventAll()
        }
    }, [])
    // }, [isFocused])


    useEffect(() => {
        if (eventCategory.length > 0) {
            setCatId(eventCategory[0])
        }
    }, [eventCategory])
    useEffect(() => {
        if (eventAll.length > 0) {
            setLoader(false)
        } else {
            setLoader(false)
        }
    }, [eventAll])

    //Api Call
    const getEventCategories = () => {
        props.actions.eventCategory(actionTypes.GET_EVENT_CATEGORY, {
            module: 'broadcast_event',
            action: 'broadcast_category',
        });
    }
    const getEventAll = () => {
        let formData = {
            page:1,
        }
        if(filterObject?.languageValue){
            formData.language = filterObject?.languageValue
        }
        if(filterObject?.categoryIdValue){
            formData.broadcast_cat_id = filterObject?.categoryIdValue
        }
        if(filterObject?.eventTypeValue){
            formData.eventType = filterObject?.eventTypeValue
        }
        if(filterObject?.FeeValue){
            formData.price_order = filterObject?.FeeValue == "High to Low" ?
            'ASC': "DESC"
        }
        if(filterObject?.languageValue){
            formData.language = filterObject?.languageValue
        }        
        props.actions.eventAll(actionTypes.GET_ALL_EVENTS, {
            module: 'broadcast_event',
            action: 'load_event',
            formData: formData
        });
    }
    
    const getEventByCategory = (catId: any) => {
        props.actions.categoryWiseEvent(actionTypes.GET_ALL_EVENTS, {
            module: 'broadcast_event',
            action: 'load_event',
            formData: {
                broadcast_cat_id: catId
            }
        });
    }
    const registerEvent = (id, type) => {
        props.actions.registerEvent(actionTypes.REGISTER_EVENT, {
            module: 'broadcast_event',
            action: 'broadcast_event_register',
            formData: {
                userId: userId,
                eventId: id,
                join_register: type
            }
        });
    }

    //Helper Methods
    const selectCategory = (item) => {
        setCatId(item)
        if (item.id != 0) {
            getEventByCategory(item.id)
        } else {
            getEventAll()
        }
        setReloadPage(!reloadPage)
    }

    const joinEvent = (item, type) => {
        registerEvent(item.id, type)
    }
    const updateItem = (item) => {
        item.broadcast_events_registers = [{ userId: 1 }]
        setReloadPage(!reloadPage)
    }
    const renderItemArr = ({ item, index }) => {
        return (
            <EventItem
                item={item}
                updateItem={updateItem}
                joinEvent={joinEvent}
                theme={theme}
                navigation={props.navigation}
                itemArr={eventAll}
                GoBack={(data) => {
                    if(data?.broadcastCategoryId != null &&  data?.broadcastCategoryId != undefined){
                        let cateId = eventCategory.filter((cat) => cat.id == data?.broadcastCategoryId)
                        if(cateId.length > 0){
                            selectCategory(cateId[0])
                        }
                    }
                }}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            {!searchValueShow ? <AppHeader
                    theme={theme}
                    onBackPress={() => props.navigation.pop()}
                    headerTitle={translate("DRAWER")["LIVE_EXPERIENCES"]}
                    isRightComponent={true}
                    isFirstIcon={false}
                    rightFirstIcon={<View style={styles.searchIcon}>
                        <Image source={require('../../../assets/images/eventFilter.png')} /></View>}
                    rightFirstPress={() => {props.navigation.navigate('Zen.EventFilter', {
                        filterData:filterObject ,
                        GoBack: (data: any) => {
                            if(data.Filter){
                                setFilterApply(true)
                                setFilterObject(data)
                            }else{
                                setFilterApply(false)
                                setFilterObject({Filter: false})
                            }
                        }, 
                    })}}
                    isThirdIcon={false}
                    rightThirdIcon={<View style={styles.searchIcon}>
                        <Image source={require('../../../assets/images/eventCalender.png')} /></View>}
                    rightThirdPress={() => {props.navigation.navigate('Zen.Calendar')}}
                    isFourthIcon={true}
                    rightFourthIcon={<View style={styles.searchIcon}>
                    <Search width={18} height={18} /></View>}
                    rightFourthPress={() => {setSearchValueShow(!searchValueShow)}}
                    isSecondIcon={true}
                    rightSecondIcon={<Create width={36} height={36} />}
                    rightSecondPress={() => {props.navigation.navigate('Zen.AddEvent', {
                        eventCategory: eventCategory,
                        GoBack: (data: any) => {
                            getEventAll()
                        }, 
                    })}}
                    extraHeaderTxt={{fontSize: 24}}
                    extraHeaderTxtView={{ flex:1 }}
                /> :
                <AppHeaderSearch
                    theme={theme}
                    showSearchIcon={true}
                    onBackPress={() => {setSearchValueShow(!searchValueShow)}}
                    searchValue={searchValue}
                    setSearchValue={(value: any)=> {
                        setSearchValue(value)
                        let filterData = eventAll.filter(item => item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
                            item?.aboutSpeaker?.toLowerCase().includes(value.toLowerCase()))
                        setSearchData(filterData)
                    }}
                    onSearch={() => {}}
                    inputViewStyle={{flex:0.9}}
                    inputStyle={{ flex:1 }}
                />}
            {loader &&
                <InstagramLoader active listSize={10} />}
            {!loader &&
                <TabBar
                    theme={theme}
                    data={eventCategory}
                    isEvents={true}
                    catId={catId}
                    selectExtraStyle={{backgroundColor: theme.SKY_BLUE_EVENT}}
                    selectExtraTextStyle={{color: theme.SECONDARY }}
                    extraButtonStyle={() => [{shadowOpacity:0}]}
                    extraTextStyle={() => [{color: theme.BLACK}]}
                    handleCategorySelection={(item) => selectCategory(item)} />}
            {!loader &&
                <FlatList
                    data={searchValue.length > 0 ? searchData : eventAll}
                    keyExtractor={item => item.key}
                    contentContainerStyle={{ paddingHorizontal: 23, flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItemArr}
                    ListEmptyComponent={() =>
                        <View style={styles.emptyVw} >
                            <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_EVENT_FOUND"]}</Text>
                        </View>
                    }
                />}
        </SafeAreaView>
    );
};

export default withTheme(Layout);