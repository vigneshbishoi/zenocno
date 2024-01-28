import React from 'react'
import { Text, View, StyleSheet, Platform, FlatList, Pressable, Image } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";
import Gallery from '../../assets/images/Gallery.svg';
import translate from "../../utils/Text";

const ShareOrAsk = (props) => {
    const { theme, onPress, data, text, borderColor, borderWidth, paddingHorizontal, right } = props
    const styles = stylesActivity(theme);

    return (
        <Pressable
            style={[styles.writeSomeView, { 
                borderColor: borderColor ? borderColor : '#f5f6fa', 
                borderTopWidth: borderWidth ? borderWidth : 1, 
                borderBottomWidth: borderWidth ? borderWidth : 1,
                paddingHorizontal: paddingHorizontal ? paddingHorizontal : 10,
            }]} 
            onPress={onPress}>
            <Image source={data?.data?.image == null ? require('../../assets/images/profileImage.png') : { uri: data?.data?.image }} style={styles.memberImg} />
            <Text style={styles.shareOrAskTxt} numberOfLines={1} >{text}...</Text>
            <View style={[styles.photoView, {right: right ? right : 10}]}>
                <Gallery width={24} height={21} />
            </View>
        </Pressable>
    );
}

const stylesActivity = (theme: any) => {
    return StyleSheet.create({
        profileImage: {
            width: 32,
            height: 32,
            borderRadius: 10,
            marginLeft: 7
        },
        writeSomeView: {
            backgroundColor: theme.PRIMARY,
            flexDirection: 'row',
            // paddingHorizontal: 10,
            alignItems: 'center',
            borderBottomWidth: 6,
            borderTopWidth: 6,
            paddingVertical: 7
        },
        memberImg: {
            width: 40,
            height: 40,
            borderRadius: 10
        },
        shareOrAskTxt: {
            width: '80%',
            fontSize: 14,
            marginHorizontal: 10,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK
        },
        photoView: {
            position: 'absolute',
            flexDirection: 'row',
            right: 10,
        },
    })
};
export default ShareOrAsk;