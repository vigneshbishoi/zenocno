import React from 'react'
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Platform } from 'react-native'
import { FONTFAMILY } from '../../config/font-config'
import Icon from 'react-native-vector-icons/AntDesign'
// import themes from '../../config/themes-config'

const FoodContainer = ({ item, selectedItems = [], addItems, iconEnable = true, theme, index }) => {
    const styles = modalStyles(theme);
    return (
        <TouchableWithoutFeedback onPress={() => addItems(item)}>
            <View style={[styles.foodContainer, index == 0 && { borderTopWidth: 4 }]}>
                <Image source={{ uri: item.image ? item.image : "" }} style={styles.itemImage} />
                <View style={styles.desContainer}>
                    <Text style={styles.dietType} numberOfLines={1} >{item.cuisine}</Text>
                    <Text style={styles.dietDes} numberOfLines={1} >{item.description}</Text>
                    {(selectedItems.includes(item.id) && iconEnable) &&
                        <Icon name="checkcircle" size={21} color='#19ceab' style={styles.checkMark} />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default FoodContainer;

const modalStyles = (theme) => StyleSheet.create({
    foodContainer: {
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
        backgroundColor: theme.PRIMARY,
        paddingHorizontal: 5,
        borderBottomWidth: 4,
        borderColor: theme.SELECTED
    },
    itemImage: {
        height: 54,
        width: 54,
        marginLeft: 5,
        borderRadius: 27,
        backgroundColor: theme.MEDIUM_GRAY
    },
    desContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        width: '80%'
    },
    dietType: {
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.GRAY_BLACK
    },
    dietDes: {
        fontSize: 13,
        marginTop: Platform.OS === 'ios' ? 1 : -3,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE
    },
    checkMark: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center'
    }
})
