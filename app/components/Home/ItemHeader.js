import React from 'react';
import {useState} from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';


const Itemheader = ((props) => {
    const { header, option, icon , color, theme, onAllPress, isIcon=true} = props
    const styles = modalStyles(theme);
    return (
        <View style={styles.header}>
            {isIcon &&
            <View style={[styles.imgView]}>
                <Image style={styles.icon} source={icon} />
            </View>}
            <Text style={styles.headerText} numberOfLines={1}>{header}</Text>
            <Pressable style={[styles.viewallView]} onPress={onAllPress}>
                <Text style={[styles.viewall]}>{option}</Text>
            </Pressable>
        </View>
    );
})
const modalStyles = (theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgView: {
        borderRadius: 20,
    },
    icon: {
        width: 20,
        height: 20,
        margin: 10,
        resizeMode:'contain'
    },
    headerText: {
        color: theme.BLACK,
        marginHorizontal: 20,
        fontSize: 20,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    viewallView: {
        borderRadius: 20,
        backgroundColor: theme.PRIMARY,
        position: 'absolute',
        right: 20,
        width:83,
        height:35,
        alignItems:'center',
        justifyContent:'center'
    },
    viewall: {
        color: theme.SECONDARY,
        fontSize: 12,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
})
export default Itemheader;