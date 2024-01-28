import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import Icon from 'react-native-vector-icons/Feather';


const Steps = (props: any) => {
    return (
        <View style={styles.container}>
            {
                props.progress == props.currStep ? (
                    <View style={styles.emptyCirle}>
                        <Text style={styles.emptyCirleText}>{props.progress}</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <View style={styles.completedCircle}>
                            {/* <Icon name="check" size={30} color="white" /> */}
                        </View>
                        {
                            props.avoidLine === true ? (null) : (<View style={styles.line}></View>)
                        }


                    </View>
                )
            }
            <View style={styles.data} >
                {props.component}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    data: {
        width: "80%",
        marginLeft: 15
    },
    emptyCirle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderColor: "#19CEAB",
        borderWidth: 2,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyCirleText: {
        color: "#19CEAB",
    },
    completedCircle: {
        flexDirection: "column",
        backgroundColor: "#19CEAB",
        borderColor: "#19CEAB",
        width: 30,
        height: 30,
        borderRadius: 15

    },
    line: {

        height: 50,
        borderLeftWidth: 2,
        borderColor: "#C9C9C9",
        marginTop: 5,
        marginBottom: 5,
    },
    header: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    subheader: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
    },

})
export default Steps
