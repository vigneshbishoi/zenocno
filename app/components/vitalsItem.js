import React from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform, Dimensions, Linking } from 'react-native';
import { FONTFAMILY } from '../config/font-config';
import Back from '../assets/images/Back.svg';
import { BarChart } from "react-native-web-svg-charts";

const VitalsItem = ((props) => {
    const { item, theme, isSymptoms = false } = props
    const styles = modalStyles(theme);
    const data = [
        { value: 20, svg: { fill: theme.SECONDARY_TWO } },
        { value: 100, svg: { fill: theme.SECONDARY_TWO } },
        { value: 40, svg: { fill: theme.SECONDARY_TWO } },
        { value: 70, svg: { fill: theme.SECONDARY_TWO } },
        { value: 80, svg: { fill: theme.SECONDARY_TWO } },
        { value: 10, svg: { fill: theme.SECONDARY_TWO } },
        { value: 30, svg: { fill: theme.SECONDARY_TWO } },
        { value: 55, svg: { fill: '#dddddd' } },
        { value: 90, svg: { fill: '#dddddd' } },
        { value: 40, svg: { fill: '#dddddd' } }
    ];

    return (
        <Pressable style={styles.newsItemContainer}  >
             {item.icon}
            <View style={[styles.itemDescriptionContainer, { width: isSymptoms ? '42%' : '65%' }]} >
                <Text style={styles.itemTitleText} numberOfLines={3} >{item.vitalTitle}</Text>
                <View style={styles.feverDescriptionVw} >
                    <Text style={styles.vitalTempText} numberOfLines={1} >{item.value}</Text>
                    {!isSymptoms && <Text style={[styles.vitalMapText, { marginLeft: 3 }]} numberOfLines={1} >{item.vitalMap}</Text>}
                </View>
            </View>
            {isSymptoms &&
                <View style={styles.barChartVw} >
                    <BarChart
                        style={{ height: 37 }}
                        data={data}
                        spacingInner={0.7}
                        spacingOuter={1}
                        // svg={{ fill:theme.SECONDARY }}
                        yAccessor={({ item }) => item.value}
                        contentInset={{ top: 0, bottom: 10 }}
                    />
                </View>}
            <Back width={12} height={12} style={styles.rightArraw} />
        </Pressable>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        newsItemContainer: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center'
        },
        itemDescriptionContainer: {
            marginHorizontal: 10,
            marginVertical: 5
        },
        itemTitleText: {
            fontSize: 14,
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        vitalMapText: {
            color: theme.SEARCH_TITLE,
            fontSize: 13,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginTop:-5
        },
        vitalTempText: {
            color: theme.SECONDARY_TWO,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 18,
            marginTop: 3,
        },
        feverDescriptionVw: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            marginTop: Platform.OS === 'ios' ? -1 : -5
        },
        barChartVw:{ 
            width: '29%', 
            height: 37 
        },
        rightArraw:{ 
            transform: [{ rotateY: '180deg' }], 
            position: 'absolute',  
            right: 15 
        }
    });
};
export default VitalsItem;  