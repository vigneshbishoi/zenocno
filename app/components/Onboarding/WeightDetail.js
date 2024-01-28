import React, { useState } from 'react';
import { Dimensions, TextInput, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import translate from '../../utils/Text'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function WeightDetail(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const { updateFormData, formData, weightDetailDisplay, setWeightDetailDisplay, weightMetric, setWeightMetric, updateWeightMetric } = props
    const [kgValue, setKgValue] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.commonText} >{translate("ONBOARDING")["WEIGHT_AFTER"]}</Text>
            <View style={styles.weightDetailContainer} >
                <View>
                    <Pressable style={styles.kgInputVw} >
                        <TextInput style={styles.weightText} maxLength={3} keyboardType='numeric' value={kgValue} onChangeText={text => setKgValue(text)} />
                    </Pressable>
                    {/* <Text style={[styles.commonText, { marginTop: 2 }]} >Kilogram</Text> */}
                </View>
                {/* <View style={{ marginLeft: 10 }} >
                    <Pressable style={[styles.kgInputVw, { backgroundColor: '#f0f0f0' }]} >
                        <TextInput style={styles.weightText} maxLength={3} keyboardType='numeric' value={gramValue} onChangeText={text => setGramValue(text)} />
                    </Pressable>
                    <Text style={[styles.commonText, { marginTop: 2 }]} >Gram</Text>
                </View> */}

                <View style={styles.weightMapVw}>
                    <Pressable onPress={() => {
                        setWeightMetric('Kgs')
                        updateWeightMetric('Kgs')
                        // updateFormData({ ...formData, weight: "" })
                    }}
                        style={[styles.weightKgsMap, { backgroundColor: weightMetric == 'Kgs' ? theme.SECONDARY_OPACITY : theme.PRIMARY, borderBottomWidth: 1, borderColor: 'grey' }]}>
                        <Text style={[styles.weightMapText, { color: weightMetric == 'Kgs' ? theme.SECONDARY : theme.GRAY_BLACK }]}>{translate("COMMONTEXT")["KG"]}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setWeightMetric('Lbs')
                        updateWeightMetric('Lbs')
                        // updateFormData({ ...formData, weight: "" })
                    }}
                        style={[styles.weightKgsMap, { backgroundColor: weightMetric == 'Lbs' ? theme.SECONDARY_OPACITY : theme.PRIMARY }]}>
                        <Text style={[styles.weightMapText, { color: weightMetric == 'Lbs' ? theme.SECONDARY : theme.GRAY_BLACK }]}>{translate("COMMONTEXT")["LBS"]}</Text>
                    </Pressable>
                </View>

            </View>
            <View style={styles.buttonContainer} >
                <Pressable onPress={() => setWeightDetailDisplay(false)} >
                    <Text style={[styles.buttonText, { marginRight: 15 }]} >{translate("COMMONTEXT")["CANCEL1"]}</Text>
                </Pressable>
                <Pressable onPress={() => {
                    let temp = kgValue
                    updateFormData({ ...formData, weight: temp })
                    setWeightDetailDisplay(false)
                }} >
                    <Text style={styles.buttonText} >{translate("COMMONTEXT")["OK"]}</Text>
                </Pressable>
            </View>
        </View>
    );
}


const Style = (theme) => StyleSheet.create({
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
    commonText: {
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.SEARCH_TITLE,
    },
    weightDetailContainer: {
        flexDirection: 'row',
        marginTop: 25,
    },
    kgInputVw: {
        width: 195,
        paddingVertical: Platform.OS === 'ios' ? 8 : -1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d6ebfa'
    },
    weightText: {
        fontSize: 36,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.GRAY_BLACK,
        width: '100%',
        textAlign: 'center'
    },
    weightMapVw: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        overflow: 'hidden',
        marginLeft: 10,
        width: 53,
        height: 68
    },

    weightKgsMap: {
        height: '49.5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weightMapText: {
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        fontSize: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: height * 0.02,
        paddingTop: height * 0.02,
        width: '90%'
    },
    buttonText: {
        color: theme.SECONDARY,
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
});