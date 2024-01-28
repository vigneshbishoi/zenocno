/**
 * Cart Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Cart
 */
import React, {useState, useEffect} from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
  Text,
  Alert,
  Platform,
  TouchableOpacity
} from 'react-native';
import {withTheme, _changeTranslations} from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg';
import translate from '../../../utils/Text'
import ProductCartItem from '../../../components/Ecommerce/ProductCartItem';
import CartitemTab from '../../../components/Ecommerce/cartItemTab';
import {useSelector} from 'react-redux';
import actionTypes from '../../../store/actions/types';
import AppLoader from '../../../components/Plugins/AppLoader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {numberWithCommas} from '../../../utils/commonFunction';
import EmptyCart from '../../../assets/images/EmptyCart.svg';
import Ellipse from '../../../assets/images/Ellipse.svg';
import { FONTFAMILY } from "../../../config/font-config";

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
  const [reloadpage, setReloadpage] = useState(false);
  let [totalAmount, setTotalAmount] = useState(0);
  let [allTotalAmount, setAllTotalAmount] = useState(0);
  const [isLoader, setIsLoader] = useState(true);
  const userData = useSelector(state => state.onboardingReducer.userDetails);
  const cartData =
    useSelector(state =>
      state.ecommerceReducer?.cartData?.length > 0
        ? state.ecommerceReducer.cartData
        : [],
    ) || [];
  const getCartData =
    useSelector(state =>
      state.ecommerceReducer?.getCart?.length > 0
        ? state.ecommerceReducer.getCart[0].data
        : [],
    ) || [];

  //LifeCycle Methods
  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    let total = 0,
      alltotal = 0;
    getCartData.map(item => {
      total = total + parseInt(item?.product_item?.reguler_price) * parseInt(item.qunatity);
      alltotal = alltotal + parseInt(item?.product_item?.price) * parseInt(item.qunatity);
      //console.log("total-------" ,total,alltotal)
    });
    //console.log("total-------" ,total,alltotal)
    //console.log("alltotal ", getCartData)
    setTotalAmount(total);
    setAllTotalAmount(alltotal);
    setReloadpage(false);
    setIsLoader(false);
  }, [getCartData]);

  const getCartDetails = () => {
    props.actions.getCart(actionTypes.GET_CART, {
      module: 'cart_data',
      action: 'getByCustomerId',
      formData: {
        customer_id: userData?.data?.userId,
      },
    });
    setReloadpage(true);
  };

  //Helper Methods
  const increment = item => {
    let qunatity = item.qunatity + 1;
    //setTotalAmount(totalAmount + parseInt(item.price))
    //setAllTotalAmount(allTotalAmount + parseInt(item.reguler_price))
    //setReloadpage(true)
    updateCartData(item, qunatity);
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  };
  const decrement = item => {
    let qunatity = item.qunatity;
    // if (item.qunatity > 1) {
    if (item.qunatity >= 1) {
      qunatity = item.qunatity - 1;

       if(qunatity === 0){
        deleteItemCart(item)
      }
      updateCartData(item, qunatity);
    }
    //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
  };

  const updateCartData = (item, qunatity) => {
    let total = parseInt(item?.product_item?.price) * parseInt(qunatity);
    let obj = {
      id: item.id,
      customer_id: userData?.data?.userId,
      product_id: item.product_id,
      product_name: item.product_name ? item.product_name : item?.image,
      image: item ? item.image : '',
      qunatity: qunatity,
      price: item?.product_item?.price,
      reguler_price: item?.product_item?.reguler_price,
      sale_price: item?.product_item?.price,
      total_price: total,
    };
    setIsLoader(false);
    props.actions.updateCart(actionTypes.UPDATE_CART, {
      module: 'cart_data',
      action: 'update_cart',
      formData: obj,
    });
    setTimeout(() => {
      getCartDetails();
    }, 2000);
  };

  const removeItemFromCart = item => {
    // let filterData = cartData.filter(itemA => itemA.id != item.id)
    // props.actions.addToCart("cartData", filterData, actionTypes.ADD_CART);
    // console.log("filter-----",filterData)
    //  setTotalAmount(totalAmount - (parseInt(item.price) * parseInt(item.qunatity)))
    // setAllTotalAmount(allTotalAmount - (parseInt(item.reguler_price) * parseInt(item.qunatity)))
    //setReloadpage(true)
    Alert.alert(
      'Delete',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => deleteItemCart(item)},
      ],
    );
  };

  const deleteItemCart = item => {
    setIsLoader(true);
    props.actions.deleteCart(actionTypes.DELETE_CART, {
      module: 'cart_data',
      action: 'remove?id=' + item.id,
      // formData: obj
    });
    setTimeout(() => {
      getCartDetails();
    }, 2000);
  };

  const rendercartitem = ({item, index}) => {      
    return (
      <ProductCartItem
        item={item}
        index={index}
        theme={theme}
        increment={increment}
        decrement={decrement}
        removeItemFromCart={removeItemFromCart}
        isRemove={true}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.SELECTED} />
      <View style={styles.headerVw}>        
        <Text style={styles.headerTxt}>{translate("COMMONTEXT")["MY_CART"]}</Text>

        {/* <Pressable onPress={() => { props.navigation.pop() }} style={{ position: "absolute", left: 10 }}>
          <Back width={8} height={15} style={{ margin: 15 }} />
        </Pressable> */}

        <Pressable
          onPress={() => {
            props.navigation.pop();
          }}
          style={{position: 'absolute', left: 10}}>
          <Back width={8} height={15} style={{margin: 15}} />
        </Pressable>
      </View>
      {getCartData.length > 0 && (
        <CartitemTab index={0} />
      )}
      {getCartData.length > 0 && (
        <FlatList
          data={getCartData}
          renderItem={rendercartitem}
          contentContainerStyle={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
      {getCartData.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>{`${translate("COMMONTEXT")["SUBTOTAL"]}(${getCartData.length +" "+ translate("COMMONTEXT")["ITEMS"]})`}</Text>

            <Text style={{right: 0, position: 'absolute'}} numberOfLines={1}>
              <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
              <Text style={styles.totalPrice}>
                {numberWithCommas(totalAmount)}
              </Text>
            </Text>
          </View>

          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>
             {translate("COMMONTEXT")["DISCOUNT"]}
            </Text>
            <Text style={{right: 0, position: 'absolute'}} numberOfLines={1}>
              -<Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
              <Text style={styles.totalPrice}>
                {numberWithCommas(totalAmount - allTotalAmount)}
              </Text>
            </Text>
          </View>

          <View style={styles.priseContainer}>
            <Text style={styles.totalCountItems} numberOfLines={1}>
              {translate("COMMONTEXT")["SHIPPING"]}
            </Text>
            <Text style={styles.totalPrise} numberOfLines={1}>
            {translate("COMMONTEXT")["FREE"]}
            </Text>
          </View>
        </View>
      )}

      {getCartData.length > 0 && (
        <View
          style={[
            styles.priseContainer,
            {backgroundColor: 'aliceblue', paddingHorizontal: 30},
          ]}>
          <Text style={styles.totalCountItems} numberOfLines={1}>
          {translate("COMMONTEXT")["TOTAL"]}
          </Text>
          <Text style={{right: 30, position: 'absolute'}} numberOfLines={1}>
            <Text style={styles.totalRupeePrise}>{'\u20B9'}</Text>
            <Text style={styles.totalPrice}>
              {numberWithCommas(allTotalAmount)}
            </Text>
          </Text>
        </View>
      )}

      {getCartData.length > 0 && (
        <Pressable
          style={styles.checkoutButton}
          onPress={() => {
            console.log('userData.woocommerce_data', userData);
            //   if(userData.woocommerce_data == undefined || userData.woocommerce_data == null) {
            props.navigation.navigate('Zen.Checkout', {isFromEdit: false});
            // } else {
            //   props.navigation.navigate('Zen.ReviewOrder', {
            //     customer_id: userData.woocommerce_data.customer_id
            //   })
            // }
          }}>
          <Text style={styles.checkoutText}>{translate("COMMONTEXT")["CONTINUE"]}</Text>
        </Pressable>
      )}
      {getCartData.length == 0 && (
        <View style={styles.emptyCartContainer}>          
          <View style={styles.emptyCartView}>
          <EmptyCart width={130} height={180} />
          </View>
          <Text
            style={[styles.totalCountItems, {fontSize: 25, marginTop:10, fontFamily:FONTFAMILY.POPPINS_MEDIUM}]}
            numberOfLines={1}>
            {translate("COMMONTEXT")["EMPTY_CART"]}
          </Text>
          <Text
            style={[
              styles.totalCountItems,
              {fontSize: 14, color: theme.MEDIUM_GRAY, marginTop: Platform.OS == 'ios' ? 3 : 0},
            ]}
            numberOfLines={1}>
           {translate("COMMONTEXT")["ADD_PRODUCTS"]}
          </Text>
        </View>
      )}
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
