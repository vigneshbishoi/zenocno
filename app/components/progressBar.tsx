import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
const barStyle = (val: any) => {
    var width = val * 16.66;
    if (width > 100) {
        width = 100;
    }
    return {
        width: `${width} %`,
        height: 5,
        backgroundColor: '#19CEAB',
    }
}

const ProgressBarTop = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <View style={barStyle(props.val)}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        width: "100%",
        height: 5,
        borderRadius: 10,
        marginTop: 20,
    },
    barContainer: {
        width: "100%",
        height: 5,
        backgroundColor: '#ECECEC',
        borderRadius: 5
    },

})

export default ProgressBarTop