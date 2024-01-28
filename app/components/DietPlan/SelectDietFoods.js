import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Image, FlatList, TextInput, Dimensions, Keyboard } from 'react-native'
import { FONTFAMILY } from '../../config/font-config'
import Icon from 'react-native-vector-icons/AntDesign'
import _ from 'lodash';
import { useSelector } from 'react-redux';
import actionTypes from '../../store/actions/types';
const { width } = Dimensions.get('window');

const SelectDietFoods = (props) => {
    const { dietFoods, title, subTitle,theme, setParams, query, actions, selected } = props;
    const [selectedItems, setSelectedItems] = useState([]);
    const bfData = useSelector(state => state.dietPlanReducer.foodBfData);
    const luData = useSelector(state => state.dietPlanReducer.foodLuData);
    const snData = useSelector(state => state.dietPlanReducer.foodSnData);
    const searchData = useSelector(state => state.dietPlanReducer.searchFoodItemData)
    const [searchText, setSearchText] = useState('');
    const styles = modalStyles(theme)
    useEffect(() => {
        setSelectedItems(selected)
        var req = {
            module: "foodItem",
            action: "getFoodFromMealTiming",
            formData: {
                meal_timing: query
            }
        }
        if (query == "Breakfast") {
            actions.getFoodItemBf(actionTypes.GET_FOOD_ITEM_BF, req);
        }
        else if (query == "Evening") {
            actions.getFoodItemLu(actionTypes.GET_FOOD_ITEM_LU, req);
        }
        else {
            actions.getFoodItemSn(actionTypes.GET_FOOD_ITEM_SN, req);
        }
    }, [])
    const search = (text) => {
        setSearchText(text);
        if (text.length >= 2) {
            const req = {
                module: "foodItem",
                action: "search",
                formData: {
                    food_item: text,
                    meal_timing_id: 1
                }
            }
            props.actions.searchFoodItem(actionTypes.SEARCH_FOOD_ITEM, req);
        }
    }
    const addItems = (item) => {
        if (selectedItems.length > 0) {
            let filterItems = selectedItems.filter(el => el === item.id);
            if (filterItems.length === 0) {
                setSelectedItems([...selectedItems, item.id])
                setParams([...selectedItems, item.id])
            } else {
                setSelectedItems(_.reject(selectedItems, function (el) { return el === item.id; }))
                setParams(_.reject(selectedItems, function (el) { return el === item.id; }))
            }
        } else {
            setSelectedItems([...selectedItems, item.id])
            setParams([...selectedItems, item.id])
        }
    }


    const FoodItem = ({ item }) => (
        <Pressable onPress={() => addItems(item)}>
            <View style={{ width: width / 4, marginLeft: 10, marginTop: 15 }}>
                <Image source={{ uri: "https://via.placeholder.com/50x50.png" }} style={{ height: width / 4.5, width: width / 4.5, borderRadius: 15, alignSelf: 'center', backgroundColor: "#8A9099" }} />
                <Text style={{ marginTop: 5, fontSize: 16, textAlign: 'center', alignSelf: 'center', color: '#8A9099', fontFamily: FONTFAMILY.POPPINS_REGULAR }}>{item.food_item}</Text>
                {selectedItems.includes(item.id) && <Icon name="checkcircle" size={24} color='#108FE5' style={{ position: 'absolute', right: 10, top: 5 }} />}
            </View>
        </Pressable>
    )

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 22 }}>
                <Text style={styles.headerText}>{title}</Text>
                <Text style={styles.subText}>{subTitle}</Text>
                {/* Search bar  */}
                <View style={styles.searchBar}>
                    <TextInput
                        style={{ width: '85%', marginLeft: 5, fontSize: 16, fontFamily: FONTFAMILY.POPPINS_REGULAR, paddingVertical: '4%', color: "#BDBDBD", paddingLeft: 10 }}
                        placeholder='Add foods you like'
                        placeholderTextColor={"#BDBDBD"}
                        value={searchText}
                        // autoFocus
                        onBlur={() => Keyboard.dismiss()}
                        onChangeText={(value) => search(value)}
                    />
                    <Icon name="search1" size={24} color='#5C6572' style={{ alignSelf: 'center', marginRight: 20 }} />
                </View>
            </View>
            {/* Select BF food container */}


            {query == "Breakfast" && typeof bfData == "object" &&
                <FlatList
                    data={searchText !== "" && searchData ? searchData[0].data : bfData[0]?.data}
                    renderItem={FoodItem}
                    numColumns={3}
                    style={{ paddingHorizontal: 20, marginHorizontal: 10 }}
                    keyExtractor={item => `key${item.id}`}
                />
            }
            {
                query == "Evening" && typeof luData == "object" &&
                <FlatList
                    data={searchText !== "" && searchData ? searchData[0].data : luData[0]?.data}
                    renderItem={FoodItem}
                    numColumns={3}
                    style={{ paddingHorizontal: 20, marginHorizontal: 10 }}
                    keyExtractor={item => `key${item.id}`}
                />
            }
            {
                query == "Dinner" && typeof snData == "object" &&
                <FlatList
                    data={searchText !== "" && searchData ? searchData[0].data : snData[0]?.data}
                    renderItem={FoodItem}
                    numColumns={3}
                    style={{ paddingHorizontal: 20, marginHorizontal: 10 }}
                    keyExtractor={item => `key${item.id}`}
                />
            }



        </View>
    )
}

export default SelectDietFoods;

const modalStyles =  (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.PRIMARY,
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 22,
        width: '75%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.MEDIUM,
        color: "#5C6572"
    },
    subText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        width: '70%',
        alignSelf: 'center',
        color: '#8A9099',
        fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    optionText: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: FONTFAMILY.MEDIUM
    },
    defaultContainer: {
        marginTop: 10,
        paddingVertical: 15,
        marginHorizontal: 25,
        paddingLeft: 10,
        flexDirection: 'row', alignItems: 'center'
    },
    selectedContainer: {
        backgroundColor: '#F1F4FF',
        borderRadius: 10,
    },
    searchBar: {
        borderWidth: 1,
        width: '90%',
        // height: '10%',
        alignSelf: 'center',
        // margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: "#BDBDBD",
        marginHorizontal: 20,
    }
})
