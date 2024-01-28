import React from 'react'
import { StyleSheet, Pressable, View, Image, Dimensions } from 'react-native'
import Delete from '../../assets/images/share1.svg'
const defaultWidth = Dimensions.get('window').width;


const ImageSelection = (props) => {
    const {
        theme,
        item,
        onPress
    } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            imageStyle: {
                width: defaultWidth / 3, 
                height: defaultWidth / 3, 
                marginTop: 1,
                marginHorizontal: 0.5,
            },
            deleteView: { 
                position: 'absolute', 
                alignItems: 'center', 
                justifyContent: 'center', 
                right: 5, 
                top: 5, 
                height: 25, 
                width: 25, 
                borderRadius: 15, 
                padding: 5, 
                backgroundColor: 'rgba(52, 52, 52, 0.6)' 
            },
            deleteImg: {
                height:15, 
                width:15, 
                tintColor:'white'
            }
        })
    };

    const styles = stylesActivity(theme);

    return (
        <View>
            <Image source={{ uri: item.path }} style={styles.imageStyle} />
            <Pressable style={styles.deleteView} onPress={onPress}>
                <Image source={require('../../assets/images/delete.png')} style={styles.deleteImg} />
            </Pressable>
        </View>
    );
}

export default ImageSelection;