import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    View,
    StatusBar,
    ImageBackground,
    ScrollView,
    Pressable,
    Text,
    FlatList,
    Image
} from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Check from '../../../assets/images/ZHC-Logo.svg'
import translate from '../../../utils/Text'
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
    const { route } = props
    const { params } = route
    const [planArr, setPlanArr] = useState([
        {
            key: '1', icon: require('../../../assets/images/sub_zenbot.png'), planName: 'Zena Bot Plan', planRs: '499', shortDes: 'AI powered plan with 24/7 access',
            features: [
                "Personalized anti-cancer diet plan",
                "Unlimited easy-to-prepare recipes",
                "Unlimited support with chat coach",
                "Immunity-boosting and anti-oxidants",
                "Micronutrient tracking"
            ]
        },
        {
            key: '2', icon: require('../../../assets/images/sub_zencoach.png'), planName: 'Zena Coach Plan', planRs: '2,999', shortDes: 'Dedicated anti cancer diet expert with unlimited support',
            features: [
                "Dedicated anti-cancer diet expert",
                "Anti-cancer supplement counseling",
                "Unlimited support over calls",
                "Personalized anti cancer diet plan",
                "Unlimited easy-to-prepare recipes",
                "Immunity-boosting and anti-oxidants",
                "Micronutrient tracking"
            ]
        },
    ])

    const renderPlanItem = ({ item, index }) => {
        return (
            <View style={styles.planItemContainer} >
                <Text style={styles.planNameText} numberOfLines={1} >{item.planName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <View style={styles.planEstimateVw} >
                        <Text style={styles.planRsText} numberOfLines={1} >{`\u20B9` + item.planRs}</Text>
                        <Text style={styles.planPerTime} numberOfLines={2}>{'per \nmonth'}</Text>
                    </View>
                    <View style={styles.planImagebgVw} >
                        <Image style={styles.planImage} source={item.icon} />
                    </View>
                </View>

                <Text style={styles.planShortDesText} numberOfLines={2} >{item.shortDes}</Text>
                {item.features.map((item, index) => {
                    return (<>
                        {index <= 2 &&
                            <View style={styles.featureItemContainer} >
                                <Check width={12} height={12} />
                                <Text style={styles.featureItemText} numberOfLines={1} >{item}</Text>
                            </View>
                        }</>
                    );
                })}
                <Pressable style={styles.subscribeButtonVw} onPress={() => props.navigation.navigate('Zen.SubscriptionDetail', { item: item, index: index })} >
                    <Text style={styles.subscribeNowText} numberOfLines={1} >{translate("COMMONTEXT")["SUBSCRIBE_NOW"]}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'#f3faff'} />
            <ScrollView style={styles.backgroundVw} bounces={false} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                <ImageBackground style={styles.bgImage} source={require('../../../assets/images/subsciptionbg.png')} >
                    <View style={styles.headerVw}>
                        <AppHeader
                            theme={theme}
                            onBackPress={() => props.navigation.goBack()}
                            headerTitle={''}
                            isRightComponent={false}
                            backgroundColor={'lightgray'}
                            radius={20} />
                    </View>
                </ImageBackground>
                <View style={styles.containerVw}>
                    <Text style={styles.titleText} numberOfLines={1} >{translate("PAYMENT")["PLANS_TITLE"]}</Text>
                    <FlatList
                        data={planArr}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderPlanItem}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
export default withTheme(Layout);