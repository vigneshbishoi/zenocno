import React, { useState, useEffect } from "react"
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { FONTFAMILY } from '../../config/font-config'
import Icon from 'react-native-vector-icons/AntDesign'
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;
import { useSelector } from "react-redux";
import actionTypes from "../../store/actions/types";
import translate from "../../utils/Text"
import themes from "../../config/themes-config";
type DietProps = {
    setDietParams: Function,
    theme: Object,
    actions: Object,
    dietParams: any
}

const DietPreference = (props: DietProps) => {
    const [selected, setSelected] = useState(props.dietParams);
    const dietData = useSelector(state => state?.dietPlanReducer?.dietPreferenceData?.length > 0 ? state?.dietPlanReducer?.dietPreferenceData : [])
    const { setDietParams } = props;
    const theme = props.theme
    const styles = modalStyles(theme);
    useEffect(() => {
        var request = {
            module: "dietPreference",
            action: "getAll"
        }
        // props.actions.loader("loader", true, actionTypes.LOADER)
        props.actions.getDietPreference(actionTypes.GET_DIET_PREFERENCE, request);
    }, [])

    const addItems = (item) => {
        setSelected(item?.id)
        setDietParams(item?.id)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{translate("DIET_PLAN")["DIET"]}</Text>
            {/* <Text style={[styles.subText, { color: theme.SUB_TITLE }]}>{translate("DIET_PLAN")["DIET_SUB"]}</Text> */}
            <View style={styles.content}>
                {typeof dietData == "object" && dietData.length > 0 && dietData[0]?.data != undefined && dietData[0]?.data.map((item: any, index: any) => {

                    return (
                        <TouchableWithoutFeedback key={item?.id} onPress={() => {
                            setSelected(item?.id)
                            setDietParams(item?.id)
                        }}>
                            <View style={[styles.foodContainer, index == 0 && { borderTopWidth: 4 }]}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.desContainer}>
                                    <Text style={styles.dietType} numberOfLines={1} >{item.diet_preference}</Text>
                                    <Text style={styles.dietDes} numberOfLines={1} >{item.description}</Text>
                                </View>
                                {selected == item.id && <Icon name="checkcircle" size={21} color='#19ceab' style={{ position: 'absolute', right: 15, alignSelf: 'center' }} />}
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
                }
            </View>
        </View>

    )
}

export default DietPreference
const modalStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.PRIMARY
    },
    content: {
        marginTop: height * 0.02
    },
    foodContainer: {
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
        backgroundColor: theme.PRIMARY,
        paddingHorizontal: 5,
        borderBottomWidth: 4,
        borderColor: theme.SELECTED
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        width: '75%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.BLACK
    },
    subText: {
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 15 : 10,
        fontSize: 14,
        width: '85%',
        alignSelf: 'center',
        fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    itemImage: {
        height: 54,
        width: 54,
        marginLeft: 5,
        borderRadius: 27,
        backgroundColor: theme.MEDIUM_GRAY
    },
    desContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        width: '80%'
    },
    dietType: {
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.GRAY_BLACK
    },
    dietDes: {
        fontSize: 13,
        marginTop: Platform.OS === 'ios' ? 1 : -3,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE
    }
})
