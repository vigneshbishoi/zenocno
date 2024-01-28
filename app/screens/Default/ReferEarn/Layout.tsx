/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Pressable,
    View,
    Text,
    ScrollView,
    StatusBar,
    Platform,
    Share,
    FlatList
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Rs from '../../../assets/images/rs.svg';
import RsCurrency from '../../../assets/images/rsCurrency.svg';
import ShareEarnBg from '../../../assets/images/shareEarnbg.svg';
import Earn from '../../../assets/images/earnRE.svg';
import Attachement from '../../../assets/images/attachmentRE.svg';
import Sharef from '../../../assets/images/shareRE.svg';
import CopyCode from '../../../assets/images/copyCode.svg';
import ShareCode from '../../../assets/images/shareCode.svg';
import translate from "../../../utils/Text"
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import appConfig from '../../../config/app-config';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
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
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const referralCode = useSelector((state) => state?.referralReducer?.getreferralCode?.length > 0 ?
        state?.referralReducer?.getreferralCode[0]?.data[0]?.code : '-') || '-';
    const [fetureArr, setFeatureArr] = useState([
        { key: '1', icon: <Sharef width={51} height={51} />, title: 'Share this app with your community of cancer patients' },
        { key: '2', icon: <Attachement width={51} height={51} />, title: 'Patients, caregivers & healthcare professionals join the App' },
        { key: '3', icon: <Earn width={51} height={51} />, title: 'You both earn \u20B9 200 in Zen Points that can be redeemed at the Zen Store' },
    ])

    const renderFeatureItem = ({ item, index }) => {
        return (
            <View style={styles.earningItemContainer} >
                {item.icon}
                <Text style={styles.earningItemTitleText}  >{item.title}</Text>
            </View>
        );
    }

    useEffect(() => {
        getReferralCode();
    }, [])

    const getReferralCode = () => {
        props.actions.getReferralCode(actionTypes.GET_REFERRAL_CODE, {
            module: 'referral_apply',
            action: `get_referral_codes?userId=${userId}`,
            formData: {}
        });
    }

    const shareCode = () => {
        let message = `I came across the Zenonco Care App. It helps in better treatment planning, connecting with the right oncologists, survivors and caregivers of same cancer type, generating an Anti Cancer Diet Plan, suggests tips to manage side effects & symptoms, and a lot more. You should definitely install this on your phone. You can use the Referral Code: ${referralCode} while registering.\n\niOS: ${appConfig.APP_STORE} \nAndroid: ${appConfig.PLAY_STORE}`
        try {
            const result = Share.share({
                message: message,
            });
        } catch (error) {
        }
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.SECONDARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.SECONDARY} />
            </View>
            <View style={styles.headerVw}>
                <AppHeader
                    theme={theme}
                    onBackPress={() => props.navigation.pop()}
                    headerTitle={''}
                    isWhite={true}
                    isRightComponent={false}
                />
                <View style={styles.bgImage} >
                    <ShareEarnBg />
                </View>
            </View>

            <View style={{ marginTop: -115 }} >

                <Text style={styles.headerTxt} numberOfLines={2} >{translate("ZENCOINS")["EARN_DESCRIPTION"]}</Text>
                <View style={styles.pointsContainer} >
                    <Rs width={51} height={51} />
                    <Text style={styles.pointText} numberOfLines={1} >{`Each \u20B9 200 earn`}</Text>
                </View>
            </View>
            <ScrollView bounces={false} style={styles.scrollviewStyle} showsVerticalScrollIndicator={false} >
                <View style={styles.codeContainer} >
                    <View style={styles.codeVw} >
                        <Text style={styles.codeText} numberOfLines={1} >{referralCode}</Text>
                        <View style={styles.codeUtilityVw} >
                            <Pressable style={[styles.utilityVw, { marginRight: 5 }]} onPress={() => {
                                Clipboard.setString(referralCode)
                                Toast.show({
                                    // type: 'error',
                                    text1: 'Success',
                                    text2: 'Copied to clipboard'
                                });
                            }} >
                                <CopyCode />
                                <Text numberOfLines={1} style={styles.utilityText} >{translate("COMMONTEXT")["COPY"]}</Text>
                            </Pressable>
                            <Pressable style={styles.utilityVw} onPress={() => shareCode()} >
                                <ShareCode />
                                <Text numberOfLines={1} style={styles.utilityText} >{translate("COMMONTEXT")["SHARE"]}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: theme.PRIMARY, paddingTop: 10 }} >
                    {fetureArr.map((item, index) => {
                        return (
                            <View style={styles.earningItemContainer} >
                                {item.icon}
                                <Text style={styles.earningItemTitleText}  >{item.title}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);
