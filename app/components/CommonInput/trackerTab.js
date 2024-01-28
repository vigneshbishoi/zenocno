import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

const TrackerTab = ((props) => {
    const { theme, index, totalNumber, tab1Title, tab2Title='', tab3Title, onFirstTabPress={}, onSecondTabPress={} } = props

    const modalStyles = (theme) => StyleSheet.create({
        header: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: totalNumber != 2 ? 'space-between' :'space-around',
            width: '100%',
            height: 25,
            borderBottomWidth: 1,
            borderBottomColor: theme.BORDER_COLOR,
        },
        tabText: {
            color: theme.GRAY_BLACK,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        tabStyle:{
            borderBottomColor:theme.SECONDARY,
            paddingHorizontal:12
        }
    })
    const styles = modalStyles(theme, totalNumber);
    return (
        <View style={styles.header}>
            <Pressable onPress={onFirstTabPress} style={[styles.tabStyle,{ borderBottomWidth: index == 1 ? 2 : 0 }]}>
                <Text style={styles.tabText} numberOfLines={1} >{tab1Title}</Text>
            </Pressable>
            {totalNumber != 2 && 
            <Pressable style={[styles.tabStyle,{ borderBottomWidth: index == 2 ? 2 : 0 }]}>
                <Text style={styles.tabText} numberOfLines={1} >{tab2Title}</Text>
            </Pressable>}
            <Pressable onPress={onSecondTabPress} style={[styles.tabStyle,{ borderBottomWidth: index == 3 ? 2 : 0 }]}>
                <Text style={styles.tabText} numberOfLines={1} >{tab3Title}</Text>
            </Pressable>
        </View>
    );
})

export default TrackerTab;