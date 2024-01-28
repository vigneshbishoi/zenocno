import { View, Text, Pressable, StyleSheet, Dimensions, SafeAreaView, TextInput, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import translate from '../utils/Text'
import Search from '../assets/images/search_grey.svg';
import Close from '../assets/images/close.svg';
import Clock from '../assets/images/clock.svg';
import Close_Grey from '../assets/images/close_grey.svg';
import { FONTFAMILY } from '../config/font-config';

const DATA = [
    {
        title: "Recent conversations",
        data: ["Lorem ipsum dolor", "Sit amet",
            "consectetur",
            "Adipiscing elit"]
    },
    {
        title: "Suggested for you",
        data: ["Lorem ipsum dolor", "Sit amet",
            "consectetur",
            "Adipiscing elit"]
    }
];

export default function ReportSearch({ visible, theme, close, done }: any) {
    const styles = style(theme);
    const [search, setSearch] = useState('')
    const [suggested, setSuggested] = useState([])
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        setSuggested(DATA)
    }, [])

    const Item = ({ title, index, section }: any) => (
        <View style={styles.renderView}>
            <Clock width={widht * 0.052} height={widht * 0.052} />
            <Text numberOfLines={1} style={styles.renderTitle}>{title}</Text>
            <Pressable onPress={() => {
                let currectArrIndex = null
                suggested.map((data, index) => {
                    if (data?.title == section.title) {
                        currectArrIndex = index
                    }
                })
                let spliceArr = suggested[currectArrIndex]?.data
                spliceArr.splice(index, 1)
                setUpdate(!update)
            }}>
                <Close_Grey width={widht * 0.052} height={widht * 0.052} />
            </Pressable>
        </View>
    );

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                close()
            }}
        >
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.mainView}>
                        <View style={styles.headerView}>
                            <Pressable onPress={() => { done(search) }}>
                                <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
                            </Pressable>
                            <View style={styles.serachView}>
                                <Search width={widht * 0.04} height={widht * 0.04} />
                                <TextInput style={styles.textInput}
                                    value={search}
                                    placeholder={translate("COMMONTEXT")["SEARCH"]}
                                    onChangeText={(text) => { setSearch(text) }} />
                                <Pressable style={styles.closeIcon}
                                    onPress={() => { setSearch('') }}>
                                    <Close width={widht * 0.04} height={widht * 0.04} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.suggesteList}>
                            <SectionList
                                sections={suggested}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index, section }) => <Item title={item}
                                    index={index} section={section} />}
                                renderSectionHeader={({ section }) => (
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                )}
                            />
                        </View>
                    </View>
                </SafeAreaView>
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
            backgroundColor: theme.LIGHT_SILVER
        },
        mainView: {
            backgroundColor: theme.PRIMARY,
            height: height
        },
        headerView: {
            backgroundColor: theme.LIGHT_SILVER,
            paddingVertical: height * 0.03, flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widht * 0.04
        },
        serachView: {
            backgroundColor: theme.PRIMARY,
            height: height * 0.038,
            marginLeft: widht * 0.03,
            alignItems: 'center', width: '82%',
            flexDirection: 'row',
            paddingLeft: widht * 0.025,
            borderRadius: widht * 0.02
        },
        textInput: { flex: 1, marginLeft: widht * 0.025 },
        closeIcon: { padding: widht * 0.025 },
        suggesteList: { padding: widht * 0.05 },
        sectionTitle: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 16, marginBottom: height * 0.02
        },
        renderView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: height * 0.03
        },
        renderTitle: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginLeft: widht * 0.02,
            fontSize: 14, flex: 1,
            marginRight: widht * 0.05
        }
    })
}