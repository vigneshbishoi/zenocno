import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Share, TextInput, Keyboard } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

const SimilarFood = ((props) => {
    const { theme, item, index, minute, prep } = props
    const styles = modalStyles(theme);
    return (
        <View style={styles.foodItemVw} >
            <Image source={{ uri: item?.food_item?.image }} style={styles.foodImage} />
            {item?.food_item?.food_state != null &&
                <View style={styles.typeVw}>
                    <Text style={styles.tagtypeText} numberOfLines={1} >{item?.food_item?.food_state}</Text>
                </View>}
            <Pressable style={styles.likeImgVw} onPress={() => {
                //likeFoodItem(item)
            }}>
                <Image style={styles.likeImg} source={item?.food_item?.user_food_hearts?.length > 0 ? item?.food_item?.user_food_hearts[0]?.status == 1 ? require('../../assets/images/like.png') : require('../../assets/images/nonlike.png') : require('../../assets/images/nonlike.png')} />
            </Pressable>
            <View style={styles.bottomVw} >
                <Text style={styles.foodTitleName} numberOfLines={2}>{item?.food_item?.food_item}</Text>

                <View style={styles.itemSubVw}>
                    <Image source={require('../../assets/images/clock.png')} style={{ height: 15, width: 15 }} />
                    <Text style={styles.foodTime} >{minute + prep} min</Text>
                    <View style={styles.rateVw} >
                        <Text style={styles.rateText} >{item?.food_item?.star_rating != null ? item?.food_item?.star_rating : '0'}</Text>
                        <Image source={require('../../assets/images/rate.png')} style={styles.rateImg} />
                    </View>
                </View>
            </View>
            {item?.food_item?.food_state != null &&
                <View style={styles.tagVw} >
                    <Text style={styles.tagText} >{item?.food_item?.food_state}</Text>
                </View>}
        </View>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        foodItemVw: {
            borderRadius: 20,
            overflow: 'hidden',
            height: 202,
            width: 150,
            backgroundColor: theme.PRIMARY,
            marginLeft: 10
        },
        foodImage: {
            height: '50%',
            width: '100%',
        },
        typeVw: {
            backgroundColor: theme.BLACK,
            opacity: 0.8,
            paddingHorizontal: 15,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            position: 'absolute',
            top: 13
        },
        tagtypeText: {
            color: theme.PRIMARY,
            fontSize: 10,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        likeImgVw: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 14,
            alignItems: 'center',
            width: 28,
            height: 28,
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: 6,
            right: 8
        },
        likeImg: {
            width: 16,
            height: 14,
            tintColor: 'red',
            resizeMode: 'contain'
        },
        bottomVw: {
            marginLeft: 20,
            marginRight: 10,
            marginVertical: Platform.OS === 'android' ? 5 : 6
        },
        foodTitleName: {
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 14
        },
        itemSubVw: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS === 'android' ? 2 : 7,
        },
        foodTime: {
            color: theme.SUB_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginLeft: 3
        },
        rateText: {
            color: theme.PRIMARY,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        rateImg: {
            height: 10,
            width: 10,
            tintColor: theme.PRIMARY,
            marginLeft: 2
        },
        rateVw: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#00C49A',
            position: 'absolute',
            right: 0,
            paddingHorizontal: 5,
            borderRadius: 5,
        },
        tagVw: {
            backgroundColor: '#fdfef1',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginHorizontal: 2,
            marginBottom: Platform.OS === 'android' ? 5 : -10,
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        tagText: {
            color: theme.POPPINS_MEDIUM,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 9
        }
    });
};
export default SimilarFood;  