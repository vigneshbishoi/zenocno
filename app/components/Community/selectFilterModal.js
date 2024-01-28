import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Platform,
    Pressable
} from 'react-native';
import Modal from 'react-native-modal'
import Back from '../../assets/images/Back.svg'
import { FONTFAMILY } from '../../config/font-config';

export default function SelectFilterModal(props: any) {
    const { filterVisible, setFilterVisible, emptyArr, filData, selectFilterOption,theme } = props;
    const styles = modalStyles(theme);
    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                flexDirection: "row",
                marginHorizontal: 12,
                alignItems: "center",
                paddingVertical: 5,
                marginTop: 5,
            }}>
                {emptyArr.includes(index) == false ?
                    <>
                        <Pressable style={styles.roundView} onPress={() => selectFilterOption(item, index)} />
                        <View style={styles.textViews}>
                            <Text style={styles.titleText}>{item.ingredient_item.ingredient_item}</Text>
                        </View>
                    </>
                    :
                    <>
                        <Pressable style={[styles.roundView,styles.selectedRoundView]} onPress={() => selectFilterOption(item, index)}>
                            <Image source={require('../../assets/images/correctMark.png')} style={styles.tickImg} />
                        </Pressable>
                        <View style={styles.textViews}>
                            <Text style={[styles.titleText, { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>{item.ingredient_item.ingredient_item}</Text>
                        </View>
                    </>
                }
                <Text style={styles.weightText}>{item.weight}</Text>
            </View>
        )
    }

    return (
        <Modal isVisible={filterVisible} style={{ backgroundColor: theme.PRIMARY, margin: 0 }} >
            <View style={{ marginTop: Platform.OS === 'android' ? 0 : 40, flex: 1 }}>
                <View style={styles.headerVw}>
                    <Pressable style={{ position: 'absolute', left: 20, alignSelf: 'center' }} onPress={() => setFilterVisible(false)} >
                        <Back width={15} height={20} />
                    </Pressable>
                    <Text style={styles.headerTxt}>Ingredients for today</Text>
                </View>
                <FlatList
                    data={filData.length > 0 ? filData[0]?.data : []}
                    renderItem={(item, index) => renderItem(item, index)}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Modal>
    );

}
const modalStyles = (theme) => StyleSheet.create({
    headerVw: {
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 15,
    },
    headerTxt: {
        color: "#333333",
        fontSize: 16,
        fontFamily:FONTFAMILY.POPPINS_MEDIUM
    },
    titleText: {
        fontSize: 14,
        color: "#333333",
        fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
    weightText: {
        fontSize: 13,
        color: "#333333",
        fontFamily:FONTFAMILY.POPPINS_MEDIUM
    },
    tickImg: {
        width: 10,
        height: 10,
        tintColor:theme.PRIMARY
    },
    textViews: {
        marginLeft: 10,
        width: '82%'
    },
    roundView: {
        borderWidth: 1,
        borderColor: "#cfd4d1",
        borderRadius: 11.5,
        width: 23,
        height: 23,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: 'center',
        marginLeft:10
    },
    selectedRoundView:{
        borderWidth:0,
        backgroundColor:'#19ceab'
    },
})