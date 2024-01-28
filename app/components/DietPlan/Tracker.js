import React from 'react';
import {useState} from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import Back from '../../assets/images/Back.svg'


const Tracker = ((props) => {
    const { theme, index, onBack, totalNumber=6} = props
    const styles = modalStyles(theme, totalNumber);
    return (
        <View style={[totalNumber == 6 ? styles.header : styles.headerCircle ]}>
            {/* {(index != 1 || totalNumber != 6) &&
          <Pressable onPress={onBack}>
            <Back width={15} height={20}  />
         </Pressable> } */}
            <View style={[styles.trackVwCircle, {backgroundColor: index > 0 ? theme.SECONDARY : theme.PRIMARY}]}/>
            <View style={[styles.trackVwCircle, {backgroundColor: index > 1 ? theme.SECONDARY : theme.PRIMARY}]}/>
            <View style={[styles.trackVwCircle, {backgroundColor: index > 2 ? theme.SECONDARY : theme.PRIMARY}]}/>
            {/* {totalNumber == 6 && <View style={[styles.trackVw, {backgroundColor: index > 2 ? theme.SECONDARY : '#f0f0f0',}]}/>} */}
            {totalNumber == 6 && <View style={[styles.trackVw, {backgroundColor: index > 3 ? theme.SECONDARY : '#f0f0f0',}]}/>}
            {totalNumber == 6 && <View style={[styles.trackVw, {backgroundColor: index > 4 ? theme.SECONDARY : '#f0f0f0',}]}/>}
            {totalNumber == 6 && <View style={[styles.trackVw, {backgroundColor: index > 5 ? theme.SECONDARY : '#f0f0f0',}]}/>}
        </View>
    );
})
const modalStyles = (theme, totalNumber) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 45,
        alignItems: 'center',
        marginTop: 20,
        alignSelf:'center',
        justifyContent:'space-between',
        width:'100%'
    },
    headerCircle:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    trackVw: {
        width: totalNumber == 6 ? '14%' : '30%',
        height:5,
    },
    trackVwCircle: {
        width:8,
        height:8,
        borderRadius:4,
        marginHorizontal:6
    },
})
export default Tracker;