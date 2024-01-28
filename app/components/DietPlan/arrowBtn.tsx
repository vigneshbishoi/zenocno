import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { navigationRef } from "../../navigation/NavigationService";
export default function ArrowButton(props: any) {

    const type = props.type
    const theme = props.theme
    const { stepCounter, setStepCounter, onClickNext } = props

    const onClickBack = () => {
        if (stepCounter > 0) {
            setStepCounter(stepCounter - 1)
        }
        else {

            props.navigation.pop()
        }
    }

    return (
        <Pressable onPress={() => { type == "next" ? onClickNext() : onClickBack() }}>
            {type == "next" &&
                <View  style={[styles.btn, { borderWidth: stepCounter == props.totalStep - 1 ? 1 : 0, backgroundColor:theme.SECONDARY }]}>
                    <Icon name="arrowright" size={25} color={stepCounter == props.totalStep - 1 ? theme.PRIMARY : theme.PRIMARY} />
                </View>}
            {/* {type == "back" &&
                <LinearGradient start={{ x: 0, y: 1 }} colors={stepCounter == 0 ? [theme.PRIMARY, theme.PRIMARY] : [theme.SECONDARY, theme.LIGHT_GREEN]} style={[styles.btn, { borderWidth: stepCounter == 0 ? 1 : 0 }]}>
                    <Icon name="arrowleft" size={30} color={stepCounter == 0 ? theme.SECONDARY : theme.PRIMARY} />
                </LinearGradient>} */}
        </Pressable>

    )

}

const styles = StyleSheet.create({
    container: {

    },
    btn: {
        height: 60,
        width: 60,
        borderRadius: 100,
        borderColor: "#CED3D9",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9,
    }
})
