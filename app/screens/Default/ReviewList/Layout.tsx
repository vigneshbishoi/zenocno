/**
 * ProfilesMatch Component
 * @Author: Astha
 * @Date: Wed April 18 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Profile Screen
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';
import { FONTFAMILY } from '../../../config/font-config';
import translate from "../../../utils/Text"
import actionTypes from '../../../store/actions/types';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Rating } from 'react-native-ratings';
import { sendGetRequest } from '../../../services/ecommerce'
import moment, { parseTwoDigitYear } from 'moment';
import AppHeader from '../../../components/CommonInput/appHeader';

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
  const [page, setPage] = useState(1)
  const [loadeMore, setLoadMore] = useState(true)
  const [reviewList, setReviewList] = useState([])
  const [reviewData, setReviewData] = useState([])

  const [reviewArr, setReviewsArr] = useState([
    { key: '1', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
    { key: '2', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
    { key: '3', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
    { key: '4', image: require('../../../assets/images/profileImage.png'), name: 'Sandip Maheshawari', reviewDate: '05/11/2022', reviewsText: 'This product is taken by mouth with or without food, usually before bedtime or as directed by the package label. Follow all directions on the product package. usually before bedtime or as directed by the package label. Follow all directions on the product package' },
  ])

  const getProductReviewsData =
    useSelector((state) => state.ecommerceReducer?.getProductReviewsData?.length > 0 ?
      state.ecommerceReducer.getProductReviewsData[0].data : []) || [];

  //console.log("getProductReviewsData" ,getProductReviewsData)

  useEffect(() => {
    getProductReviewsList(1)
  }, []);

  useEffect(() => {
    if (reviewData.length > 0) {
      setLoadMore(true)
      let data = reviewList.concat(reviewData)
      setReviewList(data)
    } else if (reviewData != undefined) {
      setLoadMore(false)
    }

  }, [reviewData])

  const getProductReviewsList = async (page) => {
    if (loadeMore || page == 1) {
      setPage(page + 1)
      let payload = {
        module: 'product_item',
        action: "get-product-review",
      }
      let data = {
        product_id: props.route.params.productId,
        page: page
      }
      const response = await sendGetRequest(data, payload);
      if (response?.data) {
        let review = response?.data?.reviews
        if (review.length > 0) {
          setReviewData(review)
        }
      }
      if (page == 1) {
        setReviewList([])
      }
    }

    // props.actions.getProductReviews(actionTypes.GET_PRODUCT_REVIEWS, {
    //   module: 'product_item',
    //   action: "get-product-review",
    //   formData: {
    //     product_id: props.route.params.productId
    //   }
    // });
  }

  const reviewUserItem = ({ item, index }) => {
    //console.log("items------------" ,item.regular_price, '------' ,item.price,"------" ,item.sale_price)
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
        <Text style={[styles.noReviewText, { fontSize: 12, lineHeight: 20, paddingVertical: 15 }]}>{item.review}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.goBack()}
        headerTitle={translate("DRAWER")["REVIEWS"]}
        isRightComponent={false} />
      <View style={{ paddingHorizontal: 15, backgroundColor: 'aliceblue' }}>
        {/* <View style={styles.searchVw}>
          <Icon name="search" color={'#A2A2A2'} size={18} />
          <TextInput placeholder={translate("COMMONTEXT")["SEARCH"]} placeholderTextColor={'#A2A2A2'} style={styles.searchInput} value={searchText} onChangeText={(value) => { setSearchText(value), searchTextList(value) }} />
        </View>
        <Text style={styles.recentText}>{translate("COMMONTEXT")["SUGGESTED"]}</Text> */}
        {reviewList.length > 0 ?
          <FlatList
            data={reviewList}
            keyExtractor={(item, index) => item.id}
            renderItem={reviewUserItem}
            onEndReachedThreshold={0.5}
            onEndReached={() => getProductReviewsList(page)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 80 }}
            nestedScrollEnabled={false} />
          : <View style={{ height: '70%', justifyContent: 'center' }}><Text style={{ color: '#A2A2A2', fontSize: 18, alignSelf: 'center' }}>{translate("COMMONTEXT")["NO_CONVERSATION"]}</Text></View>
        }
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);