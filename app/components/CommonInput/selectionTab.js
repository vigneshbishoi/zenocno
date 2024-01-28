import React from 'react'
import { Text, View, StyleSheet, Platform, FlatList, Pressable } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";

const SelectionTab = (props) => {
    const { theme, data, catId, handleCategorySelection,paddingVertical=0 } = props
    const styles = stylesActivity(theme);

    const tabRenderItem = ({ item, index }) => {
        return (
            <Pressable style={[styles.topicItem, catId === item?.id && styles.selected]} onPress={() => handleCategorySelection(item)}>
                <Text style={[styles.topicTitle, catId === item?.id && { color: theme.PRIMARY }]}>{item?.name || item?.category}</Text>
            </Pressable>
        )
    }
    return (
        <View style={{paddingVertical:paddingVertical}} >
            <FlatList
                data={data}
                horizontal
                contentContainerStyle={styles.contentContainerStyle}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                renderItem={tabRenderItem} 
            />
        </View>
    );
}

const stylesActivity = (theme: any) => {
    return StyleSheet.create({
        contentContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 50,
        },
        topicItem: {
            marginRight: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.TAB_BG,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,
            height: 31
        },
        topicIcon: {
            width: 15,
            height: 15,
            resizeMode: 'contain',
        },
        topicTitle: {
            // paddingLeft: 5,
            fontSize: 14,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginTop: Platform.OS == 'ios' ? 0 : 3
        },
        selected: {
            backgroundColor: theme.SECONDARY
        },
    })
};
export default SelectionTab;