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
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import TabBar from '../../../components/TabBar'
import SearchHeaderIcon from '../../../assets/images/searchHeaderIcon.svg'
import translate from "../../../utils/Text"
import Filter from '../../../assets/images/filter_.svg';
import AnticancerDiet from '../../../assets/images/anticancer_dl.svg'
import Ayurveda from '../../../assets/images/ayurved_dl.svg'
import MedicalCBD from '../../../assets/images/medicalcbd_dl.svg'
import SearchIcon from '../../../assets/images/search_black.svg'
import Search from '../../../assets/images/search.svg'
import DoctorsListItem from '../../../components/Doctorlist/doctorsListItem.js'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import moment from 'moment'
import {handleSlots} from '../../../utils/commonFunction';
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import { useNavigation } from '@react-navigation/native';


interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [slots, setSlots] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [book, setBook] = useState(-1)
    const [selectAvailableDate, setSelectAvailbleDate] = useState('')
    const [selectAvailableTime, setSelectAvailbleTime] = useState('')
    const [selectedDate, setSelectDate] = useState('')
    const [searchValueShow, setSearchValueShow] = useState(false);

    const doctorData =
        useSelector((state) => state?.appointmentReducer?.doctors?.length > 0 ?
            state?.appointmentReducer?.doctors[0]?.data : []) || [];
    const doctorCategory =
        useSelector((state) => state?.appointmentReducer?.docotorCategory?.length > 0 ?
            state?.appointmentReducer?.docotorCategory[0]?.data : []) || [];
    const doctorSchedule =
        useSelector((state) => state?.appointmentReducer?.schedule?.length > 0 ?
            state?.appointmentReducer?.schedule[0] : []) || [];
    const [catId, setCatId] = useState(0)     
    const doctorDataSearch = useSelector((state) => state?.appointmentReducer?.searchData);

    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    
    //Lifecycle Methods
    useEffect(() => {
        getDoctorCategory()
        getDoctorList(0)
    }, [])
    
    useEffect(() => {
        if(doctorSchedule != undefined && doctorSchedule?.data?.length > 0){
            handleSlots(doctorSchedule, setSlots, setBookedSlots, setAvailableDates)
        }
    }, [doctorSchedule])


    //Api Call
    const getDoctorCategory = () => {
        props.actions.doctorCategory(actionTypes.DOCTOR_CATEGORY, {
            module: 'appointment',
            action: 'app_category_list',
            formData:{
                page:1
            }
        });
    }
    const getDoctorList = (catId) => {
        setBook(-1)
        let obj = {page: 1}
        if(catId > 0){
            obj.apptCategoryId = catId
        }
        props.actions.fetchDoctors(actionTypes.FETCH_DOCTORS, {
            module: 'appointment',
            action: 'doctor_list',
            formData: obj
        });
    }
    const getSchedule = (item, index) => {
        setBook(index)
        props.actions.doctorSchedule(actionTypes.DOCTOR_SCHEDULE, {
            module: 'appointment',
            action: 'get_reschedule_appointment',
            formData: {
                doctorId: item?.id
            }
        });
    }

    const onSaveDoctorBookNark = (item: any) =>{
        props.actions.saveDoctorData(actionTypes.SAVE_DOCTORS, {
            module: 'appt',
            action: `appt_bookmarks?userId=${userId}&apptNameId=${item?.id}&status=1`,
        });
   
    }

     //Helper methods
    const selectCategory = (item) => {
        setCatId(item.id)
        getDoctorList(item.id)
    }
    const renderDoctorsList = ({ item, index }) => {
        return (
                <DoctorsListItem
                    item={item}
                    index={index}
                    theme={theme}
                    isDoctorsList={true}
                    navigation={props.navigation}
                    book={book}
                    bookNow={() => getSchedule(item, index)}
                    dates={availableDates}  
                    slots={slots}
                    bookSlot={bookedSlots}
                    selectAvailableDate={selectAvailableDate}
                    setSelectAvailbleDate={setSelectAvailbleDate}
                    selectAvailableTime={selectAvailableTime}
                    setSelectAvailbleTime={setSelectAvailbleTime}
                    selectedDate={selectedDate}
                    setSelectDate={setSelectDate}
                    searchValue={searchValue.length > 0}
                    onSaveDoctorBookMark={()=> onSaveDoctorBookNark(item)}
                />
        );
    }
    
    return (
        <View style={styles.container}>
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <View>
                {!searchValueShow ? <AppHeader
                    theme={theme}
                    onBackPress={() => props.navigation.pop()}
                    headerTitle={translate("COMMONTEXT")["DOCTORS"]}
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
                        setSearchValue(value)
                        setSearchValue(value)
                        let filterData = doctorData.filter(item => item?.doctorName?.toLowerCase().includes(value.toLowerCase()))
                        setSearchData(filterData)
                        props.actions.fetchDoctorsSearch(actionTypes.FETCH_DOCTORS_SEARCH, {
                            module: 'appointment',
                            action: `doctor_search?search_text=${value}&apptCategoryId=${catId}`
                        });
                    }}
                    onSearch={() => {}}
                    inputViewStyle={{flex:0.9}}
                    inputStyle={{ flex:1 }}
                />}
            </View>
            {/* <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DOCTORSLIST")["CONNECT_WITH_EXPERT"]}
                isRightComponent={true}
                isSecondIcon={true}
                rightSecondIcon={()=> <SearchHeaderIcon/>}
                rightSecondPress={() => { }}
            /> */}
            {/* <View style={styles.searchVw} >
                <Search width={16} height={16} style={{ marginHorizontal: 10 }} />
                <TextInput placeholder={translate("DOCTORSLIST")["SEARCH_DOCTOR"]} returnKeyType='search' placeholderTextColor={theme.SEARCH_TITLE} onChangeText={value => {
                    setSearchValue(value)
                    let filterData = doctorData.filter(item => item?.doctorName?.toLowerCase().includes(value.toLowerCase()))
                    setSearchData(filterData)
                    props.actions.fetchDoctorsSearch(actionTypes.FETCH_DOCTORS_SEARCH, {
                        module: 'appointment',
                        action: `doctor_search?search_text=${value}&apptCategoryId=${catId}`
                    });
                }}
                    value={searchValue} inlineImageLeft='search_icon' style={styles.searchText} />
            </View> */}

            <TabBar
                theme={theme}
                data={doctorCategory}
                isDoctorsList={true}
                catId={catId}
                handleCategorySelection={(item) => {selectCategory(item)
                    if(searchValue.length > 0){
                        props.actions.fetchDoctorsSearch(actionTypes.FETCH_DOCTORS_SEARCH, {
                            module: 'appointment',
                            action: `doctor_search?search_text=${searchValue}&apptCategoryId=${item.id}`
                        }); 
                }}} />
            <View style={styles.dividerLine} />
            <FlatList
                data={searchValue.length > 0 ? doctorDataSearch :  doctorData}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={renderDoctorsList}
                ListEmptyComponent={() =>
                    <View style={styles.emptyVw} >
                        <Text style={styles.noActivityText}> {translate("COMMONTEXT")["NO_DOCTOR_FOUND"]}</Text>
                    </View>
                }
            />
        </SafeAreaView>
        </View>
    );
};

export default withTheme(Layout);