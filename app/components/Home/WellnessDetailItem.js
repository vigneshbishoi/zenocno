import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Itemheader from './ItemHeader';
import { FONTFAMILY } from '../../config/font-config';


export const WellnessDetail = ({ item, theme, isVertical = false, onPress }) => {
    const styles = modalStyles(theme);
    return (
        <TouchableOpacity style={[styles.itemContainer, { marginVertical: isVertical ? 10 : 0 }]} onPress={() => onPress(item)}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.imgItem} source={{ uri: item.image }} >
                    <TouchableOpacity style={styles.playImageVw}>
                        <Image style={styles.playImage} source={require('../../assets/images/play.png')} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.durationView}>
                <Image style={styles.clockIcon} source={require('../../assets/images/clock1.png')} />
                <Text style={styles.durationText}>{item.minutes} m</Text>
            </View>
            <Text style={styles.description} numberOfLines={3}>{item.short_description ? item.short_description : item.title}</Text>
        </TouchableOpacity>
    );
}

const WellnessDetailItem = ((props) => {
    const { wellnessArr, theme, onAllPress } = props
    const styles = modalStyles(theme);

    return (
        <View style={styles.container}>
            <Itemheader
                header='Wellness'
                option='View all'
                icon={require('../../assets/images/home/Wellness.png')}
                color={theme.PRIMARY}
                theme={theme}
                onAllPress={onAllPress}
            />
            <FlatList
                data={wellnessArr}
                horizontal
                keyExtractor={item => item.key}
                contentContainerStyle={{ paddingLeft: 22, marginTop: 10, paddingVertical: 10 }}
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => (
                    <WellnessRender item={item.item} theme={theme} />
                )}
            />
        </View>
    );
})

const modalStyles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.SELECTED,
        paddingVertical: 30,
    },

    itemContainer: {
        borderRadius: 15,
        backgroundColor: theme.PRIMARY,
        marginHorizontal: 10,
        width: '45%',
        margin: 10,
        height: 200,
    },
    imageContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 5,
        overflow: 'hidden'
    },
    imgItem: {
        height: 107,
        resizeMode: 'contain',
        width: '100%',
    },
    durationView: {
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
    },
    clockIcon: {
        width: 12,
        height: 12,
    },
    durationText: {
        fontSize: 9,
        color: theme.LIGHT_GREEN,
        marginLeft: 5,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    description: {
        textAlign: 'left',
        color: theme.GRAY_BLACK,
        marginTop: 8,
        fontSize: 12,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        marginHorizontal: 13,
        marginBottom: 25,
    },
    playImageVw: {
        position: 'absolute',
        borderRadius: 16,
        backgroundColor: theme.PRIMARY,
        right: 7,
        top: 10,
        width: 33,
        height: 33,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playImage: {
        width: 9,
        height: 12
    }
})
export default WellnessDetailItem;