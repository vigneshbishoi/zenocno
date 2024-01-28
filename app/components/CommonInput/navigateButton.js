import React from 'react'
import { Text, Image, View, StyleSheet, Platform, FlatList, Pressable } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";
import themes from '../../config/themes-config';

const NavigateButton = (props) => {
    const { theme, buttonText, backgroundColor, alignSelf = 'center', onPress, fontSize=16, width, height = 41,
         postBtnEnable=true, marginTop= Platform.OS === 'ios' ? 15 : 12, disabled = false, borderRadius } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            btnContainer: {
                width:width ? width : '100%',
                marginTop: Platform.OS === 'ios' ? marginTop : marginTop,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: alignSelf,
                borderRadius: borderRadius ? borderRadius : 8,
                height: height,
                backgroundColor: postBtnEnable == false ? '#cccccc' : backgroundColor ? backgroundColor : theme.SECONDARY
            },
            btnText: {
                fontSize: fontSize,
                color: theme.PRIMARY,
                fontFamily: FONTFAMILY.POPPINS_MEDIUM,
                marginTop:Platform.OS === 'ios' ? 0 : 2
            }
        })
    };

    const styles = stylesActivity(theme);

    return (
        <Pressable disabled={disabled} onPress={() => onPress()} style={styles.btnContainer}>
            <Text style={styles.btnText} >{buttonText}</Text>
        </Pressable>
    );
}

export default NavigateButton;