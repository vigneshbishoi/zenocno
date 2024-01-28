import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SvgUri } from 'react-native-svg';



export default function FilterModel(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [selected, setSelected] = useState(props.selected)
    const { modalDisplay, setModalDisplay } = props;
    return (
        <Modal
            style={styles.modalStyle}
            isVisible={modalDisplay}
            onBackButtonPress={() => { setModalDisplay(false) }}
            onBackdropPress={() => { setModalDisplay(false) }}
        >
            <FlatList
                style={[styles.flatlist_container, {
                    backgroundColor: theme.PRIMARY,
                    borderColor: theme.MEDIUM_GRAY,
                    height: 100
                }]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.item_container}>
                            <Pressable
                                onPress={() => {
                                    setSelected(item.id)
                                    props.onSelect(item)
                                    setModalDisplay(false)
                                }
                                }
                                style={[styles.item, { backgroundColor: props.selected == item.id ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                                {item.id != 0 ?
                                    <View style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <SvgUri
                                            width="80%"
                                            height="80%"
                                            color='#000'
                                            uri={item.image}
                                        />
                                    </View> :
                                    <Image style={[styles.topicIcon, catId === item.id && { tintColor: theme.PRIMARY }]} source={require('../../assets/images/all.png')} />}
                                {/* <Image style={styles.topicIcon} source={item.id != 0 ? {uri:item.image}  : require('../../assets/images/all.png')} /> */}
                                <Text style={[styles.unselected_text, { color: props.selected != item.id ? theme.DARK_GRAY : theme.SECONDARY, }]} >{item.name}</Text>
                                {props.selected == item.id &&
                                    <Text style={[styles.selected_text, { color: theme.SECONDARY }]} >
                                        <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
                                    </Text>
                                }
                            </Pressable>
                        </View>

                    );
                }}
                data={props.data} />
        </Modal>
    );
}


const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.PRIMARY
        },
        modalStyle:{ 
            justifyContent: "flex-end", 
            width: '100%', 
            alignSelf: 'center', 
            marginBottom: -10 
        },
        dropdown_container: {
            alignItems: 'center',
            flex: .15,
        },
        dropdown: {
            width: '80%',
            height: '50%',
            marginTop: 40,
            borderWidth: 1,
            borderRadius: 10,
        },
        dropdown_image: {
            width: 10,
            height: 10,
        },
        option_container: {
            flex: .4,
            alignItems: 'center',
        },
        image: {
            width: 50,
            height: 50
        },
        flatlist_container: {
            flexGrow: 0,
            minHeight: '28%',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 5,
            paddingVertical: 10,
            shadowOffset: { width: 0, height: 0 },

        },
        item_container: {
            paddingHorizontal: 40,
            paddingVertical: 5,

        },
        item: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 1,
            paddingHorizontal: 20,
            borderRadius: 10,
            paddingVertical: 15,

        },
        selected_text: {
            fontSize: 16,
            fontWeight: '900'
        },
        unselected_text: {
            fontSize: 16,
            fontFamily: FONTFAMILY.MEDIUM,
            color: theme.DARK_GRAY,
            marginLeft: 20
        },
        current_lang: {
            fontFamily: FONTFAMILY.MEDIUM,
            fontSize: 16,
            color: theme.MEDIUM_GRAY,
        },
        selectLanguageContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            marginHorizontal: 20,

        },
        linearGradient: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            height: 200,
            width: 350,
        },
        topicIcon: {
            width: 15,
            height: 15,
            resizeMode: 'contain',
        },
    });
};


