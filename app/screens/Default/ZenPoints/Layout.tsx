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
    Share
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/backWhite.svg'
import Rs from '../../../assets/images/rs.svg'
import translate from "../../../utils/Text"
import Doctor from '../../../assets/images/doctorPoints.svg';
import Medizen from '../../../assets/images/medizenPoints.svg';
import Right from '../../../assets/images/rightPoints.svg';
import Sharepoints from '../../../assets/images/sharePoint.svg';
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import appConfig from '../../../config/app-config';
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
    const userId = useSelector((state) => state?.loginReducer?.userData?.data?.data?.id);
    const referralCoin = useSelector((state) => state?.referralReducer?.getreferralCoin?.length > 0 ?
        state?.referralReducer?.getreferralCoin[0]?.points : '0') || '0';

    const referralCode = useSelector((state) => state?.referralReducer?.getreferralCoin?.length > 0 ?
        state?.referralReducer?.getreferralCoin[0]?.referal_code?.length > 0 ?
            state?.referralReducer?.getreferralCoin[0]?.referal_code[0]?.code : '0' : '0') || '10';

    const [earnArr, setEarnArr] = useState([
        { key: '1', icon: <Sharepoints width={51} height={51} />, title: 'Refer & earn', details: 'Share this App with your community of cancer patients', points: 200 },
        { key: '2', icon: <Right width={51} height={51} />, title: 'Daily streaks', details: 'Complete all activities on a daily basis ', points: 100 },
    ])

    const onPressEarnItem = (index) => {
        if (index == 0) {
            let message = `I came across the Zenonco Care App. It helps in better treatment planning, connecting with the right oncologists, survivors and caregivers of same cancer type, generating an Anti Cancer Diet Plan, suggests tips to manage side effects & symptoms, and a lot more. You should definitely install this on your phone. You can use the Referral Code: ${referralCode} while registering.\n\nIos: ${appConfig.APP_STORE} \nAndroid: ${appConfig.PLAY_STORE}`
            try {
                const result = Share.share({
                    message: message,
                });
            } catch (error) {
            }
        } else {

        }
    }

    useEffect(() => {
        getReferralCoin();
    }, [])

    const getReferralCoin = () => {
        props.actions.getReferralCoin(actionTypes.GET_REFERRAL_COIN, {
            module: 'product_item',
            action: `get_points_redeemed?userId=${userId}`,
            formData: {}
        });
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
            </View>
            <View style={{ marginTop: -85 }} >
                <Text style={styles.headerTxt} numberOfLines={1} >{translate("ZENCOINS")["WELCOME_ZEN_POINTS"]}</Text>
                <View style={styles.pointsContainer} >
                    <Rs width={51} height={51} />
                    <Text style={styles.pointText} numberOfLines={1} >{translate("ZENCOINS")["POINTS"]}</Text>
                    <Text style={styles.totalPoints} numberOfLines={1} >{`\u20B9 ` + referralCoin == null ? 0 : referralCoin}</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={styles.earnTitle} numberOfLines={1} >{translate("ZENCOINS")["HOW_EARN"]}</Text>
                    {earnArr.map((item, index) => {
                        return (
                            <Pressable style={styles.earningItemContainer} onPress={() => onPressEarnItem(index)} >
                                {item.icon}
                                <View style={styles.earningDesVw} >
                                    <Text style={styles.earningItemTitleText} numberOfLines={1} >{item.title}</Text>
                                    <Text style={[styles.earningItemDetailText, { marginTop: Platform.OS === 'ios' ? 2 : -2 }]}>{item.details}</Text>
                                </View>
                                <Text style={[styles.earningItemTitleText, styles.extra]} >{`\u20B9` + ' ' + item.points}</Text>
                            </Pressable>
                        );
                    })}
                </View>
                <Text style={[styles.earningItemTitleText, styles.extraRedeemTitle]} numberOfLines={1} >{translate("ZENCOINS")["REEDEM_POINTS_ZENSTORE"]}</Text>
                <View style={styles.redeemContainer} >
                    <View style={styles.redeemItemVw} >
                        <Doctor width={45} height={68} />
                        <View style={{ marginLeft: 10 }} >
                            <Text style={styles.earningItemTitleText} numberOfLines={1} >{translate("ZENCOINS")["CONSULT"]}</Text>
                            <Text style={[styles.earningItemDetailText, { marginTop: Platform.OS === 'ios' ? -2 : -5 }]} numberOfLines={1} >{translate("ZENCOINS")["WITH_DOCTORS"]}</Text>
                        </View>
                    </View>
                    <View style={styles.lineVw} />
                    <View style={styles.redeemItemVw} >
                        <Medizen width={41} height={64} />
                        <View style={{ marginLeft: 10 }} >
                            <Text style={styles.earningItemTitleText} numberOfLines={1} >{translate("ZENCOINS")["BUY"]}</Text>
                            <Text style={[styles.earningItemDetailText, { marginTop: Platform.OS === 'ios' ? -2 : -5 }]} numberOfLines={1} >{translate("ZENCOINS")["SUPPLEMENTS"]}</Text>
                        </View>
                    </View>
                </View>
                <Pressable style={styles.redeemNowButton} onPress={() => props.navigation.navigate('Zen.Ecommerce')} >
                    <Text style={styles.redeemNowText} numberOfLines={1} >{translate("ZENCOINS")["REDEEM_NOW"]}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);
