import React from 'react';
import { StyleSheet, Image, Pressable, Dimensions, Text } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import ReadMore from '@fawazahmed/react-native-read-more';
import clip from 'text-clipper';



const HopeStoryItem = ((props) => {
    const { item, theme, onPress } = props
    const styles = modalStyles(theme);
    return (
        <Pressable style={[styles.itemContainer]} onPress={() => { onPress(item) }} >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.eventNameTxt} numberOfLines={2} >{item?.title}</Text>

            <ReadMore onSeeMoreBlocked={() => onPress(item)} numberOfLines={4} seeMoreStyle={styles.seeMoreLessTxt}
                allowFontScaling={false}
                debounceSeeMoreCalc={0}
                animate={false}
                style={{marginTop: 0, paddingBottom:15, marginLeft: 15,}}
            >
                {clip(item?.content?.replace(/<\/?[^>]+(>|$)/g, ""), { html: true, stripTags: true })}
            </ReadMore>
        </Pressable>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        itemContainer: {
            width: Dimensions.get('window').width - 20,
            height: 290,
            marginHorizontal: 10,
            borderRadius: 10,
            justifyContent: 'center',
            marginBottom: -15
        },
        itemImage: {
            width: '100%',
            height: 180,
            borderRadius: 10,
        },
        eventNameTxt: {
            color: theme.BLACK,
            fontSize: 15,
            width: '100%',
            // height: 35,
            // marginTop: 5,
            fontFamily: FONTFAMILY.POPPINS_BOLD,
            // marginBottom: -10,
            marginLeft: 15,
            height: 20,
        },
        seeMoreLessTxt: {
            color: theme.SECONDARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 13,
            marginLeft:0
            // marginTop: Platform.OS == 'ios' ? 0 : 20
        },
    });
};
export default HopeStoryItem;  