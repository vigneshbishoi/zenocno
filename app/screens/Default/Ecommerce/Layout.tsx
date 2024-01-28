/**
 * Ecommerce Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Products
 */
 import React, { useState, useEffect, useLayoutEffect } from 'react';
 import style from './Style';
 import {
   View,
   Image,
   SafeAreaView,
   FlatList,
   StatusBar,
   Text,
   Pressable,
   ImageBackground,
   Dimensions,
   ScrollView,
   Switch
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import { Rating } from 'react-native-ratings';
 import { useSelector } from 'react-redux';
 import translate from '../../../utils/Text'
 import actionTypes from '../../../store/actions/types';
 import Back from '../../../assets/images/Back.svg'
 import Search from '../../../assets/images/search.svg'
 import NotificationBall from '../../../assets/images/notificationBall.svg'
 import Cart from '../../../assets/images/cartBackground.svg'
 import Star from '../../../assets/images/yellowStar.svg'
 import TogleButton from '../../../assets/images/TogleButton.svg'
 import DownArrow from '../../../assets/images/DownArrow.svg'
 import Toast from 'react-native-toast-message';
 import AppLoader from '../../../components/Plugins/AppLoader';
 import FlatListSlider from '../../../components/Slider/FlatListSlider';
 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import { InstagramLoader } from 'react-native-easy-content-loader';
 import ContentLoader from "react-native-easy-content-loader";
 import { SvgCssUri } from 'react-native-svg';
 import { numberWithCommas, calculateDiscount } from '../../../utils/commonFunction';
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
   const userData = useSelector((state) => state.onboardingReducer.userDetails);
   const categoryData = useSelector((state) => state.ecommerceReducer?.productCategoryData?.length > 0 ?
     state.ecommerceReducer.productCategoryData[0]?.data : []) || [];
   const products =
     useSelector((state) => state.ecommerceReducer?.productsData?.length > 0 ?
       state.ecommerceReducer.productsData[0] : []) || [];
   const cartData =
     useSelector((state) => state.ecommerceReducer?.cartData?.length > 0 ?
       state.ecommerceReducer.cartData : []) || [];
 
   const getCartData =
     useSelector((state) => state.ecommerceReducer?.getCart?.length > 0 ?
       state.ecommerceReducer.getCart[0]?.data : []) || [];
 
   const productImages =
     useSelector((state) => state.ecommerceReducer?.productImages?.length > 0 ?
       state.ecommerceReducer.productImages[0]?.data : []) || [];
 
   // console.log('categoryData list all --------' , categoryData)
 
   const [topProductArr, setTopProsuctArr] = useState([
     { key: '1', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '2', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '3', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '4', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '5', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '6', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '7', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
     { key: '8', icon: require('../../../assets/images/product.png'), iname: 'MediZen Curcumin for Immunity Boost and Othersss', type: 'Anti-hairfall', prise: '3,199', disPrise: '1,799', reviews: '147', itemQuantity: 1 },
   ])
   //const [selectItem, setSelectedItem] = useState(categoryData?.length > 0 ? categoryData[0]?.id : 0);
   const [selectItem, setSelectedItem] = useState(0);
   const [isLoader, setIsLoader] = useState(true);
   const [isAdded, setIsAdded] = useState(false);
   const [isVisible, setIsVisible] = useState(true);
   const [contentOffset, setContentOffset] = useState(0);
   const [productData, setProductData] = useState([]);
   const [productDataLoader, setProductDataLoader] = useState(true);
   const [categoryList, setCategoryList] = useState([]);
   const [isEnabled, setIsEnabled] = useState(false);
   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 
   const arr = [
     { id: 1, img: require('../../../assets/images/product_banner.png'), name: "category 1" },
     { id: 2, img: require('../../../assets/images/product_banner.png'), name: "category 1" },
     { id: 3, img: require('../../../assets/images/product_banner.png'), name: "category 1" },
     { id: 4, img: require('../../../assets/images/product_banner.png'), name: "category 1" }
   ]
 
   useLayoutEffect(() => {
     setIsLoader(true)
     apiCall()
     getProducts()
     getProductsImages()
     getCartDetails()
   }, []);
 
   useEffect(() => {
     if (categoryData.length > 0) {
       if (!checkAllExist()) {
         let data = {
           "id": 0,
           "category": "All",
           "image": null
         }
         const newArr = [data, ...categoryData];
         setCategoryList(newArr)
       }
     }
     setIsLoader(false)
   }, [categoryData]);
 
   useEffect(() => {
     if (products?.data?.length > 0) {
       setProductData(Array.isArray(products?.data) ? products.data : [])
       setTimeout(() => {
         setProductDataLoader(false)
       }, 500);
     }
     setTimeout(() => {
       setProductDataLoader(false)
     }, 6000);
     isLoader && setIsLoader(false)
   }, [products]);
 
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
 
   //api call
   const apiCall = () => {
     // props.actions.getProductCategory(actionTypes.PRODUCT_CATEGORY, {
     //   module: 'products',
     //   action: 'categories',
     //   formData: {}
     // });
     props.actions.getProductCategory(actionTypes.PRODUCT_CATEGORY, {
       module: 'product_item',
       action: 'get-products-category',
       formData: {}
     });
   }
   const getProducts = () => {
     // props.actions.getProducts(actionTypes.PRODUCT, {
     //   module: 'products',
     //   action: '',
     //   formData: {}
     // });
     props.actions.getProducts(actionTypes.PRODUCT, {
       module: 'product_item',
       action: 'get-products',
       formData: {}
     });
   }
   const getProductsOfcategory = (id) => {
     // props.actions.getCategoryProducts(actionTypes.CATEGORY_PRODUCT, {
     //   module: 'products',
     //   action: '',
     //   formData: {
     //     category: id
     //   }
     // });
     props.actions.getCategoryProducts(actionTypes.CATEGORY_PRODUCT, {
       module: 'product_item',
       action: 'get-products',
       formData: {
         categoryId: id
       }
     });
   }
   const getProductsImages = () => {
     props.actions.getProductImages(actionTypes.PRODUCT_IMAGES, {
       module: 'product_item',
       action: 'get-product-carousel',
     });
   }
   const getCartDetails = () => {
     props.actions.getCart(actionTypes.GET_CART, {
       module: 'cart_data',
       action: "getByCustomerId",
       formData: {
         customer_id: userData?.data?.userId
       }
     });
   }
 
   const addToCart = (item) => {
     let filterData = getCartData.filter(itemA => itemA.product_id == item.id)
     if (filterData.length == 0) {
       let obj = {
         customer_id: userData?.data?.userId,
         product_id: item.id,
         image: item?.images?.length > 0 ? item?.images[0].src : item?.image,
         qunatity: 1,
         price: item?.price,
         reguler_price: item?.regular_price,
         sale_price: item?.price,
         total_price: item?.price,
         product_name: item.name,
       }
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
 
   //Helper Method
   const checkItemExist = (item) => {
     let value = getCartData.filter(e => e?.product_item?.id === item.id)
     return value; // true
   }
 
   const checkAllExist = () => {
     return categoryList.some(element => element.category === "All");
   }
 
   const increment = (item, index) => {
     let qunatity = item.qunatity + 1
     let value = getCartData.findIndex(e => e.id === item.id)
     getCartData[value].qunatity = qunatity
     //setTotalAmount(totalAmount + parseInt(item.price))
     //setAllTotalAmount(allTotalAmount + parseInt(item.reguler_price))
     //setReloadpage(true)
     updateCartData(item, qunatity, false)
     //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
   }
 
   const decrement = (item) => {
     let qunatity = item.qunatity
     // if (item.qunatity > 1) {
     if (item.qunatity >= 1) {
       qunatity = item.qunatity - 1
       let value = getCartData.findIndex(e => e.id === item.id)
       getCartData[value].qunatity = qunatity
       if(qunatity === 0){
         deleteItemCart(item)
       }
       // setReloadpage(true)
       updateCartData(item, qunatity, false)
     }
     //props.actions.addToCart("cartData", cartData, actionTypes.ADD_CART);
   }
 
   const deleteItemCart = item => {
     setIsLoader(true);
     // props.actions.getCart(actionTypes.GET_CART, {
     props.actions.deleteCart(actionTypes.DELETE_CART, {
       module: 'cart_data',
       action: 'remove?id=' + item.id,
       // formData: obj
     });
     setTimeout(() => {
       getCartDetails();
     }, 2000);
   };
 
   const updateCartData = (item, qunatity, isloader = true) => {
     let total = parseInt(item?.product_item?.price) * parseInt(qunatity)
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
       total_price: total
     }
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
 
   //Helper Methods
   const dietTopicRender = ({ item, index }) => {
     //console.log(item)
     return (
       <View style={styles.topicContainer}>
         <Pressable style={[styles.topicItem, selectItem === item.id && styles.selectedItemBG]} onPress={() => {
           setSelectedItem(item?.id)
           setIsLoader(true)
           if (item.id === 0) {
             apiCall()
             getProducts()
           } else {
             getProductsOfcategory(item?.id)
           }
         }}>
           {/* {item.id != 0 && (selectItem === item.id ?
             (item?.selected_image != null ?
               <SvgCssUri width={21} height={19} style={styles.topicIcon} uri={item?.selected_image} />
               : <Icon name="category" color={theme.BLACK} size={18} />)
             :
             (item?.unselected_image != null ?
               <SvgCssUri width={21} height={19} style={styles.topicIcon} uri={item?.unselected_image} />
               : <Icon name="category" color={theme.BLACK} size={18} />)
           )} */}
           <Text style={[styles.topicTitle, selectItem === item.id && styles.selectedTopicTitle]}>{item?.category}</Text>
         </Pressable>
       </View>
     );
   }
 
   const tagList = (item) => {
     const arr = item?.type?.split(',');
     return arr.slice(0, 1).map((element) => {
       return (
         <View key={element.key} style={styles.priseDisVw} >
           <Image style={[styles.rateImage, { marginLeft: 0 }]} source={require('../../../assets/images/correctMark.png')} />
           <Text style={styles.itemType} numberOfLines={1}> {element}</Text>
         </View>
       );
     });
   };
 
   const topProductRender1 = ({ item, index }) => {
 
     // console.log('item: ', item);
     //console.log("items------------" ,item.regular_price, '------' ,item.price,"------" ,item.sale_price)
     let checkRating = item?.product_reviews?.length > 0 && item?.product_reviews[0]?.average_rating
 
     return (
       <Pressable style={styles.topProductItemContainer} onPress={() => null}>
         <View style={styles.topProductItem}>
           <Image style={styles.productImg} source={{ uri: item?.image ? item?.image : null }} />   
           <View style={styles.itemTexts}>
             <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <View>
                <Text style={styles.productInfo}>
                  60 Tablets | 700 mg/tab
                </Text>
              </View>
              <View style={styles.ratingDisVw} >
                <Rating
                  ratingCount={item?.product_reviews?.length > 0 && item?.product_reviews[0]?.average_rating ?
                    Math.round(item?.product_reviews[0]?.average_rating) * 2 : 10}
                  minValue={5}
                  type='custom'
                  imageSize={15}
                  ratingColor={theme.SECONDARY}
                  tintColor={theme.PRIMARY}
                  // style={{ width: '10%'}}
                  readonly={true}
                />
                <View style={styles.rattingText}>
                  <Text style={styles.reviewText} >
                    {
                      item?.product_reviews.length > 0 ? item?.product_reviews[0]?.count_rating : "0"
                    } 
                  </Text>
                </View>
              </View>
             {tagList(item)}

             <View style={styles.priceContainer} >
                <View>
                  <View>
                    <Text numberOfLines={1}>
                      <Text style={styles.rupeeText}>{'\u20B9'}</Text>
                      <Text style={styles.disPriceText}>{numberWithCommas(item?.price)}</Text>
                    </Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        {
                          calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                            <Text style={{ textDecorationLine: 'line-through' }} numberOfLines={1} >
                              <Text style={[styles.priseRupeeText]}>{'\u20B9'}</Text>
                              <Text style={[styles.priseText]} >{numberWithCommas(item?.regular_price)}</Text>
                            </Text>
                        }
                        {
                          calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                              <Text style={styles.actulPriseRupeeText} numberOfLines={1}> {` (${calculateDiscount(item?.regular_price, item?.price)}${translate("COMMONTEXT")["PER_OFF"]})`}</Text>
                        }
                    </View>
                  </View>
                </View>

              
               {
                checkItemExist(item).length > 0 && checkItemExist(item)[0]?.qunatity != 0 ?
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
                  </View>
                  :
                  <Pressable style={styles.addtoCardButton}>
                    <Text style={styles.addtocartText} numberOfLines={1}>{translate("COMMONTEXT")["ADD_CART"]}</Text>
                  </Pressable>
               }

             </View>
           </View>
    
         </View>
       </Pressable>
     );
   }
   
   const topProductRender = ({ item, index }) => {
 
     // console.log('item: ', item);
     //console.log("items------------" ,item.regular_price, '------' ,item.price,"------" ,item.sale_price)
     let checkRating = item?.product_reviews?.length > 0 && item?.product_reviews[0]?.average_rating
 
     return (
       <Pressable style={styles.topProductItemContainer} onPress={() => {
         props.navigation.navigate('Zen.ProductDetail', { id: item.id });
       }}>
         <View style={styles.topProductItem}>
           <Image style={styles.productImg} source={{ uri: item?.image ? item?.image : null }} />   
           <View style={styles.itemTexts}>
             <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
             {/* <View style={styles.priseDisVw} >
               <Image style={[styles.rateImage, { marginLeft: 0 }]} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.itemType} numberOfLines={1}> {item.type}</Text>
             </View> */}
 
             <View style={styles.ratingDisVw} >
               <Rating
                 ratingCount={item?.product_reviews?.length > 0 && item?.product_reviews[0]?.average_rating ?
                   Math.round(item?.product_reviews[0]?.average_rating) * 2 : 10}
                 minValue={5}
                 type='custom'
                 imageSize={15}
                 ratingColor={theme.SECONDARY}
                 tintColor={theme.PRIMARY}
                 style={{ width: '10%'}}
                 readonly={true}
               />
                             <Text style={styles.reviewText} >{item?.product_reviews?.count_rating != undefined ? item?.product_reviews?.count_rating : "0"} {translate("COMMONTEXT")["REVIEWS"]}</Text>
             </View>
 
             {tagList(item)}
             <View style={styles.priseDisVw} >
               <Text style={styles.priseText} numberOfLines={1}>{translate("COMMONTEXT")["MRP"]}</Text>
               {calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
               <Text style={{ textDecorationLine: 'line-through' }} numberOfLines={1} ><Text style={[styles.priseRupeeText]}>{'\u20B9'}</Text><Text style={[styles.priseText]} >{numberWithCommas(item?.regular_price)}</Text></Text>}
               <Text numberOfLines={1}><Text style={styles.rupeeText}> {'\u20B9'}</Text><Text style={styles.disPriceText}>{numberWithCommas(item?.price)}</Text></Text>
               {calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                 <>
                   <Text style={styles.priseText} > | </Text>
                   <Text style={styles.offText} numberOfLines={1}>{calculateDiscount(item?.regular_price, item?.price)}{translate("COMMONTEXT")["PER_OFF"]}</Text>
                 </>
               }
             </View>
      
           </View>
           {checkItemExist(item).length > 0 && checkItemExist(item)[0]?.qunatity != 0 ?
             // <Pressable style={[styles.addtocartVw, { backgroundColor: theme.SECONDARY }]} onPress={() => props.navigation.navigate('Zen.Cart')}>
             //   <Text style={[styles.addtocartText, { color: theme.PRIMARY }]} numberOfLines={1}>{translate("COMMONTEXT")["GOTO_CART"]}</Text>
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
             checkItemExist(item)[0]?.qunatity === 0 ?
               <Pressable style={styles.addtocartVw} onPress={() => addToCart(item)}>
                 <Text style={styles.addtocartText} numberOfLines={1}>{translate("COMMONTEXT")["ADD_CART"]}</Text>
               </Pressable>
               :
               <Pressable style={styles.addtocartVw} onPress={() => addToCart(item)}>
                 <Text style={styles.addtocartText} numberOfLines={1}>{translate("COMMONTEXT")["ADD_CART"]}</Text>
               </Pressable>
 
           }
         {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
           <View>
           {calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
               <Text style={{ textDecorationLine: 'line-through' }} numberOfLines={1} ><Text style={[styles.priseRupeeText]}>{'\u20B9'}</Text><Text style={[styles.priseText]} >{numberWithCommas(item?.regular_price)}</Text></Text>}
               <Text numberOfLines={1}><Text style={styles.rupeeText}> {'\u20B9'}</Text><Text style={styles.disPriceText}>{numberWithCommas(item?.price)}</Text></Text>
           </View>
           <Pressable style={styles.newAddtocartVw} onPress={() => addToCart(item)}>
               <Text style={styles.mewAddtocartText} numberOfLines={1}>{translate("COMMONTEXT")["ADD_CART"]}</Text>
           </Pressable>
         </View> */}
         </View>
       </Pressable>
     );
   }
 
   const dotsList = () => {
     return productImages.map((data, index) => {
       return (
         <View key={data.key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
           <View style={[styles.trackVw, { backgroundColor: stepCounter == index ? theme.SECONDARY : '#dadedd' }]} />
         </View>
       );
     });
   };
 
   const viewScrollHeader = () => {
     return (
       <View>
         {categoryList?.length > 0 &&
           <FlatList
             data={categoryList}
             style={{ backgroundColor: theme.PRIMARY }}
             horizontal
             keyExtractor={(item, index) => item.id}
             contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10, paddingTop: 25, alignItems: 'center' }}
             showsHorizontalScrollIndicator={false}
             renderItem={dietTopicRender} />}
       </View>
     )
   }
   const viewHeader = () => {
     return (
       <View style={styles.headerVw}>
         <Pressable onPress={() => { props.navigation.pop() }} style={{ position: "absolute", left: 10 }}>
           <Back width={8} height={15} style={{ margin: 15 }} />
         </Pressable>
         <Pressable onPress={() => { props.navigation.navigate('Zen.Cart'); }} style={{ position: "absolute", right: 20 }}>
           <Image source={require('../../../assets/images/cart.png')} style={styles.cartIcon} />
           <View style={{ backgroundColor: 'red', position: 'absolute', justifyContent: 'center', right: -10, bottom: 12, height: 20, width: 20, borderRadius: 10 }}>
             <Text style={styles.cartText}>{getCartData?.length}</Text>
           </View>
         </Pressable>
       </View>
     )
   }
 
 
   const viewForground = () => {
     return (
       <View>
         <Pressable style={styles.offerImg}>
           <FlatListSlider
             data={productImages?.length > 0 ? productImages : arr}
             timer={5000}
             imageKey={'url'}
             local={false}
             width={width}
             separator={0}
             height={225}
             indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
             indicatorActiveColor={theme.SECONDARY}
             indicatorInActiveColor={'#dadedd'}
           //indicator
           />
         </Pressable>
       </View>
     )
   }
 
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
       <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
       <View style={{ flex: 1, flexDirection: "column" }}>
         {/* {viewHeader()} */}
         <AppHeader
           theme={theme}
           onBackPress={() => props.navigation.pop()}
           headerTitle={translate("BOTTOMBAR")["PRODUCTS"]}
           isFirstIcon={true}
           isRightComponent={true}
           isThirdIcon={true}
           isSecondIcon={true}
           rightSecondIcon={
              <View>
               <Cart />
               <View style={{ backgroundColor: theme.SECONDARY, position: 'absolute', justifyContent: 'center', right: -10, bottom: 12, height: 20, width: 20, borderRadius: 10 }}>
                 <Text style={styles.cartText}>{getCartData?.length}</Text>
               </View>
             </View>
             }
           rightThirdIcon={
             <View style={{width:36, height:36, borderRadius: 36, justifyContent:'center',
                 backgroundColor: theme.DARK_SILVER , alignItems:'center',}}>
               <Search />
              </View>
           }
           rightFirstIcon={
               <NotificationBall />
           }
           rightFirstPress={() => null}
           rightSecondPress={() => props.navigation.navigate('Zen.Cart')}
           rightThirdPress={() => null}
           extraHeaderTxt={{fontSize: 24}}
           extraHeaderTxtView={{ flex:1 }}
       />
 
         <View style={{flexDirection:'row', marginHorizontal:20, marginBottom:10, justifyContent:'space-between'}}>
           <View style={{flexDirection:'row', alignItems:'center'}}>
             <Text style={styles.zenText}>{translate("DRAWER")["ZEN"]}</Text>
             <View style={{width:10}}/>
              <Star />
              <View style={{width:5}}/>
             <TogleButton />
           </View>
           <Pressable 
             onPress={()=> props.navigation.navigate('Zen.EventFilter')}
            //  onPress={()=> props.navigation.navigate('Zen.Filters')}
             style={{flexDirection:'row', alignItems:'center'}}>
             <Text style={styles.filterText}>{translate("COMMONTEXT")["FILTER"]}</Text>
             <Text style={styles.zenText}>{"(1)"}</Text>
              <View style={{width:5}}/>
             <DownArrow />
           </Pressable>
         </View>
         <ScrollView stickyHeaderIndices={[1]}
           keyboardShouldPersistTaps={'always'}
           nestedScrollEnabled={true}
         // scrollEventThrottle={400}
         >
           {/* <Pressable
           // style={styles.offerImg}
           > */}
           <FlatListSlider
             data={productImages?.length > 0 ? productImages : arr}
             timer={5000}
             imageKey={'url'}
             local={false}
             // width={width}
             separator={0}
             // height={225}
             indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
             indicatorActiveColor={theme.SECONDARY}
             indicatorInActiveColor={'#dadedd'}
             indicator
           />
           {/* </Pressable> */}
           {viewScrollHeader()}
           {productDataLoader ? 
           <View style={{flexDirection:'row'}}>
             <View style={{flex:1}}>
               <ContentLoader
                 active
                 listSize={5} 
                 pWidth={[100, 70, 100]}
                 pHeight={[100, 30, 20]}/> 
             </View>
             <View style={{flex:1}}>
               <ContentLoader
                 active
                 listSize={5} 
                 pWidth={[100, 70, 100]}
                 pHeight={[100, 30, 20]}/> 
             </View>
           </View> :  <FlatList
               data={Array.isArray(productData) ? productData : []}
               numColumns={2}
               ListEmptyComponent={() => (
                 <View style={{ height: '100%', justifyContent: 'center' }}><Text style={{ color: '#A2A2A2', fontSize: 18, alignSelf: 'center' }}>{translate("COMMONTEXT")["NO_DATA_FOUND"]}</Text></View>
               )}
               keyExtractor={(item, index) => item.id}
               renderItem={topProductRender1}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ paddingBottom: 0 }}
               nestedScrollEnabled={true} />}
         </ScrollView>
 
       </View>
       {isLoader && <InstagramLoader active listSize={10} />}
       {/* <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} /> */}
     </SafeAreaView>
   );
 
   // return (
   //   <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
   //     <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
   //     <View style={styles.headerVw}>
   //       <Pressable onPress={() => { props.navigation.pop() }} style={{ position: "absolute", left: 10 }}>
   //         <Back width={15} height={20} style={{ margin: 15 }} />
   //       </Pressable>
   //       <Pressable onPress={() => { props.navigation.navigate('Zen.Cart'); }} style={{ position: "absolute", right: 20 }}>
   //         <Image source={require('../../../assets/images/cart.png')} style={styles.cartIcon} />
   //         <View style={{ backgroundColor: 'red', position: 'absolute',justifyContent:'center', right: -10,bottom:12, height: 20, width: 20, borderRadius: 10 }}>
   //           <Text style={styles.cartText}>{getCartData?.length}</Text>
   //         </View>
   //       </Pressable>
   //     </View>
   //     <View style={{flexDirection:'column'}}>
   //       <Pressable style={styles.offerImg}>
   //       <FlatListSlider
   //           data={productImages?.length > 0 ?  productImages.slice(0, 10) : arr}
   //           timer={5000}
   //           imageKey={'url'}
   //           local={false}
   //           width={width}
   //           separator={0}
   //           height={225}
   //           indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
   //           indicatorActiveColor={theme.SECONDARY}
   //           indicatorInActiveColor={'#dadedd'}
   //           //indicator
   //         />       
   //       </Pressable>
   //       {categoryList?.length > 0 &&
   //        <FlatList
   //         data={categoryList}
   //         style={{backgroundColor:"aliceblue"}}
   //         horizontal
   //         keyExtractor={(item, index)=>item.id}
   //         contentContainerStyle={{ paddingHorizontal: 25, paddingVertical: 30, alignItems: 'center'}}
   //         showsHorizontalScrollIndicator={false}
   //         renderItem={dietTopicRender} />}
   //       {products?.data?.length > 0 ?
   //         <FlatList
   //           data={products?.data}
   //           numColumns={2}
   //           keyExtractor={(item, index) => item.id}
   //           renderItem={topProductRender}
   //           showsVerticalScrollIndicator={false}
   //           contentContainerStyle={{ alignItems: 'center', paddingBottom: 430 }}
   //           nestedScrollEnabled={false} />
   //        : 
   //        <View style={{height:'50%',justifyContent:'center'}}><Text style={{color:'#A2A2A2',fontSize:18,alignSelf:'center'}}>{translate("COMMONTEXT")["NO_DATA_FOUND"]}</Text></View>
   //        } 
   //     </View>
 
   //     <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
   //   </SafeAreaView>
   // );
 };
 export default withTheme(Layout);
 
