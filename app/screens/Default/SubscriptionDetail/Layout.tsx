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
    Image,
    Dimensions,
    Platform
} from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Carousel from 'react-native-snap-carousel'
import Check from '../../../assets/images/ZHC-Logo.svg'
import PaymentDisplay from '../../../components/RazorPay';
import Alert from '../../../components/AlertScreen/Index';
import { TextField } from '../../../components/Plugins/Textfield/index';
import { FONTFAMILY } from "../../../config/font-config";
import translate from '../../../utils/Text'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import AppHeader from '../../../components/CommonInput/appHeader';
import {initatePayment} from '../../../utils/commonFunction'

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
    const item = params?.item
    const index = params?.index
    const [activeIndex, setActiveIndex] = useState(0);
    const [subscriptionOffer, setSubscriptionOfferShow] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState(-1)
    const [showRazorpay, setShowRazorpay] = useState(false);
    const [status, setStatus] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);
    const [razorPayKey, setRazorPayKey] = useState('');
    const subscriptionPlan = useSelector(state => state.dietPlanReducer?.plan?.length > 0 ? state.dietPlanReducer?.plan[0].data : []) || [];
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const userData = useSelector(state => state.onboardingReducer.userDetails);
    const name = userData?.data?.name;
    const phone = useSelector(state => state.loginReducer.userData?.data?.data?.phone);
    const paymentData = useSelector(state => state.onboardingReducer.paymentData);
    const [title, setTitle] = useState(subscriptionPlan?.length > 0 ? subscriptionPlan[0].name : '')
    const [subscriptionOfferValue, setSubscriptionOfferValue] = useState(subscriptionPlan?.length > 0 ? subscriptionPlan[0]?.service + ' Months @ ' + subscriptionPlan[0]?.monthly_price + '/month' : '')
    const [selecetedItem, setSelectedItem] = useState(subscriptionPlan?.length > 0 ? subscriptionPlan[0] : {});


    useEffect(() => {
        getSubscriptionPlan()
    }, [])

    //Api call
    const getSubscriptionPlan = () => {
        var request = {
            module: "subscriptionPlan",
            action: "getall",
            formData: {
                category: item?.key
            }
        }
        props.actions.subscription(actionTypes.SUBSCRIPTION_PLAN, request)
    }

    //Helper Methods
    const onClick = (item) => {
        let amount = item?.monthly_price
        initatePayment(userId, item != null ? true : false, amount,props.actions, setRazorPayKey, setShowRazorpay)
    };

    const renderItem = ({ item, index }) => {
        const per = (1 - (item?.monthly_price / item?.cross_price) * 100)
        return (
            <View style={[styles.offerItemContainer, activeIndex == index && styles.extraDropShadow]} >
                <View style={styles.offerDescVw} >
                    <Text style={styles.disRsText} >{`\u20B9 ` + item?.cross_price}</Text>
                    <View style={styles.perMonthVw} >
                        <Text style={styles.rsText} >{`\u20B9` + item?.monthly_price}</Text>
                        <Text style={styles.planPerTime} numberOfLines={2}>{'per \nmonth'}</Text>
                    </View>
                    <View style={styles.perMonthOff} >
                        <Text style={styles.totalYear} >{item?.service} {translate("COMMONTEXT")["MONTHS"]}</Text>
                        <Text style={[styles.totalYear, { color: theme.SECONDARY }]}> {Math.abs(Math.round(per))}{translate("COMMONTEXT")["PER_OFF"]}</Text>
                    </View>
                </View>
                <Pressable style={[styles.subscribeOffer, activeIndex == index && { backgroundColor: theme.SECONDARY }]} onPress={() => {
                    onClick(item)
                }}>
                    <Text style={[styles.subscribeNowText, { fontSize: 12 }]} >{translate("COMMONTEXT")["SUBSCRIBE_NOW"]}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'#f3faff'} />
            {showRazorpay ? (
                <PaymentDisplay
                    navigation={props.navigation}
                    name={name}
                    setError={setError}
                    userId={userId}
                    subId={true}
                    phone={phone}
                    razorPayKey={razorPayKey}
                    actions={props.actions}
                    payInfo={paymentData[0]?.data}
                    setShowRazorpay={setShowRazorpay}
                    setStatus={setStatus}
                    setShowAlert={setShowAlert}
                    fromProduct={false}
                    onSuccess={() => { }}
                />
            ) : (
                <View></View>
            )}
            <ScrollView style={styles.backgroundVw} bounces={false} showsVerticalScrollIndicator={false}>
                <ImageBackground style={styles.bgImage} source={index == 0 ? require('../../../assets/images/subscriptionbg1.png') : require('../../../assets/images/subscriptionbg2.png')} >
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
                <View style={styles.userImageView} >
                    <Image style={styles.userPlanImage} source={item?.icon} />
                </View>
                <View style={styles.containerVw}>
                    <View style={styles.userBasicInfoVw} >
                        <Text style={styles.planNameText} numberOfLines={1} >{item?.planName}</Text>
                        <Text style={styles.planShortDesText} numberOfLines={2} >{title}</Text>

                    </View>
                    <View style={styles.carouselVw} >
                        <Carousel
                            layout={"default"}
                            data={subscriptionPlan}
                            renderItem={renderItem}
                            inactiveSlideScale={0.98}
                            inactiveSlideOpacity={0.8}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width - 150}
                            activeSlideAlignment={'center'}
                            activeAnimationType={'spring'}
                            onSnapToItem={(index) => {
                                setTitle(subscriptionPlan[index].name)
                                let item1 = subscriptionPlan[index]
                                setSelectedItem(item1)
                                setSubscriptionOfferValue(item1?.service + ' Months @ ' + item1.monthly_price + '/month')
                                setActiveIndex(index)
                                setSelectedCardId(index)
                            }}
                            activeAnimationOptions={{
                                bounciness: 1,
                                speed: 10
                            }} />
                    </View>
                    <View style={{ backgroundColor: theme.PRIMARY }} >
                        <Text style={styles.benifitTitle} numberOfLines={1} >{'Benefits of the ' + item?.planName}</Text>
                        {item?.features.map((item, index) => {
                            return (
                                <View style={styles.featureItemContainer} >
                                    <Check width={12} height={12} />
                                    <Text style={styles.featureItemText} numberOfLines={1} >{item}</Text>
                                </View>
                            );
                        })}
                        <Text style={styles.benifitTitle} numberOfLines={1} >{translate("ZENCOINS")["ZEN_SUCCESS_STORY"]}</Text>
                        <View style={{ height: 150, marginTop: 5, alignItems: 'center' }}>
                            <Image style={[styles.successImage]} source={require('../../../assets/images/sub_success.png')} />
                        </View>
                        <Pressable style={{ paddingHorizontal: 20 }} onPress={() => setSubscriptionOfferShow(!subscriptionOffer)}>
                            <TextField
                                // label={translate("ONBOARDING")["CITY_AFTER"]}
                                labelHeight={0}
                                disabled={false}
                                lineWidth={1}
                                fontSize={15}
                                value={subscriptionOfferValue}
                                placeholder={translate("ZENCOINS")["SUBSCRIPTION_OFFER"]}
                                // labelTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR, fontSize:14, marginLeft: '-15%', marginRight: '15%' }}
                                titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR, }}
                                affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                                iconName={"keyboard-arrow-down"}
                                iconType={"MaterialIcons"}
                                iconStyle={styles.iconStyle}
                                textColor={theme.WHITE}
                                baseColor={theme.GRAY_BLACK}
                                tintColor={theme.SILVER}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                editable={false}
                                containerStyle={[styles.txtContainer, Platform.OS === 'android' && { paddingTop: 10 }]} />
                        </Pressable>
                        {subscriptionOffer &&
                            <View style={[styles.dropOfferView, styles.extraDropShadow]} >
                                {subscriptionPlan.map((item, index) => {
                                    return (
                                        <Pressable style={[styles.selectCard, { backgroundColor: index == selectedCardId ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]} onPress={() => {
                                            setSubscriptionOfferValue(item?.service + ' Months @ ' + item?.monthly_price + '/month')
                                            setSubscriptionOfferShow(false)
                                            setSelectedCardId(index)
                                            setSelectedItem(item)
                                        }}>
                                            <Text numberOfLines={1} >{item?.service + ' Months @ ' + item?.monthly_price + '/month'}</Text>
                                        </Pressable>
                                    )
                                })}
                            </View>
                        }
                        <Pressable style={styles.subscribeButtonVw} onPress={() => { onClick(selecetedItem) }} >
                            <Text style={styles.subscribeNowText} numberOfLines={1} >{translate("COMMONTEXT")["SUBSCRIBE_NOW"]}</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <Alert
                show={showAlert}
                // showProgress={false}
                title={error ? 'Sorry' : 'Success'}
                message={status}
                closeOnTouchOutside={{ setShowAlert: setShowAlert }}
                closeOnHardwareBackPress={true}
                // showCancelButton={ }
                showConfirmButton={true}
                // cancelText={ }
                confirmText={'ok'}
                // customView={ }
                onConfirmPressed={() => {
                    setShowAlert(false);
                    if (!error) {
                        props.actions.loggedIn(
                            'loginStatus',
                            true,
                            actionTypes.LOGIN_STATUS,
                        );
                    }
                }}
            />
        </View>
    );
};
export default withTheme(Layout);