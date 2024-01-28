import React from 'react'
import { View, Text, StyleSheet , Pressable} from 'react-native'
import Select_Box from '../assets/images/checkbox_Select.svg'
import Empty_Box from '../assets/images/empty_Box.svg'
import Radio from '../assets/images/radio_Select.svg'
import Empty from '../assets/images/empty_Radio.svg'

const CommonCheckBox = ({onPress = () => {},showRadio = false, extraButtonStyle = {}, extraTextStyle = {}, title, showCheck = false}: any) => {
    return (
        <Pressable onPress={() => {onPress()}} style={[styles.container,extraButtonStyle]}>
            {showCheck ? showRadio ? <Radio width={18} height={18} /> 
                :  <Select_Box width={18} height={18} /> 
                    : showRadio ? <Empty width={18} height={18} /> 
                        : <Empty_Box width={18} height={18} />
            }
            <Text style={[styles.textStyle, extraTextStyle]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
    textStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 15
    },

})

export default CommonCheckBox