import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, StatusBar, FlatList, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import _ from 'lodash';
import { FONTFAMILY } from '../../config/font-config';
import Button from '../../components/CommonInput/navigateButton';


const PostErrorModal = (props) => {
    const { theme, openJoinModal, setOpenJoinModal, onPress } = props;
    const styles = modalStyles(theme);

    return (
        <Modal
            visible={openJoinModal}
            transparent={true}
            onRequestClose={() => { setOpenJoinModal(false); }}
        >
            <Pressable style={styles.centeredView} onPress={() => setOpenJoinModal(false)}>
                <View style={styles.modalView}>
                <Pressable onPress={() => setOpenJoinModal(false)}>
                        <Image source={require('../../assets/images/close.png')} style={styles.closeIcon} />
                    </Pressable>
                    <View style={styles.containerView}>
                        <Text style={styles.textStyle}>Please join to post</Text>
                        <Button onPress={onPress} height={34} width={66} marginTop={Platform.OS == 'ios' ? -1 : 0} theme={theme} buttonText={translate("COMMONTEXT").JOIN} fontSize={12} />
                    </View>
                </View>
            </Pressable>

        </Modal>
    )
}

export default PostErrorModal;

const modalStyles = (theme: any) => StyleSheet.create({

    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
        backgroundColor: "rgba(0,0,0,0.54)"
    },
    modalView: {
        backgroundColor: theme.PRIMARY,
        borderRadius: 10,
        height: 78,
        width: 297,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    containerView: { 
        flexDirection: "row", 
        alignItems: "center",
        justifyContent:"center", 
    },
    textStyle: {
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        marginRight: 20,
        textAlignVertical:"center"
    },
    closeIcon: { 
        height: 9, 
        width: 9, 
        tintColor: '#666666', 
        alignSelf: 'flex-end',
        marginTop:5,
        marginRight:10,
        marginBottom:8
    }
})