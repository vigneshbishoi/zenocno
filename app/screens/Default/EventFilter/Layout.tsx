/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    FlatList,
    TextInput,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useIsFocused } from '@react-navigation/native';
import actionTypes from '../../../store/actions/types';
import Select_Box from '../../../assets/images/checkbox_Select.svg'
import Empty_Box from '../../../assets/images/empty_Box.svg'
import Close from '../../../assets/images/close_grey.svg'
import Search from '../../../assets/images/search_grey.svg'
import { useSelector } from 'react-redux';
import AppHeader from '../../../components/CommonInput/appHeader';
import CommonCheckBox from '../../../components/commonCheckBox';
import Slider from 'react-native-slider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FONTFAMILY } from '../../../config/font-config';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}

const DateStatic = [
    {title :'Today', select: false},
    {title :'Tomorrow', select: false},
    {title :'This Week', select: false},
    {title :'This Month', select: false},
    {title :'This Year', select: false},
    {title :'Date Range', select: false}] 

const OrganizerStatic = [
    {title :'ZenOnco.io', select: false},
    {title :'Love Heals Cancer', select: false},
    {title :'Dimple', select: false},
    {title :'Kishan', select: false},
    {title :'Chandu', select: false},
    {title :'Akshay', select: false}]

const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const isFocused = useIsFocused();
    const eventCategory = useSelector((state: RootState) => state.eventReducer?.eventCategory?.length > 0 ?
        state.eventReducer.eventCategory[0]?.data : []) || [];
    const eventAll = useSelector((state: RootState) => state.eventReducer?.eventAll?.length > 0 ?
        state.eventReducer.eventAll[0]?.data : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const [searchValueShow, setSearchValueShow] = useState(false);
    const FilterData = ['Date','Language','Fee','Distance','Category','Event Type','Organizer']
    const [DateData, setDateData] = useState([])
    const [LanguageData, setLanguageData] = useState([])
    const [OrganizerData, setOrganizerData] = useState([])
    const [CategoryData, setCategoryData] = useState([])
    const EventTypeData = ['Online','Offline']
    const Distance = ['Anywhere','Banglore, India']
    const [OrganizerDataFilter, setOrganizerDataFilter] = useState([])
    const [UpdateArr, setUpdateArr] = useState(true)
    const [FeeValue, setFeeValue] = useState('')
    const [eventTypeValue, setEventTypeValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [categoryIdValue, setCategoryIdValue] = useState('')
    const [DistanceValue, setDistanceValue] = useState('')
    const [languageValue, setLanguageValue] = useState('')
    const [languageValueId, setLanguageValueID] = useState('')
    const [organizerSearch, setOrganizerSearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [filterSelectSection, setFilterSelectSection] = useState('Date')
    const [sliderValue, setSliderValue] = useState(50)
    const eventLanguageArr = useSelector((state: RootState) => state.eventReducer?.eventLanguage?.length > 0 ?
        state.eventReducer.eventLanguage[0]?.data : []) || [];

    useEffect(() => {
        getEventCategories()
        setDateData(DateStatic)
        setOrganizerData(OrganizerStatic)
        let updateData = props.route?.params?.filterData
        if(updateData && updateData?.Filter){
            setLanguageValue(updateData?.languageValue)
            setLanguageValueID(updateData?.languageValueId)
            setFeeValue(updateData?.FeeValue)
            setCitySearch(updateData?.citySearch)
            setDistanceValue(updateData?.DistanceValue)
            setSliderValue(updateData?.sliderValue)
            setCategoryValue(updateData?.categoryValue)
            setEventTypeValue(updateData?.eventTypeValue)
            setOrganizerDataFilter(updateData?.OrganizerDataFilter)
            setCategoryIdValue(updateData?.categoryIdValue)
        }
    }, [])

    useEffect(() => {
        if(eventCategory.length > 0){
            setCategoryData()
            let updateCategory = []
            eventCategory.map((item: any) => {
                updateCategory.push({title: item.category, id: item.id, select: false})
            })
            setCategoryData(updateCategory)
        }
    }, [eventCategory])

    useEffect(() => {
        getEventLanguages()
    },[])

    useEffect(() => {
        if(eventLanguageArr?.length > 0){
            setLanguageData(eventLanguageArr)
        }
    },[eventLanguageArr])

    //Api Call
    const getEventLanguages = () => {
        props.actions.eventLanguage(actionTypes.GET_EVENT_LANGUAGE, {
            module: 'broadcast_event',
            action: 'get_broadcast_languages',
        });
    }

    //Api Call
    const getEventCategories = () => {
        props.actions.eventCategory(actionTypes.GET_EVENT_CATEGORY, {
            module: 'broadcast_event',
            action: 'broadcast_category',
        });
    }

    const removeData = () => {
        let removeDate = DateData
        removeDate.map((item) => { item.select = false })
        let removeLanguage = LanguageData
        removeLanguage.map((item) => { item.select = false })
        let removeOrganizer = OrganizerData
        removeOrganizer.map((item) => { item.select = false })
        setDateData(removeDate)
        setLanguageData(removeLanguage)
        setOrganizerData(removeOrganizer)
        setFeeValue('')
        setEventTypeValue('')
        setCategoryValue('')
        setCategoryIdValue('')
        setDistanceValue('')
        setLanguageValue('')
        setLanguageValueID('')
        setOrganizerSearch('')
        setCitySearch('')     
        setSliderValue(50)
        setUpdateArr(!UpdateArr)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            <AppHeader
                theme={theme}
                onBackPress={() => {props.navigation.goBack()}}
                headerTitle={"Filters"}
                isRightComponent={true} 
                isText={true}
                rightText={'Clear All'}
                onRightPress={() => {
                    removeData()
                    if(props.route?.params?.GoBack){
                        props.route?.params.GoBack({
                            Filter: false})
                    }
                    props.navigation.goBack()
                }}
                fontColor={theme.BLACK} />
            <View style={styles.line} />
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={styles.titleView}>
                    <FlatList 
                        data={FilterData}
                        renderItem={({item, index}) => {
                            return(
                            <Pressable onPress={() => {
                                setFilterSelectSection(item)
                            }} style={[styles.renderTitleView, {
                                backgroundColor: filterSelectSection == item ? theme.PRIMARY :theme.SEMI_GRAY
                             }]}>
                                <Text style={styles.titleText}>{item}</Text>
                            </Pressable>)
                        }}
                    />
                </View>
                <View style={{flex:1.8, paddingTop: 12}}>
                    <View style={{flex:1, marginBottom: 20}}>
                    {filterSelectSection == FilterData[0] &&<FlatList 
                        data={DateData}
                        renderItem={({item, index}: any) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    onPress={() => {
                                        if(item.select) {
                                            DateData[index].select = false,
                                            setUpdateArr(!UpdateArr)
                                        }else{
                                            DateData[index].select = true
                                            setUpdateArr(!UpdateArr)
                                        }
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item.title} showCheck={item.select}/>
                            )
                        }}
                    />}
                    {filterSelectSection == FilterData[1] && <FlatList 
                        data={LanguageData}
                        renderItem={({item, index}) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    showRadio={true}
                                    onPress={() => {
                                        if(item.language == languageValue){
                                            setLanguageValue('')
                                            setLanguageValueID('')
                                        }else{
                                            setLanguageValue(item.language)
                                            setLanguageValueID(item.id)
                                        }
                                        // if(item.select) {
                                        //     LanguageData[index].select = false,
                                        //     setUpdateArr(!UpdateArr)
                                        // }else{
                                        //     LanguageData[index].select = true
                                        //     setUpdateArr(!UpdateArr)
                                        // }
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item.language} showCheck={item.language == languageValue}/>
                            )
                        }}
                    />}
                    {filterSelectSection == FilterData[2] && 
                        <>
                        <View style={styles.feeView}>
                            <Pressable onPress={() => setFeeValue('Low to High')} 
                                style={[{backgroundColor: FeeValue == 'Low to High' ? theme.SKY_GREEN : theme.SEMI_GRAY},
                                    styles.feeButton]}>
                                <Text style={[styles.titleText,{fontWeight: '500', marginRight: FeeValue == 'Low to High' ?
                                10 : 0}]}>Low to High</Text>
                                {FeeValue == 'Low to High' && <Pressable onPress={() => setFeeValue('')}  ><Close width={8} height={8} /></Pressable>}
                            </Pressable>
                        </View>
                        <View style={styles.feeView}>
                            <Pressable onPress={() => setFeeValue('High to Low')} 
                                style={[{backgroundColor: FeeValue == 'High to Low' ? theme.SKY_GREEN : theme.SEMI_GRAY,
                                    marginTop: 15},styles.feeButton]}>
                                <Text  style={[styles.titleText,{fontWeight: '500', marginRight: FeeValue == 'High to Low' ?
                                10 : 0}]}>High to Low</Text>
                                {FeeValue == 'High to Low' && <Pressable onPress={() => setFeeValue('')}  ><Close width={8} height={8} /></Pressable>}
                            </Pressable>
                        </View>
                        </>
                        }
                    {filterSelectSection == FilterData[3] && 
                    <>
                    {/* <View style={styles.searchView}>
                        <TextInput 
                            placeholder='Choose a City'
                            value={citySearch}
                            placeholderTextColor={theme.SUB_TITLE}
                            style={{flex:0.9, fontSize: 12, }}
                            onChangeText={(text) => {
                                setCitySearch(text)
                            }}
                        />
                        <Search width={12} height={12} />
                    </View> */}
                    <GooglePlacesAutocomplete
                        placeholder={translate("ONBOARDING")["CITY_AFTER"]}
                        renderRightButton={() => (
                            <View style={{ position: 'absolute', right: 12, bottom: 10 }}>
                            <MaterialIcons name='keyboard-arrow-down' size={18} color={theme.SEARCH_TITLE} />
                            </View>
                        )}
                        styles={{
                            textInputContainer: {
                            marginTop:15,
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            color: theme.GRAY_BLACK,
                            flex:0
                            },
                            container:{
                                flex:0
                            },
                            textInput: {
                            height: 30,
                            backgroundColor: theme.SELECTED,
                            color: theme.SECONDARY ,
                            fontSize: 13,
                            paddingBottom: 0,
                            paddingLeft: 5,
                            borderBottomColor: theme.SEARCH_TITLE,
                            borderBottomWidth: 1,
                              fontFamily: FONTFAMILY.POPPINS_REGULAR,
                            },
                        }}
                        onPress={(data) => {
                            setCitySearch(data)
                        }}
                        query={{
                            key: 'AIzaSyCGH4acjEkrGjauew6afJTzi7i6UiW3Yvs',
                            language: 'en',
                        }}
                        />
                    <FlatList 
                        data={Distance}
                        style={{flexGrow:0, marginBottom: 40}}
                        renderItem={({item, index}) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    showRadio={true}
                                    onPress={() => {
                                        if(eventTypeValue == item){
                                            setDistanceValue('')
                                        }else setDistanceValue(item)
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item} showCheck={DistanceValue == item}/>
                            )
                        }}
                    />
                    <View>
                        <Slider
                            style={{ marginHorizontal: 15, }}  
                            minimumTrackTintColor={theme.PAGINATION_SELECCT}
                            onValueChange={(value) => {setSliderValue(value)}}
                            thumbStyle={styles.sliderStyle}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            trackStyle={{ backgroundColor: '#c9c9c9', height: 2}}
                            value={sliderValue}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={[styles.titleText,{fontWeight: '400', fontSize: 10,
                            marginHorizontal: 15}]}>0</Text>
                            <Text style={[styles.titleText,{fontWeight: '400', fontSize: 10,
                            backgroundColor:'#737373', color: 'white',paddingHorizontal: 5,
                            borderRadius: 10, paddingVertical: 1,
                            marginHorizontal: 15}]}>{sliderValue}km</Text>
                            <Text style={[styles.titleText,{fontWeight: '400', fontSize: 10,
                            marginHorizontal: 15}]}>100</Text>
                        </View>
                    </View>
                    </>}
                    {filterSelectSection == FilterData[4] && <FlatList 
                        data={CategoryData}
                        renderItem={({item, index}) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    showRadio={true}
                                    onPress={() => {
                                        if(categoryValue == item.title){
                                            setCategoryValue('')
                                            setCategoryIdValue('')
                                        }else {setCategoryValue(item.title)
                                            setCategoryIdValue(item.id)}
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item.title} showCheck={categoryValue == item.title}/>
                            )
                        }}
                    />}
                    {filterSelectSection == FilterData[5] && <FlatList 
                        data={EventTypeData}
                        renderItem={({item, index}) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    showRadio={true}
                                    onPress={() => {
                                        if(eventTypeValue == item){
                                            setEventTypeValue('')
                                        }else setEventTypeValue(item)
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item} showCheck={eventTypeValue == item}/>
                            )
                        }}
                    />}
                    {filterSelectSection == FilterData[6] && 
                    <>
                    <View style={styles.searchView}>
                        <TextInput 
                            placeholder='Search'
                            value={organizerSearch}
                            placeholderTextColor={theme.SUB_TITLE}
                            style={{flex:0.9, fontSize: 12, }}
                            onChangeText={(text) => {
                                setOrganizerSearch(text)
                                let UpdateData = OrganizerData.filter((item, index) => item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
                                setOrganizerDataFilter(UpdateData)
                            }}
                        />
                        <Search width={12} height={12} />
                    </View>
                    <FlatList 
                        data={organizerSearch != '' ? OrganizerDataFilter : OrganizerData}
                        renderItem={({item, index}) => {
                            return(
                                <CommonCheckBox 
                                    extraButtonStyle={{ paddingHorizontal: 15,
                                    paddingVertical: 15 }}
                                    onPress={() => {
                                        if(item.select) {
                                            if(organizerSearch != ''){
                                                OrganizerDataFilter[index].select = false,
                                                setUpdateArr(!UpdateArr)
                                            }{
                                                OrganizerData[index].select = false,
                                                setUpdateArr(!UpdateArr)
                                            }
                                        }else{
                                            if(organizerSearch != ''){
                                                OrganizerDataFilter[index].select = true,
                                                setUpdateArr(!UpdateArr)
                                            }{
                                                OrganizerData[index].select = true,
                                                setUpdateArr(!UpdateArr)
                                            }
                                        }
                                    }}
                                    extrTextStyle={{color: theme.BLACK}}
                                    title={item.title} showCheck={item.select}/>
                            )
                        }}
                    />
                    </>}
                    </View>
                    <Pressable onPress={() => {
                        if(props.route?.params?.GoBack){
                            props.route?.params.GoBack({
                                Filter: true,
                                DateData: DateData, LanguageData: LanguageData,
                                FeeValue : FeeValue,
                                citySearch: citySearch,
                                DistanceValue: DistanceValue,
                                sliderValue:sliderValue,
                                categoryValue: categoryValue,
                                eventTypeValue: eventTypeValue, 
                                OrganizerDataFilter: OrganizerDataFilter , 
                                OrganizerData: OrganizerData,
                                languageValue: languageValue,
                                languageValueId: languageValueId,
                                categoryIdValue: categoryIdValue})
                        }
                        props.navigation.goBack()
                    }} style={styles.saveButton}>
                        <Text style={[styles.headerText, { color: theme.PRIMARY }]}>Apply</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default withTheme(Layout);