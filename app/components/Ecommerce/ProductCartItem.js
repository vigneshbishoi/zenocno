import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import { numberWithCommas } from '../../utils/commonFunction';


const ProductCartItem = ((props) => {
  const { item, index, theme ,increment,decrement, removeItemFromCart} = props
  const styles = modalStyles(theme);
  return (
    <View style={[styles.cartItemContainer]}>
      <View style={styles.cartItemVw}>
        <Image source={{uri: item ? item?.image : null}} style={styles.cartImage} />
        <View style={{ width: '55%', marginLeft: 10 }}>
          <Text style={styles.titleText} numberOfLines={2}>{item.product_name}</Text>
          {/* <Text style={styles.qtyText} numberOfLines={1}>{item.quantity}</Text> */}
          <View style={{ position: 'absolute', bottom: 3, borderColor: '#e2e2e2',flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 25 }} >
          <View style={styles.addRemoveItemContainer}>
          <Pressable style={[styles.addRemoveItem, { marginRight: 9, marginLeft: 3 }]} onPress={() => decrement(item)}>
          <Text style={styles.addRemoveText}>-</Text>
          </Pressable>
          <Text style={styles.totalItem}>{item.qunatity}</Text>
          <Pressable style={[styles.addRemoveItem, { marginLeft: 9, marginRight: 3 }]} onPress={() => increment(item)}>
          <Text style={styles.addRemoveText}>+</Text>
          </Pressable>
          </View>
          </View>
        </View>
        <View style={{flexDirection:'row', position: 'absolute',right: 5, bottom: 3,alignItems:'center'}}>
        {item?.product_item?.price != item?.product_item?.reguler_price && <Text style={{ textDecorationLine: 'line-through' }} numberOfLines={1} >
        <Text style={styles.priseRupeeText}>{'\u20B9'}</Text><Text style={styles.priseText}>{numberWithCommas(item?.product_item?.reguler_price)}</Text>
          </Text>}
        <Text  numberOfLines={1}>
          <Text  style={styles.priceRupeeText}> {'\u20B9'}</Text>
          <Text style={styles.priceText}>{numberWithCommas(item?.product_item?.price)}</Text>
          </Text>
        </View>
        {props.isRemove && <Pressable style={{ position: 'absolute', right: 0, top: 0 }} onPress={() => removeItemFromCart(item)}>
          <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/delete.png')} />
        </Pressable>
        }
      </View>
    </View>
  );
})
const modalStyles = (theme) => StyleSheet.create({
  cartItemContainer: {
    borderBottomWidth: 4,
    borderColor: 'aliceblue'
  },
  cartItemVw: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 105,
    flexDirection: 'row',
  },
  cartImage: {
    height: 105,
    width: 105,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor:'#A2A2A2'
  },
  titleText: {
    fontSize: 14,
    color: theme.BLACK,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
  },
  qtyText: {
    fontSize: 12,
    color: theme.SUB_TITLE,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    marginTop: 5
  },
  priceText: {
    fontSize: 16,
    color: theme.BLACK,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
  },
  priceRupeeText: {
    fontSize: 16,
    color: theme.BLACK,
  },
  checkoutContainer: {
    paddingHorizontal: 30,
    backgroundColor: theme.PRIMARY
  },
  priseContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 30,
  },
  totalCountItems: {
    color: theme.BLACK,
    fontSize: 16,
  },
  totalPrise: {
    position: 'absolute',
    right: 0,
    color: theme.BLACK,
    fontSize: 24,
    fontWeight: 'bold'
  },
  checkoutButton: {
    borderRadius: 20,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
    marginVertical: 30
  },
  checkoutText: {
    color: theme.PRIMARY,
    fontSize: 16
  },

  addRemoveItemContainer: {
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addRemoveItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#108fe5',
  },
  addRemoveText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: theme.PRIMARY
  },
  totalItem: {
    fontSize: 13,
    color: theme.GRAY_BLACK,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
  },
  priseText:{
    color: theme.SUB_TITLE,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 12,
    marginRight:5
  },
  priseRupeeText:{
    color: theme.SUB_TITLE,
    fontSize: 12,
    marginRight:5
  },
})
export default ProductCartItem;