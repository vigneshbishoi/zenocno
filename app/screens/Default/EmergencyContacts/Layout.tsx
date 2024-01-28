/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    FlatList,
    Pressable,
    View,
    Text,
    StatusBar,
    Linking,
    Alert
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import Call from '../../../assets/images/call_ic.svg'
import Add from '../../../assets/images/add_vital.svg'
import CallV from '../../../assets/images/call_vital.svg'
import Remove from '../../../assets/images/remove_vital.svg'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SosEmergencyContact from '../../../components/sosEmergencyContact.js'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import translate from '../../../utils/Text';
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const insets = useSafeAreaInsets();
    const [isSosModalShow, setSosModalShow] = useState(false)
    const [valueChange, setvalueChange] = useState(false)
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    let contacts =
        useSelector((state) => state?.rpmReducer?.soscontacts?.length > 0 ? state?.rpmReducer?.soscontacts[0]?.data : []) || [];
    const [contactsFinal, setContacts] = useState(contacts)

    useEffect(() => {
        if (contactsFinal.length != contacts) {
            setContacts(contacts)
        }
    }, [contacts != undefined])

    useEffect(() => {
        fetchAllContacts()
    }, [])

    //Api Call
    const fetchAllContacts = () => {
        props.actions.getEmergencyContact(actionTypes.FETCH_SOS, {
            module: 'rpm',
            action: 'get_rpm_deviation_contacts',
            formData: {
                userId: userId,
            },
        });
    }
    const postContact = (name: any, number: any) => {
        props.actions.postEmergencyContact(actionTypes.CREATE_SOS, {
            module: 'rpm_deviation_contact',
            action: 'create',
            formData: {
                userId: userId,
                name: name,
                phone: number
            },
        });
        contactsFinal.push({ name: name, phone: number })
        Toast.show({
            type: 'success',
            text1: name + " has registered as your caregiver.",
        })
    }
    const deleteContact = (id: any) => {
        props.actions.deleteEmergencyContact(actionTypes.DELTE_SOS, {
            module: 'rpm',
            action: 'update_rpm_deviation_contacts',
            formData: {
                id: id
            },
        });
        setTimeout(() => {
            setvalueChange(!valueChange)
            Toast.show({
                type: 'success',
                text1: "Number has been deleted successfully",
            })
        }, 600)
    }

    const removeLocally = (id) => {
        let contacts = contactsFinal.filter(item => item.id != id)
        setvalueChange(!valueChange)
        setContacts(contacts);
        // contacts = filterData
    }

    //Helper Methods
    const onDelete = (id: any) => {
        Alert.alert(
            "",
            "Are you sure you want to delete this contact?",
            [
                {
                    text: "NO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "YES", onPress: () => {
                        removeLocally(id)
                        deleteContact(id)
                    }
                }
            ]
        );
    }
    const renderContactList = ({ item, index }) => {
        console.log('111')
        return (
            <View style={styles.contactsItemContainer} >
                <View style={styles.contactDetail} >
                    <Text numberOfLines={1} style={styles.commonText} >{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Call />
                        <Text numberOfLines={1} style={styles.commonTwoText} >{item.phone}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={{ padding: 7, marginRight: 3 }} onPress={() => Linking.openURL(`tel:${'+91' + item.phone}`)}>
                        <CallV width={33} height={33} />
                    </Pressable>
                    <Pressable style={{ padding: 7, marginRight: 13 }} onPress={() => onDelete(item.id)}>
                        <Remove width={33} height={33} />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <AppHeader theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("COMMONTEXT")["EMERGENCY_CONTACT"]}
                isRightComponent={true}
                isSecondIcon={true}
                rightSecondIcon={<Add width={24} height={24} />}
                rightSecondPress={() => setSosModalShow(true)} />
            <View style={styles.subContainer} >
                <FlatList
                    data={contactsFinal}
                    scrollEnabled={false}
                    keyExtractor={item => item.key}
                    style={{ marginVertical: 15 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderContactList} />
            </View>
            {isSosModalShow &&
                <SosEmergencyContact
                    theme={theme}
                    isSosModalShow={isSosModalShow}
                    setSosModalShow={setSosModalShow}
                    onSave={postContact}
                />
            }
            <View style={{ height: insets.bottom, backgroundColor: theme.SELECTED }} />
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);