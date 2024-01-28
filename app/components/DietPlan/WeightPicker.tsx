import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";

import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'
import ScrollPicker from "../../components/ScrollSelection/index"



import moment from 'moment'



export default function WeightPicker(props: any) {
    const styles = Style(props.theme);
    const dateSelect = useRef()
    const theme = props.theme
    var INITIAL_DATE: any = moment().format('YYYY-MM-DD');
    const [modalDisplay, setModalDisplay] = useState(true)
    const [date, setDate] = useState(new Date())

    var dataArray = [
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
        54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
        66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
        78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
        90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ]
    var a = ['a', 'b', 'c']
    useEffect(() => {
        setTimeout(() => {
            // dateSelect.click();
            // dateSelect.onPressDate()

        }, 500)
    })
    return (
        <Modal
            style={[{ flex: 1, flexDirection: 'row', justifyContent: "center", width: '90%', alignItems: 'center', backgroundColor: theme.PRIMARY }]}
            isVisible={modalDisplay}
            // animationIn="slideInUp"
            // animationOut="slideOutDown"
            // coverScreen={modal}
            onBackButtonPress={() => { setModalDisplay(false) }}
            onBackdropPress={() => { setModalDisplay(false) }}
        >
            <View style={{ flex: .25 }}></View>

            <View style={{
                overflow: 'hidden',
                shadowColor: 'red',
                shadowRadius: 10,
                borderColor: 'blue',
                shadowOpacity: 1, borderWidth: 1, flex: .25, height: '30%', width: '50%'
            }}>

                <ScrollPicker
                    dataSource={dataArray}
                    selectedIndex={1}
                    renderItem={(data, index) => {
                        return (
                            <View><Text style={{ fontSize: 26, fontFamily: FONTFAMILY.BOLD }}>{data}</Text></View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        console.log(data, 'sdh sjdv jdsvsdhv js')
                    }}
                    wrapperHeight={180}
                    wrapperWidth={150}
                    // wrapperBackground='red'
                    itemHeight={45}
                    highlightColor='#d8d8d8'
                    highlightBorderWidth={2}
                />
            </View>

            <View style={{ borderWidth: 1, flex: .25, height: '30%', width: '50%' }}>
                <ScrollPicker
                    dataSource={dataArray}
                    selectedIndex={1}
                    renderItem={(data, index) => {
                        return (
                            <View><Text style={{ fontSize: 26, fontFamily: FONTFAMILY.BOLD }}>{data}</Text></View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        console.log(data)
                    }}
                    wrapperHeight={180}
                    wrapperWidth={150}
                    // wrapperBackground='red'
                    itemHeight={45}
                    highlightColor='#d8d8d8'
                    highlightBorderWidth={12}
                />
            </View>
            <View style={{ flex: .25 }}></View>



        </Modal >
    );
}
// setDropDownVisible(!isDropDownVisible)


const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.PRIMARY
        },
    });
};


