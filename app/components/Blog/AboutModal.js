import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, StatusBar, FlatList, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import _ from 'lodash';
import { FONTFAMILY } from '../../config/font-config';
import Button from '../../components/CommonInput/navigateButton';


const AboutModal = (props) => {
    const {setOpenModal, textShown, showMoreButton, rulesShowMoreButton, rulesTextShown, isFollow, toggleRulesTextShown,
        btnOnPress, onTextLayout, onRulesTextLayout, numLines,rulesNumLines, theme, item,toggleTextShown, openDetails} = props;
    const styles = modalStyles(theme);
    

    return (
        <Modal
            visible={openDetails}
            transparent={true}
            onRequestClose={() => { setOpenModal(false); }}
        >
            <Pressable style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable onPress={() => setOpenModal(false)}>
                        <Image source={require('../../assets/images/close.png')} style={styles.closeIcon} />
                    </Pressable>
                    <View style={[styles.descriptionView, { paddingVertical: 0 }]}>
                        <Text style={styles.descriptionTitleText}>{translate("GROUP")["ABOUT_CANCER_WARRIOR"]}</Text>
                        <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={styles.descriptioneText}>{item?.description}</Text>
                        {showMoreButton ? (
                            <Text onPress={toggleTextShown} style={[styles.seeMoreTxt, { color: 'black' }]}>
                                {textShown ? '' : 'Read More'}
                            </Text>) : null}
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionTitleText}>{translate("GROUP")["GROUP_RULES"]}</Text>
                        <Text onTextLayout={onRulesTextLayout} numberOfLines={rulesNumLines} style={styles.descriptioneText}>
                            {item?.rules}
                        </Text>
                        {rulesShowMoreButton ? (
                            <Text onPress={toggleRulesTextShown} style={[styles.seeMoreTxt, { color: 'black' }]}>
                                {rulesTextShown ? '' : 'Read More'}
                            </Text>) : null}
                    </View>
                    {!isFollow &&
                        <Button onPress={btnOnPress} height={34} width={'94%'} marginTop={0} theme={theme} buttonText={translate("COMMONTEXT").JOIN} fontSize={12} />
                    }
                </View>
            </Pressable>
        </Modal>
    )
}

export default AboutModal;

const modalStyles = (theme: any) => StyleSheet.create({

    seeMoreTxt: {
        color: theme.SECONDARY,
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_REGULAR
      },
      descriptioneText: {
        marginTop: 5,
        color: theme.SUB_TITLE,
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_REGULAR
      },
    descriptionTitleText: {
        color: theme.GRAY_BLACK,
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM
      },

    descriptionView: {
        alignItems: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor:theme.PRIMARY
      },
      centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 8,
        backgroundColor: "rgba(0,0,0,0.54)"
      },
      modalView: {
        backgroundColor:theme.PRIMARY,
        width: '100%',
        marginTop: 0, 
        paddingBottom: 25, 
        paddingHorizontal: 5, 
        paddingTop: 5, 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5       
      },
      closeIcon: { 
        height: 14, 
        width: 14, 
        tintColor: '#666666', 
        alignSelf: 'flex-end',
        marginTop: 15, 
        marginRight: 15, 
    }
})