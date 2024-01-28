import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native';
import Modal from 'react-native-modal'
import { FONTFAMILY } from "../../config/font-config";
import translate from "../../utils/Text"
import { SvgCssUri } from 'react-native-svg';
import { dateDiffInDaysMonthsYears } from '../../utils/commonFunction';


export default function NotificationModal(props: any) {

    const { notificationVisible, setNotificationVisible, notiArr, setAllReadNotification, theme, onPress = () => {} } = props

    const renderNotification = ({ item, index }) => {
        var fileName = item?.notification_type?.image;
        var extension = fileName.split('.').pop();
        return (
            <Pressable onPress={() => {onPress(item)}} style={styles.renderItemVw}>
                {extension == 'svg' ? <SvgCssUri
                    width={71}
                    height={71}
                    uri={item?.notification_type?.image}
                /> :<Image style={styles.userImage} source={{ uri: item?.notification_type?.image}} /> }
                <View style={styles.userTypeTagVw}>
                    <Image source={require('../../assets/images/discussion.png')} style={styles.tagImg} />
                </View>
                <View style={styles.desVw}>
                    <Text numberOfLines={1} style={styles.messageTitle} >{item?.notif_desc}</Text>
                    {/* <Text numberOfLines={1} style={styles.messageTitle} >{item?.notificationTypeId}</Text> */}
                    <View style={styles.typeVw}>
                        <Text style={styles.typeName} numberOfLines={1} >{item?.notification_type?.text}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.timeText} numberOfLines={1}>{item.time}{dateDiffInDaysMonthsYears(item.createdAt)}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <Modal
            isVisible={notificationVisible}
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            style={{ margin: 0, backgroundColor: theme.PRIMARY }}  >
            <View style={styles.modalVw}>
                <View style={styles.headerVw}>
                    <Pressable style={{padding: 10, marginLeft: -10,
                        }} onPress={() => setNotificationVisible(false)}>
                        <Image style={styles.closeImg} source={require('../../assets/images/close.png')} />
                    </Pressable>
                    <Text style={styles.notificationText} numberOfLines={1} >{translate("COMMONTEXT")["NOTIFICATION"]}</Text>
                    <Pressable style={styles.markTextVw} onPress={() => setAllReadNotification(true)} >
                        <Text style={styles.markText} numberOfLines={1} >Mark all as read</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={notiArr}
                    style={{marginBottom: 30}}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotification}
                    ListEmptyComponent={() => {
                        return <View style={{flex:1, alignItems:'center', marginTop: 20}}>
                        <Text style={styles.emptyListMsg}>{translate("COMMONTEXT")["NO_DATA_FOUND1"]}</Text>
                        </View>
                    }} />

            </View>

        </Modal>
    );
}
const styles = StyleSheet.create({
    modalVw: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 40 : 10,
        paddingHorizontal: 20
    },
    headerVw: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    closeImg: {
        width: 12,
        height: 12
    },
    notificationText: {
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: '#333333',
        fontSize: 16,
        marginLeft: 10
    },
    markTextVw: {
        position: 'absolute',
        right: 0
    },
    markText: {
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: '#108FE5',
        fontSize: 12
    },
    renderItemVw: {
        height: 90,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImage: {
        height: 71,
        width: 71,
        borderRadius: 10,
        overflow: 'hidden'
    },
    userTypeTagVw: {
        backgroundColor: 'skyblue',
        borderRadius: 10,
        position: 'absolute',
        alignItems: 'center',
        width: 21,
        height: 21,
        justifyContent: 'center',
        bottom: 10,
        left: 52
    },
    tagImg: {
        width: 11,
        height: 11
    },
    desVw: {
        marginLeft: 10,
        marginRight: 30,
        width: '80%'
    },
    messageTitle: {
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: '#000000',
        fontSize: 14
    },
    typeVw: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? -3 : 0
    },
    typeName: {
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: '#666666',
        fontSize: 12
    },
    dot: {
        color: '#666666',
        paddingHorizontal: 5
    },
    timeText: {
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: '#666666',
        fontSize: 12
    }
})