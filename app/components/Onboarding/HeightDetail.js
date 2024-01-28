import React, { useState } from 'react';
import { Dimensions, TextInput, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import translate from '../../utils/Text';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HeightDetail(props: any) {
    const styles = Style(props.theme);
    const theme = props.theme
    const { setHeightErr, formData, updateFormData, heightDetailDisplay, setHeightDetailDisplay, updateHeightMetric } = props
    const [inchValue, setInchValue] = useState('')
    const [feetValue, setfeetValue] = useState('')
    const [cmValue, setCmValue] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.commonText} >{translate("ONBOARDING")["HEIGHT_AFTER"]}</Text>
            <View style={styles.weightDetailContainer} >
                {formData.height_metric == 'ft' ?
                    <>
                        <View>
                            <Pressable style={[styles.kgInputVw, { borderWidth: 1.5, borderColor: theme.SECONDARY }]} >
                                <TextInput style={[styles.weightText, { textAlign: 'center' }]} maxLength={3} keyboardType='numeric' value={feetValue} onChangeText={text => setfeetValue(text)} />
                            </Pressable>
                            <Text style={[styles.commonText, { marginTop: 2 }]} >{translate("COMMONTEXT")["FEET"]}</Text>
                        </View>
                        <View style={{ marginLeft: 10 }} >
                            <Pressable style={[styles.kgInputVw, { backgroundColor: '#f0f0f0' }]} >
                                <TextInput style={[styles.weightText, { textAlign: 'center' }]} maxLength={2} value={inchValue} keyboardType='numeric' onChangeText={text => {
                                    setInchValue(text)
                                }} />
                            </Pressable>
                            <Text style={[styles.commonText, { marginTop: 2 }]}>{translate("COMMONTEXT")["INCH"]}</Text>
                        </View>
                    </> :
                    <View>
                        <Pressable style={[styles.kgInputVw, styles.cmView]} >
                            <TextInput style={styles.weightText} maxLength={3} keyboardType='numeric' value={cmValue} onChangeText={text => setCmValue(text)} />
                        </Pressable>
                        <Text style={[styles.commonText, { marginTop: 2 }]} >{translate("COMMONTEXT")["CM"]}</Text>
                    </View>
                }

                <View style={styles.weightMapVw}>
                    <Pressable onPress={() => {
                        updateHeightMetric('ft')
                    }}
                        style={[styles.weightKgsMap, { backgroundColor: formData.height_metric == 'ft' ? theme.SECONDARY : theme.PRIMARY, borderBottomWidth: 1, borderColor: 'grey' }]}>
                        <Text style={[styles.weightMapText, { color: formData.height_metric == 'ft' ? theme.SECONDARY : theme.PRIMARY }]}>{translate("COMMONTEXT")["FT_IN"]}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        updateHeightMetric('cm')
                    }}
                        style={[styles.weightKgsMap, { backgroundColor: formData.height_metric == 'cm' ? theme.SECONDARY : theme.PRIMARY }]}>
                        <Text style={[styles.weightMapText, { color: formData.height_metric == 'cm' ? theme.SECONDARY : theme.PRIMARY }]}>{translate("COMMONTEXT")["CM"]}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable onPress={() => setHeightDetailDisplay(false)} >
                    <Text style={[styles.buttonText, { marginRight: 15 }]} >{translate("COMMONTEXT")["CANCEL1"]}</Text>
                </Pressable>
                <Pressable onPress={() => {
                    if (formData.height_metric == 'ft') {
                        if (inchValue.length > 0) {
                            let temp = feetValue + '.' + inchValue
                            updateFormData({ ...formData, height: temp })
                            var inch = parseInt(inchValue)
                            if (inch > 11) {
                                setHeightErr(true)
                            }
                            else {
                                setHeightErr(false)
                            }
                        }
                    } else if (formData.height_metric == 'cm') {
                        updateFormData({ ...formData, height: cmValue })
                    }
                    setHeightDetailDisplay(false)
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
        width: 95,
        paddingVertical: Platform.OS === 'ios' ? 8 : -1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cmView: {
        borderWidth: 1.5,
        width: 200,
        borderColor: theme.SECONDARY,
        paddingHorizontal: 10
    },
    weightText: {
        fontSize: 36,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.GRAY_BLACK,
        width: '100%',

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
