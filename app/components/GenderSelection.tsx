import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../config/font-config";
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TikBlue from '../assets/images/tik_blue.svg';


export default function GenderSelection(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [gender, setGender] = useState(props.selected)
    const { modalDisplay, setModalDisplay } = props;

    const data = ['Male', 'Female', 'Others'];

    return (
        // <Modal
        //     style={[{ justifyContent: "center", width: '80%', alignSelf: 'center' }]}
        //     isVisible={modalDisplay}
        //     // animationIn="slideInUp"
        //     // animationOut="slideOutDown"
        //     // coverScreen={modal}
        //     onBackButtonPress={() => { setModalDisplay(false) }}
        //     onBackdropPress={() => { setModalDisplay(false) }}
        // >
        <View style={styles.container}>

            {/* <FlatList
                style={[styles.flatlist_container, {
                    backgroundColor: theme.PRIMARY,
                    borderColor: theme.MEDIUM_GRAY,
                }]}
                contentContainerStyle={{paddingVertical:10}}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.item_container}>
                            <Pressable
                                onPress={() => {
                                    // setDropDownVisible(!isDropDownVisible)
                                    setGender(item)
                                    props.updateGender(item)
                                    setModalDisplay(false)
                                    // props.navigation.navigate('Zen.LandingScreen')
                                }
                                }
                                style={[styles.item, { backgroundColor: gender == item ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                                <Text style={styles.unselected_text} >{item}</Text>
                                {gender == item &&
                                    <Text style={[styles.selected_text, { color: theme.SECONDARY }]} >
                                        <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
                                    </Text>
                                }
                            </Pressable>
                        </View>

                    );
                }}
                data={['Male', 'Female', 'Others']} /> */}
            {data.map((item, index) => {
                return (
                    <Pressable
                        onPress={() => {
                            // setDropDownVisible(!isDropDownVisible)
                            setGender(item)
                            props.updateGender(item)
                            setModalDisplay(false)
                            // props.navigation.navigate('Zen.LandingScreen')
                        }
                        }
                        style={[styles.item, { backgroundColor: gender == item ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                        <Text style={styles.unselected_text} >{item}</Text>
                        {gender == item &&
                            <TikBlue />
                        }
                    </Pressable>

                );
            })}
        </View>
        // </Modal>
    );
}


const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 15,
            padding: 20,
            backgroundColor: theme.PRIMARY,
            borderRadius: 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 1,
                height: 0,
            },
            shadowOpacity: 0.3,
            elevation: 5
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
            borderRadius: 20,
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 7,
            marginVertical: 3,
            paddingVertical: Platform.OS === 'ios' ? 12 : 9,
        },
        selected_text: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        unselected_text: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK
        },
        current_lang: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
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