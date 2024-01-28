import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

import Itemheader from './ItemHeader';

const ProfileMatching = ((props) => {

    const { profileArr, theme, onAllPress } = props
    const styles = modalStyles(theme);

    const renderItem = ({item , index}) => {
        return (
            <View style={styles.itemView}>
                <View style={{ overflow: 'hidden', borderRadius: 15, margin:10 }}>
                    <Image source={item.image} style={{ height: 140, width: 150 }} />
                </View>
                <View style={{alignItems:'center'}}>
                <Text style={styles.nameText}>{item.pname}</Text>
                <Text style={styles.typeText}>Cancer Type</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Itemheader
                header='Profile Matching'
                option='View all'
                icon={require('../../assets/images/home/Matches.png')}
                color={theme.PRIMARY}
                theme={theme}
                onAllPress={onAllPress}
            />

            <FlatList
                data={profileArr}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 28, marginTop: 10, paddingVertical: 10 }}
                horizontal={true}
            />
        </View>
    )
})

const modalStyles = (theme) => StyleSheet.create({
    container: {
        paddingVertical: 30,
        backgroundColor: '#f0ffff',
    },
    itemView: {
        borderRadius: 15,
        backgroundColor: theme.PRIMARY,
        marginHorizontal: 10,
    },
    nameText: {
        fontSize: 12,
        color: theme.GRAY_BLACK,
        fontFamily: FONTFAMILY.MEDIUM,
    },
    typeText: {
        fontSize: 10,
        color: theme.SUB_TITLE,
        fontFamily: FONTFAMILY.MEDIUM,
        marginTop:2,
        marginBottom: 15
    },
})
export default ProfileMatching;