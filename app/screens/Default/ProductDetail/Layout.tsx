/**
 * Product Detail Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Product Detail
 */
 import React, { useState, useEffect, useLayoutEffect } from 'react';
 import style from './Style';
 import {
   View,
   Image,
   TextInput,
   SafeAreaView,
   FlatList,
   StatusBar,
   Pressable,
   Dimensions,
   ScrollView,
   Text,
   Platform,
   UIManager,
   LayoutAnimation
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import Back from '../../../assets/images/Back.svg'
 import translate from '../../../utils/Text'
 import CheckBox from 'react-native-check-box'
 import { Rating } from 'react-native-ratings';
 import { useSelector } from 'react-redux';
 import actionTypes from '../../../store/actions/types';
 import RenderHtml from 'react-native-render-html';
 import Toast from 'react-native-toast-message';
 import AppLoader from '../../../components/Plugins/AppLoader';
 import { FONTFAMILY } from '../../../config/font-config';
 import { numberWithCommas, calculateDiscount } from '../../../utils/commonFunction';
 import moment from 'moment';
 import { savePostRequest } from '../../../services/ecommerce'
 import { SvgCssUri } from 'react-native-svg';
 import NavigateButton from '../../../components/CommonInput/navigateButton';
 import AppHeader from '../../../components/CommonInput/appHeader';
 import Search from '../../../assets/images/search.svg'
 import NotificationBall from '../../../assets/images/notificationBall.svg'
 import Cart from '../../../assets/images/cartBackground.svg'
 import TikBullet from '../../../assets/images/TikBullet.svg'
 import RigthArrow from '../../../assets/images/RigthArrow.svg'
 
 interface IProps {
   theme: any;
   navigation: any;
   actions: any
   data: any
   route: object
 }
 const Layout = (props: IProps) => {
   const styles = style(props.theme);
   const theme = props.theme
   const [itemIndex, setItemIndex] = useState(0)
   const { width } = Dimensions.get('window')
   const [checked, setChecked] = useState(false)
   const [descriptionExpanded, setDescritionExpanded] = useState(true)
   const [useProductsExpanded, setUseProductsExpanded] = useState(false)
   const [questionExpanded, setQuestionExpanded] = useState(false)
   const [productInfoExpanded, setProductInfoExpandedExpanded] = useState(false)
   const [reloadPage, setReloadPage] = useState(false)
   const [isAdded, setIsAdded] = useState(false);
   const [isLoader, setIsLoader] = useState(true);
   const [cartItem, setCartItem] = useState({});
   const [isWriteReview, setIsWriteReview] = useState(false);
   const [reviewMsg, setReviewMsg] = useState('');
   const [reviewName, setReviewName] = useState('');
   const [reviewEmail, setReviewEmail] = useState('');
   const [reviewRate, setReviewRate] = useState(5);
   const item = useSelector((state) => state?.ecommerceReducer?.productsDetail?.length > 0 ?
     state?.ecommerceReducer?.productsDetail[0]?.data : {});
     
   const loginStatus = useSelector(
     (state) => state.loginReducer.loginStatus,
   );
   const cartData =
     useSelector((state) => state.ecommerceReducer?.cartData?.length > 0 ?
       state.ecommerceReducer.cartData : []) || [];
 
   console.log("itemitem--=-=-=-=-=-=", item);
 
 
   const userData = useSelector((state) => state.onboardingReducer.userDetails);
   const getCartData =
     useSelector((state) => state.ecommerceReducer?.getCart?.length > 0 ?
       state.ecommerceReducer.getCart[0].data : []) || [];
 
   //console.log("product item", item,props?.route?.params?.id)
 
   useLayoutEffect(() => {
     // if (Platform.OS === 'android') {
     //   UIManager.setLayoutAnimationEnabledExperimental(true);
     // }
     setIsLoader(true)
     apiCall()
   }, []);
 
   useEffect(() => {
     let cartItem = checkItemCart();
     //console.log(cartItem[0])
     setCartItem(cartItem[0])
     if (isAdded) {
       setIsAdded(false)
     }
     isLoader && setIsLoader(false)
   }, [getCartData])
 
   //   useEffect(() => {
   //    setIsLoader(false)
   // },[item])
 
 
   //api call
   const apiCall = () => {
     // props.actions.getProductDetail(actionTypes.PRODUCT_DETAIL, {
     //   module: 'products',
     //   action: props.route.params.id,
     //   formData: {}
     // });
     //console.log("call Api --------")
     props.actions.getProductDetail(actionTypes.PRODUCT_DETAIL, {
       module: 'product_item',
       action: 'get-product-details',
       formData: {
         product_id: props?.route?.params?.id
       }
     });
     setTimeout(() => {
       getCartDetails()
     }, 2000);
     //getCartDetails()
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
 
   const changeDecriptionLayout = () => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setDescritionExpanded(!descriptionExpanded);
   }
   const changeUseProductsLayout = () => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setUseProductsExpanded(!useProductsExpanded);
   }
   const changeQuestionLayout = () => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setQuestionExpanded(!questionExpanded);
   }
 
 
 
   const productArr = [
     require('../../../assets/images/product.png'),
     require('../../../assets/images/product.png'),
     require('../../../assets/images/product.png')
   ]
 
   const [beniftsArr, setBenifitsArr] = useState([
     { key: '1', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '2', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '3', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '4', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '5', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
   ])
 
   const [featuresArr, setFeaturesArr] = useState([
     { key: '1', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '2', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '3', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '4', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
     { key: '5', benifitIcon: require('../../../assets/images/benefits_new.png'), benifitTitle: 'Metabolism Regulation' },
   ])
 
   const [reviewArr, setReviewsArr] = useState([
     { key: '1', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
     { key: '2', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
     { key: '3', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
     { key: '4', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
   ])
   const [storiesArr, setStoriesArr] = useState([
     { key: '1', image: require('../../../assets/images/home/Female_yoga.png'), name: 'Shyamala Iyer', cancerType: 'Breast Cancer Survivor', reviewDate: 'March 14, 2022' },
     { key: '2', image: require('../../../assets/images/home/Female_yoga.png'), name: 'Shyamala Iyer', cancerType: 'Breast Cancer Survivor', reviewDate: 'March 14, 2022' },
     { key: '3', image: require('../../../assets/images/home/Female_yoga.png'), name: 'Shyamala Iyer', cancerType: 'Breast Cancer Survivor', reviewDate: 'March 14, 2022' },
     { key: '4', image: require('../../../assets/images/home/Female_yoga.png'), name: 'Shyamala Iyer', cancerType: 'Breast Cancer Survivor', reviewDate: 'March 14, 2022' }
   ])
 
   let textall = 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package.'
 
   let onScrollEnd = (e) => {
     if (item?.product_images?.length > 1) {
       let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0), item?.product_images?.length);
       setItemIndex(pageNumber - 1);
     }
   }
 
   //Helper Methods
   const renderImage = ({ item, index }) => {
     return (
       <View style={styles.itemImageContainer}>
         {/* <Pressable style={styles.saleVw}>
           <Text style={styles.saleText} >{translate("COMMONTEXT")["SALE"]}</Text>
         </Pressable> */}
         <Image source={{ uri: item?.url }} style={styles.itemImage} />
       </View>
     );
   }
   const benifitsItem = ({ item, index }) => {
     return (
       <Pressable style={{ margin: 10, alignItems: 'center' }} >
         {item?.benefitImage ?
           <SvgCssUri width={60} height={60} style={styles.imageItem} uri={item?.benefitImage} /> :
           <Image source={require('../../../assets/images/benefits_new.png')} style={styles.imageItem} />
         }
         <Text style={[styles.allTexts, { color: theme.BLACK, width: 74, marginTop: 5, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 15 }]} numberOfLines={3} >{item?.benefitText}</Text>
       </Pressable>
     );
   }
   const IngredientsItem = ({ item, index }) => {
     return (
       <Pressable style={{ margin: 10, alignItems: 'center' }} >
         {item?.ingredientImage ?
           <Image style={styles.imageItem} source={{ uri: item?.ingredientImage }} /> :
           <Image source={require('../../../assets/images/benefits_new.png')} style={styles.imageItem} />
         }
         <Text style={[styles.allTexts, { color: theme.BLACK, width: 100, marginTop: 5, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 15 }]} numberOfLines={2} >{item?.ingredientTitle}</Text>
       </Pressable>
     );
   }
   const useProductItem = (item, index) => {
     return (
       <View style={styles.useProductVw} >
         <Text style={styles.allTexts} numberOfLines={1} >{index + 1}.</Text>
         <Text style={[styles.allTexts, { marginLeft: 7 }]}>{item?.directionText}</Text>
       </View>
     );
   }
   const featuresItem = ({ item, index }) => {
     return (
       <Pressable style={{ margin: 10 }} >
         <Image source={item?.benifitIcon} style={styles.imageItem} />
         <Text style={[styles.allTexts, { color: theme.BLACK, width: 74, marginTop: 5, textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 0 : 15 }]} numberOfLines={2} >{item?.benifitTitle}</Text>
       </Pressable>
     );
   }
   const faqsItem = (item, index) => {
     return (
       <Pressable style={{ margin: 0 }} >
         <Text style={styles.subHeaderText}>{(index + 1) + ". " + item?.question}</Text>
         <Text style={[styles.allTexts, { marginTop: 3 }]}>{item?.answer}</Text>
       </Pressable>
     );
   }
   const reviewUserItem = (item, index) => {
     return (
       <Pressable style={styles.userReviewItemContainer} >
         <View style={styles.codeContainer}>
           {item?.user?.user_details[0]?.image != null ?
             <Image style={styles.reviewUserImage} source={{ uri: item?.user?.user_details[0]?.image }} />
             : <Image style={styles.reviewUserImage} source={require('../../../assets/images/profileImage.png')} />}
           <View style={{ marginHorizontal: 10 }} >
             <View style={styles.codeContainer}>
               {/* <Rating
               ratingCount={5}
                count={5}
                 minValue={3}
                 fractions={0}
                type='custom'
                imageSize={15}
                ratingColor={theme.SECONDARY}
                tintColor={theme.PRIMARY}
                //style={{ width: '40%' }}
                readonly={true} /> */}
               <Rating
                 type='custom'
                 ratingCount={item?.rating}
                 showRating={false}
                 fractions={false}
                 ratingColor={theme.SECONDARY}
                 tintColor={theme.PRIMARY}
                 startingValue={5}
                 imageSize={15}
               />
               <Text style={[styles.noReviewText, { fontSize: 12, marginLeft: 5 }]} numberOfLines={1}>{item?.createdAt ? moment(item?.createdAt).format("MM/DD/YYYY") : ""}</Text>
             </View>
             <Text style={styles.reviewuserNameText} numberOfLines={1}>{item?.authorName != "" ? item?.authorName : item?.user?.user_details[0]?.name}</Text>
           </View>
         </View>
         <Text style={[styles.noReviewText, { fontSize: 12, lineHeight: 20, paddingVertical: 15 }]}>{item?.review}</Text>
       </Pressable>
     );
   }
   const userStoriesItem = ({ item, index }) => {
     return (
       <View>
         <Pressable style={styles.userStoryItemContainer} >
           <Image style={styles.storyUserImage} source={item?.image} />
         </Pressable>
         <Text style={[styles.priseText, { color: theme.GRAY_BLACK, textAlign: 'center' }]} numberOfLines={1} >{item?.name} ({item?.cancerType}) </Text>
         <Text style={[styles.noReviewText, { fontSize: 12, textAlign: 'center' }]} numberOfLines={1}>{item?.reviewDate}</Text>
       </View>
     );
   }
 
   const decrement = () => {
     let qunatity = cartItem?.qunatity
     if (qunatity > 1) {
       qunatity = qunatity - 1
       // setIsLoader(true)
       cartItem.qunatity = qunatity
       updateCartData(item, qunatity)
       setReloadPage(!reloadPage)
     }
   }
 
   const increment = () => {
     let qunatity = cartItem?.qunatity + 1
     // setIsLoader(true)
     cartItem.qunatity = qunatity
     updateCartData(item, qunatity)
     setReloadPage(!reloadPage)
   }
 
   const updateCartData = (item, qunatity) => {
     let total = parseInt(item?.product_item?.price) * parseInt(qunatity)
     let obj = {
       id: cartItem?.id,
       customer_id: userData?.data?.userId,
       product_id: props.route.params.id,
       product_name: item.name ? item.name : '',
       image: item?.images?.length > 0 ? item?.images[0].src : item?.image,
       qunatity: qunatity,
       price: item?.product_item?.price,
       reguler_price: item?.regular_price,
       sale_price: item?.product_item?.price,
       total_price: total
     }
     props.actions.updateCart(actionTypes.UPDATE_CART, {
       module: 'cart_data',
       action: 'update_cart',
       formData: obj
     });
     setIsAdded(false)
     setTimeout(() => {
       getCartDetails()
     }, 2000);
   }
 
   const addToCart = () => {
     let filterData = getCartData.filter(itemA => itemA.product_id == props.route.params.id)
     if (filterData.length == 0) {
       let obj = {
         customer_id: userData?.data?.userId,
         product_id: props.route.params.id,
         image: item?.images?.length > 0 ? item?.images[0].src : item?.image,
         qunatity: 1,
         price: item?.product_item?.price,
         reguler_price: item?.regular_price,
         sale_price: item?.product_item?.price,
         total_price: item?.product_item?.price,
         product_name: item.name,
       }
       setIsLoader(true)
       props.actions.createCart(actionTypes.CREATE_CART, {
         module: 'cart_data',
         action: 'create',
         formData: obj
       });
       setTimeout(() => {
         getCartDetails()
       }, 2000);
       setIsAdded(true)
     } else {
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: 'This product is already added to cart.'
       });
     }
 
     // let filterData = cartData.filter(itemA => itemA.id == item.id)
     // if(filterData.length == 0) {
     //   let obj = {
     //     id: item.id,
     //     name: item.name,
     //     images: item.images,
     //     qty: 1,
     //     price: item.price
     //   }
     //   let arr = [...cartData, obj]
     //   props.actions.addToCart("cartData", arr, actionTypes.ADD_CART);
     //   Toast.show({
     //     type: 'success',
     //     text1: '',
     //     text2: 'Product added to cart'
     //   });
     // } else {
     //   Toast.show({
     //     type: 'success',
     //     text1: '',
     //     text2: 'This product is already added to cart.'
     //   });
     // }
 
   }
 
   const saveUserReview = async () => {
     const params = new URLSearchParams();
     params.append('productId', props?.route?.params?.id);
     params.append('authorName', reviewName);
     params.append('email', reviewEmail);
     params.append('title', "");
     params.append('review', reviewMsg);
     params.append('rating', reviewRate + "");
     //console.log("search data", params)
 
     let payload = {
       module: 'product_item',
       action: 'add-product-review',
     };
 
     const response = await savePostRequest(params, payload)
     if (response.status == 1) {
       setReviewEmail('')
       setReviewMsg('')
       setReviewName('')
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: 'Your product review is shared successfully.'
       });
     }
     //console.log("search data", response)
     setIsWriteReview(false)
     setTimeout(() => {
       apiCall()
     }, 2000);
   }
 
   const saveReviewData = () => {
     if (loginStatus) {
       if (reviewMsg.length > 0) {
         saveUserReview()
       } else {
         Toast.show({
           type: 'error',
           text1: 'Oops',
           text2: 'Please fill up the review message'
         });
       }
     } else if (!loginStatus) {
       if (reviewMsg.length > 0 && reviewEmail.length > 0 && reviewName.length > 0) {
         saveUserReview()
       } else {
         Toast.show({
           type: 'error',
           text1: 'Oops',
           text2: 'Please fill up the review message or email or name'
         });
       }
     } else {
       Toast.show({
         type: 'error',
         text1: 'Oops',
         text2: 'Please fill up all data'
       });
     }
   }
 
   const checkItemExist = () => {
     return getCartData.some(e => e.product_id === props.route.params?.id); // true
   }
 
   const checkItemCart = () => {
     // return getCartData.filter(e => e.product_id === props.route.params.id); // true
     return getCartData.filter(e => e.product_item.id === props.route.params?.id); // true
   }
 
   const ratingCompleted = (rate) => {
     //console.log("rating-------", rate)
     setReviewRate(rate)
   }
 
   const reviewList = (item) => {
     return item?.product_reviews?.slice(0, 3)?.map((element, index) => {
       return (
         reviewUserItem(element, index)
       );
     });
   };
 
   const faqList = (item) => {
     return item?.product_faqs?.map((element, index) => {
       return (
         faqsItem(element, index)
       );
     });
   };
 
   const directionList = (item) => {
     return item?.product_directions?.map((element, index) => {
       return (
         useProductItem(element, index)
       );
     });
   };
   console.log('item?.product_reviews -->', item?.product_reviews);
   
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
       {/* <View style={styles.headerVw}>
         <Pressable onPress={() => { props.navigation.pop() }} style={styles.backVw}>
           <Back width={8} height={15} style={{ margin: 15 }} />
         </Pressable>
         <Pressable onPress={() => { props.navigation.navigate('Zen.Cart'); }} style={{ position: "absolute", right: 20 }}>
           <Image source={require('../../../assets/images/cart.png')} style={styles.cartIcon} />
           <View style={{ backgroundColor: 'red', position: 'absolute', justifyContent: 'center', right: -10, bottom: 12, height: 20, width: 20, borderRadius: 10 }}>
             <Text style={styles.cartText}>{getCartData?.length}</Text>
           </View>
         </Pressable>
       </View> */}
 
       <AppHeader
           theme={theme}
           onBackPress={() => props.navigation.pop()}
           headerTitle={null}
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
 
       <ScrollView contentContainerStyle={{ backgroundColor: theme.PRIMARY}} showsVerticalScrollIndicator={false} >
         <View>
           <View>
             <Text style={[styles.headerText,styles.headerTextExtra]}>{item?.name}</Text>
              <View style={[styles.reviewVW,{marginLeft:15}]} >
                 <Rating
                     ratingCount={item?.average_rating >= 4.5 ? 10 : item?.average_rating ?
                       parseInt(item?.average_rating) * 2 : 10}
                     type='custom'
                     imageSize={15}
                     ratingColor={theme.SECONDARY}
                     tintColor={theme.PRIMARY}
                     minValue={5}
                     readonly={true}
                     style={{ width: '1%', marginStart: '19%' }}
                   />
                 <Text style={styles.reviewText}>{item?.total_rating}
                 </Text>
             </View>
             <FlatList
               data={item?.product_images}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               onMomentumScrollEnd={onScrollEnd}
               renderItem={renderImage} />
 
             {/* <View style={styles.dotVw}>
               {item?.product_images?.map((item, index) => {
                 return (
                   <View style={[styles.dotView, { backgroundColor: index === itemIndex ? theme.PAGINATION_SELECCT : theme.PAGINATION_DESELECT }]} />
                 )
               })}
             </View> */}
           </View>
           <View style={styles.decriptionView}>
             {/* <RenderHtml
               contentWidth={100}
               source={{ html: item?.product_detail?.descriptionShort ? item?.product_detail?.descriptionShort : "" }}
               baseStyle={styles.desText}
               tagsStyles={{ p: { color: '#555' }, ul: { color: '#555' }, li: { color: '#555' } }} /> */}
         
 
         {/* <View style={styles.reviewVW} >
                 <Rating
                   ratingCount={item?.average_rating >= 4.5 ? 10 : item?.average_rating ?
                     parseInt(item?.average_rating) * 2 : 10}
                   type='custom'
                   imageSize={15}
                   ratingColor={theme.SECONDARY}
                   tintColor={theme.PRIMARY}
                   minValue={5}
                   readonly={true}
                   style={{ width: '1%', marginStart: '19%' }}
                 />
                 <Text style={styles.reviewText}>{item?.total_rating}
                 </Text>
             </View> */}
 
 
             {/* <View style={styles.reviewVW} >
             <Pressable style={styles.txtContainer} >
               <View style={styles.photoVideoView}>
                 <Text style={styles.albumText} numberOfLines={1}>{'500mg (60 Capsules)'}</Text>
                 <Back width={7} height={12} style={{ right: 0, transform: [{ rotateY: '180deg' }], position: 'absolute' }} />
               </View>
             </Pressable>
             <View style={[styles.txtContainer, { width: '35%', marginLeft: '2%', justifyContent: 'center', alignItems: 'center' }]}>
               <View style={styles.addRemoveItemContainer}>
                 <Pressable style={[styles.addRemoveItem, { marginRight: 15, marginLeft: 4 }]} onPress={() => decrement()} >
                   <Text style={styles.addRemoveText}>－</Text>
                 </Pressable>
 
                 <Text style={styles.totalItem}>{item.itemQuantity}</Text>
 
                 <Pressable style={[styles.addRemoveItem, { marginLeft: 15, marginRight: 4 }]} onPress={() => increment()} >
                   <Text style={styles.addRemoveText}>＋</Text>
                 </Pressable>
               </View>
             </View>
           </View> */}
 
             {/* <View style={[styles.reviewVW,{marginTop:10}]} >
               <Text style={styles.priseText} numberOfLines={1}>{translate("COMMONTEXT")["MRP"]} </Text>
               <Text style={{ marginLeft: 0,  }} numberOfLines={1}> <Text style={styles.disPriceText}>{'\u20B9'}</Text><Text style={[styles.disPriceText, {
                 fontFamily: FONTFAMILY.POPPINS_MEDIUM,
               }]}>{numberWithCommas(item?.price)}</Text></Text>
 
               {calculateDiscount(item?.regular_price, item?.price) == 0 ? null :<Text style={[{ textDecorationLine: 'line-through' }]} numberOfLines={1} >
                 <Text style={styles.priseRupeeText}> {'\u20B9'}</Text>
                 <Text style={styles.priseText}>{numberWithCommas(item?.regular_price)}</Text></Text>}
 
               {calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                 <>
                   <Text style={[styles.priseText, { color: theme.SEARCH_TITLE }]} > |  </Text>
                   <Text style={[styles.priseText,{ color: theme.LIGHT_GREEN }]} numberOfLines={1}>{calculateDiscount(item?.regular_price, item?.price)}{translate("COMMONTEXT")["PER_OFF"]} </Text>
                 </>
               }
               <View style={{width:'23%'}}/>
                 <NavigateButton
                       height={40}
                       width={'40%'}
                       marginTop={0}
                       fontSize={14}
                       theme={theme}
                       buttonText={translate("COMMONTEXT").ADD_CART}
                       onPress={() => props.navigation.navigate('Zen.Cart')} />
             </View> */}
 
             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:21}}>
               <View style={{width:'60%',  alignItems:'center', flexDirection:'row'}}>
                 <Text style={{ marginLeft: 0,  }} numberOfLines={1}> 
                   <Text style={styles.disPriceText}>{'\u20B9'}</Text>
                     <Text style={[styles.disPriceText,
                     {
                         fontFamily: FONTFAMILY.POPPINS_MEDIUM,
                     }]}>{numberWithCommas(item?.price)}
                     </Text>
                 </Text>
                 {
                   calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                   <Text style={[{ textDecorationLine: 'line-through' }]} numberOfLines={1} >
                   <Text style={styles.priseRupeeText}> {'\u20B9'}</Text>
                   <Text style={styles.priseText}>{numberWithCommas(item?.regular_price)}</Text></Text>
                 }
                 {
                   calculateDiscount(item?.regular_price, item?.price) == 0 ? null :
                   <>
                     <Text style={[styles.priseText, { color: theme.SEARCH_TITLE }]} > |  </Text>
                     <Text style={[styles.offPriseText]} numberOfLines={1}>{calculateDiscount(item?.regular_price, item?.price)}{translate("COMMONTEXT")["PER_OFF"]} </Text>
                   </>
               }
               </View>
                 <View style={{width:'30%'}}>
                   <NavigateButton
                     marginTop={0}
                     fontSize={14}
                     theme={theme}
                     buttonText={translate("COMMONTEXT").ADD_CART}
                     onPress={() => props.navigation.navigate('Zen.Cart')} />
                 </View>
             </View>
 
             {/* {cartItem?.qunatity &&
               <View style={styles.utilityVw} >
                 <View style={styles.addRemoveItemContainer}>
                   <Pressable style={[styles.addRemoveItem, { marginRight: 9, marginLeft: 3 }]} onPress={() => decrement()}>
                     <Text style={styles.addRemoveText}>-</Text>
                   </Pressable>
                   <Text style={styles.totalItem}>{cartItem?.qunatity ? cartItem?.qunatity + "" : "1"}</Text>
                   <Pressable style={[styles.addRemoveItem, { marginLeft: 9, marginRight: 3 }]} onPress={() => increment()}>
                     <Text style={styles.addRemoveText}>+</Text>
                   </Pressable>
                 </View>
               </View>
             } */}
 
                 <NavigateButton
                   height={41}
                   theme={theme}
                   buttonText={translate("PAYMENT").BUY_NOW}
                   onPress={(addToCart)} />
             {/* {cartItem == undefined ?
               <>
                 {checkItemExist() ?
                   <NavigateButton
                     height={41}
                     theme={theme}
                     buttonText={translate("COMMONTEXT").GOTO_CART}
                     onPress={() => props.navigation.navigate('Zen.Cart')} />
                   :
                   <NavigateButton
                     height={41}
                     theme={theme}
                     buttonText={translate("PAYMENT").BUY_NOW}
                     onPress={(addToCart)} />
                 }
               </>
              :
               <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 15 : 12}} >
                 <View style={styles.utilityVw2} >
                   <View style={styles.addRemoveItemContainer}>
                     <Pressable style={[styles.addRemoveItem, { marginRight: 9, marginLeft: 13 }]} onPress={() => decrement()}>
                       <Text style={styles.addRemoveText}>-</Text>
                     </Pressable>
                     <Text style={[styles.totalItem,{marginTop : Platform.OS === 'ios' ? 0 : 3}]}>{cartItem?.qunatity ? cartItem?.qunatity + "" : "1"}</Text>
                     <Pressable style={[styles.addRemoveItem, { marginLeft: 9, marginRight: 13 }]} onPress={() => increment()}>
                       <Text style={styles.addRemoveText}>+</Text>
                     </Pressable>
                   </View>
                 </View>
                <NavigateButton
                     height={37}
                     width={'67%'}
                     marginTop={0}
                     fontSize={14}
                     theme={theme}
                     buttonText={translate("PAYMENT").BUY_NOW}
                     // onPress={(addToCart)} />
                     onPress={() => props.navigation.navigate('Zen.Cart')} /> 
               </View>
              }  */}
           </View>
 
           {/* <View style={styles.attributesContainerVw} >
           <View style={[styles.attributeVw, { marginLeft: 22 }]} >
             <Image source={require('../../../assets/images/authentic.png')} style={styles.attributeIcon} /> */}
           {/* <Text style={styles.attributeText} >100% Authentic</Text> */}
           {/* </View>
           <View style={styles.attributeVw} >
             <Image source={require('../../../assets/images/returns.png')} style={styles.attributeIcon} /> */}
           {/* <Text style={styles.attributeText} >Easy Returns</Text> */}
           {/* </View>
         </View> */}
 
           {/* <View style={[styles.decriptionView, { borderBottomWidth: 4, borderColor: '#eff9ff' }]}>
           <View style={styles.codeContainer} >
             <Pressable style={styles.codeVw} >
               <Text style={styles.codeText} >ZenMed0123</Text>
             </Pressable>
             <Text style={[styles.codeText, { position: 'absolute', right: 0 }]} >Copy</Text>
           </View>
           <Text style={[styles.allTexts, { marginTop: 5 }]} >{'FREE Jade Roller worth Rs. 999 on Order > 849'}</Text>
         </View> */}
 
           <View style={[styles.decriptionView]}>
             <View style={styles.codeContainer} >
               <Text style={styles.descriptionText}>{translate("COMMONTEXT")["DESCRIPTION"]}</Text>
               {/* <Pressable style={{ position: 'absolute', right: 0 }} onPress={changeDecriptionLayout}>
               <Image source={require('../../../assets/images/downArrow.png')} style={styles.downArrawImg} />
             </Pressable> */}
             </View>
             <View style={{ height: descriptionExpanded ? null : 0, overflow: 'hidden' }}>
               <RenderHtml
                 contentWidth={100}
                 baseStyle={styles.subDesText}
                 source={{ html: item?.product_detail?.descriptionLong ? item?.product_detail?.descriptionLong : "" }}
                 tagsStyles={{ p: { color: '#555' }, ul: { color: '#555' }, li: { color: '#555' } }}
               />
               {/* <Text style={[styles.allTexts, { paddingVertical: 10 }]}>{item?.description} </Text> */}
               {/* <Text style={styles.subheader}>Why you should use Curcumin</Text>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View>
             <View style={[styles.reviewVW, { marginTop: 8 }]} >
               <Image style={styles.rateImage} source={require('../../../assets/images/correctMark.png')} />
               <Text style={styles.descriptionTopicText} numberOfLines={1} >Reduces inflammations & increases antioxidants</Text>
             </View> */}
             </View>
           </View>
           <View style={styles.borderLine} />
           <View style={styles.benefitsContainer}>
              <Text style={[styles.descriptionText,{marginBottom:10}]}>{translate("COMMONTEXT")["BENEFITS"]}</Text>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Reduces inflammation & increases antioxidants 
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Boosts immune system & reduces oxidative
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Reduces pain and inflammation in 
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   chemotherapy 
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Manages anxiety and depression 
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Stabilizes metabolism and weight loss
                 </Text>
              </View>
              <View style={styles.benefitsSubContainer}>
                 <TikBullet />
                 <Text style={styles.benefitText}>
                   Reduces LDL-cholesterol level, glucose & blood 
                 </Text>
              </View>
           <View style={styles.borderLine} />
           </View>
           <View>
             <View style={[styles.decriptionView,]}>
               {/* <View style={[styles.codeContainer, { paddingVertical: 15, paddingHorizontal: 20 }]} >
                   <Text style={[styles.headerText, { color: theme.GRAY_BLACK }]} >Review</Text>
                   <Pressable style={[styles.writeReviewVw, { right: 20 }]} onPress={() => props.navigation.navigate('Zen.ReviewList', { productId: props.route.params.id })}>
                     <Text style={styles.writeReviewText} >{translate("PRODUCT_DETAIL")["SEE_MORE_REVIEW"]}</Text>
                   </Pressable>
               </View> */}
               {/* {console.log("length" ,item?.product_reviews?.length)} */}
               {item?.product_reviews?.length == 0 ?
                 <View style={styles.noReviewsVw} >
                   <Text style={styles.noReviewText} >{translate("PRODUCT_DETAIL")["NO_REVIEW_YET"]}</Text>
                 </View> :
                 <View>
                 <Pressable 
                   onPress={() => props.navigation.navigate('Zen.ReviewList', { productId: props.route.params.id })}
                   style={{marginBottom:14}}>
                     <Text style={[styles.descriptionText,{marginBottom:10}]}>{translate("COMMONTEXT")["CUSTOMER_REVIEWS"]}</Text>
                     <View>
                       <View>
                         <View style={{flexDirection:'row', width:'100%'}}>
                             <Rating
                               ratingCount={item?.average_rating >= 4.5 ? 10 : item?.average_rating ?
                                 parseInt(item?.average_rating) * 2 : 10}
                               type='custom'
                               imageSize={15}
                               ratingColor={theme.SECONDARY}
                               tintColor={theme.PRIMARY}
                               minValue={5}
                               readonly={true}
                               style={{width:'39%'}}/>
                               <View style={{position:'absolute', left: 85}}>
                                 <Text style={styles.outOfRattingText}>{item?.average_rating} {'out of 5'}</Text>
                               </View>
                           </View>
                             <Text style={styles.globalRattingText}>
                             {item?.total_rating} {'global ratings'}
                             </Text>
                         </View>
                         <View style={{position:'absolute', right:0}}>
                             <RigthArrow />
                         </View>
                   </View>
                   {/* <FlatList
                     data={item?.product_reviews}
                     showsVerticalScrollIndicator={false}
                     renderItem={reviewUserItem}
                     nestedScrollEnabled={true}
                     /> */}
                   {/* {item !== undefined && reviewList(item)}
                   <Pressable style={styles.seeReviewVw} onPress={() => props.navigation.navigate('Zen.ReviewList', { productId: props.route.params.id })}>
                     <Text style={styles.writeReviewText} >{translate("PRODUCT_DETAIL")["SEE_MORE_REVIEW"]}</Text>
                   </Pressable> */}
                 </Pressable>
                 </View>
               }
             <View style={styles.borderLine} />
           </View>
           </View>
           
           <View style={[styles.featuresView]}>
             <Text style={styles.headerText} >{translate("COMMONTEXT")["FEATURES"]}</Text>
             <FlatList
               data={item?.product_benefits}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ marginTop: 10 }}
               renderItem={benifitsItem} />
           <View style={styles.borderLine} />
           </View>
           <View style={[styles.featuresView, {paddingTop:8}]}>
             <Text style={styles.headerText} >{translate("PRODUCT_DETAIL")["INGREDIENTS"]}</Text>
             <FlatList
               data={item?.product_ingredients}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ marginTop: 10 }}
               renderItem={IngredientsItem} />
             <View style={styles.borderLine} />
           </View>
 
           {/* <View style={[styles.decriptionView, { borderBottomWidth: 4, borderColor: '#eff9ff' }]}>
           <Text style={styles.headerText} >{translate("COMMONTEXT")["FEATURES"]}</Text>
           <FlatList
             data={featuresArr}
             horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ marginTop: 10 }}
             renderItem={featuresItem} />
         </View> */}
 
 
 
 
             <View style={[styles.decriptionView,{marginTop: 13}]}>
               <View style={styles.codeContainer}>
                 <Pressable style={styles.freqVw} onPress={()=>{
                   setProductInfoExpandedExpanded(!productInfoExpanded)
                 }}>
                   <Text style={styles.headerText} >{translate("PRODUCT_DETAIL")["PRODUCT_INFORMATION"]}</Text>
                   <View style={styles.downArrawVw}>
                     <Image source={require('../../../assets/images/downArrow.png')} style={styles.downArrawImg} />
                   </View>
                 </Pressable>
               </View>
               <View style={{ height: productInfoExpanded ? null : 0, overflow: 'hidden', marginTop: 10 }}>
                <View style={styles.borderLine} />
                 <View style={styles.productInfoSubContainer}>
                     <View style={styles.productInfoLeftContainer}> 
                       <Text style={styles.productInfoTetxt}>
                           {
                           translate("PRODUCT_DETAIL")["PRODUCT_DIMENSIONS"]
                           }
                       </Text>
                     </View>
                     <View style={styles.productInfoRightContainer}>
                         <Text>
                           6.5X6.5 x 12 cm; 120 Grams
                         </Text>
                     </View>
                 </View>
                 <View style={styles.borderLine} />
                 <View style={styles.productInfoSubContainer}>
                     <View style={styles.productInfoLeftContainer}> 
                       <Text style={styles.productInfoTetxt}>
                           {
                           translate("PRODUCT_DETAIL")["ASIN"]
                           }
                       </Text>
                     </View>
                     <View style={styles.productInfoRightContainer}>
                         <Text>
                             B0255565CR
                         </Text>
                     </View>
                 </View>
                 <View style={styles.borderLine} />
                 <View style={styles.productInfoSubContainer}>
                     <View style={styles.productInfoLeftContainer}> 
                       <Text style={styles.productInfoTetxt}>
                           {
                           translate("PRODUCT_DETAIL")["PRODUCT_DIMENSIONS"]
                           }
                       </Text>
                     </View>
                     <View style={styles.productInfoRightContainer}>
                         <Text>
                         6.5X6.5 x 12 cm; 120 Grams
                         </Text>
                     </View>
                 </View>
                 <View style={styles.borderLine} />
                 <View style={styles.productInfoSubContainer}>
                     <View style={styles.productInfoLeftContainer}> 
                       <Text style={styles.productInfoTetxt}>
                           {
                           translate("PRODUCT_DETAIL")["ASIN"]
                           }
                       </Text>
                     </View>
                     <View style={styles.productInfoRightContainer}>
                         <Text>
                             B0255565CR
                         </Text>
                     </View>
                 </View>
                 <View style={styles.borderLine} />
               </View>
             </View>
 
           <View style={[styles.decriptionView]}>
             <View style={styles.codeContainer}>
               <Pressable style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} onPress={changeUseProductsLayout}>
                 <Text style={styles.headerText} >{translate("PRODUCT_DETAIL")["DIRECTIONS_TO_USE"]}</Text>
                 <View style={{ height: 25, width: 25, alignItems: 'flex-end', justifyContent: 'center' }}>
                   <Image source={require('../../../assets/images/downArrow.png')} style={styles.downArrawImg} />
                 </View>
               </Pressable>
             </View>
             <View style={{ height: useProductsExpanded ? null : 0, overflow: 'hidden', marginTop: 10 }}>
               {/* <FlatList
             data={item?.product_directions}
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ marginTop: 10 }}
                 renderItem={useProductItem} /> */}
               {item !== undefined && directionList(item)}
               {/* <View style={styles.useProductVw} >
               <Text style={styles.allTexts} numberOfLines={1} >1.</Text>
               <Text style={[styles.allTexts, { marginLeft: 7 }]}  >Reduces inflammations & increases antioxidants incre antioxidants Reduces inflammations & increases antioxidants Reduces inflammations & increases antioxidants Reduces increases antioxidants</Text>
             </View>
             <View style={styles.useProductVw} >
               <Text style={styles.allTexts} numberOfLines={1} >2.</Text>
               <Text style={[styles.allTexts, { marginLeft: 7 }]}  >Reduces inflammations & increases antioxidants incre antioxidants Reduces inflammations & increases antioxidants Reduces inflammations & increases antioxidants Reduces increases antioxidants</Text>
             </View>
             <View style={styles.useProductVw} >
               <Text style={styles.allTexts} numberOfLines={1} >3.</Text>
               <Text style={[styles.allTexts, { marginLeft: 7 }]}  >Reduces inflammations & increases antioxidants incre antioxidants Reduces inflammations & increases antioxidants Reduces inflammations & increases antioxidants Reduces increases antioxidants</Text>
             </View> */}
             </View>
           </View>
 
           <View style={[styles.decriptionView]}>
             <View style={styles.codeContainer}>
               <Pressable style={styles.freqVw} onPress={changeQuestionLayout}>
                 <Text style={styles.headerText} >{translate("PRODUCT_DETAIL")["FREQ_QUESTION"]}</Text>
                 <View style={styles.downArrawVw}>
                   <Image source={require('../../../assets/images/downArrow.png')} style={styles.downArrawImg} />
                 </View>
               </Pressable>
             </View>
             <View style={{ height: questionExpanded ? null : 0, overflow: 'hidden', marginTop: 10 }}>
               {/* <FlatList
             data={item?.product_faqs}
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ marginTop: 0 }}
             renderItem={faqsItem}
             keyExtractor={(item, index)=>index}/> */}
               {item !== undefined && faqList(item)}
               {/* <Text style={styles.subHeaderText} numberOfLines={1} >1. What is curcumin</Text>
             <Text style={[styles.allTexts, { marginTop: 7 }]}  >Reduces inflammations & increases antioxidants incre antioxidants Reduces inflammations & increases antioxidants Reduces inflammations & increases antioxidants Reduces increases antioxidants</Text>
 
             <Text style={styles.subHeaderText} numberOfLines={1} >2. How is it helpful in cancer</Text>
             <Text style={[styles.allTexts, { marginTop: 7 }]}  >Reduces inflammations & increases antioxidants incre antioxidants Reduces inflammations & increases antioxidants Reduces inflammations & increases antioxidants Reduces increases antioxidants</Text> */}
             </View>
           </View>
 
          
 
           {/* <View style={[styles.decriptionView, { borderBottomWidth: 4, borderColor: theme.PRIMARY, backgroundColor: 'aliceblue' }]}>
           <View style={[styles.codeContainer, { paddingVertical: 15 }]} >
             <Text style={[styles.headerText, { color: theme.GRAY_BLACK }]} >Review</Text>
             <Pressable style={styles.writeReviewVw} >
               <Text style={styles.writeReviewText} >{translate("PRODUCT_DETAIL")["WRITE_REVIEW"]}</Text>
             </Pressable>
           </View>
           <View style={styles.noReviewsVw} >
             <Text style={styles.noReviewText} >{translate("PRODUCT_DETAIL")["NO_REVIEW_YET"]}</Text>
           </View>
         </View>  */}
 
           {/* <View style={[styles.decriptionView, { backgroundColor: 'aliceblue' }]}> */}
             {/* <View style={[styles.codeContainer, { paddingVertical: 15 }]} >
               <Text style={[styles.headerText, { color: theme.GRAY_BLACK }]} >{translate("DRAWER")["REVIEW"]}</Text>
               <Pressable style={styles.writeReviewVw} onPress={() => setIsWriteReview(true)}>
                 <Text style={styles.writeReviewText} >{translate("PRODUCT_DETAIL")["WRITE_REVIEW"]}</Text>
               </Pressable>
             </View> */}
             {/* {isWriteReview &&  */}
             {/* <View> */}
               {/* <View style={[styles.codeContainer, { paddingVertical: 15, }]} >
                 <Text style={styles.labelText} >{translate("PRODUCT_DETAIL")["YOUR_RATING"]}</Text>
                 <Text style={styles.starText} >*</Text>
                   <Rating
                     type='custom'
                     imageSize={20}
                     startingValue={5}
                     ratingCount={5}
                     minValue={1}
                     ratingColor={theme.SECONDARY}
                     tintColor={'aliceblue'}
                     onFinishRating={(rate) => ratingCompleted(rate)}
                     style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                   />
               </View> */}
               {/* <View style={styles.codeContainer} >
                 <Text style={styles.labelText} >{translate("DRAWER")["REVIEW"]}</Text>
                 <Text style={styles.starText} >*</Text>
               </View>
               <TextInput placeholder={translate("PRODUCT_DETAIL")["WRITE_COMMENTS"]} placeholderTextColor={theme.SEARCH_TITLE} style={[styles.commentContainer, { paddingVertical: 0, paddingTop: 15, paddingBottom: 60 }]} onChangeText={(value) => setReviewMsg(value)} value={reviewMsg} />
               <View style={styles.codeContainer} >
                 <Text style={styles.labelText} >{translate("CHECKOUT")["NAME"]}</Text>
               </View>
               <TextInput placeholder={translate("CHECKOUT")["NAME"]} placeholderTextColor={theme.SEARCH_TITLE} style={styles.commentContainer} onChangeText={(value) => setReviewName(value)} value={reviewName} />
               <View style={styles.codeContainer} >
                 <Text style={styles.labelText} >{translate("COMMONTEXT")["EMAIL"]}</Text>
               </View>
               <TextInput placeholder={translate("COMMONTEXT")["EMAIL"]} placeholderTextColor={theme.SEARCH_TITLE} style={styles.commentContainer} onChangeText={(value) => setReviewEmail(value)} value={reviewEmail} /> */}
               {/* <CheckBox
             style={{ marginVertical: 15, width: '90%' }}
             onClick={() => setChecked(!checked)}
             isChecked={checked}
             rightText={'Save my name, email, and website in this browser for the next time I comment.'}
             rightTextStyle={[styles.noReviewText, { color: theme.GRAY_BLACK }]}
             checkBoxColor={props.theme.SECONDARY}
           /> */}
               {/* <Pressable style={styles.submitVw} onPress={() => { saveReviewData() }}>
                 <Text style={[styles.noReviewText, { color: theme.PRIMARY }]} >{translate("LANGUAGE")["SUBMIT"]}</Text>
               </Pressable> */}
             {/* </View>}
           </View> */}
          
 
           {/* <View style={[styles.decriptionView, { paddingHorizontal: 0 }]}>
           <Text style={[styles.headerText, { color: theme.GRAY_BLACK, marginHorizontal: 20 }]} >Patients Success Stories</Text>
           <FlatList
             data={storiesArr}
             horizontal
             showsHorizontalScrollIndicator={false}
             renderItem={userStoriesItem}
             contentContainerStyle={{ paddingVertical: 15 }}
             pagingEnabled />
         </View> */}
 
           {/* <Pressable style={[styles.submitVw, { marginHorizontal: 20 }]} >
           <Text style={[styles.noReviewText, { color: theme.PRIMARY }]} >buy now</Text>
         </Pressable> */}
         </View>
       </ScrollView>
       <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
     </SafeAreaView>
   );
 };
 export default withTheme(Layout);
 