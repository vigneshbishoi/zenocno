import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { FONTFAMILY } from '../../config/font-config';
// import ScrollPicker from "../../components/ScrollSelection/index"

const TrackFoodOption = (props) => {
    return (
        <View style={{ height: 180, width: 180 }}>
            <ScrollPicker
            style={{borderWidth:1,borderColor:'black'}}
                wrapperHeight={100}
                wrapperWidth={150}
                wrapperColor='#FFFFFF'
                itemHeight={30}
                renderItem={(data, index,isSelected) => (
                    <View style={{}}>
                        <Text style={isSelected? styles.activeItemStyle : styles.itemStyle}>{data}</Text>
                    </View>
                )}
                highlightColor='#BDBDBD'
                highlightBorderWidth={2}
                onValueChange={(data, selectedIndex) => {
                    console.log("Data",data)
                  }}
                dataSource={['01', '02', '03', '04', '05', '06']} />
        </View>
    )
}

export default TrackFoodOption;

const styles = StyleSheet.create({
    itemStyle:{
        fontSize:26,fontFamily:FONTFAMILY.REGULAR,color:'grey',opacity:0.3
    },
    activeItemStyle:{
        fontSize:26,fontFamily:FONTFAMILY.REGULAR,color:'grey'
    }

})
