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
  StatusBar,
  Pressable,
  Text,
  ScrollView,
  Image,
  BackHandler
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import actionTypes from '../../../store/actions/types';
import moment from 'moment';
import { numberWithCommas } from '../../../utils/commonFunction';
import translate from '../../../utils/Text'
import AppHeader from '../../../components/CommonInput/appHeader';
import Paid from '../../../assets/images/PaidStamp.svg';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const orderData = props.route?.params?.data
  const customerId = props.route?.params?.customerId
  console.log("order data ------------ ", orderData)
  useEffect(() => {
    clearUserCart()
    setTimeout(() => {
      getCartDetails()
    }, 2000);
    const backAction = () => {
      props.navigation.navigate('Zen.Ecommerce')
      props.actions.createOrderData("orderDetail", {}, actionTypes.CREATE_ORDER_DATA)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])

  const clearUserCart = () => {
    props.actions.clearUserCart(actionTypes.CLEAR_CART, {
      module: 'cart_data',
      action: "cart_remove?customer_id=" + customerId,
      // formData: {
      //   customer_id: customerId
      // }
    });
  }

  const getCartDetails = () => {
    props.actions.getCart(actionTypes.GET_CART, {
      module: 'cart_data',
      action: "getByCustomerId",
      formData: {
        customer_id: customerId
      }
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppHeader
        theme={theme}
        onBackPress={() => {
          props.navigation.navigate('Zen.Ecommerce')
          props.actions.createOrderData("orderDetail", {}, actionTypes.CREATE_ORDER_DATA)
        }}
        headerTitle={translate("CHECKOUT")["ORDER_RECEIVED"]}
        isRightComponent={false} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <Text style={styles.orderDesText} >{translate("CHECKOUT")["SUCCESS_TRANSACTION"]}</Text>
        <Text style={[styles.orderDesText, { marginBottom: 10 }]} >{translate("CHECKOUT")["PROCESSING_ORDER"]}</Text>
        <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("CHECKOUT")["ORDER_NO"]}</Text>
          <Text style={styles.orderContent} >{orderData?.id}</Text>
        </View>
        <View style={styles.orderDetails} >
          <Paid width={90} height={90} style={styles.PaidStamp}/>
          <Text style={styles.orderHeader} >{translate("COMMONTEXT")["DATE"]}</Text>
          <Text style={styles.orderContent} >{orderData?.createdAt ? moment(orderData?.createdAt).format("DD MMM hh:mm") : ""}</Text>
        </View>
        {/* <View style={styles.orderDetails} >
          <Text style={styles.orderHeader} >{translate("COMMONTEXT")["EMAIL"]}</Text>
          <Text style={styles.orderContent} >{orderData?.payment?.email}</Text>
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
        {orderData?.product_order_details?.map((item, index) => (
          <View style={[styles.cartItemContainer]}>
            <View style={styles.cartItemVw}>
              <Image source={{ uri: item?.product_item?.image }} style={styles.cartImage} />
              <View style={{ width: '55%', marginLeft: 10 }}>
                <Text style={styles.titleText} numberOfLines={2}>{item?.product_item?.tags}</Text>
                {/* {console.log("items-------",item.product_item)} */}

                {/* <Text style={styles.qtyText} numberOfLines={1}>{item.quantity}</Text> */}
              </View>
              <Text style={[styles.titleText, { color: theme.GRAY_BLACK, position: 'absolute', bottom: 8, left: 115 }]} numberOfLines={1}>Qty:{item.quantity}</Text>
              <Text style={styles.priceTextCon} numberOfLines={1}>
                <Text style={styles.priceRupeeText}>{'\u20B9'}</Text>
                <Text style={styles.priceText}>{numberWithCommas(item?.product_item?.salePrice)}</Text></Text>
            </View>
          </View>
        ))}
        <View style={styles.checkoutContainer}>
          <View style={styles.priseContainer}>
            {/* <Text style={styles.totalCountItems} numberOfLines={1}>Subtotal({orderData?.product_order_details?.length} items)</Text> */}
            <Text style={styles.totalCountItems} numberOfLines={1}>{`${translate("COMMONTEXT")["SUBTOTAL"]}(${orderData?.product_order_details?.length + " " + translate("COMMONTEXT")["ITEMS"]})`}</Text>
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
        </View>
        <View style={[styles.priseContainer, { paddingHorizontal: 20 }]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>{translate("COMMONTEXT")["DISCOUNT"]}</Text>
          <Text style={[styles.totalPriseCon, { right: 20 }]} numberOfLines={1} >
            - <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.mrp - orderData?.payment?.amount - orderData?.cash - orderData?.points)}</Text>
          </Text>
        </View>
        <View style={[styles.priseContainer, { paddingHorizontal: 20 }]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>Coupon Discount</Text>
          <Text style={[styles.totalPriseCon, { right: 20 }]} numberOfLines={1} >
            - <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.cash)}</Text>
          </Text>
        </View>
        <View style={[styles.priseContainer, { paddingHorizontal: 20 }]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>Points Redeemed</Text>
          <Text style={[styles.totalPriseCon, { right: 20 }]} numberOfLines={1} >
            - <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrise}>{numberWithCommas(orderData?.points)}</Text>
          </Text>
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

    </SafeAreaView>
  );
};
export default withTheme(Layout);
