import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SelectFoods = () => {
    return (
        <View style={styles.foodContainer}>
            <Text>SelectFoods</Text>
        </View>
    )
}

export default SelectFoods

const styles = StyleSheet.create({
    foodContainer:{
        height:'100%',
        backgroundColor:'red'
    }
})
