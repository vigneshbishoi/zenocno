import React from 'react';
import { StyleSheet, Image, Pressable, Platform } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import { SvgCssUri } from 'react-native-svg';


const LearningSpaceItem = ((props) => {
    const { item, theme, onPress } = props
    const styles = modalStyles(theme);

    return (
        <Pressable style={[styles.itemContainer]} onPress={() => {onPress()}} >
            {item.image.endsWith('.svg') ?
                    <SvgCssUri uri={item?.image} width={'100%'} height={'100%'}/>
                    : <Image source={{ uri: item.image }} style={styles.itemImage} />
                  }
        </Pressable>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        itemContainer: {
            width: 136,
            height: 169,
            marginHorizontal: 10,
            borderRadius: 10,
        },
        itemImage: {
            width: 136,
            height: 169,
            borderRadius: 10,
        }
    });
};
export default LearningSpaceItem;  