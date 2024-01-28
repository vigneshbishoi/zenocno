/**
 * AddActivity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: AddActivity 
 */
import React, { useState } from 'react';
import style from './Style';
import {
    Pressable,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    TextInput
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Modal from 'react-native-modal'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import translate from "../../../utils/Text";
import AppHeader from '../../../components/CommonInput/appHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
    route: object
}

const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const [isActivateModal, setActivateModalShow] = useState(false)
    const [isDeleteModal, setDeleteModalShow] = useState(false)
    const [reasonValue, setReasonValue] = useState('')
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);

    const deActivateAccount = () => {
        AsyncStorage.setItem('loggedIn', 'false')
        props.actions.getCalendarData("calendarData", {}, actionTypes.GET_CALENDAR_DATA)
        props.actions.callUserDetailsData("userDetails", {}, actionTypes.ADD_USER_DETAILS_DATA)
        props.actions.editImageData("profileImage", {}, actionTypes.EDIT_IMAGE_DATA)
        props.actions.otpData('userData', {}, actionTypes.USER_DATA);
        props.actions.loggedIn('loginStatus', false, actionTypes.LOGIN_STATUS);
        props.actions.deactiviateAccount(actionTypes.DEACTIVATE_ACCOUNT, {
            module: 'user',
            action: 'account_deactive',
            formData: {
                id: userId,
            }
        });
    }

    const deleteAccount = () => {
        if(reasonValue.length > 0){
            AsyncStorage.setItem('loggedIn', 'false')
            props.actions.getCalendarData("calendarData", {}, actionTypes.GET_CALENDAR_DATA)
            props.actions.callUserDetailsData("userDetails", {}, actionTypes.ADD_USER_DETAILS_DATA)
            props.actions.editImageData("profileImage", {}, actionTypes.EDIT_IMAGE_DATA)
            props.actions.otpData('userData', {}, actionTypes.USER_DATA);
            props.actions.loggedIn('loginStatus', false, actionTypes.LOGIN_STATUS);
            props.actions.deleteAccount(actionTypes.DELETE_ACCOUNT, {
                module: 'user',
                action: 'delete_account',
                formData: {
                    id: userId,
                    reason: reasonValue
                }
            });
        } else {
            Toast.show({
                type: 'error',
                // text1: 'Oops',
                text2: 'Please add reason for delete account'
              });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("DRAWER")["SETTINGS"]}
                isRightComponent={false}  />
            <View style={[styles.vwContainer, { marginTop: 25 }]} >
                <Text style={styles.deactivateText} numberOfLines={1} >{translate("SETTINGS")["DEACTIVATE_ACC"]}</Text>
                <Text style={styles.desText} >{translate("SETTINGS")["DEACTIVATE_DESCRIPTION"]}</Text>
                <Pressable style={styles.onclickText} onPress={() => setActivateModalShow(true)} >
                    <Text style={[styles.deactivateText, { color: theme.RED_COLOR }]} numberOfLines={1}>{translate("SETTINGS")["DEACTIVE_TITLE"]}</Text>
                </Pressable>
            </View>
            <View style={styles.vwContainer} >
                <Text style={styles.deactivateText} numberOfLines={1} >{translate("SETTINGS")["DELETE_ACC"]}</Text>
                <Text style={styles.desText} >{translate("SETTINGS")["DELETE_DESCRIPTION"]}</Text>
                <Pressable style={styles.onclickText} onPress={() => setDeleteModalShow(true)} >
                    <Text style={[styles.deactivateText, { color: theme.RED_COLOR }]} numberOfLines={1}>{translate("SETTINGS")["DELETE_TITLE"]}</Text>
                </Pressable>
            </View>
            {isActivateModal &&
                <Modal
                    isVisible={isActivateModal}
                    animationIn={'fadeInLeft'}
                    animationOut={'fadeInDown'}
                    backdropOpacity={0.3}
                    onBackdropPress={() => setActivateModalShow(false)}
                    onBackButtonPress={() => setActivateModalShow(false)}>
                    <View style={styles.modalContainer} >
                        <View style={styles.deactivateModalVw} >
                            <Text style={styles.modalTitleText} numberOfLines={1}>{translate("SETTINGS")["NOTICE"]}</Text>
                            <Text style={styles.modalDesText}>{translate("SETTINGS")["DEACTIVATE_NOTICE"]}</Text>
                            <Pressable style={styles.modalButtonVw} onPress={() => deActivateAccount()}>
                                <Text style={[styles.deactivateText, { color: theme.RED_COLOR }]} numberOfLines={1} >{translate("SETTINGS")["DEACTIVATE_ACC"]}</Text>
                            </Pressable>
                            <Pressable style={styles.modalButtonVw} onPress={() => setActivateModalShow(false)} >
                                <Text style={styles.deactivateText} numberOfLines={1} >{translate("COMMONTEXT")["CANCEL"]}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            }
            {isDeleteModal &&
                <Modal
                    isVisible={isDeleteModal}
                     animationIn={'fadeInLeft'}
                    animationOut={'fadeInDown'} 
                    onBackButtonPress={() => setDeleteModalShow(false)}
                    onBackdropPress={() => setDeleteModalShow(false)}
                    backdropOpacity={0.3}
                    avoidKeyboard={true}>
                     <View style={styles.modalContainer}>
                        <View style={styles.deleteModalVw}>
                            <Text style={[styles.modalTitleText, { marginTop: 5 }]} numberOfLines={1} >{translate("SETTINGS")["NOTICE"]}</Text>
                            <Text style={[styles.modalDesText, { paddingHorizontal: 10 }]}>{translate("SETTINGS")["DELETE_NOTICE"]}</Text>
                            <View style={styles.deletionInputVw} >
                                <TextInput value={reasonValue}
                                    placeholder={translate("SETTINGS")["REASON_DELETE"]}
                                    placeholderTextColor={styles.placeholderText}
                                    style={styles.postText}
                                    multiline={true}
                                    onChangeText={(value) => setReasonValue(value)} />
                            </View>
                            <View style={styles.bottomButtonVw} >
                                <Pressable onPress={() => setDeleteModalShow(false)} >
                                    <Text style={[styles.deactivateText, { color: theme.SECONDARY }]} numberOfLines={1} >{translate("COMMONTEXT")["CANCEL"]}</Text>
                                </Pressable>
                                <Pressable onPress={() => deleteAccount()}>
                                    <Text style={[styles.deactivateText, { color: theme.RED_COLOR }]} numberOfLines={1} >{translate("SETTINGS")["DELETE_ACC"]}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </SafeAreaView>
    );
};
export default withTheme(Layout);