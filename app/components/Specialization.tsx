import React, { useState, useEffect } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../config/font-config";
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import actionTypes from '../store/actions/types';


export default function Specialization(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [stage, setStage] = useState(props.selectedId)
    const [profileData, setProfile] = useState(props.selectedId)
    const { modalDisplay, setModalDisplay, profile } = props;
    const SpecializationData = useSelector((state) => state?.oncologistReducer?.specialization);

    let data = SpecializationData

    return (
        <View style={styles.container}>
            {data?.map((item, index) => {
                return (
                    <Pressable
                        onPress={() => {
                            if (profile) {
                                setProfile(item.ID)
                                props.updateStage(item, item.ID)
                                setModalDisplay(false)
                            } else {
                                setStage(item.ID)
                                props.updateStage(item, item.ID)
                                setModalDisplay(false)
                            }
                        }}
                        style={[styles.item, { backgroundColor: stage == item.ID ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                        <Text style={styles.unselected_text} >{item.name}</Text>
                        {(profileData == item.ID) &&
                            <Text style={[styles.unselected_text, { color: theme.SECONDARY }]} >
                                <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
                            </Text>
                        }
                    </Pressable>


                );
            })}
        </View>
    );
}


const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 23,
            padding: 30,
            backgroundColor: theme.PRIMARY,
            borderRadius: 20,
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
            borderRadius: 20,
            paddingHorizontal: 5,
            paddingVertical: 10,

        },

        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 20,
            borderRadius: 10,
            paddingVertical: Platform.OS === 'ios' ? 15 : 13,

        },
        unselected_text: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK
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