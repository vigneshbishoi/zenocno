import { View, Text, Pressable, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { FONTFAMILY } from "../config/font-config";
import Tik from '../assets/images/tik_blue.svg';
import translate from "../utils/Text"

export default function ReportFilter({ visible, theme, category, close, done }: any) {
    const styles = style(theme);
    const [selectItem, setSelectItem] = useState([])
    const [count, setCount] = useState(true)

    const renderItem = (item: any, index: any) => {
        let select = false
        selectItem.map((data) => {
            if (data == item?.id) {
                select = true
            }
        })
        return (
            <Pressable style={[styles.renderContainer, {
                backgroundColor: select ? theme.GHOST_WHITE : 'transparent'
            }]}
                onPress={() => {
                    if (selectItem.indexOf(item?.id) != -1) {
                        selectItem.splice(selectItem.indexOf(item?.id), 1)
                        setCount(!count)
                    } else {
                        selectItem.push(item?.id)
                        setCount(!count)
                    }
                }}>
                <Text style={[styles.doneText, { color: theme.BLACK }]}>{item?.category}</Text>
                {select && <Tik height={height * 0.025} width={height * 0.025} />}
            </Pressable>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                close()
            }}
        >
            <View style={styles.container}>
                <View onStartShouldSetResponder={() => close()} style={{ flex: 0.8 }} />
                <View style={styles.mainView}>
                    <View style={styles.mainDivider}>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.headerView}>
                    <Text style={styles.titleText}>{translate("COMMONTEXT")["SELECT_CATEGORY"]}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable style={[styles.pressPadding, styles.clearButton]}
                                onPress={() => { setSelectItem([]) }}
                            >
                           <Text style={[styles.doneText, styles.mediumText]}>{translate("COMMONTEXT")["CLEAR"]}</Text>
                            </Pressable><Pressable style={styles.pressPadding}
                                onPress={() => done(selectItem)}
                            >
                                <Text style={[styles.doneText, styles.mediumText]}>{translate("ONBOARDING")["DONE"]}</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flex: 1, padding: widht * 0.05 }}>
                        <FlatList
                            data={category}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }: any) => renderItem(item, index)}
                            keyExtractor={(item, index) => item.toString()}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const style = (theme: any) => {
    return StyleSheet.create({
        container: {
            height: height,
            width: widht,
            marginLeft: - widht * 0.05,
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        mainView: {
            backgroundColor: theme.PRIMARY,
            flex: 1,
            borderTopLeftRadius: widht * 0.1,
            borderTopRightRadius: widht * 0.1
        },
        mainDivider: {
            marginTop: height * 0.04,
            alignItems: 'center',
            marginBottom: height * 0.02
        },
        divider: {
            width: widht * 0.1,
            borderWidth: 1,
            borderColor: theme.LIGHT_GRAY
        },
        titleText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 20
        },
        doneText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 16,
            color: theme.PAGINATION_SELECCT,
        },
        mediumText: { fontFamily: FONTFAMILY.POPPINS_REGULAR },
        pressPadding: {
            padding: 2
        },
        clearButton: {
            marginRight: widht * 0.05
        },
        headerView: {
            marginHorizontal: widht * 0.05,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
        },
        renderContainer: {
            height: height * 0.06,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
            paddingHorizontal: widht * 0.05,
            borderRadius: widht * 0.02,
            flexDirection: 'row'
        }
    })
}