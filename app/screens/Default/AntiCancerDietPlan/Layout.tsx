/**
 * AntiCancerDietPlan layout page
 * @Author: Anand R
 * @Date: Tue Dec 21 2021 14:29:30 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import { View, Image, Pressable, Dimensions, ScrollView, BackHandler, Platform } from 'react-native';
import translate from "../../../utils/Text"
import { withTheme } from '../../../utils/ThemeProvider';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from '../../../components/CustomText';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { FONTFAMILY } from '../../../config/font-config';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { MealTiming } from './constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoader from '../../../components/Plugins/AppLoader';
import Back from '../../../assets/images/Back.svg'
import SelectFilterModal from '../../../components/Community/selectFilterModal';

const Layout = (props: any) => {
    const styles = style(props.theme);
    const { navigation, theme } = props;
    const [selectDate, setSelectDate] = useState(moment(new Date() - 1));
    const [foodsGroup, setFoodsGroup] = useState([]);
    const dietPlan = useSelector(state => state.dietPlanReducer.dietPlanData) || [];
    const ingredients = useSelector(state => state.dietPlanReducer.ingredients) || [];
    const loader = useSelector((state: any) => state.loginReducer.newLoader);
    const userId = useSelector(state => state.loginReducer.userData);
    const [show, setShow] = useState(false)
    const [emptyArr, setEmptyArr] = useState([]);
    const [valueChange, setValueChange] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
        getDataFromDate();
        getIngredientsFromDate();
        filterFoods();
    }, [selectDate])

    useEffect(() => {
        props.actions.newLoader("newLoader", true, actionTypes.NEW_LOADER)
        getDataFromDate();
        getIngredientsFromDate()
        setTimeout(() => {
            props.actions.newLoader("newLoader", false, actionTypes.NEW_LOADER)
        }, 3000)
    }, []);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackClick);
        return () => { BackHandler.removeEventListener('hardwareBackPress', handleBackClick); }
    }, [])
    const handleBackClick = () => {
        navigation.navigate("Zen.Home");
        return true
    }
    const filterFoods = () => {
        setFoodsGroup(_.groupBy(dietPlan[0]?.data, 'mealTimingId') || [])
    }
    useEffect(() => {
        if (dietPlan && dietPlan[0]?.active_plan == 0) {
            // setSelectDate(moment(new Date() - 1));
            navigation.navigate('Zen.UnlockNow');
        }
        else if (dietPlan[0]?.data) {
            filterFoods();
        }
    }, [dietPlan]);
    const getDataFromDate = () => {
        const request = {
            module: "mealPlanner",
            action: "generate_meal_plan",
            formData: {
                userId: userId?.data?.data?.id,
                date: moment(selectDate).format('YYYY-MM-DD').toString()
            }
        }

        props.actions.getDietPLan(actionTypes.GET_DIET_PLAN, request);
    }
    const getIngredientsFromDate = () => {
        const request = {
            module: "userIngredientLists",
            action: "create",
            formData: {
                userId: userId?.data?.data?.id,
                date: moment(selectDate).format('YYYY-MM-DD').toString()
            }
        }

        props.actions.ingredients(actionTypes.INGREDIENTS, request);
    }
    const FoodContainer = ({ item, parentItem }: any) => {
        console.log("1111---", item)
        return (
        <Pressable onPress={() => navigation.navigate('Zen.NutrientInformation', { item, parentItem, date: moment(selectDate).format('YYYY-MM-DD').toString() })}>
            <View style={{
                borderRadius: 12, paddingHorizontal: 10, paddingVertical:7, flexDirection: 'row', marginTop: 10,
                //borderWidth: 1,
                elevation: Platform.OS == 'ios' ? .8 : 5,
                //borderColor: '#e6e6e6',
                backgroundColor: theme.PRIMARY,
                shadowColor: '#5C6572',
                shadowOffset: {
                    width: 0,
                    height: Platform.OS == 'ios' ? 5 : 10,
                },
                shadowRadius: 5,
                shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
            }}>
                <Image source={{ uri: item.image }} style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#BDBDBD' }} />
                <View style={{ marginLeft: 10, alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 14, fontFamily: FONTFAMILY.POPPINS_MEDIUM, width: '90%', flexWrap: 'wrap', color: '#333333' }}>{item.food_item}</Text>
                    <Text style={{ fontSize: 12, fontFamily: FONTFAMILY.POPPINS_REGULAR, marginTop: Platform.OS === 'ios' ? 1 : -2, color: '#89909A' }}>{item.reference}</Text>
                </View>
                <Icon name="right" color='#5C6572' size={15} style={{ alignSelf: 'center', position: 'absolute', right: 15, width:12, height:15 }} />
            </View>
        </Pressable>
    )}
    const monthChange = (isAdd = false) => {
        let newDate = isAdd ? moment(selectDate).add(1, 'M') : moment(selectDate).subtract(1, 'M')
        setSelectDate(newDate)
    }
    const selectFilterOption = (item, index) => {
        if (emptyArr.includes(index) == true) {
            emptyArr.splice(emptyArr.indexOf(index), 1)
            setEmptyArr(emptyArr);
        } else {
            emptyArr.push(index);
            setEmptyArr(emptyArr);
        }
        setValueChange(!valueChange);
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppLoader visible={loader} textContent={translate("DIET_PLAN")["GETTING_PLAN"]} />

            {/* <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, fontFamily: FONTFAMILY.MEDIUM, color: '#5C6672' }}>{translate("DIET_PLAN")["DIET_PLAN"]}</Text> */}
            <View style={styles.selectDateContainer}>
                <Pressable onPress={() => { setShow(true) }}>
                    <View style={styles.headerVw}>
                        <Pressable onPress={() => { handleBackClick() }} style={{ flexDirection: 'row' }}>
                            <Back width={15} height={20} style={{ margin: 0 }} />
                            {/* <Text style={styles.headerText}>Let's kill cancer cells</Text> */}
                        </Pressable>
                        <View style={styles.monthNameTextVw}>
                            {/* <Icon name="left" size={17} color='#5C6572' onPress={() => { monthChange(false) }} style={{ alignSelf: 'center' }} /> */}
                            <Text style={styles.monthText}>{moment(selectDate).format('MMMM YYYY')}</Text>
                            {/* <Icon name="right" size={17} color='#5C6572' onPress={() => { monthChange(true) }} style={{ alignSelf: 'center' }} /> */}
                        </View>
                        {/* <DatePicker
                            modal
                            minimumDate={new Date("2021-01-01")}
                            open={show}
                            date={new Date(selectDate)}
                            mode={'date'}
                            onConfirm={(date) => {
                                setShow(false)
                                setSelectDate(moment(date))
                            }}
                            onCancel={() => {
                                setShow(false)
                            }}
                        /> */}
                    </View>
                </Pressable>
            </View>
            <CalendarStrip
                calendarAnimation={{ type: 'parallel', duration: 15 }}
                showMonth={false}
                scrollable={true}
                style={{ height: 100,backgroundColor:theme.PRIMARY, shadowColor: "rgba(0,0,0,0.3)",
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 6,
                shadowOpacity: 0.2,
                elevation: 3, }}
                calendarColor={theme.SECONDARY_OPACITY}
                dayComponentHeight={80}
                selectedDate={selectDate}
                startingDate={moment().startOf('isoWeek')}
                leftSelector={[]}
                rightSelector={[]}
                onDateSelected={(date) => {
                    setSelectDate(date);
                    getDataFromDate();
                    getIngredientsFromDate()
                }}
                scrollToOnSetSelectedDate={true}
                // dayContainerStyle={{
                // backgroundColor: theme.PRIMARY,
                // borderRadius: 10,
                // borderWidth: 1,
                // borderColor: '#8A909A',
                // padding: 5,
                // width: 50,
                // }}
                upperCaseDays={false}
                dateNameStyle={{ color: theme.SUB_TITLE, fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 14 }}
                highlightDateContainerStyle={{
                  //  backgroundColor: '#108FE5',
                   // shadowColor: '#108FE5',
                   // borderWidth: 0,
                    paddingHorizontal:10,
                    paddingVertical:15,
                    marginHorizontal: 10,
                    width: 60,
                    height:80,
                   // elevation: Platform.OS == 'ios' ? .8 : 50,
                    //borderColor: '#108FE5',
                    // shadowOffset: {
                    //     width: 20,
                    //     height: Platform.OS == 'ios' ? 0 : 20,
                    // },
                    // shadowRadius: 1,
                    // shadowOpacity: Platform.OS == 'ios' ? 0 : 1.0,
                }}
                highlightDateNameStyle={{ color: theme.GRAY_BLACK, fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 14 }}
                highlightDateNumberStyle={{ color: theme.PRIMARY, fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 16,  backgroundColor: theme.SECONDARY,
                borderRadius: 19,
                overflow: 'hidden',
                borderColor: '#8A909A',
                padding: 5,
                width: 38,
                height: 38,}}
                dateNumberStyle={{
                    // fontSize: 16,
                    // color: theme.GRAY_BLACK,
                    // fontFamily: FONTFAMILY.POPPINS_REGULAR,
                    backgroundColor: theme.PRIMARY,
                    borderRadius: 19,
                    overflow: 'hidden',
                    borderColor: '#8A909A',
                    padding: 5,
                    width: 38,
                    height: 38,
                }}
            />
            <ScrollView style={{ width: Dimensions.get('window').width ,backgroundColor:theme.SELECTED}}>
                <View>
                    <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent:'center' }}>
                        <Pressable style={[styles.optionView, {marginRight:7}]} onPress={() => setFilterVisible(true)}>
                            <Image source={require('../../../assets/images/ingredient.png')} style={{ width: 15, height: 15 }} />
                            <Text style={styles.optionText}>{translate("DIET_PLAN")["INGREDIENT"]}</Text>
                        </Pressable>
                         {/* <Pressable style={[styles.optionView,{marginLeft:7}]}>
                            <Image source={require('../../../assets/images/nutritiona.png')} style={{ width: 21, height: 21 }} />
                            <Text style={styles.optionText}>{translate("DIET_PLAN")["NUTRACEUTICALS"]}</Text>
                        </Pressable> */}
                    </View>
                </View>
                <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
                     {
                        Object.keys(foodsGroup).map((el, index) => ( 
                            <View>
                                <Text style={styles.titleText}>{MealTiming[el]}</Text>
                                {
                                    foodsGroup[el].map(item => <FoodContainer parentItem={item} item={item?.food_item} mealTimingId={item?.mealTimingId} />)
                                }
                            </View>
                         ))
                    } 
                </View>

            </ScrollView>
            <SelectFilterModal
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
                emptyArr={emptyArr}
                filData={ingredients}
                selectFilterOption={selectFilterOption}
                theme={theme}
            />
        </SafeAreaView>
    );
};
export default withTheme(Layout);