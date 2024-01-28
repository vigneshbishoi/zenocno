import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, StatusBar, FlatList, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { FONTFAMILY } from '../../config/font-config';
import Icon from 'react-native-vector-icons/AntDesign'
import actionTypes from "../../store/actions/types";
import { useSelector } from "react-redux"
const height = Dimensions.get('window').height;

// const allergiesFoodItems = [
//     {
//         label: 'None',
//         value: 1
//     },
//     {
//         label: 'Gluten',
//         value: 2
//     }, {
//         label: 'Lactose',
//         value: 3
//     },
//     {
//         label: 'Nuts',
//         value: 4
//     },
//     {
//         label: 'Soy',
//         value: 5
//     }
// ]

const AllergiesFood = (props) => {
    const { setAllergiesParams, theme, iconEnable = true } = props
    const [selectedItems, setSelectedItems] = useState([]);
    const styles = modalStyles(theme);
    const allergiesFoodItems = useSelector(state => state?.dietPlanReducer?.allergies?.length > 0 ? state?.dietPlanReducer?.allergies[0]?.data : []);

    const addItems = (item) => {
        if (selectedItems.length > 0) {
            let filterItems = selectedItems.filter(el => el === item.id);
            if (filterItems.length === 0) {
                setSelectedItems([...selectedItems, item.id]);
                setAllergiesParams([...selectedItems, item.id]);
            } else {
                setSelectedItems(_.reject(selectedItems, function (el) { return el === item.id; }))
                setAllergiesParams(_.reject(selectedItems, function (el) { return el === item.id; }))
            }
        } else {
            setSelectedItems([...selectedItems, item.id]);
            setAllergiesParams([...selectedItems, item.id]);
        }
    }

    useEffect(() => {
        var request = {
            module: "foodItem",
            action: "get_food_allergies"
        }
        props.actions.getAllergiesFoods(actionTypes.GET_ALLERGIES_FOODS, request);
        console.log("123")
    }, [])

    const CheckItems = ({ item }) => (
        <Pressable onPress={() => addItems(item)} >
            <View style={[styles.defaultContainer, selectedItems.includes(item.value) && styles.selectedContainer]}>
                <MaterialCommunityIcons
                    name={selectedItems.includes(item.value) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={20}
                    color={"#108FE5"}
                />
                <Text style={styles.optionText}>{item.label}</Text>
            </View>
        </Pressable>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{translate("DIET_PLAN")["ALLERGY"]}</Text>
            {/* <Text style={styles.subText}>{translate("DIET_PLAN")["ALLERGY_SUB"]}</Text> */}
            <FlatList
                // numColumns={2}
                style={styles.content}
                keyExtractor={(item, index) =>item.value}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => addItems(item)}>
                            <View style={[styles.foodContainer, index == 0 && { borderTopWidth: 4 }]}>
                                <Image source={require('../../assets/images/allergy.png')} style={styles.allergyImage} />
                                <View style={styles.itemVw}>
                                    <Text style={styles.allergyName}>{item?.condition}</Text>
                                    {(selectedItems.includes(item.id) && iconEnable) && <Icon name="checkcircle" size={22} color='#19ceab' style={{ position: 'absolute', right: 0 }} />}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        // <Pressable
                        //   onPress={() => {
                        //     addItems(item)
                        //   }
                        //   }
                        //   style={[styles.item, { backgroundColor: selectedItems.includes(item.value) ? (theme.SECONDARY) : "white" }]}>
                        //   <Text style={[styles.unselected_text, { color: selectedItems.includes(item.value) ? theme.PRIMARY : theme.MEDIUM_GRAY, }]} >{item.label}</Text>
                        // </Pressable>
                    );
                }}
                data={allergiesFoodItems} />
        </View>
    )
}

export default AllergiesFood;

const modalStyles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.PRIMARY
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        width: '75%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.BLACK
    },
    subText: {
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 15 : 10,
        marginBottom: 10,
        fontSize: 14,
        width: '85%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE
    },
    content: {
        marginTop: height * 0.02
    },
    optionText: {
        color: "#8A9099",
        marginLeft: 10,
        fontSize: 18,
        fontFamily: FONTFAMILY.MEDIUM
    },
    defaultContainer: {
        marginTop: 5,
        paddingVertical: 10,
        marginHorizontal: 25,
        paddingLeft: 10,
        flexDirection: 'row', alignItems: 'center'
    },
    unselected_text: {
        fontSize: 16,
        fontFamily: FONTFAMILY.MEDIUM,
        color: theme.DARK_GRAY
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 25,
        borderRadius: 15,
        paddingVertical: 40,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    foodContainer: {
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
        backgroundColor: theme.PRIMARY,
        paddingHorizontal: 5,
        borderBottomWidth: 4,
        borderColor: theme.SELECTED
    },
    selectedContainer: {
        //borderWidth: 2,
        //borderColor: '#108FE5',
        backgroundColor: theme.PRIMARY
    },
    allergyImage:{ 
        height: 35, 
        width: 35, 
        marginLeft:5, 
        borderRadius: 17.5 
    },
    itemVw:{ 
        marginLeft: 10, 
        justifyContent: 'center', 
        width: '85%' 
    },
    allergyName:{ 
        fontSize: 16, 
        fontFamily: FONTFAMILY.POPPINS_MEDIUM, 
        color: theme.GRAY_BLACK 
    }
})
