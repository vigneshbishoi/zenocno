import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

const BannerItem = ((props) => {
    const { item, theme, onPress } = props
    const styles = modalStyles(theme);
    return (
        <View style={[styles.bannerView, {backgroundColor: item.color.toLowerCase()}]}>
          <Text style={styles.bannerTxt}>{item.text}</Text>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        bannerView: {
            flexDirection:"row", 
            height:58, 
            backgroundColor: theme.BANNER_BG, 
            marginHorizontal:15, 
            alignItems:"center", 
            paddingHorizontal:10, 
            borderRadius:10,
            width: Dimensions.get('window').width - 30
          },
          bannerTxt: {
            fontSize:15, 
            fontFamily: FONTFAMILY.POPPINS_REGULAR, 
            width:'88%', 
            color: theme.PRIMARY
          },
          itemImage: {
            width: 58,
            height: 58,
            position:'absolute',
            right: 0,
            borderTopRightRadius:10,
            borderBottomRightRadius:10,
            overflow: 'hidden'
        },
    });
};
export default BannerItem;  