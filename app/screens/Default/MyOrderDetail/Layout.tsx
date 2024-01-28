/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
  ScrollView,
  Image,
  BackHandler
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import actionTypes from '../../../store/actions/types';
import moment from 'moment';
import { numberWithCommas } from '../../../utils/commonFunction';
import { sendGetRequest } from '../../../services/ecommerce'
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppLoader from '../../../components/Plugins/AppLoader';
import translate from '../../../utils/Text'


interface IProps {
  theme: any;
  navigation: any;
  actions: any;
  data: any;
  route: object;
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme;
  const [orderData, setOrderData] = useState(null)
  const [isLoader, setIsLoader] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const getCartData =
    useSelector((state) => state.ecommerceReducer?.getCart?.length > 0 ?
      state.ecommerceReducer.getCart[0]?.data : []) || [];


  const userData = useSelector((state) => state.onboardingReducer.userDetails?.data);

  useEffect(() => {
    setIsLoader(true)
    getOrderList()
    getCartDetails()
  }, [])

  useEffect(() => {
    if (isAdded) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added to cart'
      });
      setIsAdded(false)
    }
    setIsLoader(false)
  }, [getCartData?.length, getCartData]);

  const getOrderList = async () => {
    let payload = {
      module: 'product_item',
      action: "my_order_detail",
    }
    let data = {
      orderId: props.route.params.orderId,
    }
    const response = await sendGetRequest(data, payload);
    if (response?.data) {
      let data = response?.data[0]
      if (data) {
        console.log("data------------",data)
        setOrderData(data)
      }
    }
  }

  const getCartDetails = () => {
    props.actions.getCart(actionTypes.GET_CART, {
      module: 'cart_data',
      action: "getByCustomerId",
      formData: {
        customer_id: userData?.userId,
      }
    });
  }

  const addToCart = (item) => {
    let filterData = getCartData.filter(itemA => itemA.product_id == item.productId)
    if (filterData.length == 0) {
      let obj = {
        customer_id: userData?.userId,
        product_id: item?.product_item?.id,
        image: item?.product_item?.image,
        qunatity: 1,
        price: item?.product_item?.currentSalePrice,
        reguler_price: item?.product_item?.mrp,
        sale_price: item?.product_item?.currentSalePrice,
        total_price: item?.product_item?.currentSalePrice,
        product_name: item?.product_item?.product_name,
      }
      console.log("data",obj)
      props.actions.createCart(actionTypes.CREATE_CART, {
        module: 'cart_data',
        action: 'create',
        formData: obj
      });
      setIsAdded(true)
      setIsLoader(true)
      setTimeout(() => {
        getCartDetails()
      }, 2000);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'This product is already added to cart.'
      });
    }
  }

  const increment = (item: any, index: any) => {
    let qunatity = item.qunatity + 1
    let value = getCartData.findIndex(e => e.product_id === item.product_id)
    console.log("data================",qunatity,item,value)
    getCartData[value].qunatity = qunatity
    //setTotalAmount(totalAmount + parseInt(item.price))
    //setAllTotalAmount(allTotalAmount + parseInt(item.reguler_price))
    //setReloadpage(true)
    updateCartData(item, qunatity, false)
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  }
  const decrement = (item: any) => {
    let qunatity = item.qunatity
    if (item.qunatity > 1) {
      qunatity = item.qunatity - 1
      let value = getCartData.findIndex(e => e.product_id === item.product_id)
      getCartData[value].qunatity = qunatity
      // setReloadpage(true)
      updateCartData(item, qunatity, false)
    }
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  }

  const updateCartData = (item: any, qunatity: any, isloader = true) => {
    let total = parseInt(item?.product_item?.price) * parseInt(qunatity)
    let obj = {
      id: item.id,
      customer_id: userData?.userId,
      product_id: item?.product_id,
      image: item?.image,
      product_name: item?.product_name,
      qunatity: qunatity,
      price: item?.price,
      reguler_price: item?.reguler_price,
      sale_price: item?.sale_price,
      total_price: total
    }
    console.log("data",obj)
    isloader && setIsLoader(true)
    props.actions.updateCart(actionTypes.UPDATE_CART, {
      module: 'cart_data',
      action: 'update_cart',
      formData: obj
    });
    setTimeout(() => {
      getCartDetails()
    }, 2000);
  }


  const checkItemExist = (item) => {
    let value = getCartData.filter(e => e.product_id === item.productId)
    //console.log("value---------",item)
    return value; // true
  }

  console.log("ndkndnfjd---",orderData?.payment?.order_date);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <View style={styles.headerVw}>
        <Pressable onPress={() => {
          props.navigation.goBack()
        }} style={{ position: "absolute", left: 5, padding:15 }}>
          <Back width={8} height={15} />
        </Pressable>
        <Text style={styles.headerTxt}>{translate("CHECKOUT")["ORDER_DETAIL"]}</Text>
        <Pressable onPress={() => { props.navigation.navigate('Zen.Cart'); }} style={{ position: "absolute", right: 20 }}>
          <Image source={require('../../../assets/images/cart.png')} style={styles.cartIcon} />
          <View style={{ backgroundColor: 'red', position: 'absolute', justifyContent: 'center', right: -10, bottom: 12, height: 20, width: 20, borderRadius: 10 }}>
            <Text style={styles.cartText}>{getCartData?.length}</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        {/* <Text style={styles.orderDesText} >{translate("CHECKOUT")["SUCCESS_TRANSACTION"]}</Text>
        <Text style={[styles.orderDesText,{marginBottom:10}]} >{translate("CHECKOUT")["PROCESSING_ORDER"]}</Text> */}
        <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("CHECKOUT")["ORDER_NO"]}</Text>
          <Text style={styles.orderContent} >{orderData?.id}</Text>
        </View>
        <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("COMMONTEXT")["DATE"]}</Text>
          <Text style={styles.orderContent} >{orderData?.payment?.order_date ? moment(orderData?.payment?.order_date).format("DD MMM hh:mm") : ""}</Text>
        </View>
        {/* <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("COMMONTEXT")["EMAIL"]}</Text>
          <Text style={styles.orderContent} >{orderData?.payment?.email ? orderData?.payment?.email : "NA"}</Text>
        </View> */}
        <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("COMMONTEXT")["TOTAL"]}</Text>
          <Text style={styles.orderContent} >{orderData?.payment?.amount}</Text>
        </View>
        {/* <View style={[styles.orderDetails, { borderBottomWidth: 0 }]} >
          <Text style={styles.orderHeader} >{translate("CHECKOUT")["PAYMENT"]}</Text>
          <Text style={styles.orderContent} >{orderData?.payment?.method}</Text>
        </View> */}
        <View style={styles.orderDetailsVw} >
          <Text style={[styles.headerTxt, { marginHorizontal: 20 }]}>{translate("CHECKOUT")["ORDER_DETAIL"]}</Text>
        </View>
        {orderData?.product_order_details?.map((item:any, index:any) =>         
        (
          <View style={[styles.cartItemContainer]}>
            <View style={styles.cartItemVw}>
              <Image source={{ uri: item?.product_item?.image }} style={styles.cartImage} />
              <View style={{ width: '70%', marginLeft: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={styles.titleText} numberOfLines={2}>{item?.product_item?.product_name}</Text>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={[styles.titleText, { color: theme.GRAY_BLACK, }]} numberOfLines={1}>Qty:{item.quantity}</Text>
                  {checkItemExist(item).length > 0 ?
                    // <Pressable style={[styles.addtocartVw, { backgroundColor: theme.SECONDARY }]} onPress={() => props.navigation.navigate('Zen.Cart')}>
                    //   <Text style={[styles.addtocartText, { color: theme.PRIMARY }]} numberOfLines={1}>Go to cart</Text>
                    // </Pressable> :
                    <View style={styles.addRemoveItemContainer}>
                      <Pressable style={[styles.addRemoveItem,
                      { marginRight: 9, marginLeft: 3 }]}
                        onPress={() => decrement(checkItemExist(item)[0], index)}>
                        <Text style={styles.addRemoveText}>-</Text>
                      </Pressable>
                      <Text style={styles.totalItem}>{checkItemExist(item)[0]?.qunatity}</Text>
                      <Pressable
                        style={[styles.addRemoveItem, {
                          marginLeft: 9,
                          marginRight: 3
                        }]}
                        onPress={() => increment(checkItemExist(item)[0], index)}>
                        <Text style={styles.addRemoveText}>+</Text>
                      </Pressable>
                    </View> :
                    <Pressable style={styles.addtocartVw} onPress={() => addToCart(item)}>
                      <Text style={styles.addtocartText} numberOfLines={1}>{translate("COMMONTEXT")["ADD_CART"]}</Text>
                    </Pressable>
                  }
                  <Text style={styles.priceTextCon} numberOfLines={1}>
                    <Text style={styles.priceRupeeText}>{'\u20B9'}</Text>
                    <Text style={styles.priceText}>{numberWithCommas(item?.product_item?.currentSalePrice)}</Text></Text>
                </View>
              </View>
            </View>
          </View>
        )
        )}
        <View style={styles.checkoutContainer}>
          <View style={styles.priseContainer}>
            {/* <Text style={styles.totalCountItems} numberOfLines={1}>Subtotal({orderData?.product_order_details?.length} items)</Text> */}
            <Text style={styles.totalCountItems} numberOfLines={1}>{`${translate("COMMONTEXT")["SUBTOTAL"]}(${orderData?.product_order_details?.length +" "+ translate("COMMONTEXT")["ITEMS"]})`}</Text>
            <Text style={styles.totalPriseCon} numberOfLines={1} >
              <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
              <Text style={styles.totalPrise}>{numberWithCommas(orderData?.mrp)}</Text>
            </Text>
          </View>

          {/* <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>MediZen Cash/Discount</Text>
            <Text style={styles.totalPrise} numberOfLines={1} >-{'\u20B9' + '598'}</Text>
          </View> */}

          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["SHIPPING"]}</Text>
            <Text style={styles.totalPrice} numberOfLines={1} >{translate("COMMONTEXT")["FREE"]}</Text>
          </View>
          <View style={[styles.priseContainer]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["DISCOUNT"]}</Text>
          <Text style={[styles.totalPriseCon]} numberOfLines={1} >
            - <Text style={styles.totalRupeePrise }>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.mrp - orderData?.payment?.amount - orderData?.cash - orderData?.points)}</Text>
          </Text>
        </View>
        <View style={[styles.priseContainer]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>Coupon Discount</Text>
          <Text style={[styles.totalPriseCon]} numberOfLines={1} >
            - <Text style={styles.totalRupeePrise }>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.cash)}</Text>
          </Text>
        </View>
        <View style={[styles.priseContainer]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>Points Redeemed</Text>
          <Text style={[styles.totalPriseCon]} numberOfLines={1} >
           - <Text style={styles.totalRupeePrise }>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.points)}</Text>
          </Text>
        </View>
        </View>

        <View style={[styles.priseContainer, { backgroundColor: 'aliceblue', paddingHorizontal: 20 }]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["TOTAL"]}</Text>
          <Text style={[styles.totalPriseCon, { right: 20 }]} numberOfLines={1} >
            <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.payment?.amount)}</Text>
          </Text>
        </View>
        <Text style={[styles.headerTxt, { marginHorizontal: 20, marginVertical: 15 }]}>{translate("CHECKOUT")["SHIPPING_DETAIL"]}</Text>
        <Text style={[styles.qtyText, { paddingHorizontal: 20, marginTop: 0 }]}>{orderData?.product_address?.nameShipTo} {orderData?.shipping?.last_name}</Text>
        <Text style={[styles.qtyText, { paddingHorizontal: 20 }]}>{orderData?.product_address?.address}</Text>
        <Text style={[styles.qtyText, { paddingHorizontal: 20 }]}>{orderData?.product_address?.city} {orderData?.product_address?.state} {orderData?.product_address?.country} {orderData?.shipping?.postcode}</Text>
        <Text style={[styles.qtyText, { paddingHorizontal: 20 }]}>+91 {orderData?.product_address?.numberShipTo}</Text>
        <Text style={[styles.qtyText, { paddingHorizontal: 20 }]}>{orderData?.billing?.email}</Text>

      </ScrollView>
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
