import React, { useState, useEffect } from 'react';
import { ScrollView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../config/font-config";
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import actionTypes from '../store/actions/types';
import TikBlue from '../assets/images/tik_blue.svg';

export default function Stage(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [stage, setStage] = useState(props.selectedId)
    const [profileData, setProfile] = useState(props.selectedId)
    const [health, setHealth] = useState(props.selectedId)
    const [specialization, setSpecialization] = useState(props.selectedId)
    const { modalDisplay, setModalDisplay} = props;    

    return (
        <View style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
            {props.data?.map((item, index) => {
                return (
                    <Pressable
                        onPress={() => {
                            if (props.type == 1) {
                                setProfile(item.id)
                                props.updateStage(item, item.id)
                                setModalDisplay(false)
                            } else if(props.type == 2) {
                                setStage(item.id)
                                props.updateStage(item, item.id)
                                setModalDisplay(false)
                            } else if(props.type == 3) {
                                setHealth(item.id)
                                props.updateStage(item, item.id)
                                setModalDisplay(false)
                            } else {
                                setSpecialization(item.id)
                                props.updateStage(item, item.id)
                                setModalDisplay(false)
                            }
                        }
                        }
                        style={[styles.item, { backgroundColor: stage == item.id ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                        <Text style={[styles.unselected_text]} >{item.name}</Text>
                        {(props.type == 1 ? profileData == item.id : props.type == 2 ? stage == item.id : props.type == 3 ?
                         health == item.id : specialization == item.id) &&
                            <TikBlue />
                        }
                    </Pressable>
                );
            })}
            </ScrollView>
        </View>
    );
}


const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 15,
            padding: 10,
            backgroundColor: theme.PRIMARY,
            borderRadius: 5,
            shadowColor: 'grey',
            shadowOffset: {
              width: 1,
              height: 0,
            },
            shadowOpacity: 0.3,
            elevation:5,
            height: 180
        },
        dropdown: {
            width: '80%',
            height: '50%',
            marginTop: 40,
            borderWidth: 1,
            borderRadius: 10,
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
            paddingHorizontal: 10,
            borderRadius: 7,
            // marginVertical:3,
            paddingVertical: Platform.OS === 'ios' ? 12 : 9,

        },
        unselected_text: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK,
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