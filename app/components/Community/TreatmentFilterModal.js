import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'



export default function TreatmenFilterModel(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [selected, setSelected] = useState(props.selected)
    const { modalDisplay, setModalDisplay } = props;
    return (
        <Modal
            style={[{ justifyContent: "flex-end", width: '100%', alignSelf: 'center', marginBottom: -10 }]}
            isVisible={modalDisplay}
            onBackButtonPress={() => { setModalDisplay(false) }}
            onBackdropPress={() => { setModalDisplay(false) }}
        >
            <FlatList
                style={[styles.flatlist_container, {
                    backgroundColor: theme.PRIMARY,
                    borderColor: theme.MEDIUM_GRAY,
                    height: 300
                }]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.item_container}>
                            <Pressable
                                onPress={() => {
                                    setSelected(item.name)
                                    props.onSelect(item)
                                    setModalDisplay(false)
                                }
                                }
                                style={[styles.item, { backgroundColor: selected == item.name ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                                <Text style={[styles.unselected_text, { color: selected != item.name ? theme.DARK_GRAY : theme.SECONDARY, }]} >{item.name}</Text>
                                {selected == item.name &&
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
            justifyContent: 'space-between',
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
            color: theme.DARK_GRAY
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

    });
};


