import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Text,
    Image,
} from 'react-native';
import Itemheader from './ItemHeader';
import { FONTFAMILY } from '../../config/font-config';

const AntiCancer = ((props) => {

    const { anticancerArr, theme, onAllPress } = props
    const styles = modalStyles(theme);

    const renderItem = (item) => {
        return (
            <View style={styles.itemView}>
                <View style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                    <Image source={item.item.image} style={{ height: 117, width: 171, borderTopLeftRadius: 15, borderTopRightRadius: 15}}></Image>
                </View>
                <View style={{margin:10}}>
                <Text style={styles.labelText}>{item.item.name}</Text>
                <Text style={styles.subLabelText }>Est. Time: 30 mins</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Itemheader
                header='Anti Cancer Diet'
                option='Personalize'
                icon={require('../../assets/images/home/ACD.png')}
                color={'aliceblue'}
                theme={theme}
                onAllPress={onAllPress}
            />

            <FlatList
                data={anticancerArr}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 28, marginTop: 10, paddingVertical: 10 }}
                horizontal
            />
        </View>
    )
})

const modalStyles = (theme) => StyleSheet.create({
    container: {
        paddingVertical: 30,
    },
    itemView: {
        shadowColor: theme.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        borderRadius: 15,
        backgroundColor: theme.PRIMARY,
        marginHorizontal: 10,
        width: 171,
    },
    labelText: {
        fontFamily: FONTFAMILY.MEDIUM,
        fontSize: 16, 
        color: theme.GRAY_BLACK
    },
    subLabelText: {
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: 12, 
        color: theme.SUB_TITLE,
        marginTop: 5,
         marginBottom: 15
    },
})
export default AntiCancer;