import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import Add from '../../assets/images/Add.svg'
import Tick from '../../assets/images/Tick.svg'

const RenderGroup = ((props) => {
    const { theme, item, navigation, apiCallForJoinGroup } = props
    const styles = modalStyles(theme);
    return (
        <Pressable style={styles.interestItemContainer} onPress={() => {
            navigation.navigate('Zen.GroupDetail', {
                id: item.id,
                data: item,
            });
        }}>
            <View style={styles.gpImgVw}>
                <Image style={styles.gpImg} source={{ uri: item.image }} />
            </View>

            {item.pinFlag ?
                <Image style={styles.pinImage} source={require('../../assets/images/pin_white.png')} />
                : <Image style={styles.pinImage} source={{}} />}

            {item?.user_follows?.length >= 1 ?
                <Pressable style={styles.followView} >
                    <Tick />
                </Pressable>
            :   
                <Pressable style={styles.followView} onPress={() => {
                    apiCallForJoinGroup(item)
                }}>
                    <Add />
                </Pressable>
            }

            <Text style={styles.gptext} numberOfLines={2}>{item.name}</Text>
        </Pressable>
    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        interestItemContainer: {
            marginVertical: 10,
            marginHorizontal: 5,
            width: 101,
            height: 150,
            borderRadius: 10
        },
        gpImgVw: {
            borderRadius: 10,
            overflow: 'hidden',
        },
        gpImg: {
            width: 101,
            height: 109,
        },
        gptext: {
            fontSize: 13,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            textAlign: 'center',
            width: '95%',
            marginTop: 4
        },
        pinImage: {
            height: 13,
            width: 13,
            position: 'absolute',
            left: 7,
            top: 7
        },
        followView: {            
            position: 'absolute',
            right: 7,
            bottom: 50,
        },
        followImg: {
            height: 20,
            width: 20,  
            borderColor:theme.PRIMARY,
            borderWidth:1.5,
            borderRadius:13,
        }
    });
};
export default RenderGroup;