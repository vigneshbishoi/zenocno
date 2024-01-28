import { TextInput, View } from 'react-native'
import React, { PureComponent } from 'react'

export const CommonTextInput = ({
    value,
    onChangeText,
    extraStyle = {},
    rest = {},
    placeholder = '',
    multiline,
    placeholderTextColor = null,
    autoFocus = false,
    onEndEditing = () => { } }) => {
    return (
        <TextInput
            value={value}
            onChangeText={(text) => onChangeText(text)}
            style={extraStyle}
            placeholder={placeholder}
            multiline={multiline}
            placeholderTextColor={placeholderTextColor}
            autoFocus={autoFocus}
            {...rest}
            onEndEditing={() => { onEndEditing() }}
        />
    )
}