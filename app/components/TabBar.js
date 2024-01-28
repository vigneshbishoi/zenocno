import React, { useState, useEffect, useRef } from 'react'
import { Text, Image, View, StyleSheet, Platform, FlatList, Pressable } from 'react-native'
import { FONTFAMILY } from "../config/font-config";
import { SvgCssUri } from 'react-native-svg';
import Unsel_Breathing from '../assets/images/unsel_breathing.svg'
import Unsel_Emotionalwellness from '../assets/images/unsel_emotionalwellness.svg'
import Unsel_Soundtherapy from '../assets/images/unsel_soundtherapy.svg'
import Unsel_yoga from '../assets/images/unsel_yoga.svg'
import Sel_Breathing from '../assets/images/sel_breathing.svg'
import Sel_Emotionalwellness from '../assets/images/sel_emotionalwellness.svg'
import Sel_Soundtherapy from '../assets/images/sel_soundtherapy.svg'
import Sel_yoga from '../assets/images/sel_yoga.svg'

const TabBar = (props) => {
    const { theme, data, isHome = false, updateData, isEvents = false, isWellness = false, catId, isDoctorsList = false, selectCategory, isSearch = false, handleCategorySelection, filterName, wellnessAllPress, selectedType, isGroup = false, isCommunity = false, extraTextStyle = () => { }, extraButtonStyle = () => { }, selectExtraStyle = {}, selectExtraTextStyle = {} } = props
    const styles = stylesActivity(theme);
    const flatListRef = useRef(null);
    const unselectedIcons = [
        <Unsel_yoga />,
        <Unsel_Breathing />,
        <Unsel_Emotionalwellness />,
        <Unsel_Soundtherapy />
    ];
    const selectedIcons = [
        <Sel_yoga />,
        <Sel_Breathing />,
        <Sel_Emotionalwellness />,
        <Sel_Soundtherapy />
    ];

    // useEffect(() => {
    //     if(isCommunity){
    //         updateData();
    //     }
    // },[])

    const tabRenderItem = ({ item, index }) => {
        if (isDoctorsList) {
            return (
                <Pressable style={[styles.topicItem,  catId === item?.id && styles.selected, extraButtonStyle(item)]} onPress={() => handleCategorySelection(item)}>
                    {catId != item.id && item.icon }
                    <Text style={[styles.topicTitle, catId === item?.id && { color: theme.PRIMARY, paddingLeft: 0 }, extraTextStyle(item)]}>{item.name}</Text>
                </Pressable>)
        } else if (isSearch || isEvents) {
            return (
                <Pressable style={[styles.topicItem, isSearch && { height: 31, borderRadius: 8 }, catId === item && styles.selected, extraButtonStyle(item),
                catId === item && selectExtraStyle]} 
                    onPress={() => handleCategorySelection(item)}>
                    <Text style={[styles.topicTitle, { paddingLeft: 0 }, catId === item && { color: theme.PRIMARY }, extraTextStyle(item), catId === item && selectExtraTextStyle]}>{isEvents ? item.category : item.name}</Text>
                </Pressable>)
        } else if (index === 0 && !isGroup && !isSearch && !isDoctorsList) {
            return (
                <Pressable style={[styles.topicItem, catId === item?.id && styles.selected]} onPress={() => handleCategorySelection(item)}>
                    <Image style={styles.topicIcon} source={require('../assets/images/all.png')} />
                    <Text style={[styles.topicTitle, catId === item?.id && { color: theme.PRIMARY }]}>{item.name}</Text>
                </Pressable>)
        } else {
            return index != 0 && (
                <Pressable style={[styles.topicItem, catId === item?.id && styles.selected]} onPress={() => handleCategorySelection(item)}>
                    {item?.image != null &&
                        <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                            {isWellness ?
                                <>
                                    {catId === item?.id ? selectedIcons[index - 1] : unselectedIcons[index - 1]}
                                </>
                                :
                                <SvgCssUri
                                    width="60%"
                                    height="60%"
                                    uri={catId === item?.id ? item.selected_image : item.image}
                                />
                            }
                        </View>}
                    <Text style={[styles.topicTitle, catId === item?.id && { color: theme.PRIMARY }]} numberOfLines={1} >{isWellness ? item?.categoryName : item?.name}</Text>
                </Pressable>
            );
        }

    }
    return (
        <View style={[isCommunity && { backgroundColor: theme.SELECTED }, isGroup === false && { height: 50 }, isHome && { marginBottom: 15, marginTop: 12, backgroundColor: theme.SELECTED }]} >
            <FlatList
                data={data}
                horizontal
                contentContainerStyle={[styles.contentContainerStyle, isGroup && { paddingBottom: 25, paddingTop: 10 }]}
                showsHorizontalScrollIndicator={false}
                renderItem={tabRenderItem} 
            />
        </View>
    );
}

const stylesActivity = (theme: any) => {
    return StyleSheet.create({
        contentContainerStyle: {
            alignItems: 'center',
            paddingLeft: 27,
            paddingRight: 50
        },
        topicItem: {
            marginRight: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.PRIMARY,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 13,
            height: 42,
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
        },
        topicIcon: {
            width: 15,
            height: 15,
            resizeMode: 'contain',
        },
        topicTitle: {
            paddingLeft: 5,
            fontSize: 14,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
        },
        selected: {
            backgroundColor: theme.SECONDARY
        },
    })
};
export default TabBar;