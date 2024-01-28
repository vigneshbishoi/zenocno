/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  SectionList,
  Image,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import AppLoader from '../../../components/Plugins/AppLoader';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { numberWithCommas, calculateDiscount } from '../../../utils/commonFunction';
import { sendGetRequest } from '../../../services/ecommerce'
import translate from '../../../utils/Text'
import Button from '../../../components/CommonInput/navigateButton';

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
  const [page, setPage] = useState(1)
  const [loadeMore, setLoadMore] = useState(true)
  const [orderList, setOrderList] = useState([])
  const [orderData, setOrderData] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const isFocused = useIsFocused();

  const getCartData =
    useSelector((state) => state.ecommerceReducer?.getCart?.length > 0 ?
      state.ecommerceReducer.getCart[0]?.data : []) || [];

  const userData = useSelector((state) => state.onboardingReducer.userDetails?.data);

  useEffect(() => {
    if (isFocused) {
      setOrderData([])
      setOrderList([])
      getOrderList(1)
    }
  }, [isFocused])


  useEffect(() => {
    if (orderData.length > 0) {
      setLoadMore(true)
      let data = orderList.concat(orderData)
      data.forEach(object => {
        const messageDay = moment(object?.createdAt).format('YYYY-MM-DD')
        object.orderDate = messageDay;
      });
      let nData = Object.values(data.reduce((acc: any, item: any) => {

        if (!acc[item.orderDate]) acc[item.orderDate] = {
          title: item.orderDate,
          data: []
        };
        acc[item.orderDate].data.push(item);
        return acc;
      }, {}))

      setOrderList(nData)
    } else if (orderData != undefined) {
      setLoadMore(false)
    }
  }, [orderData])

  const getOrderList = async (page: any) => {
    if (loadeMore || page == 1) {
      setPage(page + 1)
      let payload = {
        module: 'product_item',
        action: "my_order",
      }
      let data = {
        userId: userData?.userId,
        page: page
      }
      const response = await sendGetRequest(data, payload);
      if (response?.data) {
        let data = response?.data
        console.log(data)
        if (data.length > 0) {
          setOrderData(data)
        }
      }
      if (page == 1) {
        setOrderList([])
      }
    }
  }

  const chatRender = ({ item, index }) => {
    //console.log("items------------", item)
    // {"cancer_category": {"name": "Breast Cancer"}, "image": "https://zenapp-test.s3.ap-south-1.amazonaws.com/image-1654931201692.jpg", "name": "Ast
    // ha ", "userId": 1}  
    return (
      <Pressable onPress={() => props.navigation.navigate('Zen.MyOrderDetail', { orderId: item?.orderId })}>
        <View style={[styles.cartItemContainer]}>
          <View style={styles.cartItemVw}>
            <Image source={{ uri: item ? item?.product_item?.image : null }} style={styles.cartImage} />
            <View style={{ width: '55%', marginLeft: 10, justifyContent: "space-between" }}>
              <Text style={styles.titleText} numberOfLines={2}>{item?.product_item?.product}</Text>
              <Text style={styles.qtyText} numberOfLines={1}>Qty:{item.quantity}</Text>
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 5, bottom: 0, alignItems: 'center' }}>
              {item?.product_item?.price != item?.product_item?.regualr_price && <Text style={{ textDecorationLine: 'line-through' }} numberOfLines={1} >
                <Text style={styles.priseRupeeText}>{'\u20B9'}</Text><Text style={styles.priseText}>{numberWithCommas(item?.product_item?.regualr_price)}</Text>
              </Text>}
              <Text numberOfLines={1}>
                <Text style={styles.priceRupeeText}> {'\u20B9'}</Text>
                <Text style={styles.priceText}>{numberWithCommas(item?.product_item?.price)}</Text>
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderHeader = ({ section }) => {
    return (
      <Text style={styles.dateTitle}>Ordered : {section?.title ? moment(section?.title).format('DD-MMM-YYYY') : 0}</Text>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.SELECTED} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <Pressable
          style={{ paddingLeft: 15, paddingRight: 10 }}
          onPress={() => props.navigation.goBack()}>
          {/* <Back width={15} height={20} /> */}
            <Back width={8} height={15} />
        </Pressable>
        <View style={styles.userProfileVw}>
          <Text style={styles.userName}>{'My Orders'}</Text>
        </View>
        <Pressable onPress={() => { props.navigation.navigate('Zen.Cart'); }} style={{ position: "absolute", right: 20 }}>
          <Image source={require('../../../assets/images/cart.png')} style={styles.cartIcon} />
          <View style={{ backgroundColor: 'red', position: 'absolute', justifyContent: 'center', right: -10, bottom: 12, height: 20, width: 20, borderRadius: 10 }}>
            <Text style={styles.cartText}>{getCartData?.length}</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 0 }}>
        {orderList.length > 0 ? (
          <SectionList
            sections={orderList}
            extraData={orderList}
            keyExtractor={(item, index) => item?.id}
            renderItem={chatRender}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 0 }}
            nestedScrollEnabled={false}
            renderSectionHeader={renderHeader}
          />
        ) : (
          <View style={{ height: '70%', justifyContent: 'center' }}>
            <Text style={{ color: '#A2A2A2', fontSize: 18, alignSelf: 'center' }}>
              {'Oops, No orders found!'}
            </Text>
            <Button height={40} width={160} marginTop={10} theme={theme} borderRadius={3} buttonText="Get Medicine" fontSize={14}
                    onPress={() => props.navigation.navigate('Zen.Ecommerce')}
            />
          </View>
        )}
      </View>
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
