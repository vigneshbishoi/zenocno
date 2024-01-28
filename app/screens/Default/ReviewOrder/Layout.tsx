/**
 * ReviewOrder Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Review Order 
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  Text,
  ScrollView,
  Image,
  UIManager,
  LayoutAnimation,
  TextInput,
  Modal,
  Dimensions
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import ProductCartItem from '../../../components/Ecommerce/ProductCartItem';
import CartitemTab from '../../../components/Ecommerce/cartItemTab';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import PaymentDisplay from '../../../components/RazorPay';
import AppLoader from '../../../components/Plugins/AppLoader';
import { numberWithCommas } from '../../../utils/commonFunction';
import Icon from 'react-native-vector-icons/Ionicons';
import { savePostRequest, sendGetRequest } from '../../../services/ecommerce'
import Toast from 'react-native-toast-message';
import Track from '../../../assets/images/zencoins.svg'
import { Slider } from "@rneui/themed";
import { round } from 'lodash';
import translate from '../../../utils/Text'
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
  const customerId = props.route.params?.customer_id
  const selectAddress = props.route.params?.selectAddress
  const paymentData = useSelector(state => state.onboardingReducer?.paymentData);
  const cartData =
    useSelector((state) => state.ecommerceReducer?.cartData?.length > 0 ?
      state.ecommerceReducer.cartData : []) || [];
  const orderData =
    useSelector((state) => state.ecommerceReducer?.orderDetail?.length > 0 ?
      state.ecommerceReducer.orderDetail[0] : []) || [];
  const customerData = useSelector((state) => state.ecommerceReducer?.customerData?.length > 0 ? state.ecommerceReducer.customerData[0] : {});
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  const getCartData =
    useSelector((state) => state.ecommerceReducer?.getCart?.length > 0 ?
      state.ecommerceReducer.getCart[0].data : []) || [];
  const referralCoin = useSelector((state) => state?.referralReducer?.getreferralCoin?.length > 0 ?
    state?.referralReducer?.getreferralCoin[0]?.points : '0') || '0';
  const [reloadpage, setReloadpage] = useState(false);
  let [totalAmount, setTotalAmount] = useState(0);
  let [razorPayData, setRazorPayData] = useState({});
  const [paymentMethodArr, setPaymentMethodArr] = useState([
    { key: '1', image: require('../../../assets/images/credit.png'), payType: 'Credit or Debit card', isSel: false },
    { key: '2', image: require('../../../assets/images/internetBanking.png'), payType: 'Internet Banking', isSel: false },
  ])
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(paymentMethodArr);
  const [orderExpanded, setOrderExpanded] = useState(true)
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(true);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [status, setStatus] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  let [allTotalAmount, setAllTotalAmount] = useState(0);
  let [mainTotalAmount, setMainTotalAmount] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [useCouponExpanded, setUseCouponExpanded] = useState(false)
  const [useRedeemExpanded, setUseRedeemExpanded] = useState(true)
  const [reedemCoins, setReedemCoins] = useState(0)
  const [isCouponApplied, setIsCouponApplied] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [redeemValue, setRedeemValue] = useState(0)
  const [couponAmount, setCouponAmount] = useState(0);
  const [isReedem, setReedem] = useState(false);
  const [razorPayKey, setRazorPayKey] = useState('');

  // console.log("orderData data", orderData)

  useEffect(() => {
    //fetchShippingDetail()
    getReferralCoin()
    getCartDetails()
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (getCartData.length > 0) {
      let total = 0, alltotal = 0
      getCartData.map(item => {
        total = total + (parseInt(item?.product_item?.reguler_price) * parseInt(item.qunatity))
        alltotal = alltotal + (parseInt(item?.product_item?.price) * parseInt(item.qunatity))
        //console.log("total-------" ,total,alltotal)
      })
      //console.log("total-------" ,total,alltotal)
      //console.log("alltotal ", getCartData)
      setTotalAmount(total)
      setAllTotalAmount(alltotal)
      setMainTotalAmount(alltotal)

    }
  }, [])
  useEffect(() => {
    setIsLoader(false)
    if (orderData?.data != undefined && isOrder) {
      setIsOrder(false)
      console.log("order data ------------ ", orderData)
      props.navigation.navigate('Zen.ReceivedOrder', {
        data: orderData?.data,
        customerId: userId
      })
      props.actions.addToCart("cartData", [], actionTypes.ADD_CART);
      //   props.actions.createOrderServer(actionTypes.CREATE_ORDER_SERVER, {
      //   module: 'woocommerce_order',
      //   action: 'create',
      //   formData: {
      //     userId: userId,
      //     customer_id: userId,
      //     order_amount: allTotalAmount,
      //     woocommerce_order_id: orderData.id,
      //     razorpay_order_id: razorPayData.razorpay_order_id,
      //     razorpay_payment_id: razorPayData.razorpay_payment_id,
      //     razorpay_signature: razorPayData.razorpay_signature
      //   }
      // })
    }
  }, [orderData])

  useEffect(() => {
    let total = 0, alltotal = 0
    getCartData.map(item => {
      total = total + (parseInt(item?.product_item?.reguler_price) * parseInt(item.qunatity))
      alltotal = alltotal + (parseInt(item?.product_item?.price) * parseInt(item.qunatity))
    })
    setTotalAmount(total)
    setAllTotalAmount(alltotal)
    setMainTotalAmount(alltotal)
    setReloadpage(false)
    setIsLoader(false)
  }, [getCartData])
  const getCartDetails = () => {
    props.actions.getCart(actionTypes.GET_CART, {
      module: 'cart_data',
      action: "getByCustomerId",
      formData: {
        customer_id: userId
      }
    });
  }
  const getReferralCoin = () => {
    props.actions.getReferralCoin(actionTypes.GET_REFERRAL_COIN, {
      module: 'product_item',
      action: `get_points_redeemed?userId=${userId}`,
      formData: {}
    });
  }
  const applyCoupon = async () => {
    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('coupon', coupon);
    params.append('cart_value', allTotalAmount + "");
    //console.log("search data", params)

    let payload = {
      module: 'product_item',
      action: 'apply_coupon',
    };

    const response = await savePostRequest(params, payload)
    if (response.status == 0) {
      setIsCouponApplied(2)//coupon invalid
      setBtnDisable(false)
    } else if (response.status == 1) {
      setIsCouponApplied(1)
      setCouponAmount(response.discount)
      setMainTotalAmount(mainTotalAmount - response.discount)
      setBtnDisable(true)
    }
    console.log("search data", response)
  }
  const getRedeemPoints = async () => {
    let payload = {
      module: 'product_item',
      action: "points_redeemed",
    }
    let data = {
      userId: userData?.userId,
    }
    const response = await sendGetRequest(data, payload);
    if (response.status == 0) {
      //setIsCouponApplied(2)//coupon invalid
    }
    console.log("getRedeemPoints", response)
  }


  const changeOrderLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOrderExpanded(!orderExpanded);
  }
  const changeUseCouponLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUseCouponExpanded(!useCouponExpanded);
  }
  const changeUseRedeemLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let countCoins = (20 / 100) * mainTotalAmount
    let countCoins1 = Math.round(countCoins)
    let referalCoin1 = referralCoin != null ? referralCoin : 0
    setReedemCoins(countCoins1 > referalCoin1 ? referalCoin1 : countCoins1)
    if (useRedeemExpanded) {
      console.log("open model")
      setUseRedeemExpanded(false);
      setModalVisible(true)
    }
  }
  const increment = (item) => {
    let qunatity = item.qunatity + 1
    //setTotalAmount(totalAmount + parseInt(item.price))
    //setAllTotalAmount(allTotalAmount + parseInt(item.reguler_price))
    //setReloadpage(true)
    updateCartData(item, qunatity)
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  }
  const decrement = (item) => {
    let qunatity = item.qunatity
    if (item.qunatity > 1) {
      qunatity = item.qunatity - 1
      // setReloadpage(true)
      updateCartData(item, qunatity)
    }
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  }

  const updateCartData = (item, qunatity) => {
    let total = parseInt(item?.product_item?.price) * parseInt(qunatity)
    let obj = {
      id: item.id,
      customer_id: userId,
      product_id: item.product_id,
      product_name: item.product_name ? item.product_name : item?.image,
      image: item ? item.image : '',
      qunatity: qunatity,
      price: item?.product_item?.price,
      reguler_price: item?.product_item?.reguler_price,
      sale_price: item?.product_item?.price,
      total_price: total
    }
    setIsLoader(false)
    props.actions.updateCart(actionTypes.UPDATE_CART, {
      module: 'cart_data',
      action: 'update_cart',
      formData: obj
    });
    setTimeout(() => {
      getCartDetails()
    }, 2000);
  }

  const removeItemFromCart = (item) => {
    // let filterData = cartData.filter(itemA => itemA.id != item.id)
    // props.actions.addToCart("cartData", filterData, actionTypes.ADD_CART);
    // console.log("filter-----",filterData)
    //  setTotalAmount(totalAmount - (parseInt(item.price) * parseInt(item.qunatity)))
    // setAllTotalAmount(allTotalAmount - (parseInt(item.reguler_price) * parseInt(item.qunatity)))
    //setReloadpage(true)
    setIsLoader(true)
    props.actions.deleteCart(actionTypes.DELETE_CART, {
      module: 'cart_data',
      action: 'remove?id=' + item.id,
      // formData: obj
    });
    setTimeout(() => {
      getCartDetails()
    }, 2000);
  }
  const RenderPaymentMethd = ({ item, index }) => {
    return (
      <View style={[styles.allDescView, { alignItems: 'center', paddingVertical: 5 }]}>
        <Image style={[styles.paymentUnselectIcon]} source={item.image} />
        <Text style={[styles.paymentText, { marginLeft: 10 }]} numberOfLines={1}>{item.payType}</Text>
        <Pressable style={[styles.unSelectPaymentView, selectPaymentMethod === item && styles.editSelectView]} onPress={() => setSelectPaymentMethod(item)} >
          {selectPaymentMethod === item &&
            <Image style={styles.editSelectIcon} source={require('../../../assets/images/tick.png')} />
          }
        </Pressable>
      </View>
    );
  }
  const onPaymentClick = () => {
    let amount = mainTotalAmount
      initatePayment(userId, selected, amount,props.actions, setRazorPayKey, setShowRazorpay)
    var inputRequest = {
      module: 'payment',
      action: 'initiatePay',
      formData: {
        userId: userId,
        subscriptionPlanId: selected,
        amount: mainTotalAmount,
        currency: 'INR',
      },
    };
    if (selected) {
      props.actions
        .callPayment(actionTypes.GET_PAYMENT, inputRequest)
        .then(data => {
          setShowRazorpay(true);
        });
    }
  };
  const createOrder = (data) => {
    console.log("razorPay data", data)
    let arr = []
    cartData.map(item => {
      let obj = {
        product_id: item.id,
        quantity: item.qty
      }
      arr.push(obj)
    })
    // const obj = {
    //   set_paid: true,
    //   customer_id: 1,
    //   billing: {
    //     first_name: selectAddress.firstname,
    //     last_name: selectAddress.lastname,
    //     address_1: selectAddress.address,
    //     city: selectAddress.city,
    //     state: selectAddress.state,
    //     postcode: selectAddress.pincode,
    //     country: selectAddress.country,
    //     email: selectAddress.email,
    //     phone: selectAddress.phoneNumber
    //   },
    //   shipping: {
    //     first_name: selectAddress.firstname,
    //     last_name: selectAddress.lastname,
    //     address_1: selectAddress.address,
    //     city: selectAddress.city,
    //     state: selectAddress.state,
    //     postcode: selectAddress.pincode,
    //     country: selectAddress.country,
    //   },
    //   line_items: arr,
    //   shipping_lines: [{
    //     method_id: "flat_rate",
    //     method_title: "Flat Rate",
    //     total: allTotalAmount.toString()
    //   }]
    // }
    const obj = {
      additionalInfo: "only for",
      addressId: selectAddress?.id,
      payment_id: data.razorpay_payment_id,
      entity: "payment",
      amount: mainTotalAmount,
      currency: "INR",
      status: 1,
      //method: "card",
      order_id: data.razorpay_order_id,
      captured: 1,
      //email: "abc@yopmail.com",
      contact_no: selectAddress?.numberShipTo,
      error_code: "ss",
      sub_total: totalAmount
    }
    if (isCouponApplied == 1) {
      obj.cash = couponAmount
      obj.coupon = coupon
    }
    if (isReedem) {
      obj.points = redeemValue
    }
    setIsLoader(true)
    // props.actions.createOrder(actionTypes.CREATE_ORDER, {
    //   module: 'orders',
    //   action: '',
    //   formData: obj
    // })
    setIsOrder(true)
    props.actions.createOrder(actionTypes.CREATE_ORDER, {
      module: 'product_order',
      action: 'create-products-order',
      formData: obj
    })
  }

  const fetchShippingDetail = () => {
    props.actions.fetchCustomer(actionTypes.FETCH_CUSTOMER, {
      module: 'customers',
      action: customerId,
      formData: {}
    })
  }

  const showRedeemModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setUseRedeemExpanded(true);
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.closeVw} onPress={() => {
                setUseRedeemExpanded(true);
                setModalVisible(!modalVisible);
              }} >
                <Image source={require('../../../assets/images/close.png')} style={styles.closeImage} />
              </Pressable>
              <Image source={require('../../../assets/images/zenredeem.png')} style={styles.redeemImage} />
              <Text style={styles.modalTitle} numberOfLines={1} >{reedemCoins > 0 ? redeemValue : 0}</Text>
              <Text style={styles.modalText} numberOfLines={2} >{translate("ORDER")["REDEEM_CARTPOINTS"]}</Text>
              <View style={{ width: Dimensions.get('window').width - 150, marginVertical: 10 }}>
                {reedemCoins > 0 &&
                  <Slider
                    value={redeemValue}
                    onValueChange={(value) => setRedeemValue(Math.round(value))}
                    maximumValue={reedemCoins}
                    minimumValue={0}
                    minimumTrackTintColor={'#fabe2c'}
                    maximumTrackTintColor={'#e8e8e8'}
                    step={1}
                    allowTouchTrack
                    trackStyle={styles.sliderTracker}
                    thumbStyle={styles.sliderThum}
                    thumbProps={{
                      children: (
                        <View style={styles.sliderMainView}>
                          <Track width={25} height={25} />
                        </View>
                      ),
                    }}
                  />}
                {reedemCoins > 0 &&
                  <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center' }} >
                    <Text style={styles.scoreText} >0</Text>
                    <Text style={[styles.scoreText, { position: 'absolute', right: 0 }]} >{reedemCoins}</Text>
                  </View>}
              </View>
              {reedemCoins > 0 &&
                <Text style={styles.modalSubText} numberOfLines={1} >{translate("ORDER")["DISCOUNT_SLIDER"]}</Text>}
              <Pressable
                style={styles.button}
                onPress={() => {
                  setUseRedeemExpanded(true), setModalVisible(!modalVisible), setReedem(true)
                  setMainTotalAmount(mainTotalAmount - redeemValue)
                }}>
                <Text style={styles.textStyle}>{translate("ORDER")["REDEEM"]}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={translate("DRAWER")["REVIEW"]}
        isRightComponent={false} />
      <CartitemTab
        index={1} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.checkoutContainer}>
          <Text style={styles.orderedUserName} numberOfLines={1}>{selectAddress?.nameShipTo} {selectAddress?.lastname}</Text>
          {/* <Text style={styles.allDescText}></Text> */}
          <Text style={styles.allDescText}>{selectAddress?.address} {selectAddress?.city} {selectAddress?.state} {selectAddress?.country} {selectAddress?.pin_code}</Text>
          <Text style={[styles.orderedUserName, { fontSize: 12 }]} numberOfLines={1}>Mobile: +91 {selectAddress?.numberShipTo}</Text>
          <Pressable style={styles.changeAddressVw} onPress={() => {
            props.navigation.navigate('Zen.Checkout', {
              isFromEdit: true,
              //callApi: fetchShippingDetail
            })
          }}>
            <Text style={styles.changeAddText}>{translate("ORDER")["CHANGE_ADDRESS"]}</Text>
          </Pressable>
          <View style={styles.orderSummaryVw}>
            <Text style={styles.headerTxt}>{translate("ORDER")["ORDER_SUMMARY"]}</Text>
            <Pressable style={styles.downPressable} onPress={changeOrderLayout}>
              <Image style={styles.downIcon} source={require('../../../assets/images/downArrow.png')} />
            </Pressable>
          </View>
          <View style={{ height: orderExpanded ? null : 0, overflow: 'hidden' }}>
            {getCartData.map((item, index) => (
              <ProductCartItem
                key={item.id}
                item={item}
                index={index} theme={theme}
                increment={increment}
                decrement={decrement}
                removeItemFromCart={removeItemFromCart}
                isRemove={false}
              />
            ))}
          </View>
          {/* <Text style={[styles.orderedUserName, { marginTop: 10 }]}>Payment Method</Text> */}
          {/* {paymentMethodArr.map((item, index) => (
            <RenderPaymentMethd
              item={item}
              index={index} />
          ))} */}
        </View>
      </ScrollView>

      <View style={[styles.checkoutContainer, { paddingHorizontal: 20 }]}>
        <View style={styles.priseContainer}>
          {/* <Text style={styles.totalCountItems} numberOfLines={1}>Subtotal({getCartData.length} items)</Text> */}
          <Text style={styles.totalCountItems} numberOfLines={1}>{`${translate("COMMONTEXT")["SUBTOTAL"]}(${getCartData.length + " " + translate("COMMONTEXT")["ITEMS"]})`}</Text>
          <Text style={styles.totalPriseCon} numberOfLines={1} >
            <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(totalAmount)}</Text>
          </Text>
        </View>

        <View style={styles.priseContainer}>
          <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["SHIPPING"]}</Text>
          <Text style={styles.totalPrice} numberOfLines={1} >{translate("COMMONTEXT")["FREE"]}</Text>
        </View>

        <View style={styles.priseContainer}>
          <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["DISCOUNT"]}</Text>
          <Text style={styles.totalPriseCon} numberOfLines={1} >
            -<Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(totalAmount - allTotalAmount)}</Text>
          </Text>
        </View>
        {isCouponApplied == 1 &&
          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>{translate("ORDER")["DIS_COUPON"]}</Text>
            <Text style={styles.totalPriseCon} numberOfLines={1} >
              -<Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
              <Text style={styles.totalPrise}>{numberWithCommas(couponAmount)}</Text>
            </Text>
          </View>}
        {isReedem &&
          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>{translate("ORDER")["POINTS"]}</Text>
            <Text style={styles.totalPriseCon} numberOfLines={1} >
              -<Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
              <Text style={styles.totalPrise}>{numberWithCommas(redeemValue)}</Text>
            </Text>
          </View>}
      </View>


      <View style={[styles.priseContainer, { backgroundColor: theme.SECONDARY_OPACITY, paddingHorizontal: 20 }]}>
        <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["TOTAL"]}</Text>
        <Text style={[styles.totalPriseCon, { right: 20 }]} numberOfLines={1} >
          <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
          <Text style={styles.totalPrise}>{numberWithCommas(mainTotalAmount)}</Text>
        </Text>
      </View>

      <View style={styles.couponContainer}>
        <Pressable onPress={changeUseCouponLayout}>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
            <Icon name="add" color={'#333333'} size={15} />
            <Text style={styles.couponText} numberOfLines={1}>{translate("ORDER")["APPLY_COUPON"]}</Text>
          </View>
        </Pressable>
        <View style={{ height: useCouponExpanded ? null : 0, overflow: 'hidden' }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder='ASX23N' onChangeText={(value) => { setCoupon(value), setIsCouponApplied(0), setBtnDisable(false) }} value={coupon} />
            <Pressable style={styles.redeemBtn} disabled={btnDisable} onPress={() => applyCoupon()}>
              <Text style={styles.redeemText}>{translate("COMMONTEXT")["APPLY"]}</Text>
            </Pressable>
          </View>
          {isCouponApplied == 1 ?
            <View style={styles.appliedcouponVw}>
              <View style={styles.appliedCouponTextVw}>
                <Text style={[styles.responseText, { color: '#44B962' }]}>{translate("ORDER")["CONGRATULATIONS"]}</Text>
                <Text style={[styles.responseText, { fontSize: 11 }]}>{translate("ORDER")["COUPON_APPLIED"]} <Text style={[styles.responseText, { color: 'black', fontSize: 11 }]}>{coupon}({'\u20B9'} {couponAmount})</Text></Text>
              </View>
              <Pressable style={styles.removeBtn} onPress={() => { setBtnDisable(false), setCoupon(''), setIsCouponApplied(0), setMainTotalAmount(mainTotalAmount + couponAmount) }}>
                <Text style={styles.redeemText}>{translate("COMMONTEXT")["REMOVE"]}</Text>
              </Pressable>
            </View>
            : isCouponApplied == 2 &&
            <View style={styles.appliedcouponVw}>
              <View style={styles.appliedCouponTextVw}>
                <Text style={[styles.responseText, { color: "#C3301C" }]}>{translate("ORDER")["EXPIRED_COUPON"]}</Text>
              </View>
            </View>
          }
        </View>
      </View>

      <View style={styles.couponContainer}>
        <Pressable onPress={changeUseRedeemLayout}>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
            <Icon name="add" color={'#333333'} size={15} />
            <Text style={styles.couponText} numberOfLines={1}>{translate("ORDER")["REDEEM_POINTS"]}</Text>
          </View>
        </Pressable>
        {isReedem &&
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <View style={{ flexDirection: "column", marginVertical: 2, justifyContent: "space-between" }}>
              {redeemValue > 0 &&
                <Text style={[styles.responseText, { color: '#44B962' }]}>{translate("ORDER")["CONGRATULATIONS"]}</Text>}
              <Text style={[styles.responseText, { fontSize: 11 }]}>{translate("ORDER")["POINTS_REEDEM_APPLIED"]} <Text style={[styles.responseText, { color: 'black', fontSize: 11 }]}>({'\u20B9'} {redeemValue})</Text></Text>
            </View>
            <Pressable style={styles.removeBtn} onPress={() => { setRedeemValue(0), setReedem(false), setMainTotalAmount(mainTotalAmount + redeemValue) }}>
              <Text style={styles.redeemText}>{translate("COMMONTEXT")["REMOVE"]}</Text>
            </Pressable>
          </View>}
      </View>

      <Pressable style={styles.checkoutButton} onPress={() => {
        onPaymentClick()
      }} >
        <Text style={styles.checkoutText} >{translate("ORDER")["PLACE_ORDER"]}</Text>
      </Pressable>
      {showRazorpay &&
        <PaymentDisplay
          navigation={props.navigation}
          name={userData?.data.name}
          setError={setError}
          userId={userId}
          subId={selected}
          phone={selectAddress?.numberShipTo}
          actions={props.actions}
          razorPayKey={razorPayKey}
          payInfo={paymentData[0]?.data}
          setShowRazorpay={setShowRazorpay}
          setStatus={setStatus}
          setShowAlert={setShowAlert}
          fromProduct={true}
          onSuccess={(data) => {
            setRazorPayData(data)
            createOrder(data)
          }}
        />}
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
      {modalVisible && showRedeemModal()}
    </SafeAreaView>
  );
};
export default withTheme(Layout);