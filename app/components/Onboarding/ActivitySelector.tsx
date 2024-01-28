import React, { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import Modal from 'react-native-modal'
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import translate from "../../utils/Text"
import ActiveLevel from '../../assets/images/activelevel.svg';
import BedriddenLevel from '../../assets/images/bedriddenlevel.svg';
import WeakLevel from '../../assets/images/weaklevel.svg';
import TikBlue from '../../assets/images/tik_blue.svg';


export default function ActivitySelector(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const [activity, setActivity] = useState('')
    const { modalDisplay, setModalDisplay } = props;
    const iconArray = [
        <ActiveLevel width={12} height={24} />,
        <WeakLevel width={21} height={24} />,
        <BedriddenLevel />
    ]
    useEffect(() => {

        var inputRequest = {
            module: "physicalActivity",
            action: "getAll"
        }
        props.actions.callAcivity(actionTypes.GET_PHYSICAL_ACTIVITY, inputRequest);
    }, []);
    var activityData = useSelector(state => state.onboardingReducer.activityData);
    activityData = activityData && activityData[0]?.data.map(item => { return { ...item, selected: false } })

    return (
        // <Modal
        //     style={[{ justifyContent: "center", width: '80%', alignSelf: 'center' }]}
        //     isVisible={modalDisplay}
        //     onBackButtonPress={() => { setModalDisplay(false) }}
        //     onBackdropPress={() => { setModalDisplay(false) }}
        // >
        <View style={styles.container}>
            {/* <Text style={{ paddingRight: 4,  textAlign: 'center', fontFamily: FONTFAMILY.BOLD, color: theme.DARK_GRAY, fontSize: 18 }}>{translate("ONBOARDING")["ACTIVITY_BEFORE"]}</Text> */}
            {/* <FlatList
                style={[styles.flatlist_container, {
                    // backgroundColor: theme.PRIMARY,
                    borderColor: theme.MEDIUM_GRAY,
                }]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.item_container}>
                            <Pressable
                                onPress={() => {
                                    setActivity(item.physical_activity)
                                    setModalDisplay(false);
                                    props.updateActivity(item.physical_activity, item.id)

                                }
                                }
                                style={[styles.item, { borderWidth: 1, borderRadius: 50, flexDirection: 'row', borderColor: props.selectedId == item.id ? theme.SECONDARY : theme.MEDIUM_GRAY, }]}>
                                <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: 0, borderColor: theme.SECONDARY, justifyContent: 'flex-start', alignItems: 'center', marginRight: 5 }}>
                                    <Image
                                        style={{ paddingLeft: 0 }}
                                        source={require("../../assets/images/dizziness.png")}
                                    />
                                    <View style={{ flexDirection: 'column', flex: 1 }}>
                                        <Text style={{ fontFamily: FONTFAMILY.POPPINS_MEDIUM, fontSize: 13, color: theme.GRAY_BLACK }} >{item.physical_activity}</Text>
                                        <Text style={{ fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize: 10, flexWrap: 'wrap', color: theme.SEARCH_TITLE }} numberOfLines={1} >{item.description}</Text>
                                    </View>
                                </View>


                            </Pressable>
                        </View>

                    );
                }}
                data={
                    activityData    
                } /> */}

            {activityData?.map((item, index) => {
                return (
                    <View style={styles.item_container}>
                        <Pressable
                            onPress={() => {
                                setActivity(item.physical_activity)
                                setModalDisplay(false);
                                props.updateActivity(item.physical_activity, item.id)

                            }
                            }
                            style={[styles.item, styles.itemExtraStyle, {backgroundColor: props.selectedId == item.id ? (theme.GHOST_WHITE) : (theme.PRIMARY)}]}>
                            <View style={styles.itemSubcontainer}>
                                {/* <View style={styles.imageView} >
                                    {iconArray[index]}
                                </View> */}
                                <View style={styles.desVw}>
                                    <Text style={styles.physicalActivityText} >{item.physical_activity}</Text>
                                    {/* <Text style={styles.descText} numberOfLines={1} >{item.description}</Text> */}
                                </View>
                                { props.selectedId == item.id &&
                                    <TikBlue />
                                }
                            </View>
                        </Pressable>
                    </View>
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
            elevation:5
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
            shadowOffset: { width: 0, height: 0 },
            padding: 35
        },
        item_container: {
            paddingVertical: 8,
        },
        item: {
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 15,
            borderRadius: 10,
            paddingVertical: 12,
        },
        itemExtraStyle: {
            flexDirection: 'row'
        },
        itemSubcontainer: {
            flexDirection: "row",
            flex: 1,
            paddingHorizontal: 0,
            borderColor: theme.SECONDARY,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 5
        },
        imageView: {
            paddingLeft: 0,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#f0f5fe',
            alignItems: 'center',
            justifyContent: 'center'
        },
        desVw: {
            flexDirection: 'column',
            flex: 1,
            marginLeft: 10
        },
        physicalActivityText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 13,
            color: theme.GRAY_BLACK
        },
        descText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 10,
            flexWrap: 'wrap',
            color: theme.SEARCH_TITLE
        },
        selected_text: {
            fontSize: 16,
            fontWeight: '900',
        },
        unselected_text: {
            fontSize: 16,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: theme.DARK_GRAY
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