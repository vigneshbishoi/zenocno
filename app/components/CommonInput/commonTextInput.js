import React from 'react'
import { StyleSheet, Platform, TextInput } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";

const CommonTextInput = (props) => {
    const { theme, value, placeHolder, onChangeText, keyboardType, isErrowShow = false } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            commonText: {
                color: theme.GRAY_BLACK,
                fontSize: 16,
                fontFamily: FONTFAMILY.POPPINS_REGULAR,
                borderBottomWidth: 2,
                borderBottomColor: isErrowShow ? 'red' : '#d8d8d8',
                width: '95%',
                height: 38,
                backgroundColor: theme.PRIMARY,
                alignSelf: 'center',
                marginTop: Platform.OS == 'android' ? 4 : 0,
            },
        })
    };

    const styles = stylesActivity(theme);

    return (
        <TextInput
            placeholder={placeHolder}
            value={value}
            keyboardType={keyboardType ? keyboardType : 'default'}
            placeholderTextColor={theme.SEARCH_TITLE}
            onChangeText={onChangeText}
            numberOfLines={1}
            style={[styles.commonText, Platform.OS === 'android' && { paddingBottom: 0 }]} />
    );
}

export default CommonTextInput;