import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Platform } from 'react-native'
import { FONTFAMILY } from '../../config/font-config'
import { data } from './cuisinesData'
import _ from 'lodash';
import themes from '../../config/themes-config';
import FoodContainer from './FoodContainer';
import actionTypes from '../../store/actions/types';
import { useSelector } from "react-redux"
import translate from "../../utils/Text"
const height = Dimensions.get('window').height;


const CuisinesFoods = (props) => {
    const { theme,setCuisineParams } = props;
    const styles = modalStyles(theme);
    const [selectedItems, setSelectedItems] = useState([]);
    const cuisines = useSelector(state => state.dietPlanReducer.cuisinesData);

    const addItems = (item) => {
        if (selectedItems.length > 0) {
            let filterItems = selectedItems.filter(el => el === item.id);
            if (filterItems.length === 0) {
                setSelectedItems([...selectedItems, item.id]);
                setCuisineParams([...selectedItems, item.id]);
            } else {
                setSelectedItems(_.reject(selectedItems, function (el) { return el === item.id; }));
                setCuisineParams([...selectedItems, item.id]);
            }
        } else {
            setSelectedItems([...selectedItems, item.id]);
            setCuisineParams([...selectedItems, item.id]);
        }
    }
    useEffect(() => {
        var request = {
            module: "cuisine",
            action: "getAll",
        }
        // props.actions.loader("loader", true, actionTypes.LOADER);
        props.actions.getCuisines(actionTypes.GET_CUISINES, request, request);
        console.log("Cuisine Foods", cuisines)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{translate("DIET_PLAN")["CUISINE"]}</Text>
            {/* <Text style={[styles.subText,{color:theme.SUB_TITLE}]}>{translate("DIET_PLAN")["CUISINE_SUB"]}</Text> */}
            <ScrollView style={{ marginTop: height * 0.02}} showsVerticalScrollIndicator={false} >
                {
                    typeof cuisines == "object" && cuisines[0]?.data.map((item, index )=> (
                        <FoodContainer
                            key={item.id}
                            theme={props.theme}
                            item={item}
                            index={index}
                            addItems={addItems}
                            iconEnable
                            selectedItems={selectedItems} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default CuisinesFoods

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
        marginTop: Platform.OS === 'ios' ? 10 : 5,
        marginBottom: 10,
        fontSize: 14,
        width: '55%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
})
